<script lang="ts">
	import "../app.css";
	import SmoothScroll from "$lib/components/layout/SmoothScroll.svelte";
	import { dev } from "$app/environment";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";

	injectAnalytics({ mode: dev ? "development" : "production" });
</script>

<SmoothScroll>
	<slot />
</SmoothScroll>
