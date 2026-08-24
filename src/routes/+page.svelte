<script lang="ts">
import { SITE, sameAs } from "$lib/data/site";
import Grain from "$lib/components/layout/Grain.svelte";
import Nav from "$lib/components/Nav.svelte";
import Hero from "$lib/components/sections/Hero.svelte";
import About from "$lib/components/sections/About.svelte";
import Projects from "$lib/components/sections/Projects.svelte";
// import ScrollModeToggle from "$lib/components/ScrollModeToggle.svelte";
import Manifesto from "$lib/components/sections/Manifesto.svelte";
import Marquee from "$lib/components/sections/Marquee.svelte";
import Experience from "$lib/components/sections/Experience.svelte";
import Skills from "$lib/components/sections/Skills.svelte";
import GithubActivity from "$lib/components/sections/GithubActivity.svelte";
import Contact from "$lib/components/sections/Contact.svelte";
import ResumeModal from "$lib/components/modals/ResumeModal.svelte";
import CaseStudyModal from "$lib/components/modals/CaseStudyModal.svelte";
import TechModal from "$lib/components/modals/TechModal.svelte";

const pageTitle = "Muhammad Fadil (Flaid) — Fullstack Developer";
const pageDescription =
	"Portfolio Muhammad Fadil / Flaid — fullstack developer membangun DevMap, DevNote, ChatMe, dan tools / aplikasi lain.";

const personLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: SITE.name,
	alternateName: ["Flaid", "itsflaid", "mufacoderz"],
	jobTitle: "Fullstack Developer",
	url: SITE.url,
	email: `mailto:${SITE.email}`,
	sameAs
};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={SITE.url} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={SITE.url} />
	<meta property="og:image" content="{SITE.url}/og-image.png" />
	<meta name="twitter:card" content="summary_large_image" />

	{@html `<script type="application/ld+json">${JSON.stringify(personLd)}</script>`}
</svelte:head>

<Grain />
<Nav />
<!-- <ScrollModeToggle /> -->
<Hero />
<About />
<Experience />
<div class="desktop-only">
    <Manifesto />
</div>
<Marquee />
<Projects />
<Skills />
<GithubActivity />

<Contact />
<ResumeModal />
<CaseStudyModal />
<TechModal />

<style>
	.desktop-only {
		display: block;
	}

	@media (max-width: 767px) {
		.desktop-only {
			display: none;
		}
	}
</style>