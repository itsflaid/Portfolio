<script lang="ts">
	import Grain from '$lib/components/Grain.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Work from '$lib/components/Work.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import ResumeModal from '$lib/components/ResumeModal.svelte';
</script>

<svelte:head>
	<title>Muhammad Fadil — Fullstack Developer</title>
	<meta
		name="description"
		content="Portfolio of Muhammad Fadil, fullstack developer building DevMap, ChatMe and other tools under Flaid / Devecos."
	/>
</svelte:head>

<Grain />
<Nav />
<Hero />
<About />
<Experience />
<Marquee />
<Work />
<Skills />

<Contact />
<Footer />
<ResumeModal />