<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	type SkillGroup = {
		label: string;
		items: string[];
	};

	const groups: SkillGroup[] = [
		{
			label: 'FRONTEND',
			items: ['TypeScript', 'React', 'SvelteKit', 'Tailwind']
		},
		{
			label: 'BACKEND',
			items: ['Node.js', 'Python', 'FastAPI', 'SQLite']
		},
		{
			label: 'AI TOOLING',
			items: ['Prompt Engineering', 'LLM APIs', 'AST', 'RAG']
		},
		{
			label: 'DEV TOOLS',
			items: ['Docker', 'Git', 'Vite', 'PWA']
		}
	];

	let skillsEl: HTMLElement;
	let darkEl: HTMLElement;
	let lightEl: HTMLElement;
	let headingEl: HTMLElement;
	let headingLine1El: HTMLElement;
	let headingLine2El: HTMLElement;
	let cursorEl: HTMLElement;
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const darkContent = gsap.utils.toArray<HTMLElement>(darkEl.querySelectorAll('[data-reveal]'));
		const listGroups = gsap.utils.toArray<HTMLElement>(lightEl.querySelectorAll('.skills__group'));

		if (reduceMotion) {
			gsap.set(darkEl, { xPercent: 0 });
			gsap.set([headingLine1El, headingLine2El], { y: '0%', x: '0rem' });
			gsap.set(cursorEl, { opacity: 1 });
			gsap.set([...darkContent, ...listGroups], { opacity: 1, y: 0, x: 0 });
			return;
		}

		gsap.set(darkEl, { xPercent: -100 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: skillsEl,
				start: 'top bottom',
				end: 'center center',
				scrub: 1
			}
		});

		// The dark half slides in from off-screen left and parks on the left half —
		// stretched across the whole entry range so it eases in, not snaps.
		tl.fromTo(darkEl, { xPercent: -100 }, { xPercent: 0, ease: 'none' }, 0);
		tl.fromTo(
			darkContent,
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
			0.25
		);

		// Headline mask-wipes up like the About heading, cursor blinks after.
		tl.fromTo(
			headingLine1El,
			{ y: '105%', x: '-1.4rem' },
			{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
			0.3
		);
		tl.fromTo(
			headingLine2El,
			{ y: '105%', x: '1.4rem' },
			{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
			0.45
		);
		tl.to(cursorEl, { opacity: 1, duration: 0.2 }, 0.95);

		// Tech list pops in quick and early — all rows are up before the section
		// reaches mid-screen, so the remaining scroll is just the dark slide-out.
		tl.fromTo(
			listGroups,
			{ opacity: 0, y: 18 },
			{ opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
			0.55
		);

		// Exit: as the section rides up and out of view, the text fades away and
		// the dark half widens to the right until it fills the screen — reaching
		// full width just as the section leaves the top of the viewport.
		const exitTargets = [...darkContent, headingEl, ...listGroups];
		const exitTl = gsap.timeline({
			scrollTrigger: {
				trigger: skillsEl,
				start: 'center center',
				end: 'bottom top',
				scrub: 1
			}
		});
		exitTl.to(exitTargets, { opacity: 0, y: -24, duration: 0.5, stagger: 0.04, ease: 'power1.in' }, 0);
		exitTl.to(darkEl, { width: '100%', duration: 0.9, ease: 'power1.inOut' }, 0.25);

		return () => {
			tl.scrollTrigger?.kill();
			exitTl.scrollTrigger?.kill();
		};
	});
</script>

<section class="skills" id="skills" bind:this={skillsEl}>
	<div class="skills__dark" bind:this={darkEl}>
		<span class="skills__dots" aria-hidden="true">
			{#each dots as _}<i></i>{/each}
		</span>
		<span class="skills__mark skills__mark--dark" aria-hidden="true">TOOLS</span>
		<div class="skills__dark-content">
			<span class="skills__eyebrow" data-reveal>// SKILLS</span>
			<h2 class="skills__heading" bind:this={headingEl}>
				<span class="line-mask"><span class="line" bind:this={headingLine1El}>WHAT I</span></span>
				<span class="line-mask"
					><span class="line" bind:this={headingLine2El}
						>USE<span class="cursor" bind:this={cursorEl}>_</span></span
					></span
				>
			</h2>
			<p class="skills__lead" data-reveal>
				Tools and technologies I reach for when shipping real products.
			</p>
		</div>
	</div>

	<div class="skills__light" bind:this={lightEl}>
		<span class="skills__mark" aria-hidden="true">SKILLS</span>
		<ul class="skills__list">
			{#each groups as group}
				<li class="skills__group">
					<span class="skills__label">{group.label}</span>
					<ul class="skills__chips">
						{#each group.items as item}
							<li>{item}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.skills {
		height: 100vh;
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		overflow: hidden;
		background: var(--white);
		z-index: 3;
	}
	.skills__dark {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 50%;
		z-index: 2;
		background: var(--black);
		color: var(--fg-dark);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(2rem, 6vw, 4rem);
		overflow: hidden;
		will-change: transform, width;
	}
	.skills__dark-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: clamp(1rem, 2.5vh, 1.5rem);
		max-width: 24rem;
	}
	.skills__eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		opacity: 0;
	}
	.skills__heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
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
		animation: skills-blink 1s step-end infinite;
	}
	.skills__lead {
		font-family: var(--ff-body);
		font-size: clamp(0.95rem, 1.5vw, 1.1rem);
		line-height: 1.55;
		color: var(--fg-dim);
		opacity: 0;
	}
	.skills__dots {
		position: absolute;
		top: clamp(1.5rem, 4vw, 3rem);
		left: clamp(1.5rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		z-index: 1;
		pointer-events: none;
	}
	.skills__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--fg-dark);
		font-style: normal;
		opacity: 0.08;
		animation: skills-dot-blink 3s ease-in-out infinite;
	}
	.skills__dots i:nth-child(2) { animation-delay: 0.3s; }
	.skills__dots i:nth-child(3) { animation-delay: 0.6s; }
	.skills__dots i:nth-child(4) { animation-delay: 0.9s; }
	.skills__dots i:nth-child(5) { animation-delay: 1.2s; }
	.skills__dots i:nth-child(6) { animation-delay: 1.5s; }
	.skills__dots i:nth-child(7) { animation-delay: 1.8s; }
	.skills__dots i:nth-child(8) { animation-delay: 2.1s; }
	.skills__dots i:nth-child(9) { animation-delay: 2.4s; }

	.skills__light {
		position: relative;
		grid-column: 2;
		background: var(--white);
		color: var(--black);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(2rem, 6vw, 4rem);
		overflow: hidden;
	}
	.skills__mark {
		position: absolute;
		top: -2.5vw;
		right: -0.5vw;
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.01em;
		font-size: clamp(4rem, 11vw, 9rem);
		color: var(--black);
		opacity: 0.05;
		white-space: nowrap;
		z-index: 0;
		user-select: none;
		pointer-events: none;
	}
	.skills__mark--dark {
		top: auto;
		bottom: -2.5vw;
		right: auto;
		left: -0.5vw;
		color: var(--fg-dark);
	}
	.skills__list {
		position: relative;
		z-index: 1;
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 30rem;
	}
	.skills__group {
		border-top: 1px solid rgba(10, 10, 10, 0.14);
		padding: clamp(0.9rem, 2vh, 1.2rem) 0;
		opacity: 0;
	}
	.skills__label {
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.skills__chips {
		list-style: none;
		margin: 0.6rem 0 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.skills__chips li {
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.03em;
		color: var(--black);
		border: 1px solid rgba(10, 10, 10, 0.25);
		border-radius: 999px;
		padding: 0.3rem 0.7rem;
		white-space: nowrap;
	}

	@keyframes skills-blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
	@keyframes skills-dot-blink {
		0%,
		100% {
			opacity: 0.08;
		}
		50% {
			opacity: 0.34;
		}
	}

	@media (max-width: 860px) {
		.skills {
			grid-template-columns: 1fr;
			height: auto;
		}
		.skills__dark {
			width: 100%;
			height: 60vh;
			bottom: auto;
		}
		.skills__light {
			grid-column: 1;
			margin-top: 60vh;
			min-height: 70vh;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
			opacity: 1;
		}
		.skills__dots i {
			animation: none;
			opacity: 0.2;
		}
	}
</style>
