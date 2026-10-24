<script lang="ts">
	import { SITE, socials } from '$lib/data/site';
	import { contactCopy } from './copy';

	const year = new Date().getFullYear();
	const names: Record<string, string> = { GITHUB: 'GitHub', LINKEDIN: 'LinkedIn', INSTAGRAM: 'Instagram' };
</script>

<footer class="ft" id="contact">
	<div class="sm-wrap">
		<p class="ft__lead">{contactCopy.lead}</p>
		<a class="ft__mail" href="mailto:{SITE.email}">{SITE.email}</a>
		<div class="ft__row">
			{#each socials as s}
				<a href={s.href} target="_blank" rel="noopener noreferrer">{names[s.label] ?? s.label}</a>
			{/each}
		</div>
		<p class="sm-mono ft__copy">© {year} Muhammad Fadil — FLAID</p>
	</div>
</footer>

<style>
	.ft {
		border-top: 1px solid var(--sm-line);
		padding: 36px 0 56px;
	}
	.ft__lead {
		margin: 0 0 8px;
		font-size: 24px;
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.25;
	}
	.ft__mail {
		font-size: 16px;
	}
	.ft__row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 20px;
		margin-top: 14px;
		font-size: 14px;
	}
	.ft__copy {
		margin: 28px 0 0;
	}
	@media (max-width: 640px) {
		.ft__lead {
			font-size: 20px;
		}
	}
</style>
