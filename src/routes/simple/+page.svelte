<script lang="ts">
	import { SITE } from "$lib/data/site";
	import { featuredProjects, allProjects } from "$lib/data/project";
	import SimpleHeader from "$lib/simple/SimpleHeader.svelte";
	import SimpleIntro from "$lib/simple/SimpleIntro.svelte";
	import SimpleProjects from "$lib/simple/SimpleProjects.svelte";
	import SimpleExperience from "$lib/simple/SimpleExperience.svelte";
	import SimpleSkills from "$lib/simple/SimpleSkills.svelte";
	import SimpleFooter from "$lib/simple/SimpleFooter.svelte";

	const pageTitle = "Muhammad Fadil (Flaid) — Fullstack Developer";
	const pageDescription =
		"Quick view: Muhammad Fadil / Flaid — fullstack developer. Featured projects, experience, skills, resume and contact on one page.";
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

	<SimpleProjects id="projects" title="Projects" projects={featuredProjects}>
		<a class="all" href="/simple/projects">All projects ({allProjects.length}) →</a>
	</SimpleProjects>

	<SimpleExperience />
	<SimpleSkills />
</main>

<SimpleFooter />

<style>
	.all {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		font-size: 14px;
		font-weight: 500;
	}
</style>
