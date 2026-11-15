<script lang="ts">
	import { MESSAGES } from '$lib/data/jasa';
	import { katalyst as k } from '$lib/data/studiKasus';
	import { OG_IMAGE, SITE_URL, absoluteUrl, serializeJsonLd } from '$lib/seo';
	import ContactLink from '$lib/jasa/ContactLink.svelte';
	import CtaFooter from '$lib/jasa/CtaFooter.svelte';
	import Frame from '$lib/jasa/Frame.svelte';
	import Icon from '$lib/jasa/Icon.svelte';
	import JasaHeader from '$lib/jasa/JasaHeader.svelte';
	import LoopVideo from '$lib/jasa/LoopVideo.svelte';
	import { reveal } from '$lib/jasa/reveal';

	const canonical = absoluteUrl('jasa/studi-kasus/katalyst');
	const pageTitle = 'Katalyst: Studi Kasus Sistem Digital untuk UMKM — Flaid';
	const pageDescription =
		'Studi kasus Katalyst, aplikasi web pendukung keputusan untuk UMKM: dashboard untung-rugi, simulator harga, dan Copilot. Proyek lomba OASE PTKIN III 2026.';

	const ld = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebPage',
				'@id': `${canonical}#webpage`,
				url: canonical,
				name: pageTitle,
				description: pageDescription,
				inLanguage: 'id-ID',
				isPartOf: { '@id': `${SITE_URL}#website` },
				breadcrumb: { '@id': `${canonical}#breadcrumb` }
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${canonical}#breadcrumb`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Portfolio', item: SITE_URL },
					{
						'@type': 'ListItem',
						position: 2,
						name: 'Jasa Pembuatan Website',
						item: absoluteUrl('jasa')
					},
					{ '@type': 'ListItem', position: 3, name: 'Katalyst', item: canonical }
				]
			}
		]
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="article" />
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

	{@html `<script type="application/ld+json">${serializeJsonLd(ld)}</script>`}
</svelte:head>

<JasaHeader base="/jasa" />

<main>
	<section class="hero jz-wrap" id="top">
		<div class="hero__copy" use:reveal>
			<a class="back" href="/jasa#contoh-sistem">← Kembali ke Jasa</a>
			<p class="kicker">{k.kicker}</p>
			<h1 class="hero__title">{k.title}</h1>
			<p class="jz-lede">{k.lede}</p>

			<div class="actions">
				<a class="jz-btn" href={k.demoUrl} target="_blank" rel="noopener noreferrer">
					Coba demo (data dummy)
					<Icon name="external" />
				</a>
				<a
					class="jz-btn jz-btn--ghost"
					href={k.repoUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					Lihat kode
					<Icon name="external" />
				</a>
			</div>
		</div>

		<div class="stage" use:reveal={80}>
			<Frame ratio="4 / 3" url="Katalyst · versi demo">
				<LoopVideo
					src={k.video}
					poster={k.poster}
					label="Rekaman layar Katalyst dengan data dummy: dashboard, statistik, dan simulator harga"
				/>
			</Frame>
		</div>
	</section>

	<section class="jz-section jz-wrap" id="cerita" aria-labelledby="cerita-title">
		<div class="jz-head" use:reveal>
			<h2 class="jz-title" id="cerita-title">Dari catatan yang tidak bicara ke keputusan.</h2>
		</div>

		<div class="cols cols--3">
			{#each k.story as s, i (s.title)}
				<article class="card" use:reveal={i * 70}>
					<span class="card__num">0{i + 1}</span>
					<h3 class="card__title">{s.title}</h3>
					<p class="card__text">{s.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="jz-section jz-wrap" id="fitur" aria-labelledby="fitur-title">
		<div class="jz-head" use:reveal>
			<h2 class="jz-title" id="fitur-title">Empat bagian yang dipakai harian.</h2>
		</div>

		<div class="cols cols--2">
			{#each k.features as f, i (f.title)}
				<article class="card" use:reveal={i * 70}>
					<span class="card__num">0{i + 1}</span>
					<h3 class="card__title">{f.title}</h3>
					<p class="card__text">{f.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="jz-section jz-wrap" id="versi" aria-labelledby="versi-title">
		<div class="jz-head" use:reveal>
			<h2 class="jz-title" id="versi-title">Dua versi: demo dan mitra.</h2>
			<p class="jz-lede">
				Yang bisa kamu coba memakai data dummy. Data usaha nyata tetap milik mitra dan tidak
				dibuka.
			</p>
		</div>

		<div class="cols cols--2">
			{#each k.versions as v, i (v.title)}
				<article class="card" use:reveal={i * 80}>
					<span class="badge">{v.badge}</span>
					<h3 class="card__title">{v.title}</h3>
					<p class="card__text">{v.text}</p>
					{#if i === 0}
						<a
							class="jz-btn jz-btn--ghost card__btn"
							href={k.demoUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							Coba demo
							<Icon name="external" />
						</a>
					{/if}
				</article>
			{/each}
		</div>
	</section>

	<section class="jz-section jz-wrap" id="tepercaya" aria-labelledby="tepercaya-title">
		<div class="trust" use:reveal>
			<h2 class="trust__title jz-title" id="tepercaya-title">Kenapa angkanya bisa dipercaya.</h2>

			<ul class="trust__list">
				{#each k.trust as t}
					<li>
						<h3 class="trust__item">{t.title}</h3>
						<p>{t.text}</p>
					</li>
				{/each}
			</ul>

			<ul class="stack" aria-label="Teknologi yang dipakai">
				{#each k.stack as s}
					<li>{s}</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="note jz-wrap" id="catatan" aria-labelledby="catatan-title">
		<div class="note__box" use:reveal>
			<h2 class="note__title" id="catatan-title">Catatan jujur</h2>
			<p>{k.note}</p>
			<div class="actions actions--start">
				<a class="jz-btn jz-btn--ghost" href="/jasa#harga">Lihat rincian harga</a>
				<ContactLink message={MESSAGES.katalyst} label="Konsultasi sistem usahamu" />
			</div>
		</div>
	</section>

	<CtaFooter message={MESSAGES.katalyst} />
</main>

<style>
	.hero {
		padding-block: clamp(2rem, 6vh, 4rem) clamp(2.5rem, 5vw, 4rem);
		text-align: center;
	}
	.hero__copy {
		display: grid;
		justify-items: center;
		gap: clamp(1rem, 2.2vh, 1.5rem);
	}
	.back {
		font-size: 0.875rem;
		color: var(--jz-muted);
	}
	.back:hover {
		color: var(--jz-ink);
	}
	.kicker {
		font-family: var(--jz-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--jz-muted);
	}
	.hero__title {
		max-width: 13em;
		font-size: clamp(2.4rem, 6.4vw, 4.8rem);
		line-height: 0.98;
		letter-spacing: -0.045em;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
	}
	.actions--start {
		justify-content: flex-start;
	}
	.stage {
		max-width: 48rem;
		margin: clamp(2rem, 5vw, 3.5rem) auto 0;
	}

	.cols {
		display: grid;
		gap: 1rem;
		margin-top: clamp(2.5rem, 5vw, 4rem);
	}
	@media (min-width: 48rem) {
		.cols--2 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (min-width: 62rem) {
		.cols--3 {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	.card {
		display: grid;
		align-content: start;
		gap: 0.7rem;
		padding: clamp(1.4rem, 3vw, 1.9rem);
		border: 1px solid var(--jz-rule);
		border-radius: var(--jz-radius-lg);
		background: var(--jz-surface);
	}
	.card__num {
		font-family: var(--jz-mono);
		font-size: 0.8125rem;
		color: var(--jz-muted);
	}
	.card__title {
		font-size: 1.35rem;
		letter-spacing: -0.03em;
	}
	.card__text {
		font-size: 0.975rem;
		line-height: 1.55;
		color: var(--jz-muted);
	}
	.card__btn {
		justify-self: start;
		margin-top: 0.4rem;
	}
	.badge {
		justify-self: start;
		padding: 0.2rem 0.7rem;
		border: 1px solid var(--jz-rule-strong);
		border-radius: 999px;
		font-family: var(--jz-mono);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		color: var(--jz-ink);
	}

	.trust {
		display: grid;
		gap: clamp(1.75rem, 4vw, 2.75rem);
		padding: clamp(2rem, 5vw, 4rem);
		border-radius: clamp(1.5rem, 4vw, 2.5rem);
		background: var(--jz-night);
		color: var(--jz-night-text);
	}
	.trust__title {
		max-width: 12em;
		color: #fff;
	}
	.trust__list {
		display: grid;
		gap: 1.75rem;
	}
	@media (min-width: 52rem) {
		.trust__list {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: clamp(1.5rem, 3vw, 2.5rem);
		}
	}
	.trust__list li {
		display: grid;
		align-content: start;
		gap: 0.5rem;
		padding-top: 1.1rem;
		border-top: 1px solid var(--jz-night-rule);
	}
	.trust__item {
		font-size: 1.15rem;
		letter-spacing: -0.02em;
		color: #fff;
	}
	.trust__list p {
		font-size: 0.95rem;
		line-height: 1.55;
	}
	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.stack li {
		padding: 0.3rem 0.8rem;
		border: 1px solid var(--jz-night-rule);
		border-radius: 999px;
		font-family: var(--jz-mono);
		font-size: 0.75rem;
		color: var(--jz-night-muted);
	}

	.note {
		padding-bottom: var(--jz-space);
	}
	.note__box {
		display: grid;
		gap: 1rem;
		max-width: 46rem;
		margin-inline: auto;
		padding: clamp(1.5rem, 4vw, 2.25rem);
		border: 1px solid var(--jz-rule-strong);
		border-radius: var(--jz-radius-lg);
		background: var(--jz-surface);
	}
	.note__title {
		font-size: 1.35rem;
		letter-spacing: -0.03em;
	}
	.note__box p {
		line-height: 1.6;
	}
</style>
