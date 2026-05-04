<script>
  let { children } = $props();
</script>

<svelte:head>
  <title>Quai n°4 — Restaurant gastronomique étoilé · Ath</title>
  <meta name="description" content="Restaurant gastronomique étoilé au Guide Michelin, au cœur d'Ath. Maxence Bouralha & Charles-Maxime Legrand."/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
  <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300..900;1,6..96,300..900&family=Fira+Mono:wght@400;500;700&display=swap" rel="stylesheet"/>
  <!-- Satoshi via Fontshare -->
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet"/>
</svelte:head>

<div class="qn4-root">
  {@render children()}
</div>

<style lang="scss">
  @use './lib/styles/tokens';
  :global(body) { margin: 0; }
  :global(.qn4-root *) {
    box-sizing: border-box;
  }
  :global(.qn4-root) {
    font-family: 'Satoshi', 'Inter', system-ui, sans-serif;
    color: #0c1f18;
    background: #f5f0e6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  :global(.qn4-root img) { display: block; max-width: 100%; }
  :global(.qn4-root a) { color: inherit; }
  :global(.qn4-root h1, .qn4-root h2, .qn4-root h3, .qn4-root h4) {
    font-family: 'Bodoni Moda', serif;
    font-weight: 400;
  }
  :global(.qn4-root::selection),
  :global(.qn4-root *::selection) {
    background: #0f4d3a;
    color: #f5f0e6;
  }
</style>
