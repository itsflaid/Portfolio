import { setupPreviewVideos, type PreviewController } from '$lib/preview';
import { registerCaseStudyClose } from '$lib/caseStudy';
import { registerTechModalClose } from '$lib/techModal';

/**
 * Wires the shared hover/scroll video preview to a container of neo project cards
 * and resumes it when either modal closes. Returns { pause, destroy }.
 */
export function attachPreviews(container: HTMLElement) {
	const ctl: PreviewController = setupPreviewVideos(container);
	registerCaseStudyClose(() => ctl.resume());
	registerTechModalClose(() => ctl.resume());
	return { pause: () => ctl.pause(), destroy: () => ctl.destroy() };
}
