<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { scrollToTarget, jumpToTop } from '$lib/scroll';

	type ContactLink = { label: string; href: string };

	const quickLinks: ContactLink[] = [
		{ label: 'ABOUT', href: '#about' },
		{ label: 'PROJECTS', href: '#projects' },
		{ label: 'SKILLS', href: '#skills' },
		{ label: 'CONTACT', href: '#contact' }
	];

	const socials: ContactLink[] = [
		{ label: 'GITHUB', href: 'https://github.com/itsflaid' },
		{ label: 'LINKEDIN', href: 'https://www.linkedin.com/in/muhammad-fadil-1264b82a9' },
		{ label: 'INSTAGRAM', href: 'https://www.instagram.com/sebutsajamf?igsh=N2xjdnVobmthdGU0' }
	];

	type ContactFact = { label: string; value: string };
	const facts: ContactFact[] = [
		{ label: 'STATUS', value: 'Open for freelance & collab' },
		{ label: 'BASED IN', value: 'Kutai Kartanegara, ID' },
		{ label: 'REPLY TIME', value: 'Usually within 24 hours' }
	];

	const year = new Date().getFullYear();

	let contactEl: HTMLElement;
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
			contactEl.querySelectorAll('[data-reveal-light]')
		);
		const factsRows = gsap.utils.toArray<HTMLElement>(contactEl.querySelectorAll('.contact__facts-row'));
		const factsRules = gsap.utils.toArray<HTMLElement>(contactEl.querySelectorAll('.contact__rule'));

		if (reduceMotion) {
			gsap.set(darkEl, { xPercent: 0, width: '100%' });
			gsap.set([headingLine1El, headingLine2El], { y: '0%', x: '0rem' });
			gsap.set(cursorEl, { opacity: 1 });
			gsap.set(lightContent, { opacity: 1, y: 0 });
			gsap.set(factsRows, { opacity: 1, y: 0 });
			gsap.set(factsRules, { scaleX: 1 });
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

		gsap.set(darkEl, { xPercent: 100 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: contactEl,
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
			factsRows,
			{ opacity: 0, y: 16 },
			{ opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out' },
			0.14
		);
		tl.fromTo(
			factsRules,
			{ scaleX: 0 },
			{ scaleX: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
			0.14
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

		const curtain = gsap.timeline({
			scrollTrigger: {
				trigger: contactEl,
				start: 'top top',
				end: 'bottom bottom',
				scrub: 1,
				invalidateOnRefresh: true
			}
		});

		if (!isMobile) {
			curtain.fromTo(darkEl, { width: '50%' }, { width: '100%', ease: 'none' }, 0);
			curtain.to(lightContent, { opacity: 0, duration: 0.4, ease: 'power1.in' }, 0.2);
			curtain.to(factsRows, { opacity: 0, duration: 0.3, ease: 'power1.in' }, 0.2);

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

<footer class="contact" id="contact" bind:this={contactEl}>
	<div class="contact__curtain" bind:this={curtainEl} aria-hidden="true"></div>
	<div class="contact__stage">
		<div class="contact__light">
			<span class="contact__mark contact__mark--light" aria-hidden="true">FLAID</span>

			<div class="contact__light-head" data-reveal-light>
				<span class="contact__eyebrow-light">// SAY HELLO</span>
				<p class="contact__light-lead">
					If you have a problem worth solving? let's talk.
				</p>
			</div>

			<dl class="contact__facts">
				{#each facts as fact}
					<div class="contact__facts-row">
						<span class="contact__rule" aria-hidden="true"></span>
						<dt>{fact.label}</dt>
						<dd>{fact.value}</dd>
					</div>
				{/each}
			</dl>

			<div class="contact__groups">
				<nav class="contact__group" data-reveal-light aria-label="Menu">
					<span class="contact__group-label">MENU</span>
					<ul class="contact__group-list">
						{#each quickLinks as link, i}
							<li>
								<a href={link.href}>
									<span class="contact__group-index">0{i + 1}</span>
									<span>{link.label}</span>
								</a>
							</li>
						{/each}
					</ul>
				</nav>

				<div class="contact__group" data-reveal-light>
					<span class="contact__group-label">CONNECT</span>
					<ul class="contact__group-list">
						{#each socials as s, i}
							<li>
								<a href={s.href} target="_blank" rel="noopener noreferrer">
									<span class="contact__group-index">0{i + 1}</span>
									<span>{s.label}</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<p class="contact__copy" data-reveal-light>© {year} Muhammad Fadil — FLAID</p>
		</div>

		<div class="contact__dark" bind:this={darkEl}>
			<span class="contact__dots" aria-hidden="true">
				{#each dots as _}<i></i>{/each}
			</span>
			<span class="contact__mark contact__mark--dark" aria-hidden="true">FLAID</span>

			<div class="contact__dark-content">
				<span class="contact__eyebrow contact__eyebrow--dark" data-reveal
					>// Have an idea?</span
				>
				<h2 class="contact__heading">
					<span class="line-mask"><span class="line" bind:this={headingLine1El}>LETS</span></span>
					<span class="line-mask"
						><span class="line" bind:this={headingLine2El}
							>CONNECT<span class="cursor" bind:this={cursorEl}>_</span></span
						></span
					>
				</h2>
				<a class="contact__cta" href="mailto:mfadil.coder@gmail.com" data-reveal
					>mfadil.coder@gmail.com →</a
				>
			</div>

			<div class="contact__ending">
				<span class="contact__ending-eyebrow" bind:this={endingEyebrowEl}>// THE END</span>
				<h2 class="contact__ending-heading">
					<span class="line-mask"><span class="line" bind:this={endingLine1El}>THANKS FOR</span></span>
					<span class="line-mask"
						><span class="line" bind:this={endingLine2El}
							>SCROLLING<span class="cursor" bind:this={endingCursorEl}>_</span></span
						></span
					>
				</h2>
				<span class="contact__ending-credits" bind:this={endingCreditsEl}
					>DESIGNED &amp; BUILT BY MUHAMMAD FADIL — FLAID</span
				>
				<button class="contact__ending-back" bind:this={endingBackEl} onclick={handleBackToTop}>
					BACK TO TOP ↑
				</button>
			</div>
		</div>

		<div class="contact__ending-mobile" bind:this={mobileEndingEl}>
			<span class="contact__ending-mobile-eyebrow" bind:this={mobileEndingEyebrowEl}>// THE END</span>
			<h2 class="contact__ending-mobile-heading">
				<span class="line-mask"
					><span class="line" bind:this={mobileEndingLine1El}>THANKS FOR</span></span
				>
				<span class="line-mask"
					><span class="line" bind:this={mobileEndingLine2El}
						>SCROLLING<span class="cursor" bind:this={mobileEndingCursorEl}>_</span></span
					></span
				>
			</h2>
			<span class="contact__ending-mobile-credits" bind:this={mobileEndingCreditsEl}
				>DESIGNED &amp; BUILT BY MUHAMMAD FADIL — FLAID</span
			>
			<button
				class="contact__ending-mobile-back"
				bind:this={mobileEndingBackEl}
				onclick={handleBackToTop}
			>
				BACK TO TOP ↑
			</button>
		</div>
	</div>
</footer>

<style>
	.contact {
		position: relative;
		height: 200vh;
		background: var(--white);
		z-index: 3;
	}
	.contact__curtain {
		display: none;
		position: fixed;
		inset: 0;
		z-index: 999;
		background: var(--black);
		pointer-events: none;
		will-change: transform;
	}
	.contact__stage {
		position: sticky;
		top: 0;
		height: 100vh;
		display: grid;
		grid-template-columns: 1fr 1fr;
		overflow: hidden;
	}

	.contact__light {
		position: relative;
		grid-column: 1;
		background: var(--white);
		color: var(--black);
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: clamp(1.75rem, 4vh, 2.5rem);
		padding: clamp(1.5rem, 4vh, 2.5rem) clamp(2rem, 6vw, 4rem);
		overflow: hidden;
	}
	.contact__light-head {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		max-width: 26rem;
		opacity: 0;
	}
	.contact__eyebrow-light {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.contact__light-lead {
		font-family: var(--ff-body);
		font-size: clamp(0.95rem, 1.3vw, 1.05rem);
		line-height: 1.55;
		color: var(--ink-soft);
	}

	.contact__facts {
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.contact__facts-row {
		position: relative;
		display: flex;
		align-items: baseline;
		gap: 1.25rem;
		padding: 0.6rem 0;
		opacity: 0;
	}
	.contact__rule {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: rgba(10, 10, 10, 0.14);
		transform: scaleX(0);
		transform-origin: left;
	}
	.contact__facts-row dt {
		flex: 0 0 auto;
		width: clamp(6rem, 10vw, 7.5rem);
		margin: 0;
		font-family: var(--ff-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.contact__facts-row dd {
		margin: 0;
		font-family: var(--ff-body);
		font-size: 0.88rem;
		color: var(--black);
		opacity: 0.85;
	}

	.contact__groups {
		display: flex;
		gap: clamp(2rem, 6vw, 3.5rem);
	}
	.contact__group {
		flex: 1 1 0%;
		min-width: 0;
		opacity: 0;
	}
	.contact__group-label {
		display: block;
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		margin-bottom: 0.6rem;
	}
	.contact__group-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.contact__group-list a {
		display: inline-flex;
		align-items: baseline;
		gap: 0.55rem;
		font-family: var(--ff-body);
		font-size: clamp(0.95rem, 1.3vw, 1.05rem);
		color: var(--black);
		transition: opacity 0.2s ease;
	}
	.contact__group-index {
		font-family: var(--ff-mono);
		font-size: 0.65rem;
		color: var(--accent-ph);
	}
	.contact__group-list a:hover {
		opacity: 0.55;
	}

	.contact__copy {
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.03em;
		color: var(--gray);
		opacity: 0;
		padding-top: clamp(1rem, 2.5vh, 1.5rem);
		margin-top: clamp(0.25rem, 1vh, 0.5rem);
		border-top: 1px solid rgba(10, 10, 10, 0.14);
	}

	.contact__dark {
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
	.contact__dark-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: clamp(1rem, 2.5vh, 1.5rem);
		max-width: 24rem;
	}
	.contact__eyebrow--dark {
		color: var(--gray);
	}
	.contact__heading {
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
		animation: contact-blink 1s step-end infinite;
	}
	.contact__cta {
		font-family: var(--ff-mono);
		font-size: clamp(0.9rem, 1.2vw, 1rem);
		letter-spacing: 0.02em;
		color: var(--fg-dark);
		border-bottom: 1px solid rgba(241, 241, 239, 0.3);
		padding-bottom: 0.2rem;
		opacity: 0;
		transition: border-color 0.2s ease, opacity 0.2s ease;
	}
	.contact__cta:hover {
		border-color: var(--fg-dark);
	}

	.contact__ending {
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
	.contact__ending-eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		color: var(--gray);
		opacity: 0;
	}
	.contact__ending-heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.01em;
		font-size: clamp(2.6rem, 8vw, 6.5rem);
	}
	.contact__ending-credits {
		font-family: var(--ff-mono);
		font-size: clamp(0.72rem, 1.1vw, 0.85rem);
		letter-spacing: 0.08em;
		color: var(--gray);
		opacity: 0;
	}
	.contact__ending-back {
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
	.contact__ending-back:hover {
		background: var(--fg-dark);
		color: var(--black);
		border-color: var(--fg-dark);
		transform: translateY(-2px);
	}

	.contact__ending-mobile {
		display: none;
	}
	.contact__ending-mobile-eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.78rem;
		letter-spacing: 0.1em;
		color: var(--gray);
		opacity: 0;
	}
	.contact__ending-mobile-heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.01em;
		font-size: clamp(2.2rem, 11vw, 3.2rem);
	}
	.contact__ending-mobile-credits {
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.06em;
		color: var(--gray);
		opacity: 0;
	}
	.contact__ending-mobile-back {
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
	.contact__ending-mobile-back:active {
		background: var(--fg-dark);
		color: var(--black);
		border-color: var(--fg-dark);
	}

	.contact__dots {
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
	.contact__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--fg-dark);
		font-style: normal;
		opacity: 0.08;
		animation: contact-dot-blink 3s ease-in-out infinite;
	}
	.contact__dots i:nth-child(2) { animation-delay: 0.3s; }
	.contact__dots i:nth-child(3) { animation-delay: 0.6s; }
	.contact__dots i:nth-child(4) { animation-delay: 0.9s; }
	.contact__dots i:nth-child(5) { animation-delay: 1.2s; }
	.contact__dots i:nth-child(6) { animation-delay: 1.5s; }
	.contact__dots i:nth-child(7) { animation-delay: 1.8s; }
	.contact__dots i:nth-child(8) { animation-delay: 2.1s; }
	.contact__dots i:nth-child(9) { animation-delay: 2.4s; }

	.contact__mark {
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
	.contact__mark--light {
		top: -2.5vw;
		left: -0.5vw;
		color: var(--black);
	}
	.contact__mark--dark {
		bottom: -2.5vw;
		right: -0.5vw;
		color: var(--fg-dark);
	}

	@keyframes contact-blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
	@keyframes contact-dot-blink {
		0%, 100% { opacity: 0.08; }
		50% { opacity: 0.34; }
	}

	@media (max-width: 860px) {
		.contact {
			height: auto;
		}
		.contact__stage {
			position: relative;
			top: auto;
			height: auto;
			display: block;
		}
		.contact__dark {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			width: 100%;
			height: 60vh;
			bottom: auto;
		}
		.contact__light {
			grid-column: 1;
			margin-top: 60vh;
			min-height: auto;
			padding: clamp(2rem, 8vh, 3.5rem) clamp(1.5rem, 6vw, 3rem);
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			gap: clamp(1.5rem, 4vh, 2rem);
		}
		.contact__groups {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: clamp(1rem, 4vw, 2rem);
		}
		.contact__copy {
			text-align: left;
		}
		.contact__ending {
			display: none;
		}
		.contact__ending-mobile {
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
		.contact__dots i {
			animation: none;
			opacity: 0.2;
		}
	}
</style>