export const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_+-<>/\\';

export function randomScrambleChar() {
	return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

// Renders a target string where the first `progress * target.length` characters
// are locked in and the rest keep jittering as random characters. Spaces,
// apostrophes and separators always stay put so words don't fall apart mid-scramble.
const KEEP = new Set([' ', "'", '·', '—', '.', ',', '&']);

export function scrambleText(target: string, progress: number) {
	const revealCount = Math.floor(progress * target.length);
	let out = '';
	for (let i = 0; i < target.length; i++) {
		const ch = target[i];
		if (KEEP.has(ch)) {
			out += ch;
			continue;
		}
		out += i < revealCount ? ch : randomScrambleChar();
	}
	return out;
}

// Random-looking initial state (nothing locked) for the pre-reveal frame.
export function scrambledPlaceholder(target: string) {
	return target.replace(/[^ '·—.,&]/g, () => randomScrambleChar());
}
