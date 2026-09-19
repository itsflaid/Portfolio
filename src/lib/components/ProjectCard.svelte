<script lang="ts">
  import type { Project } from "$lib/data/project";
  import { openCaseStudyModal } from "$lib/caseStudy";
  import { openTechModal } from "$lib/techModal";

  let {
    project,
    reversed = false,
    onPreviewPause,
  }: { project: Project; reversed?: boolean; onPreviewPause?: () => void } =
    $props();

  function techTotalCount(p: Project) {
    return p.techGroups?.reduce((sum, g) => sum + g.items.length, 0) ?? 0;
  }

  function pause() {
    onPreviewPause?.();
  }
</script>

<li class="project" class:project--reverse={reversed}>
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
                <svg class="tech-icon" viewBox="0 0 24 24" aria-hidden="true"
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
                pause();
                openTechModal(project);
              }}
              onkeydown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  pause();
                  openTechModal(project);
                }
              }}
            >
              <span>+{techTotalCount(project) - project.techPreview.length} MORE</span>
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
              pause();
              openCaseStudyModal(project);
            }}
            data-cursor-text="READ"
          >
            <span>Case Study</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"
              ><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path
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
            <svg class="project__btn-npm" viewBox="0 0 24 24" aria-hidden="true"
              ><path
                d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
              /></svg
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
          <svg class="project__btn-gh" viewBox="0 0 24 24" aria-hidden="true"
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

<style>
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
    top: -10%;
    left: 0;
    width: 100%;
    height: 120%;
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

  /* Desktop-only: right-aligned text when media is on the right (reversed). */
  @media (min-width: 901px) {
    .project--reverse .project__info {
      align-items: flex-end;
      text-align: right;
    }
    .project--reverse .project__actions {
      justify-content: flex-end;
    }
  }

  @media (max-width: 900px) {
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
  }

  @media (prefers-reduced-motion: reduce) {
    .media__pan video { display: none; }
    .project__media,
    .project__info {
      transform: none !important;
      opacity: 1 !important;
    }
  }
</style>
