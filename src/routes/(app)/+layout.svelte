<script lang="ts">
	import SmoothScroll from "$lib/components/layout/SmoothScroll.svelte";
	import SimpleViewCta from "$lib/components/SimpleViewCta.svelte";
</script>

<SmoothScroll>
	<slot />
</SmoothScroll>

<SimpleViewCta />
