<script lang="ts">
	import { SITE } from '$lib/data/site';
	import { MESSAGES } from '$lib/data/jasa';
	import ContactLink from './ContactLink.svelte';
	import Icon from './Icon.svelte';
	import { reveal } from './reveal';

	const year = new Date().getFullYear();
</script>

<section class="cta jz-wrap" aria-labelledby="cta-title">
	<div class="cta__card" use:reveal>
		<h2 class="cta__title" id="cta-title">Ceritakan kebutuhanmu.</h2>
		<p class="cta__text">
			Satu pesan singkat cukup. Saya balas dengan gambaran dan estimasi, tanpa kewajiban lanjut.
		</p>
		<div class="cta__actions">
			<ContactLink tone="light" label="Konsultasi usahamu" message={MESSAGES.general} />
			<a class="jz-btn jz-btn--line" href={`mailto:${SITE.email}`}>
				<Icon name="mail" />
				{SITE.email}
			</a>
		</div>
	</div>
</section>

<footer class="foot jz-wrap">
	<p>© {year} {SITE.name}</p>
	<nav aria-label="Tautan">
		<a href="/" data-sveltekit-reload>Portfolio</a>
		<a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
		<a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
	</nav>
</footer>

<style>
	.cta {
		padding-bottom: var(--jz-space);
	}
	.cta__card {
		display: grid;
		justify-items: center;
		gap: 1.25rem;
		padding: clamp(2.5rem, 7vw, 5.5rem) clamp(1.25rem, 5vw, 4rem);
		border-radius: clamp(1.5rem, 4vw, 2.5rem);
		background:
			radial-gradient(60rem 22rem at 50% -10%, rgba(255, 255, 255, 0.07), transparent 70%),
			var(--jz-night);
		color: var(--jz-night-text);
		text-align: center;
	}
	.cta__title {
		max-width: 11em;
		font-size: clamp(2.4rem, 7vw, 5rem);
		line-height: 0.98;
		letter-spacing: -0.045em;
		color: #fff;
	}
	.cta__text {
		max-width: 30rem;
		color: var(--jz-night-muted);
	}
	.cta__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}
	.foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem 1.5rem;
		padding-block: 1.5rem 2.5rem;
		border-top: 1px solid var(--jz-rule);
		font-size: 0.875rem;
		color: var(--jz-muted);
	}
	.foot nav {
		display: flex;
		gap: 1.25rem;
	}
	.foot a:hover {
		color: var(--jz-ink);
	}
</style>
