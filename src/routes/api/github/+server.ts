import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const prerender = false;

const GITHUB_GRAPHQL = 'https://api.github.com/graphql';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const USERNAME = env.GH_USERNAME || 'itsflaid';

type Day = { date: string; count: number; level: number };
type Week = { days: Day[] };
type Payload = {
	ok: boolean;
	error?: string;
	username?: string;
	year?: number;
	weeks?: Week[];
	totalContributions?: number;
	currentStreak?: number;
	longestStreak?: number;
	activeDays?: number;
	activeWeeks?: number;
};

let cache: { at: number; payload: Payload } | null = null;

const LEVEL_MAP: Record<string, number> = {
	NONE: 0,
	FIRST_QUARTER: 1,
	HALF: 2,
	THREE_QUARTERS: 3,
	FULL: 4
};

function toIso(d: Date) {
	return d.toISOString().slice(0, 10);
}

function computeStreaks(days: Day[]) {
	let currentStreak = 0;
	let longestStreak = 0;
	let activeDays = 0;
	let run = 0;

	for (const day of days) {
		if (day.count > 0) {
			run++;
			activeDays++;
			if (run > longestStreak) longestStreak = run;
		} else {
			run = 0;
		}
	}

	for (let i = days.length - 1; i >= 0; i--) {
		if (days[i].count > 0) {
			let j = i;
			while (j >= 0 && days[j].count > 0) j--;
			currentStreak = i - j;
			break;
		}
	}

	return { currentStreak, longestStreak, activeDays };
}

async function queryCalendar(token: string) {
	const to = new Date();
	const from = new Date(to);
	from.setDate(from.getDate() - 364);

	const query = `
		query($login: String!, $from: DateTime!, $to: DateTime!) {
			user(login: $login) {
				contributionsCollection(from: $from, to: $to) {
					contributionCalendar {
						totalContributions
						weeks {
							contributionDays {
								contributionCount
								contributionLevel
								date
							}
						}
					}
				}
			}
		}`;

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 10000);

	try {
		const res = await fetch(GITHUB_GRAPHQL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				query,
				variables: { login: USERNAME, from: toIso(from), to: toIso(to) }
			}),
			signal: controller.signal
		});
		clearTimeout(timeout);

		if (!res.ok) {
			return { error: `GitHub responded ${res.status}` };
		}

		const body = await res.json();
		if (body.errors?.length) {
			return { error: body.errors[0].message };
		}

		const calendar = body.data?.user?.contributionsCollection?.contributionCalendar;
		if (!calendar) return { error: 'No contribution calendar returned' };

		const weeks: Week[] = (calendar.weeks as Array<{
			contributionDays: Array<{
				contributionCount: number;
				contributionLevel: string;
				date: string;
			}>
		}>).map((week) => ({
			days: week.contributionDays.map((day) => ({
				date: day.date,
				count: day.contributionCount,
				level: LEVEL_MAP[day.contributionLevel] ?? 0
			}))
		}));

		const allDays = weeks.flatMap((w) => w.days);
		const { currentStreak, longestStreak, activeDays } = computeStreaks(allDays);
		const activeWeeks = weeks.filter((w) => w.days.some((d) => d.count > 0)).length;

		return {
			payload: {
				ok: true,
				username: USERNAME,
				year: to.getFullYear(),
				weeks,
				totalContributions: calendar.totalContributions as number,
				currentStreak,
				longestStreak,
				activeDays,
				activeWeeks
			}
		};
	} catch (err) {
		clearTimeout(timeout);
		return { error: err instanceof Error ? err.message : 'Unknown error' };
	}
}

export async function GET() {
	const now = Date.now();
	if (cache && now - cache.at < CACHE_TTL_MS) {
		return json(cache.payload, {
			headers: cache.payload.ok
				? { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' }
				: {}
		});
	}

	const token = env.GH_TOKEN;
	if (!token) {
		const payload: Payload = { ok: false, error: 'GH_TOKEN is not set', weeks: [] };
		cache = { at: now, payload };
		return json(payload);
	}

	const result = await queryCalendar(token);

	let payload: Payload;
	if ('error' in result) {
		if (cache) {
			payload = cache.payload;
		} else {
			payload = { ok: false, error: result.error, weeks: [] };
		}
	} else {
		payload = result.payload;
	}

	cache = { at: now, payload };
	return json(payload, {
		headers: payload.ok
			? { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' }
			: {}
	});
}
