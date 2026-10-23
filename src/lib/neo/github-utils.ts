/* Pure helpers for the neo GitHub section (same bucketing rules as the normal section). */
export type Day = { count: number; date: string };
export type Stats = {
	total: number;
	currentStreak: number;
	longestStreak: number;
	activeDays: number;
	commits: number;
	repos: number;
	stars: number;
	followers: number;
};
export type MonthBucket = { label: string; sortKey: string; count: number; pct: number };

const MONTH_ID = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];

export function levelFor(count: number) {
	if (count === 0) return 0;
	if (count <= 2) return 1;
	if (count <= 5) return 2;
	if (count <= 9) return 3;
	return 4;
}

export function formatDate(dateStr: string) {
	const d = new Date(`${dateStr}T00:00:00`);
	return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(d);
}

export function computeMonthly(weeksData: Day[][]): MonthBucket[] {
	const buckets = new Map<string, MonthBucket>();
	for (const day of weeksData.flat()) {
		const d = new Date(`${day.date}T00:00:00`);
		const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
		const existing = buckets.get(key);
		if (existing) existing.count += day.count;
		else buckets.set(key, { label: MONTH_ID[d.getMonth()], sortKey: key, count: day.count, pct: 0 });
	}
	const sorted = [...buckets.values()].sort((a, b) => a.sortKey.localeCompare(b.sortKey));
	const max = Math.max(1, ...sorted.map((m) => m.count));
	return sorted.map((m) => ({ ...m, pct: Math.max(4, Math.round((m.count / max) * 100)) }));
}
