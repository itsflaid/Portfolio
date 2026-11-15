<script lang="ts">
	import { services } from '$lib/data/layanan';
	import ContactLink from '../ContactLink.svelte';

	let open = $state(0);
</script>

<section class="lay jz-section" id="layanan" aria-labelledby="layanan-title">
	<div class="jz-wrap">
		<header class="lay__head">
			<h2 class="jz-title" id="layanan-title">Mulai dari ukuran usahamu.</h2>
			<p class="jz-lede">
				Pilih jenis kebutuhannya, harganya sudah kelihatan dari awal. Rinciannya kita pastikan
				lewat chat.
			</p>
		</header>

		<ul class="rows">
			{#each services as s, i (s.name)}
				<li class="row" class:row--open={open === i}>
					<button
						class="row__bar"
						type="button"
						aria-expanded={open === i}
						aria-controls="lay-a-{i}"
						onclick={() => (open = open === i ? -1 : i)}
					>
						<span class="row__name">{s.name}</span>
						<span class="row__price">{s.priceNote}</span>
						<span class="row__icon" aria-hidden="true"></span>
					</button>

					<div class="row__panel" id="lay-a-{i}" inert={open !== i}>
						<div class="row__inner">
							<div class="row__body">
								<div class="col col--lead">
									<p class="row__outcome">{s.outcome}</p>
									<p class="row__for">{s.for}</p>
									<ContactLink message={s.message} />
								</div>

								<div class="col">
									<dl class="specs">
										{#each s.specs as [k, v]}
											<div>
												<dt>{k}</dt>
												<dd>{v}</dd>
											</div>
										{/each}
									</dl>
									<ul class="items">
										{#each s.items as item}
											<li>{item}</li>
										{/each}
									</ul>
								</div>

								<div class="col">
									<p class="shift-title">Harga bergeser karena</p>
									<ul class="shifts">
										{#each s.shifts as shift}
											<li>{shift}</li>
										{/each}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.lay__head {
		display: grid;
		gap: 1rem;
		max-width: 44rem;
		margin-bottom: clamp(2.5rem, 5vw, 4rem);
	}

	.rows {
		border-top: 2px solid var(--jz-ink);
	}
	.row {
		border-bottom: 1px solid var(--jz-rule-strong);
	}
	.row__bar {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto 2.25rem;
		align-items: center;
		gap: 1.5rem;
		width: 100%;
		padding: clamp(1.1rem, 2.4vw, 1.9rem) 0;
		border: 0;
		background: none;
		color: var(--jz-muted);
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition: color 200ms ease;
	}
	.row__bar:hover,
	.row--open .row__bar {
		color: var(--jz-ink);
	}
	.row__name {
		font-size: clamp(2rem, 6.2vw, 5.4rem);
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.055em;
	}
	.row__price {
		font-size: clamp(1rem, 1.5vw, 1.25rem);
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--jz-text);
		white-space: nowrap;
	}
	.row__icon {
		position: relative;
		width: 1.5rem;
		height: 1.5rem;
		justify-self: end;
	}
	.row__icon::before,
	.row__icon::after {
		content: '';
		position: absolute;
		inset: 50% 0 auto 0;
		height: 2px;
		margin-top: -1px;
		background: currentColor;
		transition: rotate 250ms var(--jz-ease);
	}
	.row__icon::after {
		rotate: 90deg;
	}
	.row--open .row__icon::after {
		rotate: 0deg;
	}

	.row__panel {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 380ms var(--jz-ease);
	}
	.row--open .row__panel {
		grid-template-rows: 1fr;
	}
	.row__inner {
		min-height: 0;
		overflow: hidden;
	}
	.row__body {
		display: grid;
		gap: 2.25rem;
		padding-bottom: clamp(2rem, 4vw, 3rem);
	}
	@media (min-width: 60rem) {
		.row__body {
			grid-template-columns: 1.15fr 1fr 0.85fr;
			gap: clamp(2rem, 4vw, 4rem);
		}
	}
	.col {
		display: grid;
		align-content: start;
		gap: 1.25rem;
	}
	.col--lead :global(.jz-btn) {
		justify-self: start;
		margin-top: 0.5rem;
	}
	.row__outcome {
		font-size: clamp(1.3rem, 2vw, 1.65rem);
		font-weight: 600;
		line-height: 1.25;
		letter-spacing: -0.03em;
		color: var(--jz-ink);
	}
	.row__for {
		color: var(--jz-muted);
	}

	.specs {
		border-block: 1px solid var(--jz-rule);
	}
	.specs div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 0.55rem;
		font-size: 0.9rem;
	}
	.specs div + div {
		border-top: 1px solid var(--jz-rule);
	}
	.specs dt {
		color: var(--jz-muted);
	}
	.specs dd {
		text-align: right;
		font-weight: 500;
	}
	.items {
		display: grid;
		gap: 0.55rem;
	}
	.items li,
	.shifts li {
		position: relative;
		padding-left: 1.25rem;
		font-size: 0.95rem;
		line-height: 1.5;
	}
	.items li::before,
	.shifts li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.62em;
		width: 0.4rem;
		height: 0.4rem;
		background: var(--jz-ink);
	}
	.shift-title {
		font-weight: 600;
		color: var(--jz-ink);
	}
	.shifts {
		display: grid;
		gap: 0.55rem;
		color: var(--jz-muted);
	}
	.shifts li::before {
		background: var(--jz-rule-strong);
	}

	@media (max-width: 40rem) {
		.row__bar {
			grid-template-columns: minmax(0, 1fr) 2rem;
			row-gap: 0.5rem;
		}
		.row__price {
			grid-column: 1;
			grid-row: 2;
		}
		.row__icon {
			grid-column: 2;
			grid-row: 1;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.row__panel,
		.row__icon::before,
		.row__icon::after {
			transition: none;
		}
	}
</style>
