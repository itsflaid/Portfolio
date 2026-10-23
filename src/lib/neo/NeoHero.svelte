<script lang="ts">
	import { openResumeModal } from '$lib/resume';
	import { heroCopy } from './copy';
</script>

<section class="nh" id="top">
	<div class="nh__grid" aria-hidden="true"></div>

	<!-- decorative stickers -->
	<div class="nh__win" aria-hidden="true">
		<div class="nh__win-bar"><i></i><i></i><i></i></div>
		<div class="nh__win-body">
			<span>FLAID</span>
			<span class="nh__blink">_</span>
		</div>
	</div>
	<svg class="nh__star nh__star--a" viewBox="0 0 100 100" aria-hidden="true">
		<path d="M50 4 L61 39 L96 50 L61 61 L50 96 L39 61 L4 50 L39 39 Z" />
	</svg>
	<svg class="nh__star nh__star--b" viewBox="0 0 100 100" aria-hidden="true">
		<path d="M50 4 L61 39 L96 50 L61 61 L50 96 L39 61 L4 50 L39 39 Z" />
	</svg>
	<span class="nh__dot nh__dot--a" aria-hidden="true"></span>
	<span class="nh__dot nh__dot--b" aria-hidden="true"></span>

	<div class="nh__inner">
		<p class="nh__eyebrow">{heroCopy.eyebrow}</p>
		<h1 class="nh__title">
			<span>{heroCopy.first}</span>
			<span>{heroCopy.last}</span>
		</h1>
		<p class="nh__sub">{heroCopy.sub}</p>
		<div class="nh__cta">
			<button type="button" class="nh__btn nh__btn--yellow" onclick={openResumeModal}>
				RESUME <span aria-hidden="true">↗</span>
			</button>
			<a class="nh__btn nh__btn--paper" href="#projects">
				THE PROJECTS <span aria-hidden="true">↓</span>
			</a>
		</div>
	</div>
</section>

<style>
	.nh {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		background: var(--n-blue);
		border-bottom: var(--n-border) solid var(--n-ink);
		padding: clamp(3rem, 8vw, 6.5rem) clamp(1rem, 4vw, 3rem) clamp(3.5rem, 9vw, 7rem);
		min-height: min(88vh, 54rem);
		display: flex;
		align-items: center;
	}
	.nh__grid {
		position: absolute;
		inset: 0;
		z-index: -1;
		background-image:
			linear-gradient(to right, rgba(11, 11, 15, 0.28) 2px, transparent 2px),
			linear-gradient(to bottom, rgba(11, 11, 15, 0.28) 2px, transparent 2px);
		background-size: 56px 56px;
	}
	.nh__inner {
		position: relative;
		width: 100%;
		max-width: 78rem;
		margin: 0 auto;
	}
	.nh__eyebrow {
		display: inline-block;
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: clamp(0.7rem, 1.6vw, 0.85rem);
		letter-spacing: 0.06em;
		color: var(--n-ink);
		background: var(--n-yellow);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 4px 4px 0 var(--n-ink);
		padding: 0.4rem 0.7rem;
		transform: rotate(-1.5deg);
	}
	.nh__title {
		margin: clamp(1.25rem, 3vw, 2rem) 0 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(2.4rem, 12.4vw, 11.5rem);
		line-height: 0.92;
		letter-spacing: -0.01em;
		text-transform: uppercase;
		color: #fff;
		-webkit-text-stroke: 3px var(--n-ink);
		paint-order: stroke fill;
		text-shadow: 0.06em 0.06em 0 var(--n-ink);
	}
	.nh__title span {
		display: block;
	}
	.nh__title span:last-child {
		padding-left: clamp(0.5rem, 6vw, 5rem);
	}
	.nh__sub {
		max-width: 34rem;
		margin: clamp(1.5rem, 3.5vw, 2.5rem) 0 0;
		font-size: clamp(1rem, 2vw, 1.2rem);
		line-height: 1.55;
		font-weight: 500;
		color: var(--n-ink);
		background: var(--n-paper);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		padding: 1rem 1.15rem;
	}
	.nh__cta {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 1.25rem;
		margin-top: clamp(1.5rem, 3.5vw, 2.25rem);
	}
	.nh__btn {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-family: 'Archivo Black', sans-serif;
		font-size: 0.95rem;
		letter-spacing: 0.03em;
		color: var(--n-ink);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		padding: 0.8rem 1.25rem;
		cursor: pointer;
		transition:
			transform 0.1s steps(2),
			box-shadow 0.1s steps(2);
	}
	.nh__btn--yellow {
		background: var(--n-yellow);
	}
	.nh__btn--paper {
		background: var(--n-paper);
	}
	.nh__btn:hover {
		transform: translate(-3px, -3px);
		box-shadow: 9px 9px 0 var(--n-ink);
	}
	.nh__btn:active {
		transform: translate(4px, 4px);
		box-shadow: 2px 2px 0 var(--n-ink);
	}

	/* stickers */
	.nh__win {
		position: absolute;
		right: clamp(1rem, 6vw, 6rem);
		top: clamp(1.5rem, 8vw, 5rem);
		width: clamp(8rem, 18vw, 13rem);
		background: var(--n-paper);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		transform: rotate(4deg);
		z-index: 0;
	}
	.nh__win-bar {
		display: flex;
		gap: 0.35rem;
		padding: 0.4rem 0.5rem;
		background: var(--n-pink);
		border-bottom: var(--n-border) solid var(--n-ink);
	}
	.nh__win-bar i {
		width: 0.6rem;
		height: 0.6rem;
		background: var(--n-paper);
		border: 2px solid var(--n-ink);
	}
	.nh__win-body {
		padding: 0.8rem 0.7rem;
		font-family: 'Archivo Black', sans-serif;
		font-size: clamp(1.1rem, 2.4vw, 1.7rem);
		color: var(--n-ink);
	}
	.nh__blink {
		animation: nh-blink 1s steps(2) infinite;
	}
	.nh__star {
		position: absolute;
		fill: var(--n-yellow);
		stroke: var(--n-ink);
		stroke-width: 5;
		stroke-linejoin: round;
		z-index: 0;
	}
	.nh__star--a {
		width: clamp(3rem, 8vw, 6rem);
		right: clamp(6rem, 24vw, 22rem);
		bottom: clamp(2rem, 8vw, 6rem);
		animation: nh-spin 14s linear infinite;
	}
	.nh__star--b {
		width: clamp(1.8rem, 4vw, 3rem);
		fill: var(--n-mint);
		left: clamp(40%, 55vw, 60%);
		top: clamp(1rem, 5vw, 4rem);
	}
	.nh__dot {
		position: absolute;
		border: var(--n-border) solid var(--n-ink);
		border-radius: 50%;
		z-index: 0;
	}
	.nh__dot--a {
		width: clamp(2.2rem, 5vw, 3.6rem);
		height: clamp(2.2rem, 5vw, 3.6rem);
		background: var(--n-pink);
		right: clamp(1rem, 4vw, 3rem);
		bottom: clamp(5rem, 14vw, 10rem);
	}
	.nh__dot--b {
		width: clamp(1.2rem, 2.6vw, 1.9rem);
		height: clamp(1.2rem, 2.6vw, 1.9rem);
		background: var(--n-lilac);
		left: clamp(1rem, 3vw, 2rem);
		bottom: clamp(1rem, 3vw, 2rem);
	}

	@keyframes nh-blink {
		50% {
			opacity: 0;
		}
	}
	@keyframes nh-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 720px) {
		.nh__win {
			opacity: 0.95;
			top: auto;
			bottom: 1rem;
			right: 1rem;
			width: 7.5rem;
		}
		.nh__star--a {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.nh__blink,
		.nh__star--a {
			animation: none;
		}
	}
</style>
