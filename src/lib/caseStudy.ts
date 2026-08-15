import type { Project } from './data/project';

let openFn: ((project: Project) => void) | null = null;

export function registerCaseStudyModal(fn: (project: Project) => void) {
	openFn = fn;
}

export function openCaseStudyModal(project: Project) {
	openFn?.(project);
}