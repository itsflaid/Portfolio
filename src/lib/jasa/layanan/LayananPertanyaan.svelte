<script lang="ts">
	import { planAnchor } from '$lib/data/jasa';
	import { services } from '$lib/data/layanan';
</script>

<section class="lay jz-section" id="layanan" aria-labelledby="layanan-title">
	<div class="jz-wrap split">
		<header class="side">
			<h2 class="side__title jz-title" id="layanan-title">Usahamu butuh yang mana?</h2>
			<p class="jz-lede">
				Mulai dari masalah yang kamu rasakan, bukan dari daftar fitur. Jawabannya ada tiga, dan
				harganya jelas sejak awal.
			</p>
			<p class="side__note">
				Setelah kita bicara, kamu menerima estimasi tertulis sebelum pengerjaan dimulai.
			</p>
		</header>

		<ul class="list">
			{#each services as s (s.name)}
				<li class="item">
					<h3 class="item__q">{s.question}</h3>

					<div class="item__a">
						<div class="item__top">
							<p class="item__name">{s.name}</p>
							<p class="item__price">{s.priceNote}</p>
						</div>

						<p class="item__outcome">{s.outcome}</p>

						<ul class="item__list">
							{#each s.items as it}
								<li>{it}</li>
							{/each}
						</ul>

						<p class="item__shift">Harga bergeser menurut {s.shifts.join(', ')}.</p>

						<a class="jz-btn" href={`#${planAnchor(s.name)}`}>Lihat paket dan harga</a>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.split {
		display: grid;
		gap: clamp(2.5rem, 6vw, 4rem);
	}
	@media (min-width: 64rem) {
		.split {
			grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
			gap: clamp(3rem, 6vw, 6rem);
			align-items: start;
		}
	}

	.side {
		display: grid;
		gap: 1.25rem;
		align-content: start;
	}
	@media (min-width: 64rem) {
		.side {
			position: sticky;
			top: calc(var(--jz-header) + 2.5rem);
		}
	}
	.side__title {
		font-size: clamp(2.3rem, 4.4vw, 4rem);
	}
	.side__note {
		padding-top: 1.25rem;
		border-top: 1px solid var(--jz-rule-strong);
		max-width: 28rem;
		font-size: 0.95rem;
		color: var(--jz-muted);
	}

	.item {
		display: grid;
		gap: 1.5rem;
		padding: clamp(1.5rem, 3vw, 2.25rem) 0 clamp(2.25rem, 4vw, 3.25rem);
		border-top: 2px solid var(--jz-ink);
	}
	.item:last-child {
		border-bottom: 1px solid var(--jz-rule-strong);
	}
	.item__q {
		font-size: clamp(1.7rem, 3.2vw, 2.7rem);
		line-height: 1.05;
		letter-spacing: -0.045em;
	}
	.item__a {
		display: grid;
		gap: 1.1rem;
	}
	.item__a > :not(.item__top) {
		max-width: 38rem;
	}
	.item__top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.25rem 1.5rem;
	}
	.item__name {
		font-size: 1.15rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--jz-ink);
	}
	.item__price {
		font-weight: 500;
		color: var(--jz-ink);
		white-space: nowrap;
	}
	.item__outcome {
		font-size: 1.1rem;
		line-height: 1.5;
	}
	.item__list {
		display: grid;
		gap: 0.5rem 2rem;
	}
	@media (min-width: 48rem) {
		.item__list {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.item__list li {
		position: relative;
		padding-left: 1.25rem;
		font-size: 0.92rem;
		line-height: 1.45;
	}
	.item__list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.58em;
		width: 0.4rem;
		height: 0.4rem;
		background: var(--jz-ink);
	}
	.item__shift {
		font-size: 0.9rem;
		color: var(--jz-muted);
	}
	.item__a :global(.jz-btn) {
		justify-self: start;
		margin-top: 0.4rem;
	}
</style>
