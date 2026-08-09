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
		demo: string;
		repo: string;
	};

const projects: Project[] = [
    {
        index: '01',
        title: 'DEVMAP',
        tag: 'Analyze once, reuse context everywhere',
        thumb: '/devmap.webp',
        desc: 'Maps your codebase through static analysis to give AI agents structured context and a clearer understanding of your project.',
        tech: ['TypeScript', 'Node.js', 'ts-morph', 'Commander', 'Astro'],
        demo: 'https://devmap-web.vercel.app',
        repo: 'https://github.com/itsflaid/devmap'
    },
    {
        index: '02',
        title: 'DEVNOTE',
        tag: 'A platform for developers to manage and organize code, snippets, resources, and knowledge.',
        thumb: '/devnote.webp',
        desc: 'Keep your technical knowledge organized in one place, from reusable snippets and resources to notes and collections.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'CodeMirror'],
        demo: 'https://devnote-five.vercel.app',
        repo: 'https://github.com/itsflaid/devnote'
    },
    {
        index: '03',
        title: 'CHATME',
        tag: 'Chat-UI-based personal notes and reminders web application',
        thumb: '/chatme.webp',
        desc: 'A simple way to capture thoughts, save notes, and manage reminders through a familiar chat-based interface.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Upstash'],
        demo: 'https://chatme-jet.vercel.app',
        repo: 'https://github.com/itsflaid/chatme'
    },
    {
        index: '04',
        title: 'DAILYFIT',
        tag: 'Simple daily home workout web application',
        thumb: '/dailyfit.webp',
        desc: 'Follow daily workouts, track completed activities, and keep an eye on your progress through a simple fitness experience.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Recharts'],
        demo: 'https://dailyfit-alpha.vercel.app',
        repo: 'https://github.com/itsflaid/dailyfit'
    },
    {
        index: '05',
        title: 'MUFADZ PORTAL',
        tag: 'An all-in-one platform for Islamic services and features.',
        thumb: '/mufadz.webp',
        desc: 'Brings useful Islamic services and features together in one accessible platform designed for everyday use.',
        tech: ['React', 'TypeScript', 'Express', 'MySQL', 'Groq'],
        demo: '#',
        repo: 'https://github.com/itsflaid/mufadz-portal'
    },
    {
        index: '06',
        title: 'DE HOME SPA',
        tag: 'An AI-powered home spa platform for personalized treatment recommendations and guidance.',
        thumb: '/de-home-spa.webp',
        desc: 'Get personalized home spa recommendations based on your needs through guided selections or direct conversations with AI.',
        tech: ['Next.js', 'TypeScript', 'Groq', 'Fonnte', 'Tailwind CSS'],
        demo: 'http://de-home-spa-v2-uwxp.vercel.app/',
        repo: 'https://github.com/itsflaid/de-home-spa-v2'
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
		const imgs = gsap.utils.toArray<HTMLElement>(trackEl.querySelectorAll('.media__pan'));

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
		<span class="work__eyebrow">// WORK</span>
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
						<div class="media__pan">
							<img
								src={project.thumb}
								alt="{project.title} preview"
								loading="lazy"
								decoding="async"
								draggable="false"
							/>
						</div>
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
						<div class="card__actions">
							<a
								class="card__btn card__btn--demo"
								href={project.demo}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span>Live Demo</span>
								<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
							</a>
							<a
								class="card__btn card__btn--repo"
								href={project.repo}
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg class="card__btn-gh" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5.01 0c1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" /></svg>
								<span>Repository</span>
							</a>
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
		padding: clamp(2rem, 6vh, 4rem) 0 clamp(2rem, 6vh, 3.5rem);
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
		padding-bottom: clamp(1.25rem, 3vh, 2rem);
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
		margin-top: clamp(1.25rem, 3vh, 2rem);
		padding: 0;
	}
	.work__track {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: stretch;
		gap: clamp(1.5rem, 4vw, 6rem);
		width: max-content;
		will-change: transform;
	}
	.work__card {
		flex: 0 0 auto;
		width: clamp(300px, 38vw, 540px);
	}
	.card__media {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 10;
		max-height: clamp(200px, 32vh, 330px);
		overflow: hidden;
		background: var(--accent-ph);
		box-shadow: 0 24px 48px rgba(10, 10, 10, 0.1);
		transition: transform 0.6s cubic-bezier(0.2, 0.6, 0.2, 1);
	}
	.media__pan {
		position: absolute;
		top: 0;
		left: -16%;
		width: 132%;
		height: 100%;
		overflow: hidden;
		will-change: transform;
	}
	.media__pan img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		transform-origin: center;
		animation: kenburns 9s ease-in-out infinite alternate;
		will-change: transform;
	}

	@keyframes kenburns {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.08);
		}
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
	.card__actions {
		display: flex;
		flex-wrap: wrap;
		gap: clamp(0.6rem, 1.2vw, 0.9rem);
		margin-top: clamp(0.9rem, 2vh, 1.25rem);
	}
	.card__btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.1rem;
		font-family: var(--ff-mono);
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		text-decoration: none;
		transition: transform 0.3s cubic-bezier(0.2, 0.6, 0.2, 1), background 0.3s ease,
			color 0.3s ease, border-color 0.3s ease;
	}
	.card__btn svg {
		width: 14px;
		height: 14px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.card__btn--demo {
		background: var(--black);
		color: var(--white);
	}
	.card__btn--demo:hover {
		background: var(--accent-ph);
	}
	.card__btn--repo {
		background: transparent;
		color: var(--black);
		border: 0;
		border-bottom: 1px solid rgba(10, 10, 10, 0.3);
		padding-left: 0;
		padding-right: 0;
	}
	.card__btn--repo .card__btn-gh {
		fill: currentColor;
		stroke: none;
	}
	.card__btn--repo:hover {
		border-bottom-color: var(--black);
		background: none;
	}
	.card__btn:hover {
		transform: translateY(-2px);
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
		.media__pan img {
			animation: none;
		}
	}
</style>