<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { renderScramble, fullScramble } from '$lib/scramble';

	const TARGET = "LET'S TALK";

	let contactEl: HTMLElement;
	let eyebrowEl: HTMLElement;
	let leadEl: HTMLElement;
	let headingTextEl: HTMLElement;
	let cursorEl: HTMLElement;
	let ctaEl: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduceMotion) {
			headingTextEl.textContent = TARGET;
			gsap.set([eyebrowEl, leadEl, ctaEl], { opacity: 1, y: 0 });
			gsap.set(cursorEl, { opacity: 1 });
			return;
		}

		headingTextEl.textContent = fullScramble(TARGET);

		let progress = 0;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: contactEl,
				start: 'top 80%',
				end: 'top 15%',
				scrub: 1,
				onUpdate: (self) => {
					progress = self.progress;
				}
			}
		});

		tl.fromTo(eyebrowEl, { opacity: 0, y: 16 }, { opacity: 1, y: 0, ease: 'none' }, 0);
		tl.fromTo(leadEl, { opacity: 0, y: 16 }, { opacity: 1, y: 0, ease: 'none' }, 0.05);
		tl.fromTo(ctaEl, { opacity: 0, y: 16 }, { opacity: 1, y: 0, ease: 'none' }, 0.85);
		tl.to(cursorEl, { opacity: 1, duration: 0.001 }, 0.97);

		// Karakter yang belum "terkunci" terus acak tiap beberapa frame,
		// sementara jumlah huruf yang terkunci mengikuti progress scroll (bukan timer).
		let frame = 0;
		const ticker = () => {
			frame++;
			if (frame % 2 === 0) headingTextEl.textContent = renderScramble(TARGET, progress);
		};
		gsap.ticker.add(ticker);

		return () => {
			gsap.ticker.remove(ticker);
			tl.scrollTrigger?.kill();
			tl.kill();
		};
	});
</script>

<section class="contact" id="contact" bind:this={contactEl}>
	<div class="contact__inner">
		<span class="contact__eyebrow" bind:this={eyebrowEl}>// AVAILABLE FOR WORK</span>
		<p class="contact__lead" bind:this={leadEl}>If you have a problem worth solving,</p>
		<h2 class="contact__heading">
			<span class="contact__heading-text" bind:this={headingTextEl}>{TARGET}</span><span
				class="cursor"
				bind:this={cursorEl}>_</span
			>
		</h2>
		<a class="contact__cta" href="mailto:mfadil.coder@gmail.com" bind:this={ctaEl}>
			mfadil.coder@gmail.com →
		</a>
	</div>
</section>

<style>
	.contact {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--white);
		color: var(--black);
		z-index: 3;
		padding: clamp(4rem, 14vh, 8rem) clamp(1.5rem, 6vw, 4rem);
	}
	.contact__inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: clamp(0.8rem, 2vh, 1.4rem);
		max-width: 42rem;
	}
	.contact__eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		color: var(--gray);
		opacity: 0;
	}
	.contact__lead {
		font-family: var(--ff-body);
		font-style: italic;
		font-size: clamp(1rem, 1.8vw, 1.3rem);
		color: var(--ink-soft);
		opacity: 0;
	}
	.contact__heading {
		margin: 0.2em 0 0.1em;
		font-family: var(--ff-mono);
		font-weight: 500;
		letter-spacing: 0.01em;
		font-size: clamp(2.6rem, 9vw, 6.5rem);
		line-height: 1;
		white-space: normal;
	}
	.contact__heading-text {
		white-space: pre;
	}
	.cursor {
		display: inline-block;
		margin-left: 0.06em;
		opacity: 0;
		animation: contact-blink 1s step-end infinite;
	}
	.contact__cta {
		font-family: var(--ff-mono);
		font-size: clamp(0.95rem, 1.3vw, 1.1rem);
		letter-spacing: 0.02em;
		color: var(--black);
		border-bottom: 1px solid rgba(10, 10, 10, 0.25);
		padding-bottom: 0.2rem;
		opacity: 0;
		transition: border-color 0.2s ease, opacity 0.2s ease;
	}
	.contact__cta:hover {
		border-color: var(--black);
	}

	@keyframes contact-blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
			opacity: 1;
		}
	}
</style>