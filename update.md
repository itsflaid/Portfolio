# Tech Stack Modal — Implementation Instructions

## Goal
Cards currently show the full flat tech list. Change to: **3 curated badges + 1 "+N MORE" badge** that opens a modal showing the **full stack grouped by category** (grouping differs per project — not rigid, shaped to fit how each project is actually built). Visual language must match the existing `CaseStudyModal.svelte` (same dark panel, same GSAP open/close feel).

All 7 projects (including DevMap) now have finalized `techPreview`/`techGroups` data below. A `{:else}` fallback path is still built into `Work.svelte` (see section 4) purely as a safety net for any future project added without this data — not because any current project needs it.

---

## Files to touch
1. `src/lib/data/project.ts` — extend types, add `techPreview` + `techGroups` to every project
2. `src/lib/components/icons.ts` — add missing custom icon(s) if a simple-icons slug doesn't exist
3. `src/lib/techModal.ts` — **new** store file, mirrors `src/lib/caseStudy.ts`
4. `src/lib/components/TechModal.svelte` — **new** component, structurally based on `CaseStudyModal.svelte`
5. `src/lib/components/Work.svelte` — update `card__tech` markup, wiring, and CSS

---

## 1. Data model changes — `project.ts`

Add these types (keep existing `TechItem` as-is):

```ts
export type TechGroup = {
  label: string;        // e.g. "FRAMEWORK & LANG" — write uppercase directly, no CSS text-transform relied on
  items: TechItem[];
};
```

Add two **optional** fields to the `Project` type:

```ts
techPreview?: TechItem[];  // exactly 3 items — curated, shown as card badges
techGroups?: TechGroup[];  // full categorized stack — shown in modal
```

Keep the existing `tech: TechItem[]` field untouched on every project (used as the fallback for DevMap, and as a safety net in general).

### Icon imports needed (add to the `simple-icons` import block)
Already imported and reusable: `siTypescript, siNodedotjs, siAstro, siNextdotjs, siPostgresql, siPrisma, siCodemirror, siUpstash, siReact, siExpress, siMysql, siSupabase, siVuedotjs, siLaravel`.

New ones to add — **verify each exists in the installed `simple-icons` v16.x before using** (run `node -e "console.log(Object.keys(require('simple-icons')).filter(k=>/trpc|vite|reactrouter|visualstudiocode|radixui|framer|jsonwebtoken/i.test(k)))"` from the project root, or just try the import and let the build fail fast):

- `siTrpc` (tRPC)
- `siVite` (Vite / Vite PWA)
- `siReactrouter` (React Router)
- `siVisualstudiocode` (VS Code Extension)
- `siRadixui` (Radix UI)
- `siFramer` (Framer Motion — uses Framer's mark, closest available)
- `siJsonwebtokens` (JWT) — if this slug doesn't exist in the installed version, drop the icon for that item entirely (icon is optional, item still renders as a text-only pill — no need for a custom SVG)
- `siTailwindcss` (Tailwind CSS, for DevMap's web app)
- `siGreensock` (GSAP — simple-icons lists it under the GreenSock brand name, not "gsap"; verify the exact export name, fall back to no icon if it doesn't exist)

`siAstro` is already imported and reusable for DevMap.

**Do not add custom SVGs for**: Zustand, Shiki, Recharts, React-PDF, Sonner, React Day Picker, Multer, Web Push, Upstash QStash, Upstash Ratelimit, Lenis, ts-morph, Commander. These render as icon-less pills. For the two Upstash sub-products (QStash, Ratelimit), reuse `siUpstash` — same brand, same color, just different `name` text.

`nextAuthIcon` and `groqIcon` already exist in `icons.ts` — reuse them as-is.

### Per-project `techPreview` + `techGroups`

Insert these into each corresponding project object (alongside the existing `tech` field — leave `tech` as it is, these are additive).

**DEVNOTE**
```ts
techPreview: [
  { name: 'Next.js', icon: si(siNextdotjs) },
  { name: 'TypeScript', icon: si(siTypescript) },
  { name: 'PostgreSQL', icon: si(siPostgresql) }
],
techGroups: [
  { label: 'FRAMEWORK & LANG', items: [
    { name: 'Next.js', icon: si(siNextdotjs) },
    { name: 'TypeScript', icon: si(siTypescript) }
  ]},
  { label: 'BACKEND & API', items: [
    { name: 'tRPC', icon: si(siTrpc) },
    { name: 'NextAuth', icon: nextAuthIcon }
  ]},
  { label: 'DATABASE', items: [
    { name: 'PostgreSQL', icon: si(siPostgresql) },
    { name: 'Prisma', icon: si(siPrisma) }
  ]},
  { label: 'EDITOR & TOOLS', items: [
    { name: 'CodeMirror', icon: si(siCodemirror) },
    { name: 'Shiki' },
    { name: 'VS Code Extension', icon: si(siVisualstudiocode) },
    { name: 'Zustand' }
  ]}
]
```

**CHATME**
```ts
techPreview: [
  { name: 'Next.js', icon: si(siNextdotjs) },
  { name: 'TypeScript', icon: si(siTypescript) },
  { name: 'PostgreSQL', icon: si(siPostgresql) }
],
techGroups: [
  { label: 'FRAMEWORK & LANG', items: [
    { name: 'Next.js', icon: si(siNextdotjs) },
    { name: 'TypeScript', icon: si(siTypescript) }
  ]},
  { label: 'BACKEND & API', items: [
    { name: 'tRPC', icon: si(siTrpc) },
    { name: 'NextAuth', icon: nextAuthIcon },
    { name: 'Upstash QStash', icon: si(siUpstash) },
    { name: 'Upstash Ratelimit', icon: si(siUpstash) }
  ]},
  { label: 'DATABASE', items: [
    { name: 'PostgreSQL', icon: si(siPostgresql) },
    { name: 'Prisma', icon: si(siPrisma) },
    { name: 'Upstash Redis', icon: si(siUpstash) }
  ]},
  { label: 'PWA & REALTIME', items: [
    { name: 'Serwist' },
    { name: 'Web Push' }
  ]}
]
```

**DAILYFIT**
```ts
techPreview: [
  { name: 'Next.js', icon: si(siNextdotjs) },
  { name: 'TypeScript', icon: si(siTypescript) },
  { name: 'PostgreSQL', icon: si(siPostgresql) }
],
techGroups: [
  { label: 'FRAMEWORK & LANG', items: [
    { name: 'Next.js', icon: si(siNextdotjs) },
    { name: 'TypeScript', icon: si(siTypescript) }
  ]},
  { label: 'BACKEND & API', items: [
    { name: 'NextAuth', icon: nextAuthIcon }
  ]},
  { label: 'DATABASE', items: [
    { name: 'PostgreSQL', icon: si(siPostgresql) },
    { name: 'Prisma', icon: si(siPrisma) }
  ]},
  { label: 'FEATURES', items: [
    { name: 'React-PDF' },
    { name: 'Recharts' },
    { name: 'Radix UI', icon: si(siRadixui) }
  ]}
]
```

**DE HOME SPA**
```ts
techPreview: [
  { name: 'Next.js', icon: si(siNextdotjs) },
  { name: 'TypeScript', icon: si(siTypescript) },
  { name: 'Groq', icon: groqIcon }
],
techGroups: [
  { label: 'FRAMEWORK & LANG', items: [
    { name: 'Next.js', icon: si(siNextdotjs) },
    { name: 'TypeScript', icon: si(siTypescript) }
  ]},
  { label: 'BACKEND & API', items: [
    { name: 'Groq', icon: groqIcon },
    { name: 'Vercel Functions' }
  ]},
  { label: 'UI & BOOKING', items: [
    { name: 'Radix UI', icon: si(siRadixui) },
    { name: 'React Day Picker' },
    { name: 'Framer Motion', icon: si(siFramer) },
    { name: 'Sonner' }
  ]}
]
```
*(No Database group — matches the case study, this project has no persistence layer.)*

**MUFADZ PORTAL** *(the one real Frontend/Backend split)*
```ts
techPreview: [
  { name: 'React', icon: si(siReact) },
  { name: 'Express', icon: si(siExpress) },
  { name: 'MySQL', icon: si(siMysql) }
],
techGroups: [
  { label: 'FRONTEND', items: [
    { name: 'React (Vite)', icon: si(siReact) },
    { name: 'TypeScript', icon: si(siTypescript) },
    { name: 'React Router', icon: si(siReactrouter) }
  ]},
  { label: 'BACKEND', items: [
    { name: 'Express', icon: si(siExpress) },
    { name: 'JWT', icon: si(siJsonwebtokens) /* omit icon key entirely if slug missing */ },
    { name: 'Multer' }
  ]},
  { label: 'DATABASE', items: [
    { name: 'MySQL', icon: si(siMysql) }
  ]},
  { label: 'AI & PWA', items: [
    { name: 'Groq', icon: groqIcon },
    { name: 'Vite PWA', icon: si(siVite) }
  ]}
]
```

**KASBON.IN** *(still early — keep using existing known stack only)*
```ts
techPreview: [
  { name: 'Vue', icon: si(siVuedotjs) },
  { name: 'Laravel', icon: si(siLaravel) },
  { name: 'MySQL', icon: si(siMysql) }
],
techGroups: [
  { label: 'FRAMEWORK & LANG', items: [
    { name: 'Vue', icon: si(siVuedotjs) },
    { name: 'Laravel', icon: si(siLaravel) },
    { name: 'Inertia', icon: inertiaIcon }
  ]},
  { label: 'DATABASE', items: [
    { name: 'MySQL', icon: si(siMysql) }
  ]}
]
```
*(Only 4 items total → card can just show all 4, no "+more" needed here per the Work.svelte logic below, since 4 ≤ techPreview.length + threshold... see note in section 3.)*

**DEVMAP** *(monorepo: `packages/cli` — the actual tool — + `apps/web`, its Astro landing/docs site. Not a typical web app, so grouping mirrors that split instead of Framework/Backend/Database.)*
```ts
techPreview: [
  { name: 'ts-morph' },
  { name: 'Commander' },
  { name: 'Astro', icon: si(siAstro) }
],
techGroups: [
  { label: 'CLI & ENGINE', items: [
    { name: 'TypeScript', icon: si(siTypescript) },
    { name: 'Commander' },
    { name: 'ts-morph' }
  ]},
  { label: 'WEB & LANDING', items: [
    { name: 'Astro', icon: si(siAstro) },
    { name: 'Tailwind CSS', icon: si(siTailwindcss) },
    { name: 'GSAP', icon: si(siGreensock) },
    { name: 'Lenis' }
  ]}
]
```
Deliberately excluded: `ignore` and `p-limit` (small utility deps, same tier as the date-fns/Zod skipped earlier — happy to add back if you want the concurrency angle highlighted), and `Node.js` as a standalone badge (implied runtime, not a real dependency — same reasoning as dropping `React` from the Next.js projects).

---

## 2. New store — `src/lib/techModal.ts`

Full file, mirrors `caseStudy.ts` exactly:

```ts
import type { Project } from './data/project';

let openFn: ((project: Project) => void) | null = null;
let closeFn: (() => void) | null = null;

export function registerTechModal(fn: (project: Project) => void) {
  openFn = fn;
}

export function openTechModal(project: Project) {
  openFn?.(project);
}

export function registerTechModalClose(fn: () => void) {
  closeFn = fn;
}

export function onTechModalClose() {
  closeFn?.();
}
```

---

## 3. New component — `src/lib/components/TechModal.svelte`

Base this directly on `CaseStudyModal.svelte`'s script logic (`show`/`close`/`finish`, GSAP fade+slide-y, Escape key, `stopLenis`/`startLenis`, `prefers-reduced-motion` handling, `registerTechModal`/`onTechModalClose` instead of the case-study equivalents). Remove the tab system entirely (no `activeTab`, no `moveIndicator`, no lang switcher).

Markup structure:
- `.tm-modal` wrapper → `.tm-modal__backdrop` (button, closes on click) → `.tm-modal__panel` (`role="dialog"`, `aria-modal="true"`)
- `.tm-modal__close` — same X icon/button as case study
- `.tm-modal__eyebrow` — text `// FULL STACK`
- `.tm-modal__title` — `{project.title}`
- `.tm-modal__body` (scrollable, `data-lenis-prevent`) containing:
  ```svelte
  {#each project.techGroups ?? [] as group}
    <div class="tm-modal__group">
      <span class="tm-modal__group-label">{group.label}</span>
      <ul class="tm-modal__pills">
        {#each group.items as tech}
          <li style={tech.icon ? `--tech-color: ${tech.icon.hex}` : ''}>
            {#if tech.icon}
              <svg class="tech-icon" viewBox="0 0 24 24" aria-hidden="true"
                ><path d={tech.icon.path} fill-rule="evenodd" /></svg>
            {/if}
            <span>{tech.name}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
  ```
- No footer/actions section — keep it focused on the stack only.

Style block: copy the shell rules from `CaseStudyModal.svelte` verbatim but renamed to the `tm-modal` prefix (`.tm-modal`, `.tm-modal__backdrop`, `.tm-modal__panel`, `.tm-modal__close`, `.tm-modal__eyebrow`, `.tm-modal__title`, `.tm-modal__body` + scrollbar rules, and the `@media (max-width: 640px)` / `@media (prefers-reduced-motion: reduce)` blocks). Drop everything tab- and actions-related.

Add new rules:
```css
.tm-modal__group {
  margin-bottom: clamp(1.1rem, 2.5vw, 1.6rem);
}
.tm-modal__group:last-child {
  margin-bottom: 0;
}
.tm-modal__group-label {
  display: block;
  font-family: var(--ff-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--gray);
  margin-bottom: 0.6rem;
}
.tm-modal__pills {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.tm-modal__pills li {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--ff-mono);
  font-size: 0.7rem;
  letter-spacing: 0.03em;
  color: var(--fg-dark);
  border: 1px solid rgba(241, 241, 239, 0.2);
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
  white-space: nowrap;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.tm-modal__pills li:hover {
  background: var(--tech-color, var(--fg-dark));
  border-color: transparent;
  color: var(--black);
}
```
Reuse the existing global `.tech-icon` / `.tech-icon path` rules from `Work.svelte` — since those are declared with `:global()`-free scoping inside `Work.svelte`'s `<style>`, they won't be visible to `TechModal.svelte`. Duplicate this small block inside `TechModal.svelte`'s own `<style>` too:
```css
.tech-icon {
  flex-shrink: 0;
  width: 0.85em;
  height: 0.85em;
  color: inherit;
}
.tech-icon path {
  fill: currentColor;
}
```

---

## 4. `Work.svelte` changes

### Script
```ts
import { openTechModal, registerTechModalClose } from "$lib/techModal";
```
In `onMount`, alongside the existing `registerCaseStudyClose(resumePreviews);` line, add:
```ts
registerTechModalClose(resumePreviews);
```

Add a small helper (top of `<script>`, near other functions):
```ts
function techTotalCount(project: (typeof projects)[number]) {
  return project.techGroups?.reduce((sum, g) => sum + g.items.length, 0) ?? 0;
}
```

### Markup
Replace the existing `.card__tech` block:
```svelte
<div class="card__tech">
  <span class="tech__label">STACK</span>
  <ul class="tech__list">
    {#each project.tech as tech}
      <li style={tech.icon ? `--tech-color: ${tech.icon.hex}` : ""}>
        ...
      </li>
    {/each}
  </ul>
</div>
```
with:
```svelte
<div class="card__tech">
  <span class="tech__label">STACK</span>
  <ul class="tech__list">
    {#if project.techPreview && project.techGroups}
      {#each project.techPreview as tech}
        <li style={tech.icon ? `--tech-color: ${tech.icon.hex}` : ""}>
          {#if tech.icon}
            <svg class="tech-icon" viewBox="0 0 24 24" aria-hidden="true"
              ><path d={tech.icon.path} fill-rule="evenodd" /></svg>
          {/if}
          <span>{tech.name}</span>
        </li>
      {/each}
      {#if techTotalCount(project) > project.techPreview.length}
        <li
          class="tech__more"
          role="button"
          tabindex="0"
          onclick={() => {
            pausePreviews();
            openTechModal(project);
          }}
          onkeydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              pausePreviews();
              openTechModal(project);
            }
          }}
        >
          <span>+{techTotalCount(project) - project.techPreview.length} MORE</span>
        </li>
      {/if}
    {:else}
      {#each project.tech as tech}
        <li style={tech.icon ? `--tech-color: ${tech.icon.hex}` : ""}>
          {#if tech.icon}
            <svg class="tech-icon" viewBox="0 0 24 24" aria-hidden="true"
              ><path d={tech.icon.path} fill-rule="evenodd" /></svg>
          {/if}
          <span>{tech.name}</span>
        </li>
      {/each}
    {/if}
  </ul>
</div>
```
The `{:else}` branch is a pure safety net (renders old flat `project.tech` behavior) in case a project is ever added without `techPreview`/`techGroups` set — none of the current 7 projects hit it.

Note: for Kasbon.in this yields `techTotalCount = 4`, `techPreview.length = 3` → still shows "+1 MORE", which is fine (opens a modal with 2 small groups — still useful, no need to special-case it).

### Register the new modal component
In the parent route/layout where `<CaseStudyModal />` is currently mounted (find it — likely `src/routes/+page.svelte` or similar), add `<TechModal />` alongside it:
```svelte
<CaseStudyModal />
<TechModal />
```
with the matching import.

### CSS additions (inside `Work.svelte`'s `<style>` block, near `.tech__list li`)
```css
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
```
(No extra rule needed beyond this — `.tech__more` still matches the base `.tech__list li` selector for font/padding/radius, and the existing `.tech__list li:hover` rule already applies since it's the same element; the block above only needs to override the dashed border and remove reliance on `--tech-color` since "more" has no brand color.)

---

## 5. QA checklist (run after implementing)
- [ ] `pnpm check` / `pnpm build` — no TS errors, all `simple-icons` imports resolve
- [ ] Any icon slug that fails to import → remove that `icon:` key for the affected item (pill still renders fine text-only)
- [ ] Every project (all 7, including DevMap) shows exactly 3 pills + one dashed "+N MORE" pill
- [ ] DevMap's "+N MORE" opens the modal with "CLI & ENGINE" / "WEB & LANDING" groups correctly populated
- [ ] Clicking "+N MORE" opens `TechModal` with correctly grouped content per project
- [ ] Modal open pauses video previews (same as `CaseStudyModal`); closing resumes them
- [ ] Escape key and backdrop click both close the modal
- [ ] Mobile width (≤640px) — modal panel resizes properly, pills wrap cleanly
- [ ] `prefers-reduced-motion: reduce` — modal appears without GSAP tween, same as case study modal
- [ ] Keyboard: "+N MORE" is focusable and triggers on Enter/Space (it's a `<li>` acting as a button — verify focus ring is visible or add `outline` on `:focus-visible` if the browser default is being suppressed elsewhere in the site's CSS)