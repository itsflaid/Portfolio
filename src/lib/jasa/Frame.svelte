<script lang="ts">
	import { onMount } from 'svelte';

	let {
		src = '',
		alt = '',
		url = '',
		ratio = '16 / 10',
		fallback = '',
		eager = false
	}: {
		src?: string;
		alt?: string;
		url?: string;
		ratio?: string;
		fallback?: string;
		eager?: boolean;
	} = $props();

	let failed = $state(false);
	let img: HTMLImageElement | undefined = $state();

	// error bisa kejadian sebelum hydration, jadi cek lagi saat mount
	onMount(() => {
		if (img && img.complete && img.naturalWidth === 0) failed = true;
	});
</script>

<div class="frame">
	<div class="frame__bar" aria-hidden="true">
		<i></i><i></i><i></i>
		{#if url}<span class="frame__url">{url}</span>{/if}
	</div>
	<div class="frame__view" style:aspect-ratio={ratio}>
		{#if src && !failed}
			<img
				bind:this={img}
				{src}
				{alt}
				loading={eager ? 'eager' : 'lazy'}
				decoding="async"
				draggable="false"
				onerror={() => (failed = true)}
			/>
		{:else}
			<div class="frame__ph" role="img" aria-label={alt || fallback}>
				<span class="frame__ph-name">{fallback}</span>
				<small>preview menyusul</small>
			</div>
		{/if}
	</div>
</div>

<style>
	.frame {
		overflow: hidden;
		border: 1px solid var(--jz-rule);
		border-radius: 0.9rem;
		background: var(--jz-surface);
		box-shadow: var(--jz-shadow);
	}
	.frame__bar {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		height: 1.85rem;
		padding: 0 0.7rem;
		border-bottom: 1px solid var(--jz-rule);
		background: var(--jz-wash);
	}
	.frame__bar i {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: var(--jz-rule-strong);
	}
	.frame__url {
		margin-left: 0.5rem;
		overflow: hidden;
		font-family: var(--jz-mono);
		font-size: 0.6875rem;
		color: var(--jz-muted);
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.frame__view {
		position: relative;
		overflow: hidden;
		background: var(--jz-wash);
	}
	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		user-select: none;
	}
	.frame__ph {
		display: grid;
		place-content: center;
		justify-items: center;
		gap: 0.3rem;
		width: 100%;
		height: 100%;
		padding: 1rem;
		text-align: center;
		background: repeating-linear-gradient(
			135deg,
			transparent 0 10px,
			rgba(20, 19, 17, 0.035) 10px 11px
		);
	}
	.frame__ph-name {
		font-weight: 700;
		letter-spacing: -0.03em;
		font-size: clamp(1rem, 2vw, 1.3rem);
		color: var(--jz-ink);
	}
	.frame__ph small {
		font-family: var(--jz-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--jz-muted);
	}
</style>
