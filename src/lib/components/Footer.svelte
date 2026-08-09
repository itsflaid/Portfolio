<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	type FooterLink = { label: string; href: string };

	const quickLinks: FooterLink[] = [
		{ label: 'ABOUT', href: '#about' },
		{ label: 'WORK', href: '#work' },
		{ label: 'EXPERIENCE', href: '#experience' },
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
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const darkContent = gsap.utils.toArray<HTMLElement>(darkEl.querySelectorAll('[data-reveal]'));
		const lightContent = gsap.utils.toArray<HTMLElement>(
			footerEl.querySelectorAll('[data-reveal-light]')
		);

		if (reduceMotion) {
			gsap.set(darkEl, { xPercent: 0 });
			gsap.set([headingLine1El, headingLine2El], { y: '0%', x: '0rem' });
			gsap.set(cursorEl, { opacity: 1 });
			gsap.set([...darkContent, ...lightContent], { opacity: 1, y: 0 });
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

		return () => {
			tl.scrollTrigger?.kill();
			tl.kill();
		};
	});
</script>

<footer class="footer" id="site-footer" bind:this={footerEl}>
	<div class="footer__light">
		<span class="footer__mark footer__mark--light" aria-hidden="true">FLAID</span>


		<nav class="footer__col" data-reveal-light>
			<span class="footer__label">MENU</span>
			<ul class="footer__list">
				{#each quickLinks as link}
					<li><a href={link.href}>{link.label}</a></li>
				{/each}
			</ul>
		</nav>

		<div class="footer__col" data-reveal-light>
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
			<span class="footer__eyebrow footer__eyebrow--dark" data-reveal>// LET'S TALK</span>
			<h2 class="footer__heading">
				<span class="line-mask"><span class="line" bind:this={headingLine1El}>BUILD</span></span>
				<span class="line-mask"
					><span class="line" bind:this={headingLine2El}
						>SOMETHING<span class="cursor" bind:this={cursorEl}>_</span></span
					></span
				>
			</h2>
			<!-- TODO: ganti email asli -->
			<a class="footer__cta" href="mailto:hello@example.com" data-reveal>mfadil.coder@gmail.com →</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		height: 100vh;
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		overflow: hidden;
		background: var(--white);
		z-index: 3;
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
		will-change: transform;
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
			min-height: 70vh;
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