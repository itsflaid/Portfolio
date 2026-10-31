<script lang="ts">
	import { entries } from '$lib/data/experience';
	import { reveal } from '$lib/reveal';
</script>

<section class="xp" id="experience">
	<div class="xp__inner">
		<header class="xp__head" use:reveal>
			<span class="xp__idx">02 // BACKGROUND</span>
			<h2 class="xp__title">EXPERIENCE<br />&amp; EDUCATION</h2>
		</header>

		<ol class="xp__list">
			{#each entries as e, i (e.title)}
				<li class="xp__row" use:reveal={{ delay: 0.04 * i }}>
					<span class="xp__date">{e.date}</span>
					<span class="xp__type">{e.type}</span>
					<div class="xp__main">
						<h3>{e.title}</h3>
						<span class="xp__org">{e.org}</span>
					</div>
					<p class="xp__desc">{e.desc}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.xp {
		position: relative;
		z-index: 2;
		background: var(--white);
		color: var(--black);
		padding: clamp(5rem, 12vw, 10rem) clamp(1.1rem, 2.6vw, 2.25rem);
	}
	.xp__inner {
		max-width: 96rem;
		margin: 0 auto;
	}
	.xp__idx {
		display: block;
		margin-bottom: 1.5rem;
		font-family: var(--ff-mono);
		font-size: 0.74rem;
		letter-spacing: 0.1em;
		color: var(--gray);
	}
	.xp__title {
		margin: 0 0 clamp(3rem, 7vw, 6rem);
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: clamp(3.6rem, 11vw, 10rem);
		line-height: 0.88;
	}

	.xp__list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--black);
	}
	.xp__row {
		display: grid;
		grid-template-columns: 11rem 7.5rem minmax(0, 1.4fr) minmax(0, 1fr);
		gap: 1rem clamp(1rem, 2.2vw, 2rem);
		align-items: baseline;
		padding: clamp(1.4rem, 2.6vw, 2.2rem) clamp(0.5rem, 1vw, 1rem);
		border-bottom: 1px solid rgba(10, 10, 10, 0.2);
		transition: background 0.3s ease, color 0.3s ease;
	}
	.xp__row:hover {
		background: var(--black);
		color: var(--fg-dark);
	}
	.xp__date,
	.xp__type {
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
	}
	.xp__type {
		color: var(--gray);
	}
	.xp__main h3 {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: clamp(1.7rem, 3.2vw, 2.9rem);
		line-height: 1;
		text-transform: uppercase;
	}
	.xp__org {
		display: block;
		margin-top: 0.5rem;
		font-family: var(--ff-body);
		font-size: 0.92rem;
		color: var(--gray);
	}
	.xp__desc {
		margin: 0;
		font-family: var(--ff-body);
		font-size: 0.95rem;
		line-height: 1.5;
		color: inherit;
		opacity: 0.8;
	}

	@media (max-width: 960px) {
		.xp__row {
			grid-template-columns: 1fr 1fr;
		}
		.xp__main,
		.xp__desc {
			grid-column: 1 / -1;
		}
		.xp__type {
			text-align: right;
		}
	}
	@media (hover: none) {
		.xp__row:hover {
			background: none;
			color: inherit;
		}
	}
</style>
