<script>
  let { data } = $props();
</script>

<section class="menus" id="menus">
  <div class="wrap">
    <header>
      <span class="num" aria-hidden="true">10</span>
      <span class="eyebrow">— Menus dégustation —</span>
      <h2>Trois <em>chemins</em>, une même table.</h2>
    </header>

    <div class="grid">
      {#each data as menu, i}
        <article class="menu" style="--i: {i}">
          <header class="m-head">
            <span class="m-idx">{String(i+1).padStart(2,'0')}</span>
            <h3>{menu.name}</h3>
            <span class="m-price">
              <span class="cur">€</span>{menu.price}
              <span class="per">/ par convive</span>
            </span>
          </header>

          <ol class="services">
            {#each menu.data.sections as s, k}
              <li>
                <span class="dot"></span>
                <div>
                  <span class="t">{s.titre}</span>
                  <span class="c">{s.choix}</span>
                </div>
              </li>
            {/each}
          </ol>

          <footer>
            <a href="#cta" class="book">
              <span>Réserver ce menu</span>
              <span class="arr">↗</span>
            </a>
          </footer>
        </article>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .menus {
    background: var(--c-paper);
    color: var(--c-ink);
    padding: var(--sp-section) 0;
    position: relative;
    overflow: hidden;
    @include grain;
    &::before {
      content: 'AU GRÉ DU MARCHÉ — AU GRÉ DU MARCHÉ — AU GRÉ DU MARCHÉ — ';
      position: absolute;
      top: 4rem; left: -10%;
      font-family: var(--f-display);
      font-style: italic;
      font-size: clamp(3rem, 8vw, 6rem);
      color: var(--c-paper-deep);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0.7;
    }
  }
  .wrap { @include container; position: relative; z-index: 1; }
  header { margin-bottom: var(--sp-5); position: relative; }
  .num {
    position: absolute;
    top: -3rem; right: 0;
    font-family: var(--f-display);
    font-style: italic;
    font-size: var(--fs-numeral);
    color: var(--c-paper-deep);
    line-height: 0.85;
  }
  .eyebrow { @include eyebrow; color: var(--c-emerald); display: block; }
  h2 {
    @include display;
    font-size: var(--fs-3xl);
    color: var(--c-emerald-deep);
    margin: var(--sp-2) 0 0;
    em { font-style: italic; color: var(--c-gold-deep); }
  }

  .grid {
    display: grid;
    gap: var(--sp-3);
    grid-template-columns: 1fr;
    @include breakpoint('medium') { grid-template-columns: repeat(2, 1fr); }
    @include breakpoint('large') { grid-template-columns: repeat(3, 1fr); }
  }
  .menu {
    background: var(--c-bone);
    border: 1px solid var(--c-rule);
    padding: var(--sp-3);
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    transition: 0.4s var(--ease-out);
    position: relative;
    &:hover {
      transform: translateY(-6px);
      border-color: var(--c-gold);
      box-shadow: 0 30px 60px -30px rgba(15,77,58,0.25);
    }
    &:nth-child(2) {
      background: var(--c-emerald-deep);
      color: var(--c-paper);
      .m-idx, .per { color: var(--c-gold-light); }
      h3 { color: var(--c-paper); }
      .m-price { color: var(--c-gold-light); }
      .services .t { color: var(--c-gold-light); }
      .services .c { color: var(--c-paper); }
      .services .dot { background: var(--c-gold); }
      .book { color: var(--c-gold); }
      &::before {
        content: '★ Signature';
        position: absolute;
        top: -10px; right: var(--sp-3);
        background: var(--c-gold);
        color: var(--c-emerald-deep);
        @include eyebrow;
        padding: 0.3rem 0.7rem;
      }
    }
  }
  .m-head {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 0.75rem;
    border-bottom: 1px solid var(--c-rule);
    padding-bottom: var(--sp-2);
    .m-idx {
      @include eyebrow;
      color: var(--c-gold-deep);
      grid-row: span 2;
      align-self: start;
    }
    h3 {
      @include display;
      font-style: italic;
      font-size: var(--fs-xl);
      color: var(--c-emerald-deep);
      margin: 0;
    }
    .m-price {
      font-family: var(--f-mono);
      font-size: var(--fs-md);
      color: var(--c-gold-deep);
      letter-spacing: var(--tracking-mono);
      grid-column: 2;
      .cur { font-size: 0.7em; padding-right: 2px; }
      .per { font-size: var(--fs-xs); color: var(--c-muted); padding-left: 0.5rem; }
    }
  }
  .services {
    list-style: none;
    margin: 0; padding: 0;
    display: grid;
    gap: 0.75rem;
    flex: 1;
    li {
      display: grid;
      grid-template-columns: 8px 1fr;
      gap: 0.75rem;
      align-items: start;
    }
    .dot {
      width: 8px; height: 8px;
      background: var(--c-gold);
      margin-top: 0.5rem;
    }
    .t {
      @include eyebrow;
      color: var(--c-emerald);
      display: block;
    }
    .c {
      font-family: var(--f-display);
      font-size: var(--fs-sm);
      font-style: italic;
      color: var(--c-ink);
      display: block;
      line-height: 1.4;
    }
  }
  footer { border-top: 1px solid var(--c-rule); padding-top: var(--sp-2); }
  .book {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    @include eyebrow;
    color: var(--c-emerald);
    text-decoration: none;
    .arr { transition: transform 0.3s; }
    &:hover .arr { transform: translate(4px,-4px); }
  }
</style>
