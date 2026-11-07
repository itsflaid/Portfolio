<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { scrollToTarget, jumpToTop } from '$lib/scroll';

	import { navLinks as quickLinks, SITE } from '$lib/data/site';
	import { siGithub, siGmail, siInstagram } from 'simple-icons';

	const year = new Date().getFullYear();

	const linkedinPath =
		'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z';

	const navMeta: Record<string, { icon: string; desc: string }> = {
		'#about': {
			icon: 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z',
			desc: 'Who I am'
		},
		'#projects': {
			icon: 'M3 3h8v8H3V3Zm10 0h8v8h-8V3ZM3 13h8v8H3v-8Zm10 0h8v8h-8v-8Z',
			desc: 'Selected work'
		},
		'#skills': {
			icon: 'M13 2 4 14h6l-1 8 9-12h-6l1-8Z',
			desc: 'Tools I use'
		},
		'#contact': {
			icon: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2Z',
			desc: 'Start a conversation'
		}
	};

	const channels = [
		{
			label: 'EMAIL',
			value: SITE.email,
			href: `mailto:${SITE.email}`,
			path: siGmail.path,
			external: false
		},
		{
			label: 'GITHUB',
			value: '@itsflaid',
			href: SITE.github,
			path: siGithub.path,
			external: true
		},
		{
			label: 'LINKEDIN',
			value: 'Muhammad Fadil',
			href: SITE.linkedin,
			path: linkedinPath,
			external: true
		},
		{
			label: 'INSTAGRAM',
			value: '@sebutsajamf',
			href: SITE.instagram,
			path: siInstagram.path,
			external: true
		}
	];

	function goSection(e: MouseEvent, href: string) {
		if (!href.startsWith('#')) return;
		e.preventDefault();
		if ($page.url.pathname !== '/') {
			goto(`/${href}`, { noScroll: true }).then(async () => {
				await tick();
				scrollToTarget(href);
			});
			return;
		}
		scrollToTarget(href);
	}

	let contactEl: HTMLElement;
	let darkEl: HTMLElement;
	let headingLine1El: HTMLElement;
	let headingLine2El: HTMLElement;
	let cursorEl: HTMLElement;
	let endingLine1El: HTMLElement;
	let endingLine2El: HTMLElement;
	let endingCursorEl: HTMLElement;
	let endingCreditsEl: HTMLElement;
	let endingBackEl: HTMLElement;
	let mobileEndingEl: HTMLElement;
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

		if (reduceMotion) {
			gsap.set(darkEl, { xPercent: 0, width: '100%' });
			gsap.set([headingLine1El, headingLine2El], { y: '0%', x: '0rem' });
			gsap.set(cursorEl, { opacity: 1 });
			gsap.set(lightContent, { opacity: 1, y: 0 });
			gsap.set(darkContent, { opacity: 1 });
			if (!isMobile) {
				gsap.set('.contact__ending', { display: 'none' });
				gsap.set(endingCursorEl, { opacity: 1 });
				gsap.set([endingLine1El, endingLine2El], { y: '0%', x: '0rem' });
				gsap.set([endingCreditsEl, endingBackEl], { opacity: 1, y: 0 });
			} else {
				gsap.set(mobileEndingCursorEl, { opacity: 1 });
				gsap.set([mobileEndingLine1El, mobileEndingLine2El], { y: '0%', x: '0rem' });
				gsap.set([mobileEndingCreditsEl, mobileEndingBackEl], {
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

		const mm = gsap.matchMedia();

		mm.add('(min-width: 861px)', () => {
			tl.fromTo(
				lightContent,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, stagger: 0.08, ease: 'power2.out' },
				0.1
			);

			const curtain = gsap.timeline({
				scrollTrigger: {
					trigger: contactEl,
					start: 'top top',
					end: 'bottom bottom',
					scrub: 1,
					invalidateOnRefresh: true
				}
			});

			curtain.fromTo(darkEl, { width: '50%' }, { width: '100%', ease: 'none' }, 0);
			curtain.to(lightContent, { opacity: 0, duration: 0.4, ease: 'power1.in' }, 0.2);

			const revealOut = [...darkContent, headingLine1El, headingLine2El];
			curtain.to(revealOut, { opacity: 0, y: -16, duration: 0.35, ease: 'power2.in' }, 0.4);
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

			return () => {
				curtain.scrollTrigger?.kill();
				curtain.kill();
			};
		});

		mm.add('(max-width: 860px)', () => {
			lightContent.forEach((el) => {
				const t = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: 'top 92%',
						toggleActions: 'restart reverse restart reverse'
					}
				});
				t.fromTo(
					el,
					{ opacity: 0, y: 24 },
					{ opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
				);
			});

			const mobileEndingTl = gsap.timeline({
				scrollTrigger: {
					trigger: mobileEndingEl,
					start: 'top 60%',
					toggleActions: 'restart reverse restart reverse'
				}
			});
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

			return () => {
				mobileEndingTl.scrollTrigger?.kill();
				mobileEndingTl.kill();
			};
		});

		return () => {
			tl.scrollTrigger?.kill();
			tl.kill();
			mm.revert();
		};
	});
</script>

<footer class="contact" id="contact" bind:this={contactEl}>
	<div class="contact__curtain" bind:this={curtainEl} aria-hidden="true"></div>
	<div class="contact__stage">
		<div class="contact__light">
			<span class="contact__mark contact__mark--light" aria-hidden="true">FLAID</span>

			<header class="contact__light-head" data-reveal-light>
				<p class="contact__light-lead">
					Have a problem<br />worth solving?
				</p>
				<p class="contact__light-sub">Let's talk — I'd love to hear about it.</p>
			</header>

			<div class="contact__light-grid">
				<nav class="contact__group" data-reveal-light aria-label="Menu">
					<span class="contact__group-label">EXPLORE</span>
					<ul class="contact__channel-list">
						{#each quickLinks as link}
							<li>
								<a
									class="contact__channel"
									href={link.href}
									data-sveltekit-reload={link.href.startsWith('#') ? undefined : ''}
									onclick={(e) => goSection(e, link.href)}
								>
									<span class="contact__channel-icon" aria-hidden="true">
										<svg viewBox="0 0 24 24">
											<path d={navMeta[link.href]?.icon} />
										</svg>
									</span>
									<span class="contact__channel-copy">
										<span class="contact__channel-label">{link.label}</span>
										<span class="contact__channel-value">{navMeta[link.href]?.desc}</span>
									</span>
									<svg class="contact__arrow" viewBox="0 0 24 24" aria-hidden="true">
										<path d="M7 17 17 7M8 7h9v9" />
									</svg>
								</a>
							</li>
						{/each}
					</ul>
				</nav>

				<div class="contact__group" data-reveal-light>
					<span class="contact__group-label">REACH ME</span>
					<ul class="contact__channel-list">
						{#each channels as channel}
							<li>
								<a
									class="contact__channel"
									href={channel.href}
									target={channel.external ? '_blank' : undefined}
									rel={channel.external ? 'noopener noreferrer' : undefined}
								>
									<span class="contact__channel-icon" aria-hidden="true">
										<svg viewBox="0 0 24 24"><path d={channel.path} /></svg>
									</span>
									<span class="contact__channel-copy">
										<span class="contact__channel-label">{channel.label}</span>
										<span class="contact__channel-value">{channel.value}</span>
									</span>
									<svg class="contact__arrow" viewBox="0 0 24 24" aria-hidden="true">
										<path d="M7 17 17 7M8 7h9v9" />
									</svg>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="contact__copy" data-reveal-light>
				<span>© {year} MUHAMMAD FADIL — FLAID</span>
				<span>KUTAI KARTANEGARA, ID</span>
			</div>
		</div>

		<div class="contact__dark" bind:this={darkEl}>
			<span class="contact__dots" aria-hidden="true">
				{#each dots as _}<i></i>{/each}
			</span>
			<span class="contact__mark contact__mark--dark" aria-hidden="true">FLAID</span>

			<div class="contact__dark-content">
				<span class="contact__dark-status" data-reveal>
					<i aria-hidden="true"></i>
					AVAILABLE FOR NEW PROJECTS
				</span>
				<h2 class="contact__heading">
					<span class="line-mask"><span class="line" bind:this={headingLine1El}>LETS</span></span>
					<span class="line-mask"
						><span class="line" bind:this={headingLine2El}
							>CONNECT<span class="cursor" bind:this={cursorEl}>_</span></span
						></span
					>
				</h2>
				<a class="contact__cta" href="mailto:{SITE.email}" data-reveal>
					<span class="contact__cta-icon" aria-hidden="true">
						<svg viewBox="0 0 24 24"><path d={siGmail.path} /></svg>
					</span>
					<span class="contact__cta-copy">
						<span class="contact__cta-label">EMAIL ME</span>
						<span class="contact__cta-value">{SITE.email}</span>
					</span>
					<svg class="contact__cta-arrow" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M7 17 17 7M8 7h9v9" />
					</svg>
				</a>
			</div>

			<div class="contact__ending">
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
		height: 280vh;
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
		gap: clamp(1.5rem, 3.5vh, 2.5rem);
		padding: clamp(1.75rem, 4vh, 2.75rem) clamp(1.75rem, 4vw, 3.5rem);
		overflow: hidden;
	}
	.contact__light::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: radial-gradient(rgba(10, 10, 10, 0.16) 0.7px, transparent 0.7px);
		background-size: 22px 22px;
		opacity: 0.35;
		pointer-events: none;
		-webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 72%);
		mask-image: linear-gradient(to bottom, #000 0%, transparent 72%);
	}
	.contact__light-head {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: clamp(0.8rem, 1.8vh, 1.15rem);
		max-width: 32rem;
		margin-top: clamp(1.5rem, 6vh, 4rem);
		opacity: 0;
	}
	.contact__light-lead {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: clamp(2.2rem, 3.7vw, 3.4rem);
		line-height: 0.92;
		letter-spacing: 0.01em;
		text-transform: uppercase;
	}
	.contact__light-sub {
		margin: 0;
		max-width: 24rem;
		font-family: var(--ff-body);
		font-size: clamp(0.9rem, 1.2vw, 1rem);
		line-height: 1.5;
		color: var(--gray);
	}
	.contact__light-grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
		gap: clamp(1.5rem, 3vw, 2.5rem);
		align-items: start;
		margin: auto 0;
	}
	.contact__group {
		min-width: 0;
		opacity: 0;
	}
	.contact__group-label {
		display: block;
		font-family: var(--ff-mono);
		font-size: 0.6rem;
		letter-spacing: 0.12em;
		color: var(--gray);
		margin-bottom: 0.7rem;
		padding-bottom: 0.55rem;
		border-bottom: 1px solid rgba(10, 10, 10, 0.16);
	}
	.contact__arrow {
		flex: 0 0 auto;
		width: 12px;
		height: 12px;
		margin-left: auto;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		opacity: 0;
		transform: translate(-4px, 4px);
		transition: opacity 0.2s ease, transform 0.25s ease;
	}
	.contact__channel-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.contact__channel {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0.5rem 0.6rem;
		color: var(--black);
		transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
	}
	.contact__channel:hover {
		background: var(--black);
		color: var(--fg-dark);
		transform: translateY(-1px);
	}
	.contact__channel-icon {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 2rem;
		height: 2rem;
		border: 1px solid rgba(10, 10, 10, 0.18);
		transition: border-color 0.25s ease;
	}
	.contact__channel:hover .contact__channel-icon {
		border-color: rgba(241, 241, 239, 0.25);
	}
	.contact__channel-icon svg {
		width: 14px;
		height: 14px;
		fill: currentColor;
	}
	.contact__channel-copy {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		min-width: 0;
	}
	.contact__channel-label {
		font-family: var(--ff-mono);
		font-size: 0.53rem;
		letter-spacing: 0.1em;
		color: var(--gray);
		transition: color 0.25s ease;
	}
	.contact__channel-value {
		font-family: var(--ff-body);
		font-size: 0.78rem;
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.contact__channel:hover .contact__channel-label {
		color: var(--gray-light);
	}
	.contact__channel .contact__arrow {
		opacity: 0;
	}
	.contact__channel:hover .contact__arrow {
		opacity: 1;
		transform: translate(0, 0);
	}
	.contact__copy {
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-top: clamp(0.9rem, 2vh, 1.2rem);
		border-top: 1px solid rgba(10, 10, 10, 0.14);
		font-family: var(--ff-mono);
		font-size: 0.58rem;
		letter-spacing: 0.05em;
		color: var(--gray);
		opacity: 0;
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
		gap: clamp(0.9rem, 2vh, 1.35rem);
		width: min(100%, 28rem);
	}
	.contact__dark-status {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--ff-mono);
		font-size: 0.56rem;
		letter-spacing: 0.1em;
		color: var(--gray-light);
	}
	.contact__dark-status i {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--fg-dark);
		animation: contact-pulse 2.4s ease-in-out infinite;
	}
	.contact__heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.88;
		letter-spacing: 0.005em;
		font-size: clamp(3.6rem, 8.5vw, 8rem);
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
		display: flex;
		align-items: center;
		gap: 0.7rem;
		width: 100%;
		padding: 0.7rem 0.8rem;
		border: 1px solid rgba(241, 241, 239, 0.22);
		font-family: var(--ff-mono);
		color: var(--fg-dark);
		opacity: 0;
		transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease,
			transform 0.25s ease;
	}
	.contact__cta:hover {
		background: var(--fg-dark);
		color: var(--black);
		border-color: var(--fg-dark);
		transform: translateY(-2px);
	}
	.contact__cta-icon {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 2rem;
		height: 2rem;
		border: 1px solid rgba(241, 241, 239, 0.22);
		transition: border-color 0.25s ease;
	}
	.contact__cta:hover .contact__cta-icon {
		border-color: rgba(10, 10, 10, 0.25);
	}
	.contact__cta-icon svg {
		width: 14px;
		height: 14px;
		fill: currentColor;
	}
	.contact__cta-copy {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		min-width: 0;
	}
	.contact__cta-label {
		font-size: 0.52rem;
		letter-spacing: 0.1em;
		color: var(--gray);
		transition: color 0.25s ease;
	}
	.contact__cta:hover .contact__cta-label {
		color: var(--ink-soft);
	}
	.contact__cta-value {
		font-family: var(--ff-body);
		font-size: 0.8rem;
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.contact__cta-arrow {
		flex: 0 0 auto;
		width: 14px;
		height: 14px;
		margin-left: auto;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
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
	@keyframes contact-pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50% { opacity: 0.45; transform: scale(0.75); }
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
			position: relative;
			inset: auto;
			width: 100%;
			height: auto;
			min-height: 60vh;
			padding: clamp(3rem, 10vh, 4.5rem) clamp(1.5rem, 6vw, 2.5rem);
		}
		.contact__light {
			grid-column: 1;
			margin-top: 0;
			min-height: auto;
			padding: clamp(2rem, 8vh, 3.5rem) clamp(1.5rem, 6vw, 3rem);
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			gap: clamp(1.75rem, 4vh, 2.5rem);
		}
		.contact__light-head {
			margin-top: 0;
		}
		.contact__light-grid {
			grid-template-columns: 1fr;
			gap: clamp(1.5rem, 4vh, 2rem);
			margin: 0;
		}
		.contact__copy {
			text-align: left;
			flex-wrap: wrap;
		}
		.contact__ending {
			display: none;
		}
		.contact__ending-mobile {
			position: relative;
			min-height: 100vh;
			min-height: 100svh;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
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
		.contact__dark-status i {
			animation: none;
		}
		.contact__dots i {
			animation: none;
			opacity: 0.2;
		}
	}
</style>