import { SITE } from '$lib/data/site';

// format 6281234567890 (tanpa +). Kosong = tombol kontak jatuh ke email
export const WHATSAPP_NUMBER = '6285753421213';

export const CONTACT_LABEL = WHATSAPP_NUMBER ? 'Chat WhatsApp' : 'Kirim pesan';

export function contactHref(message: string): string {
	const text = encodeURIComponent(message);
	if (WHATSAPP_NUMBER) return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
	return `mailto:${SITE.email}?subject=${encodeURIComponent('Jasa pembuatan website')}&body=${text}`;
}

export const isWeb = (href: string) => href.startsWith('http');

export const MESSAGES = {
	general: 'Halo Fadil, saya tertarik dengan jasa pembuatan website. Boleh saya konsultasi dulu?',
	landing: 'Halo Fadil, saya butuh website untuk bisnis saya. Boleh saya konsultasi dulu?',
	cms: 'Halo Fadil, saya butuh website yang isinya bisa saya ubah sendiri. Boleh saya konsultasi dulu?',
	webapp: 'Halo Fadil, saya butuh aplikasi web untuk bisnis saya. Boleh saya konsultasi dulu?',
	template: (name: string) =>
		`Halo Fadil, saya tertarik dengan template "${name}". Boleh saya tanya lebih lanjut?`
};

export type TemplateKind = 'Jasa' | 'Company profile' | 'Katalog produk/menu';

export type WebTemplate = {
	slug: string;
	name: string;
	kind: TemplateKind;
	desc: string;
	thumb: string;
	demo?: string;
};

const tpl = (
	slug: string,
	name: string,
	kind: TemplateKind,
	desc: string,
	demo = ''
): WebTemplate => ({
	slug,
	name,
	kind,
	desc,
	thumb: `/jasa/template/${slug}.webp`,
	demo
});

// Screenshot: static/jasa/template/<slug>.webp. Isi demo dengan URL live tiap template.
// Lima pertama masuk baris atas, sisanya baris bawah.
export const webTemplates: WebTemplate[] = [
	tpl(
		'dapur-rasa',
		'Dapur Rasa',
		'Jasa',
		'Untuk katering dan usaha makanan. Foto menu besar, paket harga, dan tombol minta penawaran.',
		'https://fresh-katalog.netlify.app/'
	),
	tpl(
		'warung-citarasa',
		'Warung Citarasa',
		'Katalog produk/menu',
		'Untuk warung makan dan kuliner. Menu digital dengan pesanan langsung ke WhatsApp.',
		'https://citarasa-katalog.netlify.app/'
	),
	tpl(
		'washbro',
		'WashBro',
		'Jasa',
		'Untuk cuci mobil, motor, dan detailing. Paket harga dan reservasi lewat WhatsApp.',
		'https://kilap-pencucian.netlify.app/'
	),
	tpl(
		'mono-fashion',
		'Mono Fashion',
		'Katalog produk/menu',
		'Untuk toko fashion. Katalog lookbook dengan panduan ukuran dan tanya stok.',
		'https://fashion-katalog.netlify.app/'
	),
	tpl(
		'rumi-botanical',
		'Rumi Botanical Studio',
		'Katalog produk/menu',
		'Untuk studio taman dan landscape. Portofolio proyek dengan nuansa hijau yang tenang.',
		'https://botani-katalog.netlify.app/'
	),
	tpl(
		'taman-mentari',
		'Taman Mentari',
		'Jasa',
		'Untuk daycare dan pendidikan anak. Program, biaya, jadwal, dan form kunjungan.',
		'https://flaidhack.github.io/template-web-jasa-daycare/'
	),
	tpl(
		'archity',
		'Archity',
		'Company profile',
		'Untuk studio arsitektur dan interior. Portofolio proyek dengan tampilan lega dan elegan.'
	),
	tpl(
		'forma',
		'Forma',
		'Company profile',
		'Untuk firma arsitektur. Sorotan proyek, layanan, tim, dan statistik yang meyakinkan.'
	),
	tpl(
		'graphic-studio',
		'Graphic Studio',
		'Jasa',
		'Untuk studio kreatif dan agensi. Portofolio karya dengan layout yang berani.'
	),
	tpl(
		'dapur-hangat',
		'Dapur Hangat',
		'Katalog produk/menu',
		'Untuk toko kue dan camilan. Katalog produk dengan foto close-up dan tombol pesan.'
	)
];

export const processSteps = [
	{
		title: 'Diskusi',
		text: 'Ceritakan bisnis dan kebutuhanmu lewat chat. Saya beri gambaran dan estimasi.'
	},
	{
		title: 'Pilih & rancang',
		text: 'Pilih template atau desain custom untuk website, atau tentukan alur aplikasinya. Lalu sepakati ruang lingkup.'
	},
	{
		title: 'Pembuatan',
		text: 'Saya kerjakan dan tunjukkan hasil sementara, supaya revisi bisa dilakukan lebih awal.'
	},
	{
		title: 'Online & pendampingan',
		text: 'Website atau sistemmu online, serah terima, dan saya bantu bila ada kendala setelahnya.'
	}
];

export type Plan = {
	name: string;
	for: string;
	priceNote: string;
	specs: [string, string][];
	items: string[];
	message: string;
};

export const plans: Plan[] = [
	{
		name: 'Website usaha',
		for: `Website dari ${webTemplates.length} template atau desain custom. Mau yang mana, kita tentukan lewat chat.`,
		priceNote: 'Mulai Rp300 rb',
		specs: [
			['Jenis', 'Website statis'],
			['Halaman', 'Single atau multipage'],
			['Desain', 'Template atau custom']
		],
		items: [
			'Logo, warna, foto, dan teks disesuaikan dengan bisnismu',
			'Tampilan rapi di HP dan desktop',
			'Tombol WhatsApp, peta lokasi, dan media sosial',
			'Bantuan setup domain dan hosting',
			'Revisi sesuai kesepakatan'
		],
		message: MESSAGES.landing
	},
	{
		name: 'Website dengan admin',
		for: 'Website yang isinya bisa kamu ubah sendiri tanpa hubungi developer. Cocok untuk katalog produk, blog, dan galeri.',
		priceNote: 'Rp500 rb – Rp2 jt',
		specs: [
			['Jenis', 'Website dinamis'],
			['Konten', 'Produk, artikel, atau galeri'],
			['Admin', 'Panel kelola konten']
		],
		items: [
			'Tambah, ubah, dan hapus produk atau artikel sendiri',
			'Login admin yang aman',
			'Tampilan rapi di HP dan desktop',
			'Pesanan langsung masuk ke WhatsApp',
			'Panduan singkat cara pakai admin'
		],
		message: MESSAGES.cms
	},
	{
		name: 'Sistem digital untuk usaha',
		for: 'Aplikasi web yang mengikuti cara kerja bisnismu, bukan sebaliknya.',
		priceNote: 'Mulai Rp2 jt',
		specs: [
			['Jenis', 'Aplikasi web'],
			['Fitur', 'Sesuai alur kerja'],
			['Akses', 'Login dan multi-pengguna']
		],
		items: [
			'Diskusi alur kerja dan fitur yang benar-benar dipakai',
			'Login, database, dan hak akses per peran',
			'Dashboard dan laporan sederhana',
			'Deploy dan setup domain',
			'Dukungan setelah launch dibahas di awal'
		],
		message: MESSAGES.webapp
	}
];

export const faqs = [
	{
		q: 'Berapa lama pengerjaannya?',
		a: 'Tergantung ruang lingkup. Website dari template jauh lebih cepat daripada aplikasi web. Estimasi pastinya saya berikan setelah kita diskusi.'
	},
	{
		q: 'Website-nya single page atau multipage?',
		a: 'Keduanya bisa. Single page cukup untuk kebanyakan usaha kecil. Multipage cocok kalau butuh halaman terpisah, misalnya layanan, tentang, dan kontak. Keduanya statis, jadi cepat dibuka dan murah untuk hosting.'
	},
	{
		q: 'Template bisa disesuaikan?',
		a: 'Bisa. Logo, warna, foto, teks, dan urutan bagian disesuaikan dengan bisnismu. Kamu tinggal kirim bahannya.'
	},
	{
		q: 'Bagaimana dengan domain dan hosting?',
		a: 'Saya bantu setup-nya. Biaya domain dan hosting dibayar langsung ke penyedianya, jadi kamu tetap pemilik penuh.'
	},
	{
		q: 'Bagaimana skema pembayarannya?',
		a: 'Disepakati di awal sebelum pengerjaan dimulai, supaya jelas untuk kedua pihak.'
	},
	{
		q: 'Aplikasi web bisa dibuat sesuai bisnis saya?',
		a: 'Bisa. Ceritakan alur kerjamu, nanti kita tentukan fitur yang perlu.'
	},
	{
		q: 'Kalau ada masalah setelah website online?',
		a: 'Hubungi saya lewat chat. Bentuk dukungan setelah launch kita bahas di awal.'
	}
];

// Hero carousel /jasa. Isi 8 slide agar putarannya mulus. pos = object-position untuk crop portrait.
export type HeroSlide = { src: string; alt: string; pos?: string };

export const heroSlides: HeroSlide[] = [
	{ src: '/jasa/template/dapur-hangat.webp', alt: 'Template Dapur Hangat', pos: '20% 0' },
	{ src: '/jasa/hero/fadil.webp', alt: 'Potret Fadil' },
	{ src: '/preview/image/katalyst.webp', alt: 'Dashboard aplikasi Katalyst', pos: '50% 0' },
	{ src: '/jasa/template/dapur-rasa.webp', alt: 'Template Dapur Rasa', pos: '40% 0' },
	{ src: '/jasa/hero/presentasi.webp', alt: 'Fadil mempresentasikan aplikasi De Home Spa' },
	{ src: '/jasa/template/washbro.webp', alt: 'Template WashBro', pos: '0 0' },
	{ src: '/jasa/template/rumi-botanical.webp', alt: 'Template Rumi Botanical', pos: '0 0' },
	{ src: '/jasa/template/taman-mentari.webp', alt: 'Template Taman Mentari', pos: '50% 0' }
];
