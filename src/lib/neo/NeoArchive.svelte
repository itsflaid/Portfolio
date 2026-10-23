<script lang="ts">
	import { onMount } from 'svelte';
	import { allProjects } from '$lib/data/project';
	import { smallerBuilds } from '$lib/data/builds';
	import { SITE } from '$lib/data/site';
	import NeoNav from './NeoNav.svelte';
	import NeoProjectCard from './NeoProjectCard.svelte';
	import { attachPreviews } from './preview-host';
	import { archiveCopy } from './copy';
	import CaseStudyModal from '$lib/components/modals/CaseStudyModal.svelte';
	import TechModal from '$lib/components/modals/TechModal.svelte';
	import ResumeModal from '$lib/components/modals/ResumeModal.svelte';

	const tones = ['var(--n-yellow)', 'var(--n-mint)', 'var(--n-pink)', 'var(--n-lilac)'];

	let listEl: HTMLElement;
	let previews: { pause: () => void; destroy: () => void } | null = null;

	onMount(() => {
		previews = attachPreviews(listEl);
		return () => previews?.destroy();
	});
</script>

<NeoNav />

<main class="nar">
	<header class="nar__head">
		<span class="nar__eyebrow">{archiveCopy.eyebrow}</span>
		<span class="nar__count">0{allProjects.length}</span>
		<h1 class="nar__title">
			<span>{archiveCopy.line1}</span>
			<span>{archiveCopy.line2}<i aria-hidden="true">_</i></span>
		</h1>
		<span class="nar__scroll">{archiveCopy.scroll} ↓</span>
	</header>

	<ul class="nar__list" bind:this={listEl}>
		{#each allProjects as project, i}
			<NeoProjectCard
				{project}
				flip={i % 2 === 1}
				tone={tones[i % tones.length]}
				onModalOpen={() => previews?.pause()}
			/>
		{/each}
	</ul>

	<section class="nar__builds">
		<h2>
			<span>{archiveCopy.outro1}</span>
			<span>{archiveCopy.outro2}<i aria-hidden="true">_</i></span>
		</h2>
		<p>{archiveCopy.sub}</p>
		<ul>
			{#each smallerBuilds as build}
				<li>
					<a href={build.href} target="_blank" rel="noopener noreferrer"
						>{build.name} <span>· {build.stack}</span></a
					>
				</li>
			{/each}
		</ul>
		<a class="nar__gh" href={SITE.github} target="_blank" rel="noopener noreferrer"
			>{archiveCopy.cta}</a
		>
	</section>

	<section class="nar__close">
		<span class="nar__close-eyebrow">{archiveCopy.closeEyebrow}</span>
		<h2>
			<span>{archiveCopy.closeLine1}</span>
			<span>{archiveCopy.closeLine2}<i aria-hidden="true">_</i></span>
		</h2>
		<p>{archiveCopy.closeSub}</p>
		<div class="nar__close-cta">
			<a class="nar__btn nar__btn--yellow" href="/">{archiveCopy.closeHome}</a>
			<a class="nar__btn nar__btn--paper" href="/#projects">{archiveCopy.closeFeatured}</a>
		</div>
	</section>
</main>

<ResumeModal />
<CaseStudyModal />
<TechModal />

<style>
	.nar {
		background: var(--n-paper);
		padding-bottom: 0;
	}
	.nar__head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.8rem 1rem;
		max-width: 78rem;
		margin: 0 auto;
		padding: clamp(2.5rem, 7vw, 5rem) clamp(1rem, 4vw, 3rem) clamp(2rem, 5vw, 3.5rem);
	}
	.nar__eyebrow {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
	}
	.nar__count {
		margin-left: auto;
		font-family: 'Archivo Black', sans-serif;
		font-size: 0.9rem;
		background: var(--n-ink);
		color: var(--n-paper);
		padding: 0.2rem 0.55rem;
	}
	.nar__title {
		flex-basis: 100%;
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(2.8rem, 11vw, 9rem);
		line-height: 0.92;
		text-transform: uppercase;
	}
	.nar__title span {
		display: block;
	}
	.nar__title span:last-child {
		color: var(--n-pink);
		-webkit-text-stroke: 3px var(--n-ink);
		paint-order: stroke fill;
		text-shadow: 0.05em 0.05em 0 var(--n-ink);
	}
	.nar__title i {
		font-style: normal;
	}
	.nar__scroll {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		background: var(--n-yellow);
		border: 2px solid var(--n-ink);
		padding: 0.25rem 0.6rem;
	}
	.nar__list {
		list-style: none;
		margin: 0 auto;
		padding: 0 clamp(1rem, 4vw, 3rem);
		max-width: 78rem;
		display: grid;
		gap: clamp(3rem, 8vw, 6rem);
	}

	.nar__builds {
		max-width: 78rem;
		margin: clamp(3rem, 8vw, 6rem) auto 0;
		padding: 0 clamp(1rem, 4vw, 3rem);
	}
	.nar__builds h2 {
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(2.4rem, 8vw, 6rem);
		line-height: 0.95;
		text-transform: uppercase;
	}
	.nar__builds h2 span {
		display: block;
	}
	.nar__builds h2 i {
		font-style: normal;
		color: var(--n-blue);
	}
	.nar__builds > p {
		margin: 1rem 0 0;
		font-weight: 500;
		font-size: 1.05rem;
	}
	.nar__builds ul {
		list-style: none;
		margin: 1.5rem 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: 1rem;
	}
	.nar__builds li a {
		display: block;
		font-family: 'Archivo Black', sans-serif;
		font-size: 1.15rem;
		color: var(--n-ink);
		background: #fff;
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 5px 5px 0 var(--n-ink);
		padding: 0.9rem 1rem;
		transition:
			transform 0.1s steps(2),
			box-shadow 0.1s steps(2),
			background 0.1s steps(2);
	}
	.nar__builds li:nth-child(4n + 1) a:hover {
		background: var(--n-yellow);
	}
	.nar__builds li:nth-child(4n + 2) a:hover {
		background: var(--n-mint);
	}
	.nar__builds li:nth-child(4n + 3) a:hover {
		background: var(--n-pink);
	}
	.nar__builds li:nth-child(4n + 4) a:hover {
		background: var(--n-lilac);
	}
	.nar__builds li a:hover {
		transform: translate(-3px, -3px);
		box-shadow: 8px 8px 0 var(--n-ink);
	}
	.nar__builds li span {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		font-weight: 500;
	}
	.nar__gh {
		display: inline-block;
		margin-top: 1.5rem;
		font-family: 'Archivo Black', sans-serif;
		color: var(--n-ink);
		background: var(--n-yellow);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 5px 5px 0 var(--n-ink);
		padding: 0.7rem 1.1rem;
	}

	.nar__close {
		margin-top: clamp(3rem, 8vw, 6rem);
		background: var(--n-blue);
		color: #fff;
		border-top: var(--n-border) solid var(--n-ink);
		padding: clamp(2.5rem, 7vw, 5rem) clamp(1rem, 4vw, 3rem);
		display: grid;
		justify-items: start;
		gap: 1rem;
	}
	.nar__close-eyebrow {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		background: var(--n-yellow);
		color: var(--n-ink);
		border: 2px solid var(--n-ink);
		padding: 0.25rem 0.55rem;
	}
	.nar__close h2 {
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(3rem, 12vw, 9.5rem);
		line-height: 0.92;
		text-transform: uppercase;
		-webkit-text-stroke: 3px var(--n-ink);
		paint-order: stroke fill;
		text-shadow: 0.05em 0.05em 0 var(--n-ink);
	}
	.nar__close h2 span {
		display: block;
	}
	.nar__close h2 i {
		font-style: normal;
		color: var(--n-yellow);
	}
	.nar__close p {
		margin: 0;
		max-width: 32rem;
		font-weight: 600;
		font-size: 1.05rem;
	}
	.nar__close-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 1.25rem;
	}
	.nar__btn {
		font-family: 'Archivo Black', sans-serif;
		color: var(--n-ink);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		padding: 0.75rem 1.2rem;
		transition:
			transform 0.1s steps(2),
			box-shadow 0.1s steps(2);
	}
	.nar__btn--yellow {
		background: var(--n-yellow);
	}
	.nar__btn--paper {
		background: var(--n-paper);
	}
	.nar__btn:hover {
		transform: translate(-3px, -3px);
		box-shadow: 9px 9px 0 var(--n-ink);
	}
	.nar__btn:active {
		transform: translate(4px, 4px);
		box-shadow: 2px 2px 0 var(--n-ink);
	}
</style>
