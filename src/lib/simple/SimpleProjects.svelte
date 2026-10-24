<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { Project } from '$lib/data/project';
	import SimpleProject from './SimpleProject.svelte';

	let {
		projects,
		title = 'Projects',
		id,
		children
	}: { projects: Project[]; title?: string; id?: string; children?: Snippet } = $props();

	let track: HTMLElement;
	let index = $state(0);
	let carousel = $state(false);

	onMount(() => {
		const mq = window.matchMedia('(max-width: 640px)');
		const sync = () => (carousel = mq.matches);
		sync();
		mq.addEventListener('change', sync);
		return () => mq.removeEventListener('change', sync);
	});

	const pad = (n: number) => String(n).padStart(2, '0');

	// On small screens the list becomes a one-project-at-a-time carousel (CSS decides);
	// on wide screens the track does not scroll sideways, so index stays 0 and the controls are hidden.
	function onScroll() {
		const w = track?.clientWidth ?? 0;
		if (!w) return;
		const i = Math.max(0, Math.min(projects.length - 1, Math.round(track.scrollLeft / w)));
		if (i !== index) index = i;
	}

	function go(dir: -1 | 1) {
		const w = track.clientWidth;
		const next = Math.max(0, Math.min(projects.length - 1, index + dir));
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		track.scrollTo({ left: next * w, behavior: reduce ? 'auto' : 'smooth' });
	}
</script>

<section class="sm-section" {id}>
	<div class="head">
		<h2 class="sm-label">{title}</h2>
		<div class="ctl" role="group" aria-label="Browse projects">
			<span class="ctl__count sm-mono" aria-live="polite"
				>{pad(index + 1)} / {pad(projects.length)}</span
			>
			<button type="button" aria-label="Previous project" disabled={index === 0} onclick={() => go(-1)}
				>‹</button
			>
			<button
				type="button"
				aria-label="Next project"
				disabled={index === projects.length - 1}
				onclick={() => go(1)}>›</button
			>
		</div>
	</div>

	<div class="track" bind:this={track} onscroll={onScroll}>
		{#each projects as project, i}
			<div
				class="slide"
				role="group"
				aria-roledescription="slide"
				aria-label="{i + 1} of {projects.length}"
			>
				<SimpleProject {project} collapse={carousel && i !== index} />
			</div>
		{/each}
	</div>

	{@render children?.()}
</section>

<style>
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24px;
		min-height: 44px;
	}
	.head :global(.sm-label) {
		margin: 0;
	}
	.ctl {
		display: none;
		align-items: center;
		gap: 8px;
	}
	.ctl__count {
		margin-right: 4px;
	}
	.ctl button {
		width: 44px;
		height: 44px;
		font-family: var(--sm-sans);
		font-size: 24px;
		line-height: 1;
		color: var(--sm-ink);
		background: transparent;
		border: 1px solid var(--sm-ink);
		cursor: pointer;
	}
	.ctl button:hover:not(:disabled) {
		background: var(--sm-ink);
		color: var(--sm-bg);
	}
	.ctl button:disabled {
		opacity: 0.3;
		cursor: default;
	}

	/* wide: plain vertical list */
	.track {
		display: block;
	}
	.slide {
		padding: 0 0 28px;
		margin-bottom: 28px;
		border-bottom: 1px solid var(--sm-line);
	}
	.slide:last-child {
		border-bottom: 0;
		margin-bottom: 8px;
	}

	/* small: one project per screen, buttons + swipe */
	@media (max-width: 640px) {
		.ctl {
			display: flex;
		}
		.track {
			display: flex;
			align-items: flex-start;
			overflow-x: auto;
			scroll-snap-type: x mandatory;
			overscroll-behavior-x: contain;
			scrollbar-width: none;
			margin: 0 -24px;
		}
		.track::-webkit-scrollbar {
			display: none;
		}
		.slide {
			flex: 0 0 100%;
			scroll-snap-align: start;
			scroll-snap-stop: always;
			padding: 0 24px 8px;
			margin: 0;
			border: 0;
		}
		.slide:last-child {
			margin: 0;
		}
	}
</style>
