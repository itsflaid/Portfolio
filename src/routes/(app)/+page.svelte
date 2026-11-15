<script lang="ts">
import { SITE, sameAs } from "$lib/data/site";
import { SITE_URL, OG_IMAGE, absoluteUrl, serializeJsonLd } from "$lib/seo";
import Grain from "$lib/components/layout/Grain.svelte";
import Nav from "$lib/components/Nav.svelte";
import Hero from "$lib/components/sections/Hero.svelte";
import About from "$lib/components/sections/About.svelte";
import Projects from "$lib/components/sections/Projects.svelte";
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
	"Portfolio of Muhammad Fadil (Flaid), a fullstack developer in East Kalimantan building DevMap, DevNote, ChatMe, and other web apps.";
const canonical = absoluteUrl("");

const personLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	"@id": `${SITE_URL}#person`,
	name: SITE.name,
	alternateName: ["Flaid", "itsflaid"],
	description: pageDescription,
	jobTitle: "Fullstack Developer",
	url: SITE_URL,
	email: `mailto:${SITE.email}`,
	image: OG_IMAGE.url,
	sameAs,
	address: {
		"@type": "PostalAddress",
		addressLocality: "Kutai Kartanegara",
		addressRegion: "Kalimantan Timur",
		addressCountry: "ID"
	},
	knowsAbout: [
		"Web development",
		"Fullstack development",
		"Frontend development",
		"Backend development",
		"Web applications"
	]
};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={OG_IMAGE.url} />
	<meta property="og:image:width" content={String(OG_IMAGE.width)} />
	<meta property="og:image:height" content={String(OG_IMAGE.height)} />
	<meta property="og:image:alt" content={OG_IMAGE.alt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={OG_IMAGE.url} />
	<meta name="twitter:image:alt" content={OG_IMAGE.alt} />

	{@html `<script type="application/ld+json">${serializeJsonLd(personLd)}</script>`}
</svelte:head>

<Grain />
<Nav />
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
