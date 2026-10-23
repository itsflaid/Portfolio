<script lang="ts">
	import { skillGroups } from '$lib/data/skills';
	import { skillsCopy } from './copy';

	const tones = ['var(--n-yellow)', 'var(--n-mint)', 'var(--n-pink)', 'var(--n-lilac)'];
</script>

<section class="ns" id="skills">
	<div class="ns__wrap">
		<header class="ns__head">
			<span class="ns__eyebrow">{skillsCopy.eyebrow}</span>
			<h2 class="ns__title">
				<span>{skillsCopy.line1}</span>
				<span>{skillsCopy.line2}<i aria-hidden="true">_</i></span>
			</h2>
			<p class="ns__lead">{skillsCopy.lead}</p>
		</header>

		<div class="ns__groups">
			{#each skillGroups as group, gi}
				<section class="ns__group" style="--tone: {tones[gi % tones.length]}">
					<h3 class="ns__label">
						<span class="ns__num">0{gi + 1}</span>
						{group.label}
					</h3>
					<ul class="ns__grid">
						{#each group.items as item}
							<li class="ns__chip">
								<svg
									viewBox={item.icon.viewBox ?? '0 0 24 24'}
									aria-hidden="true"
									class:ns__multi={!!item.icon.svg}
									style="--brand: {item.icon.hex}"
								>
									{#if item.icon.svg}
										{@html item.icon.svg}
									{:else}
										<path d={item.icon.path} fill-rule="evenodd" />
									{/if}
								</svg>
								<span>{item.name}</span>
							</li>
						{/each}
					</ul>
				</section>
			{/each}
		</div>
	</div>
</section>

<style>
	.ns {
		background: var(--n-ink);
		color: var(--n-paper);
		border-bottom: var(--n-border) solid var(--n-ink);
		padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
	}
	.ns__wrap {
		max-width: 78rem;
		margin: 0 auto;
	}
	.ns__head {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.9rem;
		margin-bottom: clamp(2rem, 5vw, 3.5rem);
	}
	.ns__eyebrow {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--n-yellow);
	}
	.ns__title {
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(2.8rem, 10vw, 8rem);
		line-height: 0.92;
		text-transform: uppercase;
	}
	.ns__title span {
		display: block;
	}
	.ns__title span:last-child {
		color: var(--n-yellow);
	}
	.ns__title i {
		font-style: normal;
		color: var(--n-pink);
	}
	.ns__lead {
		margin: 0;
		max-width: 32rem;
		font-size: clamp(1rem, 1.8vw, 1.2rem);
		line-height: 1.5;
	}
	.ns__groups {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(1.25rem, 3vw, 2rem);
		align-items: start;
	}
	.ns__group {
		background: var(--n-paper);
		color: var(--n-ink);
		border: var(--n-border) solid var(--n-paper);
		box-shadow: 8px 8px 0 var(--tone);
		padding: clamp(1rem, 2.4vw, 1.5rem);
	}
	.ns__label {
		margin: 0 0 1rem;
		display: flex;
		align-items: center;
		gap: 0.7rem;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(1rem, 2vw, 1.3rem);
		text-transform: uppercase;
	}
	.ns__num {
		font-size: 0.8rem;
		background: var(--tone);
		border: 2px solid var(--n-ink);
		padding: 0.15rem 0.45rem;
	}
	.ns__grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(8.2rem, 1fr));
		gap: 0.6rem;
	}
	.ns__chip {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		background: #fff;
		border: 2px solid var(--n-ink);
		padding: 0.5rem 0.6rem;
		font-weight: 700;
		font-size: 0.88rem;
		transition: transform 0.1s steps(2);
	}
	.ns__chip:hover {
		transform: translate(-2px, -2px);
		box-shadow: 3px 3px 0 var(--n-ink);
		background: var(--tone);
	}
	.ns__chip svg {
		flex: none;
		width: 1.35rem;
		height: 1.35rem;
		fill: var(--n-ink);
	}
	/* icons that ship their own multi-colour artwork keep it */
	.ns__chip svg.ns__multi {
		fill: initial;
	}

	@media (max-width: 860px) {
		.ns__groups {
			grid-template-columns: 1fr;
		}
	}
</style>
