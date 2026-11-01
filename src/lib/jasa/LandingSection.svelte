<script lang="ts">
	import {
		CONTACT_LABEL,
		MESSAGES,
		contactHref,
		isWeb,
		type LandingTemplate
	} from '$lib/data/jasa';
	import MarqueeRow from './MarqueeRow.svelte';
	import { reveal } from './reveal';

	let { templates }: { templates: LandingTemplate[] } = $props();

	const half = $derived(Math.ceil(templates.length / 2));
	const top = $derived(templates.slice(0, half));
	const bottom = $derived(templates.slice(half));
	const cta = contactHref(MESSAGES.landing);
</script>

<section class="landing jz-section" id="landing" aria-labelledby="landing-title">
	<div class="jz-wrap">
		<div class="jz-head" use:reveal>
			<p class="jz-kicker">Landing Page</p>
			<h2 class="jz-title" id="landing-title">
				{templates.length} template, siap kamu pakai.
			</h2>
			<p class="jz-lede">
				Pilih yang paling dekat dengan bisnismu. Logo, warna, foto, dan teks disesuaikan, kamu
				tinggal kirim bahannya.
			</p>
		</div>
	</div>

	<div class="rows" use:reveal={80}>
		<MarqueeRow items={top} dir="left" />
		<MarqueeRow items={bottom} dir="right" />
	</div>

	<div class="jz-wrap">
		<div class="more" use:reveal>
			<p>Tidak ada yang pas? Template bisa diubah, atau saya buatkan dari nol.</p>
			<a
				class="jz-btn jz-btn--ghost"
				href={cta}
				target={isWeb(cta) ? '_blank' : undefined}
				rel={isWeb(cta) ? 'noopener noreferrer' : undefined}>{CONTACT_LABEL}</a
			>
		</div>
	</div>
</section>

<style>
	.landing {
		overflow: hidden;
	}
	.rows {
		display: grid;
		gap: clamp(1.5rem, 3vw, 2.25rem);
		margin-top: clamp(2.5rem, 5vw, 4rem);
	}
	.more {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 0.75rem 1.25rem;
		margin-top: clamp(2.5rem, 5vw, 3.5rem);
		text-align: center;
		color: var(--jz-muted);
	}
</style>
