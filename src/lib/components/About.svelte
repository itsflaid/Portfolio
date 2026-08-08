<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let aboutEl: HTMLElement;
	let contentEl: HTMLElement;
	let line1El: HTMLElement;
	let line2El: HTMLElement;
	let cursorEl: HTMLElement;
	let descWordEl: HTMLElement;
	let descriptionEl: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const descText = descWordEl.textContent?.trim() ?? '';
		descWordEl.textContent = '';
		[...descText].forEach((char) => {
			const span = document.createElement('span');
			span.textContent = char;
			span.style.color = '#5a5a5a';
			descWordEl.appendChild(span);
		});
		const descChars = gsap.utils.toArray<HTMLElement>(descWordEl.querySelectorAll('span'));

		let killTimeline: (() => void) | null = null;

		if (reduceMotion) {
			gsap.set([line1El, line2El], { y: '0%' });
			gsap.set(cursorEl, { opacity: 1 });
			gsap.set(descriptionEl, { opacity: 1 });
			gsap.set(descChars, { color: '#F1F1EF' });
		} else {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: aboutEl,
					start: 'top top',
					end: 'bottom bottom',
					scrub: 1.2,
					invalidateOnRefresh: true
				}
			});

			// Two lines mask-wipe up into view, one just after the other — no giant
			// diagonal word-slide, no floating placeholder image. Scale matches the
			// Hero h1 so the type hierarchy stays consistent across sections.
			tl.fromTo(line1El, { y: '105%' }, { y: '0%', duration: 1.1, ease: 'power3.out' }, 0);
			tl.fromTo(line2El, { y: '105%' }, { y: '0%', duration: 1.1, ease: 'power3.out' }, 0.15);
			tl.to(cursorEl, { opacity: 1, duration: 0.3 }, 1.1);

			tl.to(descriptionEl, { opacity: 1, duration: 0.8, ease: 'power1.out' }, 1.3);

			descChars.forEach((char, index) => {
				const t = 1.6 + index * 0.02;
				tl.to(char, { color: '#F1F1EF', duration: 0.3, ease: 'none' }, t);
			});

			tl.to(contentEl, { y: '-45vh', duration: 2.0, ease: 'power1.inOut' }, '+=0.6');

			killTimeline = () => {
				tl.scrollTrigger?.kill();
				tl.kill();
			};
		}

		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);

		return () => {
			window.removeEventListener('load', onLoad);
			killTimeline?.();
		};
	});
</script>

<section class="about" bind:this={aboutEl}>
	<div class="stage">
		<div class="content" bind:this={contentEl}>
			<span class="eyebrow">// ABOUT</span>
			<h2 class="heading">
				<span class="line-mask"><span class="line" bind:this={line1El}>ME, BEHIND</span></span>
				<span class="line-mask"
					><span class="line" bind:this={line2El}
						>THE CODE.<span class="cursor" bind:this={cursorEl}>_</span></span
					></span
				>
			</h2>
			<div class="description" bind:this={descriptionEl}>
				<p>
					<span class="description-word" bind:this={descWordEl}
						>I'm a self-taught developer based in Samarinda, building tools that map, remember,
						and improve how code gets written — starting with my own problems, under a studio I
						call Devecos.</span
					>
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		height: 220vh;
		position: relative;
		background: var(--black);
		z-index: 2;
	}
	.stage {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow: hidden;
		display: grid;
		place-items: center;
		z-index: 1;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--heading-desc-gap);
		text-align: center;
		padding: 0 clamp(1.5rem, 6vw, 4rem);
		will-change: transform;
	}
	.eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.01em;
		font-size: clamp(2.1rem, 8vw, 6.5rem);
		color: var(--fg-dark);
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
		animation: blink 1s step-end infinite;
	}
	.description {
		display: flex;
		justify-content: center;
		opacity: 0;
		will-change: opacity;
		pointer-events: none;
	}
	.description p {
		margin: 0;
		width: min(920px, 78vw);
		text-align: center;
		font-family: var(--ff-display);
		font-size: clamp(26px, 4vw, 58px);
		line-height: 1.1;
		letter-spacing: 0;
		font-weight: 400;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	@media (max-width: 700px) {
		.about {
			--heading-desc-gap: clamp(32px, 6vh, 56px);
		}
		.heading {
			font-size: clamp(2.1rem, 11vw, 3.2rem);
		}
		.description p {
			width: 88vw;
			font-size: clamp(23px, 7vw, 40px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
			opacity: 1;
		}
	}
</style>