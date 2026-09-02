<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    siFramer,
    siDocker,
    siLaragon,
  } from "simple-icons";

  import {
    si,
    groqIcon,
    gptIcon,
    codexIcon,
    figmaIcon,
    nineRouterIcon,
  } from "$lib/data/icons";
  import type { SkillIcon } from "$lib/data/icons";

  type SkillItem = {
    name: string;
    icon: SkillIcon;
    color: "a" | "b";
    shape: "a" | "b" | "c";
  };
  type SkillGroup = { label: string; items: SkillItem[] };

  const groups: SkillGroup[] = [
    {
      label: "FRONTEND & DESIGN",
      items: [
        { name: "Next.js", icon: si(siNextdotjs), color: "a", shape: "c" },
        { name: "Figma", icon: figmaIcon, color: "b", shape: "a" },
        { name: "TypeScript", icon: si(siTypescript), color: "a", shape: "b" },
        { name: "React", icon: si(siReact), color: "a", shape: "a" },
        { name: "SvelteKit", icon: si(siSvelte), color: "b", shape: "a" },
        { name: "Vue", icon: si(siVuedotjs), color: "b", shape: "c" },
        { name: "Framer Motion", icon: si(siFramer), color: "a", shape: "a" },
        { name: "GSAP", icon: si(siGsap), color: "b", shape: "a" },
        { name: "Tailwind", icon: si(siTailwindcss), color: "a", shape: "a" },
      ],
    },
    {
      label: "BACKEND & DATABASE",
      items: [
        { name: "Laravel", icon: si(siLaravel), color: "a", shape: "c" },
        { name: "Node.js", icon: si(siNodedotjs), color: "b", shape: "b" },
        { name: "Express", icon: si(siExpress), color: "a", shape: "a" },
        { name: "Neon", icon: si(siNeon), color: "b", shape: "a" },
        { name: "Prisma", icon: si(siPrisma), color: "a", shape: "a" },
        { name: "PostgreSQL", icon: si(siPostgresql), color: "a", shape: "c" },
        { name: "PHP", icon: si(siPhp), color: "b", shape: "a" },
        { name: "MySQL", icon: si(siMysql), color: "a", shape: "a" },
        { name: "Supabase", icon: si(siSupabase), color: "b", shape: "a" },
      ],
    },
    {
      label: "AI-NATIVE WORKFLOW",
      items: [
        { name: "Claude", icon: si(siClaude), color: "a", shape: "b" },
        { name: "9router", icon: nineRouterIcon, color: "b", shape: "a" },
        { name: "Codex", icon: codexIcon, color: "a", shape: "c" },
        { name: "Groq", icon: groqIcon, color: "b", shape: "a" },
        { name: "OpenCode", icon: si(siOpencode), color: "a", shape: "b" },
      ],
    },
    {
      label: "TOOLS & INFRA",
      items: [
        { name: "Git", icon: si(siGit), color: "a", shape: "c" },
        { name: "GitHub", icon: si(siGithub), color: "b", shape: "b" },
        { name: "Vercel", icon: si(siVercel), color: "a", shape: "a" },
        { name: "Docker", icon: si(siDocker), color: "b", shape: "a" },
        { name: "Upstash", icon: si(siUpstash), color: "a", shape: "a" },
        { name: "Laragon", icon: si(siLaragon), color: "b", shape: "a" },
      ],
    },
  ];

  type Shape = "wide" | "tall" | "normal";
  type Fill = "ghost" | "solid";
  type LayoutCell = { shape: Shape; fill: Fill; tone?: string };

  const shapeMap: Record<string, Shape> = {
    a: "normal",
    b: "wide",
    c: "tall",
  };

  function buildLayout(group: SkillGroup, cols = 4): LayoutCell[] {
    let col = 0;
    return group.items.map((item) => {
      let shape: Shape = shapeMap[item.shape] ?? "normal";
      if (shape === "wide" && col % cols === cols - 1) {
        shape = "normal";
      }
      col += shape === "wide" ? 2 : 1;
      const fill: Fill = item.color === "a" ? "solid" : "ghost";
      const tone = fill === "solid" ? "var(--black)" : undefined;
      return { shape, fill, tone };
    });
  }

  const layouts = groups.map((g) => buildLayout(g));

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
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 860px)").matches;

    const darkContent = gsap.utils.toArray<HTMLElement>(
      darkEl.querySelectorAll("[data-reveal]"),
    );
    const darkBg = darkEl.querySelector<HTMLElement>(".skills__dark-bg")!;
    const groupEls = gsap.utils.toArray<HTMLElement>(
      lightEl.querySelectorAll(".skills__group"),
    );

    function boxesOf(group: HTMLElement) {
      return gsap.utils.toArray<HTMLElement>(
        group.querySelectorAll(".skills__box"),
      );
    }
    function headPartsOf(group: HTMLElement) {
      const rule = group.querySelector<HTMLElement>(".skills__rule");
      const labelText = group.querySelectorAll<HTMLElement>(
        ".skills__group-index, .skills__label",
      );
      return { rule, labelText: gsap.utils.toArray<HTMLElement>(labelText) };
    }

    if (reduceMotion) {
      gsap.set(darkEl, { xPercent: 0 });
      gsap.set([headingLine1El, headingLine2El], { y: "0%", x: "0rem" });
      gsap.set(cursorEl, { opacity: 1 });
      gsap.set(darkContent, { opacity: 1, y: 0 });
      gsap.set(lightEl.querySelectorAll(".skills__rule"), { scaleX: 1 });
      gsap.set(
        lightEl.querySelectorAll(".skills__group-index, .skills__label"),
        { opacity: 1 },
      );
      gsap.set(lightEl.querySelectorAll(".skills__box"), {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
      });
      return;
    }

    gsap.set(darkEl, { xPercent: -100 });

    const entryTl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsEl,
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });
    entryTl.fromTo(
      darkEl,
      { xPercent: -100 },
      { xPercent: 0, ease: "none" },
      0,
    );
    entryTl.fromTo(
      darkContent,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.1, ease: "power2.out" },
      0.25,
    );
    entryTl.fromTo(
      headingLine1El,
      { y: "105%", x: "-1.4rem" },
      { y: "0%", x: "0rem", duration: 0.7, ease: "power3.out" },
      0.3,
    );
    entryTl.fromTo(
      headingLine2El,
      { y: "105%", x: "1.4rem" },
      { y: "0%", x: "0rem", duration: 0.7, ease: "power3.out" },
      0.45,
    );
    entryTl.to(cursorEl, { opacity: 1, duration: 0.2 }, 0.95);
    entryTl.fromTo(
      markLightEl,
      { yPercent: -6 },
      { yPercent: 0, ease: "none" },
      0,
    );

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
            start: "top 78%",
            end: "bottom 25%",
            toggleActions: "restart reverse restart reverse",
          },
        });
        if (rule)
          groupTl.to(rule, { scaleX: 1, duration: 0.4, ease: "power2.out" }, 0);
        boxes.forEach((box, i) => {
          const kick = (i % 2 === 0 ? 1 : -1) * gsap.utils.random(3, 8);
          groupTl.fromTo(
            box,
            { opacity: 0, scale: 0.5, y: 14, rotate: kick },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
              duration: 0.45,
              ease: "back.out(1.7)",
            },
            0.1 + i * 0.045,
          );
        });
        if (groupTl.scrollTrigger) groupTriggers.push(groupTl.scrollTrigger);
      });

      exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: skillsEl,
          start: "bottom 85%",
          end: "bottom top",
          scrub: 1,
        },
      });
      exitTl.to(
        [...darkContent, headingEl],
        { opacity: 0, y: -20, duration: 0.5, ease: "power1.in" },
        0,
      );
      exitTl.to(
        darkBg,
        { width: "200%", duration: 0.9, ease: "power1.inOut" },
        0.15,
      );
    } else {
      groupEls.forEach((group) => {
        const { rule } = headPartsOf(group);
        const boxes = boxesOf(group);

        gsap.set(boxes, { opacity: 0, scale: 0.5, y: 14 });
        if (rule) gsap.set(rule, { scaleX: 0 });

        const groupTl = gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            end: "bottom 25%",
            toggleActions: "restart reverse restart reverse",
          },
        });
        if (rule)
          groupTl.to(rule, { scaleX: 1, duration: 0.4, ease: "power2.out" }, 0);
        boxes.forEach((box, i) => {
          const kick = (i % 2 === 0 ? 1 : -1) * gsap.utils.random(3, 8);
          groupTl.fromTo(
            box,
            { opacity: 0, scale: 0.5, y: 14, rotate: kick },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
              duration: 0.45,
              ease: "back.out(1.7)",
            },
            0.1 + i * 0.045,
          );
        });
        if (groupTl.scrollTrigger) groupTriggers.push(groupTl.scrollTrigger);
      });

      // Note: darkBg width:200% exit-tween sengaja dihapus di mobile.
      // .skills__dark udah non-sticky & full-width di breakpoint ini, jadi
      // dia udah lama scroll-past sebelum trigger "bottom 85%" kena — animasinya
      // gak pernah keliatan, tapi width-tween tetap maksa reflow & bikin
      // horizontal overflow (root cause "melebar ke kanan" sebelum GithubActivity muncul).
      exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: skillsEl,
          start: "bottom 85%",
          end: "bottom top",
          scrub: 1,
        },
      });
      exitTl.to(
        [...darkContent, headingEl],
        { opacity: 0, y: -20, duration: 0.5, ease: "power1.in" },
        0,
      );

      return () => {
        entryTl.scrollTrigger?.kill();
        entryTl.kill();
        exitTl?.scrollTrigger?.kill();
        exitTl?.kill();
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
    <div class="skills__dark-bg"></div>
    <span class="skills__dots" aria-hidden="true">
      {#each dots as _}<i></i>{/each}
    </span>
    <span class="skills__mark skills__mark--dark" aria-hidden="true">TOOLS</span
    >
    <div class="skills__dark-content">
      <span class="skills__eyebrow" data-reveal>// SKILLS</span>
      <h2 class="skills__heading" bind:this={headingEl}>
        <span class="line-mask"
          ><span class="line" bind:this={headingLine1El}>WHAT I</span></span
        >
        <span class="line-mask"
          ><span class="line" bind:this={headingLine2El}
            >USE<span class="cursor" bind:this={cursorEl}>_</span></span
          ></span
        >
      </h2>
      <p class="skills__lead" data-reveal>
        Tools and technologies I reach for when build real products.
      </p>
    </div>
  </div>

  <div class="skills__light" bind:this={lightEl}>
    <span class="skills__mark" aria-hidden="true" bind:this={markLightEl}
      >SKILLS</span
    >

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
                style="--skill-color: {item.icon.hex}; {cell.tone
                  ? `--skill-tone: ${cell.tone};`
                  : ''}"
              >
                <svg
                  class="skill-icon"
                  class:skill-icon--multicolor={!!item.icon.svg}
                  viewBox={item.icon.viewBox ?? "0 0 24 24"}
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
    will-change: transform, width;
  }
  .skills__dark-bg {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: var(--black);
    z-index: -1;
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
  .skills__dots i:nth-child(2) {
    animation-delay: 0.3s;
  }
  .skills__dots i:nth-child(3) {
    animation-delay: 0.6s;
  }
  .skills__dots i:nth-child(4) {
    animation-delay: 0.9s;
  }
  .skills__dots i:nth-child(5) {
    animation-delay: 1.2s;
  }
  .skills__dots i:nth-child(6) {
    animation-delay: 1.5s;
  }
  .skills__dots i:nth-child(7) {
    animation-delay: 1.8s;
  }
  .skills__dots i:nth-child(8) {
    animation-delay: 2.1s;
  }
  .skills__dots i:nth-child(9) {
    animation-delay: 2.4s;
  }

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
    transition:
      transform 0.3s cubic-bezier(0.2, 0.6, 0.2, 1),
      background-color 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease;
  }
  .skills__box--wide {
    grid-column: span 2;
  }
  .skills__box--tall {
    grid-row: span 2;
  }
  .skills__box--solid {
    /* Default: kotak solid hitam (--skill-tone). Warna brand asli (--skill-color)
		   baru muncul pas hover. */
    background: var(--skill-tone, var(--black));
    color: var(--white);
  }
  .skills__box--solid:hover {
    background: var(--skill-color);
  }
  .skills__box--ghost {
    background: var(--white);
    border: 1px solid var(--gray-light);
    color: var(--black);
  }
  .skills__box--ghost:hover {
    color: var(--skill-color);
    border-color: var(--skill-color);
  }
  .skills__box:hover {
    transform: translateY(-3px);
    z-index: 2;
  }
  .skill-icon {
    width: 34%;
    height: 34%;
    color: currentColor;
    transition:
      transform 0.3s ease,
      color 0.3s ease,
      filter 0.3s ease;
  }
  .skill-icon:not(.skill-icon--multicolor) path {
    fill: currentColor;
  }
  .skill-icon--multicolor {
    /* Icon custom bawa warna sendiri (Figma dkk) — default digrayscale,
		   warna aslinya baru nongol pas hover, biar konsisten sama sistem baru. */
    filter: grayscale(1);
  }
  .skills__box:hover .skill-icon--multicolor {
    filter: grayscale(0);
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
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
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
      margin-top: 30px;
    }
    .skills__col {
      position: relative;
      max-width: none;
      gap: 2rem;
    }
    .skills__group {
      width: 100%;
    }

    .skills__grid {
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: clamp(58px, 14vw, 78px);
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
