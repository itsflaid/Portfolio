import type { Project } from './data/project';

let openFn: ((project: Project) => void) | null = null;
let closeFn: (() => void) | null = null;

export function registerCaseStudyModal(fn: (project: Project) => void) {
	openFn = fn;
}

export function openCaseStudyModal(project: Project) {
	openFn?.(project);
}

export function registerCaseStudyClose(fn: () => void) {
	closeFn = fn;
}

export function onCaseStudyClose() {
	closeFn?.();
}