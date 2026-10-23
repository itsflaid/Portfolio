<script lang="ts">
	import type { Project } from '$lib/data/project';
	import { openCaseStudyModal } from '$lib/caseStudy';
	import { openTechModal } from '$lib/techModal';

	let {
		project,
		tone = 'var(--n-yellow)',
		flip = false,
		onModalOpen
	}: { project: Project; tone?: string; flip?: boolean; onModalOpen?: () => void } = $props();

	const extra = $derived(
		(project.techGroups?.reduce((sum, g) => sum + g.items.length, 0) ?? 0) -
			(project.techPreview?.length ?? 0)
	);
</script>

<li class="npc" class:npc--flip={flip} style="--tone: {tone}">
	<div class="npc__media">
		<div class="npc__bar" aria-hidden="true">
			<i></i><i></i><i></i>
			<span>{project.index}</span>
		</div>
		<!-- .media__pan is the hook the shared preview controller looks for -->
		<div class="media__pan npc__pan">
			<img
				class="npc__img"
				src={project.thumb}
				alt="{project.title} preview"
				loading="lazy"
				decoding="async"
				draggable="false"
			/>
			{#if project.video}
				<video class="npc__video" muted loop playsinline preload="metadata" aria-hidden="true" tabindex="-1">
					<source src="{project.video}.webm" type="video/webm" />
					<source src="{project.video}.mp4" type="video/mp4" />
				</video>
			{/if}
		</div>
	</div>

	<div class="npc__info">
		<div class="npc__head">
			<span class="npc__index">{project.index}</span>
			<h3 class="npc__title">{project.title}</h3>
		</div>
		<p class="npc__tag">{project.tag}</p>

		{#if project.metrics?.length}
			<ul class="npc__metrics">
				{#each project.metrics as metric}
					<li>{metric}</li>
				{/each}
			</ul>
		{/if}

		<p class="npc__desc">{project.desc}</p>

		<div class="npc__stack">
			<span class="npc__stack-label">STACK</span>
			<ul class="npc__pills">
				{#if project.techPreview && project.techGroups}
					{#each project.techPreview as tech}
						<li>
							{#if tech.icon}
								<svg viewBox="0 0 24 24" aria-hidden="true"
									><path d={tech.icon.path} fill-rule="evenodd" /></svg
								>
							{/if}
							<span>{tech.name}</span>
						</li>
					{/each}
					{#if extra > 0}
						<li class="npc__more">
							<button
								type="button"
								onclick={() => {
									onModalOpen?.();
									openTechModal(project);
								}}>+{extra} MORE</button
							>
						</li>
					{/if}
				{/if}
			</ul>
		</div>

		<div class="npc__actions">
			{#if project.caseStudy}
				<button
					type="button"
					class="npc__btn npc__btn--case"
					onclick={() => {
						onModalOpen?.();
						openCaseStudyModal(project);
					}}
				>
					Case Study
				</button>
			{/if}
			{#if project.demo}
				<a
					class="npc__btn npc__btn--demo"
					href={project.demo}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={project.demoLabel ?? 'Live Demo'}
				>
					{project.demoLabel ?? 'Live Demo'} ↗
				</a>
			{/if}
			{#if project.npm}
				<a
					class="npc__btn npc__btn--paper"
					href={project.npm}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="NPM Package"
				>
					NPM
				</a>
			{/if}
			<a
				class="npc__btn npc__btn--paper"
				href={project.repo}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Repository"
			>
				Repository
			</a>
		</div>
	</div>
</li>

<style>
	.npc {
		list-style: none;
		display: grid;
		grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
		gap: clamp(1.25rem, 3vw, 2.5rem);
		align-items: center;
	}
	.npc--flip {
		grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
	}
	.npc--flip .npc__media {
		order: 2;
	}

	.npc__media {
		background: var(--n-paper);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 10px 10px 0 var(--n-ink);
	}
	.npc__bar {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.45rem 0.65rem;
		background: var(--tone);
		border-bottom: var(--n-border) solid var(--n-ink);
	}
	.npc__bar i {
		width: 0.7rem;
		height: 0.7rem;
		background: var(--n-paper);
		border: 2px solid var(--n-ink);
	}
	.npc__bar span {
		margin-left: auto;
		font-family: 'Archivo Black', sans-serif;
		font-size: 0.8rem;
	}
	.npc__pan {
		position: relative;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		background: #fff;
	}
	.npc__img,
	.npc__video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
	.npc__video {
		opacity: 0;
		transition: opacity 0.2s steps(3);
	}
	:global(.npc__pan.is-video) .npc__img {
		opacity: 0;
	}
	:global(.npc__pan.is-video) .npc__video {
		opacity: 1;
	}

	.npc__info {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		min-width: 0;
	}
	.npc__head {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}
	.npc__index {
		font-family: 'Archivo Black', sans-serif;
		font-size: 0.85rem;
		background: var(--tone);
		border: var(--n-border) solid var(--n-ink);
		padding: 0.25rem 0.5rem;
		box-shadow: 3px 3px 0 var(--n-ink);
	}
	.npc__title {
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(2rem, 4.6vw, 3.6rem);
		line-height: 0.95;
		text-transform: uppercase;
		overflow-wrap: anywhere;
	}
	.npc__tag {
		margin: 0;
		font-weight: 700;
		font-size: clamp(1rem, 1.8vw, 1.2rem);
		line-height: 1.3;
	}
	.npc__metrics {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.npc__metrics li {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.78rem;
		background: var(--n-ink);
		color: var(--n-paper);
		padding: 0.3rem 0.55rem;
	}
	.npc__desc {
		margin: 0;
		font-size: 1rem;
		line-height: 1.55;
		max-width: 36rem;
	}
	.npc__stack {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem;
	}
	.npc__stack-label {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.72rem;
		letter-spacing: 0.1em;
	}
	.npc__pills {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}
	.npc__pills li {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.75rem;
		background: #fff;
		border: 2px solid var(--n-ink);
		padding: 0.25rem 0.5rem;
	}
	.npc__pills svg {
		width: 0.9rem;
		height: 0.9rem;
		fill: var(--n-ink);
	}
	.npc__more {
		padding: 0 !important;
		border: 0 !important;
		background: none !important;
	}
	.npc__more button {
		font: inherit;
		color: var(--n-ink);
		background: var(--n-yellow);
		border: 2px solid var(--n-ink);
		padding: 0.25rem 0.5rem;
		cursor: pointer;
	}
	.npc__more button:hover {
		background: var(--n-mint);
	}

	.npc__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 0.4rem;
	}
	.npc__btn {
		font-family: 'Archivo Black', sans-serif;
		font-size: 0.82rem;
		letter-spacing: 0.02em;
		color: var(--n-ink);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 4px 4px 0 var(--n-ink);
		padding: 0.55rem 0.9rem;
		cursor: pointer;
		transition:
			transform 0.1s steps(2),
			box-shadow 0.1s steps(2);
	}
	.npc__btn--case {
		background: var(--n-blue);
		color: #fff;
	}
	.npc__btn--demo {
		background: var(--n-yellow);
	}
	.npc__btn--paper {
		background: var(--n-paper);
	}
	.npc__btn:hover {
		transform: translate(-2px, -2px);
		box-shadow: 7px 7px 0 var(--n-ink);
	}
	.npc__btn:active {
		transform: translate(3px, 3px);
		box-shadow: 1px 1px 0 var(--n-ink);
	}

	@media (max-width: 860px) {
		.npc,
		.npc--flip {
			grid-template-columns: 1fr;
		}
		.npc--flip .npc__media {
			order: 0;
		}
		.npc__media {
			box-shadow: 6px 6px 0 var(--n-ink);
		}
		.npc__video {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.npc__video {
			display: none;
		}
	}
</style>
