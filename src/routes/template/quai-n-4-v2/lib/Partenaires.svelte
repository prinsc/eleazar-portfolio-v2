<script>
  let { data } = $props();
  const sorted = [...data].sort((a,b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  const loop = [...sorted, ...sorted, ...sorted];
</script>

<section class="partenaires" id="partenaires">
  <div class="head">
    <div class="wrap-h">
      <span class="num" aria-hidden="true">14</span>
      <span class="eyebrow">— Compagnons de route —</span>
      <h2>Nos <em>partenaires</em>.</h2>
      <p>Producteurs, vignerons, artisans et institutions sans qui rien de tout cela n'aurait de sens.</p>
    </div>
  </div>

  <div class="strip">
    <div class="track">
      {#each loop as p, i}
        <a href={p.url} target="_blank" rel="noopener" class="logo" title={p.name}>
          <img src={p.logo} alt={p.name} loading="lazy"/>
          <span>{p.name}</span>
        </a>
        <span class="sep" aria-hidden="true">✦</span>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .partenaires {
    background: var(--c-paper);
    color: var(--c-ink);
    padding: var(--sp-section) 0 0;
    position: relative;
    @include grain;
  }
  .head { padding-bottom: var(--sp-4); position: relative; }
  .wrap-h { @include container; position: relative; }
  .num {
    position: absolute;
    top: -3rem; left: -0.2em;
    font-family: var(--f-display);
    font-style: italic;
    font-size: var(--fs-numeral);
    color: var(--c-paper-deep);
    line-height: 0.85;
    z-index: 0;
  }
  .eyebrow { @include eyebrow; color: var(--c-emerald); display: block; position: relative; }
  h2 {
    @include display;
    font-size: var(--fs-3xl);
    color: var(--c-emerald-deep);
    margin: var(--sp-2) 0;
    position: relative;
    em { font-style: italic; color: var(--c-gold-deep); }
  }
  p {
    font-family: var(--f-display);
    font-style: italic;
    font-size: var(--fs-md);
    color: var(--c-muted);
    max-width: 50ch;
    margin: 0;
  }

  .strip {
    background: var(--c-emerald-deep);
    color: var(--c-paper);
    padding-block: 2.5rem;
    overflow: hidden;
    border-block: 1px solid var(--c-gold-deep);
  }
  .track {
    display: flex;
    align-items: center;
    gap: 3rem;
    width: max-content;
    animation: marquee 60s linear infinite;
    &:hover { animation-play-state: paused; }
  }
  .logo {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: var(--c-paper);
    transition: color 0.3s;
    img {
      width: 56px; height: 56px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid var(--c-gold);
      filter: grayscale(1) contrast(1.1);
      transition: filter 0.3s;
    }
    span {
      @include display;
      font-style: italic;
      font-size: var(--fs-md);
    }
    &:hover {
      color: var(--c-gold-light);
      img { filter: none; }
    }
  }
  .sep { color: var(--c-gold); font-size: 0.8rem; opacity: 0.6; }
  @keyframes marquee { to { transform: translateX(-33.33%); } }
</style>
