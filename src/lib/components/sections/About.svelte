<script lang="ts">
	import { reveal } from '$lib/reveal';

	const facts = [
		{ k: 'LOCATION', v: 'Kutai Kartanegara, East Kalimantan' },
		{ k: 'MAIN STACK', v: 'TypeScript · Next.js · PostgreSQL' },
		{ k: 'STATUS', v: 'Inform Systems Student · 5th Semester' },
		{ k: 'EXPERIENCE', v: 'Self-Taught since late 2024' }
	];
</script>

<section class="about" id="about">
	<div class="about__inner">
		<header class="about__head" use:reveal>
			<span class="about__idx">01 // ABOUT</span>
			<h2 class="about__title">
				ME, BEHIND<br />THE CODE<span class="about__cursor" aria-hidden="true">_</span>
			</h2>
		</header>

		<div class="about__body">
			<p class="about__bio" use:reveal={{ delay: 0.05 }}>
				I'm an otodidakers developer, building web applications from real-world problems and
				ideas I personally encounter. I enjoy turning those ideas into useful, practical products
				that I can actually use myself.
			</p>

			<dl class="about__facts">
				{#each facts as f, i}
					<div class="about__fact" use:reveal={{ delay: 0.06 * i }}>
						<dt>{f.k}</dt>
						<dd>{f.v}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<style>
	.about {
		position: relative;
		z-index: 2;
		background: var(--black);
		color: var(--fg-dark);
		padding: clamp(5rem, 12vw, 10rem) clamp(1.1rem, 2.6vw, 2.25rem);
	}
	.about__inner {
		max-width: 96rem;
		margin: 0 auto;
		display: grid;
		gap: clamp(3rem, 7vw, 6rem);
	}
	.about__idx {
		display: block;
		margin-bottom: 1.5rem;
		font-family: var(--ff-mono);
		font-size: 0.74rem;
		letter-spacing: 0.1em;
		color: var(--gray);
	}
	.about__title {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: clamp(4.2rem, 15vw, 14rem);
		line-height: 0.86;
		letter-spacing: 0.005em;
	}
	.about__cursor {
		animation: blink 1.1s steps(1) infinite;
	}

	.about__body {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: clamp(2rem, 4vw, 3.5rem) clamp(1rem, 2vw, 2rem);
	}
	.about__bio {
		grid-column: 5 / -1;
		margin: 0;
		font-family: var(--ff-body);
		font-weight: 500;
		font-size: clamp(1.35rem, 2.7vw, 2.5rem);
		line-height: 1.28;
		letter-spacing: -0.01em;
		color: var(--fg-dark);
		text-wrap: pretty;
	}
	.about__facts {
		grid-column: 1 / -1;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0 clamp(1rem, 2vw, 2rem);
	}
	.about__fact {
		padding-top: 1rem;
		border-top: 1px solid rgba(241, 241, 239, 0.22);
	}
	.about__fact dt {
		font-family: var(--ff-mono);
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		color: var(--gray);
		margin-bottom: 0.6rem;
	}
	.about__fact dd {
		margin: 0;
		font-family: var(--ff-body);
		font-size: clamp(0.92rem, 1.2vw, 1.05rem);
		line-height: 1.45;
		color: var(--fg-dark);
	}

	@keyframes blink {
		50% { opacity: 0; }
	}

	@media (max-width: 900px) {
		.about__bio {
			grid-column: 1 / -1;
		}
		.about__facts {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			row-gap: 1.75rem;
		}
	}
	@media (max-width: 520px) {
		.about__facts {
			grid-template-columns: 1fr;
			row-gap: 1.25rem;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.about__cursor {
			animation: none;
		}
	}
</style>
