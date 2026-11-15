<script lang="ts">
	import { page } from '$app/state';
	import JasaHeader from '$lib/jasa/JasaHeader.svelte';
	import JasaHero from '$lib/jasa/JasaHero.svelte';
	import LayananDaftar from '$lib/jasa/layanan/LayananDaftar.svelte';
	import LayananTangga from '$lib/jasa/layanan/LayananTangga.svelte';
	import LayananPertanyaan from '$lib/jasa/layanan/LayananPertanyaan.svelte';
	import LayananNota from '$lib/jasa/layanan/LayananNota.svelte';

	const v = $derived(page.params.v);
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<JasaHeader />

<main>
	<JasaHero />
	{#if v === 'a'}
		<LayananDaftar />
	{:else if v === 'b'}
		<LayananTangga />
	{:else if v === 'c'}
		<LayananPertanyaan />
	{:else if v === 'd'}
		<LayananNota />
	{/if}
</main>
