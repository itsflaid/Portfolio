import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

// Server-only: GH_TOKEN never reaches the client bundle. Uses `viewer` in the
// GraphQL query, so the token's own account is the one being read — no
// username needs to be passed or hardcoded here.
const QUERY = `
	query {
		viewer {
			followers {
				totalCount
			}
			repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
				nodes {
					stargazerCount
				}
			}
			contributionsCollection {
				contributionCalendar {
					totalContributions
					weeks {
						contributionDays {
							contributionCount
							date
							weekday
						}
					}
				}
			}
		}
	}
`;

type ContributionDay = { contributionCount: number; date: string; weekday: number };

type CacheEntry = { data: unknown; expiresAt: number };
let cache: CacheEntry | null = null;
const TTL_MS = 60 * 60 * 1000; // 1 jam — cukup buat data yang cuma berubah kalau ngoding lagi

// Jangan di-prerender jadi file statis: endpoint ini butuh baca GH_TOKEN dari
// runtime env (serverless function) di Vercel, bukan dari build time. Kalau
// di-prerender, data kebeku saat build dan env gak kebaca.
export const prerender = false;

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
		const res = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				Authorization: `bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query: QUERY })
		});

		if (!res.ok) {
			return json({ error: `GitHub API respond ${res.status}` }, { status: 502 });
		}

		const payload = await res.json();
		const viewer = payload?.data?.viewer;
		const calendar = viewer?.contributionsCollection?.contributionCalendar;

		if (!calendar) {
			return json({ error: 'Response GitHub GraphQL gak sesuai bentuk yang diharapkan.' }, { status: 502 });
		}

		const weeks: { contributionDays: ContributionDay[] }[] = calendar.weeks ?? [];
		const days: ContributionDay[] = weeks.flatMap((w) => w.contributionDays);

		const { current, longest } = computeStreaks(days);
		const mostActiveDay = computeMostActiveDay(days);

		const followers = viewer?.followers?.totalCount ?? 0;
		// Repo publik non-fork lu > 100? Stars dari sisanya gak ke-hitung —
		// GitHub gak punya field agregat langsung, jadi ini di-sum manual
		// dari first 100. Cukup buat hampir semua profile portfolio.
		const repoNodes: { stargazerCount: number }[] = viewer?.repositories?.nodes ?? [];
		const stars = repoNodes.reduce((sum, r) => sum + (r.stargazerCount ?? 0), 0);

		const responseData = {
			// Client cuma butuh count + date per cell buat render heatmap & tooltip —
			// weekday udah dipakai di sini buat itung stat, gak perlu ikut dikirim.
			weeks: weeks.map((w) => w.contributionDays.map((d) => ({ count: d.contributionCount, date: d.date }))),
			stats: {
				total: calendar.totalContributions ?? 0,
				currentStreak: current,
				longestStreak: longest,
				mostActiveDay,
				stars,
				followers
			}
		};

		cache = { data: responseData, expiresAt: Date.now() + TTL_MS };
		return json(responseData);
	} catch (err) {
		return json({ error: 'Gagal fetch data GitHub.' }, { status: 500 });
	}
};

function computeStreaks(days: ContributionDay[]) {
	let longest = 0;
	let run = 0;
	for (const d of days) {
		if (d.contributionCount > 0) {
			run++;
			longest = Math.max(longest, run);
		} else {
			run = 0;
		}
	}

	// Current streak dihitung mundur dari hari terakhir (hari ini). Kalau hari
	// ini masih 0 kontribusi, itu wajar — belum tentu udah ngoding hari ini,
	// bukan berarti streak putus. Lanjut hitung dari kemarin.
	let current = 0;
	for (let i = days.length - 1; i >= 0; i--) {
		const isToday = i === days.length - 1;
		if (days[i].contributionCount > 0) {
			current++;
		} else if (isToday) {
			continue;
		} else {
			break;
		}
	}

	return { current, longest };
}

function computeMostActiveDay(days: ContributionDay[]) {
	// Pakai field `weekday` yang udah dikasih langsung sama GitHub (0=Sun..6=Sat)
	// — bukan re-parse string tanggal secara manual, biar gak kena bug offset
	// timezone kayak yang pernah kejadian di UTC checklist DailyFit dulu.
	const totals = [0, 0, 0, 0, 0, 0, 0];
	for (const d of days) {
		totals[d.weekday] += d.contributionCount;
	}
	const maxIdx = totals.indexOf(Math.max(...totals));
	const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return names[maxIdx];
}