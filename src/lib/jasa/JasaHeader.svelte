<script lang="ts">
	import { MESSAGES } from '$lib/data/jasa';
	import ContactLink from './ContactLink.svelte';

	const links = [
		{ label: 'Website usaha', href: '#landing' },
		{ label: 'Sistem digital', href: '#webapp' },
		{ label: 'Proses', href: '#proses' },
		{ label: 'Harga', href: '#harga' },
		{ label: 'FAQ', href: '#faq' }
	];
</script>

<header class="bar">
	<div class="jz-wrap bar__in">
		<a class="bar__brand" href="#top" aria-label="Flaid, ke atas">
			<span class="bar__mark">FLAID</span>
		</a>

		<nav class="bar__nav" aria-label="Bagian halaman">
			{#each links as link}
				<a href={link.href}>{link.label}</a>
			{/each}
		</nav>

		<div class="bar__right">
			<a class="bar__back" href="/" data-sveltekit-reload>← Portfolio</a>
			<ContactLink size="sm" message={MESSAGES.general} />
		</div>
	</div>
</header>

<style>
	.bar {
		position: sticky;
		top: 0;
		z-index: 30;
		height: var(--jz-header);
		border-bottom: 1px solid var(--jz-rule);
		background: color-mix(in srgb, var(--jz-paper) 88%, transparent);
		backdrop-filter: saturate(1.4) blur(12px);
		-webkit-backdrop-filter: saturate(1.4) blur(12px);
	}
	.bar__in {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.25rem;
		height: 100%;
	}
	.bar__brand {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		white-space: nowrap;
	}
	.bar__mark {
		font-weight: 800;
		letter-spacing: 0.04em;
		color: var(--jz-ink);
	}
	.bar__nav {
		display: none;
		gap: 1.6rem;
	}
	.bar__nav a {
		font-size: 0.9375rem;
		color: var(--jz-muted);
		transition: color 150ms ease;
	}
	.bar__nav a:hover {
		color: var(--jz-ink);
	}
	.bar__right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.bar__back {
		display: none;
		font-size: 0.875rem;
		color: var(--jz-muted);
	}
	.bar__back:hover {
		color: var(--jz-ink);
	}
	@media (min-width: 52rem) {
		.bar__nav {
			display: flex;
		}
	}
	@media (min-width: 34rem) {
		.bar__back {
			display: inline;
		}
	}
</style>
