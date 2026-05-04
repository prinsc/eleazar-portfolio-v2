<script>
  let { data } = $props();
  const fmtDay = (d) => new Date(d).toLocaleDateString('fr-FR',{day:'2-digit'});
  const fmtMonth = (d) => new Date(d).toLocaleDateString('fr-FR',{month:'short'}).replace('.','');
  const fmtYear = (d) => new Date(d).getFullYear();
  const fmtFull = (d) => new Date(d).toLocaleDateString('fr-FR',{weekday:'long', day:'numeric', month:'long', year:'numeric'});
</script>

<section class="ev" id="evenements">
  <div class="wrap">
    <header>
      <span class="num" aria-hidden="true">12</span>
      <span class="eyebrow">— Soirées & rendez-vous —</span>
      <h2>Les <em>moments</em> à venir.</h2>
    </header>

    <ol class="timeline">
      {#each data as e, i}
        <li class="event">
          <div class="date">
            <span class="day">{fmtDay(e.date)}</span>
            <span class="mo">{fmtMonth(e.date)}</span>
            <span class="yr">{fmtYear(e.date)}</span>
          </div>
          <div class="line"><span class="bullet"></span></div>
          <article class="card">
            <figure>
              <img src={e.image} alt={e.title} loading="lazy"/>
            </figure>
            <div class="body">
              <span class="when">— {fmtFull(e.date)} —</span>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <a href="#cta" class="link">
                <span class="lin"></span>
                <span>Réserver une place</span>
                <span class="arr">↗</span>
              </a>
            </div>
          </article>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .ev {
    background: var(--c-paper);
    color: var(--c-ink);
    padding: var(--sp-section) 0;
    @include grain;
  }
  .wrap { @include container; }
  header { margin-bottom: var(--sp-5); position: relative; }
  .num {
    position: absolute;
    top: -2.5rem; right: 0;
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

  .timeline {
    list-style: none;
    margin: 0; padding: 0;
    display: grid;
    gap: var(--sp-4);
  }
  .event {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 1rem;
    @include breakpoint('medium') {
      grid-template-columns: 110px 32px 1fr;
      gap: 1.5rem;
    }
  }
  .date {
    display: flex;
    flex-direction: column;
    text-align: right;
    align-items: end;
    border-right: 1px solid var(--c-gold);
    padding-right: 1rem;
    @include breakpoint('medium') { border: none; padding: 0; }
    .day {
      @include display;
      font-style: italic;
      font-size: clamp(2.5rem, 5vw, 4rem);
      color: var(--c-emerald-deep);
      line-height: 0.85;
    }
    .mo { @include eyebrow; color: var(--c-gold-deep); margin-top: 0.4rem; }
    .yr {
      font-family: var(--f-mono);
      font-size: var(--fs-xs);
      color: var(--c-muted);
    }
  }
  .line {
    display: none;
    @include breakpoint('medium') {
      display: block;
      position: relative;
      width: 1px;
      background: var(--c-gold);
      justify-self: center;
      .bullet {
        position: absolute;
        top: 1.5rem;
        left: 50%;
        width: 14px; height: 14px;
        background: var(--c-emerald-deep);
        border: 2px solid var(--c-gold);
        border-radius: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .card {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    background: var(--c-bone);
    border: 1px solid var(--c-rule);
    padding: 1rem;
    @include breakpoint('medium') {
      grid-template-columns: 240px 1fr;
      padding: 1.25rem;
    }
    transition: 0.4s var(--ease-out);
    &:hover {
      border-color: var(--c-gold);
      background: #fff;
    }
  }
  figure {
    margin: 0;
    aspect-ratio: 4/3;
    overflow: hidden;
    background: var(--c-paper-deep);
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  .body {
    .when { @include eyebrow; color: var(--c-gold-deep); display: block; }
    h3 {
      @include display;
      font-size: var(--fs-xl);
      color: var(--c-emerald-deep);
      margin: 0.5rem 0;
    }
    p {
      font-family: var(--f-sans);
      font-size: var(--fs-sm);
      line-height: 1.55;
      color: var(--c-muted);
      margin: 0 0 1rem;
    }
  }
  .link {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    @include eyebrow;
    color: var(--c-emerald);
    text-decoration: none;
    .lin { width: 24px; height: 1px; background: var(--c-gold); transition: width 0.4s; }
    &:hover .lin { width: 48px; }
  }
</style>
