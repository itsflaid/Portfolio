<script lang="ts">
	import { entries } from '$lib/data/experience';
	import { experienceCopy } from './copy';

	const tone: Record<string, string> = {
		EDUCATION: 'var(--n-mint)',
		EXPERIENCE: 'var(--n-pink)',
		'SELF-TAUGHT': 'var(--n-yellow)'
	};
</script>

<section class="nx" id="experience">
	<div class="nx__wrap">
		<header class="nx__head">
			<span class="nx__eyebrow">{experienceCopy.eyebrow}</span>
			<h2 class="nx__title">{experienceCopy.heading}</h2>
		</header>

		<ol class="nx__list">
			{#each entries as entry}
				<li class="nx__item" style="--tone: {tone[entry.type] ?? 'var(--n-lilac)'}">
					<div class="nx__meta">
						<span class="nx__date">{entry.date}</span>
						<span class="nx__type">{entry.type}</span>
					</div>
					<div class="nx__card">
						<h3 class="nx__role">{entry.title}</h3>
						<p class="nx__org">{entry.org}</p>
						{#if entry.desc}<p class="nx__desc">{entry.desc}</p>{/if}
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.nx {
		background: var(--n-paper-2);
		border-bottom: var(--n-border) solid var(--n-ink);
		padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
	}
	.nx__wrap {
		max-width: 78rem;
		margin: 0 auto;
	}
	.nx__head {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.9rem;
		margin-bottom: clamp(2rem, 5vw, 3.5rem);
	}
	.nx__eyebrow {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
	}
	.nx__title {
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(2.2rem, 6.5vw, 4.8rem);
		line-height: 1;
		text-transform: uppercase;
		background: var(--n-blue);
		color: #fff;
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		padding: 0.1em 0.3em 0.15em;
		transform: rotate(-1deg);
	}
	.nx__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: clamp(1rem, 2.4vw, 1.6rem);
	}
	.nx__item {
		display: grid;
		grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
		gap: 1rem clamp(1rem, 3vw, 2rem);
		align-items: start;
	}
	.nx__meta {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
		padding-top: 0.5rem;
	}
	.nx__date {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		letter-spacing: 0.04em;
	}
	.nx__type {
		font-family: 'Archivo Black', sans-serif;
		font-size: 0.72rem;
		letter-spacing: 0.05em;
		background: var(--tone);
		border: 2px solid var(--n-ink);
		padding: 0.2rem 0.5rem;
	}
	.nx__card {
		background: #fff;
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		padding: clamp(1rem, 2.4vw, 1.5rem);
		border-left: 14px solid var(--tone);
	}
	.nx__role {
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(1.1rem, 2.4vw, 1.6rem);
		line-height: 1.1;
		text-transform: uppercase;
	}
	.nx__org {
		margin: 0.45rem 0 0;
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.85rem;
	}
	.nx__desc {
		margin: 0.8rem 0 0;
		font-size: 1rem;
		line-height: 1.55;
		max-width: 46rem;
	}

	@media (max-width: 760px) {
		.nx__item {
			grid-template-columns: 1fr;
		}
		.nx__meta {
			flex-direction: row;
			align-items: center;
			flex-wrap: wrap;
			padding-top: 0;
		}
	}
</style>
