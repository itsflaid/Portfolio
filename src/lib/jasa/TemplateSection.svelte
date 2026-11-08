<script lang="ts">
	import { MESSAGES, type WebTemplate } from '$lib/data/jasa';
	import ContactLink from './ContactLink.svelte';
	import MarqueeRow from './MarqueeRow.svelte';
	import { reveal } from './reveal';

	let { templates }: { templates: WebTemplate[] } = $props();

	const half = $derived(Math.ceil(templates.length / 2));
	const top = $derived(templates.slice(0, half));
	const bottom = $derived(templates.slice(half));
</script>

<section class="template jz-section" id="template" aria-labelledby="template-title">
	<div class="jz-wrap">
		<div class="jz-head" use:reveal>
			<h2 class="jz-title" id="template-title">Pilih gaya, bukan sekadar template.</h2>
			<p class="jz-lede">
				Tiap template punya karakter desain sendiri. Pilih yang paling cocok dengan kesan yang ingin
				dibangun usahamu, isinya kita sesuaikan.
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
			<ContactLink message={MESSAGES.landing} />
		</div>
	</div>
</section>

<style>
	.template {
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
