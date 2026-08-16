<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { renderScramble } from '$lib/scramble';

	type Day = { count: number; date: string };
	type Stats = {
		total: number;
		currentStreak: number;
		longestStreak: number;
		activeDays: number;
		commits: number;
		repos: number;
		stars: number;
		followers: number;
	};
	type MonthBucket = { label: string; sortKey: string; count: number; pct: number };

	const GITHUB_URL = 'https://github.com/itsflaid';
	const year = new Date().getFullYear();

	const MONTH_ID = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];

	let weeks: Day[][] = [];
	let stats: Stats = {
		total: 0,
		currentStreak: 0,
		longestStreak: 0,
		activeDays: 0,
		commits: 0,
		repos: 0,
		stars: 0,
		followers: 0
	};
	let monthly: MonthBucket[] = [];
	let loading = true;
	let loadError = false;

	let trailingWeeks: Day[][] = [];
	let byYear: Record<string, Day[][]> = {};
	let years: number[] = [];
	let yearFilter: 'trailing' | number = 'trailing';
	let selectValue = 'trailing';

	let sectionEl: HTMLElement;
	let markEl: HTMLElement;
	let eyebrowEl: HTMLElement;
	let line1El: HTMLElement;
	let line2El: HTMLElement;
	let cursorEl: HTMLElement;
	let statsEl: HTMLElement;
	let metaEl: HTMLElement;
	let yearsEl: HTMLElement;
	let heatmapEl: HTMLElement;
	let legendEl: HTMLElement;
	let monthlyEl: HTMLElement;
	let insightEl: HTMLElement;
	let totalNumEl: HTMLElement;
	let streakNumEl: HTMLElement;
	let commitsNumEl: HTMLElement;
	let reposNumEl: HTMLElement;
	let starsNumEl: HTMLElement;
	let followersNumEl: HTMLElement;

	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	function levelFor(count: number) {
		if (count === 0) return 0;
		if (count <= 2) return 1;
		if (count <= 5) return 2;
		if (count <= 9) return 3;
		return 4;
	}

	function opacityFor(level: number) {
		return [0.06, 0.3, 0.55, 0.8, 1][level];
	}

	function formatDate(dateStr: string) {
		const d = new Date(`${dateStr}T00:00:00`);
		return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(d);
	}

	function insightText() {
		return `${stats.activeDays} HARI AKTIF · ${stats.longestStreak} HARI TERPANJANG`;
	}

	function formatCompact(n: number) {
		return new Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
	}

	function computeMonthly(weeksData: Day[][]): MonthBucket[] {
		const buckets = new Map<string, MonthBucket>();
		for (const day of weeksData.flat()) {
			const d = new Date(`${day.date}T00:00:00`);
			const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
			const existing = buckets.get(key);
			if (existing) {
				existing.count += day.count;
			} else {
				buckets.set(key, { label: MONTH_ID[d.getMonth()], sortKey: key, count: day.count, pct: 0 });
			}
		}
		const sorted = [...buckets.values()].sort((a, b) => a.sortKey.localeCompare(b.sortKey));
		const max = Math.max(1, ...sorted.map((m) => m.count));
		return sorted.map((m) => ({ ...m, pct: Math.max(4, Math.round((m.count / max) * 100)) }));
	}

	async function applyYear(value: 'trailing' | number) {
		yearFilter = value;
		selectValue = value === 'trailing' ? 'trailing' : String(value);
		weeks = value === 'trailing' ? trailingWeeks : (byYear[String(value)] ?? []);
		monthly = computeMonthly(weeks);
		await tick();
		const cells = gsap.utils.toArray<HTMLElement>(heatmapEl.querySelectorAll('.heatmap__cell'));
		gsap.set(cells, { opacity: (i, t) => parseFloat((t as HTMLElement).dataset.opacity ?? '0.06') });
		lockMonthlyWidth();
	}

	function lockMonthlyWidth() {
		const container = monthlyEl.parentElement?.clientWidth ?? 0;
		const target = Math.min(heatmapEl.offsetWidth, container);
		monthlyEl.style.width = `${target}px`;
		monthlyEl.style.maxWidth = '100%';
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isMobile = window.matchMedia('(max-width: 860px)').matches;

		let cleanup: (() => void) | null = null;

		(async () => {
			try {
				const res = await fetch('/api/github');
				const data = await res.json();
				if (!res.ok || data.error) throw new Error(data.error ?? 'unknown');
				weeks = data.weeks;
				trailingWeeks = data.weeks;
				byYear = data.byYear ?? {};
				years = data.years ?? [];
				stats = data.stats;
				monthly = computeMonthly(weeks);
			} catch {
				loadError = true;
			} finally {
				loading = false;
			}

			await tick();

			if (loadError) return;

			const cells = gsap.utils.toArray<HTMLElement>(heatmapEl.querySelectorAll('.heatmap__cell'));
			const rows = gsap.utils.toArray<HTMLElement>(statsEl.querySelectorAll('.stats__row'));
			const bars = gsap.utils.toArray<HTMLElement>(monthlyEl.querySelectorAll('.monthly__bar'));

			lockMonthlyWidth();

			if (reduceMotion) {
				gsap.set(eyebrowEl, { opacity: 1 });
				gsap.set([line1El, line2El], { y: '0%', x: '0rem' });
				gsap.set(cursorEl, { opacity: 1 });
				gsap.set(cells, { opacity: (i, t) => parseFloat((t as HTMLElement).dataset.opacity ?? '0.06') });
				gsap.set(rows, { opacity: 1, y: 0 });
				gsap.set([metaEl, yearsEl], { opacity: 1, y: 0 });
				gsap.set(bars, { scaleY: 1 });
				gsap.set(legendEl, { opacity: 1, y: 0 });
				totalNumEl.textContent = String(stats.total);
				streakNumEl.textContent = String(stats.currentStreak);
				commitsNumEl.textContent = String(stats.commits);
				reposNumEl.textContent = String(stats.repos);
				starsNumEl.textContent = formatCompact(stats.stars);
				followersNumEl.textContent = formatCompact(stats.followers);
				insightEl.textContent = insightText();
				return;
			}

			if (isMobile) {
				gsap.set(cells, { opacity: 0 });
				gsap.set(rows, { opacity: 0, y: 16 });
				gsap.set([metaEl, yearsEl], { opacity: 0, y: 10 });
				gsap.set(bars, { scaleY: 0 });
				gsap.set(legendEl, { opacity: 0, y: 10 });
				totalNumEl.textContent = '0';
				streakNumEl.textContent = '0';
				commitsNumEl.textContent = '0';
				reposNumEl.textContent = '0';
				starsNumEl.textContent = '0';
				followersNumEl.textContent = '0';
				insightEl.textContent = '';

				const mTl = gsap.timeline({
					scrollTrigger: { trigger: sectionEl, start: 'top 78%', toggleActions: 'play none none none' }
				});
				mTl.fromTo(line1El, { y: '105%', x: '-1rem' }, { y: '0%', x: '0rem', duration: 0.6, ease: 'power3.out' }, 0);
				mTl.fromTo(line2El, { y: '105%', x: '1rem' }, { y: '0%', x: '0rem', duration: 0.6, ease: 'power3.out' }, 0.12);
				mTl.to(cursorEl, { opacity: 1, duration: 0.2 }, 0.5);
				mTl.to(rows, { opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out' }, 0.2);
				mTl.to(metaEl, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.15);
				mTl.to(yearsEl, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.25);

				const mCounters = { total: 0, streak: 0, commits: 0, repos: 0, stars: 0, followers: 0 };
				mTl.to(
					mCounters,
					{
						total: stats.total,
						streak: stats.currentStreak,
						commits: stats.commits,
						repos: stats.repos,
						stars: stats.stars,
						followers: stats.followers,
						duration: 0.5,
						ease: 'power1.out',
						onUpdate: () => {
							totalNumEl.textContent = String(Math.floor(mCounters.total));
							streakNumEl.textContent = String(Math.floor(mCounters.streak));
							commitsNumEl.textContent = String(Math.floor(mCounters.commits));
							reposNumEl.textContent = String(Math.floor(mCounters.repos));
							starsNumEl.textContent = formatCompact(Math.floor(mCounters.stars));
							followersNumEl.textContent = formatCompact(Math.floor(mCounters.followers));
						}
					},
					0.2
				);

				mTl.to(
					cells,
					{
						opacity: (i, t) => parseFloat((t as HTMLElement).dataset.opacity ?? '0.06'),
						stagger: { amount: 0.5, from: 'start' },
						ease: 'none'
					},
					0.3
				);
				mTl.to(bars, { scaleY: 1, stagger: 0.03, duration: 0.35, ease: 'power2.out' }, 0.75);
				mTl.to(legendEl, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.95);
				mTl.call(
					() => {
						insightEl.textContent = insightText();
					},
					undefined,
					0.95
				);

				cleanup = () => {
					mTl.scrollTrigger?.kill();
					mTl.kill();
				};
				return;
			}

			gsap.set(cells, { opacity: 0 });
			gsap.set(rows, { opacity: 0, y: 16 });
			gsap.set([metaEl, yearsEl], { opacity: 0, y: 10 });
			gsap.set(bars, { scaleY: 0 });
			gsap.set(legendEl, { opacity: 0, y: 10 });
			gsap.set([line1El, line2El], { y: '105%' });

			let progress = 0;
			const counters = { total: 0, streak: 0, commits: 0, repos: 0, stars: 0, followers: 0 };

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top top',
					end: 'bottom bottom',
					scrub: 1.2,
					invalidateOnRefresh: true,
					onUpdate: (self) => {
						progress = self.progress;
					}
				}
			});

			tl.fromTo(line1El, { y: '105%', x: '-1.4rem' }, { y: '0%', x: '0rem', duration: 0.35, ease: 'power3.out' }, 0);
			tl.fromTo(line2El, { y: '105%', x: '1.4rem' }, { y: '0%', x: '0rem', duration: 0.35, ease: 'power3.out' }, 0.05);
			tl.to(cursorEl, { opacity: 1, duration: 0.05 }, 0.12);

			tl.to(rows, { opacity: 1, y: 0, stagger: 0.05, ease: 'power2.out' }, 0.15);
			tl.to([metaEl, yearsEl], { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.1);

			tl.to(
				cells,
				{
					opacity: (i, target) => parseFloat((target as HTMLElement).dataset.opacity ?? '0.06'),
					stagger: { amount: 0.5, from: 'start' },
					ease: 'none'
				},
				0.15
			);

			tl.to(
				counters,
				{
					total: stats.total,
					streak: stats.currentStreak,
					commits: stats.commits,
					repos: stats.repos,
					stars: stats.stars,
					followers: stats.followers,
					duration: 0.55,
					ease: 'power1.out',
					onUpdate: () => {
						totalNumEl.textContent = String(Math.floor(counters.total));
						streakNumEl.textContent = String(Math.floor(counters.streak));
						commitsNumEl.textContent = String(Math.floor(counters.commits));
						reposNumEl.textContent = String(Math.floor(counters.repos));
						starsNumEl.textContent = formatCompact(Math.floor(counters.stars));
						followersNumEl.textContent = formatCompact(Math.floor(counters.followers));
					}
				},
				0.15
			);

			tl.to(bars, { scaleY: 1, stagger: 0.03, duration: 0.35, ease: 'power2.out' }, 0.5);
			tl.to(legendEl, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.9);

			tl.fromTo(markEl, { yPercent: -6 }, { yPercent: 6, ease: 'none' }, 0);

			const targetInsight = insightText();
			let frame = 0;
			const ticker = () => {
				frame++;
				if (frame % 2 !== 0) return;
				if (progress < 0.82) {
					insightEl.textContent = '';
					return;
				}
				const local = Math.min((progress - 0.82) / 0.18, 1);
				insightEl.textContent = renderScramble(targetInsight, local);
			};
			gsap.ticker.add(ticker);

			cleanup = () => {
				gsap.ticker.remove(ticker);
				tl.scrollTrigger?.kill();
				tl.kill();
			};
		})();

		return () => cleanup?.();
	});
</script>

<section class="ghactivity" id="activity" bind:this={sectionEl}>
	<div class="ghactivity__stage">
		<span class="ghactivity__mark" aria-hidden="true" bind:this={markEl}>
			<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path
					d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
				/>
			</svg>
		</span>
		<span class="ghactivity__dots" aria-hidden="true">
			{#each dots as _}<i></i>{/each}
		</span>

		<div class="ghactivity__inner">
			<div class="ghactivity__left">
				<span class="eyebrow" bind:this={eyebrowEl}>// GITHUB ACTIVITY</span>
				<h2 class="heading">
					<span class="line-mask"><span class="line" bind:this={line1El}>STILL</span></span>
					<span class="line-mask"
						><span class="line" bind:this={line2El}
							>BUILDING<span class="cursor" bind:this={cursorEl}>_</span></span
						></span
					>
				</h2>

				{#if loadError}
					<p class="ghactivity__fallback">
						Data aktivitas GitHub lagi gak bisa dimuat. Cek langsung di
						<a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">github.com/itsflaid ↗</a>
					</p>
				{:else}
					<dl class="stats" bind:this={statsEl}>
						<div class="stats__row">
							<span class="stats__rule" aria-hidden="true"></span>
							<dt>TOTAL</dt>
							<dd><span bind:this={totalNumEl}>0</span> kontribusi</dd>
						</div>
						<div class="stats__row">
							<span class="stats__rule" aria-hidden="true"></span>
							<dt>STREAK</dt>
							<dd><span bind:this={streakNumEl}>0</span> hari berturut-turut</dd>
						</div>
						<div class="stats__row">
							<span class="stats__rule" aria-hidden="true"></span>
							<dt>COMMIT</dt>
							<dd><span bind:this={commitsNumEl}>0</span> commit</dd>
						</div>
						<div class="stats__row">
							<span class="stats__rule" aria-hidden="true"></span>
							<dt>REPO</dt>
							<dd><span bind:this={reposNumEl}>0</span> repo publik</dd>
						</div>
					</dl>

					<p class="ghactivity__insight" bind:this={insightEl} aria-hidden="true"></p>

					<a 
						class="ghactivity__link"
						href={GITHUB_URL}
						target="_blank"
						rel="noopener noreferrer"
						data-cursor-text="OPEN"
					>
						FULL PROFILE ↗
					</a>
				{/if}
			</div>

			{#if !loadError}
				<div class="ghactivity__right">
					<div class="ghactivity__meta" bind:this={metaEl}>
						<span class="ghactivity__meta-item" data-cursor-text="{stats.stars} bintang">
						<span class="ghactivity__meta-icon" aria-hidden="true">★</span>
						<span bind:this={starsNumEl}>0</span>
						</span>
						<span class="ghactivity__meta-item" data-cursor-text="{stats.followers} followers">
						<span class="ghactivity__meta-person" aria-hidden="true"></span>
						<span bind:this={followersNumEl}>0</span>
						</span>
					</div>

					<div class="ghactivity__years" bind:this={yearsEl} aria-label="Filter tahun">
						<div class="ghactivity__years-btns">
							<button
								class="ghactivity__year"
								class:is-active={yearFilter === 'trailing'}
								type="button"
								onclick={() => applyYear('trailing')}
							>12 BULAN</button>
							{#each years as y}
								<button
									class="ghactivity__year"
									class:is-active={yearFilter === y}
									type="button"
									onclick={() => applyYear(y)}
								>{y}</button>
							{/each}
						</div>
						<div class="ghactivity__years-mobile">
							<select
								bind:value={selectValue}
								onchange={() => applyYear(selectValue === 'trailing' ? 'trailing' : Number(selectValue))}
							>
								<option value="trailing">12 BULAN</option>
								{#each years as y}
									<option value={y}>{y}</option>
								{/each}
							</select>
						</div>
					</div>

					<div class="monthly" bind:this={monthlyEl}>
						{#each monthly as m}
							<div class="monthly__col">
								<div class="monthly__track">
									<span
										class="monthly__bar"
										style="height: {m.pct}%"
										data-cursor-text="{m.count} kontribusi"
										title="{m.label} · {m.count} kontribusi"
									></span>
								</div>
								<span class="monthly__label">{m.label}</span>
							</div>
						{/each}
					</div>

					<div class="heatmap-wrap">
						{#if loading}
							<p class="ghactivity__loading">LOADING_</p>
						{/if}
						<div class="heatmap-scroll">
						<div class="heatmap" bind:this={heatmapEl}>
							{#each weeks as week}
								<div class="heatmap__col">
									{#each week as day}
										<span
											class="heatmap__cell"
											style="--opacity: {opacityFor(levelFor(day.count))}"
											data-opacity={opacityFor(levelFor(day.count))}
											data-cursor-text="{day.count} kontribusi"
											title="{day.count} kontribusi · {formatDate(day.date)}"
										></span>
									{/each}
								</div>
							{/each}
						</div>
						<div class="heatmap__legend" bind:this={legendEl} aria-hidden="true">
							<span>Less</span>
							<i class="heatmap__cell" style="--opacity:.06"></i>
							<i class="heatmap__cell" style="--opacity:.3"></i>
							<i class="heatmap__cell" style="--opacity:.55"></i>
							<i class="heatmap__cell" style="--opacity:.8"></i>
							<i class="heatmap__cell" style="--opacity:1"></i>
							<span>More</span>
						</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.ghactivity {
		position: relative;
		min-height: 220vh;
		background: var(--white);
		color: var(--black);
		z-index: 3;
	}
	.ghactivity__stage {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		padding-block: clamp(1.75rem, 6vw, 4.5rem);
	}
	.ghactivity__mark {
		position: absolute;
		bottom: -1vw;
		right: 3vw;
		width: clamp(14rem, 30vw, 26rem);
		height: auto;
		color: var(--black);
		opacity: 0.07;
		z-index: 0;
		user-select: none;
		pointer-events: none;
	}
	.ghactivity__mark svg {
		display: block;
		width: 100%;
		height: auto;
	}
	.ghactivity__dots {
		position: absolute;
		top: clamp(1.5rem, 4vw, 3rem);
		right: clamp(1.5rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		z-index: 1;
		pointer-events: none;
	}
	.ghactivity__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--black);
		font-style: normal;
		opacity: 0.08;
		animation: gh-dot-blink 3s ease-in-out infinite;
	}
	.ghactivity__dots i:nth-child(2) { animation-delay: 0.3s; }
	.ghactivity__dots i:nth-child(3) { animation-delay: 0.6s; }
	.ghactivity__dots i:nth-child(4) { animation-delay: 0.9s; }
	.ghactivity__dots i:nth-child(5) { animation-delay: 1.2s; }
	.ghactivity__dots i:nth-child(6) { animation-delay: 1.5s; }
	.ghactivity__dots i:nth-child(7) { animation-delay: 1.8s; }
	.ghactivity__dots i:nth-child(8) { animation-delay: 2.1s; }
	.ghactivity__dots i:nth-child(9) { animation-delay: 2.4s; }

	.ghactivity__inner {
		position: relative;
		z-index: 1;
		width: 100%;
		display: grid;
		grid-template-columns: minmax(240px, 35%) 1fr;
		gap: clamp(2rem, 5vw, 4rem);
		padding-inline: clamp(2rem, 7vw, 5.5rem);
	}

	.ghactivity__left {
		display: flex;
		flex-direction: column;
		gap: clamp(0.6rem, 1.6vh, 1rem);
	}

	.eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		color: var(--gray);
	}
	.heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.01em;
		font-size: clamp(2.6rem, 6vw, 4.5rem);
	}
	.line-mask {
		display: block;
		overflow: hidden;
	}
	.line {
		display: block;
		transform: translateY(105%);
	}
	.cursor {
		display: inline-block;
		margin-left: 0.05em;
		opacity: 0;
		animation: gh-blink 1s step-end infinite;
	}

	.stats {
		margin: clamp(0.5rem, 1.6vh, 1rem) 0 0;
		display: flex;
		flex-direction: column;
	}
	.stats__row {
		position: relative;
		display: flex;
		align-items: baseline;
		gap: 1.25rem;
		padding: 0.55rem 0;
	}
	.stats__rule {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: rgba(10, 10, 10, 0.14);
	}
	.stats__row dt {
		flex: 0 0 auto;
		width: 6.5rem;
		margin: 0;
		font-family: var(--ff-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.stats__row dd {
		margin: 0;
		font-family: var(--ff-body);
		font-size: 0.9rem;
		color: var(--black);
	}
	.stats__row dd span {
		font-family: var(--ff-mono);
		font-weight: 600;
	}

	.ghactivity__insight {
		margin: 0.4rem 0 0;
		font-family: var(--ff-mono);
		font-size: 0.76rem;
		letter-spacing: 0.06em;
		color: var(--gray);
		min-height: 1em;
		white-space: pre;
	}

	.ghactivity__link {
		align-self: flex-start;
		margin-top: clamp(0.6rem, 1.6vh, 1rem);
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.05em;
		color: var(--black);
		border-bottom: 1px solid rgba(10, 10, 10, 0.3);
		padding-bottom: 0.2rem;
		transition: border-color 0.2s ease;
	}
	.ghactivity__link:hover {
		border-color: var(--black);
	}

	.ghactivity__fallback {
		font-family: var(--ff-body);
		font-size: 0.92rem;
		color: var(--ink-soft);
		max-width: 26rem;
	}
	.ghactivity__fallback a {
		border-bottom: 1px solid rgba(10, 10, 10, 0.3);
	}

	.ghactivity__right {
		display: flex;
		flex-direction: column;
		gap: clamp(1.5rem, 4vh, 2.5rem);
		min-width: 0;
	}

	.ghactivity__meta {
		display: flex;
		align-self: flex-end;
		gap: 1.1rem;
	}
	.ghactivity__years {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.35rem;
		align-self: flex-end;
		margin-top: -1rem;
	}
	.ghactivity__years-btns {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.ghactivity__years-mobile {
		display: none;
	}
	.ghactivity__years-mobile select {
		font-family: var(--ff-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		padding: 0.3rem 0.4rem;
		border: 0;
		border-bottom: 1px solid rgba(10, 10, 10, 0.3);
		background: var(--white);
		color: var(--gray);
		cursor: pointer;
	}
	.ghactivity__year {
		font-family: var(--ff-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		padding: 0.25rem 0;
		border: 0;
		border-bottom: 1px solid rgba(10, 10, 10, 0.3);
		background: transparent;
		color: var(--gray);
		cursor: pointer;
		transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
	}
	.ghactivity__year:hover {
		border-color: var(--black);
		color: var(--black);
	}
	.ghactivity__year.is-active {
		background: var(--black);
		border-bottom: 0;
		color: var(--white);
		padding-inline: 0.65rem;
	}
	.ghactivity__meta-item {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-family: var(--ff-mono);
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--black);
	}
	.ghactivity__meta-icon {
		font-size: 1.1rem;
		line-height: 1;
		opacity: 0.65;
		flex-shrink: 0;
	}
	.ghactivity__meta-person {
		position: relative;
		display: inline-block;
		width: 0.95rem;
		height: 0.95rem;
		flex-shrink: 0;
		opacity: 0.65;
	}
	.ghactivity__meta-person::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: currentColor;
	}
	.ghactivity__meta-person::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
		width: 0.82rem;
		height: 0.48rem;
		border-radius: 50% 50% 0.15rem 0.15rem;
		background: currentColor;
	}

	.ghactivity__loading {
		font-family: var(--ff-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		animation: gh-blink 1.2s step-end infinite;
	}

	.heatmap-wrap {
		position: relative;
		width: 100%;
		max-width: 100%;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		touch-action: pan-x;
		scrollbar-width: none;
		padding-bottom: 0.5rem;
	}
	.heatmap-wrap::-webkit-scrollbar {
		display: none;
	}

	.heatmap-scroll {
		width: max-content;
		margin-left: auto;
	}

	.heatmap {
		display: flex;
		gap: 3px;
		width: max-content;
	}
	.heatmap__col {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.heatmap__cell {
		display: block;
		width: 11px;
		height: 11px;
		background: var(--black);
		opacity: var(--opacity, 0.06);
		will-change: opacity;
	}

	.heatmap__legend {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 1rem;
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.05em;
		color: var(--gray);
		position: sticky;
		left: 0;
		width: max-content;
		background: var(--white);
		padding-right: 0.5rem;
	}
	.heatmap__legend .heatmap__cell {
		width: 9px;
		height: 9px;
	}

	.monthly {
		display: flex;
		align-items: flex-end;
		gap: 3px;
		margin-top: auto;
		margin-left: auto;
	}
	.monthly__col {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	.monthly__track {
		width: 100%;
		max-width: 26px;
		height: 96px;
		display: flex;
		align-items: flex-end;
	}
	.monthly__bar {
		display: block;
		width: 100%;
		background: var(--black);
		opacity: 0.8;
		transform-origin: bottom;
	}
	.monthly__label {
		font-family: var(--ff-mono);
		font-size: 0.6rem;
		letter-spacing: 0.03em;
		color: var(--gray);
	}

	@keyframes gh-blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
	@keyframes gh-dot-blink {
		0%, 100% { opacity: 0.08; }
		50% { opacity: 0.34; }
	}

	@media (max-width: 860px) {
		.ghactivity {
			min-height: auto;
		}
		.ghactivity__years-btns {
			display: none;
		}
		.ghactivity__years-mobile {
			display: block;
		}
		.ghactivity__stage {
			position: relative;
			top: auto;
			height: auto;
			padding-block: clamp(3rem, 10vh, 4.5rem);
		}
		.ghactivity__inner {
			grid-template-columns: 1fr;
			gap: clamp(1.5rem, 4vh, 2.5rem);
			padding-inline: clamp(1.5rem, 6vw, 3rem);
		}
		.heading {
			font-size: clamp(2.2rem, 11vw, 3rem);
		}
		.monthly {
			width: 100%;
			gap: 3px;
		}
		.monthly__track {
			height: 72px;
			max-width: 22px;
		}
		.monthly__label {
			font-size: 0.55rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
			opacity: 1;
		}
		.ghactivity__dots i {
			animation: none;
			opacity: 0.2;
		}
		.ghactivity__loading {
			animation: none;
		}
	}
</style>