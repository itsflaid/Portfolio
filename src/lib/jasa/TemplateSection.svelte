<script lang="ts">
	import { MESSAGES, type TemplateKind, type WebTemplate } from '$lib/data/jasa';
	import ContactLink from './ContactLink.svelte';
	import TemplateCard from './TemplateCard.svelte';
	import { reveal } from './reveal';

	let { templates }: { templates: WebTemplate[] } = $props();

	const KINDS: Array<TemplateKind | 'Semua'> = [
		'Semua',
		'Jasa',
		'Company profile',
		'Katalog produk/menu'
	];

	let active = $state<TemplateKind | 'Semua'>('Semua');
	const filtered = $derived(
		active === 'Semua' ? templates : templates.filter((t) => t.kind === active)
	);
	const ctaSpan = $derived(filtered.length % 3 === 0 ? 3 : 3 - (filtered.length % 3));

	function countFor(kind: TemplateKind | 'Semua') {
		return kind === 'Semua' ? templates.length : templates.filter((t) => t.kind === kind).length;
	}
</script>

<section class="template jz-section" id="template" aria-labelledby="template-title">
	<div class="jz-wrap">
		<div class="head" use:reveal>
			<p class="eyebrow">Template siap pakai</p>
			<h2 class="jz-title" id="template-title">Pilih yang paling dekat dengan usahamu.</h2>
			<p class="lede">
				Lihat contohnya dulu. Kalau sudah cocok, logo, warna, foto, dan teksnya kita sesuaikan
				dengan bisnismu.
			</p>
		</div>

		<div class="toolbar" use:reveal={80}>
			<div class="filters" role="group" aria-label="Filter template berdasarkan jenis">
				{#each KINDS as kind}
					<button
						type="button"
						class="chip"
						class:chip--active={active === kind}
						aria-pressed={active === kind}
						aria-controls="template-grid"
						onclick={() => (active = kind)}
					>
						{kind}
						<span class="chip__count">{countFor(kind)}</span>
					</button>
				{/each}
			</div>
			<p class="count" aria-live="polite">Menampilkan {filtered.length} template</p>
		</div>

		<div class="grid" id="template-grid" use:reveal={120}>
			{#each filtered as template (template.slug)}
				<TemplateCard {template} />
			{/each}

			<div class="cta" style="--cta-span: {ctaSpan}">
				<p class="cta__eyebrow">Tidak ada yang pas?</p>
				<h3 class="cta__title">Template bisa diubah, atau saya buatkan dari nol.</h3>
				<p class="cta__text">
					Ceritakan usahamu. Saya bantu pilih gaya dan susun halamannya, tanpa istilah yang
					bikin bingung.
				</p>
				<ContactLink tone="light" label="Konsultasi gratis" message={MESSAGES.landing} />
			</div>
		</div>
	</div>
</section>

<style>
	.head {
		display: grid;
		gap: 1rem;
		max-width: 48rem;
	}
	.eyebrow {
		font-family: var(--jz-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--jz-muted);
	}
	.lede {
		max-width: 38rem;
		font-size: clamp(1.0625rem, 1.6vw, 1.2rem);
		line-height: 1.5;
		color: var(--jz-muted);
	}
	.toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem 1.5rem;
		margin-top: clamp(2rem, 4vw, 3rem);
	}
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		min-height: 2.75rem;
		padding: 0 0.95rem;
		border: 1px solid var(--jz-rule-strong);
		border-radius: 999px;
		background: var(--jz-surface);
		color: var(--jz-text);
		font: 500 0.875rem var(--jz-sans);
		cursor: pointer;
		transition:
			background 150ms ease,
			color 150ms ease,
			border-color 150ms ease;
	}
	.chip:hover {
		border-color: var(--jz-ink);
	}
	.chip--active {
		border-color: var(--jz-ink);
		background: var(--jz-ink);
		color: #fff;
	}
	.chip__count {
		font-family: var(--jz-mono);
		font-size: 0.6875rem;
		color: var(--jz-muted);
	}
	.chip--active .chip__count {
		color: rgba(255, 255, 255, 0.65);
	}
	.count {
		font-family: var(--jz-mono);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
		color: var(--jz-muted);
		white-space: nowrap;
	}
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1.75rem;
		margin-top: clamp(1.5rem, 3vw, 2rem);
	}
	.cta {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 0.85rem;
		padding: clamp(1.6rem, 3.5vw, 2.6rem);
		border-radius: var(--jz-radius-lg);
		background: var(--jz-night);
		color: var(--jz-night-text);
	}
	.cta .cta__eyebrow {
		font-family: var(--jz-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--jz-night-muted);
	}
	.cta .cta__title {
		max-width: 24rem;
		color: #fff;
		font-size: clamp(1.5rem, 2.6vw, 2rem);
		line-height: 1.08;
	}
	.cta .cta__text {
		max-width: 32rem;
		font-size: 0.975rem;
		line-height: 1.5;
	}
	.cta :global(.jz-btn) {
		margin-top: 0.4rem;
	}
	@media (min-width: 40rem) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 2rem;
		}
		.cta {
			grid-column: span 2;
		}
	}
	@media (min-width: 64rem) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 2.25rem 1.5rem;
		}
		.cta {
			grid-column: span var(--cta-span, 2);
		}
	}
</style>
