<script lang="ts">
	import { reveal } from './reveal';
</script>

<section class="about jz-section jz-wrap" id="tentang" aria-labelledby="tentang-title">
	<div class="jz-head" use:reveal>
		<h2 class="jz-title" id="tentang-title">Kenalan dengan orang di balik Flaid.</h2>
		<p class="jz-lede">
			Mahasiswa Sistem Informasi di Samarinda yang membangun aplikasi untuk masalah sehari-hari
			usaha kecil.
		</p>
	</div>

	<div class="bento">
		<article class="tile tile--photo" use:reveal>
			<img
				class="tile__bg"
				src="/jasa/about/kegiatan.webp"
				alt="Foto bersama banyak orang di sebuah acara"
				width="1400"
				height="700"
				loading="lazy"
			/>
			<h3>Terbiasa bekerja dengan cepat</h3>
			<p>
				Terbiasa berkolaborasi dan bekerja dengan tenggat, jadi proyekmu berjalan tertib dari awal
				sampai jadi.
			</p>
		</article>

		<article class="tile tile--sand" use:reveal={80}>
			<h3>Langsung dengan pembuatnya</h3>
			<p>Konsultasi lewat WhatsApp langsung dengan saya, tanpa perantara.</p>
		</article>

		<article class="tile tile--taupe" use:reveal={120}>
			<h3>Mahasiswa Sistem Informasi</h3>
			<p>Kuliah di UINSI Samarinda, terbiasa memetakan cara kerja usaha ke dalam sistem.</p>
		</article>

		<article class="tile tile--olive" use:reveal={160}>
			<div class="tile__txt">
				<h3>Satu orang, dari awal sampai jalan</h3>
				<p>Desain, kode, sampai peluncuran dikerjakan sendiri oleh saya, Fadil.</p>
			</div>
			<img
				class="tile__cut"
				src="/jasa/about/fadil-cutout.webp"
				alt="Fadil"
				width="514"
				height="720"
				loading="lazy"
			/>
		</article>
	</div>
</section>

<style>
	.bento {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: clamp(0.65rem, 1.3vw, 1rem);
		margin-top: clamp(2rem, 5vw, 4rem);
	}
	.tile {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		grid-column: span 3;
		min-height: clamp(14.5rem, 27vw, 24rem);
		padding: clamp(1.1rem, 2.2vw, 1.9rem);
		overflow: hidden;
		border-radius: clamp(0.9rem, 1.6vw, 1.4rem);
	}
	.tile--photo,
	.tile--olive {
		grid-column: span 5;
	}
	.tile h3 {
		position: relative;
		z-index: 1;
		margin-bottom: 0.4rem;
		font-size: clamp(1.1rem, 2vw, 1.55rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		text-wrap: balance;
	}
	.tile p {
		position: relative;
		z-index: 1;
		max-width: 36ch;
		font-size: clamp(0.8rem, 1.15vw, 0.9rem);
		line-height: 1.55;
	}

	.tile--photo h3,
	.tile--photo p,
	.tile--olive h3,
	.tile--olive p {
		color: #fff8ed;
	}
	.tile__bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 55%;
	}
	.tile--photo::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(24, 16, 6, 0.74), rgba(24, 16, 6, 0) 58%);
	}
	.tile--sand {
		background: var(--jz-wash);
	}
	.tile--sand p {
		color: var(--jz-muted);
	}
	.tile--taupe {
		background: var(--jz-taupe);
	}
	.tile--taupe h3 {
		color: #241d12;
	}
	.tile--taupe p {
		color: #3d3324;
	}
	.tile--olive {
		background: var(--jz-olive);
	}
	.tile--olive p {
		opacity: 0.9;
	}
	.tile__txt {
		position: relative;
		z-index: 1;
		max-width: 50%;
	}
	.tile__cut {
		position: absolute;
		right: 4%;
		bottom: 0;
		height: 96%;
		width: auto;
		pointer-events: none;
	}

	/* mobile: bento 2 kolom, kartu olive berdiri tinggi di kiri */
	@media (max-width: 47.99rem) {
		.bento {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 220px 172px 172px;
			gap: 0.65rem;
		}
		.tile {
			grid-column: auto;
			min-height: 0;
			padding: 1rem;
			border-radius: 1.1rem;
		}
		.tile h3 {
			font-size: 1rem;
			line-height: 1.2;
		}
		.tile p {
			font-size: 0.75rem;
			line-height: 1.45;
		}
		.tile--photo {
			grid-column: 1 / -1;
		}
		.tile--olive {
			grid-column: 1;
			grid-row: 2 / 4;
			justify-content: flex-start;
		}
		.tile__txt {
			max-width: 100%;
		}
		.tile__cut {
			right: auto;
			left: 50%;
			transform: translateX(-50%);
			height: 54%;
		}
		.tile--sand {
			grid-column: 2;
			grid-row: 2;
		}
		.tile--taupe {
			grid-column: 2;
			grid-row: 3;
		}
	}
</style>
