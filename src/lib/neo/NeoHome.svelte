<script lang="ts">
	import NeoNav from './NeoNav.svelte';
	import NeoHero from './NeoHero.svelte';
	import NeoAbout from './NeoAbout.svelte';
	import NeoExperience from './NeoExperience.svelte';
	import NeoProcess from './NeoProcess.svelte';
	import NeoMarquee from './NeoMarquee.svelte';
	import NeoProjects from './NeoProjects.svelte';
	import NeoSkills from './NeoSkills.svelte';
	import NeoGithub from './NeoGithub.svelte';
	import NeoContact from './NeoContact.svelte';
	import ResumeModal from '$lib/components/modals/ResumeModal.svelte';
	import CaseStudyModal from '$lib/components/modals/CaseStudyModal.svelte';
	import TechModal from '$lib/components/modals/TechModal.svelte';
</script>

<NeoNav />
<main>
	<NeoHero />
	<NeoAbout />
	<NeoExperience />
	<NeoProcess />
	<NeoMarquee />
	<NeoProjects />
	<NeoSkills />
	<NeoGithub />
</main>
<NeoContact />
<ResumeModal />
<CaseStudyModal />
<TechModal />
