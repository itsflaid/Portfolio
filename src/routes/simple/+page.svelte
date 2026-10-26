<script lang="ts">
	import { SITE } from "$lib/data/site";
	import { allProjects } from "$lib/data/project";
	import { smallerBuilds } from "$lib/data/builds";
	import { archiveCopy } from "$lib/simple/copy";
	import SimpleHeader from "$lib/simple/SimpleHeader.svelte";
	import SimpleIntro from "$lib/simple/SimpleIntro.svelte";
	import SimpleProjects from "$lib/simple/SimpleProjects.svelte";
	import SimpleExperience from "$lib/simple/SimpleExperience.svelte";
	import SimpleSkills from "$lib/simple/SimpleSkills.svelte";
	import SimpleFooter from "$lib/simple/SimpleFooter.svelte";

	const pageTitle = "Muhammad Fadil (Flaid) — Fullstack Developer";
	const pageDescription =
		"Quick view: Muhammad Fadil / Flaid — fullstack developer. All projects, experience, skills, resume and contact on one page.";
	const canonical = `${SITE.url}simple`;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="{SITE.url}og-image.png" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<SimpleHeader home />

<main class="sm-wrap">
	<SimpleIntro />

	<SimpleProjects id="projects" title="Projects" projects={allProjects} />

	<section class="sm-section" id="builds">
		<h2 class="sm-label">{archiveCopy.buildsTitle}</h2>
		<p class="sub">{archiveCopy.buildsSub}</p>
		<ul class="builds">
			{#each smallerBuilds as build}
				<li>
					<a href={build.href} target="_blank" rel="noopener noreferrer"
						>{build.name} <span>· {build.stack}</span></a
					>
				</li>
			{/each}
		</ul>
		<a class="btn" href={SITE.github} target="_blank" rel="noopener noreferrer">{archiveCopy.cta}</a>
	</section>

	<SimpleExperience />
	<SimpleSkills />
</main>

<SimpleFooter />

<style>
	.sub {
		margin: 0 0 16px;
		color: var(--sm-body);
	}
	.builds {
		list-style: none;
		margin: 0 0 20px;
		padding: 0;
	}
	.builds li {
		border-bottom: 1px solid var(--sm-line);
	}
	.builds a {
		display: block;
		padding: 12px 0;
		font-weight: 500;
		text-decoration: none;
	}
	.builds a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.builds span {
		font-family: var(--sm-mono);
		font-size: 12px;
		color: var(--sm-mute);
		font-weight: 400;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 10px 16px;
		font-size: 14px;
		font-weight: 500;
		border: 1px solid var(--sm-ink);
		text-decoration: none;
	}
	.btn:hover {
		background: var(--sm-soft);
	}
</style>
