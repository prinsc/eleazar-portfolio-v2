<script>
  let { infos, socials = [] } = $props();
  const year = new Date().getFullYear();
</script>

<footer class="ft">
  <div class="marquee" aria-hidden="true">
    <div class="track">
      {#each Array(6) as _}
        <span><em>Quai n°4</em> · Ath · ★ Guide Michelin · Depuis MMXXII · </span>
      {/each}
    </div>
  </div>

  <div class="wrap">
    <div class="brand">
      <span class="mono">★</span>
      <span class="name">Quai n°<em>4</em></span>
      <p>{infos.description}</p>
    </div>

    <div class="col">
      <span class="h">Adresse</span>
      <address>
        {infos.adresseComplete}<br/>
        {infos.pays}
      </address>
    </div>

    <div class="col">
      <span class="h">Contact</span>
      <a href="tel:{infos.telephone.replace(/\s/g,'')}">{infos.telephone}</a>
      <a href="mailto:{infos.email}">{infos.email}</a>
    </div>

    <div class="col">
      <span class="h">Suivre</span>
      {#each socials.filter(s => s.actif) as s}
        <a href={s.url} target="_blank" rel="noopener">{s.label} ↗</a>
      {/each}
    </div>
  </div>

  <div class="base">
    <span>© {year} {infos.nom} — Tous droits réservés</span>
    <span>Site sur mesure · maquette KLTK Studio</span>
  </div>
</footer>

<style lang="scss">
  @use './styles/mixins' as *;
  .ft {
    background: #06170f;
    color: var(--c-paper);
    @include grain;
  }
  .marquee {
    overflow: hidden;
    border-block: 1px solid var(--c-gold-deep);
    padding-block: 1.5rem;
    .track {
      display: flex;
      width: max-content;
      animation: m 35s linear infinite;
      gap: 2rem;
      @include display;
      font-style: italic;
      font-size: clamp(2rem, 5vw, 3.5rem);
      color: var(--c-gold-deep);
      em { color: var(--c-gold-light); font-style: italic; }
    }
  }
  @keyframes m { to { transform: translateX(-50%); } }

  .wrap {
    @include container;
    padding-block: var(--sp-5);
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--sp-4);
    @include breakpoint('medium') {
      grid-template-columns: 1.5fr 1fr 1fr 1fr;
    }
  }
  .brand {
    .mono { color: var(--c-gold); margin-right: 0.5rem; }
    .name {
      @include display;
      font-size: var(--fs-xl);
      em { font-style: italic; color: var(--c-gold-light); }
    }
    p {
      font-family: var(--f-sans);
      font-size: var(--fs-sm);
      color: var(--c-paper);
      opacity: 0.7;
      max-width: 36ch;
      line-height: 1.55;
      margin-top: 1rem;
    }
  }
  .col {
    .h { @include eyebrow; color: var(--c-gold); display: block; margin-bottom: 1rem; }
    address, a {
      display: block;
      font-family: var(--f-sans);
      font-size: var(--fs-sm);
      color: var(--c-paper);
      text-decoration: none;
      font-style: normal;
      line-height: 1.6;
      transition: color 0.3s;
      &:hover { color: var(--c-gold-light); }
    }
  }
  .base {
    @include container;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    @include breakpoint('medium') { flex-direction: row; justify-content: space-between; }
    border-top: 1px solid var(--c-emerald);
    padding-block: 1.25rem;
    @include eyebrow;
    color: var(--c-gold-deep);
  }
</style>
