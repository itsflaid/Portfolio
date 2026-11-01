<script lang="ts">
	import { processSteps } from '$lib/data/jasa';
	import { reveal } from './reveal';
</script>

<section class="proses jz-section jz-wrap" id="proses" aria-labelledby="proses-title">
	<div class="jz-head" use:reveal>
		<h2 class="jz-title" id="proses-title">Dari obrolan sampai online.</h2>
	</div>

	<ol class="steps">
		{#each processSteps as step, i}
			<li class="step" use:reveal={i * 70}>
				<span class="step__num">0{i + 1}</span>
				<h3 class="step__title">{step.title}</h3>
				<p class="step__text">{step.text}</p>
			</li>
		{/each}
	</ol>
</section>

<style>
	.steps {
		display: grid;
		gap: 1rem;
		margin: clamp(2.5rem, 5vw, 4rem) 0 0;
		padding: 0;
		list-style: none;
	}
	@media (min-width: 40rem) {
		.steps {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (min-width: 62rem) {
		.steps {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
	.step {
		display: grid;
		align-content: start;
		gap: 0.6rem;
		padding: 1.5rem;
		border: 1px solid var(--jz-rule);
		border-radius: var(--jz-radius-lg);
		background: var(--jz-surface);
	}
	.step__num {
		font-family: var(--jz-mono);
		font-size: 0.8125rem;
		color: var(--jz-muted);
	}
	.step__title {
		font-size: 1.35rem;
		letter-spacing: -0.03em;
	}
	.step__text {
		font-size: 0.975rem;
		line-height: 1.55;
		color: var(--jz-muted);
	}
</style>
