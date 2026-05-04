<script>
  let { telephone } = $props();
  let scrolled = $state(false);
  let open = $state(false);

  $effect(() => {
    const onScroll = () => { scrolled = window.scrollY > 60; };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  const links = [
    { h: '#carte', l: 'La carte', n: '01' },
    { h: '#menus', l: 'Menus', n: '02' },
    { h: '#galerie', l: 'Galerie', n: '03' },
    { h: '#evenements', l: 'Événements', n: '04' },
    { h: '#actualites', l: 'Journal', n: '05' },
    { h: '#infos', l: 'Nous trouver', n: '06' }
  ];
</script>

<header class="nav" class:scrolled>
  <a href="#hero" class="brand">
    <span class="mono">★</span>
    <span class="name">Quai n°<em>4</em></span>
  </a>

  <nav class="primary">
    {#each links as l}
      <a href={l.h}><span class="ln">{l.n}</span><span>{l.l}</span></a>
    {/each}
  </nav>

  <a href="#cta" class="reserve">
    <span>Réserver</span>
    <span class="dot">●</span>
  </a>

  <button class="burger" onclick={() => open = !open} aria-label="Menu">
    <span class:open></span><span class:open></span>
  </button>
</header>

{#if open}
  <div class="drawer" onclick={() => open = false}>
    <nav>
      {#each links as l}
        <a href={l.h} onclick={() => open = false}>
          <span class="ln">{l.n}</span>
          <span class="lbl">{l.l}</span>
        </a>
      {/each}
      <a href="tel:{telephone.replace(/\s/g,'')}" class="tel">{telephone}</a>
    </nav>
  </div>
{/if}

<style lang="scss">
  @use './styles/mixins' as *;
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    padding: 0.75rem var(--gutter);
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    gap: 1rem;
    background: rgba(245,240,230,0.0);
    backdrop-filter: blur(0);
    transition: background 0.4s, backdrop-filter 0.4s, padding 0.4s;
    border-bottom: 1px solid transparent;
    &.scrolled {
      background: rgba(245,240,230,0.92);
      backdrop-filter: blur(14px);
      border-bottom-color: var(--c-rule);
      padding-block: 0.5rem;
    }
  }
  .brand {
    display: inline-flex;
    align-items: baseline;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--c-emerald-deep);
    .mono { color: var(--c-gold); font-size: 0.9rem; }
    .name {
      @include display;
      font-size: var(--fs-lg);
      em { font-style: italic; color: var(--c-gold-deep); }
    }
  }
  .primary {
    display: none;
    @include breakpoint('large') {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
    }
    a {
      display: inline-flex;
      align-items: baseline;
      gap: 0.4rem;
      text-decoration: none;
      color: var(--c-emerald-deep);
      font-family: var(--f-sans);
      font-size: var(--fs-sm);
      transition: color 0.3s;
      .ln { font-family: var(--f-mono); font-size: 0.65rem; color: var(--c-gold-deep); letter-spacing: var(--tracking-mono); }
      &:hover { color: var(--c-gold-deep); }
    }
  }
  .reserve {
    display: none;
    @include breakpoint('medium') {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.55rem 1rem;
      background: var(--c-emerald-deep);
      color: var(--c-paper);
      text-decoration: none;
      @include eyebrow;
      color: var(--c-gold-light);
      transition: background 0.3s;
      .dot { color: var(--c-gold); animation: blink 1.6s infinite; }
      &:hover { background: var(--c-emerald); }
    }
  }
  @keyframes blink { 50% { opacity: 0.3; } }

  .burger {
    @include breakpoint('large') { display: none; }
    background: transparent;
    border: 1px solid var(--c-emerald-deep);
    width: 40px; height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    align-items: center;
    cursor: pointer;
    span {
      width: 18px; height: 1px; background: var(--c-emerald-deep);
      transition: 0.3s;
      &.open:first-child { transform: translateY(2.5px) rotate(45deg); }
      &.open:last-child { transform: translateY(-2.5px) rotate(-45deg); }
    }
  }

  .drawer {
    position: fixed;
    inset: 0;
    background: var(--c-emerald-deep);
    z-index: 49;
    display: flex;
    align-items: center;
    justify-content: center;
    nav {
      display: grid;
      gap: 1.5rem;
      text-align: center;
      a {
        display: block;
        text-decoration: none;
        color: var(--c-paper);
        .ln { @include eyebrow; color: var(--c-gold-light); display: block; }
        .lbl {
          @include display;
          font-style: italic;
          font-size: clamp(2rem, 6vw, 3.5rem);
          color: var(--c-gold-light);
        }
      }
      .tel {
        @include eyebrow;
        color: var(--c-gold);
        margin-top: 1rem;
      }
    }
  }
</style>
