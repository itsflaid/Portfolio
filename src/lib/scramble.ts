const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_+-<>/\\';

export function randomScrambleChar(): string {
	return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

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

export function fullScramble(target: string, skipChars: string[] = [' ', "'", '·', '_']): string {
	return target.replace(/./g, (ch) => (skipChars.includes(ch) ? ch : randomScrambleChar()));
}