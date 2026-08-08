<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let heroEl: HTMLElement;
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduceMotion) return;

		const trigger = ScrollTrigger.create({
			trigger: heroEl,
			start: 'top top',
			end: 'bottom top',
			pin: true,
			pinSpacing: false
		});

		return () => trigger.kill();
	});
</script>

<section class="hero" bind:this={heroEl}>
	<span class="hero__mark hero__mark--1" aria-hidden="true"><i>F</i><i>L</i><i>A</i><i>I</i><i>D</i></span>
	<span class="hero__mark hero__mark--2" aria-hidden="true"><i>F</i><i>L</i><i>A</i><i>I</i><i>D</i></span>
	<span class="hero__dots hero__dots--bl" aria-hidden="true">
		{#each dots as _}<i></i>{/each}
	</span>
	<span class="hero__spin" aria-hidden="true"></span>
	<div class="hero__content">
		<span class="hero__eyebrow">FULLSTACK DEVELOPER — SAMARINDA, ID</span>
		<h1>MUHAMMAD FADIL</h1>
		<span class="hero__sub">
			Building tools that map, remember, and improve code — for other developers, and mostly for
			myself.
		</span>
	</div>
	<div class="hero__scroll"><i></i>SCROLL</div>
</section>

<style>
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

	/* Siluet watermark "FLAID" di belakang hero — dijaga tetap tebal & solid
	   walau Bebas Neue cuma punya satu ketebalan (regular). */
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
		animation: mark-glow 7.5s ease-in-out infinite;
	}
	.hero__mark--1 i:nth-child(1) { animation-delay: 0s; }
	.hero__mark--1 i:nth-child(2) { animation-delay: -1.5s; }
	.hero__mark--1 i:nth-child(3) { animation-delay: -3s; }
	.hero__mark--1 i:nth-child(4) { animation-delay: -4.5s; }
	.hero__mark--1 i:nth-child(5) { animation-delay: -6s; }
	.hero__mark--2 i:nth-child(1) { animation-delay: -6s; }
	.hero__mark--2 i:nth-child(2) { animation-delay: -4.5s; }
	.hero__mark--2 i:nth-child(3) { animation-delay: -3s; }
	.hero__mark--2 i:nth-child(4) { animation-delay: -1.5s; }
	.hero__mark--2 i:nth-child(5) { animation-delay: 0s; }
	.hero__mark--1 {
		top: -3vw;
		left: -2vw;
	}
	.hero__mark--2 {
		bottom: -3vw;
		right: -2vw;
	}
	.hero__content {
		position: relative;
		z-index: 2;
		max-width: 50rem;
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
		font-size: clamp(2.1rem, 8vw, 6.5rem);
		opacity: 0;
		animation: rise 0.8s ease 0.3s forwards;
	}
	.hero__sub {
		display: block;
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--ink-soft);
		max-width: 32rem;
		margin: 2rem auto 0;
		line-height: 1.55;
		opacity: 0;
		animation: rise 0.8s ease 0.55s forwards;
	}
	.hero__scroll {
		position: absolute;
		bottom: clamp(1.5rem, 4vw, 3rem);
		left: 50%;
		transform: translateX(-50%);
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		color: var(--gray);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		z-index: 2;
		animation: scroll-float 2.2s ease-in-out infinite alternate;
	}
	.hero__scroll i {
		display: inline-block;
		width: 1px;
		height: 2rem;
		background: var(--gray);
		font-style: normal;
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

	.hero__spin {
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
	}

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
	@keyframes scroll-float {
		from {
			transform: translate(-50%, 0);
		}
		to {
			transform: translate(-50%, 8px);
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
	@keyframes mark-glow {
		0%,
		100% {
			opacity: 0.065;
		}
		12% {
			opacity: 0.34;
		}
		24% {
			opacity: 0.065;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero__eyebrow,
		.hero h1,
		.hero__sub {
			animation: none;
			opacity: 1;
		}
		.hero__scroll {
			animation: none;
		}
		.hero__dots i {
			animation: none;
			opacity: 0.2;
		}
		.hero__spin {
			animation: none;
		}
		.hero__mark i {
			animation: none;
		}
	}
</style>
