<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	type Project = { index: string; title: string; tag: string; thumb: string };

	// Placeholder copy — swap titles/tags once the real case-study text is ready.
	const projects: Project[] = [
		{
			index: '01',
			title: 'DEVMAP',
			tag: 'Context layer that helps AI actually read a codebase',
			thumb: '/devmap.webp'
		},
		{
			index: '02',
			title: 'CHATME',
			tag: 'Self-chat & notes PWA — a place to remember things',
			thumb: '/chatme.webp'
		},
		{
			index: '03',
			title: 'DAILYFIT',
			tag: 'Training tracker with rolling PDF reports',
			thumb: '/dailyfit.webp'
		},
		{
			index: '04',
			title: 'MUFADZ PORTAL',
			tag: 'Daily Islamic companion, works offline-first',
			thumb: '/mufadz.webp'
		}
	];

	let workEl: HTMLElement;
	let listEl: HTMLElement;
	let previewEl: HTMLElement;
	let rowEls: HTMLElement[] = [];
	let activeIndex = 0;
	let previewVisible = false;
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	let silChars = Array.from('PROJECTS');

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

		const triggers: ScrollTrigger[] = [];

		if (!reduceMotion) {
			rowEls.forEach((row, i) => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: row,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1,
						invalidateOnRefresh: true
					}
				});
				tl.fromTo(row, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 0).fromTo(
					row,
					{ y: 140 + i * 30 },
					{ y: -50, duration: 1, ease: 'none' },
					0
				);
				if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
			});
		}

		let killMove: (() => void) | null = null;

		if (canHover && !reduceMotion && previewEl) {
			const xTo = gsap.quickTo(previewEl, 'x', { duration: 0.55, ease: 'power3' });
			const yTo = gsap.quickTo(previewEl, 'y', { duration: 0.55, ease: 'power3' });

			const onMove = (e: MouseEvent) => {
				xTo(e.clientX + 28);
				yTo(e.clientY - previewEl.offsetHeight / 2);
			};
			listEl.addEventListener('mousemove', onMove);
			killMove = () => listEl.removeEventListener('mousemove', onMove);
		}

		return () => {
			killMove?.();
			triggers.forEach((st) => st.kill());
		};
	});

	function enter(i: number) {
		activeIndex = i;
		previewVisible = true;
	}
	function leave() {
		previewVisible = false;
	}
</script>

<section class="work" id="work" bind:this={workEl}>
	<div class="work__sil" aria-hidden="true">
		{#each silChars as char}<i>{char}</i>{/each}
	</div>
	<span class="work__dots" aria-hidden="true">
		{#each dots as _}<i></i>{/each}
	</span>

	<div class="work__head">
		<span class="work__eyebrow">(WORK)</span>
		<span class="work__count">0{projects.length}</span>
	</div>

	<ul class="work__list" bind:this={listEl} on:mouseleave={leave}>
		{#each projects as project, i}
			<li>
				<button
					type="button"
					class="row"
					bind:this={rowEls[i]}
					on:mouseenter={() => enter(i)}
					on:focus={() => enter(i)}
				>
					<span class="row__index">{project.index}</span>
					<span class="row__title">{project.title}</span>
					<span class="row__tag">{project.tag}</span>
					<span class="row__thumb" style="background-image:url({project.thumb})" aria-hidden="true"></span>
				</button>
			</li>
		{/each}
	</ul>

	<div class="preview" bind:this={previewEl} class:is-visible={previewVisible} aria-hidden="true">
		{#each projects as project, i}
			<span
				class="preview__panel"
				style="background-image:url({project.thumb})"
				class:is-active={i === activeIndex}
			></span>
		{/each}
	</div>
</section>

<style>
	.work {
		position: relative;
		background: var(--white);
		color: var(--black);
		z-index: 3;
		padding: clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem) clamp(6rem, 14vh, 10rem);
	}
	.work__sil {
		position: absolute;
		top: 50%;
		right: clamp(0.5rem, 2vw, 2rem);
		z-index: 0;
		writing-mode: vertical-rl;
		transform: translateY(-50%) rotate(180deg);
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: clamp(2.6rem, 5vw, 4rem);
		line-height: 0.85;
		color: var(--black);
		opacity: 0.06;
		user-select: none;
		pointer-events: none;
		animation: work-sil-pulse 7.5s ease-in-out infinite;
	}
	.work__sil i {
		display: inline-block;
		font-style: normal;
		transform: rotate(180deg);
	}
	.work__dots {
		position: absolute;
		top: clamp(1.2rem, 3.5vh, 2.2rem);
		right: clamp(1.5rem, 5vw, 4rem);
		z-index: 1;
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		pointer-events: none;
	}
	.work__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--black);
		font-style: normal;
		opacity: 0.06;
		animation: work-dot-blink 3s ease-in-out infinite;
	}
	.work__dots i:nth-child(2) { animation-delay: 0.3s; }
	.work__dots i:nth-child(3) { animation-delay: 0.6s; }
	.work__dots i:nth-child(4) { animation-delay: 0.9s; }
	.work__dots i:nth-child(5) { animation-delay: 1.2s; }
	.work__dots i:nth-child(6) { animation-delay: 1.5s; }
	.work__dots i:nth-child(7) { animation-delay: 1.8s; }
	.work__dots i:nth-child(8) { animation-delay: 2.1s; }
	.work__dots i:nth-child(9) { animation-delay: 2.4s; }
	.work__head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		padding-bottom: clamp(1.5rem, 4vh, 2.5rem);
		border-bottom: 1px solid rgba(10, 10, 10, 0.14);
	}
	.work__head,
	.work__list {
		position: relative;
		z-index: 1;
	}
	.work__eyebrow,
	.work__count {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.work__list {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.row {
		width: 100%;
		appearance: none;
		background: none;
		border: none;
		border-bottom: 1px solid rgba(10, 10, 10, 0.14);
		font: inherit;
		color: inherit;
		text-align: left;
		position: relative;
		display: grid;
		grid-template-columns: 3rem 1fr auto;
		align-items: baseline;
		column-gap: clamp(1rem, 3vw, 2.5rem);
		padding: clamp(1.4rem, 3.4vh, 2.2rem) 0;
		cursor: pointer;
		outline: none;
	}
	.row__index {
		font-family: var(--ff-mono);
		font-size: 0.85rem;
		color: var(--gray);
	}
	.row__title {
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.005em;
		font-size: clamp(2rem, 6vw, 4.2rem);
		line-height: 1;
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}
	.row__tag {
		grid-column: 2 / 3;
		font-family: var(--ff-body);
		font-size: clamp(0.85rem, 1.1vw, 1rem);
		color: var(--ink-soft);
		opacity: 0.7;
		max-width: 26rem;
	}
	.row__thumb {
		display: none;
		background-size: cover;
		background-position: center;
	}
	.row:hover .row__title,
	.row:focus-visible .row__title {
		opacity: 0.45;
		transform: translateX(0.4rem);
	}
	.row:focus-visible {
		outline: 2px solid var(--black);
		outline-offset: 6px;
	}

	.preview {
		position: fixed;
		top: 0;
		left: 0;
		width: clamp(320px, 26vw, 460px);
		height: clamp(160px, 13vw, 230px);
		pointer-events: none;
		z-index: 40;
		opacity: 0;
		transform: translate(-9999px, -9999px);
		transition: opacity 0.35s ease;
		box-shadow: 0 30px 60px rgba(10, 10, 10, 0.18);
	}
	.preview.is-visible {
		opacity: 1;
	}
	.preview__panel {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		opacity: 0;
		transition: opacity 0.45s ease;
	}
	.preview__panel.is-active {
		opacity: 1;
	}

	@keyframes work-sil-pulse {
		0%,
		100% {
			opacity: 0.06;
		}
		12% {
			opacity: 0.32;
		}
		24% {
			opacity: 0.06;
		}
	}
	@keyframes work-dot-blink {
		0%,
		100% {
			opacity: 0.06;
		}
		50% {
			opacity: 0.32;
		}
	}

	@media (max-width: 900px) {
		.preview {
			display: none;
		}
		.row {
			grid-template-columns: 2.4rem 1fr;
			grid-template-areas: 'index thumb' 'title thumb' 'tag thumb';
		}
		.row__index {
			grid-area: index;
		}
		.row__title {
			grid-area: title;
			font-size: clamp(1.7rem, 8vw, 2.6rem);
		}
		.row__tag {
			grid-area: tag;
			grid-column: auto;
		}
		.row__thumb {
			grid-area: thumb;
			display: block;
			align-self: center;
			width: clamp(64px, 20vw, 96px);
			height: clamp(64px, 20vw, 96px);
		}
		.row:hover .row__title,
		.row:focus-visible .row__title {
			opacity: 1;
			transform: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.row__title {
			transition: none;
		}
		.work__sil {
			animation: none;
		}
		.work__dots i {
			animation: none;
		}
	}
</style>