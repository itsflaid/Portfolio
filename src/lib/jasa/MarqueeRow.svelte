<script lang="ts">
	import { onMount } from 'svelte';
	import type { LandingTemplate } from '$lib/data/jasa';
	import TemplateCard from './TemplateCard.svelte';

	let { items, dir }: { items: LandingTemplate[]; dir: 'left' | 'right' } = $props();

	const SPEED = 36; // px per detik

	let groupEl: HTMLElement | undefined = $state();
	let copies = $state(2);
	let dur = $state(60);

	function fit() {
		const w = groupEl?.offsetWidth ?? 0;
		if (!w) return;
		let n = Math.ceil(window.innerWidth / w) + 1;
		if (n % 2) n += 1; // genap, biar -50% pas di batas grup
		copies = Math.max(2, n);
		dur = Math.max(20, Math.round((w * copies) / 2 / SPEED));
	}

	onMount(() => {
		fit();
		window.addEventListener('resize', fit);
		document.fonts?.ready.then(fit);
		return () => window.removeEventListener('resize', fit);
	});
</script>

<div class="row" role="group" aria-label="Template landing page, geser otomatis. Arahkan kursor untuk menjeda.">
	<div class="track track--{dir}" style:--dur="{dur}s">
		{#each Array(copies) as _, copy (copy)}
			<div
				class="group"
				class:group--dup={copy > 0}
				bind:this={groupEl}
				aria-hidden={copy > 0 ? 'true' : undefined}
				inert={copy > 0}
			>
				{#each items as template (template.slug)}
					<TemplateCard {template} />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.row {
		--gap: clamp(1rem, 2vw, 1.5rem);
		overflow: hidden;
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
		mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
	}
	.track {
		display: flex;
		width: max-content;
		animation-duration: var(--dur, 60s);
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		will-change: transform;
	}
	.track--left {
		animation-name: run-left;
	}
	.track--right {
		animation-name: run-right;
	}
	.row:hover .track,
	.row:focus-within .track {
		animation-play-state: paused;
	}
	.group {
		display: flex;
		gap: var(--gap);
		flex: 0 0 auto;
		padding-right: var(--gap);
	}

	@keyframes run-left {
		to {
			transform: translateX(-50%);
		}
	}
	@keyframes run-right {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(0);
		}
	}

	/* reduced motion: geser manual, salinan loop disembunyikan */
	@media (prefers-reduced-motion: reduce) {
		.row {
			overflow-x: auto;
			-webkit-mask-image: none;
			mask-image: none;
			padding-inline: var(--jz-gutter);
			padding-bottom: 0.5rem;
		}
		.track {
			animation: none;
			transform: none;
		}
		.group--dup {
			display: none;
		}
	}
</style>
