import {
	siTypescript,
	siNodedotjs,
	siAstro,
	siNextdotjs,
	siPostgresql,
	siPrisma,
	siCodemirror,
	siUpstash,
	siReact,
	siExpress,
	siMysql,
	siSupabase,
	siVuedotjs,
	siLaravel
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
import { groqIcon, inertiaIcon } from '../components/icons';
import type { SkillIcon } from '../components/icons';

function si(icon: SimpleIcon): SkillIcon {
	return { hex: `#${icon.hex}`, path: icon.path };
}

export type TechItem = {
	name: string;
	icon?: SkillIcon;
};

export type CaseStudyContent = {
	problem: { en: string; id: string };
	solution: { en: string; id: string };
};

export type Project = {
	index: string;
	title: string;
	tag: string;
	thumb: string;
	video: string;
	desc: string;
	tech: TechItem[];
	metrics?: string[];
	demo?: string;
	repo: string;
	caseStudy?: CaseStudyContent;
};

export const projects: Project[] = [
	{
		index: '01',
		title: 'DEVMAP',
		tag: 'Analyze once, reuse context everywhere',
		thumb: '/preview/image/devmap.webp',
		video: '/preview/video/devmap',
		desc: 'Maps your codebase through static analysis to give AI agents structured context and a clearer understanding of your project.',
		tech: [
			{ name: 'TypeScript', icon: si(siTypescript) },
			{ name: 'Node.js', icon: si(siNodedotjs) },
			{ name: 'ts-morph' },
			{ name: 'Commander' },
			{ name: 'Astro', icon: si(siAstro) }
		],
		metrics: ['282/282 tests passing', '11 framework supported'],
		demo: 'https://devmap-web.vercel.app',
		repo: 'https://github.com/itsflaid/devmap',
		caseStudy: {
			problem: {
				en: 'While working on DevNote (Project 2), I found that my use of AI in the development process became increasingly intensive as the project grew more complex. As a result, it became harder for me to maintain a complete understanding of the codebase and how its different parts were connected. At the same time, I noticed a broader problem among developers using AI: whenever a new session starts, the AI has to rebuild its context and understanding of the project again. Some AI coding tools already provide their own approaches to preserving context, such as CLAUDE.md in Claude and indexing in Cursor, but these solutions remain tied to their respective ecosystems. This approach keeps DevMap independent from any specific AI agent or coding assistant ecosystem, allowing project context to be reused across different AI-assisted development workflows.',
				id: 'Saat mengerjakan DevNote (Project 2), penggunaan AI dalam proses development saya mulai semakin intens seiring project yang semakin kompleks. Akibatnya, saya semakin sulit mempertahankan pemahaman menyeluruh terhadap struktur dan hubungan antarbagian codebase. Di sisi lain, saya melihat masalah yang lebih umum di kalangan developer yang menggunakan AI: setiap kali memulai sesi baru, AI perlu membangun kembali konteks dan pemahaman terhadap project yang sedang dikerjakan. Beberapa AI coding tools memang sudah memiliki pendekatan untuk menyimpan konteks, seperti CLAUDE.md pada Claude dan indexing pada Cursor, tetapi solusi tersebut masih bergantung pada ekosistem masing-masing. Dengan pendekatan ini, DevMap tidak bergantung pada satu AI agent atau ekosistem coding assistant tertentu, sehingga konteks project dapat digunakan kembali dalam berbagai workflow AI-assisted development.'
			},
			solution: {
				en: 'DevMap was created as a tool to help developers and AI understand a codebase without having to rebuild its context from scratch. DevMap uses static analysis to analyze the project structure, relationships between files, dependencies, and key components within the codebase. The analysis is then transformed into reusable context that can be used by both AI agents and developers. This approach keeps DevMap independent from any specific AI agent or platform, allowing project context to be reused across different AI-assisted development workflows.',
				id: 'DevMap dibuat sebagai tool untuk membantu developer dan AI memahami codebase tanpa harus membangun ulang konteks dari awal. DevMap menggunakan static analysis untuk menganalisis struktur project, hubungan antar-file, dependency, serta komponen penting di dalam codebase. Hasil analisis tersebut kemudian diubah menjadi konteks yang dapat digunakan kembali oleh AI agent maupun developer. Dengan pendekatan ini, DevMap tidak bergantung pada satu AI agent atau platform tertentu, sehingga konteks project dapat digunakan kembali dalam berbagai workflow AI-assisted development.'
			}
		}
	},
	{
		index: '02',
		title: 'DEVNOTE',
		tag: 'A platform for developers to manage and organize code, snippets, resources, and knowledge.',
		thumb: '/preview/image/devnote.webp',
		video: '/preview/video/devnote2',
		desc: 'Keep your technical knowledge organized in one place, from reusable snippets and resources to notes and collections.',
		tech: [
			{ name: 'Next.js', icon: si(siNextdotjs) },
			{ name: 'TypeScript', icon: si(siTypescript) },
			{ name: 'PostgreSQL', icon: si(siPostgresql) },
			{ name: 'Codemirror', icon: si(siCodemirror) }
		],
		metrics: ['39 endpoint', '3 role levels'],
		demo: 'https://devnote-five.vercel.app',
		repo: 'https://github.com/itsflaid/devnote',
		caseStudy: {
			problem: {
				en: 'While working on ChatMe (Project 3) and DailyFit (Project 4), which use similar technologies, I noticed that many parts of my development process, from project setup to specific code snippets and files, could be reused across different projects. Instead of repeatedly opening an older project just to find and copy code, I needed a dedicated place to store and manage reusable snippets, code, and files. Once that space existed, I felt something was still missing without a way to share it with others, so I added public sharing on top of it. That need grew further when a friend at university fell behind on code during a programming class — I could share code through DevNote, but once he needed several files at once, sending them one by one became impractical. Sharing multiple files also usually required a repository or pushing to GitHub first, which felt excessive just for quick sharing. That led to the need for grouping multiple files in one place and sharing them together without creating a repository or pushing to GitHub.',
				id: 'Saat mengerjakan ChatMe (Project 3) dan DailyFit (Project 4) yang menggunakan teknologi yang serupa, saya mulai melihat bahwa banyak hal dalam development, mulai dari setup hingga potongan kode dan file tertentu, sebenarnya dapat saya gunakan kembali di project lain. Daripada harus terus membuka project sebelumnya hanya untuk mencari dan menyalin kode, saya butuh tempat khusus untuk menyimpan dan mengelola snippet, kode, maupun file yang sering digunakan kembali. Setelah tempat itu jadi, saya merasa masih kurang lengkap kalau belum bisa membagikannya ke orang lain, sehingga muncul fitur publik dan sharing. Kebutuhan itu kemudian berkembang lagi ketika ada teman kuliah yang tertinggal kode saat mata kuliah pemrograman — kode bisa saya bagikan lewat DevNote, tapi begitu dia butuh banyak file sekaligus, mengirimkannya satu per satu jadi tidak praktis. Selain itu, membagikan banyak file biasanya butuh repository atau push ke GitHub dulu, padahal untuk kebutuhan berbagi cepat itu terasa berlebihan. Dari situ muncul kebutuhan untuk mengelompokkan banyak file dalam satu tempat dan membagikannya sekaligus tanpa harus membuat repository atau push ke GitHub.'
			},
			solution: {
				en: 'DevNote is a platform for storing, managing, and reusing snippets, code, and files needed throughout development. Beyond acting as a personal code library, it includes sharing so code or files can be handed off to others directly. Workspace extends that further, grouping several files into one shareable space instead of sending them one by one. What started as a personal snippet store grew into a way to manage and share knowledge and resources across developers.',
				id: 'DevNote adalah platform untuk menyimpan, mengelola, dan memakai ulang snippet, kode, serta file yang dibutuhkan selama development. Selain jadi personal code library, ada fitur sharing untuk membagikan kode atau file langsung ke orang lain. Workspace memperluas ini dengan mengelompokkan beberapa file ke satu ruang yang bisa dibagikan sekaligus, bukan satu per satu. Yang awalnya cuma tempat menyimpan snippet pribadi berkembang jadi cara mengelola dan berbagi knowledge maupun resource antar-developer.'
			}
		}
	},
	{
		index: '03',
		title: 'CHATME',
		tag: 'Chat-UI-based personal notes and reminders web application',
		thumb: '/preview/image/chatme.webp',
		video: '/preview/video/chatme2',
		desc: 'A simple way to capture thoughts, save notes, and manage reminders through a familiar chat-based interface.',
		tech: [
			{ name: 'Next.js', icon: si(siNextdotjs) },
			{ name: 'TypeScript', icon: si(siTypescript) },
			{ name: 'PostgreSQL', icon: si(siPostgresql) },
			{ name: 'Upstash', icon: si(siUpstash) }
		],
		metrics: ['offline-ready', '3+ months of daily use'],
		demo: 'https://chatme-jet.vercel.app',
		repo: 'https://github.com/itsflaid/chatme',
		caseStudy: {
			problem: {
				en: 'WhatsApp had become a familiar place for keeping track of almost everything. Things to remember, tasks, shop-related matters, and random ideas that came up were often written down in chat so they would not be forgotten. While this habit was convenient, WhatsApp was not designed specifically for managing notes and reminders. Information could easily get mixed with other conversations and become harder to manage as it accumulated. There was a need for a dedicated place to keep track of things while still maintaining the familiar chat-based interaction.',
				id: 'WhatsApp sudah terbiasa digunakan sebagai tempat untuk mencatat hampir semua hal. Ketika ingin mengingat sesuatu, ada tugas, urusan warung, maupun sekadar ide yang muncul tiba-tiba, semuanya ditulis di chat agar tidak terlupakan. Kebiasaan tersebut memang praktis, tetapi WhatsApp bukan dirancang khusus untuk mengelola catatan dan pengingat. Informasi akhirnya bercampur dengan percakapan lain dan semakin sulit dikelola ketika jumlahnya bertambah. Dibutuhkan tempat khusus untuk mencatat dan mengingat berbagai hal, tetapi tetap dengan pola interaksi chat yang sudah familiar.'
			},
			solution: {
				en: 'ChatMe is a notes-and-reminders web app that keeps the chat-based interface intact, so the existing habit didn\u2019t need to change. Instead of pushing a new notes-app or task-manager mental model, it keeps the familiar chat interaction but moves it into a space actually designed for capturing, organizing, and recalling things.',
				id: 'ChatMe adalah web app catatan dan pengingat yang tetap mempertahankan interface berbasis chat, jadi kebiasaan yang sudah ada tidak perlu berubah. Alih-alih memaksa beradaptasi dengan notes app atau task manager baru, interaksi chat yang familiar tetap dipakai, cuma dipindah ke ruang yang memang dirancang untuk mencatat, mengelola, dan mengingat.'
			}
		}
	},
	{
		index: '04',
		title: 'DAILYFIT',
		tag: 'Simple daily home workout web application',
		thumb: '/preview/image/dailyfit.webp',
		video: '/preview/video/dailyfit',
		desc: 'Follow daily workouts, track completed activities, and keep an eye on your progress through a simple fitness experience.',
		tech: [
			{ name: 'Next.js', icon: si(siNextdotjs) },
			{ name: 'TypeScript', icon: si(siTypescript) },
			{ name: 'PostgreSQL', icon: si(siPostgresql) },
			{ name: 'Prisma', icon: si(siPrisma) }
		],
		metrics: ['PDF reports', '487 movement logged'],
		demo: 'https://dailyfit-alpha.vercel.app',
		repo: 'https://github.com/itsflaid/dailyfit',
		caseStudy: {
			problem: {
				en: 'Like ChatMe, this started with WhatsApp — this time for tracking a workout list. The list kept changing: swapping exercises or building a new routine meant starting a fresh list each time, and old ones just piled up with no practical way to manage routines or track progress over time. The goal was a fitness app sized to daily use, without the complexity of features that weren\u2019t actually needed.',
				id: 'Sama seperti ChatMe, ini berawal dari WhatsApp — kali ini untuk menyimpan daftar gerakan workout. Daftarnya sering berubah: ganti gerakan atau menyusun rutinitas baru berarti bikin daftar baru lagi, dan yang lama cuma menumpuk tanpa cara praktis untuk mengelola rutinitas atau melihat perkembangan dari waktu ke waktu. Targetnya adalah fitness app yang pas untuk kebutuhan harian, tanpa fitur kompleks yang sebenarnya tidak dipakai.'
			},
			solution: {
				en: 'DailyFit is a simple fitness app built around daily workout needs, with four core pieces: Daily Checklist for logging completed workouts, Exercise List for managing movements, Plan List for building routines, and Stats for tracking progress over time. No more starting a new list every time a routine changes — everything lives in one place, kept simple and practical for everyday use.',
				id: 'DailyFit adalah fitness app sederhana yang fokus pada kebutuhan workout harian, dengan empat fitur utama: Daily Checklist untuk mencatat workout yang sudah dilakukan, Exercise List untuk mengelola daftar gerakan, Plan List untuk menyusun rutinitas, dan Stats untuk melihat perkembangan dari waktu ke waktu. Tidak perlu lagi bikin daftar baru tiap kali rutinitas berubah — semuanya ada di satu tempat, simple dan practical untuk pemakaian sehari-hari.'
			}
		}
	},
	{
		index: '05',
		title: 'MUFADZ PORTAL',
		tag: 'An all-in-one platform for Islamic services, from Quran to prayer schedule.',
		thumb: '/preview/image/mufadz.webp',
		video: '/preview/video/mufadz',
		desc: 'Brings Islamic services together in one platform — Quran reader and prayer schedule anchor daily use, alongside dzikir, zakat calculator, and an AI chatbot.',
		tech: [
			{ name: 'React', icon: si(siReact) },
			{ name: 'TypeScript', icon: si(siTypescript) },
			{ name: 'Express', icon: si(siExpress) },
			{ name: 'MySQL', icon: si(siMysql) }
		],
		metrics: ['25 Stars', '3 APIs integrated'],
		demo: 'https://mufadz-app.vercel.app',
		repo: 'https://github.com/itsflaid/mufadz-portal',
		caseStudy: {
			problem: {
				en: 'This was a first attempt at full-stack development, built around a platform for Islamic services. The idea started from small everyday needs — checking prayer times without searching Google, and reading the Qur\u2019an with a cleaner layout and more comfortable typography. Beyond that, the project doubled as a way to learn how a full-stack app actually fits together.',
				id: 'Ini jadi percobaan pertama di full-stack development, dibangun dalam bentuk platform untuk kebutuhan Islami. Idenya berawal dari kebutuhan sehari-hari yang sederhana — cek jadwal adzan tanpa harus mencari di Google, serta Qur\u2019an dengan tampilan yang lebih clean dan font yang nyaman dibaca. Di luar itu, project ini juga jadi media belajar bagaimana aplikasi full-stack sebenarnya saling terhubung.'
			},
			solution: {
				en: 'Mufadz Portal brings several Islamic services into one place, including prayer schedules and a Qur\u2019an reader tailored to those everyday needs. It also served as a full-stack learning project — a way to practice how frontend, backend, database, and authentication connect into a single working system.',
				id: 'Mufadz Portal menggabungkan beberapa layanan Islami dalam satu tempat, termasuk jadwal adzan dan Qur\u2019an reader yang disesuaikan dengan kebutuhan sehari-hari tadi. Project ini juga berfungsi sebagai full-stack learning project — cara mempraktikkan bagaimana frontend, backend, database, dan authentication terhubung jadi satu sistem yang utuh.'
			}
		}
	},
	{
		index: '06',
		title: 'DE HOME SPA',
		tag: 'An AI-powered home spa platform for personalized treatment recommendations and guidance.',
		thumb: '/preview/image/de-home-spa.webp',
		video: '/preview/video/dehomespa',
		desc: 'Get personalized home spa recommendations based on your needs through guided selections or direct conversations with AI.',
		tech: [
			{ name: 'Next.js', icon: si(siNextdotjs) },
			{ name: 'TypeScript', icon: si(siTypescript) },
			{ name: 'Groq', icon: groqIcon },
			{ name: 'Fonnte' }
		],
		metrics: ['Ranked 6th — TechnoFest 2026 FE AI Hackathon'],
		demo: 'http://de-home-spa-v2-uwxp.vercel.app/',
		repo: 'https://github.com/itsflaid/de-home-spa-v2',
		caseStudy: {
			problem: {
				en: 'Built for Frontend AI Augmented Hackathon TechnoFest 2026. Home massage booking sites typically list dozens of treatments in technical language with no real guidance, and no space to describe symptoms or set a pressure preference. That made it easy to pick the wrong treatment, leave unsatisfied, or just abandon the site — a lost customer for the business and an underused home-service offering.',
				id: 'dibangun untuk HackathonFrontend AI Augmented pada TechnoFest 2026. Website booking pijat pada umumnya menampilkan puluhan treatment dengan istilah teknis tanpa panduan yang jelas, dan tidak ada ruang untuk menjelaskan keluhan atau menentukan preferensi tekanan. Akibatnya, salah pilih treatment, merasa kurang puas, atau akhirnya meninggalkan situs jadi hal yang mudah terjadi — bisnis kehilangan calon pelanggan dan potensi layanan home service kurang optimal.'
			},
			solution: {
				en: 'De Home Spa is a massage-booking landing page pairing AI recommendations with WhatsApp to simplify treatment selection. Users describe what\u2019s bothering them in plain language, and a Groq-powered model recommends a treatment — name, duration, scent, and pressure — along with a quick tip, while also picking up on preferences like soft, normal, or firm pressure automatically. Once a treatment\u2019s chosen, a short form (name, address, schedule, phone, payment method) sends the booking straight to the admin over WhatsApp. An interactive price list covers 26+ treatments across 4 duration options, viewable in a modal with no login or database needed — the whole flow is built responsively with Tailwind CSS, targeting a booking completed in under a minute.',
				id: 'De Home Spa adalah landing page booking pijat yang menggabungkan AI recommendation dan WhatsApp untuk menyederhanakan proses pemilihan treatment. Pengguna cukup menjelaskan keluhan dengan bahasa sehari-hari, lalu model AI melalui Groq API merekomendasikan treatment — nama, durasi, aroma, dan tekanan — sekaligus tips singkat, dan otomatis mengenali preferensi seperti lembut, normal, atau keras. Setelah memilih treatment, form singkat (nama, alamat, jadwal, nomor HP, metode pembayaran) mengirim detail booking langsung ke admin lewat WhatsApp. Pricelist interaktif mencakup 26+ treatment dengan 4 pilihan durasi, bisa dilihat lewat modal tanpa login atau database — seluruh alur dibangun responsif dengan Tailwind CSS, menargetkan proses booking yang selesai dalam waktu kurang dari satu menit.'
			}
		}
	},
	{
		index: '07',
		title: 'KASBON.IN',
		tag: 'Real-time Shared Ledger System for a family-run store',

		thumb: '/preview/image/kasbonin.webp',
		video: '',
		desc: 'Multi-user debt tracking for a family store, so every transaction anyone logs is visible to the whole family in real time.',
		tech: [
			{ name: 'Vue', icon: si(siVuedotjs) },
			{ name: 'Laravel', icon: si(siLaravel) },
			{ name: 'Inertia', icon: inertiaIcon },
			{ name: 'MySQL', icon: si(siMysql) }
		],

		repo: 'https://github.com/itsflaid/kasbonin',
		caseStudy: {
			problem: {
				en: 'At my family’s store, debt records were handled in several different ways — sometimes written in a notebook, sometimes told directly to my parents, and sometimes noted in WhatsApp or ChatMe. Each method could still cause information to be missed. For example, my mother might write someone’s debt at the back of the notebook, while my father records another debt for the same person at the front without knowing about the previous entry. When someone else checks the book later, they might only look at one side and miss the other record entirely. Verbal handoffs could also be forgotten before they were written down. The same thing could happen when I noted a debt in WhatsApp or ChatMe but forgot to inform my parents. When a customer came to pay, whoever was minding the store had to search through the records manually or ask another family member to figure out what was still owed, to whom, and how much. The total often had to be calculated by hand, while details such as the item, price, who recorded it, and when it happened were not always complete. Sometimes the price was not even known when the debt was first recorded. The real problem wasn’t the lack of an app, but the lack of one shared source of truth for the whole family.',
				id: 'Di warung keluarga saya, pencatatan utang dilakukan dengan beberapa cara yang berbeda — kadang ditulis di buku, kadang disampaikan langsung kepada orang tua, dan kadang dicatat di WhatsApp atau ChatMe. Setiap cara tetap bisa menyebabkan informasi terlewat. Misalnya, Ibu saya mencatat utang seseorang di bagian belakang buku, sementara bapak saya mencatat utang orang yang sama di bagian depan tanpa mengetahui catatan sebelumnya. Ketika anggota keluarga lain mencari catatan tersebut, bisa saja hanya melihat satu sisi buku dan melewatkan catatan yang lainnya. Informasi yang disampaikan secara lisan juga bisa terlupakan sebelum sempat dicatat. Hal yang sama bisa terjadi ketika saya mencatat utang di WhatsApp atau ChatMe tetapi lupa memberitahukannya kepada orang tua. Saat pelanggan datang untuk membayar, siapa pun yang sedang menjaga warung harus mencari catatan secara manual atau bertanya kepada anggota keluarga lain untuk mengetahui apa yang masih menjadi utang, kepada siapa utang tersebut dicatat, dan berapa jumlahnya. Totalnya pun sering harus dihitung sendiri, sementara detail seperti barang, harga, siapa yang mencatat, dan kapan transaksi terjadi tidak selalu lengkap. Bahkan, harga terkadang belum diketahui saat utang pertama kali dicatat.Masalah utamanya bukan karena belum ada aplikasi, tetapi karena belum ada satu sumber informasi yang digunakan bersama oleh seluruh keluarga'
			},
			solution: {
				en: 'Kasbon.in is a shared debt-tracking app for the family store, built multi-user with real-time updates. Anyone can log a debt against an existing customer or a new one, recording the item, price, who was on duty, and the timestamp — price is optional, since it can be filled in later if it isn\u2019t known yet. Every family member sees the same transactions, so nothing stays split across notebook pages, private chats, or a single person\u2019s memory. Each customer\u2019s running total is calculated automatically, and payments can be partial or full, each one logged with its own date and history. Debt tracking went from scattered and memory-dependent to one transparent system that\u2019s still simple enough for daily use.',
				id: 'Kasbon.in adalah aplikasi pencatatan utang bersama untuk warung keluarga, dibangun multi-user dengan update real-time. Siapa pun bisa mencatat utang ke pelanggan yang sudah ada atau menambah baru, lengkap dengan barang, harga, anggota yang sedang jaga, dan waktu pencatatan — harga bersifat opsional, bisa dilengkapi belakangan kalau belum diketahui. Semua anggota keluarga melihat transaksi yang sama, jadi tidak ada lagi catatan yang terpisah di buku, chat pribadi, atau ingatan satu orang saja. Total utang tiap pelanggan dihitung otomatis, dan pembayaran bisa sebagian atau lunas, masing-masing tercatat dengan tanggal dan riwayatnya sendiri. Pencatatan utang berubah dari tersebar dan bergantung ingatan jadi satu sistem transparan yang tetap sederhana untuk dipakai sehari-hari.'
			}
		}
	},

];