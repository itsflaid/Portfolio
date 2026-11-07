<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { skillGroups as groups } from '$lib/data/skills';

	let skillsEl: HTMLElement;
	let darkEl: HTMLElement;
	let lightEl: HTMLElement;
	let headingEl: HTMLElement;
	let line1El: HTMLElement;
	let line2El: HTMLElement;
	let cursorEl: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isMobile = window.matchMedia('(max-width: 860px)').matches;

		const darkContent = gsap.utils.toArray<HTMLElement>(darkEl.querySelectorAll('[data-reveal]'));
		const darkBg = darkEl.querySelector<HTMLElement>('.skills__dark-bg')!;
		const groupEls = gsap.utils.toArray<HTMLElement>(lightEl.querySelectorAll('.skills__group'));

		if (reduceMotion) {
			gsap.set([line1El, line2El], { y: '0%', x: '0rem' });
			gsap.set(cursorEl, { opacity: 1 });
			gsap.set(darkContent, { opacity: 1, y: 0 });
			return;
		}

		if (!isMobile) gsap.set(darkEl, { xPercent: -100 });

		const entryTl = gsap.timeline({
			scrollTrigger: {
				trigger: skillsEl,
				start: 'top bottom',
				end: 'top top',
				scrub: 1
			}
		});
		if (!isMobile) {
			entryTl.fromTo(darkEl, { xPercent: -100 }, { xPercent: 0, ease: 'none' }, 0);
		}
		entryTl.fromTo(
			darkContent,
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
			0.25
		);
		entryTl.fromTo(
			line1El,
			{ y: '105%', x: '-1.4rem' },
			{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
			0.3
		);
		entryTl.fromTo(
			line2El,
			{ y: '105%', x: '1.4rem' },
			{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
			0.45
		);
		entryTl.to(cursorEl, { opacity: 1, duration: 0.2 }, 0.95);

		const groupTriggers: ScrollTrigger[] = [];
		groupEls.forEach((group) => {
			const rule = group.querySelector<HTMLElement>('.skills__rule');
			const head = group.querySelectorAll<HTMLElement>('.skills__index, .skills__label');
			const chips = gsap.utils.toArray<HTMLElement>(group.querySelectorAll('.skills__chip'));

			gsap.set(chips, { opacity: 0, y: 14, scale: 0.85 });
			gsap.set(head, { opacity: 0 });
			if (rule) gsap.set(rule, { scaleX: 0 });

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: group,
					start: isMobile ? 'top 85%' : 'top 78%',
					end: 'bottom 25%',
					toggleActions: 'restart reverse restart reverse'
				}
			});
			tl.to(head, { opacity: 1, duration: 0.3 }, 0);
			if (rule) tl.to(rule, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, 0);
			tl.to(
				chips,
				{ opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.7)', stagger: 0.04 },
				0.1
			);
			if (tl.scrollTrigger) groupTriggers.push(tl.scrollTrigger);
		});

		const exitTl = gsap.timeline({
			scrollTrigger: {
				trigger: skillsEl,
				start: 'bottom 85%',
				end: 'bottom top',
				scrub: 1
			}
		});
		exitTl.to([...darkContent, headingEl], { opacity: 0, y: -20, duration: 0.5, ease: 'power1.in' }, 0);
		if (!isMobile) {
			exitTl.to(darkBg, { width: '200%', duration: 0.9, ease: 'power1.inOut' }, 0.15);
		}

		return () => {
			entryTl.scrollTrigger?.kill();
			entryTl.kill();
			exitTl.scrollTrigger?.kill();
			exitTl.kill();
			groupTriggers.forEach((st) => st.kill());
		};
	});
</script>

<section class="skills" id="skills" bind:this={skillsEl}>
	<div class="skills__dark" bind:this={darkEl}>
		<div class="skills__dark-bg"></div>
		<div class="skills__dark-content">
			<h2 class="skills__heading" bind:this={headingEl}>
				<span class="line-mask"><span class="line" bind:this={line1El}>WHAT I</span></span>
				<span class="line-mask"
					><span class="line" bind:this={line2El}
						>USE<span class="cursor" bind:this={cursorEl}>_</span></span
					></span
				>
			</h2>
			<p class="skills__lead" data-reveal>
				Tools and technologies I reach for when build real products.
			</p>
		</div>
	</div>

	<div class="skills__light" bind:this={lightEl}>
		<div class="skills__groups">
			{#each groups as group, gi}
				<div class="skills__group">
					<div class="skills__group-head">
						<span class="skills__index">0{gi + 1}</span>
						<span class="skills__rule" aria-hidden="true"></span>
						<h3 class="skills__label">{group.label}</h3>
					</div>
					<ul class="skills__items">
						{#each group.items as item}
							<li class="skills__chip">
								<span class="skills__ico">
									<svg viewBox={item.icon.viewBox ?? '0 0 24 24'} aria-hidden="true">
										<path d={item.icon.path} />
									</svg>
								</span>
								{item.name}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: start;
		z-index: 3;
		background: var(--white);
	}

	.skills__dark {
		position: sticky;
		top: 0;
		height: 100vh;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(2rem, 6vw, 4rem);
		background: var(--black);
		color: var(--fg-dark);
		will-change: transform, width;
	}
	.skills__dark-bg {
		position: absolute;
		inset: 0 auto 0 0;
		width: 100%;
		background: var(--black);
		z-index: -1;
	}
	.skills__dark-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: clamp(1rem, 2.5vh, 1.5rem);
		max-width: 26rem;
	}
	.skills__heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: clamp(4rem, 10vw, 9rem);
		line-height: 0.88;
		letter-spacing: 0.005em;
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
		animation: skills-blink 1s step-end infinite;
	}
	.skills__lead {
		margin: 0;
		font-family: var(--ff-body);
		font-size: clamp(0.95rem, 1.4vw, 1.05rem);
		line-height: 1.55;
		color: var(--gray-light);
		opacity: 0;
	}

	.skills__light {
		grid-column: 2;
		padding: clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem);
		background: var(--white);
		color: var(--black);
		overflow: hidden;
	}
	.skills__groups {
		display: flex;
		flex-direction: column;
		gap: clamp(2rem, 5vh, 3.25rem);
		max-width: 38rem;
	}
	.skills__group-head {
		display: flex;
		align-items: baseline;
		gap: 0.9rem;
		margin-bottom: 1.1rem;
	}
	.skills__index {
		flex: 0 0 auto;
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.skills__rule {
		order: 3;
		flex: 1 1 auto;
		height: 1px;
		background: rgba(10, 10, 10, 0.2);
		transform-origin: left;
	}
	.skills__label {
		order: 2;
		margin: 0;
		flex: 0 0 auto;
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: clamp(1.6rem, 2.4vw, 2.1rem);
		letter-spacing: 0.02em;
	}
	.skills__items {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}
	.skills__chip {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.4rem 0.9rem 0.4rem 0.4rem;
		border: 1px solid rgba(10, 10, 10, 0.28);
		border-radius: 999px;
		font-family: var(--ff-mono);
		font-size: 0.76rem;
		letter-spacing: 0.04em;
		transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
	}
	.skills__chip:hover {
		background: var(--black);
		color: var(--fg-dark);
		border-color: var(--black);
	}
	.skills__ico {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 50%;
		background: rgba(10, 10, 10, 0.07);
	}
	.skills__ico svg {
		width: 0.95rem;
		height: 0.95rem;
	}
	.skills__ico svg path {
		fill: currentColor;
	}
	.skills__chip:hover .skills__ico {
		background: rgba(241, 241, 239, 0.14);
	}

	@keyframes skills-blink {
		50% {
			opacity: 0;
		}
	}

	@media (max-width: 860px) {
		.skills {
			grid-template-columns: 1fr;
		}
		.skills__dark {
			position: relative;
			top: auto;
			height: 60vh;
		}
		.skills__dark-content {
			align-items: center;
			text-align: center;
			max-width: none;
		}
		.skills__heading {
			font-size: clamp(4rem, 20vw, 7rem);
		}
		.skills__light {
			grid-column: 1;
			padding: clamp(2.25rem, 7vh, 3rem) clamp(1.5rem, 6vw, 3rem);
		}
		.skills__groups {
			max-width: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
			opacity: 1;
		}
	}
</style>
