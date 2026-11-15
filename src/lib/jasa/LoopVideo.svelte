<script lang="ts">
	import { onMount } from 'svelte';

	let {
		src,
		poster = '',
		label = ''
	}: {
		src: string;
		poster?: string;
		label?: string;
	} = $props();

	let video: HTMLVideoElement | undefined = $state();
	let playing = $state(false);
	let userPaused = false;

	// video baru dimuat dan diputar saat terlihat, dijeda saat keluar layar
	onMount(() => {
		if (!video) return;
		video.muted = true;

		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			userPaused = true;
			return;
		}

		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !userPaused) video?.play().catch(() => {});
				else video?.pause();
			},
			{ threshold: 0.35 }
		);
		io.observe(video);
		return () => io.disconnect();
	});

	function toggle() {
		if (!video) return;
		if (video.paused) {
			userPaused = false;
			video.play().catch(() => {});
		} else {
			userPaused = true;
			video.pause();
		}
	}
</script>

<div class="lv">
	<video
		bind:this={video}
		{poster}
		muted
		loop
		playsinline
		preload="none"
		aria-label={label}
		onplay={() => (playing = true)}
		onpause={() => (playing = false)}
	>
		<source {src} type="video/mp4" />
	</video>

	<button
		class="lv__btn"
		type="button"
		onclick={toggle}
		aria-label={playing ? 'Jeda video' : 'Putar video'}
	>
		<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
			{#if playing}
				<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
			{:else}
				<path d="M8 5.5v13l11-6.5z" />
			{/if}
		</svg>
	</button>
</div>

<style>
	.lv {
		position: relative;
		width: 100%;
		height: 100%;
	}
	video {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		background: var(--jz-wash);
	}
	.lv__btn {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border: 1px solid rgba(255, 255, 255, 0.35);
		border-radius: 50%;
		background: rgba(20, 19, 17, 0.62);
		color: #fff;
		cursor: pointer;
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		transition: background 150ms ease;
	}
	.lv__btn:hover {
		background: rgba(20, 19, 17, 0.85);
	}
</style>
