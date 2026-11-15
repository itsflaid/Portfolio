<script lang="ts">
	import { paymentNotes, services } from '$lib/data/layanan';
	import ContactLink from '../ContactLink.svelte';
</script>

<section class="lay jz-section" id="layanan" aria-labelledby="layanan-title">
	<div class="jz-wrap">
		<header class="lay__head">
			<h2 class="lay__title jz-title" id="layanan-title">
				Seperti nota warung: jelas apa yang kamu bayar.
			</h2>
			<p class="lay__lede">
				Tiga jenis layanan, dengan harga yang kamu lihat sebelum bicara apa pun.
			</p>
		</header>

		<div class="paper-wrap">
			<div class="paper">
				<div class="paper__head">
					<p class="paper__title">Nota jasa</p>
					<p class="paper__sub">Flaid, website dan aplikasi web</p>
				</div>

				<ul class="lines">
					{#each services as s (s.name)}
						<li class="line">
							<div class="line__row">
								<span class="line__name">{s.name}</span>
								<span class="line__dots" aria-hidden="true"></span>
								<span class="line__price">{s.priceNote}</span>
							</div>

							<p class="line__outcome">{s.outcome}</p>

							<ul class="line__items">
								{#each s.items as it}
									<li>{it}</li>
								{/each}
							</ul>

							<div class="line__foot">
								<p class="line__shift">Bergeser menurut {s.shifts.join(', ')}.</p>
								<ContactLink size="sm" message={s.message} />
							</div>
						</li>
					{/each}
				</ul>

				<dl class="pay">
					{#each paymentNotes as [k, v]}
						<div class="line__row">
							<dt>{k}</dt>
							<span class="line__dots" aria-hidden="true"></span>
							<dd>{v}</dd>
						</div>
					{/each}
				</dl>
			</div>
		</div>
	</div>
</section>

<style>
	.lay {
		background: var(--jz-night);
		color: var(--jz-night-text);
	}
	.lay__head {
		display: grid;
		gap: 1rem;
		justify-items: center;
		max-width: 44rem;
		margin: 0 auto clamp(2.5rem, 5vw, 4rem);
		text-align: center;
	}
	.lay__title {
		color: #fff;
	}
	.lay__lede {
		max-width: 32rem;
		font-size: clamp(1.0625rem, 1.6vw, 1.2rem);
		line-height: 1.5;
		color: var(--jz-night-muted);
	}

	.paper-wrap {
		width: min(100%, 40rem);
		margin-inline: auto;
		filter: drop-shadow(0 30px 40px rgba(0, 0, 0, 0.5));
	}
	.paper {
		--tooth: 14px;
		padding: clamp(1.75rem, 4vw, 2.75rem) clamp(1.25rem, 4vw, 2.75rem) clamp(2.5rem, 5vw, 3.5rem);
		background: var(--jz-paper);
		color: var(--jz-text);
		font-family: var(--jz-mono);
		font-size: 0.875rem;
		line-height: 1.55;
		mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / var(--tooth)
			100%;
	}

	.paper__head {
		display: grid;
		gap: 0.15rem;
		padding-bottom: 1.25rem;
		border-bottom: 1.5px dashed var(--jz-rule-strong);
	}
	.paper__title {
		font-size: 1.25rem;
		font-weight: 500;
		color: var(--jz-ink);
	}
	.paper__sub {
		color: var(--jz-muted);
	}

	.lines {
		display: grid;
	}
	.line {
		display: grid;
		gap: 0.75rem;
		padding-block: 1.5rem;
		border-bottom: 1.5px dashed var(--jz-rule-strong);
	}
	.line__row {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
	}
	.line__name {
		font-size: 1rem;
		font-weight: 500;
		color: var(--jz-ink);
	}
	.line__dots {
		flex: 1 1 1rem;
		min-width: 1rem;
		border-bottom: 2px dotted var(--jz-rule-strong);
		transform: translateY(-0.25em);
	}
	.line__price {
		font-weight: 500;
		color: var(--jz-ink);
		white-space: nowrap;
	}
	.line__outcome {
		color: var(--jz-text);
	}
	.line__items {
		display: grid;
		gap: 0.2rem;
		color: var(--jz-muted);
	}
	.line__items li {
		padding-left: 1.25rem;
		text-indent: -1.25rem;
	}
	.line__items li::before {
		content: '- ';
		display: inline-block;
		width: 1.25rem;
		text-indent: 0;
	}
	.line__foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem 1.5rem;
		margin-top: 0.25rem;
	}
	.line__shift {
		flex: 1 1 14rem;
		font-size: 0.8125rem;
		color: var(--jz-muted);
	}

	.pay {
		display: grid;
		gap: 0.35rem;
		padding-top: 1.5rem;
		color: var(--jz-muted);
	}
	.pay dt,
	.pay dd {
		margin: 0;
	}
	.pay dd {
		color: var(--jz-ink);
		text-align: right;
	}
</style>
