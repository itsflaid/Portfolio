<script lang="ts">
	import '$lib/jasa/jasa.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	// reveal hanya aktif kalau JS jalan
	let js = $state(false);
	onMount(() => (js = true));
</script>

<div class="jz" class:jz--js={js}>
	{@render children()}
</div>
