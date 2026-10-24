<script lang="ts">
	import { entries } from '$lib/data/experience';

	// newest first, same entries as the animated timeline
	const rows = [...entries].reverse();
</script>

<section class="sm-section" id="experience">
	<h2 class="sm-label">Experience &amp; Education</h2>
	<ul class="xp">
		{#each rows as entry}
			<li>
				<div class="xp__when">
					<span>{entry.date}</span>
					<span class="xp__type">{entry.type}</span>
				</div>
				<div class="xp__what">
					<b>{entry.title}</b>
					<span class="xp__org">{entry.org}</span>
					{#if entry.desc}<span class="xp__desc">{entry.desc}</span>{/if}
				</div>
			</li>
		{/each}
	</ul>
</section>

<style>
	.xp {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	li {
		display: grid;
		grid-template-columns: 190px minmax(0, 1fr);
		gap: 4px 16px;
		padding: 12px 0;
		border-bottom: 1px solid var(--sm-line);
	}
	.xp__when {
		display: flex;
		flex-direction: column;
		gap: 2px;
		font-family: var(--sm-mono);
		font-size: 12px;
		color: var(--sm-mute);
		padding-top: 2px;
	}
	.xp__type {
		letter-spacing: 0.06em;
	}
	.xp__what {
		display: flex;
		flex-direction: column;
	}
	b {
		font-weight: 500;
	}
	.xp__org {
		font-size: 14px;
		color: var(--sm-mute);
	}
	.xp__desc {
		margin-top: 4px;
		font-size: 14px;
		color: var(--sm-body);
	}
	@media (max-width: 640px) {
		li {
			grid-template-columns: 1fr;
		}
		.xp__when {
			flex-direction: row;
			gap: 10px;
		}
	}
</style>
