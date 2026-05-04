<script>
  let { data } = $props();
  let activeCat = $state(0);
</script>

<section class="carte" id="carte">
  <div class="wrap">
    <header>
      <span class="num" aria-hidden="true">09</span>
      <span class="eyebrow">— La carte —</span>
      <h2>L'écriture <em>du moment</em>.</h2>
      <p class="lede">Une carte courte, ajustée chaque mois au rythme du marché et de l'humeur des chefs. Les prix s'entendent service compris.</p>
    </header>

    <nav class="tabs">
      {#each data.categories as cat, i}
        <button class:on={i === activeCat} onclick={() => activeCat = i}>
          <span class="t-num">{String(i+1).padStart(2,'0')}</span>
          <span class="t-name">{cat.name}</span>
        </button>
      {/each}
    </nav>

    {#each data.categories as cat, i}
      <div class="cat" hidden={i !== activeCat}>
        {#if cat.note}
          <p class="note"><em>« {cat.note} »</em></p>
        {/if}

        <ul class="items">
          {#each cat.items as it}
            <li>
              <div class="row">
                <span class="dish">{it.name}</span>
                <span class="leader" aria-hidden="true"></span>
                <span class="price">{it.price}<span class="cur">€</span></span>
              </div>
              {#if it.description}<p class="desc">{it.description}</p>{/if}
            </li>
          {/each}
        </ul>

        {#each cat.subcategories ?? [] as sub}
          <h4 class="sub-title"><span>—</span> {sub.name} <span>—</span></h4>
          <ul class="items sub">
            {#each sub.items as it}
              <li>
                <div class="row">
                  <span class="dish">{it.name}</span>
                  <span class="leader" aria-hidden="true"></span>
                  <span class="price">{it.price}<span class="cur">€</span></span>
                </div>
                {#if it.description}<p class="desc">{it.description}</p>{/if}
              </li>
            {/each}
          </ul>
        {/each}
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .carte {
    background: var(--c-bone);
    color: var(--c-ink);
    padding: var(--sp-section) 0;
    position: relative;
    @include grain;
  }
  .wrap { @include container; max-width: 1100px; }
  header {
    position: relative;
    text-align: center;
    margin-bottom: var(--sp-5);
  }
  .num {
    position: absolute;
    top: -3rem; left: 50%;
    transform: translateX(-50%);
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
    margin: var(--sp-2) 0 var(--sp-2);
    position: relative;
    em { font-style: italic; color: var(--c-gold-deep); }
  }
  .lede {
    font-family: var(--f-display);
    font-style: italic;
    font-size: var(--fs-md);
    color: var(--c-muted);
    max-width: 50ch;
    margin: 0 auto;
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0;
    border-block: 1px solid var(--c-rule);
    margin-bottom: var(--sp-5);
    button {
      flex: 1 1 auto;
      min-width: 200px;
      background: transparent;
      border: none;
      border-right: 1px solid var(--c-rule);
      padding: 1.25rem 1rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      transition: background 0.3s;
      &:last-child { border-right: none; }
      .t-num { @include eyebrow; color: var(--c-gold-deep); }
      .t-name { @include display; font-style: italic; font-size: var(--fs-lg); color: var(--c-emerald-deep); }
      &:hover { background: rgba(184,148,90,0.06); }
      &.on {
        background: var(--c-emerald-deep);
        .t-num { color: var(--c-gold-light); }
        .t-name { color: var(--c-paper); }
      }
    }
  }

  .note {
    @include eyebrow;
    text-align: center;
    color: var(--c-gold-deep);
    margin: 0 0 var(--sp-4);
    em { font-family: var(--f-display); font-size: var(--fs-sm); text-transform: none; letter-spacing: 0; }
  }

  .items {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: var(--sp-3);
    li { padding-bottom: var(--sp-2); }
  }
  .row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: end;
    gap: 0.75rem;
  }
  .dish {
    @include display;
    font-size: var(--fs-lg);
    color: var(--c-emerald-deep);
    line-height: 1.2;
  }
  .leader {
    border-bottom: 1px dotted var(--c-gold);
    height: 0.65em;
    transform: translateY(-2px);
  }
  .price {
    font-family: var(--f-mono);
    font-size: var(--fs-base);
    color: var(--c-gold-deep);
    letter-spacing: var(--tracking-mono);
    .cur { padding-left: 2px; opacity: 0.7; }
  }
  .desc {
    font-family: var(--f-sans);
    font-size: var(--fs-sm);
    color: var(--c-muted);
    margin: 0.4rem 0 0;
    font-style: italic;
    max-width: 60ch;
  }

  .sub-title {
    @include eyebrow;
    text-align: center;
    color: var(--c-gold-deep);
    margin: var(--sp-4) 0 var(--sp-3);
    span { color: var(--c-gold); padding: 0 0.5rem; }
  }
</style>
