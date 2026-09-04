<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { projects } from "$lib/data/project";
  import { openCaseStudyModal, registerCaseStudyClose } from "$lib/caseStudy";
  import { openTechModal, registerTechModalClose } from "$lib/techModal";

  let projectsEl: HTMLElement;
  let introEl: HTMLElement;
  let introLine1El: HTMLElement;
  let introLine2El: HTMLElement;
  let introCursorEl: HTMLElement;
  let outroEl: HTMLElement;
  let outroLine1El: HTMLElement;
  let outroLine2El: HTMLElement;
  let outroListEl: HTMLElement;
  let outroLinkEl: HTMLElement;
  let activeIndex = 0;
  let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  let modalOpen = false;
  let pausedPreviews = new Set<HTMLElement>();

  function techTotalCount(project: (typeof projects)[number]) {
    return project.techGroups?.reduce((sum, g) => sum + g.items.length, 0) ?? 0;
  }

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
                pan.classList.add("is-video");
                video.play().catch(() => {});
              }, VIDEO_SWAP_DELAY);
              swapTimers.set(pan, id);
            } else {
              pan.classList.add("is-video");
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
    sectionObserver.observe(projectsEl);

    if (reduceMotion) {
      gsap.set([introLine1El, introLine2El], { y: "0%" });
      gsap.set(introCursorEl, { opacity: 1 });
      gsap.set([outroLine1El, outroLine2El], { y: "0%" });
      gsap.set([outroListEl, outroLinkEl], { opacity: 1 });
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
        outroListEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
        0.35,
      )
      .fromTo(
        outroLinkEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
        0.45,
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
        { yPercent: -6 },
        {
          yPercent: 6,
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
      <span class="projects__count">0{activeIndex + 1} / 0{projects.length}</span>
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
    {#each projects as project, i}
      <li class="project" class:project--reverse={i % 2 === 1}>
        <div class="project__media">
          <div class="media__pan">
            <img
              class="media__img"
              src={project.thumb}
              alt="{project.title} preview"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
            {#if project.video}
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
            {/if}
          </div>
        </div>
        <div class="project__info">
          <div class="project__index-row">
            <span class="project__index">{project.index}</span>
            <h3 class="project__title">{project.title}</h3>
          </div>
          <span class="project__rule" aria-hidden="true"></span>
          <p class="project__tag">{project.tag}</p>
          {#if project.metrics?.length}
            <ul class="project__metrics">
              {#each project.metrics as metric}
                <li>{metric}</li>
              {/each}
            </ul>
          {/if}
          <p class="project__desc">{project.desc}</p>
          <div class="project__tech">
            <span class="tech__label">STACK</span>
            <ul class="tech__list">
              {#if project.techPreview && project.techGroups}
                {#each project.techPreview as tech}
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
                {#if techTotalCount(project) > project.techPreview.length}
                  <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
                  <li
                    class="tech__more"
                    role="button"
                    tabindex="0"
                    onclick={() => {
                      pausePreviews();
                      openTechModal(project);
                    }}
                    onkeydown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        pausePreviews();
                        openTechModal(project);
                      }
                    }}
                  >
                    <span
                      >+{techTotalCount(project) - project.techPreview.length}
                      MORE</span
                    >
                  </li>
                {/if}
              {/if}
            </ul>
          </div>
          <div class="project__actions">
            {#if project.caseStudy}
              <div class="project__actions-left">
                <button
                  type="button"
                  class="project__btn project__btn--case"
                  onclick={() => {
                    pausePreviews();
                    openCaseStudyModal(project);
                  }}
                  data-cursor-text="READ"
                >
                  <span>Case Study</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true"
                    ><path
                      d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
                    /><path
                      d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                    /></svg
                  >
                </button>
              </div>
            {/if}
            <div class="project__actions-right">
              {#if project.demo}
                <a
                  class="project__btn project__btn--demo"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={project.demoLabel ?? "Live Demo"}
                >
                  <span>{project.demoLabel ?? "Live Demo"}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true"
                    ><path d="M7 17 17 7M8 7h9v9" /></svg
                  >
                </a>
              {/if}
              {#if project.npm}
                <a
                  class="project__btn project__btn--npm"
                  href={project.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="NPM Package"
                >
                  <svg
                    class="project__btn-npm"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    ><path
                      d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" /></svg
                  >
                  <span>NPM</span>
                </a>
              {/if}
              <a
                class="project__btn project__btn--repo"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Repository"
              >
                <svg
                  class="project__btn-gh"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  ><path
                    d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5.01 0c1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
                /></svg
              >
                <span>Repository</span>
              </a>
            </div>
          </div>
        </div>
      </li>
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
      <div class="outro__list-group" bind:this={outroListEl}>
        <span class="outro__list-label">Other Projects:</span>
        <ul class="outro__list">
          <li>
            
              <a href="https://github.com/itsflaid/mynime"
              target="_blank"
              rel="noopener noreferrer">MyNime <span>· Vue</span></a
            >
          </li>
          <li>
            
              <a href="https://github.com/itsflaid/techgear-store-v2"
              target="_blank"
              rel="noopener noreferrer">TechGear Store <span>· PHP</span></a
            >
          </li>
          <li>
            
              <a href="https://github.com/itsflaid/gamefy-topup"
              target="_blank"
              rel="noopener noreferrer">Topup Games <span>· Laravel</span></a
            >
          </li>
          <li>
            
              <a href="https://github.com/itsflaid/portfolio"
              target="_blank"
              rel="noopener noreferrer">This Portfolio <span>· SvelteKit</span></a
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
  .outro__list li a:hover { opacity: 0.6; }
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
  .outro__link:hover { opacity: 0.6; }
  .outro__link svg {
    width: 13px;
    height: 13px;
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

  .project {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
    gap: clamp(2rem, 4vw, 4rem);
    align-items: center;
    margin-inline: clamp(1.5rem, 5vw, 4rem);
    padding-block: clamp(2rem, 6vh, 4rem);
  }
  .project__media { order: 1; }
  .project__info { order: 2; }
  .project--reverse .project__media { order: 2; }
  .project--reverse .project__info { order: 1; }

  .project__media {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: var(--accent-ph);
    box-shadow: 0 24px 48px rgba(10, 10, 10, 0.1);
    will-change: transform, opacity;
  }
  .media__pan {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .media__pan img,
  .media__pan video {
    display: block;
    position: absolute;
    top: -15%;
    left: 0;
    width: 100%;
    height: 130%;
    object-fit: cover;
    object-position: center;
  }
  .media__pan img { transition: opacity 0.6s ease; }
  .media__pan video {
    object-fit: cover;
    background: #000;
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  :global(.media__pan.is-video) .media__img { opacity: 0; }
  :global(.media__pan.is-video) .media__video { opacity: 1; }

  .project:hover .project__media { transform: scale(1.02); }

  .project__info {
    display: flex;
    flex-direction: column;
    gap: clamp(0.5rem, 1.2vh, 0.85rem);
    min-width: 0;
    will-change: transform, opacity;
  }
  .project__index-row {
    display: flex;
    align-items: baseline;
    gap: clamp(0.9rem, 2vw, 1.5rem);
  }
  .project__index {
    font-family: var(--ff-mono);
    font-size: 0.85rem;
    color: var(--gray);
  }
  .project__title {
    margin: 0;
    font-family: var(--ff-display);
    font-weight: 400;
    letter-spacing: 0.005em;
    font-size: clamp(2rem, 3vw, 3.2rem);
    line-height: 1;
  }
  .project__rule {
    display: block;
    height: 1px;
    width: 100%;
    background: rgba(10, 10, 10, 0.14);
    transform-origin: left;
    margin: 0.6rem 0;
  }
  .project__tag {
    margin: 0;
    font-family: var(--ff-body);
    font-size: clamp(0.78rem, 0.95vw, 0.9rem);
    color: var(--ink-soft);
    opacity: 0.75;
    max-width: 42ch;
  }
  .project__metrics {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .project__metrics li {
    font-family: var(--ff-mono);
    font-size: 0.65rem;
    letter-spacing: 0.04em;
    color: var(--white);
    background: var(--black);
    border-radius: 999px;
    padding: 0.3rem 0.7rem;
    white-space: nowrap;
  }
  .project__desc {
    margin: 0;
    font-family: var(--ff-body);
    font-size: clamp(0.82rem, 1vw, 0.95rem);
    line-height: 1.55;
    color: var(--gray);
    max-width: 52ch;
  }
  .project__tech {
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
  .tech__list li.tech__more {
    cursor: pointer;
    border-style: dashed;
    background: none;
  }
  .tech__list li.tech__more:hover {
    background: var(--black);
    border-color: transparent;
    color: var(--white);
  }
  .tech__list li.tech__more:focus-visible {
    outline: 2px solid var(--black);
    outline-offset: 2px;
  }
  .tech-icon {
    flex-shrink: 0;
    width: 0.85em;
    height: 0.85em;
    color: inherit;
  }
  .tech-icon path { fill: currentColor; }

  .project__actions {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(0.6rem, 1.2vw, 0.9rem);
    margin-top: clamp(0.9rem, 2vh, 1.25rem);
  }
  .project__actions-left,
  .project__actions-right {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: clamp(0.6rem, 1.2vw, 0.9rem);
  }
  .project__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.1rem;
    font-family: var(--ff-mono);
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-decoration: none;
    border: 0;
    cursor: pointer;
    transition:
      transform 0.3s cubic-bezier(0.2, 0.6, 0.2, 1),
      background 0.3s ease,
      color 0.3s ease,
      border-color 0.3s ease;
  }
  .project__btn svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .project__btn--case { background: var(--black); color: var(--white); }
  .project__btn--case:hover { background: var(--accent-ph); }
  .project__btn--demo {
    background: transparent;
    color: var(--black);
    border: 1px solid rgba(10, 10, 10, 0.3);
  }
  .project__btn--demo:hover {
    background: var(--black);
    color: var(--white);
    border-color: var(--black);
  }
  .project__btn--npm {
    background: transparent;
    color: var(--black);
    border: 1px solid rgba(10, 10, 10, 0.3);
  }
  .project__btn--npm .project__btn-npm {
    fill: currentColor;
    stroke: none;
  }
  .project__btn--npm:hover {
    background: var(--black);
    color: var(--white);
    border-color: var(--black);
  }
  .project__btn--repo {
    background: transparent;
    color: var(--black);
    border: 0;
    border-bottom: 1px solid rgba(10, 10, 10, 0.3);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .project__btn--repo .project__btn-gh {
    fill: currentColor;
    stroke: none;
  }
  .project__btn--repo:hover {
    border-bottom-color: var(--black);
    background: none;
  }
  .project__btn:hover { transform: translateY(-2px); }

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

  /* Desktop-only: teks rata kanan saat media di sisi kanan (reversed).
     Dikunci min-width: 901px supaya tidak pernah bocor ke layout mobile. */
  @media (min-width: 901px) {
    .project--reverse .project__info {
      align-items: flex-end;
      text-align: right;
    }
    .project--reverse .project__actions {
      justify-content: flex-end;
    }
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

    .project {
      grid-template-columns: 1fr;
      margin-inline: 1.25rem;
      gap: clamp(1.25rem, 3vh, 2rem);
    }
    .project__media,
    .project--reverse .project__media {
      order: 0;
      max-height: clamp(180px, 32vh, 300px);
    }
    .project__info,
    .project--reverse .project__info {
      order: 1;
      margin-top: 30px;
    }
  }

  @media (max-width: 640px) {
    .project__actions {
      flex-wrap: nowrap;
      gap: 0.5rem;
    }
    .project__actions-left,
    .project__actions-right {
      flex: 1 1 0%;
      gap: 0.5rem;
    }
    .project__btn {
      flex: 1 1 0%;
      justify-content: center;
      padding: 0.6rem;
    }
    .project__btn--case {
      width: 100%;
      padding: 0.6rem 0.9rem;
    }
    .project__btn--demo span,
    .project__btn--npm span,
    .project__btn--repo span {
      display: none;
    }
    .project__btn--demo,
    .project__btn--npm,
    .project__btn--repo {
      border: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .projects__dots i { animation: none; }
    .media__pan video { display: none; }
    .intro__scroll svg { animation: none; }
    .cursor { animation: none; }
    .project__media,
    .project__info {
      transform: none !important;
      opacity: 1 !important;
    }
  }
</style>