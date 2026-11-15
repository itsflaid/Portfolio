<script lang="ts">
	import { SITE, sameAs } from '$lib/data/site';
	import { SITE_URL, OG_IMAGE, absoluteUrl, serializeJsonLd } from '$lib/seo';
	import { WHATSAPP_NUMBER, faqs, plans, services, webTemplates } from '$lib/data/jasa';
	import JasaHeader from '$lib/jasa/JasaHeader.svelte';
	import JasaHero from '$lib/jasa/JasaHero.svelte';
	import LayananPertanyaan from '$lib/jasa/layanan/LayananPertanyaan.svelte';
	import StudiKasusTeaser from '$lib/jasa/StudiKasusTeaser.svelte';
	import TemplateSection from '$lib/jasa/TemplateSection.svelte';
	import ProcessSection from '$lib/jasa/ProcessSection.svelte';
	import PricingSection from '$lib/jasa/PricingSection.svelte';
	import FaqSection from '$lib/jasa/FaqSection.svelte';
	import CtaFooter from '$lib/jasa/CtaFooter.svelte';

	let { data } = $props();

	const pageTitle = 'Jasa Pembuatan Website & Aplikasi Web untuk Bisnis — Flaid';
	const pageDescription = `Jasa pembuatan website & aplikasi web untuk bisnis di Samarinda & seluruh Indonesia. ${webTemplates.length} template siap pakai atau desain custom. Konsultasi gratis via WhatsApp.`;
	const canonical = absoluteUrl('jasa');
	const websiteId = `${SITE_URL}#website`;
	const personId = `${SITE_URL}#person`;
	const businessId = `${canonical}#business`;

	// Indeks mengikuti urutan plans dan services.
	const planPrices: Array<{ minPrice: number; maxPrice?: number }> = [
		{ minPrice: 300000 },
		{ minPrice: 500000, maxPrice: 2000000 },
		{ minPrice: 2000000 }
	];
	const serviceLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': personId,
				name: SITE.name,
				alternateName: ['Flaid', 'itsflaid'],
				jobTitle: 'Fullstack Developer',
				url: SITE_URL,
				email: `mailto:${SITE.email}`,
				image: OG_IMAGE.url,
				sameAs,
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Kutai Kartanegara',
					addressRegion: 'Kalimantan Timur',
					addressCountry: 'ID'
				},
				knowsAbout: [
					'Pembuatan website',
					'Pengembangan aplikasi web',
					'Web development',
					'SEO dasar'
				]
			},
			{
				'@type': 'ProfessionalService',
				'@id': businessId,
				name: 'Flaid — Jasa Pembuatan Website',
				description: pageDescription,
				url: canonical,
				image: OG_IMAGE.url,
				email: `mailto:${SITE.email}`,
				telephone: WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : undefined,
				priceRange: 'Rp300.000–Rp2.000.000+',
				founder: { '@id': personId },
				provider: { '@id': personId },
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Kutai Kartanegara',
					addressRegion: 'Kalimantan Timur',
					addressCountry: 'ID'
				},
				areaServed: [
					{ '@type': 'City', name: 'Samarinda' },
					{ '@type': 'City', name: 'Kutai Kartanegara' },
					{ '@type': 'Country', name: 'Indonesia' }
				],
				sameAs,
				knowsAbout: [
					'Jasa pembuatan website',
					'Website UMKM',
					'Website katalog',
					'Aplikasi web custom',
					'SEO dasar'
				],
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: 'Layanan pembuatan website dan aplikasi web',
					itemListElement: plans.map((plan, i) => {
						const price = planPrices[i] ?? { minPrice: 300000 };
						const service = services[i];
						const description = service?.desc ?? plan.for;

						return {
							'@type': 'Offer',
							name: plan.name,
							description,
							url: `${canonical}#harga`,
							priceCurrency: 'IDR',
							availability: 'https://schema.org/InStock',
							priceSpecification: {
								'@type': 'PriceSpecification',
								priceCurrency: 'IDR',
								minPrice: price.minPrice,
								...(price.maxPrice ? { maxPrice: price.maxPrice } : {})
							},
							itemOffered: {
								'@type': 'Service',
								name: plan.name,
								serviceType: plan.name,
								description,
								provider: { '@id': businessId },
								areaServed: { '@type': 'Country', name: 'Indonesia' }
							}
						};
					})
				}
			},
			{
				'@type': 'WebPage',
				'@id': `${canonical}#webpage`,
				url: canonical,
				name: pageTitle,
				description: pageDescription,
				isPartOf: { '@id': websiteId },
				about: { '@id': businessId },
				primaryImageOfPage: {
					'@type': 'ImageObject',
					url: OG_IMAGE.url,
					width: OG_IMAGE.width,
					height: OG_IMAGE.height,
					caption: OG_IMAGE.alt
				},
				breadcrumb: { '@id': `${canonical}#breadcrumb` },
				inLanguage: 'id-ID'
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${canonical}#breadcrumb`,
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Portfolio',
						item: SITE_URL
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: 'Jasa Pembuatan Website',
						item: canonical
					}
				]
			},
			{
				'@type': 'FAQPage',
				'@id': `${canonical}#faq`,
				mainEntity: faqs.map((item) => ({
					'@type': 'Question',
					name: item.q,
					acceptedAnswer: {
						'@type': 'Answer',
						text: item.a
					}
				}))
			}
		]
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="id_ID" />
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

	{@html `<script type="application/ld+json">${serializeJsonLd(serviceLd)}</script>`}
</svelte:head>

<JasaHeader />

<main>
	<JasaHero />
	<LayananPertanyaan />
	<StudiKasusTeaser />
	<TemplateSection templates={data.templates} />
	<ProcessSection />
	<PricingSection />
	<FaqSection />
	<CtaFooter />
</main>
