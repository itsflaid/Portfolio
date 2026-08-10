<script lang="ts">
	import { onMount } from 'svelte';

	const words = ['DEVELOPER', 'BUILDER', 'DESIGNER', 'EXPLORER', 'LEARNER', 'CREATOR'];

	let trackEl: HTMLElement;
	let copies = 2;
	let loopDur = '26s';

	function fitCopies() {
		const group = trackEl?.firstElementChild as HTMLElement | null;
		const groupWidth = group?.offsetWidth ?? 0;
		if (!groupWidth) return;
		let needed = Math.ceil(window.innerWidth / groupWidth) + 2;
		if (needed % 2 !== 0) needed += 1;
		copies = Math.max(2, needed);
		loopDur = `${(26 * copies) / 2}s`;
	}

	onMount(() => {
		fitCopies();
		window.addEventListener('resize', fitCopies);
		document.fonts?.ready.then(fitCopies);
		return () => window.removeEventListener('resize', fitCopies);
	});
</script>

<section class="marquee" style={`--loop-dur: ${loopDur}`}>
	<div class="marquee__track" bind:this={trackEl} aria-hidden="true">
		{#each Array(copies) as _, copy (copy)}
			<div class="marquee__group">
				{#each words as word (word)}
					<span class="marquee__word">{word}</span>
					<img class="marquee__sep" src="/logo-trans.png" alt="" aria-hidden="true" draggable="false" />
				{/each}
			</div>
		{/each}
	</div>
</section>

<style>
	.marquee {
		position: relative;
		background: transparent;
		overflow: hidden;
		padding: clamp(0.6rem, 1.8vh, 1rem) 0 clamp(0.42rem, 1.26vh, 0.7rem);
		z-index: 3;
	}
	.marquee__track {
		display: flex;
		width: max-content;
		animation: scroll-left var(--loop-dur, 26s) linear infinite;
	}
	.marquee:hover .marquee__track {
		animation-play-state: paused;
	}
	.marquee__group {
		display: flex;
		align-items: center;
		flex: 0 0 auto;
	}
	.marquee__word {
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: clamp(0.8rem, 2.1vw, 1.6rem);
		letter-spacing: 0.01em;
		color: var(--fg-light);
		white-space: nowrap;
		padding: 0 clamp(1rem, 2.5vw, 2rem);
	}
	.marquee__sep {
		display: block;
		height: clamp(0.8rem, 1.7vw, 1.3rem);
		width: auto;
		flex: 0 0 auto;
		user-select: none;
		pointer-events: none;
	}

	@keyframes scroll-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee__track {
			animation-play-state: paused;
		}
	}
</style>