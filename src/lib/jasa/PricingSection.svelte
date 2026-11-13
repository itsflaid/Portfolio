<script lang="ts">
	import { plans } from '$lib/data/jasa';
	import ContactLink from './ContactLink.svelte';
	import { reveal } from './reveal';
</script>

<section class="harga jz-section jz-wrap" id="harga" aria-labelledby="harga-title">
	<div class="jz-head" use:reveal>
		<h2 class="jz-title" id="harga-title">Jelas dari awal.</h2>
		<p class="jz-lede">
			Biaya mengikuti ruang lingkup. Setelah diskusi, kamu menerima estimasi tertulis sebelum
			pengerjaan dimulai.
		</p>
	</div>

	<div class="plans">
		{#each plans as plan, i (plan.name)}
			<article class="plan" class:plan--featured={i === 1} use:reveal={i * 80}>
				<h3 class="plan__name">{plan.name}</h3>
				<p class="plan__for">{plan.for}</p>

				<dl class="plan__specs">
					{#each plan.specs as [k, v]}
						<div>
							<dt>{k}</dt>
							<dd>{v}</dd>
						</div>
					{/each}
				</dl>

				<ul class="plan__items">
					{#each plan.items as item}
						<li>{item}</li>
					{/each}
				</ul>

				<div class="plan__foot">
					<p class="plan__price">{plan.priceNote}</p>
					<ContactLink tone={i === 1 ? 'light' : 'solid'} message={plan.message} />
				</div>
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
	@media (min-width: 48rem) {
		.plans {
			max-width: 36rem;
			margin-inline: auto;
		}
	}
	@media (min-width: 64rem) {
		.plans {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			max-width: none;
		}
	}
	.plan {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
		padding: clamp(1.6rem, 3.5vw, 2.4rem);
		border: 1px solid var(--jz-rule);
		border-radius: var(--jz-radius-lg);
		background: var(--jz-surface);
		box-shadow: var(--jz-shadow);
	}
	/* paket tengah: latar gelap sebagai penanda, tanpa efek glow */
	.plan--featured {
		border-color: var(--jz-night);
		background: var(--jz-night);
		box-shadow: none;
		color: var(--jz-night-text);
	}
	.plan--featured .plan__name {
		color: #fff;
	}
	.plan--featured .plan__for {
		color: var(--jz-night-muted);
	}
	.plan--featured .plan__specs {
		border-color: var(--jz-night-rule);
	}
	.plan--featured .plan__specs div + div {
		border-color: var(--jz-night-rule);
	}
	.plan--featured .plan__specs dt {
		color: var(--jz-night-muted);
	}
	.plan--featured .plan__items li::before {
		color: var(--jz-night-muted);
	}
	.plan--featured .plan__price {
		color: #fff;
	}
	.plan__name {
		font-size: clamp(1.6rem, 2.8vw, 2rem);
		line-height: 1.05;
	}
	.plan__for {
		margin-top: -0.6rem;
		color: var(--jz-muted);
	}
	.plan__specs {
		display: grid;
		border-block: 1px solid var(--jz-rule);
	}
	.plan__specs div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 0.6rem;
		font-size: 0.9rem;
	}
	.plan__specs div + div {
		border-top: 1px solid var(--jz-rule);
	}
	.plan__specs dt {
		color: var(--jz-muted);
	}
	.plan__specs dd {
		text-align: right;
		font-weight: 500;
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
	.plan__foot {
		display: grid;
		gap: 0.9rem;
		margin-top: auto;
		padding-top: 0.6rem;
	}
	.plan__price {
		font-weight: 600;
		letter-spacing: -0.02em;
	}
	.plan__foot :global(.jz-btn) {
		justify-self: stretch;
	}
</style>
