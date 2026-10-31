<script lang="ts">
	import { skillGroups as groups } from '$lib/data/skills';
	import { reveal } from '$lib/reveal';
</script>

<section class="skills" id="skills">
	<div class="skills__inner">
		<header class="skills__head" use:reveal>
			<span class="skills__idx">03 // SKILLS</span>
			<h2 class="skills__title">WHAT I<br />USE<span aria-hidden="true">_</span></h2>
			<p class="skills__lead">Tools and technologies I reach for when build real products.</p>
		</header>

		<div class="skills__groups">
			{#each groups as group, gi}
				<div class="skills__group" use:reveal={{ delay: 0.05 }}>
					<div class="skills__label">
						<span>0{gi + 1}</span>
						<h3>{group.label}</h3>
					</div>
					<ul class="skills__items">
						{#each group.items as item}
							<li class="skills__chip" style="--skill-color: {item.icon.hex}">
								<span class="skills__ico" class:skills__ico--color={!!item.icon.svg}>
									<svg viewBox={item.icon.viewBox ?? '0 0 24 24'} aria-hidden="true">
										{#if item.icon.svg}
											{@html item.icon.svg}
										{:else}
											<path d={item.icon.path} fill-rule="evenodd" />
										{/if}
									</svg>
								</span>
								{item.name}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills {
		position: relative;
		z-index: 2;
		background: var(--black);
		color: var(--fg-dark);
		padding: clamp(5rem, 12vw, 10rem) clamp(1.1rem, 2.6vw, 2.25rem);
	}
	.skills__inner {
		max-width: 96rem;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: 3rem clamp(1rem, 2vw, 2rem);
		align-items: start;
	}
	.skills__head {
		grid-column: 1 / span 5;
		position: sticky;
		top: clamp(5rem, 10vh, 7rem);
	}
	.skills__idx {
		display: block;
		margin-bottom: 1.5rem;
		font-family: var(--ff-mono);
		font-size: 0.74rem;
		letter-spacing: 0.1em;
		color: var(--gray);
	}
	.skills__title {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: clamp(4rem, 11vw, 10rem);
		line-height: 0.88;
	}
	.skills__lead {
		max-width: 20rem;
		margin: 1.75rem 0 0;
		font-family: var(--ff-body);
		font-size: 0.98rem;
		line-height: 1.5;
		color: var(--gray-light);
	}

	.skills__groups {
		grid-column: 7 / -1;
		display: grid;
	}
	.skills__group {
		padding: 1.5rem 0 2.25rem;
		border-top: 1px solid rgba(241, 241, 239, 0.22);
	}
	.skills__label {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 1.4rem;
	}
	.skills__label span {
		font-family: var(--ff-mono);
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		color: var(--gray);
	}
	.skills__label h3 {
		margin: 0;
		font-family: var(--ff-display);
		font-weight: 400;
		font-size: clamp(1.6rem, 2.6vw, 2.3rem);
		letter-spacing: 0.02em;
	}
	.skills__items {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}
	.skills__chip {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.4rem 0.9rem 0.4rem 0.4rem;
		border: 1px solid rgba(241, 241, 239, 0.28);
		border-radius: 999px;
		font-family: var(--ff-mono);
		font-size: 0.76rem;
		letter-spacing: 0.04em;
		transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
	}
	.skills__chip:hover {
		background: var(--fg-dark);
		color: var(--black);
		border-color: var(--fg-dark);
	}
	.skills__ico {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 50%;
		background: rgba(241, 241, 239, 0.1);
		transition: background 0.25s ease;
	}
	.skills__chip:hover .skills__ico {
		background: rgba(10, 10, 10, 0.08);
	}
	.skills__ico svg {
		width: 0.95rem;
		height: 0.95rem;
	}
	.skills__ico:not(.skills__ico--color) svg path {
		fill: currentColor;
	}
	/* Icon custom yang bawa warna sendiri (Figma dkk) selalu di latar putih. */
	.skills__ico--color {
		background: #fff !important;
	}

	@media (max-width: 900px) {
		.skills__head {
			grid-column: 1 / -1;
			position: static;
		}
		.skills__groups {
			grid-column: 1 / -1;
		}
	}
</style>
