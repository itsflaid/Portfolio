<script lang="ts">
import Grain from "$lib/components/layout/Grain.svelte";
import Nav from "$lib/components/Nav.svelte";
import Hero from "$lib/components/sections/Hero.svelte";
import About from "$lib/components/sections/About.svelte";
import Projects from "$lib/components/sections/Projects.svelte";
// import ScrollModeToggle from "$lib/components/ScrollModeToggle.svelte";
import Manifesto from "$lib/components/sections/Manifesto.svelte";
import Marquee from "$lib/components/sections/Marquee.svelte";
import Experience from "$lib/components/sections/Experience.svelte";
import Skills from "$lib/components/sections/Skills.svelte";
import GithubActivity from "$lib/components/sections/GithubActivity.svelte";
import Contact from "$lib/components/sections/Contact.svelte";
import ResumeModal from "$lib/components/modals/ResumeModal.svelte";
import CaseStudyModal from "$lib/components/modals/CaseStudyModal.svelte";
import TechModal from "$lib/components/modals/TechModal.svelte";

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
<!-- Scroll mode toggle: nonaktif. Aktifkan lagi dengan menghapus baris komentar di bawah + hapus `//` di import ScrollModeToggle. -->
<!-- <ScrollModeToggle /> -->
<Hero />
<About />
<Experience />
<div class="desktop-only">
    <Manifesto />
</div>
<Marquee />
<Projects />
<Skills />
<GithubActivity />

<Contact />
<ResumeModal />
<CaseStudyModal />
<TechModal />

<style>
	.desktop-only {
		display: block;
	}

	@media (max-width: 767px) {
		.desktop-only {
			display: none;
		}
	}
</style>