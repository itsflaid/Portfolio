<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import { registerTechModal, onTechModalClose } from '$lib/techModal';
	import { stopLenis, startLenis } from '$lib/scroll';
	import type { Project } from '$lib/data/project';

	let open = false;
	let mounted = false;
	let project: Project | null = null;
	let reduceMotion = false;

	let backdropEl: HTMLElement;
	let panelEl: HTMLElement;
	let bodyEl: HTMLElement;

	export async function show(p: Project) {
		project = p;
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
		project = null;
		document.body.style.overflow = '';
		startLenis();
		onTechModalClose();
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) close();
	}

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		registerTechModal(show);
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('keydown', onKey);
		};
	});
</script>

{#if mounted && project}
	<div class="tm-modal">
		<button
			class="tm-modal__backdrop"
			bind:this={backdropEl}
			onclick={close}
			aria-label="Close"
			tabindex="-1"
		></button>

		<div
			class="tm-modal__panel"
			bind:this={panelEl}
			role="dialog"
			aria-modal="true"
			aria-labelledby="tm-modal-title"
		>
			<button class="tm-modal__close" onclick={close} aria-label="Close">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
			</button>

			<span class="tm-modal__eyebrow">// FULL STACK</span>
			<h3 id="tm-modal-title" class="tm-modal__title">{project.title}</h3>

			<div class="tm-modal__body" data-lenis-prevent bind:this={bodyEl}>
				{#each project.techGroups ?? [] as group}
					<div class="tm-modal__group">
						<span class="tm-modal__group-label">{group.label}</span>
						<ul class="tm-modal__pills">
							{#each group.items as tech}
								<li style={tech.icon ? `--tech-color: ${tech.icon.hex}` : ''}>
									{#if tech.icon}
										<svg class="tech-icon" viewBox="0 0 24 24" aria-hidden="true"
											><path d={tech.icon.path} fill-rule="evenodd" /></svg
										>
									{/if}
									<span>{tech.name}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.tm-modal {
		position: fixed;
		inset: 0;
		z-index: 80;
		display: grid;
		place-items: center;
		padding: 1.5rem;
	}
	.tm-modal__backdrop {
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
	.tm-modal__panel {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 30rem;
		height: min(85vh, 33rem);
		overflow: hidden;
		background: var(--black);
		border: 1px solid rgba(241, 241, 239, 0.14);
		box-shadow: 0 32px 64px rgba(0, 0, 0, 0.45);
		padding: clamp(1.75rem, 4vw, 2.5rem);
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		opacity: 0;
	}
	.tm-modal__close {
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
	.tm-modal__close:hover {
		color: var(--fg-dark);
	}
	.tm-modal__close svg {
		width: 16px;
		height: 16px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.6;
		stroke-linecap: round;
	}

	.tm-modal__eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		padding-right: 2rem;
	}

	.tm-modal__title {
		margin: 0.6rem 0 0;
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.01em;
		line-height: 1;
		font-size: clamp(1.7rem, 4vw, 2.1rem);
		color: var(--fg-dark);
	}

	.tm-modal__body {
		flex: 1 1 auto;
		min-height: 0;
		overflow-y: auto;
		margin: clamp(0.5rem, 1vw, 0.75rem) 0 0;
		padding: 0 0.25rem 0.25rem 0;
		scrollbar-width: thin;
		scrollbar-color: #1c1c1a var(--black);
	}
	.tm-modal__body::-webkit-scrollbar-track {
		background: transparent;
	}
	.tm-modal__body::-webkit-scrollbar-thumb {
		background: #1c1c1a;
		border-color: var(--black);
	}
	.tm-modal__body::-webkit-scrollbar-thumb:hover {
		background: var(--gray);
	}

	.tm-modal__group {
		margin-bottom: clamp(1.1rem, 2.5vw, 1.6rem);
	}
	.tm-modal__group:last-child {
		margin-bottom: 0;
	}
	.tm-modal__group-label {
		display: block;
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		margin-bottom: 0.6rem;
	}
	.tm-modal__pills {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.tm-modal__pills li {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.03em;
		color: var(--fg-dark);
		border: 1px solid rgba(241, 241, 239, 0.2);
		border-radius: 999px;
		padding: 0.3rem 0.7rem;
		white-space: nowrap;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			color 0.15s ease;
	}
	.tm-modal__pills li:hover {
		background: var(--tech-color, var(--fg-dark));
		border-color: transparent;
		color: var(--black);
	}

	.tech-icon {
		flex-shrink: 0;
		width: 0.85em;
		height: 0.85em;
		color: inherit;
	}
	.tech-icon path {
		fill: currentColor;
	}

	@media (max-width: 640px) {
		.tm-modal__panel {
			height: min(92vh, 36rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tm-modal__pills li {
			transition: none;
		}
	}
</style>