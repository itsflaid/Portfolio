<script lang="ts">
	import { SITE } from '$lib/data/site';
	import { RESUME } from '$lib/resume';
	import { introCopy } from './copy';
</script>

<div class="intro">
	<h1>{introCopy.name}</h1>
	<p class="intro__role">{introCopy.role}</p>
	<p class="intro__lead">{introCopy.lead}</p>

	<div class="intro__cta">
		<a class="sm-btn sm-btn--solid" href={RESUME.href} download={RESUME.downloadName}>Resume (PDF)</a>
		<a class="sm-btn" href="mailto:{SITE.email}">{SITE.email}</a>
		<a class="sm-btn" href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
		<a class="sm-btn" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
	</div>

	<p class="intro__bio">{introCopy.bio}</p>

	<dl class="intro__facts">
		{#each introCopy.facts as fact}
			<dt>{fact.label}</dt>
			<dd>{fact.value}</dd>
		{/each}
	</dl>
</div>

<style>
	.intro {
		padding: 56px 0 40px;
	}
	h1 {
		margin: 0 0 6px;
		font-size: 40px;
		line-height: 1.1;
		letter-spacing: -0.02em;
		font-weight: 700;
	}
	.intro__role {
		margin: 0 0 20px;
		color: var(--sm-mute);
	}
	.intro__lead {
		max-width: 34em;
		margin: 0 0 24px;
	}
	.intro__cta {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 28px;
	}
	.intro__bio {
		max-width: 38em;
		margin: 0 0 24px;
		font-size: 15px;
		color: var(--sm-body);
	}
	.intro__facts {
		margin: 0;
		display: grid;
		grid-template-columns: 110px minmax(0, 1fr);
		gap: 6px 16px;
		font-size: 14px;
	}
	dt {
		font-family: var(--sm-mono);
		font-size: 12px;
		color: var(--sm-mute);
		padding-top: 2px;
	}
	dd {
		margin: 0;
	}
	@media (max-width: 640px) {
		.intro {
			padding-top: 36px;
		}
		h1 {
			font-size: 32px;
		}
		.intro__facts {
			grid-template-columns: 1fr;
			gap: 0;
		}
		dd {
			margin-bottom: 8px;
		}
	}
</style>
