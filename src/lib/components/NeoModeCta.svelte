<script lang="ts">
	import { setTheme } from '$lib/theme';
</script>

<button type="button" class="neo-cta" onclick={() => setTheme('neo')} aria-label="Switch to neo-brutalist mode">
	<span class="neo-cta__spark" aria-hidden="true">✦</span>
	<span class="neo-cta__text">
		<small>TRY</small>
		NEO MODE
	</span>
</button>

<style>
	.neo-cta {
		position: fixed;
		right: clamp(0.9rem, 2.4vw, 1.75rem);
		bottom: clamp(0.9rem, 2.4vw, 1.75rem);
		z-index: 45;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 0.95rem 0.6rem 0.7rem;
		font-family: 'Archivo Black', 'Bebas Neue', sans-serif;
		font-size: 0.95rem;
		line-height: 1;
		letter-spacing: 0.02em;
		color: #0b0b0f;
		background: #ffd83d;
		border: 3px solid #0b0b0f;
		box-shadow: 5px 5px 0 #0b0b0f;
		cursor: pointer;
		transition:
			transform 0.1s steps(2),
			box-shadow 0.1s steps(2),
			background 0.1s steps(2);
	}
	.neo-cta:hover {
		background: #38e0b0;
		transform: translate(-2px, -2px);
		box-shadow: 8px 8px 0 #0b0b0f;
	}
	.neo-cta:active {
		transform: translate(3px, 3px);
		box-shadow: 1px 1px 0 #0b0b0f;
	}
	.neo-cta:focus-visible {
		outline: 3px solid #2d6bff;
		outline-offset: 3px;
	}
	.neo-cta__spark {
		display: grid;
		place-items: center;
		width: 1.9rem;
		height: 1.9rem;
		background: #ff6fa5;
		border: 3px solid #0b0b0f;
		border-radius: 50%;
		font-size: 0.9rem;
	}
	.neo-cta__text {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.neo-cta__text small {
		font-family: 'JetBrains Mono', monospace;
		font-weight: 500;
		font-size: 0.6rem;
		letter-spacing: 0.12em;
	}
	@media (max-width: 520px) {
		.neo-cta {
			padding: 0.45rem 0.7rem 0.45rem 0.5rem;
			font-size: 0.8rem;
			box-shadow: 4px 4px 0 #0b0b0f;
		}
		.neo-cta__spark {
			width: 1.5rem;
			height: 1.5rem;
		}
	}
</style>
