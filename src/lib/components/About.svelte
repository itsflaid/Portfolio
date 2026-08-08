<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let aboutEl: HTMLElement;
	let descEl: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const descText = descEl.textContent?.trim() ?? '';
		descEl.textContent = '';
		[...descText].forEach((char) => {
			const span = document.createElement('span');
			span.textContent = char;
			span.style.color = '#5a5a5a';
			descEl.appendChild(span);
		});
		const descChars = gsap.utils.toArray<HTMLElement>(descEl.querySelectorAll('span'));

		let killTimeline: (() => void) | null = null;

		if (reduceMotion) {
			gsap.set(descChars, { color: '#F1F1EF' });
		} else {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: aboutEl,
					start: 'top 80%',
					end: 'bottom 60%',
					scrub: 1,
					invalidateOnRefresh: true
				}
			});
			descChars.forEach((char, index) => {
				tl.to(char, { color: '#F1F1EF', duration: 0.3, ease: 'none' }, index * 0.02);
			});

			killTimeline = () => {
				tl.scrollTrigger?.kill();
				tl.kill();
			};
		}

		return () => {
			killTimeline?.();
		};
	});
</script>

<section class="about" bind:this={aboutEl}>
	<h2 class="sr-only">About Me</h2>
	<p class="about__desc" bind:this={descEl}>
		I'm a self-taught developer based in Samarinda, building tools that map, remember, and improve
		how code gets written — starting with my own problems, under a studio I call Devecos.
	</p>
</section>

<style>
	.about {
		position: relative;
		z-index: 2;
		background: var(--black);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem);
	}
	.about__desc {
		margin: 0;
		width: min(920px, 78vw);
		text-align: center;
		font-family: var(--ff-display);
		font-size: clamp(26px, 4vw, 58px);
		line-height: 1.1;
		font-weight: 400;
		color: var(--fg-dark);
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 700px) {
		.about__desc {
			width: 88vw;
			font-size: clamp(23px, 7vw, 40px);
		}
	}
</style>
