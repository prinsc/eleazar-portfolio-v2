<script>
	import { settings } from '$lib/stores/settings.js';
	import { content } from '$lib/stores/content.js';
	import { Github, Linkedin, Instagram, Mail, ExternalLink } from 'lucide-svelte';
	import Footer from '$lib/comp/footer.svelte';
	import PageContent from '$lib/comp/PageContent.svelte';

	let { children } = $props();

	const iconMap = {
		github: Github,
		linkedin: Linkedin,
		instagram: Instagram,
		at: Mail
	};
</script>

{@render children()}

<Footer />
