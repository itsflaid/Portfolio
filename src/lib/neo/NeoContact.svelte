<script lang="ts">
	import { navLinks, socials, SITE } from '$lib/data/site';
	import { contactCopy } from './copy';

	const year = new Date().getFullYear();

	function toTop(e: MouseEvent) {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="nc" id="contact">
	<div class="nc__wrap">
		<div class="nc__top">
			<span class="nc__eyebrow">{contactCopy.eyebrow}</span>
			<p class="nc__lead">{contactCopy.lead}</p>
		</div>

		<div class="nc__cta">
			<span class="nc__idea">{contactCopy.ideaEyebrow}</span>
			<h2 class="nc__title">
				<span>{contactCopy.line1}</span>
				<span>{contactCopy.line2}<i aria-hidden="true">_</i></span>
			</h2>
			<a class="nc__mail" href="mailto:{SITE.email}">{SITE.email} →</a>
		</div>

		<div class="nc__cols">
			<nav class="nc__col" aria-label="Menu">
				<h3>{contactCopy.menu}</h3>
				<ul>
					{#each navLinks as link, i}
						<li>
							<a href={link.href}><span>0{i + 1}</span>{link.label}</a>
						</li>
					{/each}
				</ul>
			</nav>
			<div class="nc__col">
				<h3>{contactCopy.connect}</h3>
				<ul>
					{#each socials as s, i}
						<li>
							<a href={s.href} target="_blank" rel="noopener noreferrer"
								><span>0{i + 1}</span>{s.label}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="nc__end">
			<div>
				<span class="nc__end-eyebrow">{contactCopy.endEyebrow}</span>
				<p class="nc__end-title">
					{contactCopy.end1}
					{contactCopy.end2}<i aria-hidden="true">_</i>
				</p>
				<p class="nc__credits">{contactCopy.credits}</p>
			</div>
			<a class="nc__top-btn" href="#top" onclick={toTop}>{contactCopy.top}</a>
		</div>

		<p class="nc__copy">© {year} Muhammad Fadil — FLAID</p>
	</div>
</footer>

<style>
	.nc {
		background: var(--n-paper);
		padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2rem);
	}
	.nc__wrap {
		max-width: 78rem;
		margin: 0 auto;
		display: grid;
		gap: clamp(2rem, 5vw, 3.5rem);
	}
	.nc__top {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.8rem 1.5rem;
	}
	.nc__eyebrow {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		background: var(--n-ink);
		color: var(--n-paper);
		padding: 0.3rem 0.6rem;
	}
	.nc__lead {
		margin: 0;
		font-weight: 600;
		font-size: clamp(1rem, 2vw, 1.3rem);
	}
	.nc__cta {
		background: var(--n-blue);
		color: #fff;
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 10px 10px 0 var(--n-ink);
		padding: clamp(1.25rem, 4vw, 3rem);
		display: grid;
		gap: 1rem;
		justify-items: start;
	}
	.nc__idea {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		background: var(--n-yellow);
		color: var(--n-ink);
		border: 2px solid var(--n-ink);
		padding: 0.25rem 0.55rem;
	}
	.nc__title {
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(3rem, 12vw, 9.5rem);
		line-height: 0.92;
		text-transform: uppercase;
		-webkit-text-stroke: 3px var(--n-ink);
		paint-order: stroke fill;
		text-shadow: 0.05em 0.05em 0 var(--n-ink);
	}
	.nc__title span {
		display: block;
	}
	.nc__title i {
		font-style: normal;
		color: var(--n-yellow);
	}
	.nc__mail {
		font-family: 'Archivo Black', sans-serif;
		font-size: clamp(0.95rem, 2.4vw, 1.5rem);
		color: var(--n-ink);
		background: var(--n-yellow);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 5px 5px 0 var(--n-ink);
		padding: 0.7rem 1rem;
		overflow-wrap: anywhere;
		transition:
			transform 0.1s steps(2),
			box-shadow 0.1s steps(2);
	}
	.nc__mail:hover {
		transform: translate(-3px, -3px);
		box-shadow: 8px 8px 0 var(--n-ink);
	}
	.nc__mail:active {
		transform: translate(3px, 3px);
		box-shadow: 1px 1px 0 var(--n-ink);
	}
	.nc__cols {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(1rem, 3vw, 2rem);
	}
	.nc__col {
		background: #fff;
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		padding: 1rem 1.2rem 1.2rem;
	}
	.nc__col:nth-child(2) {
		background: var(--n-mint);
	}
	.nc__col h3 {
		margin: 0 0 0.8rem;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: 0.95rem;
		letter-spacing: 0.05em;
	}
	.nc__col ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.35rem;
	}
	.nc__col a {
		display: flex;
		gap: 0.8rem;
		align-items: baseline;
		font-family: 'Archivo Black', sans-serif;
		font-size: clamp(1.1rem, 2.4vw, 1.5rem);
		color: var(--n-ink);
		padding: 0.15rem 0.3rem;
		margin: 0 -0.3rem;
	}
	.nc__col a span {
		font-family: var(--ff-mono);
		font-size: 0.75rem;
		font-weight: 500;
	}
	.nc__col a:hover {
		background: var(--n-yellow);
	}
	.nc__end {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1.25rem;
		background: var(--n-ink);
		color: var(--n-paper);
		padding: clamp(1.1rem, 3vw, 2rem);
	}
	.nc__end-eyebrow {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		color: var(--n-yellow);
	}
	.nc__end-title {
		margin: 0.4rem 0 0;
		font-family: 'Archivo Black', sans-serif;
		font-size: clamp(1.6rem, 5vw, 3.2rem);
		line-height: 1;
		text-transform: uppercase;
	}
	.nc__end-title i {
		font-style: normal;
		color: var(--n-pink);
	}
	.nc__credits {
		margin: 0.7rem 0 0;
		font-family: var(--ff-mono);
		font-size: 0.75rem;
		letter-spacing: 0.04em;
	}
	.nc__top-btn {
		font-family: 'Archivo Black', sans-serif;
		color: var(--n-ink);
		background: var(--n-yellow);
		border: var(--n-border) solid var(--n-paper);
		box-shadow: 5px 5px 0 var(--n-pink);
		padding: 0.7rem 1.1rem;
		transition:
			transform 0.1s steps(2),
			box-shadow 0.1s steps(2);
	}
	.nc__top-btn:hover {
		transform: translate(-3px, -3px);
		box-shadow: 8px 8px 0 var(--n-pink);
	}
	.nc__top-btn:active {
		transform: translate(3px, 3px);
		box-shadow: 1px 1px 0 var(--n-pink);
	}
	.nc__copy {
		margin: 0;
		font-family: var(--ff-mono);
		font-size: 0.75rem;
		text-align: center;
	}

	@media (max-width: 640px) {
		.nc__cols {
			grid-template-columns: 1fr;
		}
	}
</style>
