<script>
  let { data, telephone } = $props();
  const r = data.reservation;
  const href = r.methode === 'tel' ? `tel:${r.url}` : r.methode === 'email' ? `mailto:${r.url}` : r.url;
</script>

<section class="cta" id="cta">
  <div class="wrap">
    <span class="num" aria-hidden="true">04</span>
    <span class="eyebrow">— Une table vous attend —</span>
    <h2>
      <span>Réservez,</span>
      <em>nous orchestrons</em>
      <span>le reste.</span>
    </h2>
    <p>Service du midi à 12h, du soir à 19h. Pour les groupes au-delà de 6, ou pour une demande sur mesure, un appel reste la voie la plus juste.</p>

    <div class="actions">
      <a class="primary" href={href} target="_blank" rel="noopener">
        <span>{r.label}</span>
        <span class="arr">↗</span>
      </a>
      <a class="ghost" href="tel:{telephone.replace(/\s/g,'')}">
        <span class="lbl">Ou par téléphone</span>
        <span class="num-tel">{telephone}</span>
      </a>
    </div>

    <hr class="rule"/>
    <span class="signature">— La maison ouvre dès 11h pour vos appels —</span>
  </div>
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .cta {
    background: var(--c-emerald);
    color: var(--c-paper);
    padding: var(--sp-section) 0;
    position: relative;
    overflow: hidden;
    @include grain;
    &::before {
      content: 'RÉSERVATION · RÉSERVATION · RÉSERVATION · RÉSERVATION · ';
      position: absolute;
      bottom: -2.5rem;
      left: 0; right: 0;
      font-family: var(--f-display);
      font-style: italic;
      font-size: clamp(5rem, 14vw, 12rem);
      color: var(--c-emerald-soft);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0.5;
      line-height: 1;
    }
  }
  .wrap { @include container; position: relative; z-index: 1; max-width: 1100px; }
  .num {
    font-family: var(--f-mono);
    font-size: var(--fs-xs);
    color: var(--c-gold);
    letter-spacing: var(--tracking-mono);
  }
  .eyebrow { @include eyebrow; color: var(--c-gold-light); display: block; margin-top: 0.5rem; }
  h2 {
    @include display;
    font-size: var(--fs-3xl);
    margin: var(--sp-3) 0 var(--sp-2);
    span { display: inline; }
    em { font-style: italic; color: var(--c-gold-light); display: block; padding-left: 1.5em; }
  }
  p {
    font-family: var(--f-display);
    font-style: italic;
    font-size: var(--fs-md);
    max-width: 50ch;
    line-height: 1.5;
    color: var(--c-paper);
    opacity: 0.85;
    margin: 0 0 var(--sp-4);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-3);
    align-items: stretch;
  }
  .primary {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    background: var(--c-gold);
    color: var(--c-emerald-deep);
    padding: 1.25rem 2rem;
    font-family: var(--f-mono);
    font-size: var(--fs-sm);
    letter-spacing: var(--tracking-mono);
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid var(--c-gold);
    transition: background 0.3s, transform 0.3s;
    .arr { font-size: 1.2em; transition: transform 0.3s; }
    &:hover {
      background: var(--c-gold-light);
      .arr { transform: translate(4px, -4px); }
    }
  }
  .ghost {
    display: inline-flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem 1.5rem;
    border: 1px solid var(--c-gold);
    color: var(--c-paper);
    text-decoration: none;
    .lbl { @include eyebrow; color: var(--c-gold-light); }
    .num-tel { font-family: var(--f-display); font-size: var(--fs-lg); font-style: italic; }
    &:hover { background: rgba(184,148,90,0.1); }
  }

  .rule { @include gold-rule; margin: var(--sp-4) 0 var(--sp-2); }
  .signature {
    @include eyebrow;
    color: var(--c-gold-light);
  }
</style>
