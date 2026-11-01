<script lang="ts">
	import { CONTACT_LABEL, contactHref, isWeb } from '$lib/data/jasa';

	let {
		message,
		size = 'md',
		tone = 'solid'
	}: { message: string; size?: 'md' | 'sm'; tone?: 'solid' | 'light' } = $props();

	const href = $derived(contactHref(message));
</script>

<a
	class="jz-btn"
	class:jz-btn--sm={size === 'sm'}
	class:jz-btn--light={tone === 'light'}
	{href}
	target={isWeb(href) ? '_blank' : undefined}
	rel={isWeb(href) ? 'noopener noreferrer' : undefined}>{CONTACT_LABEL}</a
>
