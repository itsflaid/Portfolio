<script lang="ts">
	import { processCopy } from './copy';
</script>

<!-- Same sentence as the normal layout: I START / WITH REAL PROBLEMS / THEN TURN / INTO WORKING SYSTEMS -->
<section class="np" aria-label="Process">
	<div class="np__wrap">
		<p class="np__line">
			{#each processCopy.start as w, i}
				<span class="np__word" class:np__word--big={i === 1}>{w}</span>
			{/each}
		</p>

		<p class="np__line np__line--chips">
			<span class="np__chip np__chip--ink">{processCopy.chips1[0]}</span>
			<span class="np__chip np__chip--pink">{processCopy.chips1[1]}</span>
			<span class="np__chip np__chip--yellow">{processCopy.chips1[2]}</span>
		</p>

		<p class="np__line">
			{#each processCopy.then as w, i}
				<span class="np__word" class:np__word--big={i === 1}>{w}</span>
			{/each}
		</p>

		<p class="np__line np__line--chips">
			<span class="np__chip np__chip--mint">{processCopy.chips2[0]}</span>
			<span class="np__chip np__chip--blue">{processCopy.chips2[1]}</span>
		</p>
	</div>
</section>

<style>
	.np {
		background: var(--n-yellow);
		border-bottom: var(--n-border) solid var(--n-ink);
		padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
		overflow: hidden;
	}
	.np__wrap {
		max-width: 78rem;
		margin: 0 auto;
		display: grid;
		gap: clamp(0.6rem, 1.6vw, 1.1rem);
	}
	.np__line {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.2em 0.45em;
		font-family: 'Archivo Black', sans-serif;
		font-size: clamp(1.9rem, 6.2vw, 5.2rem);
		line-height: 1;
		text-transform: uppercase;
		color: var(--n-ink);
	}
	.np__word--big {
		-webkit-text-stroke: 0;
	}
	.np__line--chips {
		gap: 0.3em;
	}
	.np__line--chips:nth-of-type(4) {
		padding-left: clamp(0rem, 6vw, 5rem);
	}
	.np__chip {
		display: inline-block;
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		padding: 0.02em 0.22em 0.08em;
	}
	.np__chip--ink {
		background: var(--n-ink);
		color: var(--n-paper);
		transform: rotate(-2deg);
	}
	.np__chip--pink {
		background: var(--n-pink);
		transform: rotate(1.5deg);
	}
	.np__chip--yellow {
		background: var(--n-paper);
		transform: rotate(-1deg);
	}
	.np__chip--mint {
		background: var(--n-mint);
		transform: rotate(1.5deg);
	}
	.np__chip--blue {
		background: var(--n-blue);
		color: #fff;
		transform: rotate(-1.5deg);
	}
</style>
