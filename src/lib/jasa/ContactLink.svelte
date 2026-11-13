<script lang="ts">
	import { CONTACT_LABEL, WHATSAPP_NUMBER, contactHref, isWeb } from '$lib/data/jasa';
	import Icon from './Icon.svelte';

	let {
		message,
		label = CONTACT_LABEL,
		size = 'md',
		tone = 'solid'
	}: {
		message: string;
		label?: string;
		size?: 'md' | 'sm';
		tone?: 'solid' | 'light' | 'ghost';
	} = $props();

	const href = $derived(contactHref(message));
</script>

<a
	class="jz-btn"
	class:jz-btn--sm={size === 'sm'}
	class:jz-btn--light={tone === 'light'}
	class:jz-btn--ghost={tone === 'ghost'}
	{href}
	target={isWeb(href) ? '_blank' : undefined}
	rel={isWeb(href) ? 'noopener noreferrer' : undefined}
>
	<Icon name={WHATSAPP_NUMBER ? 'whatsapp' : 'mail'} />
	{label}
</a>
