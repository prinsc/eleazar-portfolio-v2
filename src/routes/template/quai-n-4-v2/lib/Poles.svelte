<script>
  let { data } = $props();
</script>

<section class="poles" id="poles">
  {#each data as pole, i}
    <article class="pole pole-{pole.layout}" class:flip={pole.flip}>
      <div class="num-bg" aria-hidden="true">{pole.num}</div>
      <div class="content">
        <div class="text">
          <span class="eyebrow">— {pole.sur} —</span>
          <h3>{pole.titre}</h3>
          <p>{pole.texte}</p>
          {#if pole.cta}
            <a class="cta" href={pole.cta.href}>
              <span class="line"></span>
              <span>{pole.cta.label}</span>
              <span class="arr">↗</span>
            </a>
          {/if}
        </div>
        <figure>
          <img src={pole.img} alt={pole.imgAlt} loading="lazy"/>
          {#if pole.layout === 'editorial'}
            <figcaption>
              <span class="cap-num">N°{pole.num}</span>
              <span class="cap-txt">{pole.imgAlt || pole.sur}</span>
            </figcaption>
          {/if}
        </figure>
      </div>
      {#if i < data.length - 1}<hr class="rule"/>{/if}
    </article>
  {/each}
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .poles {
    background: var(--c-paper);
    color: var(--c-ink);
    padding: var(--sp-section) 0;
    @include grain;
  }
  .pole {
    position: relative;
    @include container;
    padding-block: var(--sp-5);
    overflow: visible;
  }
  .num-bg {
    position: absolute;
    top: -2rem;
    left: var(--gutter);
    font-family: var(--f-display);
    font-style: italic;
    font-size: var(--fs-numeral);
    color: transparent;
    -webkit-text-stroke: 1px var(--c-gold);
    text-stroke: 1px var(--c-gold);
    line-height: 0.85;
    z-index: 0;
    pointer-events: none;
    user-select: none;
  }
  .content {
    position: relative;
    z-index: 1;
    display: grid;
    gap: var(--sp-4);
    grid-template-columns: 1fr;
    @include breakpoint('large') {
      gap: var(--sp-5);
    }
  }

  /* Layouts */
  .pole-classic .content {
    @include breakpoint('large') {
      grid-template-columns: 1fr 1.1fr;
      align-items: center;
    }
    figure { aspect-ratio: 4/5; }
  }
  .pole-classic.flip .content {
    @include breakpoint('large') {
      grid-template-columns: 1.1fr 1fr;
      .text { order: 2; }
      figure { order: 1; }
    }
  }

  .pole-editorial .content {
    @include breakpoint('large') {
      grid-template-columns: 0.9fr 1fr;
      align-items: end;
    }
    figure {
      aspect-ratio: 3/4;
      @include breakpoint('large') { aspect-ratio: 5/7; }
    }
    .text { padding-top: var(--sp-4); }
  }

  .pole-immersive {
    padding-inline: 0;
    max-width: none;
    .content {
      grid-template-columns: 1fr;
    }
    figure {
      aspect-ratio: 16/9;
      width: 100%;
      max-height: 70vh;
    }
    .text {
      @include container;
      max-width: 700px;
      text-align: center;
      h3 { margin-inline: auto; }
      p { margin-inline: auto; }
      .cta { justify-content: center; margin-inline: auto; }
    }
    .num-bg {
      left: 50%;
      transform: translateX(-50%);
      top: -3rem;
    }
  }

  .text {
    .eyebrow { @include eyebrow; color: var(--c-emerald); display: block; }
    h3 {
      @include display;
      font-size: var(--fs-2xl);
      color: var(--c-emerald-deep);
      margin: var(--sp-2) 0 var(--sp-3);
      max-width: 18ch;
    }
    p {
      font-family: var(--f-sans);
      font-size: var(--fs-md);
      line-height: 1.6;
      color: var(--c-ink);
      max-width: 50ch;
      margin: 0 0 var(--sp-3);
    }
  }

  figure {
    margin: 0;
    position: relative;
    overflow: hidden;
    background: var(--c-paper-deep);
    img {
      width: 100%; height: 100%;
      object-fit: cover;
      filter: contrast(1.05);
      transition: transform 1.2s var(--ease-out);
    }
    &:hover img { transform: scale(1.04); }
    figcaption {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      padding: 0.85rem 1rem;
      background: linear-gradient(transparent, rgba(8,44,32,0.7));
      color: var(--c-paper);
      display: flex; gap: 1rem; align-items: baseline;
      .cap-num { @include eyebrow; color: var(--c-gold-light); }
      .cap-txt { font-family: var(--f-display); font-style: italic; font-size: var(--fs-sm); }
    }
  }

  .cta {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: var(--c-emerald);
    font-family: var(--f-mono);
    font-size: var(--fs-xs);
    letter-spacing: var(--tracking-mono);
    text-transform: uppercase;
    padding: 0.5rem 0;
    .line {
      width: 36px; height: 1px; background: var(--c-gold);
      transition: width 0.4s var(--ease-out);
    }
    .arr { color: var(--c-gold-deep); transition: transform 0.3s; }
    &:hover {
      .line { width: 64px; }
      .arr { transform: translate(4px, -4px); }
    }
  }

  .rule {
    @include gold-rule;
    margin-top: var(--sp-5);
    opacity: 0.5;
  }
</style>
