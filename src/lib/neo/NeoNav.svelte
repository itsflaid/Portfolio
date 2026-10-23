<script lang="ts">
	import { navLinks } from '$lib/data/site';
	import { setTheme } from '$lib/theme';
</script>

<header class="nn">
	<a class="nn__brand" href="/#top" aria-label="FLAID — home">
		<span class="nn__logo"><img src="/logo/logo-dark.png" alt="" draggable="false" /></span>
		<span class="nn__word">FLAID</span>
	</a>

	<nav class="nn__links" aria-label="Primary">
		{#each navLinks as link}
			<a href={`/${link.href}`}>{link.label}</a>
		{/each}
	</nav>

	<button type="button" class="nn__mode" onclick={() => setTheme('normal')}>
		<span class="nn__mode-dot" aria-hidden="true"></span>
		NORMAL MODE
	</button>
</header>

<style>
	.nn {
		position: sticky;
		top: 0;
		z-index: 40;
		display: flex;
		align-items: center;
		gap: 0.75rem 1.25rem;
		flex-wrap: wrap;
		padding: 0.7rem clamp(1rem, 3vw, 2.25rem);
		background: var(--n-paper);
		border-bottom: var(--n-border) solid var(--n-ink);
	}
	.nn__brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		margin-right: auto;
		color: var(--n-ink);
	}
	.nn__logo {
		display: grid;
		place-items: center;
		width: 2.6rem;
		height: 2.6rem;
		background: var(--n-yellow);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 3px 3px 0 var(--n-ink);
	}
	.nn__logo img {
		width: 1.55rem;
		height: 1.55rem;
		object-fit: contain;
	}
	.nn__word {
		font-family: 'Archivo Black', sans-serif;
		font-size: 1.35rem;
		letter-spacing: 0.01em;
		line-height: 1;
	}
	.nn__links {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.nn__links a {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.78rem;
		letter-spacing: 0.06em;
		color: var(--n-ink);
		padding: 0.4rem 0.7rem;
		border: 2px solid transparent;
		transition:
			background 0.12s steps(2),
			border-color 0.12s steps(2);
	}
	.nn__links a:hover {
		background: var(--n-yellow);
		border-color: var(--n-ink);
	}
	.nn__mode {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'Archivo Black', sans-serif;
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		color: var(--n-ink);
		background: var(--n-mint);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 4px 4px 0 var(--n-ink);
		padding: 0.5rem 0.85rem;
		cursor: pointer;
		transition:
			transform 0.1s steps(2),
			box-shadow 0.1s steps(2);
	}
	.nn__mode:hover {
		transform: translate(-2px, -2px);
		box-shadow: 6px 6px 0 var(--n-ink);
	}
	.nn__mode:active {
		transform: translate(3px, 3px);
		box-shadow: 1px 1px 0 var(--n-ink);
	}
	.nn__mode-dot {
		width: 0.7rem;
		height: 0.7rem;
		background: var(--n-ink);
		border-radius: 50%;
	}

	@media (max-width: 640px) {
		.nn__links {
			order: 3;
			width: 100%;
			gap: 0.25rem;
			overflow-x: auto;
		}
		.nn__word {
			font-size: 1.15rem;
		}
	}
</style>
