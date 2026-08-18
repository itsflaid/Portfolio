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