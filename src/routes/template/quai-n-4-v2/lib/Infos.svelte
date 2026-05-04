<script>
  let { data } = $props();
</script>

<section class="infos" id="infos">
  <span class="num" aria-hidden="true">02</span>
  <div class="grid">
    <header class="head">
      <span class="eyebrow">— Carnet d'adresses —</span>
      <h2>
        <span>Une maison</span>
        <span class="it">au bord de la Dendre,</span>
        <span>simple à trouver,</span>
        <span class="it">difficile à quitter.</span>
      </h2>
    </header>

    <dl class="meta">
      <div>
        <dt>Adresse</dt>
        <dd>
          {data.adresseComplete}
          <a class="map" href={data.googleMapsUrl} target="_blank" rel="noopener">Itinéraire ↗</a>
        </dd>
      </div>
      <div>
        <dt>Téléphone</dt>
        <dd><a href="tel:{data.telephone.replace(/\s/g,'')}">{data.telephone}</a></dd>
      </div>
      <div>
        <dt>Courriel</dt>
        <dd><a href="mailto:{data.email}">{data.email}</a></dd>
      </div>
      <div>
        <dt>Site officiel</dt>
        <dd><a href={data.siteWeb} target="_blank" rel="noopener">{data.siteWeb.replace(/^https?:\/\//,'')}</a></dd>
      </div>
    </dl>

    <ul class="amen">
      {#if data.parking}<li><i></i><span>{data.parking}</span></li>{/if}
      {#if data.wifi}<li><i></i><span>Wi-Fi à disposition</span></li>{/if}
      {#if data.terrasse}<li><i></i><span>Terrasse en saison</span></li>{/if}
      {#if data.accesHandicape}<li><i></i><span>Accès PMR</span></li>{/if}
    </ul>
  </div>
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .infos {
    position: relative;
    padding: var(--sp-section) 0;
    background: var(--c-paper);
    color: var(--c-ink);
    @include grain;
  }
  .num {
    position: absolute;
    top: 1rem;
    right: var(--gutter);
    font-family: var(--f-display);
    font-style: italic;
    font-size: var(--fs-numeral);
    line-height: 0.85;
    color: var(--c-paper-deep);
    z-index: 0;
    user-select: none;
  }
  .grid {
    @include container;
    display: grid;
    gap: var(--sp-5);
    grid-template-columns: 1fr;
    position: relative;
    z-index: 1;
    @include breakpoint('large') {
      grid-template-columns: 1.2fr 1fr;
      grid-template-areas: 'head meta' 'amen meta';
      column-gap: var(--sp-5);
      row-gap: var(--sp-4);
    }
    @include breakpoint('large') {
      .head { grid-area: head; }
      .meta { grid-area: meta; align-self: start; }
      .amen { grid-area: amen; }
    }
  }
  .eyebrow { @include eyebrow; color: var(--c-emerald); margin-bottom: var(--sp-3); display: block; }
  h2 {
    @include display;
    font-size: var(--fs-2xl);
    color: var(--c-emerald-deep);
    margin: 0;
    span { display: block; }
    .it { font-style: italic; color: var(--c-gold-deep); padding-left: 1.2em; }
  }
  .meta {
    margin: 0;
    border-top: 1px solid var(--c-rule);
    div {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: var(--sp-2);
      padding: var(--sp-2) 0;
      border-bottom: 1px solid var(--c-rule);
      align-items: baseline;
    }
    dt { @include eyebrow; color: var(--c-emerald); margin: 0; }
    dd {
      margin: 0;
      font-family: var(--f-display);
      font-size: var(--fs-md);
      a { color: var(--c-emerald-deep); text-decoration: none; border-bottom: 1px solid var(--c-gold); }
      a:hover { color: var(--c-gold-deep); }
    }
    .map {
      display: block;
      @include eyebrow;
      color: var(--c-gold-deep);
      margin-top: 0.4rem;
      border: none !important;
    }
  }
  .amen {
    list-style: none;
    margin: 0; padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    li {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--f-mono);
      font-size: var(--fs-xs);
      letter-spacing: var(--tracking-mono);
      text-transform: uppercase;
      color: var(--c-emerald);
      padding: 0.4rem 0.75rem;
      border: 1px solid var(--c-gold);
      background: rgba(255,255,255,0.4);
      i {
        width: 6px; height: 6px; border-radius: 50%;
        background: var(--c-gold);
        display: inline-block;
      }
    }
  }
</style>
