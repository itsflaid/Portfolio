<script lang="ts">
	import { contactHref, isWeb, plans } from '$lib/data/jasa';
	import { reveal } from './reveal';
</script>

<section class="harga jz-section jz-wrap" id="harga" aria-labelledby="harga-title">
	<div class="jz-head" use:reveal>
		<p class="jz-kicker">Harga</p>
		<h2 class="jz-title" id="harga-title">Jelas dari awal.</h2>
		<p class="jz-lede">
			Biaya mengikuti ruang lingkup. Setelah diskusi, kamu menerima estimasi tertulis sebelum
			pengerjaan dimulai.
		</p>
	</div>

	<div class="plans">
		{#each plans as plan, i (`${plan.group}-${plan.name}`)}
			{@const href = contactHref(plan.message)}
			<article class="plan" class:plan--dark={plan.dark} use:reveal={i * 80}>
				<p class="plan__kicker">{plan.group}</p>
				<h3 class="plan__name">{plan.name}</h3>
				<p class="plan__for">{plan.for}</p>

				<div class="plan__price">
					{#if plan.price}
						<span class="plan__from">Mulai dari</span>
						<strong>{plan.price}</strong>
					{:else}
						<strong>{plan.priceNote}</strong>
					{/if}
				</div>

				<ul class="plan__items">
					{#each plan.items as item}
						<li>{item}</li>
					{/each}
				</ul>

				<a
					class="jz-btn"
					class:jz-btn--light={plan.dark}
					{href}
					target={isWeb(href) ? '_blank' : undefined}
					rel={isWeb(href) ? 'noopener noreferrer' : undefined}>{plan.cta}</a
				>
			</article>
		{/each}
	</div>
</section>

<style>
	.plans {
		display: grid;
		gap: 1rem;
		margin-top: clamp(2.5rem, 5vw, 4rem);
	}
	@media (min-width: 62rem) {
		.plans {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	.plan {
		display: grid;
		align-content: start;
		gap: 1.1rem;
		padding: clamp(1.6rem, 3.5vw, 2.4rem);
		border: 1px solid var(--jz-rule);
		border-radius: var(--jz-radius-lg);
		background: var(--jz-surface);
		box-shadow: var(--jz-shadow);
	}
	.plan--dark {
		border-color: var(--jz-night);
		background: var(--jz-night);
		color: var(--jz-night-text);
	}
	.plan__kicker {
		font-family: var(--jz-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--jz-muted);
	}
	.plan--dark .plan__kicker,
	.plan--dark .plan__for,
	.plan--dark .plan__from {
		color: var(--jz-night-muted);
	}
	.plan__name {
		margin-top: -0.6rem;
		font-size: clamp(1.6rem, 2.8vw, 2rem);
		line-height: 1.05;
	}
	.plan--dark .plan__name {
		color: #fff;
	}
	.plan__for {
		margin-top: -0.6rem;
		color: var(--jz-muted);
	}
	.plan__price {
		display: grid;
		gap: 0.1rem;
		padding-block: 1rem;
		border-block: 1px solid var(--jz-rule);
	}
	.plan--dark .plan__price {
		border-color: var(--jz-night-rule);
	}
	.plan__price strong {
		font-size: clamp(1.15rem, 2vw, 1.4rem);
		line-height: 1.05;
		letter-spacing: -0.04em;
		color: var(--jz-ink);
	}
	.plan--dark .plan__price strong {
		color: #fff;
	}
	.plan__from {
		font-size: 0.8125rem;
		color: var(--jz-muted);
	}
	.plan__items {
		display: grid;
		gap: 0.6rem;
	}
	.plan__items li {
		position: relative;
		padding-left: 1.5rem;
		font-size: 0.975rem;
		line-height: 1.5;
	}
	.plan__items li::before {
		content: '✓';
		position: absolute;
		left: 0;
		font-family: var(--jz-mono);
		font-size: 0.8125rem;
		color: var(--jz-muted);
	}
	.plan--dark .plan__items li::before {
		color: var(--jz-ok);
	}
	.plan .jz-btn {
		justify-self: start;
		margin-top: 0.4rem;
	}
</style>
