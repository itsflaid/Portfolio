<a class="svc" href="/simple" aria-label="Open the simple, quick-read version of this portfolio">
	<span class="svc__small">QUICK READ</span>
	<span class="svc__main">SIMPLE VIEW →</span>
</a>

<style>
	.svc {
		position: fixed;
		right: clamp(0.9rem, 2.4vw, 1.75rem);
		bottom: clamp(0.9rem, 2.4vw, 1.75rem);
		z-index: 45;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.6rem 0.9rem;
		background: #0a0a0a;
		color: #f1f1ef;
		border: 1px solid #f1f1ef;
		text-decoration: none;
		font-family: var(--ff-mono, 'JetBrains Mono', monospace);
		line-height: 1;
		transition: background 0.2s ease, color 0.2s ease;
	}
	.svc:hover {
		background: #f1f1ef;
		color: #0a0a0a;
		border-color: #0a0a0a;
	}
	.svc:focus-visible {
		outline: 2px solid #f1f1ef;
		outline-offset: 3px;
	}
	.svc__small {
		font-size: 0.6rem;
		letter-spacing: 0.12em;
		opacity: 0.7;
	}
	.svc__main {
		font-size: 0.78rem;
		letter-spacing: 0.06em;
		font-weight: 500;
	}
	@media (max-width: 520px) {
		.svc {
			padding: 0.5rem 0.7rem;
		}
	}
</style>
