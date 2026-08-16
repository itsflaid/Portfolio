<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import {
		siTailwindcss,
		siTypescript,
		siJavascript,
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
		siGoogle,
		siBetterauth,
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
		siVercel,
		siGsap,
		siFramer
	} from 'simple-icons';
	import type { SimpleIcon } from 'simple-icons';
	import {
		groqIcon,
		gptIcon,
		codexIcon,
		restApiIcon,
		nextAuthIcon,
		figmaIcon,
		canvaIcon,
		pixellabIcon
	} from './icons';
	import type { SkillIcon } from './icons';

	function si(icon: SimpleIcon): SkillIcon {
		return { hex: `#${icon.hex}`, path: icon.path };
	}

	type SkillItem = { name: string; icon: SkillIcon };
	type SkillGroup = { label: string; items: SkillItem[] };

	const groups: SkillGroup[] = [
		{
			label: 'FRONTEND',
			items: [
				{ name: 'Next.js', icon: si(siNextdotjs) },
				{ name: 'React', icon: si(siReact) },
				{ name: 'TypeScript', icon: si(siTypescript) },
				{ name: 'JavaScript', icon: si(siJavascript) },
				{ name: 'Tailwind', icon: si(siTailwindcss) },
				{ name: 'SvelteKit', icon: si(siSvelte) },
				{ name: 'Vue', icon: si(siVuedotjs) },
				{ name: 'TanStack Query', icon: { ...si(siTanstack), hex: '#FF4154' } }
			]
		},
		{
			label: 'BACKEND',
			items: [
				{ name: 'Node.js', icon: si(siNodedotjs) },
				{ name: 'Express', icon: si(siExpress) },
				{ name: 'Prisma', icon: si(siPrisma) },
				{ name: 'REST API', icon: restApiIcon },
				{ name: 'PHP', icon: si(siPhp) },
				{ name: 'Laravel', icon: si(siLaravel) },
				{ name: 'NextAuth', icon: nextAuthIcon },
				{ name: 'Google OAuth', icon: si(siGoogle) },
				{ name: 'BetterAuth', icon: { ...si(siBetterauth), hex: '#000000' } }
			]
		},
		{
			label: 'DATABASE',
			items: [
				{ name: 'PostgreSQL', icon: si(siPostgresql) },
				{ name: 'MySQL', icon: si(siMysql) },
				{ name: 'Supabase', icon: si(siSupabase) },
				{ name: 'Neon', icon: si(siNeon) }
			]
		},
		{
			label: 'DESIGN & ANIMATION',
			items: [
				{ name: 'Figma', icon: figmaIcon },
				{ name: 'Canva', icon: canvaIcon },
				{ name: 'Pixellab', icon: pixellabIcon },
				{ name: 'GSAP', icon: si(siGsap) },
				{ name: 'Framer Motion', icon: si(siFramer) }
			]
		},
		{
			label: 'AI & LLM',
			items: [
				{ name: 'Claude', icon: si(siClaude) },
				{ name: 'GPT', icon: gptIcon },
				{ name: 'Codex', icon: codexIcon },
				{ name: 'Groq', icon: groqIcon },
				{ name: 'OpenRouter', icon: si(siOpenrouter) },
				{ name: 'OpenCode', icon: si(siOpencode) }
			]
		},
		{
			label: 'TOOLS & INFRA',
			items: [
				{ name: 'GitHub', icon: si(siGithub) },
				{ name: 'Git', icon: si(siGit) },
				{ name: 'Vercel', icon: si(siVercel) },
				{ name: 'Vite', icon: si(siVite) },
				{ name: 'npm', icon: si(siNpm) },
				{ name: 'Upstash', icon: si(siUpstash) }
			]
		}
	];

	function hashString(str: string) {
		let h = 0;
		for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
		return h;
	}
	function mulberry32(seed: number) {
		let s = seed;
		return () => {
			s |= 0;
			s = (s + 0x6d2b79f5) | 0;
			let t = Math.imul(s ^ (s >>> 15), 1 | s);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	type Shape = 'wide' | 'tall' | 'normal';
	type Fill = 'ghost' | 'solid';
	type LayoutCell = { shape: Shape; fill: Fill };

	function buildLayout(group: SkillGroup): LayoutCell[] {
		const rng = mulberry32(hashString(group.label));
		const n = group.items.length;
		// Kuota kotak besar per grup, proporsional ke jumlah item — biar kolom gak
		// jomplang. ~1 "tall" per kolom (grid 4 kolom), "wide" dijatah lebih longgar
		// karena dia gak nambah tinggi kolom, cuma lebar.
		let tallLeft = Math.max(1, Math.round(n / 4));
		let wideLeft = Math.max(1, Math.round(n / 6));
		return group.items.map((item) => {
			// Icon multicolor asli (svg dengan fill hardcoded per path, kayak Figma) selalu
			// dipaksa ghost/bg-putih — warna brand-nya sendiri udah "dibawa" logonya, jadi
			// gak boleh ketiban solid background warna lain yang bisa clash. Svg custom yang
			// cuma pakai currentColor (kayak Pixellab) gak kena aturan ini, tetap boleh solid.
			const isMulticolor = !!item.icon.multicolor;
			const shapeRoll = rng();
			let shape: Shape = 'normal';
			if (shapeRoll < 0.14 && wideLeft > 0) {
				shape = 'wide';
				wideLeft--;
			} else if (shapeRoll < 0.4 && tallLeft > 0) {
				shape = 'tall';
				tallLeft--;
			}
			const fill: Fill = isMulticolor ? 'ghost' : rng() < 0.5 ? 'solid' : 'ghost';
			return { shape, fill };
		});
	}

	const layouts = groups.map(buildLayout);

	let skillsEl: HTMLElement;
	let darkEl: HTMLElement;
	let lightEl: HTMLElement;
	let markLightEl: HTMLElement;
	let headingEl: HTMLElement;
	let headingLine1El: HTMLElement;
	let headingLine2El: HTMLElement;
	let cursorEl: HTMLElement;
	let stackEl: HTMLElement;
	let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isMobile = window.matchMedia('(max-width: 860px)').matches;

		const darkContent = gsap.utils.toArray<HTMLElement>(darkEl.querySelectorAll('[data-reveal]'));
		const groupEls = gsap.utils.toArray<HTMLElement>(lightEl.querySelectorAll('.skills__group'));

		function boxesOf(group: HTMLElement) {
			return gsap.utils.toArray<HTMLElement>(group.querySelectorAll('.skills__box'));
		}
		function headPartsOf(group: HTMLElement) {
			const rule = group.querySelector<HTMLElement>('.skills__rule');
			const labelText = group.querySelectorAll<HTMLElement>(
				'.skills__group-index, .skills__label'
			);
			return { rule, labelText: gsap.utils.toArray<HTMLElement>(labelText) };
		}

		if (reduceMotion) {
			gsap.set(darkEl, { xPercent: 0 });
			gsap.set([headingLine1El, headingLine2El], { y: '0%', x: '0rem' });
			gsap.set(cursorEl, { opacity: 1 });
			gsap.set(darkContent, { opacity: 1, y: 0 });
			gsap.set(lightEl.querySelectorAll('.skills__rule'), { scaleX: 1 });
			gsap.set(lightEl.querySelectorAll('.skills__group-index, .skills__label'), { opacity: 1 });
			gsap.set(lightEl.querySelectorAll('.skills__box'), { opacity: 1, scale: 1, y: 0, rotate: 0 });
			return;
		}

		gsap.set(darkEl, { xPercent: -100 });

		const entryTl = gsap.timeline({
			scrollTrigger: { trigger: skillsEl, start: 'top bottom', end: 'top top', scrub: 1 }
		});
		entryTl.fromTo(darkEl, { xPercent: -100 }, { xPercent: 0, ease: 'none' }, 0);
		entryTl.fromTo(
			darkContent,
			{ opacity: 0, y: 24 },
			{ opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
			0.25
		);
		entryTl.fromTo(
			headingLine1El,
			{ y: '105%', x: '-1.4rem' },
			{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
			0.3
		);
		entryTl.fromTo(
			headingLine2El,
			{ y: '105%', x: '1.4rem' },
			{ y: '0%', x: '0rem', duration: 0.7, ease: 'power3.out' },
			0.45
		);
		entryTl.to(cursorEl, { opacity: 1, duration: 0.2 }, 0.95);
		entryTl.fromTo(markLightEl, { yPercent: -6 }, { yPercent: 0, ease: 'none' }, 0);

		const groupTriggers: ScrollTrigger[] = [];
		let pinTl: gsap.core.Timeline | null = null;
		let exitTl: gsap.core.Timeline | null = null;

		if (!isMobile) {
			groupEls.forEach((group) => {
				const { rule } = headPartsOf(group);
				const boxes = boxesOf(group);

				gsap.set(boxes, { opacity: 0, scale: 0.5, y: 14 });
				if (rule) gsap.set(rule, { scaleX: 0 });

				const groupTl = gsap.timeline({
					scrollTrigger: {
						trigger: group,
						start: 'top 78%',
						end: 'bottom 25%',
						toggleActions: 'restart reverse restart reverse'
					}
				});
				if (rule) groupTl.to(rule, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, 0);
				boxes.forEach((box, i) => {
					const kick = (i % 2 === 0 ? 1 : -1) * gsap.utils.random(3, 8);
					groupTl.fromTo(
						box,
						{ opacity: 0, scale: 0.5, y: 14, rotate: kick },
						{ opacity: 1, scale: 1, y: 0, rotate: 0, duration: 0.45, ease: 'back.out(1.7)' },
						0.1 + i * 0.045
					);
				});
				if (groupTl.scrollTrigger) groupTriggers.push(groupTl.scrollTrigger);
			});

			exitTl = gsap.timeline({
				scrollTrigger: { trigger: skillsEl, start: 'bottom 65%', end: 'bottom top', scrub: 1 }
			});
			exitTl.to([...darkContent, headingEl], { opacity: 0, y: -20, duration: 0.5, ease: 'power1.in' }, 0);
			exitTl.to(darkEl, { width: '100%', duration: 0.9, ease: 'power1.inOut' }, 0.15);
		} else {
			const n = groups.length;

			const heights = groupEls.map((g) => g.offsetHeight);
			const maxHeight = Math.max(...heights, 0);
			if (stackEl) stackEl.style.height = `${maxHeight}px`;
			groupEls.forEach((g) => {
				g.style.position = 'absolute';
				g.style.top = '0';
				g.style.left = '0';
				g.style.right = '0';
			});

			groupEls.forEach((group, i) => {
				const boxes = boxesOf(group);
				const { rule, labelText } = headPartsOf(group);
				gsap.set(boxes, { opacity: 0, scale: 0.5, y: 14 });
				gsap.set(labelText, { opacity: i === 0 ? 1 : 0 });
				if (rule) gsap.set(rule, { scaleX: i === 0 ? 1 : 0 });
				group.style.pointerEvents = i === 0 ? 'auto' : 'none';
			});
			const firstHead = headPartsOf(groupEls[0]);
			if (firstHead.rule) gsap.set(firstHead.rule, { scaleX: 0 });
			gsap.set(firstHead.labelText, { opacity: 0 });

			function playIn(group: HTMLElement) {
				const boxes = boxesOf(group);
				const { rule, labelText } = headPartsOf(group);
				if (rule) gsap.to(rule, { scaleX: 1, duration: 0.4, ease: 'power2.out' });
				gsap.to(labelText, { opacity: 1, duration: 0.3, ease: 'power2.out' });
				gsap.to(boxes, {
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 0.4,
					stagger: 0.035,
					ease: 'back.out(1.7)'
				});
			}

			const firstReveal = ScrollTrigger.create({
				trigger: lightEl,
				start: 'top 85%',
				once: true,
				onEnter: () => playIn(groupEls[0])
			});
			groupTriggers.push(firstReveal);

			let stepPx = 0;
			function computeStep() {
				stepPx = window.innerHeight * 0.85;
			}
			computeStep();
			ScrollTrigger.addEventListener('refreshInit', computeStep);
			const getTotalScroll = () => stepPx * (n - 1);

			pinTl = gsap.timeline({
				scrollTrigger: {
					trigger: lightEl,
					start: 'top top',
					end: () => '+=' + Math.max(getTotalScroll(), 1),
					pin: true,
					scrub: 1,
					invalidateOnRefresh: true,
					anticipatePin: 1,
					snap: {
						snapTo: 1 / (n - 1),
						duration: 0.35,
						ease: 'power1.inOut'
					}
				}
			});

			for (let i = 0; i < n - 1; i++) {
				const outGroup = groupEls[i];
				const inGroup = groupEls[i + 1];
				const outBoxes = boxesOf(outGroup);
				const { rule: outRule, labelText: outLabel } = headPartsOf(outGroup);
				const inBoxes = boxesOf(inGroup);
				const { rule: inRule, labelText: inLabel } = headPartsOf(inGroup);

				pinTl.to(outBoxes, { opacity: 0, scale: 0.9, y: -10, duration: 0.3, stagger: 0.015, ease: 'power1.in' }, i);
				if (outRule) pinTl.to(outRule, { scaleX: 0, duration: 0.25, ease: 'power1.in' }, i);
				pinTl.to(outLabel, { opacity: 0, duration: 0.2, ease: 'power1.in' }, i);
				pinTl.set(outGroup, { pointerEvents: 'none' }, i + 0.32);
				pinTl.set(inGroup, { pointerEvents: 'auto' }, i + 0.32);
				pinTl.to(inLabel, { opacity: 1, duration: 0.3, ease: 'power2.out' }, i + 0.32);
				if (inRule) pinTl.fromTo(inRule, { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power2.out' }, i + 0.32);
				pinTl.fromTo(
					inBoxes,
					{ opacity: 0, scale: 0.5, y: 14 },
					{ opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'back.out(1.7)' },
					i + 0.35
				);
			}

			if (pinTl.scrollTrigger) groupTriggers.push(pinTl.scrollTrigger);

			exitTl = gsap.timeline({
				scrollTrigger: { trigger: skillsEl, start: 'bottom 65%', end: 'bottom top', scrub: 1 }
			});
			exitTl.to([...darkContent, headingEl], { opacity: 0, y: -20, duration: 0.5, ease: 'power1.in' }, 0);
			exitTl.to(darkEl, { width: '100%', duration: 0.9, ease: 'power1.inOut' }, 0.15);

			return () => {
				ScrollTrigger.removeEventListener('refreshInit', computeStep);
				entryTl.scrollTrigger?.kill();
				entryTl.kill();
				exitTl?.scrollTrigger?.kill();
				exitTl?.kill();
				pinTl?.scrollTrigger?.kill();
				pinTl?.kill();
				groupTriggers.forEach((st) => st.kill());
			};
		}

		return () => {
			entryTl.scrollTrigger?.kill();
			entryTl.kill();
			exitTl?.scrollTrigger?.kill();
			exitTl?.kill();
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

		<div class="skills__col" bind:this={stackEl}>
			{#each groups as group, gi}
				<div class="skills__group">
					<div class="skills__group-head">
						<span class="skills__group-index">0{gi + 1}</span>
						<span class="skills__rule" aria-hidden="true"></span>
						<span class="skills__label">{group.label}</span>
					</div>
					<div class="skills__grid">
						{#each group.items as item, ii}
							{@const cell = layouts[gi][ii]}
							<div
								class="skills__box skills__box--{cell.shape} skills__box--{cell.fill}"
								style="--skill-color: {item.icon.hex}"
							>
								<svg
									class="skill-icon"
									class:skill-icon--multicolor={!!item.icon.svg}
									viewBox={item.icon.viewBox ?? '0 0 24 24'}
									aria-hidden="true"
								>
									{#if item.icon.svg}
										{@html item.icon.svg}
									{:else}
										<path d={item.icon.path} fill-rule="evenodd" />
									{/if}
								</svg>
								<span class="skills__box-label">{item.name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		background: var(--white);
		z-index: 3;
		align-items: start;
	}

	.skills__dark {
		position: sticky;
		top: 0;
		height: 100vh;
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
		padding: clamp(3rem, 8vh, 5rem) clamp(2rem, 6vw, 4rem);
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

	.skills__col {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: clamp(2.5rem, 6vh, 3.75rem);
		max-width: 30rem;
	}
	.skills__group-head {
		position: relative;
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		margin-bottom: clamp(0.75rem, 1.8vh, 1.1rem);
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
		transform-origin: left;
	}
	.skills__label {
		font-family: var(--ff-mono);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		color: var(--black);
		flex: 0 0 auto;
		white-space: nowrap;
	}

	.skills__grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: clamp(58px, 7vw, 84px);
		grid-auto-flow: dense;
		gap: clamp(0.35rem, 0.9vw, 0.55rem);
	}
	.skills__box {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		cursor: default;
		transition: transform 0.3s cubic-bezier(0.2, 0.6, 0.2, 1), background-color 0.3s ease,
			border-color 0.3s ease, color 0.3s ease;
	}
	.skills__box--wide {
		grid-column: span 2;
	}
	.skills__box--tall {
		grid-row: span 2;
	}
	.skills__box--solid {
		background: var(--skill-color);
		color: var(--white);
	}
	.skills__box--solid:hover {
		background: var(--black);
	}
	.skills__box--ghost {
		background: var(--white);
		border: 1px solid rgba(10, 10, 10, 0.14);
		color: var(--skill-color);
	}
	.skills__box--ghost:hover {
		color: var(--black);
		border-color: var(--black);
	}
	.skills__box:hover {
		transform: translateY(-3px);
		z-index: 2;
	}
	.skill-icon {
		width: 34%;
		height: 34%;
		color: currentColor;
		transition: transform 0.3s ease, color 0.3s ease;
	}
	.skill-icon:not(.skill-icon--multicolor) path {
		fill: currentColor;
	}
	.skills__box:hover .skill-icon {
		transform: translateY(-9px);
	}
	.skills__box-label {
		position: absolute;
		inset: auto 0 0 0;
		padding: 0.3rem 0.35rem 0.4rem;
		font-family: var(--ff-mono);
		font-size: 0.6rem;
		letter-spacing: 0.02em;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		opacity: 0;
		transform: translateY(8px);
		transition: opacity 0.25s ease, transform 0.25s ease;
		pointer-events: none;
	}
	.skills__box--solid .skills__box-label {
		color: var(--white);
	}
	.skills__box--ghost .skills__box-label {
		color: var(--black);
	}
	.skills__box:hover .skills__box-label {
		opacity: 1;
		transform: translateY(0);
	}

	@keyframes skills-blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
	@keyframes skills-dot-blink {
		0%, 100% { opacity: 0.08; }
		50% { opacity: 0.34; }
	}

	@media (max-width: 860px) {
		.skills {
			grid-template-columns: 1fr;
		}
		.skills__dark {
			position: relative;
			top: auto;
			height: 60vh;
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
			padding: clamp(2.25rem, 7vh, 3rem) clamp(1.5rem, 6vw, 3rem);
		}
		.skills__col {
			position: relative;
			max-width: none;
			gap: 0;
		}
		.skills__group {
			width: 100%;
		}

		.skills__grid {
			grid-template-columns: repeat(3, 1fr);
			grid-auto-rows: clamp(58px, 19vw, 78px);
		}
		.skills__box-label {
			opacity: 1;
			transform: translateY(0);
			font-size: 0.54rem;
			padding-bottom: 0.3rem;
		}
		.skill-icon {
			transform: translateY(-6px);
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
		.skills__box {
			transition: none;
		}
	}
</style>