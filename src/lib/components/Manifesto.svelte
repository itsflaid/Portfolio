<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  let sectionEl: HTMLElement;
  let viewportEl: HTMLElement;
  let trackEl: HTMLElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 860px)").matches;

    if (reduceMotion || isMobile) return;

    const viewportWidth = viewportEl.clientWidth;
    const trackRect = trackEl.getBoundingClientRect();
    const fullScroll = Math.max(0, trackEl.scrollWidth - viewportWidth);

    // Scroll dibikin BERHENTI pas cluster--final pas di TENGAH viewport,
    // bukan lanjut sampai padding-right kebuka semua (itu penyebab dia
    // nyangkut ke kanan pas scroll abis).
    const finalCluster = trackEl.querySelector<HTMLElement>(".cluster--final");
    let maxScroll = fullScroll;
    if (finalCluster) {
      const clusterRect = finalCluster.getBoundingClientRect();
      const clusterCenter =
        clusterRect.left - trackRect.left + clusterRect.width / 2;
      const desiredScroll = clusterCenter - viewportWidth / 2;
      maxScroll = Math.min(Math.max(0, desiredScroll), fullScroll);
    }

    const getScroll = () => maxScroll;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: "top top",
        end: () => "+=" + getScroll(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(trackEl, { x: () => -getScroll(), duration: 1, ease: "none" }, 0);

    // ================= ENTRANCE WINDOW (viewport-relative) =================
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
      { from: gsap.TweenVars; to: gsap.TweenVars }
    > = {
      "fade-up": {
        from: { opacity: 0, y: 34 },
        to: { opacity: 1, y: 0, ease: "power3.out" },
      },
      "scale-pop": {
        from: { opacity: 0, scale: 0.5 },
        to: { opacity: 1, scale: 1, ease: "back.out(1.5)" },
      },
      "scale-down": {
        from: { opacity: 0, scale: 1.5 },
        to: { opacity: 1, scale: 1, ease: "power2.inOut" },
      },
      "fade-blur": {
        from: { opacity: 0, filter: "blur(10px)" },
        to: { opacity: 1, filter: "blur(0px)", ease: "power2.inOut" },
      },
      "rotate-in": {
        from: { opacity: 0, rotate: -8 },
        to: { opacity: 1, rotate: 0, ease: "power2.inOut" },
      },
      "slide-l": {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0, ease: "power3.out" },
      },
      "slide-r": {
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0, ease: "power3.out" },
      },
    };

    function assignAnimTypes(lookback = 2) {
      const words = Array.from(trackEl.querySelectorAll<HTMLElement>(".word"));
      const recent: string[] = [];

      words.forEach((el) => {
        if (el.dataset.anim) {
          recent.push(el.dataset.anim);
          if (recent.length > lookback) recent.shift();
          return;
        }
        const pool = animTypes.filter((t) => !recent.includes(t));
        const chosen = pool[Math.floor(Math.random() * pool.length)];
        el.dataset.anim = chosen;
        recent.push(chosen);
        if (recent.length > lookback) recent.shift();
      });
    }
    assignAnimTypes(2);

    const totalScroll = maxScroll;

    const wordTravelPx = (ENTER_AT - FINISH_AT) * viewportWidth;
    const cardTravelPx = (ENTER_AT - CARD_FINISH_AT) * viewportWidth;
    const wordDuration = totalScroll > 0 ? wordTravelPx / totalScroll : 0;
    const cardDuration = totalScroll > 0 ? cardTravelPx / totalScroll : 0;

    function entrancePosition(el: HTMLElement, duration: number) {
      const left = el.getBoundingClientRect().left - trackRect.left;
      const raw =
        totalScroll > 0
          ? Math.max(0, left - ENTER_AT * viewportWidth) / totalScroll
          : 0;
      return Math.min(raw, Math.max(0, 1 - duration));
    }

    // ================= WORD ENTRANCE =================
    trackEl.querySelectorAll<HTMLElement>(".word").forEach((el) => {
      const type = el.dataset.anim!;
      const position = entrancePosition(el, wordDuration);

      if (type === "char-reveal") {
        const chars = el.querySelectorAll<HTMLElement>(".char");
        const charDuration = wordDuration * 0.5;
        const staggerTotal = wordDuration * 0.4;
        gsap.set(chars, { opacity: 0, y: 12 });
        tl.to(
          chars,
          {
            opacity: 1,
            y: 0,
            duration: charDuration,
            stagger: chars.length > 1 ? staggerTotal / (chars.length - 1) : 0,
            ease: "power2.out",
          },
          position,
        );
        return;
      }

      if (type === "char-reveal-alt") {
        const chars = el.querySelectorAll<HTMLElement>(".char");
        const charDuration = wordDuration * 0.5;
        const staggerTotal = wordDuration * 0.4;
        const step = chars.length > 1 ? staggerTotal / (chars.length - 1) : 0;

        chars.forEach((char, i) => {
          const fromY = i % 2 === 0 ? 12 : -12;
          gsap.set(char, { opacity: 0, y: fromY });
          tl.to(
            char,
            { opacity: 1, y: 0, duration: charDuration, ease: "power2.out" },
            position + i * step,
          );
        });
        return;
      }

      const preset = animPresets[type];
      gsap.set(el, preset.from);
      tl.to(el, { ...preset.to, duration: wordDuration }, position);
    });

    // ================= CARD & DIAMOND ENTRANCE (generic, default) =================
    const CARD_STAGGER = 0.012;

    trackEl.querySelectorAll<HTMLElement>(".cluster").forEach((cluster) => {
      if (cluster.classList.contains("cluster--final")) return;

      const cards = Array.from(
        cluster.querySelectorAll<HTMLElement>(".card"),
      ).filter((card) => !card.classList.contains("card--system"));

      cards.forEach((card, i) => {
        const basePosition = entrancePosition(card, cardDuration);
        const position = Math.min(
          basePosition + i * CARD_STAGGER,
          Math.max(0, 1 - cardDuration),
        );
        const baseRotation = gsap.getProperty(card, "rotation") as number;
        const kick = (i % 2 === 0 ? 1 : -1) * (8 + Math.random() * 8);

        gsap.set(card, {
          opacity: 0,
          scale: 0.45,
          rotation: baseRotation + kick,
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

    trackEl.querySelectorAll<HTMLElement>(".diamond").forEach((diamond) => {
      const position = entrancePosition(diamond, cardDuration);
      const baseRotation = gsap.getProperty(diamond, "rotation") as number;
      const kick = Math.random() > 0.5 ? 24 : -24;

      gsap.set(diamond, {
        opacity: 0,
        scale: 0.3,
        rotation: baseRotation + kick,
      });
      tl.to(
        diamond,
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

    // ================= CLUSTER--FINAL =================
    // ================= CLUSTER--FINAL =================
    if (finalCluster) {
      const built = finalCluster.querySelector<HTMLElement>(".card--built");

      const andReady =
        finalCluster.querySelector<HTMLElement>(".card--andready");

      const forUse = finalCluster.querySelector<HTMLElement>(".card--foruse");

      const logo = finalCluster.querySelector<HTMLElement>(".final-logo");

      if (built && andReady && forUse && logo) {
        const finalBasePosition = entrancePosition(built, cardDuration);

        // ==================================================
        // BUILT
        // ==================================================

        gsap.set(built, {
          opacity: 0,
          scale: 0.8,
        });

        tl.to(
          built,
          {
            opacity: 1,
            scale: 1,
            duration: cardDuration,
            ease: "back.out(1.5)",
          },
          finalBasePosition,
        );

        // ==================================================
        // AND READY
        // ==================================================

        const andReadyRect = andReady.getBoundingClientRect();

        const builtRect = built.getBoundingClientRect();

        // Simpan ukuran asli sebelum width diubah
        const andReadyFullWidth = andReadyRect.width;

        const andReadySquare = andReadyRect.height;

        // Posisi awal benar-benar di belakang BUILT
        const andReadyHiddenX =
          builtRect.left -
          andReadyRect.left -
          (andReadyRect.width - builtRect.width) * 0.5;

        const andReadyStart = finalBasePosition + cardDuration * 0.42;

        const andReadyDropDuration = cardDuration * 0.32;

        // Square + hidden
        gsap.set(andReady, {
          opacity: 1,
          width: andReadySquare,
          x: andReadyHiddenX,
          y: -andReadySquare * 0.9,
          scale: 1,
        });

        const andReadyText = andReady.querySelector<HTMLElement>("span");

        if (andReadyText) {
          gsap.set(andReadyText, {
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
          });
        }

        // ----------------------------------------------
        // 1. TURUN DARI BALIK BUILT
        // ----------------------------------------------

        tl.to(
          andReady,
          {
            y: 0,
            duration: andReadyDropDuration,
            ease: "power2.out",
          },
          andReadyStart,
        );

        // ----------------------------------------------
        // 2. DIAM SEJENAK
        // ----------------------------------------------

        const andReadyMoveStart =
          andReadyStart + andReadyDropDuration + cardDuration * 0.14;

        // ----------------------------------------------
        // 3. GESER KANAN + MELEBAR
        // ----------------------------------------------

        const andReadyMoveDuration = cardDuration * 0.58;

        tl.to(
          andReady,
          {
            x: 0,
            width: andReadyFullWidth,
            duration: andReadyMoveDuration,
            ease: "power2.out",
          },
          andReadyMoveStart,
        );

        // Text muncul mengikuti proses pelebaran
        if (andReadyText) {
          tl.to(
            andReadyText,
            {
              opacity: 1,
              clipPath: "inset(0 0% 0 0)",
              duration: andReadyMoveDuration * 0.8,
              ease: "power2.out",
            },
            andReadyMoveStart + andReadyMoveDuration * 0.12,
          );
        }

        // ==================================================
        // FOR USE
        // ==================================================

        const forUseRect = forUse.getBoundingClientRect();

        const forUseFullWidth = forUseRect.width;

        const forUseSquare = forUseRect.height;

        const forUseHiddenX =
          builtRect.left -
          forUseRect.left -
          (forUseRect.width - builtRect.width) * 0.5;

        const forUseStart =
          andReadyMoveStart + andReadyMoveDuration + cardDuration * 0.1;

        // ----------------------------------------------
        // Awalnya SQUARE di belakang BUILT
        // ----------------------------------------------

        gsap.set(forUse, {
          opacity: 1,
          width: forUseSquare,
          x: forUseHiddenX,
          scale: 1,
        });

        const forUseText = forUse.querySelector<HTMLElement>("span");

        if (forUseText) {
          gsap.set(forUseText, {
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
          });
        }

        // ----------------------------------------------
        // 1. KELUAR SEDIKIT + MULAI MELEBAR
        // ----------------------------------------------

        const forUsePeekDuration = cardDuration * 0.34;

        const forUsePeekX = forUseHiddenX + forUseFullWidth * 0.3;

        tl.to(
          forUse,
          {
            x: forUsePeekX,
            width: forUseFullWidth * 0.72,
            duration: forUsePeekDuration,
            ease: "power2.out",
          },
          forUseStart,
        );

        // ----------------------------------------------
        // 2. DIAM DALAM KONDISI SEBAGIAN NONGOL
        // ----------------------------------------------

        const forUseContinue =
          forUseStart + forUsePeekDuration + cardDuration * 0.16;

        // ----------------------------------------------
        // 3. LANJUT GESER KE POSISI FINAL
        //    + WIDTH SEMPURNA
        //    + TEXT MUNCUL
        // ----------------------------------------------

        const forUseMoveDuration = cardDuration * 0.42;

        tl.to(
          forUse,
          {
            x: 0,
            width: forUseFullWidth,
            duration: forUseMoveDuration,
            ease: "power2.out",
          },
          forUseContinue,
        );

        if (forUseText) {
          tl.to(
            forUseText,
            {
              opacity: 1,
              clipPath: "inset(0 0% 0 0)",
              duration: forUseMoveDuration * 0.72,
              ease: "power2.out",
            },
            forUseContinue + forUseMoveDuration * 0.1,
          );
        }

        // ==================================================
        // LOGO
        // ==================================================

        const logoStart =
          forUseContinue + forUseMoveDuration + cardDuration * 0.14;

        gsap.set(logo, {
          opacity: 0,
          scale: 0.65,
          rotation: -8,
        });

        tl.to(
          logo,
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: cardDuration * 0.75,
            ease: "back.out(1.6)",
          },
          logoStart,
        );
      }
    }
    // ================= CARD--SYSTEM: width-reveal, satu kata per tahap =================
    const systemCard = trackEl.querySelector<HTMLElement>(".card--system");
    if (systemCard) {
      const SYSTEM_DURATION_SCALE = 1.9;
      const systemCardDuration = cardDuration * SYSTEM_DURATION_SCALE;

      const sadWords = Array.from(
        systemCard.querySelectorAll<HTMLElement>(".sad-word"),
      );
      const systemStyle = getComputedStyle(systemCard);
      const padLeft = parseFloat(systemStyle.paddingLeft) || 0;
      const padRight = parseFloat(systemStyle.paddingRight) || 0;
      const systemRect = systemCard.getBoundingClientRect();
      const fullWidth = systemRect.width;
      const STEP_MARGIN = 12;

      const revealWidths = sadWords.map((w, i) => {
        const isLast = i === sadWords.length - 1;
        const margin = isLast ? padRight : STEP_MARGIN;
        return w.getBoundingClientRect().right - systemRect.left + margin;
      });
      const emptyWidth = padLeft + padRight;

      const clipAt = (revealed: number) =>
        `inset(0px ${Math.max(0, fullWidth - revealed)}px 0px 0px)`;

      gsap.set(systemCard, { clipPath: clipAt(emptyWidth) });
      gsap.set(sadWords, { opacity: 0 });

      const systemBasePosition = entrancePosition(
        systemCard,
        systemCardDuration,
      );
      const stageDuration = systemCardDuration / sadWords.length;

      revealWidths.forEach((revealed, i) => {
        const position = Math.min(
          systemBasePosition + i * stageDuration,
          Math.max(0, 1 - stageDuration),
        );
        tl.to(
          systemCard,
          {
            clipPath: clipAt(revealed),
            duration: stageDuration,
            ease: "power2.inOut",
          },
          position,
        );
        tl.to(
          sadWords[i],
          { opacity: 1, duration: stageDuration * 0.6, ease: "power1.out" },
          position + stageDuration * 0.35,
        );
      });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  });
</script>

<section class="process" id="process" bind:this={sectionEl}>
  <div class="process__viewport" bind:this={viewportEl}>
    <div class="process__track" bind:this={trackEl}>
      <div class="unit">
        <div class="word">I</div>
        <div class="word">START</div>
      </div>

      <div class="cluster cluster--with">
        <div class="card card--with"><span>WITH</span></div>
        <div class="card card--problems"><span>PROBLEMS</span></div>
        <div class="card card--real"><span>REAL</span></div>
      </div>

      <div class="unit">
        <div class="word">TURN</div>
        <div class="word">THEM</div>
        <div class="word">INTO</div>
        <div class="word" data-anim="char-reveal">
          {#each "IDEAS".split("") as ch}
            <span class="char">{ch}</span>
          {/each}
        </div>
      </div>

      <span class="diamond" aria-hidden="true"></span>

      <div class="unit">
        <div class="word">SHAPE</div>
        <div class="word">THOSE</div>
        <div class="word">IDEA</div>
      </div>

      <div class="cluster cluster--into">
        <div class="card card--system">
          {#each ["SYSTEM", "AND", "DESIGN"] as w}
            <span class="sad-word">{w}</span>
          {/each}
        </div>
        <div class="card card--into"><span>INTO</span></div>
      </div>

      <span class="diamond" aria-hidden="true"></span>

      <div class="unit">
        <div class="word">BUILD</div>
        <div class="word">WEB</div>
        <div class="word" data-anim="char-reveal">
          {#each "APPLICATION".split("") as ch}
            <span class="char">{ch}</span>
          {/each}
        </div>
      </div>

      <div class="cluster cluster--final">
        <div class="final-base">
          <div class="card card--built"><span>BUILT</span></div>
          <span class="final-logo" aria-hidden="true">
            <img
              class="process__logo"
              src="/logo/logo-trans.png"
              alt=""
              draggable="false"
            />
          </span>
          <div class="card card--foruse"><span>FOR USE</span></div>
        </div>
        <div class="card card--andready"><span>AND READY</span></div>
      </div>
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
    padding-right: 50vw;
    will-change: transform;
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

  .diamond {
    flex: 0 0 auto;
    width: clamp(2rem, 4vw, 3rem);
    height: clamp(2rem, 4vw, 3rem);
    background: var(--black);
    transform: rotate(45deg);
  }

  .card {
    flex: 0 0 auto;
    background: var(--black);
    border-radius: 0;
    padding: clamp(0.9rem, 2.7vw, 1.8rem) clamp(1.8rem, 4.8vw, 3.3rem);
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
  .card--problems {
    position: relative;
    z-index: 1;
    margin-left: -1.2rem;
    transform: rotate(7deg);
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

  .cluster--final {
    position: relative;
    margin-top: clamp(4.5rem, 9vw, 7rem);
  }

  .final-base {
    display: flex;
    align-items: center;
    gap: clamp(1.5rem, 3vw, 3rem);
    transform: translateY(-4rem);
  }

  .card--built,
  .card--foruse,
  .card--andready {
    box-sizing: border-box;
    overflow: hidden;
  }

  .card--built {
    position: relative;
    z-index: 3;
  }

  .card--foruse {
    position: relative;
    z-index: 1;
  }

  .final-logo {
    position: relative;
    z-index: 4;
    display: flex;
    align-items: center;
    flex: 0 0 auto;
  }

  .process__logo {
    flex: 0 0 auto;
    width: clamp(3rem, 6vw, 5rem);
    height: auto;
    user-select: none;
  }

  .card--andready {
    position: absolute;
    top: clamp(4rem, 7vw, 6rem);
    left: 20%;
    z-index: 1;
  }

  @media (max-width: 860px), (prefers-reduced-motion: reduce) {
    .process {
      min-height: auto;
      padding-block: clamp(3rem, 10vh, 4.5rem);
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
    .card--into,
    .card--andready {
      position: relative;
      top: auto;
      right: auto;
      bottom: auto;
      left: auto;
      transform: none;
      margin-left: 0;
    }
    .card--foruse {
      transform: none;
    }
    .card--system {
      clip-path: none !important;
    }
    .card--system .sad-word {
      opacity: 1 !important;
    }
  }
</style>
