<script lang="ts">
	import { onMount } from 'svelte';
	import { featuredProjects } from '$lib/data/project';
	import NeoProjectCard from './NeoProjectCard.svelte';
	import { attachPreviews } from './preview-host';
	import { projectsCopy } from './copy';

	const tones = ['var(--n-yellow)', 'var(--n-mint)', 'var(--n-pink)', 'var(--n-lilac)'];

	let listEl: HTMLElement;
	let previews: { pause: () => void; destroy: () => void } | null = null;

	onMount(() => {
		previews = attachPreviews(listEl);
		return () => previews?.destroy();
	});
</script>

<section class="npj" id="projects">
	<div class="npj__wrap">
		<header class="npj__head">
			<span class="npj__eyebrow">{projectsCopy.eyebrow}</span>
			<span class="npj__count">0{featuredProjects.length}</span>
			<h2 class="npj__title">
				<span>{projectsCopy.line1}</span>
				<span>{projectsCopy.line2}<i aria-hidden="true">_</i></span>
			</h2>
		</header>

		<ul class="npj__list" bind:this={listEl}>
			{#each featuredProjects as project, i}
				<NeoProjectCard
					{project}
					flip={i % 2 === 1}
					tone={tones[i % tones.length]}
					onModalOpen={() => previews?.pause()}
				/>
			{/each}
		</ul>

		<footer class="npj__outro">
			<h3 class="npj__outro-title">
				<span>{projectsCopy.outro1}</span>
				<span>{projectsCopy.outro2}</span>
			</h3>
			<a class="npj__all" href="/projects">{projectsCopy.seeAll} →</a>
		</footer>
	</div>
</section>

<style>
	.npj {
		background: var(--n-paper);
		border-bottom: var(--n-border) solid var(--n-ink);
		padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
	}
	.npj__wrap {
		max-width: 78rem;
		margin: 0 auto;
	}
	.npj__head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.8rem 1rem;
		margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
	}
	.npj__eyebrow {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
	}
	.npj__count {
		margin-left: auto;
		font-family: 'Archivo Black', sans-serif;
		font-size: 0.9rem;
		background: var(--n-ink);
		color: var(--n-paper);
		padding: 0.2rem 0.55rem;
	}
	.npj__title {
		flex-basis: 100%;
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(2.8rem, 10vw, 8rem);
		line-height: 0.92;
		text-transform: uppercase;
	}
	.npj__title span {
		display: block;
	}
	.npj__title span:last-child {
		color: var(--n-blue);
		-webkit-text-stroke: 3px var(--n-ink);
		paint-order: stroke fill;
		text-shadow: 0.05em 0.05em 0 var(--n-ink);
	}
	.npj__title i {
		font-style: normal;
	}
	.npj__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: clamp(3rem, 8vw, 6rem);
	}
	.npj__outro {
		margin-top: clamp(3rem, 8vw, 6rem);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.25rem;
		background: var(--n-pink);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		padding: clamp(1.1rem, 3vw, 2rem);
	}
	.npj__outro-title {
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(1.6rem, 4.6vw, 3.4rem);
		line-height: 1;
		text-transform: uppercase;
	}
	.npj__outro-title span {
		display: block;
	}
	.npj__all {
		font-family: 'Archivo Black', sans-serif;
		font-size: 1rem;
		color: var(--n-ink);
		background: var(--n-yellow);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 5px 5px 0 var(--n-ink);
		padding: 0.8rem 1.2rem;
		transition:
			transform 0.1s steps(2),
			box-shadow 0.1s steps(2);
	}
	.npj__all:hover {
		transform: translate(-3px, -3px);
		box-shadow: 8px 8px 0 var(--n-ink);
	}
	.npj__all:active {
		transform: translate(3px, 3px);
		box-shadow: 1px 1px 0 var(--n-ink);
	}
</style>
