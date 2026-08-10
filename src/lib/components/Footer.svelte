<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { scrollToTarget, jumpToTop } from '$lib/scroll';

	type FooterLink = { label: string; href: string };

	const quickLinks: FooterLink[] = [
		{ label: 'ABOUT', href: '#about' },
		{ label: 'WORK', href: '#work' },
		{ label: 'SKILLS', href: '#skills' },
		{ label: 'CONTACT', href: '#contact' }
	];

	// TODO: ganti href dengan link asli
	const socials: FooterLink[] = [
		{ label: 'GITHUB', href: '#' },
		{ label: 'LINKEDIN', href: '#' },
		{ label: 'INSTAGRAM', href: '#' }
	];

	const year = new Date().getFullYear();

	let footerEl: HTMLElement;
	let darkEl: HTMLElement;
	let headingLine1El: HTMLElement;
	let headingLine2El: HTMLElement;
	let cursorEl: HTMLElement;
	let endingEyebrowEl: HTMLElement;
	let endingLine1El: HTMLElement;
	let endingLine2El: HTMLElement;
	let endingCursorEl: HTMLElement;
	let endingCreditsEl: HTMLElement;
	let endingBackEl: HTMLElement;
	let mobileEndingEl: HTMLElement;
	let mobileEndingEyebrowEl: HTMLElement;
	let mobileEndingLine1El: HTMLElement;
	let mobileEndingLine2El: HTMLElement;
	let mobileEndingCursorEl: HTMLElement;
	let mobileEndingCreditsEl: HTMLElement;
	let mobileEndingBackEl: HTMLElement;
	let curtainEl: HTMLElement;
	let curtainTransitioning = false;
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	// BACK TO TOP: the ending screen is already a full black frame, so instead
	// of a visible fast-scroll back through every section, a fixed curtain
	// (same black, so the swap-in is invisible) holds the screen, the scroll
	// position jumps to the top underneath it unseen, then the curtain rises
	// off the top edge like a theatre curtain — revealing the Hero from the
	// top down, right where "back to top" actually lands.
	function handleBackToTop() {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion || !curtainEl || curtainTransitioning) {
			scrollToTarget('#top');
			return;
		}
		curtainTransitioning = true;
		gsap.set(curtainEl, { display: 'block', opacity: 1, yPercent: 0 });
		requestAnimationFrame(() => {
			jumpToTop();
			gsap.to(curtainEl, {
				yPercent: -100,
				duration: 0.9,
				delay: 0.18,
				ease: 'power3.inOut',
				onComplete: () => {
					gsap.set(curtainEl, { display: 'none' });
					curtainTransitioning = false;
				}
			});
		});
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isMobile = window.innerWidth <= 860;

		const darkContent = gsap.utils.toArray<HTMLElement>(darkEl.querySelectorAll('[data-reveal]'));
		const lightContent = gsap.utils.toArray<HTMLElement>(
			footerEl.querySelectorAll('[data-reveal-light]')
		);

		if (reduceMotion) {
			gsap.set(darkEl, { xPercent: 0, width: '100%' });
			gsap.set([headingLine1El, headingLine2El], { y: '0%', x: '0rem' });
			gsap.set(cursorEl, { opacity: 1 });
			gsap.set(lightContent, { opacity: 1, y: 0 });
			// Mobile: bg dark tetap ada; ending desktop (curtain-pin) di-skip, tapi
			// ending mobile-nya sendiri (band statis di bawah) tetap ditampilkan.
			gsap.set(darkContent, { opacity: isMobile ? 1 : 0 });
			if (!isMobile) {
				gsap.set(endingCursorEl, { opacity: 1 });
				gsap.set([endingLine1El, endingLine2El], { y: '0%', x: '0rem' });
				gsap.set([endingEyebrowEl, endingCreditsEl, endingBackEl], { opacity: 1, y: 0 });
			} else {
				gsap.set(mobileEndingCursorEl, { opacity: 1 });
				gsap.set([mobileEndingLine1El, mobileEndingLine2El], { y: '0%', x: '0rem' });
				gsap.set([mobileEndingEyebrowEl, mobileEndingCreditsEl, mobileEndingBackEl], {
					opacity: 1,
					y: 0
				});
			}
			return;
		}

		// Dark half start off-screen ke KANAN (kebalikan Skills yang dari kiri)
		gsap.set(darkEl, { xPercent: 100 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: footerEl,
				start: 'top 75%',
				end: 'top 5%',
				scrub: 1
			}
		});

		tl.fromTo(darkEl, { xPercent: 100 }, { xPercent: 0, ease: 'none' }, 0);

		tl.fromTo(
			lightContent,
			{ opacity: 0, y: 20 },
			{ opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out' },
			0.1
		);

		tl.fromTo(
			darkContent,
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
			0.3
		);

		tl.fromTo(
			headingLine1El,
			{ y: '105%', x: '1.4rem' },
			{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
			0.35
		);
		tl.fromTo(
			headingLine2El,
			{ y: '105%', x: '-1.4rem' },
			{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
			0.5
		);
		tl.to(cursorEl, { opacity: 1, duration: 0.2 }, 0.95);

		// ==== FASE PENUTUP ====
		// Footer dipin: posisinya diam, sisanya dihabiskan untuk membesarkan panel
		// dark (kiri-bergerak) hingga full width, lalu konten ending muncul.
		const curtain = gsap.timeline({
			scrollTrigger: {
				trigger: footerEl,
				start: 'top top',
				end: 'bottom bottom',
				scrub: 1,
				invalidateOnRefresh: true
			}
		});

		if (!isMobile) {
			curtain.fromTo(darkEl, { width: '50%' }, { width: '100%', ease: 'none' }, 0);
			curtain.to(lightContent, { opacity: 0, duration: 0.4, ease: 'power1.in' }, 0.2);

			// Konten footer (LET'S TALK / BUILD SOMETHING_ / email) hilang DULU
			// baru teks ending muncul, supaya tidak bertabrakan.
			const revealOut = [...darkContent, headingLine1El, headingLine2El];
			curtain.to(revealOut, { opacity: 0, y: -16, duration: 0.35, ease: 'power2.in' }, 0.4);
			curtain.fromTo(
				endingEyebrowEl,
				{ opacity: 0, y: 12 },
				{ opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
				0.72
			);
			curtain.fromTo(
				endingLine1El,
				{ y: '105%', x: '-1.4rem' },
				{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
				0.75
			);
			curtain.fromTo(
				endingLine2El,
				{ y: '105%', x: '1.4rem' },
				{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
				0.82
			);
			curtain.to(endingCursorEl, { opacity: 1, duration: 0.2 }, 1.05);
			curtain.fromTo(
				endingCreditsEl,
				{ opacity: 0, y: 16 },
				{ opacity: 1, y: 0, duration: 0.4 },
				0.95
			);
			curtain.fromTo(
				endingBackEl,
				{ opacity: 0, y: 16 },
				{ opacity: 1, y: 0, duration: 0.4 },
				1.02
			);
		}

		// Mobile: no pin, no curtain-growth — the ending band just sits as a
		// static dark block below the menu/connect info and plays a single,
		// un-scrubbed reveal once it scrolls into view (same "play once, stay"
		// approach as the Skills groups on mobile). Same beats as the desktop
		// ending — eyebrow, headline mask-wipe, credits, button — just fired
		// as one quick sequence instead of tied to a long pinned scroll.
		const mobileEndingTriggers: ScrollTrigger[] = [];
		if (isMobile) {
			const mobileEndingTl = gsap.timeline({
				scrollTrigger: {
					trigger: mobileEndingEl,
					start: 'top 78%',
					toggleActions: 'play none none none'
				}
			});
			mobileEndingTl.fromTo(
				mobileEndingEyebrowEl,
				{ opacity: 0, y: 10 },
				{ opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
				0
			);
			mobileEndingTl.fromTo(
				mobileEndingLine1El,
				{ y: '105%', x: '-1rem' },
				{ y: '0%', x: '0rem', duration: 0.6, ease: 'power3.out' },
				0.12
			);
			mobileEndingTl.fromTo(
				mobileEndingLine2El,
				{ y: '105%', x: '1rem' },
				{ y: '0%', x: '0rem', duration: 0.6, ease: 'power3.out' },
				0.24
			);
			mobileEndingTl.to(mobileEndingCursorEl, { opacity: 1, duration: 0.2 }, 0.65);
			mobileEndingTl.fromTo(
				mobileEndingCreditsEl,
				{ opacity: 0, y: 12 },
				{ opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
				0.55
			);
			mobileEndingTl.fromTo(
				mobileEndingBackEl,
				{ opacity: 0, y: 12 },
				{ opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
				0.68
			);
			if (mobileEndingTl.scrollTrigger) mobileEndingTriggers.push(mobileEndingTl.scrollTrigger);
		}

		return () => {
			tl.scrollTrigger?.kill();
			tl.kill();
			curtain.scrollTrigger?.kill();
			curtain.kill();
			mobileEndingTriggers.forEach((st) => st.kill());
		};
	});
</script>

<footer class="footer" id="site-footer" bind:this={footerEl}>
	<div class="footer__curtain" bind:this={curtainEl} aria-hidden="true"></div>
	<div class="footer__stage">
		<div class="footer__light">
		<span class="footer__mark footer__mark--light" aria-hidden="true">FLAID</span>

			<nav class="footer__col footer__col--menu" data-reveal-light>
				<span class="footer__label">MENU</span>
				<ul class="footer__list">
					{#each quickLinks as link}
						<li><a href={link.href}>{link.label}</a></li>
					{/each}
				</ul>
			</nav>

			<div class="footer__col footer__col--connect" data-reveal-light>
			<span class="footer__label">CONNECT</span>
			<ul class="footer__list">
				{#each socials as s}
					<li><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
				{/each}
			</ul>
		</div>

		<p class="footer__copy" data-reveal-light>© {year} Muhammad Fadil — FLAID</p>
	</div>

	<div class="footer__dark" bind:this={darkEl}>
		<span class="footer__dots" aria-hidden="true">
			{#each dots as _}<i></i>{/each}
		</span>
		<span class="footer__mark footer__mark--dark" aria-hidden="true">FLAID</span>

		<div class="footer__dark-content">
			<span class="footer__eyebrow footer__eyebrow--dark" data-reveal>// LET'S CONNECT TO</span>
			<h2 class="footer__heading">
				<span class="line-mask"><span class="line" bind:this={headingLine1El}>BUILD</span></span>
				<span class="line-mask"
					><span class="line" bind:this={headingLine2El}
						>SOMETHING<span class="cursor" bind:this={cursorEl}>_</span></span
					></span
				>
			</h2>
			<a class="footer__cta" href="mailto:hello@example.com" data-reveal>mfadil.coder@gmail.com →</a>
		</div>

		<div class="footer__ending">
			<span class="footer__ending-eyebrow" bind:this={endingEyebrowEl}>// THE END</span>
			<h2 class="footer__ending-heading">
				<span class="line-mask"><span class="line" bind:this={endingLine1El}>THANKS FOR</span></span>
				<span class="line-mask"
					><span class="line" bind:this={endingLine2El}
						>SCROLLING<span class="cursor" bind:this={endingCursorEl}>_</span></span
					></span
				>
			</h2>
			<span class="footer__ending-credits" bind:this={endingCreditsEl}
				>DESIGNED &amp; BUILT BY MUHAMMAD FADIL — FLAID</span
			>
			<button class="footer__ending-back" bind:this={endingBackEl} onclick={handleBackToTop}>
				BACK TO TOP ↑
			</button>
		</div>
		</div>

		<div class="footer__ending-mobile" bind:this={mobileEndingEl}>
			<span class="footer__ending-mobile-eyebrow" bind:this={mobileEndingEyebrowEl}>// THE END</span>
			<h2 class="footer__ending-mobile-heading">
				<span class="line-mask"><span class="line" bind:this={mobileEndingLine1El}>THANKS FOR</span></span>
				<span class="line-mask"
					><span class="line" bind:this={mobileEndingLine2El}
						>SCROLLING<span class="cursor" bind:this={mobileEndingCursorEl}>_</span></span
					></span
				>
			</h2>
			<span class="footer__ending-mobile-credits" bind:this={mobileEndingCreditsEl}
				>DESIGNED &amp; BUILT BY MUHAMMAD FADIL — FLAID</span
			>
			<button class="footer__ending-mobile-back" bind:this={mobileEndingBackEl} onclick={handleBackToTop}>
				BACK TO TOP ↑
			</button>
		</div>
	</div>
</footer>

<style>
	.footer {
		position: relative;
		height: 200vh;
		background: var(--white);
		z-index: 3;
	}
	/* Fixed, independent of scroll — covers the whole viewport while the jump
	   to top happens underneath it, then rises away to reveal Hero. Same
	   black as the ending screen so engaging it is an invisible swap. */
	.footer__curtain {
		display: none;
		position: fixed;
		inset: 0;
		z-index: 999;
		background: var(--black);
		pointer-events: none;
		will-change: transform;
	}
	/* Stage sticky — pola yang sama dengan About: section 200vh, stage menempel
	   di viewport selama 100vh kedua, dan scrubbing menggerakkan panel dark. */
	.footer__stage {
		position: sticky;
		top: 0;
		height: 100vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		overflow: hidden;
	}

	/* ===== LIGHT (kiri, info praktis) ===== */
	.footer__light {
		position: relative;
		grid-column: 1;
		background: var(--white);
		color: var(--black);
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: clamp(1.2rem, 3vh, 2rem);
		padding: clamp(1.5rem, 4vh, 2.5rem) clamp(2rem, 6vw, 4rem);
		overflow: hidden;
	}
	.footer__eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		opacity: 0;
	}
	.footer__col {
		opacity: 0;
	}
	.footer__label {
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.footer__list {
		list-style: none;
		margin: 0.6rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	.footer__list a {
		font-family: var(--ff-body);
		font-size: clamp(0.95rem, 1.3vw, 1.05rem);
		color: var(--black);
		transition: opacity 0.2s ease;
	}
	.footer__list a:hover {
		opacity: 0.55;
	}
	.footer__copy {
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.03em;
		color: var(--gray);
		opacity: 0;
	}

	/* ===== DARK (kanan, statement/CTA) ===== */
	.footer__dark {
		position: absolute;
		top: 0;
		right: 0;
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
	.footer__dark-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: clamp(1rem, 2.5vh, 1.5rem);
		max-width: 24rem;
	}
	.footer__eyebrow--dark {
		color: var(--gray);
	}
	.footer__heading {
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
		animation: footer-blink 1s step-end infinite;
	}
	.footer__cta {
		font-family: var(--ff-mono);
		font-size: clamp(0.9rem, 1.2vw, 1rem);
		letter-spacing: 0.02em;
		color: var(--fg-dark);
		border-bottom: 1px solid rgba(241, 241, 239, 0.3);
		padding-bottom: 0.2rem;
		opacity: 0;
		transition: border-color 0.2s ease, opacity 0.2s ease;
	}
	.footer__cta:hover {
		border-color: var(--fg-dark);
	}

	/* ===== FASE ENDING (muncul saat panel dark full width) ===== */
	.footer__ending {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: clamp(1rem, 2.5vh, 1.6rem);
		max-width: 40rem;
		margin: 0 auto;
		width: 100%;
		pointer-events: none;
	}
	.footer__ending-eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		color: var(--gray);
		opacity: 0;
	}
	.footer__ending-heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.01em;
		font-size: clamp(2.6rem, 8vw, 6.5rem);
	}
	.footer__ending-credits {
		font-family: var(--ff-mono);
		font-size: clamp(0.72rem, 1.1vw, 0.85rem);
		letter-spacing: 0.08em;
		color: var(--gray);
		opacity: 0;
	}
	.footer__ending-back {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: clamp(0.5rem, 2vh, 1rem);
		padding: 0.55rem 1.1rem;
		border: 1px solid rgba(241, 241, 239, 0.3);
		background: transparent;
		color: var(--fg-dark);
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		cursor: pointer;
		opacity: 0;
		pointer-events: auto;
		transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease,
			transform 0.3s cubic-bezier(0.2, 0.6, 0.2, 1);
	}
	.footer__ending-back:hover {
		background: var(--fg-dark);
		color: var(--black);
		border-color: var(--fg-dark);
		transform: translateY(-2px);
	}

	/* ===== ENDING MOBILE (band statis, ditampilkan lewat @media di bawah) ===== */
	.footer__ending-mobile {
		display: none;
	}
	.footer__ending-mobile-eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.78rem;
		letter-spacing: 0.1em;
		color: var(--gray);
		opacity: 0;
	}
	.footer__ending-mobile-heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.01em;
		font-size: clamp(2.2rem, 11vw, 3.2rem);
	}
	.footer__ending-mobile-credits {
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.06em;
		color: var(--gray);
		opacity: 0;
	}
	.footer__ending-mobile-back {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: clamp(0.3rem, 1.5vh, 0.6rem);
		padding: 0.55rem 1.1rem;
		border: 1px solid rgba(241, 241, 239, 0.3);
		background: transparent;
		color: var(--fg-dark);
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		cursor: pointer;
		opacity: 0;
		transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
	}
	.footer__ending-mobile-back:active {
		background: var(--fg-dark);
		color: var(--black);
		border-color: var(--fg-dark);
	}

	/* ===== dekorasi (dot grid + ghost mark), reuse motif Skills/Work ===== */
	.footer__dots {
		position: absolute;
		top: clamp(1.5rem, 4vw, 3rem);
		right: clamp(1.5rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		z-index: 1;
		pointer-events: none;
	}
	.footer__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--fg-dark);
		font-style: normal;
		opacity: 0.08;
		animation: footer-dot-blink 3s ease-in-out infinite;
	}
	.footer__dots i:nth-child(2) { animation-delay: 0.3s; }
	.footer__dots i:nth-child(3) { animation-delay: 0.6s; }
	.footer__dots i:nth-child(4) { animation-delay: 0.9s; }
	.footer__dots i:nth-child(5) { animation-delay: 1.2s; }
	.footer__dots i:nth-child(6) { animation-delay: 1.5s; }
	.footer__dots i:nth-child(7) { animation-delay: 1.8s; }
	.footer__dots i:nth-child(8) { animation-delay: 2.1s; }
	.footer__dots i:nth-child(9) { animation-delay: 2.4s; }

	.footer__mark {
		position: absolute;
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.01em;
		font-size: clamp(4rem, 11vw, 9rem);
		white-space: nowrap;
		z-index: 0;
		user-select: none;
		pointer-events: none;
		opacity: 0.05;
	}
	.footer__mark--light {
		top: -2.5vw;
		left: -0.5vw;
		color: var(--black);
	}
	.footer__mark--dark {
		bottom: -2.5vw;
		right: -0.5vw;
		color: var(--fg-dark);
	}

	@keyframes footer-blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
	@keyframes footer-dot-blink {
		0%, 100% { opacity: 0.08; }
		50% { opacity: 0.34; }
	}

	@media (max-width: 860px) {
		.footer {
			height: auto;
		}
		.footer__stage {
			position: relative;
			top: auto;
			height: auto;
			display: block;
		}
		.footer__dark {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			width: 100%;
			height: 60vh;
			bottom: auto;
		}
		.footer__light {
			grid-column: 1;
			margin-top: 60vh;
			/* Kurangi tinggi & padding vertikal supaya tidak terlalu luas atas-bawah. */
			min-height: auto;
			padding: clamp(2rem, 8vh, 3.5rem) clamp(1.5rem, 6vw, 3rem);
			/* MENU kiri, CONNECT kanan — dua kolom sejajar. */
			display: grid;
			grid-template-columns: 1fr 1fr;
			align-content: center;
			align-items: start;
			gap: clamp(0.75rem, 2vh, 1.25rem) clamp(1.5rem, 6vw, 3rem);
		}
		.footer__col {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
		.footer__col--menu {
			grid-column: 1;
			justify-self: start;
		}
		.footer__col--connect {
			grid-column: 2;
			justify-self: start;
		}
		.footer__copy {
			grid-column: 1 / -1;
			text-align: left;
		}
		/* Mobile: bukan curtain-pin kayak desktop — cukup band statis, reveal
		   sekali pas discroll ke situ (lihat .footer__ending-mobile di bawah). */
		.footer__ending {
			display: none;
		}
		.footer__ending-mobile {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			gap: clamp(0.9rem, 3vh, 1.4rem);
			background: var(--black);
			color: var(--fg-dark);
			padding: clamp(3rem, 12vh, 4.5rem) clamp(1.5rem, 6vw, 3rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
			opacity: 1;
		}
		.footer__dots i {
			animation: none;
			opacity: 0.2;
		}
	}
</style>