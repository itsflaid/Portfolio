// demoUrl dan repoUrl sama dengan entri katalyst di data/project.ts
export const katalyst = {
	path: '/jasa/studi-kasus/katalyst',
	name: 'Katalyst',
	kicker: 'Studi kasus · Proyek lomba OASE PTKIN III 2026',
	title: 'Tahu untung sebenarnya, bukan cuma omzet.',
	lede: 'Katalyst adalah aplikasi web pendukung keputusan untuk UMKM: catat penjualan, lihat untung-rugi yang sebenarnya, dan uji harga sebelum diterapkan.',
	demoUrl: 'https://katalyst-6pk.pages.dev/',
	repoUrl: 'https://github.com/itsflaid/katalyst',
	video: '/preview/video/katalyst.mp4',
	poster: '/preview/image/katalyst.webp',

	teaserLede:
		'Katalyst dibangun untuk lomba OASE PTKIN III 2026 dan diuji dengan data satu mitra UMKM. Pemilik usaha melihat untung dan margin, lalu menguji harga sebelum diterapkan.',
	teaserPoints: [
		'Dashboard untung, margin, dan tren 30 hari',
		'Simulator harga dengan titik impas',
		'Copilot yang menjelaskan angka, bukan mengarangnya'
	],

	story: [
		{
			title: 'Masalah',
			text: 'Banyak UMKM mencatat transaksi di Excel atau buku. Catatan itu tidak otomatis menunjukkan produk mana yang berkinerja baik, atau apa yang terjadi kalau harga diubah. Di mitra UMKM Katalyst, data usaha belum dianalisis rutin, dan ruang menaikkan harga produk inti seperti beras sangat terbatas.'
		},
		{
			title: 'Solusi',
			text: 'Katalyst menyatukan analitik transaksi, Copilot, dan simulator what-if dalam satu sistem. Staf mencatat penjualan, pemilik meninjau pendapatan, biaya, laba, dan margin per periode.'
		},
		{
			title: 'Yang bisa dilakukan pemilik',
			text: 'Membandingkan kinerja produk, membaca tren, dan menguji skenario harga dengan angka dari transaksi sendiri. Keputusan tetap di tangan pemilik.'
		}
	],

	features: [
		{
			title: 'Dashboard pemilik',
			text: 'Pendapatan, transaksi, laba, dan margin, plus tren 30 hari dibanding 30 hari sebelumnya, lima produk teratas, dan insight otomatis seperti produk laris tapi margin tipis.'
		},
		{
			title: 'Simulator what-if',
			text: 'Geser harga jual, diskon, modal, dan volume. Dampaknya ke pendapatan, laba, margin, titik impas, dan diskon maksimum langsung terlihat.'
		},
		{
			title: 'Copilot',
			text: 'Tanya jawab soal performa usaha. Jawabannya bersumber dari angka yang sama dengan dashboard.'
		},
		{
			title: 'Peran pemilik dan staf',
			text: 'Staf mencatat penjualan. Pemilik mengelola produk, stok, diskon, dan laporan. Hak akses keduanya dipisah.'
		}
	],

	versions: [
		{
			badge: 'Data dummy',
			title: 'Versi demo',
			text: 'Bisa dicoba siapa saja untuk melihat alur dan tampilannya. Semua angka di dalamnya contoh.'
		},
		{
			badge: 'Data mitra UMKM',
			title: 'Versi mitra',
			text: 'Dipakai dengan data transaksi satu mitra UMKM untuk menguji sistem pada kondisi sebenarnya. Tidak dibuka untuk umum demi menjaga data mitra.'
		}
	],

	trust: [
		{
			title: 'Rumus pasti, bukan tebakan AI',
			text: 'Omzet, modal, untung, dan margin dihitung dari data transaksi dengan rumus yang sama setiap kali. AI hanya membantu menjelaskan, tidak ikut menentukan angka.'
		},
		{
			title: 'Simulasi tidak mengubah data',
			text: 'Simulator menampilkan asumsi yang dipakai dan tidak mengubah transaksi yang sudah tercatat.'
		},
		{
			title: 'Dirawat seperti produk sungguhan',
			text: 'Ada tes otomatis, batas pemakaian Copilot per hari, dan perbaikan dari hasil audit.'
		}
	],

	stack: ['SvelteKit', 'Tailwind CSS', 'Chart.js', 'Better Auth', 'Drizzle ORM', 'PostgreSQL (Neon)'],

	note: 'Katalyst dibuat untuk lomba dan satu mitra UMKM, bukan paket siap jual. Sistem untuk usahamu dimulai dari yang sederhana, misalnya kasir, stok, dan laporan, lalu tumbuh sesuai kebutuhan. Harga sistem digital mulai Rp2 jt, dihitung dari ruang lingkup, dan estimasi tertulis kamu terima sebelum pengerjaan dimulai.'
} as const;
