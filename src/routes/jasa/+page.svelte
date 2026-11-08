<script lang="ts">
	import { SITE } from '$lib/data/site';
	import JasaHeader from '$lib/jasa/JasaHeader.svelte';
	import JasaHero from '$lib/jasa/JasaHero.svelte';
	import TemplateSection from '$lib/jasa/TemplateSection.svelte';
	import WebAppsSection from '$lib/jasa/WebAppsSection.svelte';
	import ProcessSection from '$lib/jasa/ProcessSection.svelte';
	import PricingSection from '$lib/jasa/PricingSection.svelte';
	import FaqSection from '$lib/jasa/FaqSection.svelte';
	import CtaFooter from '$lib/jasa/CtaFooter.svelte';

	let { data } = $props();

	const pageTitle = 'Jasa Pembuatan Website & Aplikasi Web — Flaid';
	const pageDescription =
		'Jasa pembuatan website dan aplikasi web untuk bisnis. Pilih dari template siap pakai atau bangun sistem sesuai alur kerja usahamu. Oleh Muhammad Fadil (Flaid).';
	const canonical = `${SITE.url}jasa`;

	const serviceLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfessionalService',
		name: 'Flaid — Jasa Pembuatan Website',
		url: canonical,
		areaServed: 'ID',
		serviceType: ['Pembuatan website', 'Pengembangan aplikasi web'],
		provider: { '@type': 'Person', name: SITE.name, url: SITE.url }
	};
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

	{@html `<script type="application/ld+json">${JSON.stringify(serviceLd)}</script>`}
</svelte:head>

<JasaHeader />

<main>
	<JasaHero />
	<TemplateSection templates={data.templates} />
	<WebAppsSection />
	<ProcessSection />
	<PricingSection />
	<FaqSection />
	<CtaFooter />
</main>
