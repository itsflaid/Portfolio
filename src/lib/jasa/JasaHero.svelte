<script lang="ts">
	import { CONTACT_LABEL, MESSAGES, contactHref, isWeb, webApps } from '$lib/data/jasa';
	import Frame from './Frame.svelte';

	const cta = contactHref(MESSAGES.general);
	const back = webApps.find((a) => a.slug === 'katalyst');
	const front = webApps.find((a) => a.slug === 'de-home-spa');
</script>

<section class="hero jz-wrap" id="top">
	<div class="hero__copy">
		<h1 class="hero__title" data-in="2">
			Landing page &amp; sistem web<br />
			<span class="hero__soft">untuk bisnismu.</span>
		</h1>

		<p class="hero__lede" data-in="3">
			Saya Fadil, fullstack developer. Landing page dari template atau desain custom, dan aplikasi
			web yang mengikuti cara kerja bisnismu.
		</p>

		<div class="hero__actions" data-in="4">
			<a
				class="jz-btn"
				href={cta}
				target={isWeb(cta) ? '_blank' : undefined}
				rel={isWeb(cta) ? 'noopener noreferrer' : undefined}>{CONTACT_LABEL}</a
			>
			<a class="jz-btn jz-btn--ghost" href="#landing">Lihat template</a>
		</div>

		<p class="hero__note" data-in="5">
			Ceritakan kebutuhanmu dulu, nanti saya beri gambaran dan estimasi.
		</p>
	</div>

	<div class="hero__stage" data-in="3" aria-hidden="true">
		{#if back}
			<div class="hero__back">
				<Frame src={back.thumb} url={back.host} fallback={back.name} eager />
			</div>
		{/if}
		{#if front}
			<div class="hero__front">
				<Frame src={front.thumb} url={front.host} fallback={front.name} eager />
			</div>
		{/if}
	</div>
</section>

<style>
	.hero {
		display: grid;
		gap: clamp(2.5rem, 6vw, 4rem);
		align-items: center;
		padding-block: clamp(2.5rem, 7vh, 5rem) 0;
	}
	@media (min-width: 62rem) {
		.hero {
			grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
			gap: clamp(2.5rem, 5vw, 5rem);
		}
	}

	.hero__copy {
		display: grid;
		justify-items: start;
		gap: clamp(1.1rem, 2.4vh, 1.6rem);
	}
	.hero__title {
		font-size: clamp(2.6rem, min(6vw, 11vh), 5.25rem);
		line-height: 0.98;
		letter-spacing: -0.045em;
	}
	.hero__soft {
		color: var(--jz-muted);
	}
	.hero__lede {
		max-width: 33rem;
		font-size: clamp(1.1rem, 1.7vw, 1.3rem);
		line-height: 1.5;
		color: var(--jz-text);
	}
	.hero__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
	.hero__note {
		font-size: 0.875rem;
		color: var(--jz-muted);
	}

	.hero__stage {
		position: relative;
		aspect-ratio: 1.12 / 1;
		width: 100%;
	}
	.hero__back {
		position: absolute;
		top: 0;
		left: 0;
		width: 84%;
	}
	.hero__front {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 68%;
		filter: drop-shadow(0 24px 30px rgba(20, 19, 17, 0.18));
	}

	[data-in] {
		animation: rise 800ms var(--jz-ease) both;
	}
	[data-in='2'] {
		animation-delay: 100ms;
	}
	[data-in='3'] {
		animation-delay: 170ms;
	}
	[data-in='4'] {
		animation-delay: 240ms;
	}
	[data-in='5'] {
		animation-delay: 300ms;
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		[data-in] {
			animation: none;
		}
	}
</style>
