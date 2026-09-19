<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import Nav from "$lib/components/Nav.svelte";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import Contact from "$lib/components/sections/Contact.svelte";
  import CaseStudyModal from "$lib/components/modals/CaseStudyModal.svelte";
  import TechModal from "$lib/components/modals/TechModal.svelte";
  import { allProjects } from "$lib/data/project";
  import { SITE } from "$lib/data/site";
  import { registerCaseStudyClose } from "$lib/caseStudy";
  import { registerTechModalClose } from "$lib/techModal";
  import { setupPreviewVideos, type PreviewController } from "$lib/preview";

  const pageTitle = "Projects Archive — Muhammad Fadil (Flaid)";
  const pageDescription =
    "The full project archive of Muhammad Fadil / Flaid — DevMap, Katalyst, ChatMe, DevNote, DailyFit, Mufadz Portal, De Home Spa, Kasbon.in, plus smaller builds.";
  const canonical = `${SITE.url}projects`;

  let pageEl: HTMLElement;
  let headEl: HTMLElement;
  let headLine1El: HTMLElement;
  let headLine2El: HTMLElement;
  let headCursorEl: HTMLElement;
  let outroEl: HTMLElement;
  let outroLine1El: HTMLElement;
  let outroLine2El: HTMLElement;
  let outroSubEl: HTMLElement;
  let outroListEl: HTMLElement;
  let outroCtaEl: HTMLElement;
  let activeIndex = 0;
  let dots = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  let previews: PreviewController | null = null;

  const smallerBuilds = [
    { name: "MyNime", stack: "Vue", href: "https://github.com/itsflaid/mynime" },
    {
      name: "TechGear Store",
      stack: "PHP",
      href: "https://github.com/itsflaid/techgear-store-v2",
    },
    {
      name: "Topup Games",
      stack: "Laravel",
      href: "https://github.com/itsflaid/gamefy-topup",
    },
    {
      name: "This Portfolio",
      stack: "SvelteKit",
      href: "https://github.com/itsflaid/portfolio",
    },
  ];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    previews = setupPreviewVideos(pageEl);
    registerCaseStudyClose(() => previews?.resume());
    registerTechModalClose(() => previews?.resume());

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cards = Array.from(
      pageEl.querySelectorAll<HTMLElement>(".project"),
    );

    if (reduceMotion) {
      gsap.set([headLine1El, headLine2El], { y: "0%" });
      gsap.set(headCursorEl, { opacity: 1 });
      gsap.set([outroLine1El, outroLine2El], { y: "0%" });
      gsap.set([outroSubEl, outroListEl, outroCtaEl], { opacity: 1 });
      gsap.set(cards, { opacity: 1, xPercent: 0 });
      gsap.set(cards.map((el) => el.querySelectorAll(".project__media, .project__info")).flat(), {
        opacity: 1,
      });
      return () => {
        previews?.destroy();
        previews = null;
      };
    }

    const headTl = gsap.timeline({
      scrollTrigger: {
        trigger: headEl,
        start: "top 85%",
        end: "bottom top",
        toggleActions: "restart reverse restart reverse",
      },
    });
    headTl
      .fromTo(
        headLine1El,
        { y: "105%" },
        { y: "0%", duration: 0.6, ease: "power2.out" },
        0,
      )
      .fromTo(
        headLine2El,
        { y: "105%" },
        { y: "0%", duration: 0.6, ease: "power2.out" },
        0.15,
      )
      .fromTo(headCursorEl, { opacity: 0 }, { opacity: 1, ease: "none" }, 0.5);

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
        outroSubEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
        0.3,
      )
      .fromTo(
        outroListEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
        0.4,
      )
      .fromTo(
        outroCtaEl,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
        0.5,
      );

    const projectTriggers: ScrollTrigger[] = [];
    const isMobileLayout = window.matchMedia("(max-width: 900px)").matches;

    cards.forEach((el) => {
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
    pageEl.querySelectorAll<HTMLElement>(".media__pan").forEach((pan) => {
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

    const indexTriggers = cards.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => (activeIndex = i),
        onEnterBack: () => (activeIndex = i),
      }),
    );

    ScrollTrigger.refresh();

    return () => {
      previews?.destroy();
      previews = null;
      headTl.scrollTrigger?.kill();
      headTl.kill();
      outroTl.scrollTrigger?.kill();
      outroTl.kill();
      projectTriggers.forEach((st) => st.kill());
      parallaxTriggers.forEach((st) => st.kill());
      indexTriggers.forEach((st) => st.kill());
    };
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <link rel="canonical" href={canonical} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content="{SITE.url}og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<Nav />

<main class="archive" bind:this={pageEl}>
  <div class="archive__head">
    <span class="archive__eyebrow">// PROJECT ARCHIVE</span>
    <div class="archive__head-right">
      <span class="archive__count"
        >0{activeIndex + 1} / 0{allProjects.length}</span
      >
    </div>
  </div>

  <div class="archive__intro" bind:this={headEl}>
    <span class="archive__dots" aria-hidden="true">
      {#each dots as _}<i></i>{/each}
    </span>
    <div class="intro__content">
      <h1 class="intro__heading">
        <span class="line-mask"
          ><span class="line" bind:this={headLine1El}>THE FULL</span></span
        >
        <span class="line-mask"
          ><span class="line" bind:this={headLine2El}
            >ARCHIVE<span class="cursor" bind:this={headCursorEl}>_</span></span
          ></span
        >
      </h1>
      <span class="intro__scroll">
        SCROLL TO EXPLORE
        <svg viewBox="0 0 24 24" aria-hidden="true"
          ><path d="M4 12h16m0 0-6-6m6 6-6 6" /></svg
        >
      </span>
    </div>
  </div>

  <ul class="archive__list">
    {#each allProjects as project, i}
      <ProjectCard
        project={project}
        reversed={i % 2 === 1}
        onPreviewPause={() => previews?.pause()}
      />
    {/each}
  </ul>

  <div class="archive__outro" bind:this={outroEl}>
    <div class="outro__content">
      <h2 class="outro__heading">
        <span class="line-mask"
          ><span class="line" bind:this={outroLine1El}>SMALLER</span></span
        >
        <span class="line-mask"
          ><span class="line" bind:this={outroLine2El}>BUILDS_</span></span
        >
      </h2>
      <p class="outro__sub" bind:this={outroSubEl}>
        Coursework, experiments, and quick projects — all on GitHub.
      </p>
      <div class="outro__list-group" bind:this={outroListEl}>
        <ul class="outro__list">
          {#each smallerBuilds as build}
            <li>
              <a href={build.href} target="_blank" rel="noopener noreferrer"
                >{build.name} <span>· {build.stack}</span></a
              >
            </li>
          {/each}
        </ul>
      </div>
      <a
        class="outro__cta-ghost"
        href={SITE.github}
        target="_blank"
        rel="noopener noreferrer"
        bind:this={outroCtaEl}
      >
        Browse GitHub →
      </a>
    </div>
  </div>
</main>

<Contact />
<CaseStudyModal />
<TechModal />

<style>
  .archive {
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

  .archive__head {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin: 0 clamp(1.5rem, 5vw, 4rem);
    padding-bottom: clamp(1.5rem, 3.2vh, 2rem);
    border-bottom: 1px solid rgba(10, 10, 10, 0.14);
  }
  .archive__eyebrow,
  .archive__count {
    font-family: var(--ff-mono);
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    color: var(--gray);
  }
  .archive__head-right {
    display: flex;
    align-items: center;
    gap: clamp(1rem, 2vw, 1.5rem);
  }

  .archive__intro {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(4rem, 10vh, 7rem) 1.5rem;
  }
  .archive__dots {
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
  .archive__dots i {
    display: block;
    width: 8px;
    height: 8px;
    background: var(--black);
    font-style: normal;
    opacity: 0.1;
    animation: archive-dot-blink 3s ease-in-out infinite;
  }
  .archive__dots i:nth-child(2) { animation-delay: 0.3s; }
  .archive__dots i:nth-child(3) { animation-delay: 0.6s; }
  .archive__dots i:nth-child(4) { animation-delay: 0.9s; }
  .archive__dots i:nth-child(5) { animation-delay: 1.2s; }
  .archive__dots i:nth-child(6) { animation-delay: 1.5s; }
  .archive__dots i:nth-child(7) { animation-delay: 1.8s; }
  .archive__dots i:nth-child(8) { animation-delay: 2.1s; }
  .archive__dots i:nth-child(9) { animation-delay: 2.4s; }

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
  .line-mask { display: block; overflow: hidden; }
  .line { display: block; transform: translateY(105%); }
  .cursor {
    display: inline-block;
    font-family: var(--ff-mono);
    margin-left: 0.05em;
    opacity: 0;
    animation: archive-blink 1s step-end infinite;
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
  @keyframes archive-blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0; }
  }
  @keyframes archive-dot-blink {
    0%, 100% { opacity: 0.06; }
    50%      { opacity: 0.32; }
  }

  .archive__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: clamp(4rem, 10vh, 8rem);
  }

  .archive__outro {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(4rem, 10vh, 7rem) 1.5rem;
  }
  .outro__sub {
    margin: 0;
    font-family: var(--ff-body);
    font-size: clamp(0.85rem, 1.1vw, 1rem);
    color: var(--gray);
    max-width: 52ch;
  }
  .outro__list-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
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
  .outro__cta-ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.5rem;
    background: transparent;
    color: var(--black);
    border: 1px solid rgba(10, 10, 10, 0.35);
    font-family: var(--ff-mono);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-decoration: none;
    transition:
      transform 0.3s cubic-bezier(0.2, 0.6, 0.2, 1),
      background 0.3s ease,
      color 0.3s ease,
      border-color 0.3s ease;
  }
  .outro__cta-ghost:hover {
    background: var(--black);
    color: var(--white);
    border-color: var(--black);
    transform: translateY(-2px);
  }

  @media (max-width: 900px) {
    .archive {
      padding-top: clamp(2.5rem, 6vh, 4rem);
    }
    .archive__head {
      margin: 0 1.25rem;
      padding-bottom: 0.85rem;
    }
    .archive__dots { display: none; }
    .archive__head-right { gap: 0.5rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .archive__dots i { animation: none; }
    .intro__scroll svg { animation: none; }
    .cursor { animation: none; }
  }
</style>
