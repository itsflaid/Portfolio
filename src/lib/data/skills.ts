/* Skills shown on the portfolio. Shared by the normal and neo layouts. */
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
} from "./icons";
import type { SkillIcon } from "./icons";

export type SkillItem = {
  name: string;
  icon: SkillIcon;
  color: "a" | "b";
  shape: "a" | "b" | "c";
};
export type SkillGroup = { label: string; items: SkillItem[] };

export const skillGroups: SkillGroup[] = [
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

