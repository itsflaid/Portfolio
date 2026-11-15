<script lang="ts">
	import "../app.css";
	import { dev } from "$app/environment";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";
	import { SITE } from "$lib/data/site";
	import { SITE_URL, serializeJsonLd } from "$lib/seo";

	injectAnalytics({ mode: dev ? "development" : "production" });

	const websiteLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${SITE_URL}#website`,
		url: SITE_URL,
		name: "Flaid — Muhammad Fadil",
		alternateName: ["Muhammad Fadil", "Flaid", "itsflaid"],
		description:
			"Portfolio dan layanan pembuatan website serta aplikasi web oleh Muhammad Fadil (Flaid).",
		publisher: {
			"@type": "Person",
			"@id": `${SITE_URL}#person`,
			name: SITE.name,
			url: SITE_URL
		}
	};
</script>

<svelte:head>
	<meta name="author" content="Muhammad Fadil (Flaid)" />
	<meta
		name="robots"
		content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
	/>
	<meta property="og:site_name" content="Flaid — Muhammad Fadil" />
	<meta name="theme-color" content="#ffffff" />
	{@html `<script type="application/ld+json">${serializeJsonLd(websiteLd)}</script>`}
</svelte:head>

<slot />
