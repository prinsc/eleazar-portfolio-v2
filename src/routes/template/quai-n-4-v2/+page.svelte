<script>
  import Nav from './lib/Nav.svelte';
  import Hero from './lib/Hero.svelte';
  import Alerte from './lib/Alerte.svelte';
  import Infos from './lib/Infos.svelte';
  import Horaires from './lib/Horaires.svelte';
  import Cta from './lib/Cta.svelte';
  import Socials from './lib/Socials.svelte';
  import Avis from './lib/Avis.svelte';
  import Poles from './lib/Poles.svelte';
  import Carte from './lib/Carte.svelte';
  import Menus from './lib/Menus.svelte';
  import Galerie from './lib/Galerie.svelte';
  import Evenements from './lib/Evenements.svelte';
  import Actualites from './lib/Actualites.svelte';
  import Partenaires from './lib/Partenaires.svelte';
  import Footer from './lib/Footer.svelte';

  let { data } = $props();
</script>

<Nav telephone={data.infos.data.telephone}/>

<main>
  <Alerte data={data.alerte.data}/>
  <Hero data={data.hero.data} infos={data.infos.data}/>

  <!-- Pôles : philosophie, privatisations, terroir -->
  <Poles data={data.poles.data}/>

  <!-- Carte -->
  <Carte data={data.carte}/>

  <!-- Menus dégustation -->
  <Menus data={data.menus}/>

  <!-- CTA réservation -->
  <Cta data={data.cta.data} telephone={data.infos.data.telephone}/>

  <!-- Galerie -->
  <Galerie data={data.galerie}/>

  <!-- Avis -->
  <Avis data={data.avis.data}/>

  <!-- Événements -->
  <Evenements data={data.evenements}/>

  <!-- Actualités -->
  <Actualites data={data.actualites}/>

  <!-- Horaires -->
  <Horaires data={data.horaires.data} fermetures={data.alerte.data.fermetures}/>

  <!-- Infos pratiques -->
  <Infos data={data.infos.data}/>

  <!-- Socials -->
  <Socials data={data.socials.data}/>

  <!-- Partenaires -->
  <Partenaires data={data.partenaires}/>
</main>

<Footer infos={data.infos.data} socials={data.socials.data}/>

<style lang="scss">
  main { display: block; }
</style>
