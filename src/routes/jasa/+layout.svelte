<script lang="ts">
	import '$lib/jasa/jasa.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Class jz--js baru dipasang setelah hydrate, jadi tanpa JS konten tetap terlihat (lihat .rv di jasa.css).
	let js = $state(false);
	onMount(() => (js = true));
</script>

<div class="jz" class:jz--js={js}>
	{@render children()}
</div>
