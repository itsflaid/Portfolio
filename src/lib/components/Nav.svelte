<script lang="ts">
	import { onMount } from 'svelte';
	import { scrollToTarget } from '$lib/scroll';

	let open = false;

	function go(e: MouseEvent, href: string) {
		e.preventDefault();
		open = false;
		scrollToTarget(href);
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
	}

	onMount(() => {
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

<nav class="nav">
	<span class="nav__mark">FLAID</span>
	<div class="nav__links">
		<a href="#work" onclick={(e) => go(e, '#work')}>Work</a>
		<a href="#contact" onclick={(e) => go(e, '#contact')}>Contact</a>
	</div>
	<button
		class="nav__burger"
		class:nav__burger--open={open}
		aria-label="Toggle menu"
		aria-expanded={open}
		onclick={() => (open = !open)}
	>
		<i></i><i></i><i></i>
	</button>
</nav>

{#if open}
	<div class="nav__menu">
		<a href="#work" onclick={(e) => go(e, '#work')}>Work</a>
		<a href="#contact" onclick={(e) => go(e, '#contact')}>Contact</a>
	</div>
{/if}

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: clamp(1.25rem, 3vw, 2.5rem) clamp(1.5rem, 5vw, 4rem);
		font-family: var(--ff-body);
		font-weight: 500;
		font-size: 0.95rem;
		color: #ffffff;
		mix-blend-mode: difference;
	}
	.nav__mark {
		font-weight: 700;
	}
	.nav__links {
		display: flex;
		gap: 2rem;
	}
	.nav__links a {
		position: relative;
		color: inherit;
		text-decoration: none;
	}
	.nav__links a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -4px;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.3s ease;
	}
	.nav__links a:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}
	.nav__burger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		width: 28px;
		height: 28px;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
	}
	.nav__burger i {
		display: block;
		height: 2px;
		width: 100%;
		background: #ffffff;
		transition: transform 0.3s ease, opacity 0.3s ease;
	}
	.nav__burger--open i:nth-child(1) {
		transform: translateY(8px) rotate(45deg);
	}
	.nav__burger--open i:nth-child(2) {
		opacity: 0;
	}
	.nav__burger--open i:nth-child(3) {
		transform: translateY(-8px) rotate(-45deg);
	}
	.nav__menu {
		position: fixed;
		inset: 0;
		z-index: 49;
		background: var(--black);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: clamp(1.5rem, 5vh, 3rem);
		animation: menu-in 0.3s ease;
	}
	.nav__menu a {
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.01em;
		font-size: clamp(2rem, 10vw, 3.5rem);
		color: var(--fg-dark);
		text-decoration: none;
		transition: opacity 0.3s ease;
	}
	.nav__menu a:hover {
		opacity: 0.6;
	}

	@keyframes menu-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 700px) {
		.nav__links {
			display: none;
		}
		.nav__burger {
			display: flex;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.nav__menu {
			animation: none;
		}
		.nav__burger i {
			transition: none;
		}
	}
</style>
