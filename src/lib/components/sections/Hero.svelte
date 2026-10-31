<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { scrollToTarget } from '$lib/scroll';
	import { openResumeModal } from '$lib/resume';

	const line1 = 'MUHAMMAD'.split('');
	const line2 = 'FADIL'.split('');

	let frameEl: HTMLElement;
	let nameEl: HTMLElement;
	let metaEls: HTMLElement[] = [];
	let time = '';

	function goProjects(e: MouseEvent) {
		e.preventDefault();
		scrollToTarget('#projects');
	}

	function tick() {
		time = new Intl.DateTimeFormat('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: 'Asia/Makassar'
		}).format(new Date());
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		tick();
		const clock = setInterval(tick, 20000);

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion) {
			return () => clearInterval(clock);
		}

		const ctx = gsap.context(() => {
			const chars = nameEl.querySelectorAll<HTMLElement>('.hero__char');

			// Entrance: satu momen — huruf naik dari balik mask, lalu meta masuk.
			gsap
				.timeline({ defaults: { ease: 'power4.out' } })
				.fromTo(chars, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.045 }, 0.1)
				.fromTo(
					metaEls,
					{ opacity: 0, y: 12 },
					{ opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out' },
					0.7
				);

			// Momentum: saat di-scroll, dua baris nama bergeser berlawanan arah,
			// konten pinggir memudar. Hero tetap di-pin sehingga About menimpanya.
			const scrub = {
				trigger: frameEl,
				start: 'top top',
				end: 'bottom top',
				scrub: 0.8
			};
			gsap.to('.hero__line--1', { xPercent: -9, ease: 'none', scrollTrigger: scrub });
			gsap.to('.hero__line--2', { xPercent: 9, ease: 'none', scrollTrigger: scrub });
			gsap.to('.hero__bar, .hero__foot', { opacity: 0, ease: 'none', scrollTrigger: scrub });

			ScrollTrigger.create({
				trigger: frameEl,
				start: 'top top',
				end: 'bottom top',
				pin: true,
				pinSpacing: false
			});
		}, frameEl);

		return () => {
			clearInterval(clock);
			ctx.revert();
		};
	});
</script>

<div class="hero-frame" bind:this={frameEl}>
	<section class="hero" id="top">
		<div class="hero__bar">
			<span bind:this={metaEls[0]}>FLAID® — PORTFOLIO {new Date().getFullYear()}</span>
			<span class="hero__bar-mid" bind:this={metaEls[1]}>FULLSTACK DEVELOPER</span>
			<span bind:this={metaEls[2]}>SAMARINDA · {time || '--:--'} WITA</span>
		</div>

		<h1 class="hero__name" bind:this={nameEl} aria-label="Muhammad Fadil">
			<span class="hero__line hero__line--1" aria-hidden="true">
				{#each line1 as c}<span class="hero__mask"><span class="hero__char">{c}</span></span>{/each}
			</span>
			<span class="hero__line hero__line--2" aria-hidden="true">
				{#each line2 as c}<span class="hero__mask"><span class="hero__char">{c}</span></span>{/each}
			</span>
		</h1>

		<div class="hero__foot">
			<p class="hero__sub" bind:this={metaEls[3]}>
				I build full-stack web applications from idea to deployment, combining design,
				engineering, and AI-assisted development.
			</p>

			<div class="hero__side" bind:this={metaEls[4]}>
				<span class="hero__status"><i aria-hidden="true"></i>OPEN FOR FREELANCE</span>
				<nav class="hero__cta" aria-label="Quick actions">
					<button type="button" class="hero__cta-item" onclick={openResumeModal} data-cursor-text="OPEN">
						<span class="hero__cta-label">RESUME</span>
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
					</button>
					<a class="hero__cta-item" href="#projects" onclick={goProjects} data-cursor-text="SCROLL">
						<span class="hero__cta-label">THE PROJECTS</span>
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v14m0 0-5-5m5 5 5-5" /></svg>
					</a>
				</nav>
			</div>
		</div>
	</section>
</div>

<style>
	.hero-frame {
		position: relative;
		height: 100vh;
		height: 100svh;
	}
	.hero {
		position: relative;
		z-index: 1;
		height: 100%;
		overflow: hidden;
		display: grid;
		grid-template-rows: auto 1fr auto;
		padding: clamp(4.75rem, 8vw, 5.5rem) clamp(1.1rem, 2.6vw, 2.25rem) clamp(1.1rem, 2.6vw, 2.25rem);
		background: var(--white);
		color: var(--black);
	}

	.hero__bar {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: 0.9rem;
		border-bottom: 1px solid rgba(10, 10, 10, 0.18);
		font-family: var(--ff-mono);
		font-size: clamp(0.62rem, 0.9vw, 0.74rem);
		letter-spacing: 0.08em;
		color: var(--black);
	}
	.hero__bar span:last-child {
		text-align: right;
	}

	.hero__name {
		align-self: center;
		margin: 0;
		display: flex;
		flex-direction: column;
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: min(23.5vw, 38vh);
		line-height: 0.82;
		letter-spacing: 0.005em;
		text-transform: uppercase;
	}
	.hero__line {
		display: flex;
		will-change: transform;
	}
	.hero__line--2 {
		align-self: flex-end;
	}
	.hero__mask {
		display: inline-block;
		overflow: hidden;
		padding-top: 0.04em;
	}
	.hero__char {
		display: inline-block;
		will-change: transform;
	}

	.hero__foot {
		display: grid;
		grid-template-columns: minmax(0, 26rem) auto;
		justify-content: space-between;
		align-items: end;
		gap: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(10, 10, 10, 0.18);
	}
	.hero__sub {
		margin: 0;
		font-family: var(--ff-body);
		font-size: clamp(0.9rem, 1.15vw, 1.05rem);
		line-height: 1.5;
		color: var(--ink-soft);
	}
	.hero__side {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.85rem;
	}
	.hero__status {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
	}
	.hero__status i {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #1f9d55;
		animation: pulse 2s ease-in-out infinite;
	}
	.hero__cta {
		display: flex;
		gap: clamp(1rem, 2.4vw, 1.75rem);
	}
	.hero__cta-item {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: 0;
		padding: 0;
		font-family: var(--ff-mono);
		font-size: 0.76rem;
		letter-spacing: 0.08em;
		color: var(--black);
		text-decoration: none;
		cursor: pointer;
	}
	.hero__cta-label {
		position: relative;
	}
	.hero__cta-label::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -3px;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.3s ease;
	}
	.hero__cta-item:hover .hero__cta-label::after {
		transform: scaleX(1);
		transform-origin: left;
	}
	.hero__cta-item svg {
		width: 12px;
		height: 12px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.35; }
	}

	@media (max-width: 768px) {
		.hero__bar-mid {
			display: none;
		}
		.hero__name {
			font-size: min(24vw, 26vh);
		}
		.hero__foot {
			grid-template-columns: 1fr;
			gap: 1.1rem;
		}
		.hero__side {
			align-items: flex-start;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero__status i {
			animation: none;
		}
	}
</style>
