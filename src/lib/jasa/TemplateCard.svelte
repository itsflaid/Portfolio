<script lang="ts">
	import { MESSAGES, contactHref, isWeb, type LandingTemplate } from '$lib/data/jasa';
	import Frame from './Frame.svelte';

	let { template }: { template: LandingTemplate } = $props();

	const pick = $derived(contactHref(MESSAGES.template(template.name)));
</script>

<article class="card">
	<Frame
		src={template.thumb}
		url={`template/${template.slug}`}
		alt={`Template landing page ${template.name}`}
		fallback={template.name}
		eager
	/>
	<div class="card__body">
		<div class="card__text">
			<h3 class="card__name">{template.name}</h3>
			<p class="card__niche">{template.niche}</p>
		</div>
		<div class="card__actions">
			{#if template.demo}
				<a class="card__demo" href={template.demo} target="_blank" rel="noopener noreferrer"
					>Demo ↗</a
				>
			{:else}
				<span class="card__soon">Demo menyusul</span>
			{/if}
			<a
				class="card__pick"
				href={pick}
				target={isWeb(pick) ? '_blank' : undefined}
				rel={isWeb(pick) ? 'noopener noreferrer' : undefined}>Pilih →</a
			>
		</div>
	</div>
</article>

<style>
	.card {
		display: grid;
		gap: 0.85rem;
		width: clamp(15.5rem, 28vw, 21rem);
		flex: 0 0 auto;
	}
	.card__body {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
		padding-inline: 0.15rem;
	}
	.card__name {
		font-size: 1.05rem;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}
	.card__niche {
		margin-top: 0.15rem;
		font-family: var(--jz-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--jz-muted);
	}
	.card__actions {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
		font-size: 0.875rem;
		white-space: nowrap;
	}
	.card__demo,
	.card__pick {
		font-weight: 500;
		color: var(--jz-ink);
		text-decoration: underline;
		text-decoration-color: var(--jz-rule-strong);
		text-decoration-thickness: 2px;
		text-underline-offset: 0.25em;
		transition: text-decoration-color 150ms ease;
	}
	.card__demo:hover,
	.card__pick:hover {
		text-decoration-color: var(--jz-ink);
	}
	.card__soon {
		font-size: 0.8125rem;
		color: var(--jz-muted);
	}
</style>
