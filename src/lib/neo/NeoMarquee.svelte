<script lang="ts">
	import { marqueeWords } from './copy';

	const tones = ['var(--n-yellow)', 'var(--n-pink)', 'var(--n-mint)', 'var(--n-lilac)'];
</script>

<section class="nm" aria-hidden="true">
	<div class="nm__track">
		{#each [0, 1] as copy}
			<div class="nm__group">
				{#each marqueeWords as word, i}
					<span class="nm__word">{word}</span>
					<span class="nm__sep" style="background: {tones[(i + copy) % tones.length]}"></span>
				{/each}
			</div>
		{/each}
	</div>
</section>

<style>
	.nm {
		background: var(--n-ink);
		color: var(--n-paper);
		border-bottom: var(--n-border) solid var(--n-ink);
		overflow: hidden;
		padding: clamp(0.8rem, 2vw, 1.2rem) 0;
	}
	.nm__track {
		display: flex;
		width: max-content;
		animation: nm-scroll 28s linear infinite;
	}
	.nm__group {
		display: flex;
		align-items: center;
		gap: clamp(1.2rem, 3vw, 2.4rem);
		padding-right: clamp(1.2rem, 3vw, 2.4rem);
	}
	.nm__word {
		font-family: 'Archivo Black', sans-serif;
		font-size: clamp(1.6rem, 4.5vw, 3.2rem);
		line-height: 1;
		white-space: nowrap;
	}
	.nm__sep {
		flex: none;
		width: clamp(1rem, 2.4vw, 1.7rem);
		height: clamp(1rem, 2.4vw, 1.7rem);
		border: 3px solid var(--n-paper);
		transform: rotate(45deg);
	}
	@keyframes nm-scroll {
		to {
			transform: translateX(-50%);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.nm__track {
			animation: none;
		}
		.nm {
			overflow-x: auto;
		}
	}
</style>
