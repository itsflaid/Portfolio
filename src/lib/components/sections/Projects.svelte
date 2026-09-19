<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { featuredProjects } from "$lib/data/project";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import { registerCaseStudyClose } from "$lib/caseStudy";
  import { registerTechModalClose } from "$lib/techModal";

  let projectsEl: HTMLElement;
  let introEl: HTMLElement;
  let introLine1El: HTMLElement;
  let introLine2El: HTMLElement;
  let introCursorEl: HTMLElement;
  let outroEl: HTMLElement;
  let outroLine1El: HTMLElement;
  let outroLine2El: HTMLElement;
  let outroLinkEl: HTMLElement;
  let activeIndex = 0;
  let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  let modalOpen = false;
  let pausedPreviews = new Set<HTMLElement>();

  function pausePreviews() {
    modalOpen = true;
    if (!projectsEl) return;
    const pans = gsap.utils.toArray<HTMLElement>(
      projectsEl.querySelectorAll(".media__pan"),
    );
    pausedPreviews.clear();
    pans.forEach((pan) => {
      const video = pan.querySelector("video");
      if (!video) return;
      if (!video.paused) pausedPreviews.add(pan);
      video.pause();
      pan.classList.remove("is-video");
    });
  }

  function resumePreviews() {
    modalOpen = false;
    if (!projectsEl) return;
    const pans = gsap.utils.toArray<HTMLElement>(
      projectsEl.querySelectorAll(".media__pan"),
    );
    pans.forEach((pan) => {
      const video = pan.querySelector("video");
      if (!video) return;
      if (pausedPreviews.has(pan)) {
        pan.classList.add("is-video");
        video.play().catch(() => {});
      }
    });
    pausedPreviews.clear();
  }

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const pans = gsap.utils.toArray<HTMLElement>(
      projectsEl.querySelectorAll(".media__pan"),
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

    let activeVideoPan: HTMLElement | null = null;

    const playPanVideo = (pan: HTMLElement, video: HTMLVideoElement) => {
      if (activeVideoPan && activeVideoPan !== pan) {
        activeVideoPan.querySelector<HTMLVideoElement>("video")?.pause();
      }
      activeVideoPan = pan;
      pan.classList.add("is-video");
      video.play().catch(() => {});
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
      { threshold: 0, rootMargin: "40% 0px" },
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
                if (modalOpen) {
                  swapTimers.delete(pan);
                  swapped.delete(pan);
                  return;
                }
                swapTimers.delete(pan);
                playPanVideo(pan, video);
              }, VIDEO_SWAP_DELAY);
              swapTimers.set(pan, id);
            } else {
              playPanVideo(pan, video);
            }
          } else {
            video.pause();
            if (activeVideoPan === pan) activeVideoPan = null;
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
    sectionObserver.observe(projectsEl);

    if (reduceMotion) {
      gsap.set([introLine1El, introLine2El], { y: "0%" });
      gsap.set(introCursorEl, { opacity: 1 });
      gsap.set([outroLine1El, outroLine2El], { y: "0%" });
      gsap.set(outroLinkEl, { opacity: 1 });
      gsap.set([".project__media", ".project__info"], {
        opacity: 1,
        xPercent: 0,
      });

      return () => {
        swapTimers.forEach((id) => window.clearTimeout(id));
        preloadObserver.disconnect();
        observer.disconnect();
        sectionObserver.disconnect();
      };
    }

    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: introEl,
        start: "top 80%",
        end: "bottom top",
        toggleActions: "restart reverse restart reverse",
      },
    });
    introTl
      .fromTo(
        introLine1El,
        { y: "105%" },
        { y: "0%", duration: 0.6, ease: "power2.out" },
        0,
      )
      .fromTo(
        introLine2El,
        { y: "105%" },
        { y: "0%", duration: 0.6, ease: "power2.out" },
        0.15,
      )
      .fromTo(introCursorEl, { opacity: 0 }, { opacity: 1, ease: "none" }, 0.5);

    const outroTl = gsap.timeline({
      scrollTrigger: {
        trigger: outroEl,
        start: "top 80%",
        end: "bottom top",
        toggleActions: "restart reverse restart reverse",
      },
    });
    outroTl
      .fromTo(
        outroLine1El,
        { y: "105%" },
        { y: "0%", duration: 0.6, ease: "power2.out" },
        0,
      )
      .fromTo(
        outroLine2El,
        { y: "105%" },
        { y: "0%", duration: 0.6, ease: "power2.out" },
        0.12,
      )
      .fromTo(
        outroLinkEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
        0.35,
      );

    const projectTriggers: ScrollTrigger[] = [];
    const projectEls = gsap.utils.toArray<HTMLElement>(".project");
    const isMobileLayout = window.matchMedia("(max-width: 900px)").matches;

    projectEls.forEach((el) => {
      const media = el.querySelector<HTMLElement>(".project__media");
      const info = el.querySelector<HTMLElement>(".project__info");
      if (!media || !info) return;

      let leftEl: HTMLElement;
      let rightEl: HTMLElement;

      if (isMobileLayout) {
        leftEl = media;
        rightEl = info;
      } else {
        const isReversed = el.classList.contains("project--reverse");
        leftEl = isReversed ? info : media;
        rightEl = isReversed ? media : info;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 45%",
          scrub: 0.6,
        },
      });

      tl.fromTo(
        leftEl,
        { xPercent: -115, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: "none" },
        0,
      ).fromTo(
        rightEl,
        { xPercent: 115, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: "none" },
        0,
      );

      if (tl.scrollTrigger) projectTriggers.push(tl.scrollTrigger);
    });

    const parallaxTriggers: ScrollTrigger[] = [];
    pans.forEach((pan) => {
      const layers = pan.querySelectorAll<HTMLElement>("img, video");
      if (!layers.length) return;

      const parallaxTween = gsap.fromTo(
        layers,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: pan,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      if (parallaxTween.scrollTrigger)
        parallaxTriggers.push(parallaxTween.scrollTrigger);
    });

    const indexTriggers = projectEls.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => (activeIndex = i),
        onEnterBack: () => (activeIndex = i),
      }),
    );

    registerCaseStudyClose(resumePreviews);
    registerTechModalClose(resumePreviews);

    return () => {
      swapTimers.forEach((id) => window.clearTimeout(id));
      preloadObserver.disconnect();
      observer.disconnect();
      sectionObserver.disconnect();
      introTl.scrollTrigger?.kill();
      introTl.kill();
      outroTl.scrollTrigger?.kill();
      outroTl.kill();
      projectTriggers.forEach((st) => st.kill());
      parallaxTriggers.forEach((st) => st.kill());
      indexTriggers.forEach((st) => st.kill());
    };
  });
</script>

<section class="projects" id="projects" bind:this={projectsEl}>
  <img
    class="projects__mark"
    src="/logo/logo-mark.png"
    alt=""
    aria-hidden="true"
    draggable="false"
  />
  <div class="projects__head">
    <span class="projects__eyebrow">// PROJECTS</span>
    <div class="projects__head-right">
      <span class="projects__count">0{activeIndex + 1} / 0{featuredProjects.length}</span>
    </div>
  </div>

  <div class="projects__intro" bind:this={introEl}>
    <span class="projects__dots" aria-hidden="true">
      {#each dots as _}<i></i>{/each}
    </span>
    <div class="intro__content">
      <h2 class="intro__heading">
        <span class="line-mask"
          ><span class="line" bind:this={introLine1El}>FEATURED</span></span
        >
        <span class="line-mask"
          ><span class="line" bind:this={introLine2El}
            >PROJECTS<span class="cursor" bind:this={introCursorEl}>_</span
            ></span
          ></span
        >
      </h2>
      <span class="intro__scroll">
        SCROLL TO EXPLORE
        <svg viewBox="0 0 24 24" aria-hidden="true"
          ><path d="M4 12h16m0 0-6-6m6 6-6 6" /></svg
        >
      </span>
    </div>
  </div>

  <ul class="projects__list">
    {#each featuredProjects as project, i}
      <ProjectCard
        project={project}
        reversed={i % 2 === 1}
        onPreviewPause={pausePreviews}
      />
    {/each}
  </ul>

  <div class="projects__outro" bind:this={outroEl}>
    <div class="outro__content">
      <h2 class="outro__heading">
        <span class="line-mask"
          ><span class="line" bind:this={outroLine1El}>THAT'S THE</span></span
        >
        <span class="line-mask"
          ><span class="line" bind:this={outroLine2El}>HIGHLIGHT REEL</span></span
        >
      </h2>
      <a
        class="outro__cta"
        href="/projects"
        bind:this={outroLinkEl}
      >
        See All Projects
        <svg viewBox="0 0 24 24" aria-hidden="true"
          ><path d="M4 12h16m0 0-6-6m6 6-6 6" /></svg
        >
      </a>
    </div>
  </div>
</section>

<style>
  .projects {
    position: relative;
    background: var(--white);
    color: var(--black);
    z-index: 3;
    overflow: hidden;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    padding: clamp(5rem, 10vh, 8rem) 0 clamp(2rem, 6vh, 3.5rem);
  }
  .projects__mark {
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

  .projects__head {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 0 clamp(1.5rem, 5vw, 4rem);
    padding-bottom: clamp(1.5rem, 3.2vh, 2rem);
    border-bottom: 1px solid rgba(10, 10, 10, 0.14);
  }
  .projects__eyebrow,
  .projects__count {
    font-family: var(--ff-mono);
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    color: var(--gray);
  }
  .projects__head-right {
    display: flex;
    align-items: center;
    gap: clamp(1rem, 2vw, 1.5rem);
  }

  .projects__intro {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(4rem, 10vh, 7rem) 1.5rem;
  }
  .projects__dots {
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
  .projects__dots i {
    display: block;
    width: 8px;
    height: 8px;
    background: var(--black);
    font-style: normal;
    opacity: 0.1;
    animation: projects-dot-blink 3s ease-in-out infinite;
  }
  .projects__dots i:nth-child(2) { animation-delay: 0.3s; }
  .projects__dots i:nth-child(3) { animation-delay: 0.6s; }
  .projects__dots i:nth-child(4) { animation-delay: 0.9s; }
  .projects__dots i:nth-child(5) { animation-delay: 1.2s; }
  .projects__dots i:nth-child(6) { animation-delay: 1.5s; }
  .projects__dots i:nth-child(7) { animation-delay: 1.8s; }
  .projects__dots i:nth-child(8) { animation-delay: 2.1s; }
  .projects__dots i:nth-child(9) { animation-delay: 2.4s; }

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
  .outro__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 1.75rem;
    background: var(--black);
    color: var(--white);
    font-family: var(--ff-mono);
    font-weight: 400;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-decoration: none;
    transition:
      transform 0.3s cubic-bezier(0.2, 0.6, 0.2, 1),
      background 0.3s ease;
  }
  .outro__cta:hover {
    background: var(--accent-ph);
    transform: translateY(-2px);
  }
  .outro__cta svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
  }
  .line-mask { display: block; overflow: hidden; }
  .line { display: block; transform: translateY(105%); }
  .cursor {
    display: inline-block;
    font-family: var(--ff-mono);
    margin-left: 0.05em;
    opacity: 0;
    animation: projects-blink 1s step-end infinite;
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
    0%, 100% { transform: translateX(0); opacity: 0.6; }
    50%      { transform: translateX(5px); opacity: 1; }
  }
  @keyframes projects-blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0; }
  }

  .projects__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: clamp(4rem, 10vh, 8rem);
  }

  .projects__outro {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(4rem, 10vh, 7rem) 1.5rem;
  }

  @keyframes projects-dot-blink {
    0%, 100% { opacity: 0.06; }
    50%      { opacity: 0.32; }
  }

  /* ---- Mobile: layout tetap seperti versi pre-redesign, tidak diubah. ---- */
  @media (max-width: 900px) {
    .projects {
      padding-top: clamp(2.5rem, 6vh, 4rem);
    }
    .projects__head {
      margin: 0 1.25rem;
      padding-bottom: 0.85rem;
    }
    .projects__dots { display: none; }
    .projects__head-right { gap: 0.5rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .projects__dots i { animation: none; }
    .intro__scroll svg { animation: none; }
    .cursor { animation: none; }
  }
</style>