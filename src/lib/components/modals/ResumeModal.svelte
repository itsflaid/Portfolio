<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import { registerResumeModal, RESUME } from '$lib/resume';
	import { stopLenis, startLenis } from '$lib/scroll';

	let open = false;
	let mounted = false;
	let backdropEl: HTMLElement;
	let panelEl: HTMLElement;
	let reduceMotion = false;

	async function show() {
		if (open) return;
		open = true;
		mounted = true;
		document.body.style.overflow = 'hidden';
		stopLenis();

		await tick();

		if (reduceMotion) {
			gsap.set([backdropEl, panelEl], { opacity: 1 });
			gsap.set(panelEl, { y: 0 });
			return;
		}

		gsap.fromTo(backdropEl, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.out' });
		gsap.fromTo(
			panelEl,
			{ opacity: 0, y: 14 },
			{ opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.05 }
		);
	}

	function close() {
		if (!mounted) return;

		if (reduceMotion) {
			finish();
			return;
		}

		gsap.to(panelEl, { opacity: 0, y: 8, duration: 0.22, ease: 'power1.in' });
		gsap.to(backdropEl, { opacity: 0, duration: 0.22, ease: 'power1.in', onComplete: finish });
	}

	function finish() {
		open = false;
		mounted = false;
		document.body.style.overflow = '';
		startLenis();
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) close();
	}

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		registerResumeModal(show);
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

{#if mounted}
	<div class="resume-modal">
		<button
			class="resume-modal__backdrop"
			bind:this={backdropEl}
			onclick={close}
			aria-label="Close"
			tabindex="-1"
		></button>

		<div
			class="resume-modal__panel"
			bind:this={panelEl}
			role="dialog"
			aria-modal="true"
			aria-labelledby="resume-modal-title"
		>
			<button class="resume-modal__close" onclick={close} aria-label="Close">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
			</button>

			<span class="resume-modal__eyebrow">// RESUME</span>
			<h3 id="resume-modal-title" class="resume-modal__name">Muhammad Fadil</h3>
			<p class="resume-modal__role">Fullstack Developer</p>

			<dl class="resume-modal__meta">
				<div class="resume-modal__row">
					<span class="resume-modal__rule" aria-hidden="true"></span>
					<dt>FORMAT</dt>
					<dd>PDF · {RESUME.pages}</dd>
				</div>
				<div class="resume-modal__row">
					<span class="resume-modal__rule" aria-hidden="true"></span>
					<dt>SIZE</dt>
					<dd>{RESUME.size}</dd>
				</div>
				<div class="resume-modal__row">
					<span class="resume-modal__rule" aria-hidden="true"></span>
					<dt>UPDATED</dt>
					<dd>{RESUME.updated}</dd>
				</div>
			</dl>

			<a
				class="resume-modal__download"
				href={RESUME.href}
				download={RESUME.downloadName}
				target="_blank"
				rel="noopener noreferrer"
				onclick={close}
			>
				<span>DOWNLOAD</span>
				<svg viewBox="0 0 24 24" aria-hidden="true"
					><path d="M12 3v11m0 0-4-4m4 4 4-4M5 21h14" /></svg
				>
			</a>
		</div>
	</div>
{/if}

<style>
	.resume-modal {
		position: fixed;
		inset: 0;
		z-index: 80;
		display: grid;
		place-items: center;
		padding: 1.5rem;
	}
	.resume-modal__backdrop {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
		margin: 0;
		padding: 0;
		background: rgba(10, 10, 10, 0.72);
		opacity: 0;
		cursor: pointer;
	}
	.resume-modal__panel {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 24rem;
		background: var(--black);
		border: 1px solid rgba(241, 241, 239, 0.14);
		box-shadow: 0 32px 64px rgba(0, 0, 0, 0.45);
		padding: clamp(1.75rem, 4vw, 2.5rem);
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		opacity: 0;
	}
	.resume-modal__close {
		position: absolute;
		top: clamp(1rem, 2vw, 1.5rem);
		right: clamp(1rem, 2vw, 1.5rem);
		width: 28px;
		height: 28px;
		display: grid;
		place-items: center;
		background: none;
		border: 0;
		padding: 0;
		color: var(--gray);
		cursor: pointer;
		transition: color 0.2s ease;
	}
	.resume-modal__close:hover {
		color: var(--fg-dark);
	}
	.resume-modal__close svg {
		width: 16px;
		height: 16px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.6;
		stroke-linecap: round;
	}
	.resume-modal__eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		margin-bottom: 0.5rem;
	}
	.resume-modal__name {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.01em;
		line-height: 1;
		font-size: clamp(1.7rem, 4vw, 2.1rem);
		color: var(--fg-dark);
	}
	.resume-modal__role {
		margin: 0.3rem 0 0;
		font-family: var(--ff-body);
		font-size: 0.9rem;
		color: var(--gray);
	}
	.resume-modal__meta {
		margin: clamp(1.25rem, 3vw, 1.75rem) 0 0;
		display: flex;
		flex-direction: column;
	}
	.resume-modal__row {
		position: relative;
		display: flex;
		align-items: baseline;
		gap: 1.25rem;
		padding: 0.65rem 0;
	}
	.resume-modal__rule {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: rgba(241, 241, 239, 0.14);
	}
	.resume-modal__row dt {
		flex: 0 0 auto;
		width: 5rem;
		margin: 0;
		font-family: var(--ff-mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.resume-modal__row dd {
		margin: 0;
		font-family: var(--ff-body);
		font-size: 0.88rem;
		color: var(--fg-dark);
		opacity: 0.9;
	}
	.resume-modal__download {
		margin-top: clamp(1.5rem, 3.5vw, 2rem);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 0.9rem 1.25rem;
		background: var(--fg-dark);
		color: var(--black);
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		text-decoration: none;
		transition: background 0.25s ease, transform 0.25s ease;
	}
	.resume-modal__download:hover {
		background: var(--accent-ph);
		color: var(--fg-dark);
		transform: translateY(-1px);
	}
	.resume-modal__download svg {
		width: 15px;
		height: 15px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	@media (prefers-reduced-motion: reduce) {
		.resume-modal__download {
			transition: none;
		}
	}
</style>