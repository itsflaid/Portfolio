<script lang="ts">
	import { MESSAGES, webApps } from '$lib/data/jasa';
	import ContactLink from './ContactLink.svelte';
	import Frame from './Frame.svelte';
	import { reveal } from './reveal';
</script>

<section class="apps jz-section jz-wrap" id="webapp" aria-labelledby="webapp-title">
	<div class="jz-head" use:reveal>
		<h2 class="jz-title" id="webapp-title">Sistem yang mengikuti cara kerjamu.</h2>
		<p class="jz-lede">
			Contoh aplikasi yang saya bangun dari masalah nyata. Untuk bisnismu, alurnya kita tentukan
			bersama dari awal.
		</p>
	</div>

	<div class="list">
		{#each webApps as app, i (app.slug)}
			<article class="app" class:app--flip={i % 2 === 1} use:reveal>
				<div class="app__media">
					<Frame
						src={app.thumb}
						url={app.host}
						alt={`Tampilan aplikasi ${app.name}`}
						fallback={app.name}
					/>
				</div>

				<div class="app__copy">
					<p class="app__kind">{app.kind}</p>
					<h3 class="app__name">{app.name}</h3>
					<p class="app__tagline">{app.tagline}</p>
					{#if app.badge}<p class="app__badge">{app.badge}</p>{/if}

					<dl class="app__facts">
						<div>
							<dt>Cocok untuk</dt>
							<dd>{app.forWho}</dd>
						</div>
						<div>
							<dt>Masalah</dt>
							<dd>{app.problem}</dd>
						</div>
					</dl>

					<ul class="app__features">
						{#each app.features as feature}
							<li>{feature}</li>
						{/each}
					</ul>

					<div class="app__links">
						<ContactLink size="sm" message={MESSAGES.similar(app.name)} />
						{#if app.demo}
							<a
								class="jz-btn jz-btn--sm jz-btn--ghost"
								href={app.demo}
								target="_blank"
								rel="noopener noreferrer">Buka demo ↗</a
							>
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.list {
		display: grid;
		gap: clamp(3.5rem, 8vw, 6.5rem);
		margin-top: clamp(2.5rem, 5vw, 4rem);
	}
	.app {
		display: grid;
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
	}
	@media (min-width: 62rem) {
		.app {
			grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
			gap: clamp(2.5rem, 5vw, 5rem);
		}
		.app--flip .app__media {
			order: 2;
		}
	}
	.app__copy {
		display: grid;
		gap: 0.9rem;
		justify-items: start;
	}
	.app__name {
		font-size: clamp(2rem, 4vw, 3rem);
		line-height: 1;
	}
	.app__tagline {
		max-width: 30rem;
		font-size: 1.15rem;
		line-height: 1.45;
		color: var(--jz-text);
	}
	.app__badge {
		padding: 0.2rem 0.65rem;
		border: 1px solid var(--jz-rule-strong);
		border-radius: 999px;
		font-family: var(--jz-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--jz-muted);
	}
	.app__facts {
		display: grid;
		gap: 0.75rem;
		width: 100%;
		padding-block: 0.9rem;
		border-block: 1px solid var(--jz-rule);
	}
	.app__facts div {
		display: grid;
		gap: 0.1rem;
	}
	.app__facts dt {
		font-family: var(--jz-mono);
		font-size: 0.6875rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--jz-muted);
	}
	.app__facts dd {
		font-size: 0.975rem;
		line-height: 1.5;
	}
	.app__features {
		display: grid;
		gap: 0.45rem;
	}
	.app__features li {
		position: relative;
		padding-left: 1.35rem;
		font-size: 0.975rem;
		line-height: 1.5;
	}
	.app__features li::before {
		content: '';
		position: absolute;
		left: 0.15rem;
		top: 0.62em;
		width: 0.4rem;
		height: 0.4rem;
		background: var(--jz-ink);
	}
	.app__links {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem 0.75rem;
		margin-top: 0.4rem;
	}
	.app__kind {
		font-family: var(--jz-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--jz-muted);
	}
</style>
