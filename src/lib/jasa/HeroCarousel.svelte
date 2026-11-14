<script lang="ts">
	import { onMount } from 'svelte';
	import type { HeroSlide } from '$lib/data/jasa';

	let { slides }: { slides: HeroSlide[] } = $props();

	const STEP = 29.5; // derajat antar kartu di silinder
	const HIDE = 3.85; // lebih jauh dari ini sudah di luar layar

	let stage: HTMLDivElement | undefined = $state();
	let offset = $state(0);
	let dragging = $state(false);
	const pos = $derived((slides.length - 1) / 2 + offset);

	let vel = 0;
	let goal: number | null = null;
	let raf = 0;
	let lastX = 0;

	// posisi kartu relatif ke tengah, membungkus supaya putarannya loop
	function slot(i: number) {
		const n = slides.length;
		let m = (i - pos + n / 2) % n;
		if (m < 0) m += n;
		return m - n / 2;
	}
	const pxPerSlot = () => Math.max(62, (stage?.clientWidth ?? 0) * 0.099) * 1.05;

	function loop() {
		if (goal === null) {
			offset += vel;
			vel *= 0.9;
			if (Math.abs(vel) < 0.01) goal = Math.round(offset);
		} else {
			const d = goal - offset;
			offset += d * 0.16;
			if (Math.abs(d) < 0.002) {
				offset = goal;
				goal = null;
				vel = 0;
				return;
			}
		}
		raf = requestAnimationFrame(loop);
	}
	function kick() {
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(loop);
	}
	function go(k: number) {
		vel = 0;
		goal = Math.round(offset) + k;
		kick();
	}
	function down(e: PointerEvent) {
		cancelAnimationFrame(raf);
		goal = null;
		vel = 0;
		lastX = e.clientX;
		dragging = true;
		stage?.setPointerCapture(e.pointerId);
	}
	function move(e: PointerEvent) {
		if (!dragging) return;
		const d = -(e.clientX - lastX) / pxPerSlot();
		lastX = e.clientX;
		offset += d;
		vel = Math.max(-0.5, Math.min(0.5, vel * 0.5 + d * 0.5));
	}
	function up() {
		if (!dragging) return;
		dragging = false;
		kick();
	}
	function key(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') (e.preventDefault(), go(-1));
		if (e.key === 'ArrowRight') (e.preventDefault(), go(1));
	}
	onMount(() => () => cancelAnimationFrame(raf));
</script>

<div class="carousel">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_no_noninteractive_tabindex -->
	<div
		class="stage"
		class:dragging
		bind:this={stage}
		role="group"
		aria-roledescription="carousel"
		aria-label="Contoh hasil kerja. Geser atau gunakan panah kiri dan kanan untuk melihat lainnya."
		tabindex="0"
		onpointerdown={down}
		onpointermove={move}
		onpointerup={up}
		onpointercancel={up}
		onkeydown={key}
	>
		<div class="orbit">
			{#each slides as s, i (s.src)}
				{@const sl = slot(i)}
				<div
					class="card"
					style:--a={(-sl * STEP).toFixed(2)}
					style:visibility={Math.abs(sl) > HIDE ? 'hidden' : 'visible'}
				>
					<img
						src={s.src}
						alt={s.alt}
						draggable="false"
						decoding="async"
						loading={i > 0 && i < slides.length - 1 ? 'eager' : 'lazy'}
						style:object-position={s.pos ?? '50% 50%'}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.carousel {
		container-type: inline-size;
	}
	.stage {
		--w: max(62px, 9.9cqw); /* lebar satuan kartu, ikut lebar layar */
		position: relative;
		height: calc(var(--w) * 3.4);
		perspective: calc(var(--w) * 3.7);
		touch-action: pan-y;
		cursor: grab;
		user-select: none;
		-webkit-user-select: none;
		-webkit-mask-image: linear-gradient(
			90deg,
			rgba(0, 0, 0, 0.12) 0,
			rgba(0, 0, 0, 0.6) 6%,
			#000 13%,
			#000 87%,
			rgba(0, 0, 0, 0.6) 94%,
			rgba(0, 0, 0, 0.12) 100%
		);
		mask-image: linear-gradient(
			90deg,
			rgba(0, 0, 0, 0.12) 0,
			rgba(0, 0, 0, 0.6) 6%,
			#000 13%,
			#000 87%,
			rgba(0, 0, 0, 0.6) 94%,
			rgba(0, 0, 0, 0.12) 100%
		);
	}
	.stage.dragging {
		cursor: grabbing;
	}
	.stage:focus-visible {
		outline-offset: -4px;
	}
	/* satu silinder cekung: kartu diputar lalu didorong mundur sejauh radius */
	.orbit {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0;
		height: 0;
		transform-style: preserve-3d;
		transform: translateZ(calc(var(--w) * 2));
		animation: sweep 1.2s var(--jz-ease) backwards;
	}
	.card {
		position: absolute;
		width: calc(var(--w) * 0.97);
		height: calc(var(--w) * 1.377);
		left: calc(var(--w) * -0.485);
		top: calc(var(--w) * -0.6885);
		border-radius: calc(var(--w) * 0.065);
		overflow: hidden;
		background: var(--jz-wash);
		transform: rotateY(calc(var(--a) * 1deg)) translateZ(calc(var(--w) * -2));
	}
	.card img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
		-webkit-user-drag: none;
	}
	/* animasi masuk hanya pada transform, opacity di ring akan meratakan 3D */
	@keyframes sweep {
		from {
			transform: translateZ(calc(var(--w) * 2)) rotateY(32deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.orbit {
			animation: none;
		}
	}
</style>
