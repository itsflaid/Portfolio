<script lang="ts">
	import { services } from '$lib/data/layanan';
	import ContactLink from '../ContactLink.svelte';
</script>

<section class="lay jz-section" id="layanan" aria-labelledby="layanan-title">
	<div class="jz-wrap">
		<header class="lay__head">
			<h2 class="jz-title" id="layanan-title">Dari website sederhana sampai sistem sendiri.</h2>
			<p class="jz-lede">
				Tiga tingkat kebutuhan. Makin luas yang dibangun, makin tinggi anak tangganya, dan harganya
				mengikuti.
			</p>
		</header>

		<ol class="stairs">
			{#each services as s, i (s.name)}
				<li class="stair stair--{i + 1}">
					<div class="stair__art" aria-hidden="true">
						{#if i === 0}
							<svg viewBox="0 0 200 112" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="1" y="1" width="198" height="110" rx="8" />
								<path d="M1 18h198" />
								<circle cx="11" cy="9.5" r="2" fill="currentColor" stroke="none" />
								<circle cx="19" cy="9.5" r="2" fill="currentColor" stroke="none" />
								<circle cx="27" cy="9.5" r="2" fill="currentColor" stroke="none" />
								<rect x="14" y="30" width="92" height="9" rx="2" fill="currentColor" stroke="none" />
								<rect x="14" y="45" width="68" height="5" rx="2" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="14" y="55" width="52" height="5" rx="2" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="124" y="30" width="62" height="46" rx="4" />
								<rect x="14" y="86" width="42" height="14" rx="7" fill="currentColor" stroke="none" />
							</svg>
						{:else if i === 1}
							<svg viewBox="0 0 200 152" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="1" y="1" width="198" height="150" rx="8" />
								<path d="M1 18h198M58 18v132" />
								<circle cx="11" cy="9.5" r="2" fill="currentColor" stroke="none" />
								<circle cx="19" cy="9.5" r="2" fill="currentColor" stroke="none" />
								<circle cx="27" cy="9.5" r="2" fill="currentColor" stroke="none" />
								<rect x="10" y="30" width="38" height="6" rx="2" fill="currentColor" stroke="none" />
								<rect x="10" y="44" width="38" height="6" rx="2" fill="currentColor" stroke="none" opacity=".35" />
								<rect x="10" y="58" width="38" height="6" rx="2" fill="currentColor" stroke="none" opacity=".35" />
								<rect x="70" y="28" width="66" height="9" rx="2" fill="currentColor" stroke="none" />
								<rect x="70" y="48" width="120" height="16" rx="3" />
								<rect x="70" y="70" width="120" height="16" rx="3" />
								<rect x="70" y="92" width="120" height="16" rx="3" />
								<rect x="76" y="54" width="34" height="5" rx="2" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="76" y="76" width="44" height="5" rx="2" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="76" y="98" width="28" height="5" rx="2" fill="currentColor" stroke="none" opacity=".4" />
								<circle cx="180" cy="56" r="3" fill="currentColor" stroke="none" />
								<circle cx="180" cy="78" r="3" fill="currentColor" stroke="none" />
								<circle cx="180" cy="100" r="3" fill="currentColor" stroke="none" />
								<rect x="70" y="120" width="46" height="16" rx="8" fill="currentColor" stroke="none" />
							</svg>
						{:else}
							<svg viewBox="0 0 200 192" fill="none" stroke="currentColor" stroke-width="1.5">
								<rect x="1" y="1" width="198" height="190" rx="8" />
								<path d="M1 18h198" />
								<circle cx="11" cy="9.5" r="2" fill="currentColor" stroke="none" />
								<circle cx="19" cy="9.5" r="2" fill="currentColor" stroke="none" />
								<circle cx="27" cy="9.5" r="2" fill="currentColor" stroke="none" />
								<circle cx="170" cy="9.5" r="3.5" />
								<circle cx="182" cy="9.5" r="3.5" fill="currentColor" stroke="none" />
								<rect x="10" y="28" width="56" height="28" rx="4" />
								<rect x="72" y="28" width="56" height="28" rx="4" />
								<rect x="134" y="28" width="56" height="28" rx="4" />
								<rect x="16" y="36" width="22" height="5" rx="2" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="78" y="36" width="22" height="5" rx="2" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="140" y="36" width="22" height="5" rx="2" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="16" y="45" width="30" height="7" rx="2" fill="currentColor" stroke="none" />
								<rect x="78" y="45" width="30" height="7" rx="2" fill="currentColor" stroke="none" />
								<rect x="140" y="45" width="30" height="7" rx="2" fill="currentColor" stroke="none" />
								<rect x="10" y="66" width="118" height="70" rx="4" />
								<rect x="20" y="108" width="12" height="20" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="38" y="98" width="12" height="30" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="56" y="104" width="12" height="24" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="74" y="88" width="12" height="40" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="92" y="78" width="12" height="50" fill="currentColor" stroke="none" />
								<rect x="110" y="94" width="12" height="34" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="134" y="66" width="56" height="70" rx="4" />
								<circle cx="146" cy="82" r="4" />
								<rect x="154" y="80" width="28" height="4" rx="2" fill="currentColor" stroke="none" opacity=".4" />
								<circle cx="146" cy="98" r="4" fill="currentColor" stroke="none" />
								<rect x="154" y="96" width="24" height="4" rx="2" fill="currentColor" stroke="none" opacity=".4" />
								<circle cx="146" cy="114" r="4" />
								<rect x="154" y="112" width="28" height="4" rx="2" fill="currentColor" stroke="none" opacity=".4" />
								<rect x="10" y="146" width="180" height="12" rx="3" />
								<rect x="10" y="164" width="180" height="12" rx="3" />
							</svg>
						{/if}
					</div>

					<div class="stair__price">
						{#if s.lead}<span class="stair__lead">{s.lead}</span>{/if}
						<span class="stair__amount">{s.amount}</span>
					</div>

					<h3 class="stair__name">{s.name}</h3>
					<p class="stair__outcome">{s.outcome}</p>

					<ul class="stair__items">
						{#each s.items as item}
							<li>{item}</li>
						{/each}
					</ul>

					<p class="stair__shift">Harga bergeser menurut {s.shifts.join(', ')}.</p>

					<ContactLink message={s.message} tone={i === 2 ? 'light' : 'solid'} />
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.lay__head {
		display: grid;
		gap: 1rem;
		max-width: 44rem;
		margin-bottom: clamp(2.5rem, 5vw, 4rem);
	}

	.stairs {
		display: grid;
		gap: 0.75rem;
		align-items: end;
	}
	@media (min-width: 62rem) {
		.stairs {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.stair {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: clamp(1.5rem, 3vw, 2.25rem);
		border-radius: var(--jz-radius-lg);
		border: 1px solid var(--jz-rule-strong);
		background: var(--jz-surface);
	}
	.stair--2 {
		background: var(--jz-wash);
	}
	.stair--3 {
		border-color: var(--jz-night);
		background: var(--jz-night);
		color: var(--jz-night-text);
	}
	.stair--3 :is(.stair__name, .stair__amount) {
		color: #fff;
	}

	.stair__art {
		height: var(--art-h);
		margin-bottom: 0.75rem;
		color: var(--jz-ink);
	}
	.stair--1 {
		--art-h: 6.5rem;
	}
	.stair--2 {
		--art-h: 11rem;
	}
	.stair--3 {
		--art-h: 15.5rem;
	}
	@media (max-width: 61.99rem) {
		.stair--1 {
			--art-h: 7rem;
		}
		.stair--2 {
			--art-h: 9rem;
		}
		.stair--3 {
			--art-h: 11rem;
		}
	}
	.stair--3 .stair__art {
		color: #fff;
	}
	.stair__art svg {
		display: block;
		width: auto;
		height: 100%;
	}

	.stair__price {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.2rem 0.6rem;
	}
	.stair__lead {
		font-size: 0.95rem;
		color: var(--jz-muted);
	}
	.stair--3 .stair__lead {
		color: var(--jz-night-muted);
	}
	.stair__amount {
		font-size: clamp(1.9rem, 3.2vw, 2.6rem);
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.05em;
		color: var(--jz-ink);
		white-space: nowrap;
	}
	.stair__name {
		font-size: 1.35rem;
		letter-spacing: -0.03em;
	}
	.stair__outcome {
		color: var(--jz-text);
	}
	.stair--3 .stair__outcome {
		color: var(--jz-night-text);
	}

	.stair__items {
		display: grid;
		gap: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid currentColor;
		border-color: color-mix(in srgb, currentColor 20%, transparent);
	}
	.stair__items li {
		position: relative;
		padding-left: 1.25rem;
		font-size: 0.92rem;
		line-height: 1.45;
	}
	.stair__items li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.58em;
		width: 0.4rem;
		height: 0.4rem;
		background: currentColor;
	}
	.stair__shift {
		margin-top: auto;
		font-size: 0.875rem;
		line-height: 1.5;
		color: var(--jz-muted);
	}
	.stair--3 .stair__shift {
		color: var(--jz-night-muted);
	}
	.stair :global(.jz-btn) {
		justify-self: stretch;
	}
</style>
