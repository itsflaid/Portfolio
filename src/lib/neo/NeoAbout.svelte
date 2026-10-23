<script lang="ts">
	import { aboutCopy } from './copy';

	const tones = ['var(--n-yellow)', 'var(--n-mint)', 'var(--n-pink)', 'var(--n-lilac)'];
</script>

<section class="na" id="about">
	<div class="na__wrap">
		<div class="na__head">
			<span class="na__handle">{aboutCopy.handle}</span>
			<span class="na__eyebrow">{aboutCopy.eyebrow}</span>
			<h2 class="na__title">
				<span>{aboutCopy.line1}</span>
				<span>{aboutCopy.line2}<i class="na__cursor" aria-hidden="true">_</i></span>
			</h2>
		</div>

		<div class="na__body">
			<p class="na__bio">{aboutCopy.bio}</p>

			<dl class="na__facts">
				{#each aboutCopy.facts as fact, i}
					<div class="na__fact" style="--tone: {tones[i % tones.length]}">
						<dt>{fact.label}</dt>
						<dd>{fact.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<style>
	.na {
		background: var(--n-paper);
		border-bottom: var(--n-border) solid var(--n-ink);
		padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
	}
	.na__wrap {
		max-width: 78rem;
		margin: 0 auto;
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: clamp(2rem, 5vw, 4.5rem);
		align-items: start;
	}
	.na__head {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
	}
	.na__handle {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		background: var(--n-ink);
		color: var(--n-paper);
		padding: 0.3rem 0.6rem;
		transform: rotate(-2deg);
	}
	.na__eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		font-weight: 500;
	}
	.na__title {
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(2.6rem, 7.5vw, 5.6rem);
		line-height: 0.95;
		text-transform: uppercase;
	}
	.na__title span {
		display: block;
	}
	.na__title span:first-child {
		background: var(--n-yellow);
		display: inline-block;
		padding: 0 0.15em;
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		transform: rotate(-1.5deg);
		margin-bottom: 0.25em;
	}
	.na__cursor {
		font-style: normal;
		color: var(--n-blue);
		animation: na-blink 1s steps(2) infinite;
	}
	.na__bio {
		margin: 0;
		font-size: clamp(1.1rem, 2.2vw, 1.5rem);
		line-height: 1.5;
		font-weight: 500;
		background: #fff;
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		padding: clamp(1.1rem, 2.5vw, 1.75rem);
	}
	.na__facts {
		margin: clamp(1.5rem, 3vw, 2.25rem) 0 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}
	.na__fact {
		background: var(--tone);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 4px 4px 0 var(--n-ink);
		padding: 0.85rem 1rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.na__fact:nth-child(even) {
		transform: translateY(0.6rem);
	}
	.na__fact dt {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.na__fact dd {
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-size: clamp(1rem, 1.8vw, 1.25rem);
		line-height: 1.2;
	}

	@keyframes na-blink {
		50% {
			opacity: 0;
		}
	}
	@media (max-width: 860px) {
		.na__wrap {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 480px) {
		.na__facts {
			grid-template-columns: 1fr;
		}
		.na__fact:nth-child(even) {
			transform: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.na__cursor {
			animation: none;
		}
	}
</style>
