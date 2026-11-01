<script lang="ts">
	import { faqs } from '$lib/data/jasa';
	import { reveal } from './reveal';

	let opened = $state<boolean[]>(faqs.map(() => false));
	const running = new Map<HTMLElement, Animation>();

	function toggle(e: MouseEvent, i: number) {
		e.preventDefault();
		const details = (e.currentTarget as HTMLElement).parentElement as HTMLDetailsElement;
		const body = details.querySelector<HTMLElement>('.item__body');
		if (!body) return;

		running.get(body)?.cancel();
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!opened[i]) {
			opened[i] = true;
			details.open = true;
			if (reduce) return;
			const h = body.offsetHeight;
			running.set(
				body,
				body.animate(
					[
						{ height: '0px', opacity: 0 },
						{ height: `${h}px`, opacity: 1 }
					],
					{ duration: 340, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
				)
			);
			return;
		}

		opened[i] = false;
		if (reduce) {
			details.open = false;
			return;
		}
		const h = body.offsetHeight;
		const anim = body.animate(
			[
				{ height: `${h}px`, opacity: 1 },
				{ height: '0px', opacity: 0 }
			],
			{ duration: 260, easing: 'ease', fill: 'forwards' }
		);
		running.set(body, anim);
		anim.onfinish = () => {
			details.open = false;
			anim.cancel();
		};
	}
</script>

<section class="faq jz-section jz-wrap" id="faq" aria-labelledby="faq-title">
	<div class="jz-head" use:reveal>
		<h2 class="jz-title" id="faq-title">Pertanyaan yang sering muncul.</h2>
	</div>

	<div class="list" use:reveal={60}>
		{#each faqs as item, i}
			<details class="item" class:is-open={opened[i]}>
				<summary onclick={(e) => toggle(e, i)}>
					<span>{item.q}</span>
					<i aria-hidden="true"></i>
				</summary>
				<div class="item__body">
					<p>{item.a}</p>
				</div>
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
	.item.is-open summary i::after {
		rotate: 0deg;
	}
	.item__body {
		overflow: hidden;
	}
	.item p {
		padding: 0 2rem 1.3rem 0;
		line-height: 1.6;
		color: var(--jz-muted);
	}
</style>
