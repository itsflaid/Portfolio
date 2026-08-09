<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import { scrollToTarget } from '$lib/scroll';

	type MenuLink = {
		label: string;
		href: string;
	};

	const menuLinks: MenuLink[] = [
		{ label: 'ABOUT', href: '#about' },
		{ label: 'WORK', href: '#work' },
		{ label: 'EXPERIENCE', href: '#experience' },
		{ label: 'SKILLS', href: '#skills' },
		{ label: 'CONTACT', href: '#contact' }
	];

	let open = false;
	let mounted = false;
	let menuEl: HTMLElement;
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	let reduceMotion = false;

	function go(e: MouseEvent, href: string) {
		e.preventDefault();
		closeMenu();
		scrollToTarget(href);
	}

	function toggle() {
		if (open) closeMenu();
		else openMenu();
	}

	async function openMenu() {
		open = true;
		mounted = true;
		document.body.style.overflow = 'hidden';

		await tick();

		if (reduceMotion) {
			gsap.set(menuEl, { opacity: 1 });
			return;
		}

		const q = gsap.utils.selector(menuEl);
		gsap.set(menuEl, { opacity: 1 });
		gsap.fromTo(
			q('.nav__menu-label'),
			{ yPercent: 110 },
			{ yPercent: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07 }
		);
		gsap.fromTo(
			q('.nav__menu-index'),
			{ opacity: 0, x: -12 },
			{ opacity: 1, x: 0, duration: 0.4, stagger: 0.07, delay: 0.15 }
		);
		gsap.fromTo(q('.nav__menu-dots'), { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.1 });
		gsap.fromTo(
			q('.nav__menu-eyebrow'),
			{ opacity: 0, y: 12 },
			{ opacity: 1, y: 0, duration: 0.4, delay: 0.1 }
		);
		gsap.fromTo(q('.nav__menu-logo'), { opacity: 0 }, { opacity: 0.06, duration: 1, delay: 0.25 });
		gsap.fromTo(
			q('.nav__menu-foot'),
			{ opacity: 0, y: 16 },
			{ opacity: 1, y: 0, duration: 0.5, delay: 0.3 }
		);
	}

	function closeMenu() {
		if (reduceMotion) {
			open = false;
			mounted = false;
			document.body.style.overflow = '';
			return;
		}
		if (!mounted) return;
		gsap.to(menuEl, {
			opacity: 0,
			duration: 0.3,
			ease: 'power1.in',
			onComplete: () => {
				open = false;
				mounted = false;
				document.body.style.overflow = '';
			}
		});
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') closeMenu();
	}

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

<nav class="nav">
	<a class="nav__brand" href="#top" onclick={(e) => go(e, '#top')} aria-label="FLAID">
		<img class="nav__logo" src="/logo-nav.png" alt="" draggable="false" />
		<span class="nav__mark">FLAID</span>
	</a>
	<div class="nav__links">
		<a href="#work" onclick={(e) => go(e, '#work')}>Work</a>
		<a href="#skills" onclick={(e) => go(e, '#skills')}>Skills</a>
		<a href="#contact" onclick={(e) => go(e, '#contact')}>Contact</a>
	</div>
	<button
		class="nav__burger"
		class:nav__burger--open={open}
		aria-label="Toggle menu"
		aria-expanded={open}
		onclick={toggle}
	>
		<i></i><i></i><i></i>
	</button>
</nav>

{#if mounted}
	<div class="nav__menu" bind:this={menuEl} role="dialog" aria-modal="true" aria-label="Menu">
		<span class="nav__menu-dots" aria-hidden="true">
			{#each dots as _}<i></i>{/each}
		</span>
		<img class="nav__menu-logo" src="/logo-nav.png" alt="" aria-hidden="true" draggable="false" />

		<span class="nav__menu-eyebrow">// NAVIGATION</span>

		<nav class="nav__menu-links">
			{#each menuLinks as link, i}
				<a class="nav__menu-link" href={link.href} onclick={(e) => go(e, link.href)}>
					<span class="nav__menu-index">0{i + 1}</span>
					<span class="nav__menu-mask"><span class="nav__menu-label">{link.label}</span></span>
				</a>
			{/each}
		</nav>

		<div class="nav__menu-foot">
			<span>FLAID — MUHAMMAD FADIL</span>
		</div>
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
	.nav__brand {
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}
	.nav__logo {
		display: block;
		height: clamp(1.7rem, 2.2vw, 2.3rem);
		width: auto;
		user-select: none;
	}
	.nav__mark {
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.02em;
		font-size: clamp(1.15rem, 1.8vw, 1.6rem);
		line-height: 1;
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
		color: var(--fg-dark);
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: clamp(1.25rem, 3.5vh, 2rem);
		padding: clamp(6rem, 14vh, 8rem) clamp(1.5rem, 7vw, 4.5rem) clamp(3rem, 7vh, 4rem);
		overflow: hidden;
		opacity: 0;
	}
	.nav__menu-dots {
		position: absolute;
		top: clamp(1.5rem, 4vw, 3rem);
		right: clamp(1.5rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		z-index: 1;
		pointer-events: none;
	}
	.nav__menu-dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--fg-dark);
		font-style: normal;
		opacity: 0.08;
		animation: nav-dot-blink 3s ease-in-out infinite;
	}
	.nav__menu-dots i:nth-child(2) { animation-delay: 0.3s; }
	.nav__menu-dots i:nth-child(3) { animation-delay: 0.6s; }
	.nav__menu-dots i:nth-child(4) { animation-delay: 0.9s; }
	.nav__menu-dots i:nth-child(5) { animation-delay: 1.2s; }
	.nav__menu-dots i:nth-child(6) { animation-delay: 1.5s; }
	.nav__menu-dots i:nth-child(7) { animation-delay: 1.8s; }
	.nav__menu-dots i:nth-child(8) { animation-delay: 2.1s; }
	.nav__menu-dots i:nth-child(9) { animation-delay: 2.4s; }
	.nav__menu-logo {
		position: absolute;
		bottom: -4vw;
		left: -2vw;
		width: clamp(11rem, 36vw, 19rem);
		height: auto;
		opacity: 0.06;
		z-index: 0;
		user-select: none;
		pointer-events: none;
	}
	.nav__menu-eyebrow {
		position: relative;
		z-index: 1;
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.nav__menu-links {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: clamp(0.75rem, 2.5vh, 1.25rem);
	}
	.nav__menu-link {
		display: flex;
		align-items: baseline;
		gap: clamp(0.9rem, 2vw, 1.5rem);
		width: fit-content;
		color: var(--fg-dark);
		text-decoration: none;
	}
	.nav__menu-index {
		font-family: var(--ff-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.nav__menu-mask {
		display: block;
		overflow: hidden;
	}
	.nav__menu-label {
		display: block;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.01em;
		font-size: clamp(2.2rem, 10vw, 3.8rem);
		color: var(--fg-dark);
		transition: color 0.3s ease;
	}
	.nav__menu-link:hover .nav__menu-label {
		color: var(--gray);
	}
	.nav__menu-foot {
		position: relative;
		z-index: 1;
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		border-top: 1px solid rgba(241, 241, 239, 0.16);
		padding-top: clamp(1.25rem, 3vh, 1.75rem);
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.06em;
		color: var(--gray);
	}

	@keyframes nav-dot-blink {
		0%,
		100% {
			opacity: 0.08;
		}
		50% {
			opacity: 0.34;
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
		.nav__menu-dots i {
			animation: none;
			opacity: 0.2;
		}
		.nav__menu-label {
			transition: none;
		}
	}
</style>
