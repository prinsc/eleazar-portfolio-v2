<script>
  let { data } = $props();
  const avis = data.avis ?? [];
  const min = data.avisMinStars?.value ?? 0;
  const filtered = avis.filter(a => a.note >= min);
  let active = $state(0);
</script>

<section class="avis" id="avis">
  <div class="wrap">
    <header>
      <span class="num" aria-hidden="true">06</span>
      <span class="eyebrow">— Ce qu'on en dit —</span>
      <h2>Lettres <em>reçues</em>.</h2>
    </header>

    <div class="stage">
      {#each filtered as a, i}
        <article class="quote" class:active={i === active}>
          <span class="guill" aria-hidden="true">«</span>
          <blockquote>{a.texte}</blockquote>
          <span class="guill close" aria-hidden="true">»</span>
          <footer>
            <img src={a.photo} alt="" loading="lazy"/>
            <div>
              <span class="auth">{a.auteur}</span>
              <span class="meta">
                <span class="stars">{'★'.repeat(a.note)}<span class="dim">{'★'.repeat(5-a.note)}</span></span>
                <span class="date">— {new Date(a.date).toLocaleDateString('fr-FR',{month:'long',year:'numeric'})}</span>
              </span>
            </div>
          </footer>
        </article>
      {/each}
    </div>

    <nav class="nav">
      {#each filtered as a, i}
        <button onclick={() => active = i} aria-label="Avis de {a.auteur}" class:on={i === active}>
          <span class="dot"></span>
          <span class="n">{String(i+1).padStart(2,'0')}</span>
          <span class="who">{a.auteur.split(' ')[0]}</span>
        </button>
      {/each}
    </nav>
  </div>
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .avis {
    background: var(--c-paper);
    color: var(--c-ink);
    padding: var(--sp-section) 0;
    position: relative;
    overflow: hidden;
    @include grain;
  }
  .wrap { @include container; }
  header { position: relative; margin-bottom: var(--sp-5); }
  .num {
    position: absolute;
    top: -2.5rem; left: -0.3em;
    font-family: var(--f-display);
    font-style: italic;
    font-size: var(--fs-numeral);
    color: var(--c-paper-deep);
    z-index: 0; line-height: 0.85;
  }
  .eyebrow { @include eyebrow; color: var(--c-emerald); display: block; position: relative; }
  h2 {
    @include display;
    font-size: var(--fs-3xl);
    color: var(--c-emerald-deep);
    margin: var(--sp-2) 0 0;
    position: relative;
    em { font-style: italic; color: var(--c-gold-deep); }
  }

  .stage {
    position: relative;
    min-height: 320px;
    margin-bottom: var(--sp-4);
  }
  .quote {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: var(--sp-3);
    align-items: start;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
    pointer-events: none;
    &.active { opacity: 1; transform: none; pointer-events: auto; }
  }
  .guill {
    @include display;
    font-style: italic;
    font-size: clamp(6rem, 14vw, 11rem);
    line-height: 0.7;
    color: var(--c-gold);
    &.close { align-self: end; }
  }
  blockquote {
    @include display;
    font-style: italic;
    font-size: clamp(1.5rem, 3.2vw, 2.4rem);
    line-height: 1.25;
    color: var(--c-emerald-deep);
    margin: 1rem 0;
    max-width: 30ch;
  }
  footer {
    grid-column: 2 / 3;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 56px; height: 56px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid var(--c-gold);
    }
    .auth { @include display; font-style: italic; font-size: var(--fs-md); display: block; color: var(--c-emerald-deep); }
    .meta { display: flex; gap: 0.6rem; align-items: baseline; }
    .stars { color: var(--c-gold); font-size: var(--fs-sm); .dim { opacity: 0.25; } }
    .date { @include eyebrow; }
  }

  .nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    border-top: 1px solid var(--c-rule);
    padding-top: var(--sp-3);
    button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: transparent;
      border: 1px solid var(--c-rule);
      padding: 0.5rem 0.9rem;
      cursor: pointer;
      font-family: var(--f-mono);
      font-size: var(--fs-xs);
      letter-spacing: var(--tracking-mono);
      text-transform: uppercase;
      color: var(--c-muted);
      transition: 0.3s;
      &:hover { color: var(--c-emerald); border-color: var(--c-gold); }
      &.on {
        background: var(--c-emerald-deep);
        color: var(--c-gold-light);
        border-color: var(--c-emerald-deep);
        .dot { background: var(--c-gold); }
      }
      .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c-rule); }
    }
  }
</style>
