<script>
  let { data } = $props();
  const fmt = (d) => new Date(d).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
</script>

<section class="news" id="actualites">
  <div class="wrap">
    <header class="head">
      <div class="masthead">
        <span class="paper">— Le Journal du Quai —</span>
        <h2>Actualités</h2>
        <span class="ed">Édition n°{String(new Date().getFullYear())} · Imprimé à Ath</span>
      </div>
      <hr/>
    </header>

    <div class="cols">
      {#each data as n, i}
        <article class="art" class:lead={i === 0}>
          {#if i === 0}
            <figure><img src={n.image} alt={n.title} loading="lazy"/></figure>
          {/if}
          <span class="kicker">— {fmt(n.date)} —</span>
          <h3>{n.title}</h3>
          {#if i !== 0 && n.image}
            <figure class="thumb"><img src={n.image} alt={n.title} loading="lazy"/></figure>
          {/if}
          <p class="dropcap">{n.summary}</p>
          {#if i === 0}
            <p class="body">{n.content}</p>
          {/if}
          <a class="more" href="#">Lire la suite <span>→</span></a>
        </article>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .news {
    background: var(--c-bone);
    color: var(--c-ink);
    padding: var(--sp-section) 0;
    @include grain;
  }
  .wrap { @include container; max-width: 1240px; }
  .head { margin-bottom: var(--sp-5); }
  .masthead {
    text-align: center;
    .paper { @include eyebrow; color: var(--c-gold-deep); }
    h2 {
      @include display;
      font-style: italic;
      font-size: clamp(3rem, 8vw, 5.5rem);
      color: var(--c-emerald-deep);
      margin: 0.5rem 0 0.25rem;
    }
    .ed {
      font-family: var(--f-mono);
      font-size: var(--fs-xs);
      letter-spacing: var(--tracking-mono);
      color: var(--c-muted);
    }
  }
  hr { @include gold-rule; margin-top: var(--sp-3); }

  .cols {
    display: grid;
    gap: var(--sp-4);
    grid-template-columns: 1fr;
    @include breakpoint('medium') { grid-template-columns: 1fr 1fr; }
    @include breakpoint('large') { grid-template-columns: 1.6fr 1fr 1fr; }
  }
  .art {
    border-right: none;
    padding-right: 0;
    column-gap: 1.5rem;
    @include breakpoint('medium') {
      &:not(:last-child) {
        border-right: 1px solid var(--c-rule);
        padding-right: 1.5rem;
      }
    }
    &.lead {
      grid-row: span 1;
      figure {
        margin: 0 0 1rem;
        aspect-ratio: 16/10;
        overflow: hidden;
        img { width: 100%; height: 100%; object-fit: cover; }
      }
    }
    .thumb {
      margin: 0 0 0.75rem;
      aspect-ratio: 4/3;
      overflow: hidden;
      img { width: 100%; height: 100%; object-fit: cover; }
    }
    .kicker { @include eyebrow; color: var(--c-gold-deep); display: block; }
    h3 {
      @include display;
      font-size: var(--fs-xl);
      color: var(--c-emerald-deep);
      margin: 0.5rem 0 0.75rem;
      line-height: 1.05;
    }
    &.lead h3 {
      font-size: clamp(2rem, 4vw, 2.8rem);
      font-style: italic;
    }
    .dropcap {
      font-family: var(--f-display);
      font-size: var(--fs-md);
      line-height: 1.5;
      color: var(--c-ink);
      margin: 0 0 0.75rem;
      &::first-letter {
        font-family: var(--f-display);
        font-style: italic;
        font-size: 3em;
        float: left;
        line-height: 0.85;
        padding: 0.1em 0.1em 0 0;
        color: var(--c-gold-deep);
      }
    }
    .body {
      font-family: var(--f-sans);
      font-size: var(--fs-sm);
      line-height: 1.65;
      color: var(--c-muted);
      margin: 0 0 1rem;
    }
    .more {
      @include eyebrow;
      color: var(--c-emerald);
      text-decoration: none;
      border-bottom: 1px solid var(--c-gold);
      padding-bottom: 2px;
      span { padding-left: 0.3rem; transition: padding-left 0.3s; }
      &:hover span { padding-left: 0.7rem; }
    }
  }
</style>
