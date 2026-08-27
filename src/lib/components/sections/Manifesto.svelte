<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import {
    siTypescript,
    siGithub,
    siNextdotjs,
    siClaude,
  } from "simple-icons";

  let sectionEl: HTMLElement;
  let viewportEl: HTMLElement;
  let trackEl: HTMLElement;
  let endSpacerEl: HTMLElement;

  let crossEl: HTMLElement;
  let dotsEl: HTMLElement;
  let badgesEl: HTMLElement;
  let markEl: HTMLElement;

  const techBadges = [
    { name: "TypeScript", path: siTypescript.path },
    { name: "GitHub", path: siGithub.path },
    { name: "Next.js", path: siNextdotjs.path },
    { name: "Claude", path: siClaude.path },
  ];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const viewportWidth = viewportEl.clientWidth;
      const trackRect = trackEl.getBoundingClientRect();

    const lastCluster =
      trackEl.querySelector<HTMLElement>(".cluster--into");

    const END_GAP = 30;

    let maxScroll = 0;

    function computeMaxScroll() {
      endSpacerEl.style.width = `${END_GAP}px`;

      const vw = viewportEl.clientWidth;
      const tRect = trackEl.getBoundingClientRect();

      const full = Math.max(0, trackEl.scrollWidth - vw);

      if (!lastCluster) {
        maxScroll = full;
        return;
      }

      const clusterRect = lastCluster.getBoundingClientRect();

      const clusterRight = clusterRect.right - tRect.left;

      const desiredScroll = clusterRight - vw + END_GAP;

      maxScroll = Math.min(
        Math.max(0, desiredScroll),
        full,
      );
    }

    computeMaxScroll();

    ScrollTrigger.addEventListener(
      "refreshInit",
      computeMaxScroll,
    );

    const getScroll = () => maxScroll;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: () => "+=" + getScroll(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    tl.to(
      trackEl,
      {
        x: () => -getScroll(),
        duration: 1,
        ease: "none",
      },
      0,
    );

    const dotEls = gsap.utils.toArray<HTMLElement>(
      dotsEl.querySelectorAll("i"),
    );

    const badgeEls = gsap.utils.toArray<HTMLElement>(
      badgesEl.querySelectorAll(".process__badge"),
    );

    const crossTravelX = viewportWidth * 0.5;

    gsap.set(crossEl, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
    });

    gsap.set(dotEls, {
      opacity: 0.85,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
    });

    gsap.set(dotsEl, {
      x: 0,
    });

    gsap.set(badgeEls, {
      opacity: 0,
      scale: 0.3,
      y: 24,
      x: 0,
    });

    gsap.set(markEl, {
      opacity: 0,
      scale: 1.08,
    });

    const badgeSpots = [
      { top: "14%", left: "78%" },
      { top: "68%", left: "85%" },
      { top: "76%", left: "10%" },
      { top: "20%", left: "6%" },
    ];

    badgeEls.forEach((badge, i) => {
      gsap.set(badge, {
        top: badgeSpots[i].top,
        left: badgeSpots[i].left,
      });
    });

    tl.to(
      crossEl,
      {
        y: -14,
        duration: 0.05,
        ease: "sine.inOut",
      },
      0.02,
    );

    tl.to(
      crossEl,
      {
        y: 8,
        duration: 0.05,
        ease: "sine.inOut",
      },
      0.07,
    );

    tl.to(
      crossEl,
      {
        y: -6,
        duration: 0.05,
        ease: "sine.inOut",
      },
      0.12,
    );

    const CROSS_SHIFT_START = 0.15;
    const CROSS_SHIFT_DURATION = 0.4;
    const CROSS_SHIFT_END = CROSS_SHIFT_START + CROSS_SHIFT_DURATION;

    tl.to(
      crossEl,
      {
        x: crossTravelX,
        y: 30,
        scale: 1.2,
        duration: CROSS_SHIFT_DURATION,
        ease: "power2.out",
      },
      CROSS_SHIFT_START,
    );

    tl.to(
      crossEl,
      {
        x: () => crossTravelX - getScroll() * (1 - CROSS_SHIFT_END),
        duration: 1 - CROSS_SHIFT_END,
        ease: "none",
      },
      CROSS_SHIFT_END,
    );

    tl.to(
      crossEl,
      {
        rotation: 1080,
        duration: 0.85,
        ease: "none",
      },
      0,
    );

    tl.to(
      dotsEl,
      {
        x: -viewportWidth * 0.34,
        duration: 0.22,
        ease: "none",
      },
      0.08,
    );

    const BREAK_ANGLE_MIN = Math.PI * 0.75;
    const BREAK_ANGLE_MAX = Math.PI * 1.25;

    dotEls.forEach((dot) => {
      const angle = gsap.utils.random(
        BREAK_ANGLE_MIN,
        BREAK_ANGLE_MAX,
      );

      const distance = gsap.utils.random(75, 120);

      tl.to(
        dot,
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: gsap.utils.random(0.1, 0.3),
          rotation: gsap.utils.random(-120, 120),
          duration: 0.07,
          ease: "power2.in",
        },
        0.30,
      );
    });

    tl.set(
      dotEls,
      {
        opacity: 0,
      },
      0.37,
    );

    tl.set(
      dotEls,
      {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
      },
      0.371,
    );

    tl.set(
      dotsEl,
      {
        x: 0,
      },
      0.372,
    );

    tl.to(
      badgeEls,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.08,
        stagger: 0.045,
        ease: "back.out(2.2)",
      },
      0.42,
    );

    tl.to(
      badgeEls,
      {
        y: "-=10",
        duration: 0.06,
        stagger: 0.02,
        ease: "sine.inOut",
      },
      0.52,
    );

    tl.to(
      badgeEls,
      {
        y: "+=10",
        duration: 0.06,
        stagger: 0.02,
        ease: "sine.inOut",
      },
      0.58,
    );

    badgeEls.forEach((badge, i) => {
      const dir = i % 2 === 0 ? 1 : -1;

      tl.to(
        badge,
        {
          x: dir * gsap.utils.random(120, 220),
          y: gsap.utils.random(-80, 80),
          rotation: dir * gsap.utils.random(60, 140),
          scale: 0.4,
          opacity: 0,
          duration: 0.16,
          ease: "power1.in",
        },
        0.69 + i * 0.02,
      );
    });

    tl.to(
      markEl,
      {
        opacity: 0.06,
        scale: 1,
        duration: 0.06,
        ease: "power2.out",
      },
      0.85,
    );

    tl.fromTo(
      markEl,
      {
        yPercent: -4,
      },
      {
        yPercent: 4,
        duration: 0.15,
        ease: "none",
      },
      0.85,
    );

    const ENTER_AT = 0.82;
    const FINISH_AT = 0.58;
    const CARD_FINISH_AT = 0.62;

    const animTypes = [
      "fade-up",
      "scale-pop",
      "scale-down",
      "fade-blur",
      "rotate-in",
      "slide-l",
      "slide-r",
    ];

    const animPresets: Record<
      string,
      {
        from: gsap.TweenVars;
        to: gsap.TweenVars;
      }
    > = {
      "fade-up": {
        from: {
          opacity: 0,
          y: 34,
        },
        to: {
          opacity: 1,
          y: 0,
          ease: "power3.out",
        },
      },

      "scale-pop": {
        from: {
          opacity: 0,
          scale: 0.5,
        },
        to: {
          opacity: 1,
          scale: 1,
          ease: "back.out(1.5)",
        },
      },

      "scale-down": {
        from: {
          opacity: 0,
          scale: 1.5,
        },
        to: {
          opacity: 1,
          scale: 1,
          ease: "power2.inOut",
        },
      },

      "fade-blur": {
        from: {
          opacity: 0,
          filter: "blur(10px)",
        },
        to: {
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.inOut",
        },
      },

      "rotate-in": {
        from: {
          opacity: 0,
          rotate: -8,
        },
        to: {
          opacity: 1,
          rotate: 0,
          ease: "power2.inOut",
        },
      },

      "slide-l": {
        from: {
          opacity: 0,
          x: -50,
        },
        to: {
          opacity: 1,
          x: 0,
          ease: "power3.out",
        },
      },

      "slide-r": {
        from: {
          opacity: 0,
          x: 50,
        },
        to: {
          opacity: 1,
          x: 0,
          ease: "power3.out",
        },
      },
    };

    function assignAnimTypes(lookback = 2) {
      const words = Array.from(
        trackEl.querySelectorAll<HTMLElement>(".word"),
      );

      const recent: string[] = [];

      words.forEach((el) => {
        if (el.dataset.anim) {
          recent.push(el.dataset.anim);

          if (recent.length > lookback) {
            recent.shift();
          }

          return;
        }

        const pool = animTypes.filter(
          (t) => !recent.includes(t),
        );

        const chosen =
          pool[Math.floor(Math.random() * pool.length)];

        el.dataset.anim = chosen;

        recent.push(chosen);

        if (recent.length > lookback) {
          recent.shift();
        }
      });
    }

    assignAnimTypes(2);

    const totalScroll = maxScroll;

    const wordTravelPx =
      (ENTER_AT - FINISH_AT) * viewportWidth;

    const cardTravelPx =
      (ENTER_AT - CARD_FINISH_AT) * viewportWidth;

    const wordDuration =
      totalScroll > 0
        ? wordTravelPx / totalScroll
        : 0;

    const cardDuration =
      totalScroll > 0
        ? cardTravelPx / totalScroll
        : 0;

    function entrancePosition(
      el: HTMLElement,
      duration: number,
    ) {
      const left =
        el.getBoundingClientRect().left -
        trackRect.left;

      const raw =
        totalScroll > 0
          ? Math.max(
              0,
              left - ENTER_AT * viewportWidth,
            ) / totalScroll
          : 0;

      return Math.min(
        raw,
        Math.max(0, 1 - duration),
      );
    }

    trackEl
      .querySelectorAll<HTMLElement>(".word")
      .forEach((el) => {
        const type = el.dataset.anim!;

        const position = entrancePosition(
          el,
          wordDuration,
        );

        if (type === "char-reveal") {
          const chars =
            el.querySelectorAll<HTMLElement>(".char");

          const charDuration =
            wordDuration * 0.5;

          const staggerTotal =
            wordDuration * 0.4;

          gsap.set(chars, {
            opacity: 0,
            y: 12,
          });

          tl.to(
            chars,
            {
              opacity: 1,
              y: 0,
              duration: charDuration,
              stagger:
                chars.length > 1
                  ? staggerTotal /
                    (chars.length - 1)
                  : 0,
              ease: "power2.out",
            },
            position,
          );

          return;
        }

        if (type === "char-reveal-alt") {
          const chars =
            el.querySelectorAll<HTMLElement>(".char");

          const charDuration =
            wordDuration * 0.5;

          const staggerTotal =
            wordDuration * 0.4;

          const step =
            chars.length > 1
              ? staggerTotal /
                (chars.length - 1)
              : 0;

          chars.forEach((char, i) => {
            const fromY =
              i % 2 === 0 ? 12 : -12;

            gsap.set(char, {
              opacity: 0,
              y: fromY,
            });

            tl.to(
              char,
              {
                opacity: 1,
                y: 0,
                duration: charDuration,
                ease: "power2.out",
              },
              position + i * step,
            );
          });

          return;
        }

        const preset = animPresets[type];

        gsap.set(el, preset.from);

        tl.to(
          el,
          {
            ...preset.to,
            duration: wordDuration,
          },
          position,
        );
      });

    const CARD_STAGGER = 0.012;

    trackEl
      .querySelectorAll<HTMLElement>(".cluster")
      .forEach((cluster) => {
        const cards = Array.from(
          cluster.querySelectorAll<HTMLElement>(
            ".card",
          ),
        ).filter(
          (card) =>
            !card.classList.contains(
              "card--system",
            ) &&
            !card.classList.contains(
              "card--problems",
            ),
        );

        cards.forEach((card, i) => {
          const basePosition =
            entrancePosition(
              card,
              cardDuration,
            );

          const position = Math.min(
            basePosition +
              i * CARD_STAGGER,
            Math.max(
              0,
              1 - cardDuration,
            ),
          );

          const baseRotation =
            gsap.getProperty(
              card,
              "rotation",
            ) as number;

          const kick =
            (i % 2 === 0 ? 1 : -1) *
            (8 + Math.random() * 8);

          gsap.set(card, {
            opacity: 0,
            scale: 0.45,
            rotation:
              baseRotation + kick,
          });

          tl.to(
            card,
            {
              opacity: 1,
              scale: 1,
              rotation: baseRotation,
              duration: cardDuration,
              ease: "back.out(1.6)",
            },
            position,
          );
        });
      });

    const systemCard =
      trackEl.querySelector<HTMLElement>(
        ".card--system",
      );

    if (systemCard) {
      const SYSTEM_DURATION_SCALE = 1.9;

      const systemCardDuration =
        cardDuration *
        SYSTEM_DURATION_SCALE;

      const sadWords = Array.from(
        systemCard.querySelectorAll<HTMLElement>(
          ".sad-word",
        ),
      );

      const systemStyle =
        getComputedStyle(systemCard);

      const padLeft =
        parseFloat(
          systemStyle.paddingLeft,
        ) || 0;

      const padRight =
        parseFloat(
          systemStyle.paddingRight,
        ) || 0;

      const systemRect =
        systemCard.getBoundingClientRect();

      const fullWidth =
        systemRect.width;

      const STEP_MARGIN = 12;

      const revealWidths =
        sadWords.map((w, i) => {
          const isLast =
            i ===
            sadWords.length - 1;

          const margin = isLast
            ? padRight
            : STEP_MARGIN;

          return (
            w.getBoundingClientRect()
              .right -
            systemRect.left +
            margin
          );
        });

      const emptyWidth =
        padLeft + padRight;

      const clipAt = (
        revealed: number,
      ) =>
        `inset(0px ${Math.max(
          0,
          fullWidth - revealed,
        )}px 0px 0px)`;

      gsap.set(systemCard, {
        clipPath:
          clipAt(emptyWidth),
      });

      gsap.set(sadWords, {
        opacity: 0,
      });

      const systemBasePosition =
        entrancePosition(
          systemCard,
          systemCardDuration,
        );

      const STAGE_GAP = 0.18;

      const numStages =
        sadWords.length;

      const numGaps =
        numStages - 1;

      const totalGapTime =
        systemCardDuration *
        STAGE_GAP *
        numGaps;

      const stageAnimDuration =
        (systemCardDuration -
          totalGapTime) /
        numStages;

      const stageStep =
        stageAnimDuration +
        systemCardDuration *
          STAGE_GAP;

      revealWidths.forEach(
        (revealed, i) => {
          const position = Math.min(
            systemBasePosition +
              i * stageStep,
            Math.max(
              0,
              1 - stageAnimDuration,
            ),
          );

          tl.to(
            systemCard,
            {
              clipPath:
                clipAt(revealed),
              duration:
                stageAnimDuration,
              ease: "power2.inOut",
            },
            position,
          );

          tl.to(
            sadWords[i],
            {
              opacity: 1,
              duration:
                stageAnimDuration *
                0.6,
              ease: "power1.out",
            },
            position +
              stageAnimDuration *
                0.35,
          );
        },
      );
    }

    const problemsCard =
      trackEl.querySelector<HTMLElement>(
        ".card--problems",
      );

    if (problemsCard) {
      const PROBLEMS_DURATION_SCALE = 1.4;

      const problemsCardDuration =
        cardDuration *
        PROBLEMS_DURATION_SCALE;

      const chars = Array.from(
        problemsCard.querySelectorAll<HTMLElement>(
          ".prob-char",
        ),
      );

      const problemsStyle =
        getComputedStyle(
          problemsCard,
        );

      const padLeft =
        parseFloat(
          problemsStyle.paddingLeft,
        ) || 0;

      const padRight =
        parseFloat(
          problemsStyle.paddingRight,
        ) || 0;

      const fullWidth =
        problemsCard.offsetWidth;

      const revealWidths =
        chars.map((c, i) => {
          const isLast =
            i === chars.length - 1;

          return (
            c.offsetLeft +
            c.offsetWidth +
            (isLast ? padRight : 0)
          );
        });

      const emptyWidth =
        padLeft + padRight;

      const clipAt = (
        revealed: number,
      ) =>
        `inset(0px ${Math.max(
          0,
          fullWidth - revealed,
        )}px 0px 0px)`;

      gsap.set(problemsCard, {
        opacity: 1,
        clipPath:
          clipAt(emptyWidth),
      });

      gsap.set(chars, {
        opacity: 0,
      });

      const problemsBasePosition =
        entrancePosition(
          problemsCard,
          problemsCardDuration,
        );

      const STAGE_GAP = 0.05;

      const numStages =
        chars.length;

      const numGaps =
        numStages - 1;

      const totalGapTime =
        problemsCardDuration *
        STAGE_GAP *
        numGaps;

      const stageAnimDuration =
        (problemsCardDuration -
          totalGapTime) /
        numStages;

      const stageStep =
        stageAnimDuration +
        problemsCardDuration *
          STAGE_GAP;

      gsap.set(problemsCard, {
        rotation: 15,
      });

      tl.to(
        problemsCard,
        {
          rotation: 7,
          duration:
            problemsCardDuration,
          ease: "power2.out",
        },
        problemsBasePosition,
      );

      revealWidths.forEach(
        (revealed, i) => {
          const position = Math.min(
            problemsBasePosition +
              i * stageStep,
            Math.max(
              0,
              1 - stageAnimDuration,
            ),
          );

          tl.to(
            problemsCard,
            {
              clipPath:
                clipAt(revealed),
              duration:
                stageAnimDuration,
              ease: "power1.out",
            },
            position,
          );

          tl.to(
            chars[i],
            {
              opacity: 1,
              duration:
                stageAnimDuration *
                0.6,
              ease: "power1.out",
            },
            position,
          );
        },
      );
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

      return () => {
        ScrollTrigger.removeEventListener(
          "refreshInit",
          computeMaxScroll,
        );

        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  });
</script>

<section
  class="process"
  id="process"
  bind:this={sectionEl}
>
  <span
    class="process__mark"
    aria-hidden="true"
    bind:this={markEl}
  >
    FLAID
  </span>

  <div
    class="process__cross"
    aria-hidden="true"
    bind:this={crossEl}
  ></div>

  <div
    class="process__dots"
    aria-hidden="true"
    bind:this={dotsEl}
  >
    {#each Array(9) as _, i (i)}
      <i></i>
    {/each}
  </div>

  <div
    class="process__badges"
    aria-hidden="true"
    bind:this={badgesEl}
  >
    {#each techBadges as tech (tech.name)}
      <span class="process__badge">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d={tech.path}
            fill-rule="evenodd"
          />
        </svg>
      </span>
    {/each}
  </div>

  <div
    class="process__viewport"
    bind:this={viewportEl}
  >
    <div
      class="process__track"
      bind:this={trackEl}
    >
      <div class="unit">
        <div class="word">I</div>

        <div
          class="word"
          data-anim="char-reveal-alt"
        >
          {#each "START".split("") as ch}
            <span class="char">
              {ch}
            </span>
          {/each}
        </div>
      </div>

      <div class="cluster cluster--with">
        <div class="card card--with">
          <span>WITH</span>
        </div>

        <div class="card card--problems">
          {#each "PROBLEMS".split("") as ch}
            <span class="prob-char">
              {ch}
            </span>
          {/each}
        </div>

        <div class="card card--real">
          <span>REAL</span>
        </div>
      </div>

      <div class="unit">
        <div
          class="word"
          data-anim="char-reveal"
        >
          {#each "THEN".split("") as ch}
            <span class="char">
              {ch}
            </span>
          {/each}
        </div>

        <div
          class="word"
          data-anim="char-reveal-alt"
        >
          {#each "TURN".split("") as ch}
            <span class="char">
              {ch}
            </span>
          {/each}
        </div>
      </div>

      <div class="cluster cluster--into">
        <div class="card card--system">
          {#each ["WORKING", "SYSTEMS"] as w}
            <span class="sad-word">
              {w}
            </span>
          {/each}
        </div>

        <div class="card card--into">
          <span>INTO</span>
        </div>
      </div>

      <div
        class="track-end-spacer"
        bind:this={endSpacerEl}
      ></div>
    </div>
  </div>
</section>

<style>
  .process {
    position: relative;
    background: var(--white);
    color: var(--black);
    z-index: 3;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .process__mark {
    position: absolute;
    z-index: 0;
    top: 6vw;
    right: -1vw;
    font-family: var(--ff-display);
    font-weight: 400;
    letter-spacing: 0.01em;
    font-size: clamp(6rem, 16vw, 13rem);
    color: var(--black);
    opacity: 0;
    white-space: nowrap;
    user-select: none;
    pointer-events: none;
  }

  .process__cross {
    position: absolute;
    z-index: 2;
    top: clamp(6rem, 15vw, 10.5rem);
    left: clamp(4.5rem, 12vw, 9rem);
    width: 44px;
    height: 44px;
    pointer-events: none;
  }

  .process__cross::before,
  .process__cross::after {
    content: "";
    position: absolute;
    background: var(--black);
  }

  .process__cross::before {
    left: 50%;
    top: 0;
    bottom: 0;
    width: 8px;
    transform: translateX(-50%);
  }

  .process__cross::after {
    top: 50%;
    left: 0;
    right: 0;
    height: 8px;
    transform: translateY(-50%);
  }

  .process__dots {
    position: absolute;
    z-index: 2;
    bottom: clamp(4rem, 10vw, 7rem);
    right: clamp(3rem, 8vw, 6rem);
    display: grid;
    grid-template-columns: repeat(3, 9px);
    grid-template-rows: repeat(3, 9px);
    gap: 10px;
    pointer-events: none;
  }

  .process__dots i {
    display: block;
    width: 9px;
    height: 9px;
    background: var(--black);
    font-style: normal;
  }

  .process__badges {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
  }

  .process__badge {
    position: absolute;
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
  }

  .process__badge svg {
    width: 32px;
    height: 32px;
    fill: var(--black);
  }

  .process__viewport {
    position: relative;
    z-index: 1;
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .process__track {
    display: flex;
    align-items: center;
    width: max-content;
    gap: clamp(1rem, 1.8vw, 2rem);
    padding-left: 85vw;
    will-change: transform;
  }

  .track-end-spacer {
    flex: 0 0 auto;
    height: 1px;
  }

  .unit {
    flex: 0 0 auto;
    white-space: nowrap;
  }

  .unit .word {
    display: inline-block;
    margin-right: 0.28em;
    font-family: var(--ff-display);
    font-weight: 400;
    line-height: 0.95;
    letter-spacing: 0.01em;
    color: var(--black);
    white-space: nowrap;
    font-size: clamp(4.5rem, 11vw, 9.5rem);
  }

  .unit .word:last-child {
    margin-right: 0;
  }

  .unit .word .char {
    display: inline-block;
  }

  .card {
    flex: 0 0 auto;
    background: var(--black);
    border-radius: 0;
    padding: clamp(0.9rem, 2.7vw, 1.8rem)
      clamp(1.8rem, 4.8vw, 3.3rem);
  }

  .card span {
    display: block;
    font-family: var(--ff-display);
    font-weight: 400;
    line-height: 0.95;
    letter-spacing: 0.01em;
    color: var(--white);
    white-space: nowrap;
    font-size: clamp(4.25rem, 10vw, 8.5rem);
  }

  .card--system .sad-word {
    display: inline-block;
    font-family: var(--ff-display);
    font-weight: 400;
    line-height: 0.95;
    letter-spacing: 0.01em;
    color: var(--white);
    white-space: nowrap;
    font-size: clamp(4.25rem, 10vw, 8.5rem);
  }

  .card--system .sad-word:not(:last-child) {
    margin-right: 0.28em;
  }

  .cluster {
    position: relative;
    flex: 0 0 auto;
    display: flex;
    align-items: flex-end;
  }

  .cluster--with {
    margin-top: clamp(3.3rem, 7.8vw, 5.4rem);
  }

  .card--with {
    position: relative;
    z-index: 1;
    transform: translateY(-3rem);
  }

  .card--problems .prob-char {
    display: inline-block;
    font-family: var(--ff-display);
    font-weight: 400;
    line-height: 0.95;
    letter-spacing: 0.01em;
    color: var(--white);
    white-space: pre;
    font-size: clamp(4.25rem, 10vw, 8.5rem);
  }

  .card--real {
    position: absolute;
    top: clamp(-3.2rem, -6.8vw, -2rem);
    left: 40%;
    transform: translateX(-40%) translateY(-2rem);
    z-index: 2;
    padding: 0.5rem 1.2rem;
  }

  .card--real span {
    font-size: clamp(2.5rem, 5vw, 3.75rem);
  }

  .cluster--into {
    margin-top: clamp(3.3rem, 7.8vw, 5.4rem);
  }

  .card--into {
    position: absolute;
    top: clamp(-4.5rem, -8.4vw, -3.3rem);
    left: clamp(-2rem, -3vw, -1rem);
    transform: rotate(-18deg);
    z-index: 2;
    padding: 0.5rem 1.2rem;
  }

  .card--into span {
    font-size: clamp(2.75rem, 5.5vw, 4.25rem);
  }

  @media (max-width: 860px),
    (prefers-reduced-motion: reduce) {
    .process {
      min-height: auto;
      padding-block: clamp(3rem, 10vh, 4.5rem);
    }

    .process__mark,
    .process__cross,
    .process__dots,
    .process__badges {
      display: none;
    }

    .process__viewport {
      overflow: visible;
      align-items: flex-start;
    }

    .process__track {
      flex-direction: column;
      align-items: flex-start;
      width: auto;
      padding: 0 clamp(1.5rem, 6vw, 3rem);
      gap: clamp(1.75rem, 5vh, 2.5rem);
    }

    .track-end-spacer {
      display: none;
    }

    .unit .word {
      font-size: clamp(2.2rem, 10vw, 3.4rem);
    }

    .card span,
    .card--system .sad-word {
      font-size: clamp(2rem, 9vw, 3rem);
    }

    .cluster {
      position: relative;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0;
      padding-top: clamp(2.5rem, 8vh, 3.5rem);
    }

    .card--real,
    .card--into {
      position: relative;
      top: auto;
      right: auto;
      bottom: auto;
      left: auto;
      transform: none;
      margin-left: 0;
    }

    .card--problems {
      clip-path: none !important;
    }

    .card--problems .prob-char {
      opacity: 1 !important;
    }

    .card--system {
      clip-path: none !important;
    }

    .card--system .sad-word {
      opacity: 1 !important;
    }
  }
</style>