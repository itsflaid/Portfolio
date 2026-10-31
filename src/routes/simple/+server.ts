import { redirect } from '@sveltejs/kit';

// Mode simpel sudah dihapus; link lama diarahkan ke halaman utama.
export const GET = () => {
	redirect(308, '/');
};
