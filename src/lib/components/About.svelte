<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let aboutEl: HTMLElement;
	let aboutWordEl: HTMLElement;
	let myselfWordEl: HTMLElement;
	let descWordEl: HTMLElement;
	let compositionEl: HTMLElement;
	let contentEl: HTMLElement;
	let descriptionEl: HTMLElement;
	let imageEl: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		function makeWord(el: HTMLElement, text: string) {
			[...text].forEach((char) => {
				const span = document.createElement('span');
				span.className = 'letter';
				span.textContent = char;
				el.appendChild(span);
			});
		}
		makeWord(aboutWordEl, 'ABOUT');
		makeWord(myselfWordEl, 'MYSELF');

		const L = gsap.utils.toArray<HTMLElement>(aboutWordEl.querySelectorAll('.letter'));
		const R = gsap.utils.toArray<HTMLElement>(myselfWordEl.querySelectorAll('.letter'));
		const sequence = [L[4], R[0], L[3], R[1], L[2], R[2], L[1], R[3], L[0], R[4], R[5]];

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
			gsap.set([...L, ...R], { opacity: 1, filter: 'blur(0px)' });
			gsap.set(compositionEl, { gap: '0.25em' });
			gsap.set(descriptionEl, { opacity: 1, filter: 'blur(0px)' });
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

			tl.to(imageEl, { opacity: 1, scale: 1, duration: 0.35, ease: 'none' }, 0);

			sequence.forEach((letter, index) => {
				const t = 0.45 + index * 0.14;
				tl.to(letter, { opacity: 0.35, filter: 'blur(6px)', duration: 0.08, ease: 'none' }, t);
				tl.to(letter, { opacity: 1, filter: 'blur(0px)', duration: 0.14, ease: 'none' }, t + 0.08);
			});

			const isMobile = window.matchMedia('(max-width: 700px)').matches;
			const slideDist = isMobile ? '85vw' : '28vw';
			tl.fromTo(
				aboutWordEl,
				{ x: '-' + slideDist },
				{ x: 0, duration: 1.15, ease: 'power2.out' },
				0.55
			);
			tl.fromTo(myselfWordEl, { x: slideDist }, { x: 0, duration: 1.15, ease: 'power2.out' }, 0.55);

			tl.to(compositionEl, { gap: '0.25em', duration: 0.65, ease: 'power2.out' }, 1.65);

			tl.to({}, { duration: 0.5 }, 2.55);

			tl.to(descriptionEl, { opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power1.out' }, 3.05);

			tl.to(contentEl, { y: -28, duration: 2.6, ease: 'none' }, 3.05);

			descChars.forEach((char, index) => {
				const t = 3.35 + index * 0.018;
				tl.to(char, { color: '#F1F1EF', duration: 0.2, ease: 'none' }, t);
			});

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
			<h2 class="sr-only">About Myself</h2>
			<div class="composition" bind:this={compositionEl} aria-hidden="true">
				<div class="word about-word" bind:this={aboutWordEl}></div>
				<div class="image" bind:this={imageEl}></div>
				<div class="word myself-word" bind:this={myselfWordEl}></div>
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
		height: 420vh;
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
	}

	/* .letter dibuat lewat document.createElement di JS (bukan lewat markup
	   Svelte), jadi harus :global supaya style-scoping Svelte tetap kena. */
	:global(.about .letter) {
		display: inline-block;
		font-family: var(--ff-display);
		font-size: clamp(72px, 12.5vw, 190px);
		font-weight: 400;
		line-height: 0.85;
		letter-spacing: 0.005em;
		color: var(--fg-dark);
		opacity: 0;
		filter: blur(10px);
		will-change: opacity, filter;
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
		filter: blur(14px);
		will-change: opacity, filter;
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
			--heading-desc-gap: clamp(28px, 6vh, 56px);
		}
		.composition {
			flex-direction: column;
			align-items: center;
			gap: 4px;
			padding-bottom: 8px;
		}
		:global(.about .letter) {
			font-size: clamp(56px, 16vw, 110px);
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
