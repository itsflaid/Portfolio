<script lang="ts">
	import { SITE } from "$lib/data/site";
	import { allProjects } from "$lib/data/project";
	import { smallerBuilds } from "$lib/data/builds";
	import SimpleHeader from "$lib/simple/SimpleHeader.svelte";
	import SimpleProjects from "$lib/simple/SimpleProjects.svelte";
	import SimpleFooter from "$lib/simple/SimpleFooter.svelte";
	import { archiveCopy } from "$lib/simple/copy";

	const pageTitle = "Projects — Muhammad Fadil (Flaid)";
	const pageDescription =
		"All projects by Muhammad Fadil / Flaid — DevMap, Katalyst, ChatMe, DevNote, DailyFit, Mufadz Portal, De Home Spa, Kasbon.in, plus smaller builds.";
	const canonical = `${SITE.url}simple/projects`;
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

<SimpleHeader home={false} />

<main class="sm-wrap">
	<div class="top">
		<a href="/simple">← Back</a>
	</div>

	<SimpleProjects title={archiveCopy.title} projects={allProjects} />

	<section class="sm-section">
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
</main>

<SimpleFooter />

<style>
	.top {
		padding: 28px 0 8px;
		font-size: 14px;
	}
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
