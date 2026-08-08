<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let heroEl: HTMLElement;

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
	<span class="hero__mark hero__mark--1" aria-hidden="true">FLAID</span>
	<span class="hero__mark hero__mark--2" aria-hidden="true">FLAID</span>
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
		opacity: 0.065;
	}
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
	}
	.hero__scroll i {
		display: inline-block;
		width: 1px;
		height: 2rem;
		background: var(--gray);
		font-style: normal;
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
	@media (prefers-reduced-motion: reduce) {
		.hero__eyebrow,
		.hero h1,
		.hero__sub {
			animation: none;
			opacity: 1;
		}
	}
</style>
