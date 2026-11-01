<script lang="ts">
	import { siWhatsapp } from 'simple-icons';

	let { name, size = '1.05em' }: { name: 'whatsapp' | 'mail' | 'external'; size?: string } =
		$props();
</script>

{#if name === 'whatsapp'}
	<svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
		<path d={siWhatsapp.path} />
	</svg>
{:else}
	<svg
		viewBox="0 0 24 24"
		width={size}
		height={size}
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		{#if name === 'mail'}
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="m3 7 9 6 9-6" />
		{:else}
			<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
		{/if}
	</svg>
{/if}
