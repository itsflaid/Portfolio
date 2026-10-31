import { SITE } from '$lib/data/site';

// format 6281234567890 (tanpa +). Kosong = tombol kontak jatuh ke email
export const WHATSAPP_NUMBER = '';

export const AVAILABLE = true;

export const CONTACT_LABEL = WHATSAPP_NUMBER ? 'Chat WhatsApp' : 'Kirim pesan';

export function contactHref(message: string): string {
	const text = encodeURIComponent(message);
	if (WHATSAPP_NUMBER) return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
	return `mailto:${SITE.email}?subject=${encodeURIComponent('Jasa pembuatan website')}&body=${text}`;
}

export const isWeb = (href: string) => href.startsWith('http');

export const MESSAGES = {
	general: 'Halo Fadil, saya tertarik dengan jasa pembuatan website. Boleh saya konsultasi dulu?',
	landing: 'Halo Fadil, saya butuh landing page untuk bisnis saya. Boleh saya konsultasi dulu?',
	webapp: 'Halo Fadil, saya butuh aplikasi web untuk bisnis saya. Boleh saya konsultasi dulu?',
	template: (name: string) =>
		`Halo Fadil, saya tertarik dengan template "${name}". Boleh saya tanya lebih lanjut?`,
	similar: (name: string) =>
		`Halo Fadil, saya tertarik dengan aplikasi seperti ${name}. Boleh saya konsultasi kebutuhan saya?`
};

export type LandingTemplate = {
	slug: string;
	name: string;
	niche: string;
	thumb: string;
	demo?: string;
};

const tpl = (slug: string, name: string, niche: string, demo = ''): LandingTemplate => ({
	slug,
	name,
	niche,
	thumb: `/jasa/landing/${slug}.webp`,
	demo
});

// nama & niche masih placeholder. Screenshot: static/jasa/landing/<slug>.webp
// 4 pertama masuk baris atas, sisanya baris bawah
export const landingTemplates: LandingTemplate[] = [
	tpl('toko', 'Toko & Warung', 'Usaha retail'),
	tpl('kuliner', 'Kuliner & Cafe', 'Makanan & minuman'),
	tpl('salon', 'Salon & Barbershop', 'Perawatan'),
	tpl('kesehatan', 'Klinik & Spa', 'Kesehatan & wellness'),
	tpl('kursus', 'Bimbel & Kursus', 'Pendidikan'),
	tpl('studio', 'Fotografi & Studio', 'Kreatif'),
	tpl('properti', 'Properti & Kontraktor', 'Konstruksi'),
	tpl('event', 'Event & Undangan', 'Acara')
];

export type WebApp = {
	slug: string;
	name: string;
	kind: string;
	tagline: string;
	forWho: string;
	problem: string;
	features: string[];
	stack: string[];
	thumb: string;
	host: string;
	demo?: string;
	repo?: string;
	badge?: string;
};

export const webApps: WebApp[] = [
	{
		slug: 'kasbonin',
		name: 'Kasbon.in',
		kind: 'Pencatatan utang warung',
		tagline: 'Buku kasbon warung, didigitalkan — real-time dan transparan.',
		forWho: 'Warung atau toko yang dijaga bergantian oleh beberapa orang.',
		problem:
			'Catatan utang tercecer di buku, chat, dan ingatan. Tiap penjaga harus tanya-tanya dulu saat pelanggan mau bayar.',
		features: [
			'Banyak akun dalam satu warung, dengan peran owner dan staff',
			'Catat utang cepat; harga boleh diisi belakangan',
			'Bayar sebagian atau lunas, lengkap dengan riwayatnya',
			'Perubahan langsung muncul di semua perangkat, tanpa refresh',
			'Jejak audit: entri yang dibatalkan tidak benar-benar dihapus'
		],
		stack: ['Laravel', 'Livewire', 'MySQL', 'Laravel Reverb'],
		thumb: '/preview/image/kasbonin.webp',
		host: 'kasbon.in',
		repo: 'https://github.com/itsflaid/kasbon.in'
	},
	{
		slug: 'katalyst',
		name: 'Katalyst',
		kind: 'Pendukung keputusan bisnis',
		tagline: 'Lihat untung-rugi sebenarnya, bukan cuma omzet.',
		forWho: 'UMKM yang mencatat penjualan harian dan ingin menentukan harga dengan data.',
		problem:
			'Omzet kelihatan besar, tapi untung sebenarnya tidak jelas, dan keputusan harga sering hanya berdasarkan perasaan.',
		features: [
			'Dashboard: omzet, profit, margin, tren, dan produk terlaris',
			'Kasir multi-produk dengan struk yang bisa diaudit',
			'Simulator harga: geser harga, diskon, dan modal, lihat dampaknya',
			'Copilot tanya-jawab berbasis data; angka dari rumus, bukan karangan AI',
			'Stok, diskon terjadwal, dan log aktivitas owner & staff'
		],
		stack: ['SvelteKit', 'PostgreSQL', 'Drizzle', 'Better Auth'],
		thumb: '/preview/image/katalyst.webp',
		host: 'katalyst-6pk.pages.dev',
		demo: 'https://katalyst-6pk.pages.dev/',
		repo: 'https://github.com/itsflaid/katalyst'
	},
	{
		slug: 'de-home-spa',
		name: 'De Home Spa',
		kind: 'Booking layanan + rekomendasi AI',
		tagline: 'Pelanggan ceritakan keluhannya, AI pilihkan treatment, booking langsung ke WhatsApp admin.',
		forWho: 'Bisnis jasa home service yang menerima pesanan lewat WhatsApp.',
		problem:
			'Puluhan pilihan treatment dengan istilah teknis membuat pelanggan bingung, salah pilih, atau pergi sebelum memesan.',
		features: [
			'Rekomendasi treatment dari keluhan dengan bahasa sehari-hari',
			'Pricelist interaktif untuk 26+ treatment dan 4 pilihan durasi',
			'Form booking singkat yang terkirim ke admin lewat WhatsApp',
			'Tanpa login dan tanpa database, jadi ringan dikelola'
		],
		stack: ['Next.js', 'TypeScript', 'Groq API', 'Tailwind CSS'],
		thumb: '/preview/image/de-home-spa.webp',
		host: 'de-home-spa-v2-uwxp.vercel.app',
		demo: 'https://de-home-spa-v2-uwxp.vercel.app/',
		repo: 'https://github.com/FlaidHack/de-home-spa-v2',
		badge: 'Peringkat 6 — TechnoFest 2026'
	}
];

export const processSteps = [
	{
		title: 'Diskusi',
		text: 'Ceritakan bisnis dan kebutuhanmu lewat chat. Saya beri gambaran dan estimasi.'
	},
	{
		title: 'Pilih & rancang',
		text: 'Pilih template atau tentukan alur aplikasinya, lalu sepakati ruang lingkup.'
	},
	{
		title: 'Pembuatan',
		text: 'Saya kerjakan dan tunjukkan hasil sementara, supaya revisi bisa dilakukan lebih awal.'
	},
	{
		title: 'Launch & dukungan',
		text: 'Website online, serah terima, dan saya bantu bila ada kendala setelahnya.'
	}
];

export type Plan = {
	name: string;
	for: string;
	price: string; // kosong = tampil priceNote
	priceNote: string;
	items: string[];
	cta: string;
	message: string;
	dark?: boolean;
};

export const plans: Plan[] = [
	{
		name: 'Landing Page',
		for: 'Pilih satu dari template yang tersedia.',
		price: '',
		priceNote: 'Hubungi untuk estimasi',
		items: [
			'Template disesuaikan dengan logo, warna, foto, dan teks bisnismu',
			'Tampilan rapi di HP dan desktop',
			'Tombol WhatsApp, peta lokasi, dan tautan media sosial',
			'Bantuan setup domain dan hosting',
			'Revisi sesuai kesepakatan'
		],
		cta: 'Pilih template',
		message: MESSAGES.landing
	},
	{
		name: 'Web App',
		for: 'Sistem yang mengikuti alur kerja bisnismu.',
		price: '',
		priceNote: 'Sesuai kebutuhan',
		items: [
			'Diskusi alur kerja dan fitur yang benar-benar dipakai',
			'Desain dan pembuatan dari nol sesuai kebutuhan',
			'Login, database, dan hak akses per peran',
			'Deploy dan serah terima',
			'Dukungan setelah launch dibahas di awal'
		],
		cta: 'Diskusi kebutuhan',
		message: MESSAGES.webapp,
		dark: true
	}
];

export const faqs = [
	{
		q: 'Berapa lama pengerjaannya?',
		a: 'Tergantung ruang lingkup. Landing page dari template jauh lebih cepat daripada web app. Estimasi pastinya saya berikan setelah kita diskusi.'
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
		q: 'Web app bisa dibuat sesuai bisnis saya?',
		a: 'Bisa. Contoh di atas lahir dari masalah nyata, misalnya pencatatan utang di warung keluarga. Ceritakan alur kerjamu, nanti kita tentukan fitur yang perlu.'
	},
	{
		q: 'Kalau ada masalah setelah website online?',
		a: 'Hubungi saya lewat chat. Bentuk dukungan setelah launch kita bahas di awal.'
	}
];
