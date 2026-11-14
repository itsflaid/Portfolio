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
					class="card__demo"
					href={template.demo}
					target="_blank"
					rel="noopener noreferrer"
				>
					Lihat demo
					<Icon name="external" size="0.9em" />
				</a>
			{:else}
				<span class="card__soon">Demo menyusul</span>
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
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem 1rem;
		margin-top: auto;
		padding-top: 0.9rem;
		border-top: 1px solid var(--jz-rule);
	}
	.card__demo {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		min-height: 2.45rem;
		padding: 0 1.05rem;
		border: 1px solid var(--jz-ink);
		border-radius: 999px;
		background: var(--jz-ink);
		color: #fff;
		font: 500 0.8125rem var(--jz-sans);
		white-space: nowrap;
		transition:
			background 150ms ease,
			transform 180ms var(--jz-ease);
	}
	.card__demo:hover {
		background: #000;
		transform: translateY(-1px);
	}
	.card__demo :global(svg) {
		opacity: 0.75;
		transition: transform 180ms var(--jz-ease);
	}
	.card__demo:hover :global(svg) {
		transform: translate(1px, -1px);
	}
	.card__soon {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-family: var(--jz-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--jz-muted);
	}
	.card__soon::before {
		content: '';
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: var(--jz-taupe);
	}
	.card__actions :global(.jz-btn--ghost) {
		min-height: 2.45rem;
		padding: 0 0.2rem;
		border-color: transparent;
		background: transparent;
		color: var(--jz-muted);
		font-size: 0.8125rem;
	}
	.card__actions :global(.jz-btn--ghost:hover) {
		border-color: transparent;
		background: transparent;
		color: var(--jz-ink);
		transform: none;
	}
	@media (max-width: 39.99rem) {
		.card__desc {
			line-clamp: 3;
			-webkit-line-clamp: 3;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.card__preview :global(.frame) {
			transition: none;
		}
		.card__preview:hover :global(.frame) {
			transform: none;
		}
		.card__demo,
		.card__demo :global(svg) {
			transition: none;
		}
		.card__demo:hover,
		.card__demo:hover :global(svg) {
			transform: none;
		}
	}
</style>
