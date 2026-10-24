<script lang="ts">
	import { skillGroups } from '$lib/data/skills';
</script>

<section class="sm-section" id="skills">
	<h2 class="sm-label">Skills</h2>
	<dl class="sk">
		{#each skillGroups as group}
			<dt>{group.label}</dt>
			<dd>{group.items.map((i) => i.name).join(', ')}</dd>
		{/each}
	</dl>
</section>

<style>
	.sk {
		margin: 0;
		display: grid;
		grid-template-columns: 150px minmax(0, 1fr);
		gap: 10px 16px;
		font-size: 15px;
	}
	dt {
		font-family: var(--sm-mono);
		font-size: 12px;
		color: var(--sm-mute);
		padding-top: 3px;
	}
	dd {
		margin: 0;
	}
	@media (max-width: 640px) {
		.sk {
			grid-template-columns: 1fr;
			gap: 0;
		}
		dt {
			padding-top: 10px;
		}
	}
</style>
