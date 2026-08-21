<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let aboutEl: HTMLElement;
	let eyebrowEl: HTMLElement;
	let headlineEl: HTMLElement;
	let line1El: HTMLElement;
	let line2El: HTMLElement;
	let cursorEl: HTMLElement;
	let dividerEl: HTMLElement;
	let bodyEl: HTMLElement;
	let bioEl: HTMLElement;
	let factsEl: HTMLElement;

	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const rows = gsap.utils.toArray<HTMLElement>(factsEl.querySelectorAll('.facts__row'));
		const rules = gsap.utils.toArray<HTMLElement>(factsEl.querySelectorAll('.facts__rule'));

		const bioText = bioEl.textContent?.trim() ?? '';
		bioEl.textContent = '';
		[...bioText].forEach((char) => {
			const span = document.createElement('span');
			span.textContent = char;
			span.style.color = '#5a5a5a';
			bioEl.appendChild(span);
		});
		const bioChars = gsap.utils.toArray<HTMLElement>(bioEl.querySelectorAll('span'));

		let killTimeline: (() => void) | null = null;

		if (reduceMotion) {
			gsap.set(eyebrowEl, { opacity: 1 });
			gsap.set([line1El, line2El], { y: '0%', x: '0rem' });
			gsap.set(cursorEl, { opacity: 1 });
			gsap.set(dividerEl, { scaleY: 1, opacity: 1 });
			gsap.set(bioEl, { opacity: 1, y: 0 });
			gsap.set(bioChars, { color: '#f1f1ef' });
			gsap.set(rows, { opacity: 1, y: 0 });
			gsap.set(rules, { scaleX: 1 });
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

			tl.fromTo(eyebrowEl, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);

			tl.fromTo(
				line1El,
				{ y: '105%', x: '-1.4rem' },
				{ y: '0%', x: '0rem', duration: 1.1, ease: 'power3.out' },
				0.05
			);
			tl.fromTo(
				line2El,
				{ y: '105%', x: '1.4rem' },
				{ y: '0%', x: '0rem', duration: 1.1, ease: 'power3.out' },
				0.2
			);
			tl.to(cursorEl, { opacity: 1, duration: 0.25 }, 1.05);

			tl.fromTo(dividerEl, { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: 'power2.inOut' }, 1.0);

			tl.to(bioEl, { opacity: 1, duration: 0.4, ease: 'power1.out' }, 1.25);
			tl.to(bioChars, { color: '#f1f1ef', duration: 0.3, ease: 'none', stagger: 0.02 }, 1.5);

			tl.fromTo(
				rows,
				{ opacity: 0, y: 16 },
				{ opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.14 },
				'>+=0.2'
			);
			tl.fromTo(
				rules,
				{ scaleX: 0 },
				{ scaleX: 1, duration: 0.5, ease: 'power2.out', stagger: 0.14 },
				'>+=0.2'
			);

			tl.to(
				headlineEl,
				{ y: '-22vh', opacity: 0.75, duration: 1.3, ease: 'power1.inOut' },
				'+=0.5'
			);
			tl.to(bodyEl, { y: '-30vh', opacity: 0, duration: 1.3, ease: 'power1.inOut' }, '<0.1');
			tl.to(dividerEl, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, '<');

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

<section class="about" id="about" bind:this={aboutEl}>
	<span class="about__mark" aria-hidden="true">ITSFLAID</span>
	<span class="about__dots" aria-hidden="true">
		{#each dots as _}<i></i>{/each}
	</span>
	<span class="about__dots about__dots--bl" aria-hidden="true">
		{#each dots as _}<i></i>{/each}
	</span>
	<span class="about__spin" aria-hidden="true"></span>

	<div class="stage">
		<div class="content">
			<div class="headline" bind:this={headlineEl}>
				<span class="eyebrow" bind:this={eyebrowEl}>// ABOUT</span>
				<h2 class="heading">
					<span class="line-mask"><span class="line" bind:this={line1El}>ME, BEHIND</span></span>
					<span class="line-mask"
						><span class="line" bind:this={line2El}
							>THE CODE<span class="cursor" bind:this={cursorEl}>_</span></span
						></span
					>
				</h2>
			</div>

			<span class="divider" bind:this={dividerEl} aria-hidden="true"></span>

			<div class="body" bind:this={bodyEl}>
				<p class="bio" bind:this={bioEl}>
					I'm an otodidakers developer, building web applications from real-world problems and ideas I personally encounter. I enjoy turning those ideas into useful, practical products that I can actually use myself.
				</p>

				<dl class="facts" bind:this={factsEl}>
					<div class="facts__row">
						<span class="facts__rule" aria-hidden="true"></span>
						<dt>LOCATION</dt>
						<dd>Kutai Kartanegara, East Kalimantan</dd>
					</div>
					<div class="facts__row">
						<span class="facts__rule" aria-hidden="true"></span>
						<dt>FOCUS</dt>
						<dd>Fullstack Dev · AI-Assisted Tooling</dd>
					</div>
					<div class="facts__row">
						<span class="facts__rule" aria-hidden="true"></span>
						<dt>STATUS</dt>
						<dd>Inform Systems Student · 5th Semester</dd>
					</div>
					<div class="facts__row">
						<span class="facts__rule" aria-hidden="true"></span>
						<dt>Experience</dt>
						<dd>Self-Taught since late 2024</dd>
					</div>
				</dl>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		height: 200vh;
		position: relative;
		background: var(--black);
		z-index: 2;
	}

	.about__mark {
		position: absolute;
		bottom: -2.5vw;
		right: -0.5vw;
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.01em;
		font-size: clamp(4rem, 11vw, 9rem);
		color: var(--fg-dark);
		opacity: 0.05;
		white-space: nowrap;
		z-index: 0;
		user-select: none;
		pointer-events: none;
	}
	.about__dots {
		position: absolute;
		top: clamp(1.5rem, 4vw, 3rem);
		left: clamp(1.5rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		z-index: 0;
		pointer-events: none;
	}
	.about__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--fg-dark);
		font-style: normal;
		opacity: 0.08;
		animation: about-dot-blink 3s ease-in-out infinite;
	}
	.about__dots i:nth-child(2) {
		animation-delay: 0.3s;
	}
	.about__dots i:nth-child(3) {
		animation-delay: 0.6s;
	}
	.about__dots i:nth-child(4) {
		animation-delay: 0.9s;
	}
	.about__dots i:nth-child(5) {
		animation-delay: 1.2s;
	}
	.about__dots i:nth-child(6) {
		animation-delay: 1.5s;
	}
	.about__dots i:nth-child(7) {
		animation-delay: 1.8s;
	}
	.about__dots i:nth-child(8) {
		animation-delay: 2.1s;
	}
	.about__dots i:nth-child(9) {
		animation-delay: 2.4s;
	}
	.about__dots--bl {
		top: auto;
		right: auto;
		bottom: clamp(1.5rem, 4vw, 3rem);
		left: clamp(1.5rem, 4vw, 3rem);
	}
	.about__spin {
		position: absolute;
		top: clamp(1.5rem, 4vw, 3rem);
		right: clamp(1.5rem, 4vw, 3rem);
		width: 26px;
		height: 26px;
		z-index: 0;
		pointer-events: none;
		opacity: 0.3;
		animation: about-spin 10s linear infinite;
	}
	.about__spin::before,
	.about__spin::after {
		content: '';
		position: absolute;
		background: var(--fg-dark);
	}
	.about__spin::before {
		left: 50%;
		top: 0;
		bottom: 0;
		width: 1px;
		transform: translateX(-50%);
	}
	.about__spin::after {
		top: 50%;
		left: 0;
		right: 0;
		height: 1px;
		transform: translateY(-50%);
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
		display: grid;
		grid-template-columns: 1.15fr 1px 1fr;
		align-items: center;
		gap: clamp(2rem, 5vw, 4.5rem);
		width: 100%;
		max-width: 76rem;
		padding: 0 clamp(1.5rem, 6vw, 4rem);
	}

	.headline {
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2.5vh, 1.5rem);
		will-change: transform;
	}
	.eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		opacity: 0;
	}
	.heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.01em;
		font-size: clamp(2.4rem, 6.5vw, 7.25rem);
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
		animation: about-blink 1s step-end infinite;
	}

	.divider {
		align-self: stretch;
		width: 1px;
		background: rgba(241, 241, 239, 0.16);
		transform: scaleY(0);
		transform-origin: top;
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: clamp(1.75rem, 4vh, 2.75rem);
		will-change: transform;
	}
	.bio {
		margin: 0;
		max-width: 34rem;
		font-family: var(--ff-body);
		font-weight: 500;
		font-size: clamp(1.05rem, 1.7vw, 1.35rem);
		line-height: 1.6;
		color: var(--fg-dark);
		opacity: 0;
	}
	.facts {
		margin: 0;
		display: flex;
		flex-direction: column;
	}
	.facts__row {
		position: relative;
		display: flex;
		align-items: baseline;
		gap: clamp(1rem, 2vw, 1.75rem);
		padding: clamp(0.75rem, 1.8vh, 1.1rem) 0;
		opacity: 0;
	}
	.facts__rule {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: rgba(241, 241, 239, 0.16);
		transform: scaleX(0);
		transform-origin: left;
	}
	.facts__row dt {
		flex: 0 0 auto;
		width: clamp(5.5rem, 9vw, 7rem);
		margin: 0;
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.facts__row dd {
		margin: 0;
		font-family: var(--ff-body);
		font-size: clamp(0.92rem, 1.15vw, 1.05rem);
		color: var(--fg-dark);
		opacity: 0.9;
	}

	@keyframes about-blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
	@keyframes about-dot-blink {
		0%,
		100% {
			opacity: 0.08;
		}
		50% {
			opacity: 0.34;
		}
	}
	@keyframes about-spin {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 860px) {
		.content {
			grid-template-columns: 1fr;
			row-gap: clamp(2rem, 5vh, 3rem);
		}
		.divider {
			display: none;
		}
		.body {
			gap: clamp(1.5rem, 4vh, 2rem);
		}
	}
	@media (max-width: 700px) {
		.heading {
			font-size: clamp(2.1rem, 11vw, 3.2rem);
		}
		.bio {
			max-width: none;
			font-size: clamp(0.98rem, 4vw, 1.1rem);
		}
		.facts {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: 1.25rem;
		}
		.facts__row {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.3rem;
			padding: clamp(0.6rem, 2vh, 0.85rem) 0;
		}
		.facts__row dt {
			width: auto;
		}
		.about__mark {
			font-size: clamp(3rem, 20vw, 5rem);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
			opacity: 1;
		}
		.about__dots i {
			animation: none;
			opacity: 0.2;
		}
		.about__spin {
			animation: none;
		}
	}
</style>