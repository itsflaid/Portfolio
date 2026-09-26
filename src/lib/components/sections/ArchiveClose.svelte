<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { scrollToTarget } from '$lib/scroll';

	const dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	let sectionEl: HTMLElement;
	let panelLeftEl: HTMLElement;
	let panelRightEl: HTMLElement;
	let seamEl: HTMLElement;
	let eyebrowEl: HTMLElement;
	let line1El: HTMLElement;
	let line2El: HTMLElement;
	let cursorEl: HTMLElement;
	let subEl: HTMLElement;
	let ctaEl: HTMLElement;

	async function goFeatured(e: MouseEvent) {
		e.preventDefault();
		if ($page.url.pathname !== '/') {
			await goto('/#projects', { noScroll: true });
			await tick();
			scrollToTarget('#projects');
			return;
		}
		scrollToTarget('#projects');
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduceMotion) {
			gsap.set([panelLeftEl, panelRightEl], { xPercent: 0, x: 0 });
			gsap.set(seamEl, { opacity: 0 });
			gsap.set([line1El, line2El], { y: '0%' });
			gsap.set(cursorEl, { opacity: 1 });
			gsap.set([eyebrowEl, subEl, ctaEl], { opacity: 1, y: 0 });
			return;
		}

		// Posisi awal tirai diatur di JS (bukan CSS transform) supaya tidak
		// konflik dengan cache transform GSAP — kalau pakai CSS translateX %,
		// nilainya terbaca sebagai px dan panel stuck di luar layar.
		gsap.set(panelLeftEl, { xPercent: -101, x: 0 });
		gsap.set(panelRightEl, { xPercent: 101, x: 0 });

		// 1) Tirai: scrub mengikuti scroll — scroll turun = menutup,
		//    scroll naik = membuka. Reversible + infinite (masuk-keluar).
		//    Kedua panel 50.5% (overlap 1%) supaya tidak ada celah di tengah.
		const curtainTween = gsap.to([panelLeftEl, panelRightEl], {
			xPercent: 0,
			ease: 'none',
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top bottom',
				end: 'top 30%',
				scrub: 0.8
			}
		});

		// 2) Konten: baru muncul setelah tirai MENUTUP PENUH (scrub tirai
		//    selesai di 'top 30%', konten mulai di 'top 25%'), hilang lagi
		//    saat scroll kembali ke atas (play / reverse = infinite).
		const contentTl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 25%',
				end: 'bottom top',
				toggleActions: 'play none none reverse'
			}
		});

		contentTl
			.fromTo(seamEl, { scaleY: 0, opacity: 1 }, { scaleY: 1, duration: 0.3, ease: 'power2.out' }, 0)
			.to(seamEl, { opacity: 0, duration: 0.25, ease: 'power1.in' }, 0.2)
			.fromTo(eyebrowEl, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.1)
			.fromTo(line1El, { y: '105%' }, { y: '0%', duration: 0.6, ease: 'power3.out' }, 0.15)
			.fromTo(line2El, { y: '105%' }, { y: '0%', duration: 0.6, ease: 'power3.out' }, 0.27)
			.to(cursorEl, { opacity: 1, duration: 0.2 }, 0.65)
			.fromTo(subEl, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.45)
			.fromTo(ctaEl, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.55);

		return () => {
			curtainTween.scrollTrigger?.kill();
			curtainTween.kill();
			contentTl.scrollTrigger?.kill();
			contentTl.kill();
		};
	});
</script>

<footer class="archive-close" bind:this={sectionEl} aria-label="Back to home">
	<div class="close__curtains" aria-hidden="true">
		<div class="close__panel close__panel--left" bind:this={panelLeftEl}></div>
		<div class="close__panel close__panel--right" bind:this={panelRightEl}></div>
		<div class="close__seam" bind:this={seamEl}></div>
	</div>

	<span class="close__dots" aria-hidden="true">
		{#each dots as _}<i></i>{/each}
	</span>
	<span class="close__mark" aria-hidden="true">FLAID</span>

	<div class="close__content">
		<span class="close__eyebrow" bind:this={eyebrowEl}>// END OF ARCHIVE</span>
		<h2 class="close__heading">
			<span class="line-mask"><span class="line" bind:this={line1El}>SEEN</span></span>
			<span class="line-mask"
				><span class="line" bind:this={line2El}>ENOUGH<span class="cursor" bind:this={cursorEl}>_</span></span></span
			>
		</h2>
		<p class="close__sub" bind:this={subEl}>
			Udah mentok archive. Balik ke highlight di homepage.
		</p>
		<div class="close__cta-row" bind:this={ctaEl}>
			<a class="close__cta close__cta--solid" href="/">← BACK TO HOME</a>
			<a class="close__cta close__cta--ghost" href="/#projects" onclick={goFeatured}>
				FEATURED PROJECTS →
			</a>
		</div>
	</div>
</footer>

<style>
	.archive-close {
		position: relative;
		z-index: 3;
		overflow: hidden;
		background: var(--white);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(5rem, 12vh, 8rem) 1.5rem clamp(2.5rem, 6vh, 4rem);
		min-height: 100vh;
		min-height: 100svh;
	}

	.close__curtains {
		position: absolute;
		inset: 0;
		z-index: 1;
		overflow: hidden;
	}
	.close__panel {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 50.5%;
		background: var(--black);
		will-change: transform;
	}
	.close__panel--left {
		left: 0;
	}
	.close__panel--right {
		right: 0;
	}
	.close__seam {
		position: absolute;
		top: 8%;
		bottom: 8%;
		left: 50%;
		width: 1px;
		background: rgba(241, 241, 239, 0.35);
		transform: scaleY(0);
		transform-origin: center;
		opacity: 0;
	}

	.close__dots {
		position: absolute;
		top: clamp(1.5rem, 4vw, 3rem);
		left: clamp(1.5rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		z-index: 2;
		pointer-events: none;
	}
	.close__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--fg-dark);
		font-style: normal;
		opacity: 0.08;
		animation: close-dot-blink 3s ease-in-out infinite;
	}
	.close__dots i:nth-child(2) { animation-delay: 0.3s; }
	.close__dots i:nth-child(3) { animation-delay: 0.6s; }
	.close__dots i:nth-child(4) { animation-delay: 0.9s; }
	.close__dots i:nth-child(5) { animation-delay: 1.2s; }
	.close__dots i:nth-child(6) { animation-delay: 1.5s; }
	.close__dots i:nth-child(7) { animation-delay: 1.8s; }
	.close__dots i:nth-child(8) { animation-delay: 2.1s; }
	.close__dots i:nth-child(9) { animation-delay: 2.4s; }

	.close__mark {
		position: absolute;
		bottom: -2.5vw;
		right: -0.5vw;
		z-index: 2;
		font-family: var(--ff-display);
		font-size: clamp(4rem, 11vw, 9rem);
		letter-spacing: 0.01em;
		color: var(--fg-dark);
		opacity: 0.05;
		user-select: none;
		pointer-events: none;
		white-space: nowrap;
	}

	.close__content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: clamp(1rem, 2.5vh, 1.6rem);
		max-width: 44rem;
		color: var(--fg-dark);
	}
	.close__eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		color: var(--gray);
		opacity: 0;
	}
	.close__heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.01em;
		font-size: clamp(3rem, 10vw, 6.5rem);
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
		animation: close-blink 1s step-end infinite;
	}
	.close__sub {
		margin: 0;
		font-family: var(--ff-body);
		font-size: clamp(0.9rem, 1.2vw, 1.02rem);
		color: var(--gray);
		max-width: 46ch;
		opacity: 0;
	}
	.close__cta-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
		margin-top: 0.4rem;
		opacity: 0;
	}
	.close__cta {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.85rem 1.75rem;
		font-family: var(--ff-mono);
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		text-decoration: none;
		transition:
			transform 0.3s cubic-bezier(0.2, 0.6, 0.2, 1),
			background 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
	}
	.close__cta--solid {
		background: var(--fg-dark);
		color: var(--black);
		border: 1px solid var(--fg-dark);
	}
	.close__cta--solid:hover {
		transform: translateY(-2px);
		background: var(--white);
		border-color: var(--white);
	}
	.close__cta--ghost {
		background: transparent;
		color: var(--fg-dark);
		border: 1px solid rgba(241, 241, 239, 0.3);
	}
	.close__cta--ghost:hover {
		background: var(--fg-dark);
		color: var(--black);
		border-color: var(--fg-dark);
		transform: translateY(-2px);
	}
	@keyframes close-blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
	@keyframes close-dot-blink {
		0%, 100% { opacity: 0.08; }
		50% { opacity: 0.34; }
	}

	@media (max-width: 640px) {
		.archive-close {
			min-height: 100vh;
			min-height: 100svh;
			padding: clamp(4rem, 10vh, 6rem) 1.25rem 2rem;
		}
		.close__dots { display: none; }
		.close__cta-row {
			flex-direction: column;
			align-items: stretch;
			width: 100%;
		}
		.close__cta {
			justify-content: center;
			width: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor { animation: none; opacity: 1; }
		.close__dots i { animation: none; opacity: 0.2; }
		.close__panel--left, .close__panel--right { transform: none; }
	}
</style>
