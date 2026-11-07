<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { reveal } from '$lib/reveal';

	const facts = [
		{ k: 'LOCATION', v: 'Kutai Kartanegara, East Kalimantan' },
		{ k: 'MAIN STACK', v: 'TypeScript · Next.js · PostgreSQL' },
		{ k: 'STATUS', v: 'Inform Systems Student · 5th Semester' },
		{ k: 'EXPERIENCE', v: 'Self-Taught since late 2024' }
	];

	let line1El: HTMLElement;
	let line2El: HTMLElement;

	onMount(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion) return;

		gsap.registerPlugin(ScrollTrigger);

		const lines = [line1El, line2El];
		const headEl = line1El.closest('.about__head') as HTMLElement;
		gsap.set(lines, { yPercent: 110 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: headEl,
				start: 'top 85%',
				end: 'bottom 30%',
				toggleActions: 'play reverse play reverse'
			}
		});

		tl.to(lines, { yPercent: 0, duration: 0.9, stagger: 0.14, ease: 'power4.out' });

		return () => {
			tl.scrollTrigger?.kill();
			tl.kill();
		};
	});
</script>

<section class="about" id="about">
	<div class="about__inner">
		<div class="about__masthead">
			<header class="about__head">
				<h2 class="about__title">
					<span class="about__line-mask">
						<span class="about__line" bind:this={line1El}>ME, BEHIND</span>
					</span>
					<span class="about__line-mask">
						<span class="about__line about__line--outline" bind:this={line2El}
							>THE CODE<span class="about__cursor" aria-hidden="true">_</span></span
						>
					</span>
				</h2>
			</header>

			<div class="about__intro" use:reveal={{ delay: 0.1 }}>
				<p class="about__bio">
					I'm an otodidakers developer, building web applications from real-world problems and
					ideas I personally encounter.
				</p>
				<p class="about__bio about__bio--muted">
					I enjoy turning those ideas into useful, practical products that I can actually use
					myself.
				</p>
			</div>
		</div>

		<dl class="about__facts">
			{#each facts as f, i}
				<div class="about__fact" use:reveal={{ delay: 0.06 * i }}>
					<dt><span class="about__fact-index" aria-hidden="true">0{i + 1}</span>{f.k}</dt>
					<dd>{f.v}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<style>
	.about {
		position: relative;
		z-index: 2;
		overflow: hidden;
		background: var(--black);
		color: var(--fg-dark);
		padding: clamp(5rem, 11vw, 9rem) clamp(1.1rem, 2.6vw, 2.25rem);
	}
	.about__inner {
		max-width: 96rem;
		margin: 0 auto;
		display: grid;
		gap: clamp(3rem, 7vw, 6rem);
	}
	.about__masthead {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		align-items: end;
		gap: clamp(2rem, 4vw, 3.5rem) clamp(1rem, 2vw, 2rem);
	}
	.about__head {
		grid-column: 1 / 8;
	}
	.about__title {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: clamp(4rem, 9.5vw, 9.5rem);
		line-height: 0.84;
		letter-spacing: 0.005em;
		text-transform: uppercase;
	}
	.about__line-mask {
		display: block;
		overflow: hidden;
	}
	.about__line {
		display: block;
		will-change: transform;
	}
	.about__line--outline {
		padding-left: clamp(1rem, 4vw, 3.5rem);
		color: transparent;
		-webkit-text-stroke: clamp(1px, 0.09vw, 1.5px) rgba(241, 241, 239, 0.8);
	}
	.about__cursor {
		color: var(--fg-dark);
		-webkit-text-stroke: 0;
		animation: blink 1.1s steps(1) infinite;
	}
	.about__intro {
		grid-column: 8 / -1;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 0 0 0.35rem clamp(1rem, 1.5vw, 1.4rem);
		border-left: 1px solid rgba(241, 241, 239, 0.22);
	}
	.about__bio {
		margin: 0;
		font-family: var(--ff-body);
		font-weight: 500;
		font-size: clamp(1.05rem, 1.25vw, 1.3rem);
		line-height: 1.6;
		letter-spacing: -0.005em;
		color: var(--fg-dark);
		text-wrap: pretty;
	}
	.about__bio--muted {
		color: rgba(241, 241, 239, 0.62);
	}
	.about__facts {
		margin: 0;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1.75rem clamp(1rem, 2vw, 2rem);
		padding-top: clamp(1.1rem, 2vw, 1.5rem);
		border-top: 1px solid rgba(241, 241, 239, 0.18);
	}
	.about__fact {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}
	.about__fact dt {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		font-family: var(--ff-mono);
		font-size: 0.62rem;
		letter-spacing: 0.1em;
		color: var(--gray);
	}
	.about__fact-index {
		font-size: 0.56rem;
		letter-spacing: 0.06em;
		color: rgba(241, 241, 239, 0.35);
	}
	.about__fact dd {
		margin: 0;
		font-family: var(--ff-body);
		font-size: clamp(0.9rem, 1.1vw, 1rem);
		line-height: 1.45;
		color: var(--fg-dark);
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	@media (max-width: 860px) {
		.about__masthead {
			grid-template-columns: 1fr;
			align-items: start;
			gap: 2rem;
		}
		.about__head,
		.about__intro {
			grid-column: 1;
		}
		.about__intro {
			max-width: 34rem;
		}
		.about__facts {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 520px) {
		.about__line--outline {
			padding-left: 0.75rem;
		}
		.about__facts {
			grid-template-columns: 1fr;
			row-gap: 1.25rem;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.about__line {
			transform: none;
		}
		.about__cursor {
			animation: none;
		}
	}
</style>
