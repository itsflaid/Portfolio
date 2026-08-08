<nav class="nav">
	<span class="nav__mark">FLAID</span>
	<div class="nav__links">
		<a href="#work">Work</a>
		<a href="#contact">Contact</a>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 50;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: clamp(1.25rem, 3vw, 2.5rem) clamp(1.5rem, 5vw, 4rem);
		font-family: var(--ff-body);
		font-weight: 500;
		font-size: 0.95rem;
		color: #ffffff;
		mix-blend-mode: difference;
	}
	.nav__mark {
		font-weight: 700;
	}
	.nav__links {
		display: flex;
		gap: 2rem;
	}
	.nav__links a {
		position: relative;
		color: inherit;
		text-decoration: none;
	}
	.nav__links a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -4px;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.3s ease;
	}
	.nav__links a:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}
</style>
