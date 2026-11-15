import { plans, type Plan } from './jasa';

export type Service = Plan & {
	question: string;
	outcome: string;
	shifts: string[];
	lead: string;
	amount: string;
};

const extra = [
	{
		question: 'Pelanggan belum bisa menemukan usahamu?',
		outcome: 'Pelanggan melihat usahamu rapi di HP, lalu langsung chat.',
		shifts: ['single atau multipage', 'template atau desain custom', 'bahan yang sudah siap']
	},
	{
		question: 'Sering ganti harga atau foto produk?',
		outcome: 'Harga, foto, dan artikel kamu ubah sendiri, tanpa menunggu developer.',
		shifts: ['jenis konten', 'ada tidaknya fitur pesanan', 'jumlah halaman']
	},
	{
		question: 'Catatan usahamu masih tercecer di buku dan chat?',
		outcome: 'Catatan dan pekerjaan yang berulang pindah ke satu sistem yang dipakai bersama.',
		shifts: ['jumlah peran pengguna', 'banyaknya fitur', 'laporan yang dibutuhkan']
	}
];

function splitPrice(note: string): { lead: string; amount: string } {
	return note.startsWith('Mulai ')
		? { lead: 'Mulai', amount: note.slice(6) }
		: { lead: '', amount: note };
}

export const services: Service[] = plans.map((plan, i) => ({
	...plan,
	...extra[i],
	...splitPrice(plan.priceNote)
}));

export const paymentNotes = [
	['Estimasi', 'tertulis, sebelum pengerjaan'],
	['Pembayaran', 'disepakati di awal'],
	['Domain & hosting', 'dibayar ke penyedia']
] as const;
