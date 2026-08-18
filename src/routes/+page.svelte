<script lang="ts">
import Grain from "$lib/components/Grain.svelte";
import Nav from "$lib/components/Nav.svelte";
import Hero from "$lib/components/Hero.svelte";
import About from "$lib/components/About.svelte";
import Work from "$lib/components/Work.svelte";
// import ScrollModeToggle from "$lib/components/ScrollModeToggle.svelte";
import Manifesto from "$lib/components/Manifesto.svelte";
import Marquee from "$lib/components/Marquee.svelte";
import Experience from "$lib/components/Experience.svelte";
import Skills from "$lib/components/Skills.svelte";
import GithubActivity from "$lib/components/GithubActivity.svelte";
import Contact from "$lib/components/Contact.svelte";
import ResumeModal from "$lib/components/ResumeModal.svelte";
import CaseStudyModal from "$lib/components/CaseStudyModal.svelte";
import TechModal from "$lib/components/TechModal.svelte";

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
<Work />
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