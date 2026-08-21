<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	import { entries } from '$lib/data/experience';

	const headingText = 'Experience & Education';
	const eyebrowText = '// BACKGROUND';

	let sectionEl: HTMLElement;
	let spineEl: HTMLElement;
	let headingEl: HTMLHeadingElement;
	let eyebrowEl: HTMLSpanElement;
	let dotsWrapEl: HTMLElement;
	let entryEls: HTMLElement[] = [];
	let tickEls: HTMLElement[] = [];
	let titleCharEls: HTMLSpanElement[][] = entries.map(() => []);
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	let triggers: (ScrollTrigger | undefined)[] = [];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduceMotion) {
			gsap.set(spineEl, { scaleY: 1 });
			gsap.set(entryEls, { opacity: 1, x: 0 });
			gsap.set(tickEls, { scale: 1 });
			gsap.set(headingEl, { opacity: 1, y: 0 });
			gsap.set(titleCharEls.flat(), { opacity: 1, y: 0, rotateX: 0 });
			gsap.set(eyebrowEl, { clipPath: 'inset(0 0% 0 0)' });
			gsap.set('.xp__dots i', { opacity: 0.06, scale: 1 });
			return;
		}

		const ctx = gsap.context(() => {
			gsap.fromTo(
				'.xp__dots i',
				{ opacity: 0, scale: 0 },
				{
					opacity: 0.06,
					scale: 1,
					duration: 0.3,
					stagger: 0.04,
					ease: 'power1.out',
					scrollTrigger: {
						trigger: sectionEl,
						start: 'top 75%',
						toggleActions: 'play none none reverse'
					}
				}
			);

			gsap.fromTo(
				eyebrowEl,
				{ clipPath: 'inset(0 100% 0 0)' },
				{
					clipPath: 'inset(0 0% 0 0)',
					duration: 0.5,
					ease: 'steps(12)',
					scrollTrigger: {
						trigger: headingEl,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					}
				}
			);

			gsap.fromTo(
				headingEl,
				{ opacity: 0, y: 16 },
				{
					opacity: 1,
					y: 0,
					ease: 'power2.out',
					duration: 0.7,
					delay: 0.3,
					scrollTrigger: {
						trigger: headingEl,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					}
				}
			);

			gsap.to('.xp__mark--edu', {
				y: -40,
				ease: 'none',
				scrollTrigger: { trigger: sectionEl, start: 'top bottom', end: 'bottom top', scrub: 1 }
			});
			gsap.to('.xp__mark--exp', {
				y: 40,
				ease: 'none',
				scrollTrigger: { trigger: sectionEl, start: 'top bottom', end: 'bottom top', scrub: 1 }
			});

			gsap.fromTo(
				spineEl,
				{ scaleY: 0 },
				{
					scaleY: 1,
					ease: 'none',
					scrollTrigger: {
						trigger: sectionEl,
						start: 'top 70%',
						end: 'bottom 75%',
						scrub: 0.8
					}
				}
			);

			entryEls.forEach((entry, i) => {
				const fromX = entries[i].side === 'right' ? -18 : 18;
				const body = entry.querySelector('.xp__body');
				const tick = tickEls[i];
				const chars = titleCharEls[i];

				if (body) {
					const bodyTween = gsap.fromTo(
						body,
						{ opacity: 0, x: fromX },
						{
							opacity: 1,
							x: 0,
							ease: 'power1.out',
							scrollTrigger: {
								trigger: entry,
								start: 'top 85%',
								end: 'top 55%',
								scrub: 0.6
							}
						}
					);
					triggers.push(bodyTween.scrollTrigger);
				}

				if (tick) {
					const tickTween = gsap.fromTo(
						tick,
						{ scale: 0 },
						{
							scale: 1,
							ease: 'back.out(3)',
							duration: 0.3,
							scrollTrigger: {
								trigger: entry,
								start: 'top 85%',
								toggleActions: 'play none none reverse'
							}
						}
					);
					triggers.push(tickTween.scrollTrigger);
				}

				if (chars && chars.length) {
					const titleTween = gsap.fromTo(
						chars,
						{ opacity: 0, y: '0.5em', rotateX: -30 },
						{
							opacity: 1,
							y: '0em',
							rotateX: 0,
							ease: 'power3.out',
							duration: 0.5,
							stagger: 0.018,
							scrollTrigger: {
								trigger: entry,
								start: 'top 85%',
								toggleActions: 'play none none reverse'
							}
						}
					);
					triggers.push(titleTween.scrollTrigger);
				}
			});
		}, sectionEl);

		return () => ctx.revert();
	});
</script>

<section class="xp" id="experience" bind:this={sectionEl}>
	<span class="xp__mark xp__mark--edu" aria-hidden="true">EDU</span>
	<span class="xp__mark xp__mark--exp" aria-hidden="true">EXP</span>
	<span class="xp__dots" aria-hidden="true" bind:this={dotsWrapEl}>
		{#each dots as _}<i></i>{/each}
	</span>
	<span class="xp__spin" aria-hidden="true"></span>
	<div class="xp__head">
		<span class="xp__eyebrow" bind:this={eyebrowEl}>{eyebrowText}</span>
		<h2 class="xp__heading" bind:this={headingEl}>{headingText}</h2>
	</div>

	<div class="xp__timeline">
		<div class="xp__spine" bind:this={spineEl}></div>
		<ul class="xp__list">
			{#each entries as entry, i (entry.title)}
				<li class="xp__entry xp__entry--{entry.side}" bind:this={entryEls[i]}>
					<span class="xp__tick" aria-hidden="true" bind:this={tickEls[i]}></span>
					<div class="xp__body">
						<span class="xp__date">{entry.date} · {entry.type}</span>
						<span class="xp__title" aria-label={entry.title}>
							{#each entry.title.split('') as char, j}
								<span
									class="xp__char"
									bind:this={titleCharEls[i][j]}
									aria-hidden="true"
									>{char === ' ' ? '\u00A0' : char}</span
								>
							{/each}
						</span>
						<span class="xp__org">{entry.org}</span>
						<p class="xp__desc">{entry.desc}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.xp {
		position: relative;
		background: var(--white);
		color: var(--black);
		z-index: 3;
		padding: clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem) clamp(7rem, 16vh, 11rem);
		overflow: hidden;
	}
	.xp__mark {
		position: absolute;
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.01em;
		font-size: clamp(6rem, 16vw, 13rem);
		color: var(--black);
		opacity: 0.065;
		white-space: nowrap;
		z-index: 0;
		user-select: none;
		pointer-events: none;
		will-change: transform;
	}
	.xp__mark--edu {
		top: -3vw;
		right: -2vw;
	}
	.xp__mark--exp {
		bottom: -3vw;
		left: -2vw;
	}
	.xp__dots {
		position: absolute;
		right: clamp(1.5rem, 4vw, 3rem);
		bottom: clamp(2rem, 5vw, 3.5rem);
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		z-index: 0;
		pointer-events: none;
	}
	.xp__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--black);
		font-style: normal;
		opacity: 0.06;
		animation: dot-blink 3s ease-in-out infinite;
	}
	.xp__dots i:nth-child(2) { animation-delay: 0.3s; }
	.xp__dots i:nth-child(3) { animation-delay: 0.6s; }
	.xp__dots i:nth-child(4) { animation-delay: 0.9s; }
	.xp__dots i:nth-child(5) { animation-delay: 1.2s; }
	.xp__dots i:nth-child(6) { animation-delay: 1.5s; }
	.xp__dots i:nth-child(7) { animation-delay: 1.8s; }
	.xp__dots i:nth-child(8) { animation-delay: 2.1s; }
	.xp__dots i:nth-child(9) { animation-delay: 2.4s; }
	.xp__spin {
		position: absolute;
		left: clamp(2rem, 5vw, 4rem);
		top: 50%;
		margin-top: -13px;
		width: 26px;
		height: 26px;
		z-index: 0;
		pointer-events: none;
		opacity: 0.35;
		animation: spin 10s linear infinite;
	}
	.xp__spin::before,
	.xp__spin::after {
		content: '';
		position: absolute;
		background: var(--black);
	}
	.xp__spin::before {
		left: 50%;
		top: 0;
		bottom: 0;
		width: 1px;
		transform: translateX(-50%);
	}
	.xp__spin::after {
		top: 50%;
		left: 0;
		right: 0;
		height: 1px;
		transform: translateY(-50%);
	}
	.xp__head {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: clamp(3rem, 8vh, 5rem);
	}
	.xp__eyebrow {
		display: inline-block;
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		white-space: nowrap;
	}
	.xp__heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.005em;
		font-size: clamp(2rem, 5vw, 3.5rem);
		perspective: 400px;
	}
	.xp__char {
		display: inline-block;
		will-change: transform, opacity;
	}
	.xp__timeline {
		position: relative;
		z-index: 1;
		max-width: 60rem;
		margin: 0 auto;
	}
	.xp__spine {
		position: absolute;
		left: 50%;
		margin-left: -1px;
		top: 6px;
		bottom: 6px;
		width: 2px;
		background: rgba(10, 10, 10, 0.16);
		transform-origin: top;
	}
	.xp__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: clamp(2.5rem, 6vh, 4rem);
	}
	.xp__entry {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 2rem 1fr;
		column-gap: clamp(1rem, 3vw, 2rem);
		align-items: start;
	}
	.xp__tick {
		grid-column: 2;
		justify-self: center;
		align-self: start;
		margin-top: 0.4em;
		width: 9px;
		height: 9px;
		background: var(--black);
		position: relative;
		z-index: 1;
		will-change: transform;
	}
	.xp__body {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	.xp__entry--left .xp__body {
		grid-column: 1;
		text-align: right;
		align-items: flex-end;
	}
	.xp__entry--right .xp__body {
		grid-column: 3;
		text-align: left;
		align-items: flex-start;
	}
	.xp__date {
		font-family: var(--ff-mono);
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		color: var(--gray);
	}
	.xp__title {
		display: inline-block;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 1.05;
		font-size: clamp(1.4rem, 3vw, 2.1rem);
		perspective: 400px;
	}
	.xp__org {
		font-family: var(--ff-body);
		font-size: 0.95rem;
		color: var(--ink-soft);
	}
	.xp__desc {
		margin: 0.15rem 0 0;
		font-family: var(--ff-body);
		font-size: 0.9rem;
		color: var(--ink-soft);
		opacity: 0.75;
		max-width: 34rem;
		line-height: 1.5;
	}

	@media (max-width: 700px) {
		.xp__timeline {
			max-width: none;
		}
		.xp__spine {
			left: calc(0.75rem - 1px);
			margin-left: 0;
		}
		.xp__entry {
			grid-template-columns: 1.5rem 1fr;
			column-gap: 1rem;
		}
		.xp__tick {
			grid-column: 1;
		}
		.xp__entry--left .xp__body,
		.xp__entry--right .xp__body {
			grid-column: 2;
			text-align: left;
			align-items: flex-start;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.xp__dots i {
			animation: none;
			opacity: 0.2;
		}
		.xp__spin {
			animation: none;
		}
	}

	@keyframes dot-blink {
		0%,
		100% {
			opacity: 0.06;
		}
		50% {
			opacity: 0.32;
		}
	}
	@keyframes spin {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>