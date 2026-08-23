<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';
	import { registerCaseStudyModal, onCaseStudyClose } from '$lib/caseStudy';
	import { stopLenis, startLenis } from '$lib/scroll';
	import { caseStudyLang, type Lang } from '$lib/lang';
	import type { Project } from '$lib/data/project';

	type Tab = 'problem' | 'solution';

	let open = false;
	let mounted = false;
	let project: Project | null = null;
	let activeTab: Tab = 'problem';
	let lang: Lang = 'en';
	let reduceMotion = false;

	let backdropEl: HTMLElement;
	let panelEl: HTMLElement;
	let tabsEl: HTMLElement;
	let tabProblemEl: HTMLElement;
	let tabSolutionEl: HTMLElement;
	let indicatorEl: HTMLElement;
	let bodyEl: HTMLElement;

	const unsubscribeLang = caseStudyLang.subscribe((v) => (lang = v));

	function setLang(next: Lang) {
		caseStudyLang.set(next);
	}

	function moveIndicator(animate: boolean) {
		if (!indicatorEl || !tabsEl) return;
		const target = activeTab === 'problem' ? tabProblemEl : tabSolutionEl;
		if (!target) return;
		const x = target.offsetLeft;
		const width = target.offsetWidth;
		if (!animate || reduceMotion) {
			gsap.set(indicatorEl, { x, width });
			return;
		}
		gsap.to(indicatorEl, { x, width, duration: 0.35, ease: 'power2.out' });
	}

	async function selectTab(tab: Tab) {
		if (activeTab === tab) return;
		activeTab = tab;
		await tick();
		if (bodyEl) bodyEl.scrollTop = 0;
		moveIndicator(true);
	}

	export async function show(p: Project) {
		project = p;
		activeTab = 'problem';
		open = true;
		mounted = true;
		document.body.style.overflow = 'hidden';
		stopLenis();

		await tick();
		moveIndicator(false);

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
		onCaseStudyClose();
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) close();
	}

	function onResize() {
		if (open) moveIndicator(false);
	}

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		registerCaseStudyModal(show);
		window.addEventListener('keydown', onKey);
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('resize', onResize);
			unsubscribeLang();
		};
	});
</script>

{#if mounted && project}
	<div class="cs-modal">
		<button
			class="cs-modal__backdrop"
			bind:this={backdropEl}
			onclick={close}
			aria-label="Close"
			tabindex="-1"
		></button>

		<div
			class="cs-modal__panel"
			bind:this={panelEl}
			role="dialog"
			aria-modal="true"
			aria-labelledby="cs-modal-title"
		>
			<button class="cs-modal__close" onclick={close} aria-label="Close">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
			</button>

			<div class="cs-modal__top">
				<span class="cs-modal__eyebrow">// CASE STUDY</span>
				<div class="cs-modal__lang" role="group" aria-label="Language">
					<button
						class="cs-modal__lang-btn"
						class:is-active={lang === 'en'}
						onclick={() => setLang('en')}>EN</button
					>
					<button
						class="cs-modal__lang-btn"
						class:is-active={lang === 'id'}
						onclick={() => setLang('id')}>ID</button
					>
				</div>
			</div>

			<h3 id="cs-modal-title" class="cs-modal__title">{project.title}</h3>

			{#if project.caseStudy}
				<div class="cs-modal__tabs" role="tablist" bind:this={tabsEl}>
					<span class="cs-modal__tab-indicator" bind:this={indicatorEl} aria-hidden="true"></span>
					<button
						class="cs-modal__tab"
						class:is-active={activeTab === 'problem'}
						role="tab"
						aria-selected={activeTab === 'problem'}
						bind:this={tabProblemEl}
						onclick={() => selectTab('problem')}>PROBLEM</button
					>
					<button
						class="cs-modal__tab"
						class:is-active={activeTab === 'solution'}
						role="tab"
						aria-selected={activeTab === 'solution'}
						bind:this={tabSolutionEl}
						onclick={() => selectTab('solution')}>SOLUTION</button
					>
				</div>

				<p class="cs-modal__body" data-lenis-prevent bind:this={bodyEl}>
					{activeTab === 'problem' ? project.caseStudy.problem[lang] : project.caseStudy.solution[lang]}
				</p>
			{/if}

			<div class="cs-modal__actions">
				{#if project.demo}
					<a
						class="cs-modal__btn cs-modal__btn--demo"
						href={project.demo}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span>{project.demoLabel ?? 'Live Demo'}</span>
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
					</a>
				{:else}
					<span class="cs-modal__badge">NO LIVE DEMO YET</span>
				{/if}
				{#if project.npm}
					<a
						class="cs-modal__btn cs-modal__btn--npm"
						href={project.npm}
						target="_blank"
						rel="noopener noreferrer"
					>
						<svg class="cs-modal__btn-npm" viewBox="0 0 24 24" aria-hidden="true"><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" /></svg>
						<span>NPM</span>
					</a>
				{/if}
				<a
					class="cs-modal__btn cs-modal__btn--repo"
					href={project.repo}
					target="_blank"
					rel="noopener noreferrer"
				>
					<svg class="cs-modal__btn-gh" viewBox="0 0 24 24" aria-hidden="true"
						><path
							d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5.01 0c1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
						/></svg
					>
					<span>Repository</span>
				</a>
			</div>
		</div>
	</div>
{/if}

<style>
	.cs-modal {
		position: fixed;
		inset: 0;
		z-index: 80;
		display: grid;
		place-items: center;
		padding: 1.5rem;
	}
	.cs-modal__backdrop {
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
	.cs-modal__panel {
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
	.cs-modal__close {
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
	.cs-modal__close:hover {
		color: var(--fg-dark);
	}
	.cs-modal__close svg {
		width: 16px;
		height: 16px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.6;
		stroke-linecap: round;
	}

	.cs-modal__top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-right: 2rem;
	}
	.cs-modal__eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.cs-modal__lang {
		display: flex;
		border: 1px solid rgba(241, 241, 239, 0.2);
	}
	.cs-modal__lang-btn {
		background: none;
		border: 0;
		padding: 0.2rem 0.55rem;
		font-family: var(--ff-mono);
		font-size: 0.68rem;
		letter-spacing: 0.06em;
		color: var(--gray);
		cursor: pointer;
		transition: background 0.2s ease, color 0.2s ease;
	}
	.cs-modal__lang-btn.is-active {
		background: var(--fg-dark);
		color: var(--black);
	}

	.cs-modal__title {
		margin: 0.6rem 0 0;
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.01em;
		line-height: 1;
		font-size: clamp(1.7rem, 4vw, 2.1rem);
		color: var(--fg-dark);
	}

	.cs-modal__tabs {
		position: relative;
		display: flex;
		margin-top: clamp(0.75rem, 1.5vw, 1rem);
		border: 1px solid rgba(241, 241, 239, 0.16);
		padding: 3px;
	}
	.cs-modal__tab-indicator {
		position: absolute;
		top: 3px;
		bottom: 3px;
		left: 0;
		background: var(--fg-dark);
		z-index: 0;
		will-change: transform, width;
	}
	.cs-modal__tab {
		position: relative;
		z-index: 1;
		flex: 1;
		background: none;
		border: 0;
		padding: 0.55rem 0.75rem;
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		cursor: pointer;
		transition: color 0.25s ease;
	}
	.cs-modal__tab.is-active {
		color: var(--black);
	}

	.cs-modal__body {
		flex: 1 1 auto;
		min-height: 0;
		overflow-y: auto;
		margin: clamp(0.5rem, 1vw, 0.75rem) 0 0;
		padding: 0 0.25rem 0.25rem 0;
		font-family: var(--ff-body);
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--fg-dark);
		opacity: 0.85;
		scrollbar-width: thin;
		scrollbar-color: #1c1c1a var(--black);
	}
	.cs-modal__body::-webkit-scrollbar-track {
		background: transparent;
	}
	.cs-modal__body::-webkit-scrollbar-thumb {
		background: #1c1c1a;
		border-color: var(--black);
	}
	.cs-modal__body::-webkit-scrollbar-thumb:hover {
		background: var(--gray);
	}

	.cs-modal__actions {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: clamp(0.6rem, 1.2vw, 0.9rem);
		margin-top: clamp(0.75rem, 1.5vw, 1rem);
		padding-top: clamp(1rem, 2vw, 1.25rem);
		border-top: 1px solid rgba(241, 241, 239, 0.14);
	}
	.cs-modal__btn {
		flex: 1 1 0%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.6rem 1.1rem;
		font-family: var(--ff-mono);
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		text-decoration: none;
		transition: transform 0.3s cubic-bezier(0.2, 0.6, 0.2, 1), background 0.3s ease, color 0.3s ease,
			border-color 0.3s ease;
	}
	.cs-modal__btn svg {
		width: 14px;
		height: 14px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.cs-modal__btn--demo {
		background: var(--fg-dark);
		color: var(--black);
	}
	.cs-modal__btn--demo:hover {
		background: var(--accent-ph);
		color: var(--fg-dark);
	}
	.cs-modal__btn--npm {
		background: transparent;
		color: var(--fg-dark);
		border: 1px solid rgba(241, 241, 239, 0.3);
	}
	.cs-modal__btn--npm .cs-modal__btn-npm {
		fill: currentColor;
		stroke: none;
	}
	.cs-modal__btn--npm:hover {
		background: var(--accent-ph);
		color: var(--fg-dark);
		border-color: var(--accent-ph);
	}
	.cs-modal__btn--repo {
		background: transparent;
		color: var(--fg-dark);
		border: 1px solid rgba(241, 241, 239, 0.3);
	}
	.cs-modal__btn--repo .cs-modal__btn-gh {
		fill: currentColor;
		stroke: none;
	}
	.cs-modal__btn--repo:hover {
		border-color: var(--fg-dark);
	}
	.cs-modal__btn:hover {
		transform: translateY(-2px);
	}
	.cs-modal__badge {
		flex: 1 1 0%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--ff-mono);
		font-size: 0.68rem;
		letter-spacing: 0.06em;
		color: var(--gray);
		border: 1px dashed rgba(241, 241, 239, 0.25);
		padding: 0.5rem 0.75rem;
	}

	@media (max-width: 640px) {
		.cs-modal__panel {
			height: min(92vh, 36rem);
		}
		.cs-modal__actions {
			flex-direction: column;
			align-items: stretch;
		}
		.cs-modal__btn {
			width: 100%;
			flex: none;
		}
		.cs-modal__badge {
			width: 100%;
			flex: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cs-modal__btn {
			transition: none;
		}
	}
</style>