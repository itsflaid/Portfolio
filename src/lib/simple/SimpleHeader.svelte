<script lang="ts">
	import { RESUME } from '$lib/resume';
	import { introCopy } from './copy';

	let { home = true }: { home?: boolean } = $props();
</script>

<header class="bar">
	<div class="sm-wrap bar__in">
		<a class="bar__brand" href="/simple">{introCopy.name}</a>

		<nav class="bar__nav" aria-label="Primary">
			{#if home}
				<a href="#projects">Projects</a>
				<a href="#experience">Experience</a>
				<a href="#skills">Skills</a>
			{:else}
				<a href="/simple">Home</a>
			{/if}
			<a href={RESUME.href} download={RESUME.downloadName}>Resume</a>
			<a href={home ? '#contact' : '/simple#contact'}>Contact</a>
		</nav>

		<a class="bar__switch" href="/" data-sveltekit-reload>ANIMATED ↗</a>
	</div>
</header>

<style>
	.bar {
		position: sticky;
		top: 0;
		z-index: 20;
		background: var(--sm-bg);
		border-bottom: 1px solid var(--sm-line);
	}
	.bar__in {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		height: 56px;
	}
	.bar__brand {
		font-weight: 700;
		text-decoration: none;
		white-space: nowrap;
	}
	.bar__nav {
		display: flex;
		gap: 18px;
	}
	.bar__nav a {
		font-size: 14px;
		color: var(--sm-mute);
		text-decoration: none;
	}
	.bar__nav a:hover {
		color: var(--sm-ink);
	}
	.bar__switch {
		font-family: var(--sm-mono);
		font-size: 12px;
		padding: 7px 10px;
		border: 1px solid var(--sm-ink);
		text-decoration: none;
		white-space: nowrap;
	}
	.bar__switch:hover {
		background: var(--sm-ink);
		color: var(--sm-bg);
	}
	@media (max-width: 640px) {
		.bar__nav {
			display: none;
		}
	}
</style>
