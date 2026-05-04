<script>
  let { data, fermetures = [] } = $props();
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
  const isToday = (j) => j.toLowerCase() === today.toLowerCase();
</script>

<section class="horaires" id="horaires">
  <div class="wrap">
    <header>
      <span class="num" aria-hidden="true">03</span>
      <span class="eyebrow">— Le rythme des services —</span>
      <h2>Heures <em>d'ouverture</em></h2>
      <p class="lede">Mercredi au samedi, midi et soir. Les lundis et mardis, la maison se repose pour mieux vous accueillir le lendemain.</p>
    </header>

    <ol class="week">
      {#each data as jour, i}
        <li class="day" class:closed={jour.ferme} class:today={isToday(jour.j)}>
          <span class="idx">{String(i+1).padStart(2,'0')}</span>
          <span class="name">{jour.j}</span>
          <span class="periods">
            {#if jour.ferme}
              <span class="off">— fermé —</span>
            {:else}
              {#each jour.periodes as p, k}
                <span class="p">{p.debut} <em>→</em> {p.fin}</span>
                {#if k < jour.periodes.length - 1}<span class="amp">+</span>{/if}
              {/each}
            {/if}
          </span>
          {#if isToday(jour.j) && !jour.ferme}<span class="now">aujourd'hui</span>{/if}
        </li>
      {/each}
    </ol>

    {#if fermetures.length}
      <aside class="ferm">
        <span class="eyebrow">— Prochaines fermetures —</span>
        <ul>
          {#each fermetures as f}
            <li><time>{new Date(f.date).toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'})}</time><span>{f.motif}</span></li>
          {/each}
        </ul>
      </aside>
    {/if}
  </div>
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .horaires {
    background: var(--c-emerald-deep);
    color: var(--c-paper);
    padding: var(--sp-section) 0;
    position: relative;
    overflow: hidden;
    @include grain;
    &::before {
      content: '';
      position: absolute;
      inset: auto -20% -30% auto;
      width: 60%;
      aspect-ratio: 1;
      background: radial-gradient(circle, rgba(184,148,90,0.18), transparent 60%);
      pointer-events: none;
    }
  }
  .wrap { @include container; position: relative; z-index: 1; display: grid; gap: var(--sp-5); }
  header { position: relative; }
  .num {
    position: absolute;
    top: -3rem; right: 0;
    font-family: var(--f-display);
    font-style: italic;
    font-size: var(--fs-numeral);
    color: var(--c-emerald-soft);
    opacity: 0.4;
    line-height: 0.85;
  }
  .eyebrow { @include eyebrow; color: var(--c-gold-light); }
  h2 {
    @include display;
    font-size: var(--fs-3xl);
    margin: var(--sp-2) 0;
    em { font-style: italic; color: var(--c-gold-light); }
  }
  .lede {
    font-family: var(--f-display);
    font-style: italic;
    font-size: var(--fs-md);
    max-width: 50ch;
    color: var(--c-paper);
    opacity: 0.85;
    margin: 0;
  }

  .week {
    list-style: none;
    margin: 0; padding: 0;
    border-top: 1px solid var(--c-gold-deep);
  }
  .day {
    display: grid;
    grid-template-columns: 40px 1fr 2fr auto;
    gap: var(--sp-2);
    align-items: baseline;
    padding: 1.1rem 0;
    border-bottom: 1px solid var(--c-gold-deep);
    transition: padding-left 0.4s var(--ease-out), background 0.4s;
    &:hover {
      padding-left: 1rem;
      background: rgba(184,148,90,0.06);
    }
    &.closed {
      .name, .periods { opacity: 0.45; }
    }
    &.today {
      .name { color: var(--c-gold-light); }
    }
  }
  .idx {
    font-family: var(--f-mono);
    font-size: var(--fs-xs);
    color: var(--c-gold);
    letter-spacing: var(--tracking-mono);
  }
  .name {
    @include display;
    font-style: italic;
    font-size: clamp(1.5rem, 3vw, 2.4rem);
    color: var(--c-paper);
  }
  .periods {
    font-family: var(--f-mono);
    font-size: var(--fs-sm);
    letter-spacing: var(--tracking-mono);
    color: var(--c-paper);
    .p em { font-style: normal; color: var(--c-gold); padding: 0 0.4rem; }
    .amp { color: var(--c-gold); padding: 0 0.6rem; }
    .off { font-style: italic; font-family: var(--f-display); color: var(--c-paper); opacity: 0.6; }
  }
  .now {
    font-family: var(--f-mono);
    font-size: var(--fs-xs);
    background: var(--c-gold);
    color: var(--c-emerald-deep);
    padding: 0.25rem 0.6rem;
    text-transform: uppercase;
    letter-spacing: var(--tracking-mono);
  }

  .ferm {
    border-left: 1px solid var(--c-gold);
    padding-left: 1.5rem;
    .eyebrow { color: var(--c-gold-light); }
    ul { list-style: none; margin: 1rem 0 0; padding: 0; display: grid; gap: 0.5rem; }
    li {
      display: flex; gap: 1rem;
      font-family: var(--f-mono);
      font-size: var(--fs-sm);
      time { color: var(--c-gold); }
      span { color: var(--c-paper); opacity: 0.7; }
    }
  }
</style>
