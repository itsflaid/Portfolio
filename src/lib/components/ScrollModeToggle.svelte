<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { scrollMode, type ScrollMode } from '$lib/scrollMode';
	import { getLenis } from '$lib/scroll';

	// Kecepatan tur AUTO — pelan biar animasi GSAP + section pinned bisa dinikmati.
	const AUTO_SPEED = 280; // px per detik
	const AUTO_LEAD = AUTO_SPEED * 0.45; // jarak target di depan scroll saat ini
	const IDLE_RESUME_MS = 6000; // jeda tanpa input user sebelum tur AUTO lanjut

	let mounted = false;
	let reduceMotion = false;
	let mode: ScrollMode = 'manual';

	// ---- auto-driver ----
	let autoEngaged = false;
	let userHold = false;
	let lastTick = 0;
	let driftOn = false;
	let rewindPending = false;
	let idleTimer: ReturnType<typeof setTimeout> | null = null;
	let offVirtual: (() => void) | null = null;

	function pauseDrift() {
		userHold = true;
		if (idleTimer) clearTimeout(idleTimer);
		idleTimer = setTimeout(() => {
			userHold = false;
			lastTick = 0;
		}, IDLE_RESUME_MS);
	}

	function drift(time: number) {
		if (!autoEngaged || userHold) {
			lastTick = time;
			return;
		}
		const lenis = getLenis();
		if (!lenis || lenis.isStopped) {
			lastTick = time;
			return;
		}
		if (lastTick === 0) {
			lastTick = time;
			return;
		}
		const dt = Math.min(0.1, (time - lastTick) / 1000);
		lastTick = time;

		if (lenis.limit - lenis.scroll < 24) {
			disengageAuto();
			return;
		}

		// "Chase": target selalu relatif ke posisi sekarang, jadi ikut menyesuaikan
		// ketika spacer pinned ScrollTrigger bertambah/berkurang (tanpa overshoot).
		lenis.scrollTo(lenis.scroll + AUTO_LEAD, {
			duration: 0.45,
			easing: (t: number) => t
		});
	}

	function addDrift() {
		if (driftOn) return;
		driftOn = true;
		gsap.ticker.add(drift);
	}

	function onVirtual() {
		// User scroll saat tur masih "memutar balik ke atas" → urungkan rewind,
		// langsung serahkan kontrol, lalu tur lanjut dari posisi user.
		if (rewindPending) {
			rewindPending = false;
			userHold = false;
			lastTick = 0;
			addDrift();
			return;
		}
		pauseDrift();
	}

	function engageAuto() {
		if (autoEngaged || reduceMotion) return;
		const lenis = getLenis();
		if (!lenis) return;

		autoEngaged = true;
		userHold = false;
		lastTick = 0;
		offVirtual = lenis.on('virtual-scroll', onVirtual);

		// Kalau sudah di ujung bawah, balik ke atas dulu biar tur dijalani dari awal.
		if (lenis.limit - lenis.scroll < Math.min(window.innerHeight * 1.5, 1200)) {
			rewindPending = true;
			lenis.scrollTo(0, {
				duration: 1.6,
				easing: (t: number) => 1 - Math.pow(1 - t, 3),
				onComplete: () => {
					if (!autoEngaged) return;
					rewindPending = false;
					lastTick = 0;
					addDrift();
				}
			});
			return;
		}
		addDrift();
	}

	function disengageAuto() {
		if (!autoEngaged) return;
		autoEngaged = false;
		userHold = false;
		rewindPending = false;
		if (idleTimer) clearTimeout(idleTimer);
		idleTimer = null;
		if (offVirtual) offVirtual();
		offVirtual = null;
		if (driftOn) {
			driftOn = false;
			gsap.ticker.remove(drift);
		}
	}

	function toggleMode() {
		const next: ScrollMode = mode === 'auto' ? 'manual' : 'auto';
		scrollMode.set(next);
		if (next === 'auto') engageAuto();
		else disengageAuto();
	}

	// Klik user (nav, CTA, Resume, dsb.) ikut menunda drift saat AUTO — supaya
	// scroll programmatic dari scrollToTarget tidak bentrok dengan chase.
	function onPointer() {
		if (autoEngaged) pauseDrift();
	}

	function onKey(e: KeyboardEvent) {
		if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', 'Home', 'End'].includes(e.key) && autoEngaged) {
			pauseDrift();
		}
	}

	onMount(() => {
		mounted = true;
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const unsubscribeStore = scrollMode.subscribe((next) => {
			mode = next;
		});

		window.addEventListener('keydown', onKey);
		document.addEventListener('pointerdown', onPointer, true);

		return () => {
			disengageAuto();
			unsubscribeStore();
			window.removeEventListener('keydown', onKey);
			document.removeEventListener('pointerdown', onPointer, true);
		};
	});
</script>

{#if mounted}
	<button class="mode-tg" type="button" onclick={toggleMode} aria-label="Toggle scroll mode" aria-pressed={mode === 'auto'}>
		SCROLL<span aria-hidden="true">·</span>{mode === 'auto' ? 'AUTO' : 'MANUAL'}
	</button>
{/if}

<style>
	.mode-tg {
		position: fixed;
		right: clamp(1rem, 3vw, 2rem);
		bottom: clamp(1rem, 3vw, 2rem);
		z-index: 40;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--ff-mono);
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		color: #ffffff;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: 0;
		padding: 0.42rem 0.7rem;
		cursor: pointer;
		mix-blend-mode: difference;
		transition: opacity 0.25s ease;
	}
	.mode-tg span {
		opacity: 0.5;
	}
	.mode-tg:hover {
		opacity: 0.7;
	}
	.mode-tg:focus-visible {
		outline: 2px solid #ffffff;
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.mode-tg {
			transition: none;
		}
	}
</style>