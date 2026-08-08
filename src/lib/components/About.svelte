<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let aboutEl: HTMLElement;
	let leftWordEl: HTMLElement;
	let rightWordEl: HTMLElement;
	let descWordEl: HTMLElement;
	let compositionEl: HTMLElement;
	let contentEl: HTMLElement;
	let descriptionEl: HTMLElement;
	let imageEl: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		leftWordEl.textContent = 'ME BEHIND';
		rightWordEl.textContent = 'THE CODE';

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
			gsap.set(imageEl, { opacity: 1, scale: 1 });
			gsap.set([leftWordEl, rightWordEl], { opacity: 1, x: 0, y: 0 });
			gsap.set(compositionEl, { gap: '0.25em' });
			gsap.set(descriptionEl, { opacity: 1 });
			gsap.set(descChars, { color: '#F1F1EF' });
		} else {
			const isMobile = window.matchMedia('(max-width: 700px)').matches;
			// Each word starts off past the bottom-side edge of the pinned viewport, at full
			// size and full opacity — the "reveal" comes from .stage's overflow:hidden clipping
			// it, not from a letter-by-letter fade. That's what makes the slide read as one
			// solid block sliding in, like monolog.com's "we close that gap" section.
			const slideX = isMobile ? '80vw' : '30vw';
			const slideY = isMobile ? '32vh' : '55vh';

			gsap.set([leftWordEl, rightWordEl], { opacity: 1 });

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: aboutEl,
					start: 'top top',
					end: 'bottom bottom',
					scrub: 1.2,
					invalidateOnRefresh: true
				}
			});

			// Diagonal entrance: both words travel bottom-corner -> center at the same time.
			tl.fromTo(
				leftWordEl,
				{ x: '-' + slideX, y: slideY },
				{ x: 0, y: 0, duration: 1.6, ease: 'power3.out' },
				0
			);
			tl.fromTo(
				rightWordEl,
				{ x: slideX, y: slideY },
				{ x: 0, y: 0, duration: 1.6, ease: 'power3.out' },
				0
			);

			tl.fromTo(
				imageEl,
				{ opacity: 0, scale: 0.45 },
				{ opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
				0.2
			);

			// Words have landed -> close the gap so the line reads as one phrase.
			tl.to(compositionEl, { gap: '0.25em', duration: 1.0, ease: 'power2.out' }, 1.5);

			tl.to(descriptionEl, { opacity: 1, duration: 0.8, ease: 'power1.out' }, 1.6);

			descChars.forEach((char, index) => {
				const t = 1.9 + index * 0.02;
				tl.to(char, { color: '#F1F1EF', duration: 0.3, ease: 'none' }, t);
			});

			// Hold, let the description finish revealing, then carry everything off upward.
			tl.to(contentEl, { y: '-80vh', duration: 2.0, ease: 'power1.inOut' }, '+=0.3');

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
			<h2 class="sr-only">Me Behind The Code</h2>
			<div class="composition" bind:this={compositionEl} aria-hidden="true">
				<div class="word left-word" bind:this={leftWordEl}></div>
				<div class="image" bind:this={imageEl}></div>
				<div class="word right-word" bind:this={rightWordEl}></div>
			</div>
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
		height: 250vh;
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
		will-change: transform;
	}
	.composition {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(35px, 5vw, 85px);
		will-change: gap;
	}
	.word {
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		flex: 0 0 auto;
		position: relative;
		z-index: 2;
		font-family: var(--ff-display);
		font-size: clamp(72px, 12.5vw, 190px);
		font-weight: 400;
		line-height: 0.85;
		letter-spacing: 0.005em;
		color: var(--fg-dark);
		will-change: transform;
	}
	.image {
		position: absolute;
		left: 50%;
		top: 50%;
		width: clamp(120px, 13vw, 190px);
		height: clamp(150px, 16vw, 235px);
		transform: translate(-50%, -50%) scale(0.45);
		background: var(--accent-ph);
		opacity: 0;
		box-shadow: 0 0 70px rgba(255, 255, 255, 0.06);
	}
	.image::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 55%);
	}
	.description {
		display: flex;
		justify-content: center;
		padding: 0 8vw;
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
		.about {
			--heading-desc-gap: clamp(40px, 8vh, 72px);
		}
		.composition {
			flex-direction: column;
			align-items: center;
			gap: 4px;
			padding-bottom: 8px;
		}
		.word {
			font-size: clamp(40px, 12vw, 84px);
		}
		.image {
			width: clamp(96px, 24vw, 150px);
			height: clamp(120px, 30vw, 188px);
		}
		.description {
			padding: 0 6vw;
		}
		.description p {
			width: 88vw;
			font-size: clamp(23px, 7vw, 40px);
		}
	}
</style>