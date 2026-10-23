<script lang="ts">
	import "../app.css";
	import "$lib/neo/neo-global.css";
	import { onMount } from "svelte";
	import SmoothScroll from "$lib/components/layout/SmoothScroll.svelte";
	import { dev } from "$app/environment";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";
	import { theme, revealApp } from "$lib/theme";
	import NeoModeCta from "$lib/components/NeoModeCta.svelte";

	injectAnalytics({ mode: dev ? "development" : "production" });

	onMount(() => {
		// Page tree is already mounted for the saved theme; lift the pre-paint cover.
		requestAnimationFrame(revealApp);
	});
</script>

{#if $theme === "normal"}
	<NeoModeCta />
{/if}

{#key $theme}
	<SmoothScroll disabled={$theme === "neo"}>
		<slot />
	</SmoothScroll>
{/key}
