// Shared "scramble reveal" text effect — characters randomize until scroll
// progress locks them in left-to-right. Originally lived only inside
// Contact.svelte; extracted here once GithubActivity started needing the
// same effect for its closing insight line, so both share one source.

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_+-<>/\\';

export function randomScrambleChar(): string {
	return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

/**
 * Returns `target` with the first `progress * target.length` characters
 * locked in place and the rest replaced by random scramble characters.
 * Characters in `skipChars` (spaces, punctuation) are never scrambled.
 */
export function renderScramble(
	target: string,
	progress: number,
	skipChars: string[] = [' ', "'", '·', '_']
): string {
	const revealCount = Math.floor(progress * target.length);
	let out = '';
	for (let i = 0; i < target.length; i++) {
		const ch = target[i];
		if (skipChars.includes(ch)) {
			out += ch;
			continue;
		}
		out += i < revealCount ? ch : randomScrambleChar();
	}
	return out;
}

/** Same-length string of pure scramble noise, used for the initial paint
 * before any scroll progress exists (so the line isn't blank on first frame). */
export function fullScramble(target: string, skipChars: string[] = [' ', "'", '·', '_']): string {
	return target.replace(/./g, (ch) => (skipChars.includes(ch) ? ch : randomScrambleChar()));
}