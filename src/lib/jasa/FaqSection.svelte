<script lang="ts">
	import { faqs } from '$lib/data/jasa';
	import { reveal } from './reveal';
</script>

<section class="faq jz-section jz-wrap" id="faq" aria-labelledby="faq-title">
	<div class="jz-head" use:reveal>
		<h2 class="jz-title" id="faq-title">Pertanyaan yang sering muncul.</h2>
	</div>

	<div class="list" use:reveal={60}>
		{#each faqs as item}
			<details class="item">
				<summary>
					<span>{item.q}</span>
					<i aria-hidden="true"></i>
				</summary>
				<p>{item.a}</p>
			</details>
		{/each}
	</div>
</section>

<style>
	.list {
		max-width: 46rem;
		margin: clamp(2.5rem, 5vw, 3.5rem) auto 0;
		border-top: 1px solid var(--jz-rule-strong);
	}
	.item {
		border-bottom: 1px solid var(--jz-rule-strong);
	}
	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.2rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--jz-ink);
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary i {
		position: relative;
		flex: 0 0 auto;
		width: 0.8rem;
		height: 0.8rem;
	}
	summary i::before,
	summary i::after {
		content: '';
		position: absolute;
		inset: 50% 0 auto;
		height: 2px;
		margin-top: -1px;
		background: var(--jz-ink);
		transition: rotate 200ms var(--jz-ease);
	}
	summary i::after {
		rotate: 90deg;
	}
	details[open] summary i::after {
		rotate: 0deg;
	}
	.item p {
		padding: 0 2rem 1.3rem 0;
		line-height: 1.6;
		color: var(--jz-muted);
	}
</style>
