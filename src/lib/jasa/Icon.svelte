<script lang="ts">
	import { siWhatsapp } from 'simple-icons';

	type IconName = 'whatsapp' | 'mail' | 'external' | 'briefcase' | 'building' | 'bag';

	let { name, size = '1.05em' }: { name: IconName; size?: string } = $props();
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
		{:else if name === 'briefcase'}
			<rect x="3" y="7" width="18" height="13" rx="2" />
			<path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
			<path d="M3 12h18" />
		{:else if name === 'building'}
			<rect x="4" y="3" width="16" height="18" rx="1" />
			<path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
			<path d="M10 21v-3h4v3" />
		{:else if name === 'bag'}
			<path d="M5 8h14l1 12H4L5 8Z" />
			<path d="M9 8V6a3 3 0 0 1 6 0v2" />
		{:else}
			<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
		{/if}
	</svg>
{/if}
