import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const PROFILE_QUERY = `
	query {
		viewer {
			followers {
				totalCount
			}
			repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
				totalCount
				nodes {
					stargazerCount
				}
			}
			contributionsCollection {
				contributionYears
			}
		}
	}
`;

const TRAILING_QUERY = `
	query {
		viewer {
			contributionsCollection {
				contributionCalendar {
					weeks {
						contributionDays {
							contributionCount
							date
						}
					}
				}
			}
		}
	}
`;

const YEAR_QUERY = `
	query($from: DateTime!, $to: DateTime!) {
		viewer {
			contributionsCollection(from: $from, to: $to) {
				totalCommitContributions
				contributionCalendar {
					totalContributions
					weeks {
						contributionDays {
							contributionCount
							date
						}
					}
				}
			}
		}
	}
`;

type ContributionDay = { contributionCount: number; date: string };

type DayCell = { count: number; date: string };

type CacheEntry = { data: unknown; expiresAt: number };
let cache: CacheEntry | null = null;
const TTL_MS = 60 * 60 * 1000;

export const prerender = false;

async function ghGraphQL(token: string, query: string, variables: Record<string, unknown> = {}) {
	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			Authorization: `bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query, variables })
	});

	if (!res.ok) {
		throw new Error(`GitHub API respond ${res.status}`);
	}

	const payload = await res.json();
	if (payload?.errors?.length) {
		throw new Error(`GitHub GraphQL error: ${payload.errors[0].message}`);
	}

	return payload?.data?.viewer;
}

function mapWeeks(weeks: { contributionDays: ContributionDay[] }[]): DayCell[][] {
	return weeks.map((w) => w.contributionDays.map((d) => ({ count: d.contributionCount, date: d.date })));
}

export const GET: RequestHandler = async () => {
	if (cache && cache.expiresAt > Date.now()) {
		return json(cache.data);
	}

	const token = env.GH_TOKEN;
	if (!token) {
		return json(
			{ error: 'GH_TOKEN belum di-set. Tambahin di .env (lokal) atau Vercel env vars (deploy).' },
			{ status: 500 }
		);
	}

	try {
		const [profile, trailingViewer] = await Promise.all([
			ghGraphQL(token, PROFILE_QUERY),
			ghGraphQL(token, TRAILING_QUERY)
		]);
		const years: number[] = profile?.contributionsCollection?.contributionYears ?? [];

		const sortedYears = years.slice().sort((a, b) => a - b);
		const yearResults = await Promise.all(
			sortedYears.map((year) =>
				ghGraphQL(token, YEAR_QUERY, {
					from: `${year}-01-01T00:00:00.000Z`,
					to: `${year}-12-31T23:59:59.999Z`
				})
			)
		);

		const byYear: Record<string, DayCell[][]> = {};
		const days: ContributionDay[] = [];
		let total = 0;
		let commits = 0;

		sortedYears.forEach((year, i) => {
			const yearViewer = yearResults[i];
			const calendar = yearViewer?.contributionsCollection?.contributionCalendar;
			const yearWeeks: { contributionDays: ContributionDay[] }[] = calendar?.weeks ?? [];

			byYear[String(year)] = mapWeeks(yearWeeks);
			for (const w of yearWeeks) days.push(...w.contributionDays);

			total += calendar?.totalContributions ?? 0;
			commits += yearViewer?.contributionsCollection?.totalCommitContributions ?? 0;
		});

		const { current, longest } = computeStreaks(days);
		const activeDays = days.filter((d) => d.contributionCount > 0).length;

		const repoNodes: { stargazerCount: number }[] = profile?.repositories?.nodes ?? [];
		const stars = repoNodes.reduce((sum, r) => sum + (r.stargazerCount ?? 0), 0);

		const responseData = {
			years,
			weeks: mapWeeks(trailingViewer?.contributionsCollection?.contributionCalendar?.weeks ?? []),
			byYear,
			stats: {
				total,
				currentStreak: current,
				longestStreak: longest,
				activeDays,
				commits,
				repos: profile?.repositories?.totalCount ?? repoNodes.length,
				stars,
				followers: profile?.followers?.totalCount ?? 0
			}
		};

		cache = { data: responseData, expiresAt: Date.now() + TTL_MS };
		return json(responseData);
	} catch (err) {
		return json({ error: 'Gagal fetch data GitHub.' }, { status: 500 });
	}
};

const DAY_MS = 24 * 60 * 60 * 1000;

function utcDateStr(offsetDays: number): string {
	return new Date(Date.now() + offsetDays * DAY_MS).toISOString().slice(0, 10);
}

function isNextDay(prev: string, next: string): boolean {
	return Date.parse(`${next}T00:00:00Z`) - Date.parse(`${prev}T00:00:00Z`) === DAY_MS;
}

function computeStreaks(days: ContributionDay[]) {
	const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
	const counts = new Map(sorted.map((d) => [d.date, d.contributionCount]));

	let longest = 0;
	let run = 0;
	for (let i = 0; i < sorted.length; i++) {
		const contiguous = i === 0 || isNextDay(sorted[i - 1].date, sorted[i].date);
		if (sorted[i].contributionCount > 0 && contiguous) {
			run++;
			longest = Math.max(longest, run);
		} else {
			run = 0;
		}
	}

	let current = 0;
	let offset = 0;
	if ((counts.get(utcDateStr(offset)) ?? 0) === 0) {
		offset = -1;
	}
	while ((counts.get(utcDateStr(offset)) ?? 0) > 0) {
		current++;
		offset--;
	}

	return { current, longest };
}