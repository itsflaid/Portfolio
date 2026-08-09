<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	type Project = {
		index: string;
		title: string;
		tag: string;
		thumb: string;
		desc: string;
		tech: string[];
	};

	const projects: Project[] = [
		{
			index: '01',
			title: 'DEVMAP',
			tag: 'Context layer that helps AI actually read a codebase',
			thumb: '/devmap.webp',
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			tech: ['TypeScript', 'Node.js', 'AST', 'TS-Morph', 'Astro']
		},
		{
			index: '02',
			title: 'DEVNOTE',
			tag: 'Markdown notes that sync everywhere',
			thumb: '/devnote.webp',
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			tech: ['TypeScript', 'Next', 'Supabase', 'Tailwind']
		},
		{
			index: '03',
			title: 'CHATME',
			tag: 'Self-chat & notes PWA — a place to remember things',
			thumb: '/chatme.webp',
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			tech: ['TypeScript', 'Next', 'Upstash', 'Qtash', 'Neon']
		},
		{
			index: '04',
			title: 'DAILYFIT',
			tag: 'Training tracker with rolling PDF reports',
			thumb: '/dailyfit.webp',
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			tech: ['TypeScript', 'Next', 'Recharts', 'PDFKit', 'Neon']
		},
		{
			index: '05',
			title: 'MUFADZ PORTAL',
			tag: 'Daily Islamic companion, works offline-first',
			thumb: '/mufadz.webp',
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			tech: ['TypeScript', 'React', 'Express', 'MySql', 'Groq']
		},
		{
			index: '06',
			title: 'DE HOME SPA',
			tag: 'Landing page for a home spa studio',
			thumb: '/de-home-spa.webp',
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			tech: ['TypeScript', 'Next', 'Groq', 'Fonnte']
		}
	];

	let workEl: HTMLElement;
	let viewportEl: HTMLElement;
	let trackEl: HTMLElement;
	let activeIndex = 0;
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduceMotion) return;

		const setSpacing = () => {
			const card = trackEl.querySelector('.work__card') as HTMLElement | null;
			if (!card) return;
			const gap = Math.max(0, (viewportEl.clientWidth - card.offsetWidth) / 2);
			trackEl.style.paddingLeft = `${gap}px`;
			trackEl.style.paddingRight = `${gap}px`;
		};
		setSpacing();
		ScrollTrigger.addEventListener('refreshInit', setSpacing);

		const getScroll = () => Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth);
		const imgs = gsap.utils.toArray<HTMLElement>(trackEl.querySelectorAll('.card__media img'));

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: workEl,
				start: 'top top',
				end: () => '+=' + getScroll(),
				pin: true,
				scrub: 1,
				invalidateOnRefresh: true,
				onUpdate: (self) => {
					activeIndex = Math.round(self.progress * (projects.length - 1));
				}
			}
		});

		tl.to(trackEl, { x: () => -getScroll(), ease: 'none' }, 0);

		imgs.forEach((img, i) => {
			tl.fromTo(
				img,
				{ xPercent: i % 2 === 0 ? 6 : -6 },
				{ xPercent: i % 2 === 0 ? -6 : 6, ease: 'none' },
				0
			);
		});

		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);

		return () => {
			window.removeEventListener('load', onLoad);
			ScrollTrigger.removeEventListener('refreshInit', setSpacing);
			tl.scrollTrigger?.kill();
			tl.kill();
		};
	});
</script>

<section class="work" id="work" bind:this={workEl}>
	<img class="work__mark" src="/logo-mark.png" alt="" aria-hidden="true" draggable="false" />
	<div class="work__head">
		<span class="work__eyebrow">(WORK)</span>
		<div class="work__head-right">
			<span class="work__dots" aria-hidden="true">
				{#each dots as _}<i></i>{/each}
			</span>
			<span class="work__count">0{activeIndex + 1} / 0{projects.length}</span>
		</div>
	</div>

	<div class="work__viewport" bind:this={viewportEl}>
		<ul class="work__track" bind:this={trackEl}>
			{#each projects as project, i}
				<li class="work__card">
					<div class="card__media">
						<img
							src={project.thumb}
							alt="{project.title} preview"
							loading="lazy"
							decoding="async"
							draggable="false"
						/>
					</div>
					<div class="card__info">
						<div class="card__row">
							<span class="card__index">{project.index}</span>
							<h3 class="card__title">{project.title}</h3>
						</div>
						<p class="card__tag">{project.tag}</p>
						<p class="card__desc">{project.desc}</p>
						<div class="card__tech">
							<span class="tech__label">STACK</span>
							<ul class="tech__list">
								{#each project.tech as tech}
									<li>{tech}</li>
								{/each}
							</ul>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.work {
		position: relative;
		background: var(--white);
		color: var(--black);
		z-index: 3;
		overflow: hidden;
		padding: clamp(3rem, 8vh, 5.5rem) 0 clamp(3rem, 8vh, 5rem);
	}
	.work__mark {
		position: absolute;
		bottom: -6vw;
		left: -2vw;
		width: clamp(9rem, 24vw, 19rem);
		height: auto;
		opacity: 0.05;
		z-index: 0;
		user-select: none;
		pointer-events: none;
	}
	.work__dots {
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		pointer-events: none;
	}
	.work__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--black);
		font-style: normal;
		opacity: 0.06;
		animation: work-dot-blink 3s ease-in-out infinite;
	}
	.work__dots i:nth-child(2) { animation-delay: 0.3s; }
	.work__dots i:nth-child(3) { animation-delay: 0.6s; }
	.work__dots i:nth-child(4) { animation-delay: 0.9s; }
	.work__dots i:nth-child(5) { animation-delay: 1.2s; }
	.work__dots i:nth-child(6) { animation-delay: 1.5s; }
	.work__dots i:nth-child(7) { animation-delay: 1.8s; }
	.work__dots i:nth-child(8) { animation-delay: 2.1s; }
	.work__dots i:nth-child(9) { animation-delay: 2.4s; }
	.work__head {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin: 0 clamp(1.5rem, 5vw, 4rem);
		padding-bottom: clamp(1.5rem, 4vh, 2.5rem);
		border-bottom: 1px solid rgba(10, 10, 10, 0.14);
	}
	.work__eyebrow,
	.work__count {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.work__head-right {
		display: flex;
		align-items: center;
		gap: clamp(1rem, 2vw, 1.5rem);
	}
	.work__viewport {
		position: relative;
		z-index: 1;
		overflow: hidden;
		margin-top: clamp(1.5rem, 4vh, 2.5rem);
		padding: 0;
	}
	.work__track {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: stretch;
		gap: clamp(1.5rem, 3vw, 3rem);
		width: max-content;
		will-change: transform;
	}
	.work__card {
		flex: 0 0 auto;
		width: clamp(300px, 42vw, 640px);
	}
	.card__media {
		position: relative;
		width: 100%;
		height: clamp(180px, 38vh, 360px);
		overflow: hidden;
		background: var(--accent-ph);
		box-shadow: 0 24px 48px rgba(10, 10, 10, 0.1);
		transition: transform 0.6s cubic-bezier(0.2, 0.6, 0.2, 1);
	}
	.card__media img {
		display: block;
		width: 115%;
		max-width: none;
		height: 100%;
		object-fit: cover;
		object-position: center;
		will-change: transform;
	}
	.work__card:hover .card__media {
		transform: scale(1.02);
	}
	.card__info {
		display: flex;
		flex-direction: column;
		gap: clamp(0.4rem, 1vh, 0.7rem);
		padding-top: clamp(1rem, 2.5vh, 1.5rem);
	}
	.card__row {
		display: flex;
		align-items: baseline;
		gap: clamp(0.9rem, 2vw, 1.5rem);
	}
	.card__index {
		font-family: var(--ff-mono);
		font-size: 0.85rem;
		color: var(--gray);
	}
	.card__title {
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.005em;
		font-size: clamp(1.6rem, 2.6vw, 2.4rem);
		line-height: 1;
	}
	.card__tag {
		font-family: var(--ff-body);
		font-size: clamp(0.85rem, 1.1vw, 1rem);
		color: var(--ink-soft);
		opacity: 0.75;
		max-width: 46ch;
	}
	.card__desc {
		font-family: var(--ff-body);
		font-size: clamp(0.9rem, 1.15vw, 1.05rem);
		line-height: 1.55;
		color: var(--gray);
		max-width: 56ch;
	}
	.card__tech {
		display: flex;
		align-items: center;
		gap: clamp(0.9rem, 2vw, 1.5rem);
		margin-top: clamp(0.6rem, 1.5vh, 1rem);
		flex-wrap: wrap;
	}
	.tech__label {
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.tech__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.tech__list li {
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.03em;
		color: var(--black);
		border: 1px solid rgba(10, 10, 10, 0.25);
		border-radius: 999px;
		padding: 0.3rem 0.7rem;
		white-space: nowrap;
	}

	@keyframes work-dot-blink {
		0%,
		100% {
			opacity: 0.06;
		}
		50% {
			opacity: 0.32;
		}
	}

	@media (max-width: 900px) {
		.work {
			padding-top: clamp(2.5rem, 6vh, 4rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.work__dots i {
			animation: none;
		}
		.card__media {
			transition: none;
		}
	}
</style>
