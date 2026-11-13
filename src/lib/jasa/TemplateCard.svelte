<script lang="ts">
	import { MESSAGES, type TemplateKind, type WebTemplate } from '$lib/data/jasa';
	import ContactLink from './ContactLink.svelte';
	import Icon from './Icon.svelte';
	import Frame from './Frame.svelte';

	let { template }: { template: WebTemplate } = $props();

	const KIND_ICON: Record<TemplateKind, 'briefcase' | 'building' | 'bag'> = {
		Jasa: 'briefcase',
		'Company profile': 'building',
		'Katalog produk/menu': 'bag'
	};
</script>

<article class="card">
	{#if template.demo}
		<a
			class="card__preview"
			href={template.demo}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`Lihat demo ${template.name} di tab baru`}
		>
			<Frame
				src={template.thumb}
				alt={`Template web ${template.name}`}
				fallback={template.name}
				ratio="2 / 1"
				chrome={false}
			/>
		</a>
	{:else}
		<Frame
			src={template.thumb}
			alt={`Template web ${template.name}`}
			fallback={template.name}
			ratio="2 / 1"
			chrome={false}
		/>
	{/if}

	<div class="card__body">
		<p class="card__kind">
			<Icon name={KIND_ICON[template.kind]} size="1em" />
			{template.kind}
		</p>
		<div class="card__text">
			<h3 class="card__name">{template.name}</h3>
			<p class="card__desc">{template.desc}</p>
		</div>
		<div class="card__actions">
			{#if template.demo}
				<a
					class="jz-btn jz-btn--sm"
					href={template.demo}
					target="_blank"
					rel="noopener noreferrer"
				>
					<Icon name="external" size="0.95em" />
					Lihat demo
				</a>
			{:else}
				<span class="jz-btn jz-btn--sm card__soon" aria-disabled="true">Demo menyusul</span>
			{/if}
			<ContactLink
				size="sm"
				tone="ghost"
				label="Tertarik"
				message={MESSAGES.template(template.name)}
			/>
		</div>
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		height: 100%;
	}
	.card__preview {
		display: block;
	}
	.card__preview :global(.frame) {
		transition:
			transform 200ms var(--jz-ease),
			border-color 150ms ease;
	}
	.card__preview:hover :global(.frame) {
		transform: translateY(-2px);
		border-color: var(--jz-rule-strong);
	}
	.card__body {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 0.75rem;
		padding-inline: 0.15rem;
	}
	.card__kind {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--jz-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--jz-muted);
	}
	.card__kind :global(svg) {
		flex: 0 0 auto;
		color: var(--jz-ink);
		opacity: 0.7;
	}
	.card__text {
		display: grid;
		gap: 0.3rem;
	}
	.card__name {
		font-size: 1.05rem;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}
	.card__desc {
		display: -webkit-box;
		overflow: hidden;
		font-size: 0.875rem;
		line-height: 1.5;
		color: var(--jz-muted);
		text-wrap: pretty;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.card__actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		margin-top: auto;
		padding-top: 0.15rem;
	}
	.card__actions :global(.jz-btn) {
		width: 100%;
		min-height: 2.75rem;
		padding-inline: 0.75rem;
		font-size: 0.8125rem;
	}
	@media (max-width: 39.99rem) {
		.card__desc {
			line-clamp: 3;
			-webkit-line-clamp: 3;
		}
	}
	.card__soon {
		opacity: 0.45;
		cursor: default;
	}
	.card__soon:hover {
		transform: none;
		background: var(--jz-ink);
	}
	@media (prefers-reduced-motion: reduce) {
		.card__preview :global(.frame) {
			transition: none;
		}
		.card__preview:hover :global(.frame) {
			transform: none;
		}
	}
</style>
