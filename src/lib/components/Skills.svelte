<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import {
		siTailwindcss,
		siTypescript,
		siReact,
		siNextdotjs,
		siTanstack,
		siVuedotjs,
		siSvelte,
		siNodedotjs,
		siExpress,
		siPrisma,
		siPhp,
		siLaravel,
		siMysql,
		siPostgresql,
		siNeon,
		siSupabase,
		siOpenrouter,
		siOpencode,
		siClaude,
		siGithub,
		siVite,
		siUpstash,
		siGit,
		siNpm,
		siVercel
	} from 'simple-icons';
	import type { SimpleIcon } from 'simple-icons';
	import { groqIcon, gptIcon, codexIcon, restApiIcon } from './icons';
	import type { SkillIcon } from './icons';

	function si(icon: SimpleIcon): SkillIcon {
		return { hex: `#${icon.hex}`, path: icon.path };
	}

	type SkillItem = {
		name: string;
		icon: SkillIcon;
	};

	type SkillGroup = {
		label: string;
		items: SkillItem[];
	};

	const groups: SkillGroup[] = [
		{
			label: 'FRONTEND',
			items: [
				{ name: 'Tailwind', icon: si(siTailwindcss) },
				{ name: 'TypeScript', icon: si(siTypescript) },
				{ name: 'React', icon: si(siReact) },
				{ name: 'Next.js', icon: si(siNextdotjs) },
				{ name: 'TanStack Query', icon: { ...si(siTanstack), hex: '#FF4154' } },
				{ name: 'Vue', icon: si(siVuedotjs) },
				{ name: 'SvelteKit', icon: si(siSvelte) }
			]
		},
		{
			label: 'BACKEND',
			items: [
				{ name: 'Node.js', icon: si(siNodedotjs) },
				{ name: 'Express', icon: si(siExpress) },
				{ name: 'REST API', icon: restApiIcon },
				{ name: 'Prisma', icon: si(siPrisma) },
				{ name: 'PHP', icon: si(siPhp) },
				{ name: 'Laravel', icon: si(siLaravel) }
			]
		},
		{
			label: 'DATABASE',
			items: [
				{ name: 'MySQL', icon: si(siMysql) },
				{ name: 'PostgreSQL', icon: si(siPostgresql) },
				{ name: 'Neon', icon: si(siNeon) },
				{ name: 'Supabase', icon: si(siSupabase) }
			]
		},
		{
			label: 'AI & LLM',
			items: [
				{ name: 'Groq', icon: groqIcon },
				{ name: 'OpenRouter', icon: si(siOpenrouter) },
				{ name: 'OpenCode', icon: si(siOpencode) },
				{ name: 'Claude', icon: si(siClaude) },
				{ name: 'GPT', icon: gptIcon },
				{ name: 'Codex', icon: codexIcon }
			]
		},
		{
			label: 'TOOLS & INFRA',
			items: [
				{ name: 'GitHub', icon: si(siGithub) },
				{ name: 'Git', icon: si(siGit) },
				{ name: 'npm', icon: si(siNpm) },
				{ name: 'Vercel', icon: si(siVercel) },
				{ name: 'Vite', icon: si(siVite) },
				{ name: 'Upstash', icon: si(siUpstash) }
			]
		}
	];

	let skillsEl: HTMLElement;
	let darkEl: HTMLElement;
	let lightEl: HTMLElement;
	let lightListEl: HTMLElement;
	let markLightEl: HTMLElement;
	let headingEl: HTMLElement;
	let headingLine1El: HTMLElement;
	let headingLine2El: HTMLElement;
	let cursorEl: HTMLElement;
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isMobile = window.matchMedia('(max-width: 860px)').matches;

		const darkContent = gsap.utils.toArray<HTMLElement>(darkEl.querySelectorAll('[data-reveal]'));
		const listGroups = gsap.utils.toArray<HTMLElement>(lightEl.querySelectorAll('.skills__group'));

		if (reduceMotion) {
			gsap.set(darkEl, { xPercent: 0 });
			gsap.set([headingLine1El, headingLine2El], { y: '0%', x: '0rem' });
			gsap.set(cursorEl, { opacity: 1 });
			gsap.set([...darkContent, ...listGroups], { opacity: 1, y: 0, x: 0 });
			gsap.set(lightEl.querySelectorAll('.skills__rule'), { scaleX: 1 });
			gsap.set(lightEl.querySelectorAll('.skills__row'), { clipPath: 'inset(0 0% 0 0)' });
			gsap.set(lightListEl, { y: 0 });
			return;
		}

		gsap.set(darkEl, { xPercent: -100 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: skillsEl,
				start: 'top bottom',
				end: 'top top',
				scrub: 1
			}
		});

		// Dark half slides in from off-screen left, same as before.
		tl.fromTo(darkEl, { xPercent: -100 }, { xPercent: 0, ease: 'none' }, 0);
		tl.fromTo(
			darkContent,
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
			0.25
		);

		tl.fromTo(
			headingLine1El,
			{ y: '105%', x: '-1.4rem' },
			{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
			0.3
		);
		tl.fromTo(
			headingLine2El,
			{ y: '105%', x: '1.4rem' },
			{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
			0.45
		);
		tl.to(cursorEl, { opacity: 1, duration: 0.2 }, 0.95);

		// Light half's watermark drifts opposite the heading — same quiet
		// parallax treatment as GithubActivity's mark, so the "empty" white
		// side still has something moving instead of sitting dead still.
		tl.fromTo(markLightEl, { yPercent: -6 }, { yPercent: 6, ease: 'none' }, 0);

		// Desktop: section pins the moment it fills the screen (layar pas tengah),
		// lalu list kanan naik pelan-pelan dari FRONTEND sampai TOOLS & INFRA.
		// Baru setelah list selesai kebaca, section dilepas pin-nya dan
		// lanjut scroll normal ke section berikutnya.
		const listTriggers: ScrollTrigger[] = [];
		if (!isMobile) {
			gsap.set(listGroups, { opacity: 1, y: 0 });
			gsap.set(lightEl.querySelectorAll('.skills__rule'), { scaleX: 1 });

			const lightPadTop = parseFloat(getComputedStyle(lightEl).paddingTop) || 0;
			const lightPadBottom = parseFloat(getComputedStyle(lightEl).paddingBottom) || 0;
			const overflow = () =>
				Math.max(0, lightListEl.offsetHeight - (lightEl.clientHeight - lightPadTop - lightPadBottom));

			const listTl = gsap.timeline({
				scrollTrigger: {
					trigger: skillsEl,
					start: 'top top',
					end: () => '+=' + overflow(),
					pin: true,
					anticipatePin: 1,
					scrub: 1,
					invalidateOnRefresh: true
				}
			});
			listTl.fromTo(lightListEl, { y: 0 }, { y: () => -overflow(), ease: 'none' }, 0);
			listTriggers.push(listTl.scrollTrigger!);

			// Exit baru jalan SETELAH pin lepas — fade + lebarkan dark half
			// selama satu viewport scroll ke depan, pas section mulai naik
			// meninggalkan layar.
			const exitTargets = [...darkContent, headingEl, ...listGroups];
			const exitTl = gsap.timeline({
				scrollTrigger: {
					trigger: skillsEl,
					start: () => listTl.scrollTrigger!.end,
					end: () => listTl.scrollTrigger!.end + window.innerHeight,
					scrub: 1,
					invalidateOnRefresh: true
				}
			});
			exitTl.to(exitTargets, { opacity: 0, y: -24, duration: 0.5, stagger: 0.04, ease: 'power1.in' }, 0);
			exitTl.to(darkEl, { width: '100%', duration: 0.9, ease: 'power1.inOut' }, 0.25);
			listTriggers.push(exitTl.scrollTrigger!);
		}

		// Mobile: each group plays its own entrance once it scrolls into view.
		// Rows slide in from the left with a quick fade — lighter than the
		// desktop clip-path wipe, matching how mobile already trades scrub
		// effects for cheaper play-once ones elsewhere (Footer, GithubActivity).
		const groupTriggers: ScrollTrigger[] = [];
		if (isMobile) {
			listGroups.forEach((group) => {
				const rule = group.querySelector<HTMLElement>('.skills__rule');
				const rows = gsap.utils.toArray<HTMLElement>(group.querySelectorAll('.skills__row'));
				const groupTl = gsap.timeline({
					scrollTrigger: {
						trigger: group,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				});
				groupTl.fromTo(
					group,
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
					0
				);
				if (rule) {
					groupTl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, 0);
				}
				groupTl.fromTo(
					rows,
					{ opacity: 0, x: -14 },
					{ opacity: 1, x: 0, duration: 0.35, stagger: 0.035, ease: 'power1.out' },
					0.15
				);
				if (groupTl.scrollTrigger) groupTriggers.push(groupTl.scrollTrigger);
			});

			// Mobile exit: dark half fade + widen as it leaves the viewport.
			const mobileExitTl = gsap.timeline({
				scrollTrigger: {
					trigger: skillsEl,
					start: 'center center',
					end: 'bottom top',
					scrub: 1
				}
			});
			mobileExitTl.to([...darkContent, headingEl], { opacity: 0, y: -24, duration: 0.5, stagger: 0.04, ease: 'power1.in' }, 0);
			mobileExitTl.to(darkEl, { width: '100%', duration: 0.9, ease: 'power1.inOut' }, 0.25);
			groupTriggers.push(mobileExitTl.scrollTrigger!);
		}

		return () => {
			tl.scrollTrigger?.kill();
			listTriggers.forEach((st) => st.kill());
			groupTriggers.forEach((st) => st.kill());
		};
	});
</script>

<section class="skills" id="skills" bind:this={skillsEl}>
	<div class="skills__dark" bind:this={darkEl}>
		<span class="skills__dots" aria-hidden="true">
			{#each dots as _}<i></i>{/each}
		</span>
		<span class="skills__mark skills__mark--dark" aria-hidden="true">TOOLS</span>
		<div class="skills__dark-content">
			<span class="skills__eyebrow" data-reveal>// SKILLS</span>
			<h2 class="skills__heading" bind:this={headingEl}>
				<span class="line-mask"><span class="line" bind:this={headingLine1El}>WHAT I</span></span>
				<span class="line-mask"
					><span class="line" bind:this={headingLine2El}
						>USE<span class="cursor" bind:this={cursorEl}>_</span></span
					></span
				>
			</h2>
			<p class="skills__lead" data-reveal>
				Tools and technologies I reach for when shipping real products.
			</p>
		</div>
	</div>

	<div class="skills__light" bind:this={lightEl}>
		<span class="skills__mark" aria-hidden="true" bind:this={markLightEl}>SKILLS</span>
		<ul class="skills__list" bind:this={lightListEl}>
			{#each groups as group, gi}
				<li class="skills__group">
					<div class="skills__group-head">
						<span class="skills__group-index">0{gi + 1}</span>
						<span class="skills__rule" aria-hidden="true"></span>
						<span class="skills__label">{group.label}</span>
						<!-- <span class="skills__group-count">{String(group.items.length).padStart(2, '0')}</span> -->
					</div>
					<ul class="skills__rows">
						{#each group.items as item}
							<li class="skills__row" style="--skill-color: {item.icon.hex}">
								<svg class="skill-icon" viewBox="0 0 24 24" aria-hidden="true"
									><path d={item.icon.path} fill-rule="evenodd" /></svg
								>
								<span class="skills__row-name">{item.name}</span>
								<span class="skills__row-arrow" aria-hidden="true">→</span>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.skills {
		height: 100vh;
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		overflow: hidden;
		background: var(--white);
		z-index: 3;
	}
	.skills__dark {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 50%;
		z-index: 2;
		background: var(--black);
		color: var(--fg-dark);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(2rem, 6vw, 4rem);
		overflow: hidden;
		will-change: transform, width;
	}
	.skills__dark-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: clamp(1rem, 2.5vh, 1.5rem);
		max-width: 24rem;
	}
	.skills__eyebrow {
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		color: var(--gray);
		opacity: 0;
	}
	.skills__heading {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		line-height: 0.95;
		letter-spacing: 0.01em;
		font-size: clamp(2.6rem, 7vw, 5.5rem);
	}
	.line-mask {
		display: block;
		overflow: hidden;
	}
	.line {
		display: block;
		transform: translateY(105%);
	}
	.cursor {
		display: inline-block;
		font-family: var(--ff-mono);
		margin-left: 0.05em;
		opacity: 0;
		animation: skills-blink 1s step-end infinite;
	}
	.skills__lead {
		font-family: var(--ff-body);
		font-size: clamp(0.95rem, 1.5vw, 1.1rem);
		line-height: 1.55;
		color: var(--fg-dim);
		opacity: 0;
	}
	.skills__dots {
		position: absolute;
		top: clamp(1.5rem, 4vw, 3rem);
		left: clamp(1.5rem, 4vw, 3rem);
		display: grid;
		grid-template-columns: repeat(3, 8px);
		grid-template-rows: repeat(3, 8px);
		gap: 9px;
		z-index: 1;
		pointer-events: none;
	}
	.skills__dots i {
		display: block;
		width: 8px;
		height: 8px;
		background: var(--fg-dark);
		font-style: normal;
		opacity: 0.08;
		animation: skills-dot-blink 3s ease-in-out infinite;
	}
	.skills__dots i:nth-child(2) { animation-delay: 0.3s; }
	.skills__dots i:nth-child(3) { animation-delay: 0.6s; }
	.skills__dots i:nth-child(4) { animation-delay: 0.9s; }
	.skills__dots i:nth-child(5) { animation-delay: 1.2s; }
	.skills__dots i:nth-child(6) { animation-delay: 1.5s; }
	.skills__dots i:nth-child(7) { animation-delay: 1.8s; }
	.skills__dots i:nth-child(8) { animation-delay: 2.1s; }
	.skills__dots i:nth-child(9) { animation-delay: 2.4s; }

	.skills__light {
		position: relative;
		grid-column: 2;
		background: var(--white);
		color: var(--black);
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		padding: clamp(1.25rem, 4vh, 2.5rem) clamp(2rem, 6vw, 4rem);
		overflow: hidden;
	}
	.skills__mark {
		position: absolute;
		top: -2.5vw;
		right: -0.5vw;
		font-family: var(--ff-display);
		font-weight: 400;
		letter-spacing: 0.01em;
		font-size: clamp(4rem, 11vw, 9rem);
		color: var(--black);
		opacity: 0.05;
		white-space: nowrap;
		z-index: 0;
		user-select: none;
		pointer-events: none;
	}
	.skills__mark--dark {
		top: auto;
		bottom: -2.5vw;
		right: auto;
		left: -0.5vw;
		color: var(--fg-dark);
	}

	/* ===== manifest list ===== */
	.skills__list {
		position: relative;
		z-index: 1;
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 32rem;
		will-change: transform;
	}
	.skills__group {
		padding: clamp(0.6rem, 1.4vh, 0.9rem) 0;
		opacity: 0;
	}
	.skills__group-head {
		position: relative;
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
	}
	.skills__group-index {
		font-family: var(--ff-mono);
		font-size: 0.68rem;
		letter-spacing: 0.06em;
		color: var(--accent-ph);
		flex: 0 0 auto;
	}
	.skills__rule {
		flex: 1 1 auto;
		height: 1px;
		background: rgba(10, 10, 10, 0.16);
		transform: scaleX(0);
		transform-origin: left;
		align-self: center;
	}
	.skills__label {
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		color: var(--black);
		flex: 0 0 auto;
		white-space: nowrap;
	}
	/* .skills__group-count {
		font-family: var(--ff-mono);
		font-size: 0.65rem;
		color: var(--gray);
		flex: 0 0 auto;
	} */

	.skills__rows {
		list-style: none;
		margin: 0.3rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}
	.skills__row {
		position: relative;
		display: grid;
		grid-template-columns: 1.1rem 1fr auto;
		align-items: center;
		gap: 0.65rem;
		padding: 0.5rem 0.4rem;
		border-bottom: 1px solid rgba(10, 10, 10, 0.08);
		cursor: default;
		overflow: hidden;
		transition: padding-left 0.25s cubic-bezier(0.2, 0.6, 0.2, 1);
	}
	.skills__row::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--skill-color);
		transform: scaleX(0);
		transform-origin: left;
		z-index: 0;
		transition: transform 0.3s cubic-bezier(0.2, 0.6, 0.2, 1);
	}
	.skills__row:hover {
		padding-left: 0.7rem;
	}
	.skills__row:hover::before {
		transform: scaleX(1);
	}
	.skill-icon {
		position: relative;
		z-index: 1;
		flex-shrink: 0;
		width: 1rem;
		height: 1rem;
		color: var(--skill-color);
		transition: color 0.25s ease;
	}
	.skill-icon path {
		fill: currentColor;
	}
	.skills__row-name {
		position: relative;
		z-index: 1;
		font-family: var(--ff-body);
		font-weight: 500;
		font-size: 0.9rem;
		color: var(--black);
		transition: color 0.25s ease;
	}
	.skills__row-arrow {
		position: relative;
		z-index: 1;
		font-family: var(--ff-mono);
		font-size: 0.8rem;
		color: transparent;
		opacity: 0;
		transform: translateX(-6px);
		transition: opacity 0.25s ease, transform 0.25s ease, color 0.25s ease;
	}
	.skills__row:hover .skill-icon,
	.skills__row:hover .skills__row-name {
		color: var(--white);
	}
	.skills__row:hover .skills__row-arrow {
		color: var(--white);
		opacity: 0.8;
		transform: translateX(0);
	}

	@keyframes skills-blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
	@keyframes skills-dot-blink {
		0%,
		100% {
			opacity: 0.08;
		}
		50% {
			opacity: 0.34;
		}
	}

	@media (max-width: 860px) {
		.skills {
			grid-template-columns: 1fr;
			height: auto;
		}
		.skills__dark {
			width: 100%;
			height: 60vh;
			bottom: auto;
		}
		.skills__dark-content {
			align-items: center;
			text-align: center;
			max-width: none;
		}
		.skills__lead {
			font-size: clamp(0.9rem, 1.2vw, 1rem);
		}
		.skills__light {
			grid-column: 1;
			margin-top: 60vh;
			min-height: 70vh;
		}
		.skills__row:hover {
			padding-left: 0.4rem;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.cursor {
			animation: none;
			opacity: 1;
		}
		.skills__dots i {
			animation: none;
			opacity: 0.2;
		}
		.skills__row {
			transition: none;
		}
		.skills__row::before {
			transition: none;
		}
	}
</style>