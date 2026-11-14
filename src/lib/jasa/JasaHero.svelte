<script lang="ts">
	import { MESSAGES, heroSlides, webTemplates } from '$lib/data/jasa';
	import ContactLink from './ContactLink.svelte';
	import HeroCarousel from './HeroCarousel.svelte';

	const points = [
		{
			title: 'Website dari Template',
			text: `Pilih dari ${webTemplates.length} template siap pakai, tinggal isi dengan data usahamu.`
		},
		{
			title: 'Desain Custom',
			text: 'Tampilan dan fitur disesuaikan dengan karakter bisnismu.'
		},
		{
			title: 'Aplikasi Web',
			text: 'Kasir, booking, dan pencatatan yang mengikuti alur kerja usahamu.'
		}
	];
</script>

<section class="hero" id="top">
	<div class="jz-wrap hero__copy">
		<h1 class="hero__title" data-in="2">
			<span class="hero__serif">Bantu usahamu lebih </span>
			<span class="hero__bold">mudah ditemukan dan dihubungi pelanggan.</span>
		</h1>

		<p class="hero__lede" data-in="3">
			Saya Fadil, fullstack developer. Website dari template atau desain custom, dan aplikasi web
			yang mengikuti cara kerja bisnismu.
		</p>

		<div class="hero__actions" data-in="4">
			<ContactLink label="Konsultasi usahamu" message={MESSAGES.general} />
			<a class="jz-btn jz-btn--ghost" href="#template">Lihat template</a>
		</div>
	</div>

	<div class="hero__stage" data-in="3">
		<HeroCarousel slides={heroSlides} />
	</div>

	<ul class="jz-wrap hero__points">
		{#each points as p}
			<li>
				<h2 class="hero__pt">{p.title}</h2>
				<p>{p.text}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.hero {
		padding-block: clamp(2.5rem, 7vh, 5rem) clamp(3rem, 6vw, 5rem);
		text-align: center;
	}
	.hero__copy {
		display: grid;
		justify-items: center;
		gap: clamp(1.1rem, 2.4vh, 1.6rem);
	}
	.hero__title {
		display: grid;
		gap: 0.3rem;
		line-height: 1;
	}
	.hero__serif {
		font-family: var(--jz-serif);
		font-weight: 400;
		font-size: clamp(2.1rem, 5.6vw, 4.4rem);
		letter-spacing: -0.01em;
		text-wrap: balance;
	}
	.hero__bold {
		font-size: clamp(1.85rem, 4.7vw, 3.7rem);
		letter-spacing: -0.045em;
	}
	.hero__lede {
		max-width: 33rem;
		font-size: clamp(1.05rem, 1.6vw, 1.25rem);
		line-height: 1.5;
		color: var(--jz-muted);
	}
	.hero__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
	}
	.hero__stage {
		margin-block: clamp(1.5rem, 4vw, 3.5rem) clamp(1rem, 3vw, 2.5rem);
	}

	.hero__points {
		display: grid;
		gap: 1.5rem;
		max-width: 56rem;
		text-align: center;
	}
	.hero__points li {
		display: grid;
		gap: 0.4rem;
		padding-inline: 1rem;
	}
	.hero__pt {
		font-size: 1rem;
		letter-spacing: -0.01em;
	}
	.hero__points p {
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--jz-muted);
	}
	@media (min-width: 48rem) {
		.hero__points {
			grid-template-columns: repeat(3, 1fr);
			gap: 0;
		}
		.hero__points li + li {
			border-left: 1px solid var(--jz-rule);
		}
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
