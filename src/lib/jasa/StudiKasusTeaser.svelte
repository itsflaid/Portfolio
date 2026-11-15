<script lang="ts">
	import { katalyst as k } from '$lib/data/studiKasus';
	import Frame from './Frame.svelte';
	import Icon from './Icon.svelte';
	import LoopVideo from './LoopVideo.svelte';
	import { reveal } from './reveal';
</script>

<section class="cs jz-section jz-wrap" id="contoh-sistem" aria-labelledby="cs-title">
	<div class="cs__grid">
		<div class="cs__copy" use:reveal>
			<p class="cs__kicker">Contoh sistem · Proyek lomba</p>
			<h2 class="cs__title jz-title" id="cs-title">{k.title}</h2>
			<p class="jz-lede">{k.teaserLede}</p>

			<ul class="cs__points">
				{#each k.teaserPoints as point}
					<li>{point}</li>
				{/each}
			</ul>

			<div class="cs__actions">
				<a class="jz-btn" href={k.path}>Lihat studi kasus</a>
				<a class="jz-btn jz-btn--ghost" href={k.demoUrl} target="_blank" rel="noopener noreferrer">
					Coba demo
					<Icon name="external" />
				</a>
			</div>
		</div>

		<div class="cs__media" use:reveal={80}>
			<Frame ratio="4 / 3" url="Katalyst · versi demo">
				<LoopVideo
					src={k.video}
					poster={k.poster}
					label="Rekaman layar dashboard Katalyst dengan data dummy"
				/>
			</Frame>
		</div>
	</div>
</section>

<style>
	.cs__grid {
		display: grid;
		gap: clamp(2rem, 5vw, 3.5rem);
	}
	@media (min-width: 64rem) {
		.cs__grid {
			grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
			gap: clamp(3rem, 6vw, 5.5rem);
			align-items: center;
		}
	}
	.cs__copy {
		display: grid;
		gap: 1.25rem;
		align-content: start;
	}
	.cs__kicker {
		font-family: var(--jz-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--jz-muted);
	}
	.cs__title {
		font-size: clamp(2.1rem, 4vw, 3.4rem);
	}
	.cs__points {
		display: grid;
		gap: 0.5rem;
	}
	.cs__points li {
		position: relative;
		padding-left: 1.25rem;
		font-size: 0.95rem;
		line-height: 1.45;
	}
	.cs__points li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.55em;
		width: 0.4rem;
		height: 0.4rem;
		background: var(--jz-ink);
	}
	.cs__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}
</style>
