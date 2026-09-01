<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { scrollToTarget } from '$lib/scroll';
	import { openResumeModal } from '$lib/resume';

	let heroEl: HTMLElement;
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	function goProjects(e: MouseEvent) {
		e.preventDefault();
		scrollToTarget('#projects');
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion) return;

		const st = ScrollTrigger.create({
			trigger: heroEl,
			start: 'top top',
			end: 'bottom top',
			pin: true,
			pinSpacing: false
		});

		return () => { st.kill(); };
	});
</script>

<div class="hero-frame" bind:this={heroEl}>
<section class="hero" id="top">
	<!-- <span class="hero__mark hero__mark--1" aria-hidden="true"><i>F</i><i>L</i><i>A</i><i>I</i><i>D</i></span> -->
	<span class="hero__mark hero__mark--2" aria-hidden="true"><i>F</i><i>L</i><i>A</i><i>I</i><i>D</i></span>
	<span class="hero__dots hero__dots--bl" aria-hidden="true">
		{#each dots as _}<i></i>{/each}
	</span>
	<!-- <span class="hero__spin" aria-hidden="true"></span> -->
	<div class="hero__content">
		<span class="hero__eyebrow">FULLSTACK DEVELOPER — KUTAI KARTANEGARA, ID</span>
		<h1><span class="hero__name">MUHAMMAD</span><span class="hero__name">FADIL</span></h1>
		<span class="hero__sub">
			I build full-stack web applications from idea to deployment, combining design, engineering, and AI-assisted development.
		</span>
		<nav class="hero__cta" aria-label="Quick actions">
			<button
				type="button"
				class="hero__cta-item"
				onclick={openResumeModal}
				data-cursor-text="OPEN"
			>
				<span class="hero__cta-index">01</span>
				<span class="hero__cta-label">RESUME</span>
				<svg class="hero__cta-icon" viewBox="0 0 24 24" aria-hidden="true"
					><path d="M7 17 17 7M8 7h9v9" /></svg
				>
			</button>
			<span class="hero__cta-divider" aria-hidden="true"></span>
			<a class="hero__cta-item" href="#projects" onclick={goProjects} data-cursor-text="SCROLL">
				<span class="hero__cta-index">02</span>
				<span class="hero__cta-label">THE PROJECTS</span>
				<svg class="hero__cta-icon" viewBox="0 0 24 24" aria-hidden="true"
					><path d="M12 4v14m0 0-5-5m5 5 5-5" /></svg
				>
			</a>
		</nav>
	</div>
</section>
</div>

<style>
	.hero-frame {
		position: relative;
		height: 100vh;
	}
	.hero {
		position: relative;
		height: 100vh;
		z-index: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: clamp(1.5rem, 5vw, 4rem);
		background: var(--white);
	}

	.hero__mark {
		position: absolute;
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.01em;
		color: var(--black);
		white-space: nowrap;
		z-index: 0;
		user-select: none;
		pointer-events: none;
		font-size: clamp(6rem, 16vw, 13rem);
	}
	.hero__mark i {
		font-style: normal;
		display: inline-block;
		opacity: 0.065;
	}
	/* .hero__mark--1 {
		top: -3vw;
		left: -2vw;
	} */
	.hero__mark--2 {
		bottom: -3vw;
		right: -2vw;
	}
	.hero__content {
		position: relative;
		z-index: 2;
		width: 100%;
		max-width: 80rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.hero__eyebrow {
		display: block;
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		margin-bottom: 1.5rem;
		opacity: 0;
		animation: rise 0.8s ease 0.1s forwards;
	}
	.hero h1 {
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.01em;
		font-size: clamp(3.1rem, 15vw, 11rem);
		opacity: 0;
		animation: rise 0.8s ease 0.3s forwards;
	}
	.hero__name {
		display: inline;
	}
	.hero__name + .hero__name::before {
		content: '\00a0';
	}
	@media (max-width: 768px) {
		.hero h1 {
			font-size: clamp(4.5rem, 18vw, 7rem);
			line-height: 0.9;
		}
		.hero__name {
			display: block;
			white-space: nowrap;
		}
		.hero__name + .hero__name::before {
			content: none;
		}
		.hero__sub {
			max-width: 22rem;
		}
		.hero__cta {
			gap: 0.85rem;
		}
		.hero__cta-item {
			font-size: 0.7rem;
		}
	}
	.hero__sub {
		display: block;
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--ink-soft);
		max-width: 35rem;
		margin: 2rem auto 0;
		line-height: 1.55;
		opacity: 0;
		animation: rise 0.8s ease 0.55s forwards;
	}
	.hero__cta {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		gap: clamp(1rem, 2.5vw, 1.75rem);
		margin-top: clamp(2rem, 5vh, 3rem);
		opacity: 0;
		animation: rise 0.8s ease 0.75s forwards;
	}
	.hero__cta-item {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: 0;
		padding: 0;
		margin: 0;
		font-family: var(--ff-mono);
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		color: var(--black);
		text-decoration: none;
		cursor: pointer;
	}
	.hero__cta-index {
		color: var(--gray);
	}
	.hero__cta-label {
		position: relative;
	}
	.hero__cta-label::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -3px;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.3s ease;
	}
	.hero__cta-item:hover .hero__cta-label::after {
		transform: scaleX(1);
		transform-origin: left;
	}
	.hero__cta-icon {
		width: 12px;
		height: 12px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.hero__cta-divider {
		width: 1px;
		height: 1rem;
		background: rgba(10, 10, 10, 0.2);
	}
	.hero__dots {
		position: absolute;
		bottom: clamp(1.5rem, 4vw, 3rem);
		left: clamp(1.5rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		z-index: 1;
		pointer-events: none;
	}
	.hero__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--black);
		font-style: normal;
		opacity: 0.06;
		animation: dot-blink 3s ease-in-out infinite;
	}
	.hero__dots i:nth-child(2) { animation-delay: 0.3s; }
	.hero__dots i:nth-child(3) { animation-delay: 0.6s; }
	.hero__dots i:nth-child(4) { animation-delay: 0.9s; }
	.hero__dots i:nth-child(5) { animation-delay: 1.2s; }
	.hero__dots i:nth-child(6) { animation-delay: 1.5s; }
	.hero__dots i:nth-child(7) { animation-delay: 1.8s; }
	.hero__dots i:nth-child(8) { animation-delay: 2.1s; }
	.hero__dots i:nth-child(9) { animation-delay: 2.4s; }

	/* .hero__spin {
		position: absolute;
		right: clamp(2rem, 5vw, 4rem);
		top: 50%;
		width: 26px;
		height: 26px;
		z-index: 1;
		pointer-events: none;
		opacity: 0.35;
		transform: translateY(-50%);
		animation: spin 10s linear infinite;
	}
	.hero__spin::before,
	.hero__spin::after {
		content: '';
		position: absolute;
		background: var(--black);
	}
	.hero__spin::before {
		left: 50%;
		top: 0;
		bottom: 0;
		width: 1px;
		transform: translateX(-50%);
	}
	.hero__spin::after {
		top: 50%;
		left: 0;
		right: 0;
		height: 1px;
		transform: translateY(-50%);
	} */

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
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
			transform: translateY(-50%) rotate(0);
		}
		to {
			transform: translateY(-50%) rotate(360deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero__eyebrow,
		.hero h1,
		.hero__sub,
		.hero__cta {
			animation: none;
			opacity: 1;
		}
		.hero__dots i {
			animation: none;
			opacity: 0.2;
		}
		/* .hero__spin {
			animation: none;
		} */
	}
</style>