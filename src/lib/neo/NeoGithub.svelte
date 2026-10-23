<script lang="ts">
	import { onMount } from 'svelte';
	import { SITE } from '$lib/data/site';
	import { githubCopy } from './copy';
	import {
		computeMonthly,
		formatDate,
		levelFor,
		type Day,
		type MonthBucket,
		type Stats
	} from './github-utils';

	let weeks: Day[][] = $state([]);
	let trailingWeeks: Day[][] = [];
	let byYear: Record<string, Day[][]> = {};
	let years: number[] = $state([]);
	let yearFilter: 'trailing' | number = $state('trailing');
	let stats: Stats = $state({
		total: 0,
		currentStreak: 0,
		longestStreak: 0,
		activeDays: 0,
		commits: 0,
		repos: 0,
		stars: 0,
		followers: 0
	});
	let monthly: MonthBucket[] = $state([]);
	let loading = $state(true);
	let loadError = $state(false);

	function applyYear(value: 'trailing' | number) {
		yearFilter = value;
		weeks = value === 'trailing' ? trailingWeeks : (byYear[String(value)] ?? []);
		monthly = computeMonthly(weeks);
	}

	onMount(async () => {
		try {
			const res = await fetch('/api/github');
			const data = await res.json();
			if (!res.ok || data.error) throw new Error(data.error ?? 'unknown');
			trailingWeeks = data.weeks;
			byYear = data.byYear ?? {};
			years = data.years ?? [];
			stats = data.stats;
			applyYear('trailing');
		} catch {
			loadError = true;
		} finally {
			loading = false;
		}
	});
</script>

<section class="ng" id="activity">
	<div class="ng__wrap">
		<header class="ng__head">
			<span class="ng__eyebrow">{githubCopy.eyebrow}</span>
			<h2 class="ng__title">
				<span>{githubCopy.line1}</span>
				<span>{githubCopy.line2}<i aria-hidden="true">_</i></span>
			</h2>
		</header>

		{#if loadError}
			<p class="ng__fallback">
				{githubCopy.fallback}
				<a href={SITE.github} target="_blank" rel="noopener noreferrer">{githubCopy.fallbackLink}</a>
			</p>
		{:else}
			<div class="ng__grid">
				<dl class="ng__stats">
					<div class="ng__stat" style="--tone: var(--n-yellow)">
						<dt>TOTAL</dt>
						<dd><b>{stats.total}</b> kontribusi</dd>
					</div>
					<div class="ng__stat" style="--tone: var(--n-mint)">
						<dt>STREAK</dt>
						<dd><b>{stats.currentStreak}</b> hari berturut-turut</dd>
					</div>
					<div class="ng__stat" style="--tone: var(--n-pink)">
						<dt>COMMIT</dt>
						<dd><b>{stats.commits}</b> commit</dd>
					</div>
					<div class="ng__stat" style="--tone: var(--n-lilac)">
						<dt>REPO</dt>
						<dd><b>{stats.repos}</b> repo publik</dd>
					</div>
				</dl>

				<div class="ng__panel">
					<div class="ng__bar">
						<span class="ng__meta" title="{stats.stars} bintang">★ {stats.stars}</span>
						<span class="ng__meta" title="{stats.followers} followers">● {stats.followers}</span>
						<div class="ng__years" role="group" aria-label="Filter tahun">
							<button
								type="button"
								class:is-active={yearFilter === 'trailing'}
								onclick={() => applyYear('trailing')}>12 BULAN</button
							>
							{#each years as y}
								<button type="button" class:is-active={yearFilter === y} onclick={() => applyYear(y)}
									>{y}</button
								>
							{/each}
						</div>
					</div>

					<div class="ng__monthly">
						{#each monthly as m}
							<div class="ng__mcol" title="{m.label} · {m.count} kontribusi">
								<div class="ng__mtrack"><span style="height: {m.pct}%"></span></div>
								<span class="ng__mlabel">{m.label}</span>
							</div>
						{/each}
					</div>

					<div class="ng__scroll">
						{#if loading}<p class="ng__loading">LOADING_</p>{/if}
						<div class="ng__heat">
							{#each weeks as week}
								<div class="ng__hcol">
									{#each week as day}
										<span
											class="ng__cell ng__cell--{levelFor(day.count)}"
											title="{day.count} kontribusi · {formatDate(day.date)}"
										></span>
									{/each}
								</div>
							{/each}
						</div>
					</div>
					<div class="ng__legend" aria-hidden="true">
						<span>Less</span>
						{#each [0, 1, 2, 3, 4] as l}<i class="ng__cell ng__cell--{l}"></i>{/each}
						<span>More</span>
					</div>
				</div>
			</div>

			<a class="ng__link" href={SITE.github} target="_blank" rel="noopener noreferrer">
				{githubCopy.profile}
			</a>
		{/if}
	</div>
</section>

<style>
	.ng {
		background: var(--n-lilac);
		border-bottom: var(--n-border) solid var(--n-ink);
		padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
	}
	.ng__wrap {
		max-width: 78rem;
		margin: 0 auto;
	}
	.ng__head {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.9rem;
		margin-bottom: clamp(2rem, 5vw, 3.5rem);
	}
	.ng__eyebrow {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
	}
	.ng__title {
		margin: 0;
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(2.8rem, 10vw, 8rem);
		line-height: 0.92;
		text-transform: uppercase;
	}
	.ng__title span {
		display: block;
	}
	.ng__title span:last-child {
		color: #fff;
		-webkit-text-stroke: 3px var(--n-ink);
		paint-order: stroke fill;
		text-shadow: 0.05em 0.05em 0 var(--n-ink);
	}
	.ng__title i {
		font-style: normal;
	}
	.ng__fallback {
		margin: 0;
		display: inline-block;
		max-width: 34rem;
		background: var(--n-paper);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		padding: 1rem 1.2rem;
		font-weight: 500;
		line-height: 1.5;
	}
	.ng__fallback a {
		text-decoration: underline;
		text-underline-offset: 3px;
		font-weight: 700;
	}
	.ng__grid {
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
		gap: clamp(1.25rem, 3vw, 2.25rem);
		align-items: start;
	}
	.ng__stats {
		margin: 0;
		display: grid;
		gap: 0.9rem;
	}
	.ng__stat {
		background: var(--tone);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 5px 5px 0 var(--n-ink);
		padding: 0.7rem 1rem 0.8rem;
	}
	.ng__stat dt {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.72rem;
		letter-spacing: 0.1em;
	}
	.ng__stat dd {
		margin: 0.2rem 0 0;
		font-weight: 600;
	}
	.ng__stat b {
		font-family: 'Archivo Black', sans-serif;
		font-weight: 400;
		font-size: clamp(1.7rem, 3.4vw, 2.4rem);
		margin-right: 0.3rem;
	}
	.ng__panel {
		background: var(--n-paper);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: var(--n-shadow);
		padding: clamp(0.9rem, 2vw, 1.4rem);
		min-width: 0;
	}
	.ng__bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1rem;
	}
	.ng__meta {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.8rem;
		border: 2px solid var(--n-ink);
		background: #fff;
		padding: 0.2rem 0.5rem;
	}
	.ng__years {
		margin-left: auto;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
	.ng__years button {
		font-family: var(--ff-mono);
		font-weight: 500;
		font-size: 0.75rem;
		color: var(--n-ink);
		background: #fff;
		border: 2px solid var(--n-ink);
		padding: 0.25rem 0.55rem;
		cursor: pointer;
	}
	.ng__years button:hover {
		background: var(--n-yellow);
	}
	.ng__years button.is-active {
		background: var(--n-blue);
		color: #fff;
	}
	.ng__monthly {
		display: flex;
		gap: 0.35rem;
		height: 7.5rem;
		margin-bottom: 1rem;
	}
	.ng__mcol {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.ng__mtrack {
		flex: 1;
		display: flex;
		align-items: flex-end;
		border-bottom: 3px solid var(--n-ink);
	}
	.ng__mtrack span {
		display: block;
		width: 100%;
		background: var(--n-pink);
		border: 2px solid var(--n-ink);
		border-bottom: 0;
	}
	.ng__mlabel {
		font-family: var(--ff-mono);
		font-size: 0.6rem;
		text-align: center;
	}
	.ng__scroll {
		overflow-x: auto;
		padding-bottom: 0.4rem;
	}
	.ng__loading {
		margin: 0;
		font-family: var(--ff-mono);
	}
	.ng__heat {
		display: flex;
		gap: 3px;
		width: max-content;
	}
	.ng__hcol {
		display: grid;
		grid-template-rows: repeat(7, 12px);
		gap: 3px;
	}
	.ng__cell {
		display: block;
		width: 12px;
		height: 12px;
		border: 1px solid var(--n-ink);
		background: #fff;
	}
	.ng__cell--1 {
		background: #cfe0ff;
	}
	.ng__cell--2 {
		background: #8fb2ff;
	}
	.ng__cell--3 {
		background: var(--n-blue);
	}
	.ng__cell--4 {
		background: var(--n-ink);
	}
	.ng__legend {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-top: 0.7rem;
		font-family: var(--ff-mono);
		font-size: 0.7rem;
	}
	.ng__legend i {
		display: block;
	}
	.ng__link {
		display: inline-block;
		margin-top: clamp(1.5rem, 3vw, 2rem);
		font-family: 'Archivo Black', sans-serif;
		color: var(--n-ink);
		background: var(--n-yellow);
		border: var(--n-border) solid var(--n-ink);
		box-shadow: 5px 5px 0 var(--n-ink);
		padding: 0.7rem 1.1rem;
		transition:
			transform 0.1s steps(2),
			box-shadow 0.1s steps(2);
	}
	.ng__link:hover {
		transform: translate(-3px, -3px);
		box-shadow: 8px 8px 0 var(--n-ink);
	}
	.ng__link:active {
		transform: translate(3px, 3px);
		box-shadow: 1px 1px 0 var(--n-ink);
	}

	@media (max-width: 900px) {
		.ng__grid {
			grid-template-columns: 1fr;
		}
		.ng__stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.ng__years {
			margin-left: 0;
		}
	}
</style>
