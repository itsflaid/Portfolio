<script lang="ts">
	import type { Project } from '$lib/data/project';
	import { caseStudyLang, type Lang } from '$lib/lang';

	let { project, collapse = false }: { project: Project; collapse?: boolean } = $props();

	let open = $state(false);

	// In the mobile carousel an opened case study closes when you move to another project,
	// so slide heights stay short.
	$effect(() => {
		if (collapse) open = false;
	});
	const lang = $derived($caseStudyLang as Lang);

	// Unwritten case studies are placeholders; do not offer an empty accordion for them.
	const hasCase = $derived(
		!!project.caseStudy &&
			![project.caseStudy.problem.en, project.caseStudy.solution.en].some(
				(t) => t.trim().toLowerCase() === 'lorem ipsum'
			)
	);

	const preview = $derived(project.techPreview ?? []);
	const total = $derived(project.techGroups?.reduce((n, g) => n + g.items.length, 0) ?? 0);
	const extra = $derived(Math.max(0, total - preview.length));
	const allNames = $derived(
		project.techGroups?.flatMap((g) => g.items.map((i) => i.name)).join(', ') ?? ''
	);
	const caseId = $derived(`case-${project.slug}`);
</script>

<article class="p">
	<img class="p__thumb" src={project.thumb} alt="" loading="lazy" decoding="async" width="168" height="112" />

	<div class="p__body">
		<div class="p__title">
			<span class="sm-mono">{project.index}</span>
			<h3>{project.title}</h3>
		</div>
		<p class="p__tag">{project.tag}</p>
		<p class="p__desc">{project.desc}</p>

		<ul class="p__chips">
			{#each project.metrics ?? [] as metric}
				<li class="p__chip p__chip--m">{metric}</li>
			{/each}
			{#each preview as tech}
				<li class="p__chip">{tech.name}</li>
			{/each}
			{#if extra > 0}
				<li class="p__chip" title={allNames}>+{extra}</li>
			{/if}
		</ul>

		<div class="p__links">
			{#if hasCase}
				<button
					type="button"
					class="p__toggle"
					aria-expanded={open}
					aria-controls={caseId}
					onclick={() => (open = !open)}
				>
					Case study {open ? '▴' : '▾'}
				</button>
			{/if}
			{#if project.demo}
				<a href={project.demo} target="_blank" rel="noopener noreferrer"
					>{project.demoLabel ?? 'Live Demo'} ↗</a
				>
			{/if}
			{#if project.npm}
				<a href={project.npm} target="_blank" rel="noopener noreferrer">NPM ↗</a>
			{/if}
			<a href={project.repo} target="_blank" rel="noopener noreferrer">Repository ↗</a>
		</div>

		{#if hasCase && open && project.caseStudy}
			<div class="case" id={caseId}>
				<div class="case__lang" role="group" aria-label="Language">
					{#each ['en', 'id'] as l}
						<button
							type="button"
							class:is-active={lang === l}
							aria-pressed={lang === l}
							onclick={() => caseStudyLang.set(l as Lang)}>{l.toUpperCase()}</button
						>
					{/each}
				</div>
				<h4 class="sm-label">Problem</h4>
				<p>{project.caseStudy.problem[lang]}</p>
				<h4 class="sm-label">Solution</h4>
				<p>{project.caseStudy.solution[lang]}</p>
			</div>
		{/if}
	</div>
</article>

<style>
	.p {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 168px;
		grid-template-areas: 'body thumb';
		gap: 8px 24px;
		align-items: start;
	}
	.p__thumb {
		grid-area: thumb;
		display: block;
		width: 168px;
		height: 112px;
		object-fit: cover;
		border: 1px solid var(--sm-line);
		background: var(--sm-soft);
		margin-top: 4px;
	}
	.p__body {
		grid-area: body;
		min-width: 0;
	}
	.p__title {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}
	.p__title h3 {
		margin: 0;
		font-size: 20px;
		letter-spacing: -0.01em;
		overflow-wrap: anywhere;
	}
	.p__tag {
		margin: 2px 0 8px;
		font-weight: 500;
	}
	.p__desc {
		margin: 0 0 10px;
		font-size: 15px;
		color: var(--sm-body);
	}
	.p__chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 0 0 12px;
		padding: 0;
		list-style: none;
	}
	.p__chip {
		font-family: var(--sm-mono);
		font-size: 11.5px;
		padding: 2px 7px;
		border: 1px solid var(--sm-line);
		color: #3a3a38;
	}
	.p__chip--m {
		border-color: var(--sm-ink);
		color: var(--sm-ink);
	}
	.p__links {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 18px;
		font-size: 14px;
	}
	.p__links a,
	.p__toggle {
		font: inherit;
		font-weight: 500;
		color: var(--sm-ink);
		text-decoration: underline;
		text-underline-offset: 3px;
		background: none;
		border: 0;
		padding: 0;
		cursor: pointer;
	}
	.p__links a:hover,
	.p__toggle:hover {
		text-decoration-thickness: 2px;
	}

	.case {
		margin-top: 16px;
		padding: 16px 0 4px;
		border-top: 1px solid var(--sm-line);
	}
	.case p {
		margin: 4px 0 16px;
		font-size: 15px;
		color: var(--sm-body);
		white-space: pre-line;
	}
	.case h4 {
		margin: 0;
	}
	.case__lang {
		display: inline-flex;
		border: 1px solid var(--sm-ink);
		margin-bottom: 14px;
	}
	.case__lang button {
		font-family: var(--sm-mono);
		font-size: 12px;
		padding: 4px 10px;
		background: none;
		border: 0;
		color: var(--sm-ink);
		cursor: pointer;
	}
	.case__lang button.is-active {
		background: var(--sm-ink);
		color: var(--sm-bg);
	}

	@media (max-width: 640px) {
		.p {
			grid-template-columns: 1fr;
			grid-template-areas: 'thumb' 'body';
		}
		.p__thumb {
			width: 100%;
			height: auto;
			aspect-ratio: 3 / 2;
			margin: 0 0 6px;
		}
		.p__links a,
		.p__toggle {
			min-height: 32px;
			display: inline-flex;
			align-items: center;
		}
	}
</style>
