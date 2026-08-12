<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import {
    siTypescript,
    siNodedotjs,
    siAstro,
    siNextdotjs,
    siPostgresql,
    siPrisma,
    siCodemirror,
    siUpstash,
    siReact,
    siExpress,
    siMysql,
    siTailwindcss,
  } from "simple-icons";
  import type { SimpleIcon } from "simple-icons";
  import { groqIcon } from "./icons";
  import type { SkillIcon } from "./icons";

  function si(icon: SimpleIcon): SkillIcon {
    return { hex: `#${icon.hex}`, path: icon.path };
  }

  // Tools without a simple-icons entry (ts-morph, Commander, Recharts, Fonnte)
  // render as text-only pills — omit `icon` rather than guessing a logo.
  type TechItem = {
    name: string;
    icon?: SkillIcon;
  };

  type Project = {
    index: string;
    title: string;
    tag: string;
    thumb: string;
    // Base path WITHOUT extension — .webm/.mp4 are appended in the
    // template so the browser can pick whichever it supports.
    video: string;
    desc: string;
    tech: TechItem[];
    // Optional proof-of-work badges. Only fill these in with numbers you can
    // actually stand behind — leave undefined rather than inventing stats.
    metrics?: string[];
    demo: string;
    repo: string;
  };

  const projects: Project[] = [
    {
      index: "01",
      title: "DEVMAP",
      tag: "Analyze once, reuse context everywhere",
      thumb: "/preview/image/devmap.webp",
      video: "/preview/video/devmap",
      desc: "Maps your codebase through static analysis to give AI agents structured context and a clearer understanding of your project.",
      tech: [
        { name: "TypeScript", icon: si(siTypescript) },
        { name: "Node.js", icon: si(siNodedotjs) },
        { name: "ts-morph" },
        { name: "Commander" },
        { name: "Astro", icon: si(siAstro) },
      ],
      metrics: ["282/282 tests passing", "11 framework supported"],
      demo: "https://devmap-web.vercel.app",
      repo: "https://github.com/itsflaid/devmap",
    },
    {
      index: "02",
      title: "DEVNOTE",
      tag: "A platform for developers to manage and organize code, snippets, resources, and knowledge.",
      thumb: "/preview/image/devnote.webp",
      video: "/preview/video/devnote",
      desc: "Keep your technical knowledge organized in one place, from reusable snippets and resources to notes and collections.",
      tech: [
        { name: "Next.js", icon: si(siNextdotjs) },
        { name: "TypeScript", icon: si(siTypescript) },
        { name: "PostgreSQL", icon: si(siPostgresql) },
        { name: "Codemirror", icon: si(siCodemirror) },
      ],
      metrics: ["39 endpoint", "3 role levels"],
      demo: "https://devnote-five.vercel.app",
      repo: "https://github.com/itsflaid/devnote",
    },
    {
      index: "03",
      title: "CHATME",
      tag: "Chat-UI-based personal notes and reminders web application",
      thumb: "/preview/image/chatme.webp",
      video: "/preview/video/chatme",
      desc: "A simple way to capture thoughts, save notes, and manage reminders through a familiar chat-based interface.",
      tech: [
        { name: "Next.js", icon: si(siNextdotjs) },
        { name: "TypeScript", icon: si(siTypescript) },
        { name: "PostgreSQL", icon: si(siPostgresql) },
        { name: "Upstash", icon: si(siUpstash) },
      ],
      metrics: ["offline-ready", "3+ months of daily use"],
      demo: "https://chatme-jet.vercel.app",
      repo: "https://github.com/itsflaid/chatme",
    },
    {
      index: "04",
      title: "DAILYFIT",
      tag: "Simple daily home workout web application",
      thumb: "/preview/image/dailyfit.webp",
      video: "/preview/video/dailyfit",
      desc: "Follow daily workouts, track completed activities, and keep an eye on your progress through a simple fitness experience.",
      tech: [
        { name: "Next.js", icon: si(siNextdotjs) },
        { name: "TypeScript", icon: si(siTypescript) },
        { name: "PostgreSQL", icon: si(siPostgresql) },
        { name: "Prisma", icon: si(siPrisma) },
      ],
      metrics: ["PDF reports", "487 movement logged"],
      demo: "https://dailyfit-alpha.vercel.app",
      repo: "https://github.com/itsflaid/dailyfit",
    },
    {
      index: "05",
      title: "MUFADZ PORTAL",
      tag: "An all-in-one platform for Islamic services, from Quran to prayer schedule.",
      thumb: "/preview/image/mufadz.webp",
      video: "/preview/video/mufadz",
      desc: "Brings Islamic services together in one platform — Quran reader and prayer schedule anchor daily use, alongside dzikir, zakat calculator, and an AI chatbot.",
      tech: [
        { name: "React", icon: si(siReact) },
        { name: "TypeScript", icon: si(siTypescript) },
        { name: "Express", icon: si(siExpress) },
        { name: "MySQL", icon: si(siMysql) },
      ],
      metrics: ["25 Stars", "3 APIs integrated"],
      demo: "https://mufadz-app.vercel.app",
      repo: "https://github.com/itsflaid/mufadz-portal",
    },
    {
      index: "06",
      title: "DE HOME SPA",
      tag: "An AI-powered home spa platform for personalized treatment recommendations and guidance.",
      thumb: "/preview/image/de-home-spa.webp",
      video: "/preview/video/dehomespa",
      desc: "Get personalized home spa recommendations based on your needs through guided selections or direct conversations with AI.",
      tech: [
        { name: "Next.js", icon: si(siNextdotjs) },
        { name: "TypeScript", icon: si(siTypescript) },
        { name: "Groq", icon: groqIcon },
        { name: "Fonnte" },
      ],
      metrics: ["Ranked 6th — TechnoFest 2026 FE AI Hackathon"],
      demo: "http://de-home-spa-v2-uwxp.vercel.app/",
      repo: "https://github.com/itsflaid/de-home-spa-v2",
    },
  ];

  let workEl: HTMLElement;
  let viewportEl: HTMLElement;
  let trackEl: HTMLElement;
  let introLine1El: HTMLElement;
  let introLine2El: HTMLElement;
  let introCursorEl: HTMLElement;
  let introContentEl: HTMLElement;
  let outroContentEl: HTMLElement;
  let outroLine1El: HTMLElement;
  let outroLine2El: HTMLElement;
  let outroListEl: HTMLElement;
  let outroLinkEl: HTMLElement;
  let activeIndex = 0;
  let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({ ignoreMobileResize: true });

    	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (reduceMotion) {
		gsap.set([introLine1El, introLine2El], { y: '0%' });
		gsap.set(introCursorEl, { opacity: 1 });
		gsap.set([outroLine1El, outroLine2El], { y: '0%' });
		gsap.set([outroListEl, outroLinkEl], { opacity: 1 });
		return;
	}

	let edgeGap = 0;
	const setSpacing = () => {
		const card = trackEl.querySelector(
			'.work__card:not(.work__card--intro):not(.work__card--outro)'
		) as HTMLElement | null;
		if (!card) return;
		edgeGap = Math.max(0, (viewportEl.clientWidth - card.offsetWidth) / 2);
		trackEl.style.paddingLeft = `${edgeGap}px`;
		trackEl.style.paddingRight = `${edgeGap}px`;
		// Koreksi statis aja (bukan animasi) — posisi awal tetap center,
		// tapi geraknya nanti murni ikut transform trackEl, gak ada delay.
		if (introContentEl) gsap.set(introContentEl, { x: -edgeGap });
		if (outroContentEl) gsap.set(outroContentEl, { x: edgeGap });
	};
	setSpacing();
	ScrollTrigger.addEventListener('refreshInit', setSpacing);

	const getScroll = () => Math.max(0, trackEl.scrollWidth - viewportEl.clientWidth);

	// ── Entrance reveal — full scroll-scrubbed, tanpa autoplay/durasi tetap ──
	// Progress-nya nempel langsung ke posisi scroll (gak snap, gak lag aneh).
	// Selesai pas 'top top', jadi begitu pin aktif (section di tengah), teks
	// udah full kebentuk duluan.
	const introTl = gsap.timeline({
		scrollTrigger: {
			trigger: workEl,
			start: 'top 90%',
			end: 'top top',
			scrub: 0.4 // naikkan buat lebih "lag"/smooth, turunkan biar makin nempel ke scroll
		}
	});
	introTl
		.fromTo(introLine1El, { y: '105%' }, { y: '0%', ease: 'none' }, 0)
		.fromTo(introLine2El, { y: '105%' }, { y: '0%', ease: 'none' }, 0.18)
		.fromTo(introCursorEl, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.55);

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

	// Horizontal track only — introContentEl sekarang child biasa dari
	// track, jadi gerak barengan persis sama rate-nya kayak dots grid
	// dan card lain sejak scroll pertama dimulai.
	tl.to(trackEl, { x: () => -getScroll(), duration: 1, ease: 'none' }, 0);

	// Outro (still scrubbed)
	tl.fromTo(outroLine1El, { y: '105%' }, { y: '0%', duration: 0.05, ease: 'power2.out' }, 0.85);
	tl.fromTo(outroLine2El, { y: '105%' }, { y: '0%', duration: 0.05, ease: 'power2.out' }, 0.89);
	tl.fromTo(outroListEl, { opacity: 0 }, { opacity: 1, duration: 0.03, ease: 'power1.out' }, 0.93);
	tl.fromTo(outroLinkEl, { opacity: 0 }, { opacity: 1, duration: 0.03, ease: 'power1.out' }, 0.96);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    // ── video swap logic (unchanged) ──
    const pans = gsap.utils.toArray<HTMLElement>(
      trackEl.querySelectorAll(".media__pan"),
    );
    const swapTimers = new Map<HTMLElement, number>();
    const swapped = new Set<HTMLElement>();
    const primed = new Set<HTMLElement>();
    const VIDEO_SWAP_DELAY = 250;

    const clearSwapTimer = (pan: HTMLElement) => {
      const id = swapTimers.get(pan);
      if (id !== undefined) {
        window.clearTimeout(id);
        swapTimers.delete(pan);
      }
    };

    const primeVideo = (pan: HTMLElement, video: HTMLVideoElement) => {
      if (primed.has(pan)) return;
      primed.add(pan);
      video.preload = "auto";
      video.load();
    };

    const preloadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const pan = entry.target as HTMLElement;
          const video = pan.querySelector("video");
          if (!video) return;
          primeVideo(pan, video);
        });
      },
      { threshold: 0, rootMargin: "0px 40%" },
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const pan = entry.target as HTMLElement;
          const video = pan.querySelector("video");
          if (!video) return;
          if (entry.isIntersecting) {
            if (!swapped.has(pan)) {
              swapped.add(pan);
              primeVideo(pan, video);
              const id = window.setTimeout(() => {
                swapTimers.delete(pan);
                pan.classList.add("is-video");
                video.play().catch(() => {});
              }, VIDEO_SWAP_DELAY);
              swapTimers.set(pan, id);
            } else {
              video.play().catch(() => {});
            }
          } else {
            video.pause();
            if (swapTimers.has(pan)) {
              clearSwapTimer(pan);
              swapped.delete(pan);
            }
          }
        });
      },
      { threshold: 0.35 },
    );

    pans.forEach((pan) => {
      preloadObserver.observe(pan);
      observer.observe(pan);
    });

    const resetAll = () => {
      pans.forEach((pan) => {
        const video = pan.querySelector("video");
        if (!video) return;
        clearSwapTimer(pan);
        pan.classList.remove("is-video");
        swapped.delete(pan);
        primed.delete(pan);
        video.pause();
        video.currentTime = 0;
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) resetAll();
        });
      },
      { threshold: 0 },
    );
    sectionObserver.observe(workEl);

    return () => {
      window.removeEventListener("load", onLoad);
      ScrollTrigger.removeEventListener("refreshInit", setSpacing);
      swapTimers.forEach((id) => window.clearTimeout(id));
      preloadObserver.disconnect();
      observer.disconnect();
      sectionObserver.disconnect();
      introTl.scrollTrigger?.kill();
      introTl.kill();
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  });
</script>

<section class="work" id="work" bind:this={workEl}>
  <img
    class="work__mark"
    src="/logo/logo-mark.png"
    alt=""
    aria-hidden="true"
    draggable="false"
  />
  <div class="work__head">
    <span class="work__eyebrow">// WORK</span>
    <div class="work__head-right">
      <span class="work__count">0{activeIndex + 1} / 0{projects.length}</span>
    </div>
  </div>

  <div class="work__viewport" bind:this={viewportEl} data-cursor-text="DRAG">
    <ul class="work__track" bind:this={trackEl}>
      <li class="work__card work__card--intro">
        <span class="work__dots" aria-hidden="true">
          {#each dots as _}<i></i>{/each}
        </span>
        <div class="intro__content" bind:this={introContentEl}>
          <h2 class="intro__heading">
            <span class="line-mask"
              ><span class="line" bind:this={introLine1El}>FEATURED</span></span
            >
            <span class="line-mask"
              ><span class="line" bind:this={introLine2El}
                >WORK<span class="cursor" bind:this={introCursorEl}>_</span
                ></span
              ></span
            >
          </h2>
          <span class="intro__scroll">
            SCROLL TO EXPLORE
            <svg viewBox="0 0 24 24" aria-hidden="true"
              ><path d="M12 4v16m0 0-6-6m6 6 6-6" /></svg
            >
          </span>
        </div>
      </li>
      {#each projects as project, i}
        <li class="work__card">
          <div class="card__media">
            <div class="media__pan">
              <img
                class="media__img"
                src={project.thumb}
                alt="{project.title} preview"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
              <video
                class="media__video"
                muted
                loop
                playsinline
                preload="metadata"
                aria-hidden="true"
                tabindex="-1"
              >
                <source src="{project.video}.webm" type="video/webm" />
                <source src="{project.video}.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div class="card__info">
            <div class="card__row">
              <span class="card__index">{project.index}</span>
              <h3 class="card__title">{project.title}</h3>
            </div>
            <p class="card__tag">{project.tag}</p>
            {#if project.metrics?.length}
              <ul class="card__metrics">
                {#each project.metrics as metric}
                  <li>{metric}</li>
                {/each}
              </ul>
            {/if}
            <p class="card__desc">{project.desc}</p>
            <div class="card__tech">
              <span class="tech__label">STACK</span>
              <ul class="tech__list">
                {#each project.tech as tech}
                  <li style={tech.icon ? `--tech-color: ${tech.icon.hex}` : ""}>
                    {#if tech.icon}
                      <svg
                        class="tech-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        ><path d={tech.icon.path} fill-rule="evenodd" /></svg
                      >
                    {/if}
                    <span>{tech.name}</span>
                  </li>
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
                <svg viewBox="0 0 24 24" aria-hidden="true"
                  ><path d="M7 17 17 7M8 7h9v9" /></svg
                >
              </a>
              <a
                class="card__btn card__btn--repo"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg class="card__btn-gh" viewBox="0 0 24 24" aria-hidden="true"
                  ><path
                    d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5.01 0c1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
                  /></svg
                >
                <span>Repository</span>
              </a>
            </div>
          </div>
        </li>
      {/each}

      <li class="work__card work__card--outro">
        <div class="outro__content" bind:this={outroContentEl}>
          <h2 class="outro__heading">
            <span class="line-mask"
              ><span class="line" bind:this={outroLine1El}>THAT'S THE</span
              ></span
            >
            <span class="line-mask"
              ><span class="line" bind:this={outroLine2El}>HIGHLIGHT REEL</span
              ></span
            >
          </h2>
          <div class="outro__list-group" bind:this={outroListEl}>
            <span class="outro__list-label">Other Projects:</span>
            <ul class="outro__list">
              <li>
                <a href="https://github.com/itsflaid/mynime" target="_blank" rel="noopener noreferrer"
                  >MyNime <span>· Vue</span></a
                >
              </li>
              <li>
                <a
                  href="https://github.com/itsflaid/techgear-store-v2"
                  target="_blank"
                  rel="noopener noreferrer"
                  >TechGear Store <span>· PHP</span></a
                >
              </li>
              <li>
                <a
                  href="https://github.com/itsflaid/gamefy-topup"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Topup Games <span>· Laravel</span></a
                >
              </li>
              <li>
                <a href="https://github.com/itsflaid/portfolio" target="_blank" rel="noopener noreferrer"
                  >This Portfolio <span>· SvelteKit</span></a
                >
              </li>
            </ul>
          </div>
          <a
            class="outro__link"
            href="https://github.com/Mufacoderz"
            target="_blank"
            rel="noopener noreferrer"
            bind:this={outroLinkEl}
          >
            MORE ON GITHUB
            <svg viewBox="0 0 24 24" aria-hidden="true"
              ><path d="M7 17 17 7M17 7H9m8 0v8" /></svg
            >
          </a>
        </div>
      </li>
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
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
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
  .work__dots i {
    display: block;
    width: 8px;
    height: 8px;
    background: var(--black);
    font-style: normal;
    opacity: 0.1;
    animation: work-dot-blink 3s ease-in-out infinite;
  }
  .work__dots i:nth-child(2) {
    animation-delay: 0.3s;
  }
  .work__dots i:nth-child(3) {
    animation-delay: 0.6s;
  }
  .work__dots i:nth-child(4) {
    animation-delay: 0.9s;
  }
  .work__dots i:nth-child(5) {
    animation-delay: 1.2s;
  }
  .work__dots i:nth-child(6) {
    animation-delay: 1.5s;
  }
  .work__dots i:nth-child(7) {
    animation-delay: 1.8s;
  }
  .work__dots i:nth-child(8) {
    animation-delay: 2.1s;
  }
  .work__dots i:nth-child(9) {
    animation-delay: 2.4s;
  }

  .work__card.work__card--intro,
  .work__card.work__card--outro {
    position: relative;
    flex: 0 0 auto;
    width: 100vw;
    max-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--black);
  }
  .intro__content,
  .outro__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(1.25rem, 3vh, 2rem);
    text-align: center;
    padding: 0 1.5rem;
  }
  .intro__heading,
  .outro__heading {
    margin: 0;
    font-family: var(--ff-display);
    font-weight: 400;
    line-height: 0.95;
    letter-spacing: 0.01em;
    font-size: clamp(2.6rem, 7vw, 5.5rem);
  }
  .outro__list-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
  }
  .outro__list-label {
    font-family: var(--ff-mono);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    color: var(--gray);
  }
  .outro__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-family: var(--ff-body);
    font-weight: 400;
    font-size: 0.9rem;
    letter-spacing: 0.01em;
    color: var(--gray);
  }
  .outro__list li {
    display: flex;
    align-items: center;
  }
  .outro__list li span {
    color: var(--accent-ph);
    margin-left: 0.3rem;
  }
  .outro__list li:not(:last-child)::after {
    content: "|";
    margin: 0 0.9rem;
    color: var(--accent-ph);
  }
  .outro__list li a {
    display: inline-flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }
  .outro__list li a:hover {
    opacity: 0.6;
  }
  .outro__link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--ff-mono);
    font-weight: 400;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    color: var(--black);
    text-decoration: none;
    border-bottom: 1px solid var(--black);
    padding-bottom: 0.15rem;
    transition: opacity 0.2s ease;
  }
  .outro__link:hover {
    opacity: 0.6;
  }
  .outro__link svg {
    width: 13px;
    height: 13px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
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
    animation: work-blink 1s step-end infinite;
  }
  .intro__scroll {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--ff-mono);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    color: var(--gray);
  }
  .intro__scroll svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    animation: intro-scroll-bounce 1.6s ease-in-out infinite;
  }
  @keyframes intro-scroll-bounce {
    0%,
    100% {
      transform: translateY(0);
      opacity: 0.6;
    }
    50% {
      transform: translateY(5px);
      opacity: 1;
    }
  }
  @keyframes work-blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
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
    flex: 1;
    display: flex;
    align-items: center;
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
    width: clamp(85vw, 88vw, 1200px);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: clamp(2rem, 4vw, 4rem);
  }
  .card__media {
    position: relative;
    flex: 0 0 52%;
    min-width: 0;
    aspect-ratio: 4 / 3;
    max-height: clamp(320px, 60vh, 720px);
    overflow: hidden;
    background: var(--accent-ph);
    box-shadow: 0 24px 48px rgba(10, 10, 10, 0.1);
    transition: transform 0.6s cubic-bezier(0.2, 0.6, 0.2, 1);
  }
  .media__pan {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .media__pan img,
  .media__pan video {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .media__pan img {
    transition: opacity 0.6s ease;
  }
  .media__pan video {
    /* Source clips are 4:3, matching .card__media 1:1 now that the pan
		   box is no longer oversized for the old parallax slide, so `cover`
		   fills the frame with no extra crop. */
    object-fit: cover;
    background: #000;
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  :global(.media__pan.is-video) .media__img {
    opacity: 0;
  }
  :global(.media__pan.is-video) .media__video {
    opacity: 1;
  }

  .work__card:hover .card__media {
    transform: scale(1.02);
  }
  .card__info {
    display: flex;
    flex-direction: column;
    gap: clamp(0.5rem, 1.2vh, 0.85rem);
    flex: 1 1 auto;
    min-width: 0;
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
    font-size: clamp(1.35rem, 2vw, 1.9rem);
    line-height: 1;
  }
  .card__tag {
    font-family: var(--ff-body);
    font-size: clamp(0.78rem, 0.95vw, 0.9rem);
    color: var(--ink-soft);
    opacity: 0.75;
    max-width: 42ch;
  }
  .card__metrics {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .card__metrics li {
    font-family: var(--ff-mono);
    font-size: 0.65rem;
    letter-spacing: 0.04em;
    color: var(--white);
    background: var(--black);
    border-radius: 999px;
    padding: 0.3rem 0.7rem;
    white-space: nowrap;
  }
  .card__desc {
    font-family: var(--ff-body);
    font-size: clamp(0.82rem, 1vw, 0.95rem);
    line-height: 1.55;
    color: var(--gray);
    max-width: 52ch;
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
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--ff-mono);
    font-size: 0.65rem;
    letter-spacing: 0.03em;
    color: var(--black);
    border: 1px solid rgba(10, 10, 10, 0.25);
    border-radius: 999px;
    padding: 0.25rem 0.6rem;
    white-space: nowrap;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease,
      color 0.15s ease;
  }
  .tech__list li:hover {
    background: var(--tech-color, var(--black));
    border-color: transparent;
    color: var(--white);
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
    transition:
      transform 0.3s cubic-bezier(0.2, 0.6, 0.2, 1),
      background 0.3s ease,
      color 0.3s ease,
      border-color 0.3s ease;
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

    .work__head {
      margin: 0 1.25rem;
      padding-bottom: 0.85rem;
    }

    .work__dots {
      display: none;
    }

    .work__head-right {
      gap: 0.5rem;
    }

    .work__card {
      flex-direction: column;
      align-items: stretch;
      width: 92vw;
      gap: clamp(1.25rem, 3vh, 2rem);
    }
    .card__media {
      flex: 0 0 auto;
      width: 100%;
      max-height: clamp(180px, 32vh, 300px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .work__dots i {
      animation: none;
    }
    .card__media {
      transition: none;
    }
    .media__pan video {
      display: none;
    }
    .intro__scroll svg {
      animation: none;
    }
    .cursor {
      animation: none;
    }

    /* No pin/scrub runs at all in this mode (see reduceMotion branch in
		   the script), so the track must lay out as a normal stacked column
		   that flows with ordinary page scroll — otherwise work__viewport's
		   overflow:hidden would leave every card past the first one
		   permanently unreachable. */
    .work__viewport {
      overflow: visible;
      align-items: flex-start;
    }
    .work__track {
      flex-direction: column;
      width: auto;
      padding: 0;
      gap: clamp(1.5rem, 4vh, 3rem);
    }
    .work__card,
    .work__card.work__card--intro,
    .work__card.work__card--outro {
      width: 92vw;
      max-width: 92vw;
      margin: 0 auto;
    }
    .work__card:not(.work__card--intro):not(.work__card--outro) {
      flex-direction: column;
      align-items: stretch;
      gap: clamp(1.25rem, 3vh, 2rem);
    }
    .work__card--intro,
    .work__card--outro {
      padding: clamp(3rem, 8vh, 5rem) 1.5rem;
    }
    .card__media {
      flex: 0 0 auto;
      width: 100%;
      max-height: clamp(180px, 32vh, 300px);
    }
  }
</style>