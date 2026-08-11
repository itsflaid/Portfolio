<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { scrambleText, scrambledPlaceholder } from '$lib/scramble';

	const statDefs = [
		{ key: 'totalContributions', label: 'KONTRIBUSI · 1 TAHUN' },
		{ key: 'currentStreak', label: 'STREAK HARI INI' },
		{ key: 'longestStreak', label: 'STREAK TERBAIK' },
		{ key: 'activeDays', label: 'HARI AKTIF' }
	];

	const LEVEL_OPACITY = [0.05, 0.2, 0.36, 0.58, 0.88];
	const year = new Date().getFullYear();

	type GithubPayload = {
		ok: boolean;
		username?: string;
		year?: number;
		weeks?: { days: { date: string; count: number; level: number }[] }[];
		totalContributions?: number;
		currentStreak?: number;
		longestStreak?: number;
		activeDays?: number;
		activeWeeks?: number;
	};

	let activityEl: HTMLElement;
	let eyebrowEl: HTMLElement;
	let line1El: HTMLElement;
	let line2El: HTMLElement;
	let cursorEl: HTMLElement;
	let gridEl: HTMLElement;
	let statsEl: HTMLElement;
	let insightEl: HTMLElement;
	let insightTextEl: HTMLElement;
	let markEl: HTMLElement;
	let dotsEl: HTMLElement;

	let cleanup: (() => void) | null = null;

	let payload: GithubPayload | null = null;
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	function ramp(level: number) {
		return LEVEL_OPACITY[level] ?? LEVEL_OPACITY[0];
	}

	function fmt(n: number) {
		return Math.round(n).toLocaleString('en-US');
	}

	function buildInsight(p: GithubPayload) {
		const total = p.totalContributions ?? 0;
		const weeks = p.activeWeeks ?? 0;
		return `${fmt(total)} KONTRIBUSI · ${fmt(weeks)} MINGGU AKTIF`;
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isMobile = window.matchMedia('(max-width: 860px)').matches;

		async function load() {
			try {
				const res = await fetch('/api/github');
				payload = (await res.json()) as GithubPayload;
			} catch {
				payload = { ok: false, weeks: [] };
			}

			if (!payload.weeks?.length) {
				payload = { ...payload, ok: false, weeks: [] };
			}

			await tick();
			init();
		}

		function init() {
			const weeks = payload?.weeks ?? [];
			if (!weeks.length) return;

			const cells = gsap.utils.toArray<HTMLElement>(gridEl.querySelectorAll('.activity__cell'));
			const values = gsap.utils.toArray<HTMLElement>(statsEl.querySelectorAll('.activity__stat-value'));

			insightTextEl.textContent = scrambledPlaceholder(buildInsight(payload!));

			if (reduceMotion) {
				gsap.set(eyebrowEl, { opacity: 1 });
				gsap.set([line1El, line2El], { y: '0%', x: '0rem' });
				gsap.set(cursorEl, { opacity: 1 });
				gsap.set(cells, { opacity: (i) => ramp(Number(cells[i].dataset.level)) });
				values.forEach((el, i) => {
					el.textContent = fmt(payload![statDefs[i].key as keyof GithubPayload] as number ?? 0);
				});
				gsap.set(values, { opacity: 1 });
				insightTextEl.textContent = buildInsight(payload!);
				gsap.set(insightEl, { opacity: 1, y: 0 });
				gsap.set(dotsEl, { opacity: 1 });
				return;
			}

			let progress = 0;

			const scrollTrigger = isMobile
				? {
						trigger: activityEl,
						start: 'top 78%',
						toggleActions: 'play none none none',
						onUpdate: (self: { progress: number }) => {
							progress = self.progress;
						}
					}
				: {
						trigger: activityEl,
						start: 'top top',
						end: 'bottom bottom',
						scrub: 1,
						onUpdate: (self: { progress: number }) => {
							progress = self.progress;
						},
						onEnter: () => {
							gridEl.style.willChange = 'opacity';
						},
						onLeave: () => {
							gridEl.style.willChange = '';
						}
					};

			const tl = gsap.timeline({ scrollTrigger });

			// 0–~0.1: eyebrow + heading mask-wipe.
			tl.fromTo(eyebrowEl, { opacity: 0 }, { opacity: 1, duration: 0.08, ease: 'none' }, 0);
			tl.fromTo(
				line1El,
				{ y: '105%', x: '-1.4rem' },
				{ y: '0%', x: '0rem', duration: 0.5, ease: 'power3.out' },
				0.02
			);
			tl.fromTo(
				line2El,
				{ y: '105%', x: '1.4rem' },
				{ y: '0%', x: '0rem', duration: 0.5, ease: 'power3.out' },
				0.06
			);
			tl.to(cursorEl, { opacity: 1, duration: 0.15 }, 0.55);

			// ~0.12–0.76: heatmap columns light up left → right, scrubbed.
			// One tween + stagger (column-major DOM = column-by-column sweep),
			// opacity-only so it stays on the compositor.
			tl.to(
				cells,
				{
					opacity: (i) => ramp(Number(cells[i].dataset.level)),
					duration: 0.02,
					stagger: 0.0017,
					ease: 'none'
				},
				0.12
			);

			// Stats count-up, driven by the same scrub (not autoplay).
			values.forEach((el, i) => {
				const end = payload![statDefs[i].key as keyof GithubPayload] as number ?? 0;
				const pos = 0.2 + i * 0.06;
				const holder = { v: 0 };
				tl.fromTo(
					holder,
					{ v: 0 },
					{
						v: end,
						duration: 0.34,
						ease: 'none',
						onUpdate: () => {
							el.textContent = fmt(holder.v);
						}
					},
					pos
				);
				tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: 'none' }, pos);
			});

			// Watermark parallax across the whole pin.
			tl.fromTo(markEl, { yPercent: 10 }, { yPercent: -10, duration: 1, ease: 'none' }, 0);

			tl.fromTo(dotsEl, { opacity: 0 }, { opacity: 1, duration: 0.1, ease: 'none' }, 0.7);

			// ~0.78–1: insight line reveals, scramble resolved by scroll.
			tl.fromTo(
				insightEl,
				{ opacity: 0, y: 12 },
				{ opacity: 1, y: 0, duration: 0.1, ease: 'none' },
				0.78
			);

			let frame = 0;
			const ticker = () => {
				frame++;
				if (frame % 2 !== 0) return;
				const local = gsap.utils.clamp(0, 1, (progress - 0.78) / 0.22);
				insightTextEl.textContent = scrambleText(buildInsight(payload!), local);
			};
			gsap.ticker.add(ticker);

			// Free the compositor once the section has fully played.
			if (!isMobile) {
				tl.eventCallback('onComplete', () => {
					gridEl.style.willChange = '';
				});
			}

			cleanup = () => {
				gsap.ticker.remove(ticker);
				tl.scrollTrigger?.kill();
				tl.kill();
			};
		}

		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);

		load();

		return () => {
			window.removeEventListener('load', onLoad);
			cleanup?.();
		};
	});
</script>

<section class="activity" id="activity" bind:this={activityEl}>
	<span class="activity__mark" bind:this={markEl} aria-hidden="true">{year}</span>
	<span class="activity__dots" bind:this={dotsEl} aria-hidden="true">
		{#each dots as _}<i></i>{/each}
	</span>

	<div class="activity__stage">
		<div class="activity__inner">
			<div class="activity__head">
				<span class="activity__eyebrow" bind:this={eyebrowEl}>// ACTIVITY</span>
				<h2 class="activity__heading">
					<span class="line-mask"><span class="line" bind:this={line1El}>STILL</span></span>
					<span class="line-mask"
						><span class="line" bind:this={line2El}
							>GOING<span class="cursor" bind:this={cursorEl}>_</span></span
						></span
					>
				</h2>
			</div>

			<div class="activity__grid-scroll">
				<div class="activity__grid" bind:this={gridEl}>
					{#if payload?.weeks}
						{#each payload.weeks as week}
							{#each week.days as day}
								<i
									class="activity__cell"
									style="--lvl: {day.level}"
									data-level={day.level}
									title="{day.date} · {day.count} kontribusi"
								></i>
							{/each}
						{/each}
					{/if}
				</div>
			</div>

			<div class="activity__stats" bind:this={statsEl}>
				{#each statDefs as stat}
					<div class="activity__stat">
						<span class="activity__stat-value">0</span>
						<span class="activity__stat-label">{stat.label}</span>
					</div>
				{/each}
			</div>

			<span class="activity__insight" bind:this={insightEl}>
				<span bind:this={insightTextEl}>—</span>
			</span>
		</div>
	</div>
</section>

<style>
	.activity {
		position: relative;
		height: 180vh;
		background: var(--black);
		color: var(--fg-dark);
		z-index: 3;
	}
	.activity__stage {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(2rem, 6vh, 4rem) clamp(1.25rem, 4vw, 4rem);
	}
	.activity__inner {
		position: relative;
		z-index: 1;
		width: min(100%, 1160px);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(1.25rem, 3.5vh, 2.4rem);
	}

	.activity__head {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: clamp(0.4rem, 1.2vh, 0.7rem);
	}
	.activity__eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		opacity: 0;
	}
	.activity__heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.92;
		letter-spacing: 0.01em;
		font-size: clamp(2.6rem, 7vw, 5.5rem);
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
		font-family: var(--ff-mono);
		margin-left: 0.05em;
		opacity: 0;
		animation: activity-blink 1s step-end infinite;
	}

	.activity__grid-scroll {
		width: 100%;
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scrollbar-width: thin;
		scrollbar-color: #1c1c1a var(--black);
	}
	.activity__grid {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: var(--cell);
		grid-template-rows: repeat(7, var(--cell));
		gap: var(--cell-gap);
		width: max-content;
		margin: 0 auto;
		padding: clamp(0.75rem, 1.8vh, 1.25rem);
		border: 1px solid rgba(241, 241, 239, 0.12);
		border-radius: 10px;
		--cell: clamp(8px, 1.35vw, 15px);
		--cell-gap: clamp(2px, 0.4vw, 5px);
	}
	.activity__cell {
		display: block;
		width: var(--cell);
		height: var(--cell);
		border-radius: 3px;
		background: var(--fg-dark);
		opacity: 0;
	}
	.activity__cell:hover {
		background: var(--gray);
	}

	.activity__stats {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: clamp(1.25rem, 4vw, 3.5rem);
	}
	.activity__stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
	}
	.activity__stat-value {
		font-family: var(--ff-mono);
		font-size: clamp(1.6rem, 4vw, 2.8rem);
		line-height: 1;
		color: var(--fg-dark);
		opacity: 0;
		font-variant-numeric: tabular-nums;
	}
	.activity__stat-label {
		font-family: var(--ff-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}

	.activity__insight {
		font-family: var(--ff-mono);
		font-size: clamp(0.85rem, 1.4vw, 1.05rem);
		letter-spacing: 0.04em;
		color: var(--fg-dark);
		opacity: 0;
		white-space: nowrap;
	}

	/* Ghost watermark + dot decor — reuse motif dari Nav/Footer/Skills. */
	.activity__mark {
		position: absolute;
		left: -0.5vw;
		bottom: -3vw;
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.01em;
		font-size: clamp(6rem, 18vw, 15rem);
		line-height: 1;
		color: var(--fg-dark);
		opacity: 0.04;
		z-index: 0;
		user-select: none;
		pointer-events: none;
	}
	.activity__dots {
		position: absolute;
		top: clamp(1.5rem, 4vw, 3rem);
		right: clamp(1.5rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		z-index: 1;
		pointer-events: none;
		opacity: 0;
	}
	.activity__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--fg-dark);
		font-style: normal;
		opacity: 0.08;
		animation: activity-dot-blink 3s ease-in-out infinite;
	}
	.activity__dots i:nth-child(2) { animation-delay: 0.3s; }
	.activity__dots i:nth-child(3) { animation-delay: 0.6s; }
	.activity__dots i:nth-child(4) { animation-delay: 0.9s; }
	.activity__dots i:nth-child(5) { animation-delay: 1.2s; }
	.activity__dots i:nth-child(6) { animation-delay: 1.5s; }
	.activity__dots i:nth-child(7) { animation-delay: 1.8s; }
	.activity__dots i:nth-child(8) { animation-delay: 2.1s; }
	.activity__dots i:nth-child(9) { animation-delay: 2.4s; }

	@keyframes activity-blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
	@keyframes activity-dot-blink {
		0%, 100% { opacity: 0.08; }
		50% { opacity: 0.34; }
	}

	@media (max-width: 860px) {
		.activity {
			height: auto;
		}
		.activity__stage {
			position: relative;
			top: auto;
			height: auto;
			padding: clamp(4rem, 10vh, 5rem) 1.25rem;
		}
		.activity__inner {
			gap: clamp(1.5rem, 4vh, 2.5rem);
		}
		.activity__grid {
			margin: 0 auto;
			--cell: 9px;
			--cell-gap: 3px;
		}
		.activity__stats {
			gap: clamp(1.25rem, 6vw, 2.5rem);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
			opacity: 1;
		}
		.activity__dots i {
			animation: none;
			opacity: 0.2;
		}
	}
</style>
