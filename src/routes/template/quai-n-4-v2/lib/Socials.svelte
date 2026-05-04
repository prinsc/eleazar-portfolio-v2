<script>
  let { data } = $props();
  const actifs = data.filter(s => s.actif);
</script>

<section class="socials" id="socials">
  <div class="wrap">
    <div class="ring" aria-hidden="true">
      <svg viewBox="0 0 220 220">
        <defs>
          <path id="r" d="M 110,110 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"/>
        </defs>
        <text font-family="Fira Mono" font-size="9" letter-spacing="4" fill="currentColor">
          <textPath href="#r">SUIVRE LE QUAI · INSTAGRAM · FACEBOOK · MICHELIN · LE JOURNAL DE LA MAISON · </textPath>
        </text>
      </svg>
    </div>

    <div class="text">
      <span class="eyebrow">— Suivre la maison —</span>
      <h2>Le journal <em>quotidien</em> du Quai.</h2>
      <p>Coulisses de cuisine, nouvelles assiettes, rencontres avec nos producteurs. La vie d'une étoile racontée sans filtre, jour après jour.</p>
    </div>

    <ul class="links">
      {#each actifs as s, i}
        <li>
          <a href={s.url} target="_blank" rel="noopener">
            <span class="idx">{String(i+1).padStart(2,'0')}</span>
            <span class="lbl">{s.label}</span>
            <span class="arr">↗</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .socials {
    background: var(--c-bone);
    color: var(--c-ink);
    padding: var(--sp-section) 0;
    position: relative;
    @include grain;
  }
  .wrap {
    @include container;
    display: grid;
    gap: var(--sp-4);
    grid-template-columns: 1fr;
    align-items: center;
    @include breakpoint('large') {
      grid-template-columns: 220px 1fr 1fr;
      gap: var(--sp-5);
    }
  }
  .ring {
    color: var(--c-emerald);
    width: 220px;
    aspect-ratio: 1;
    animation: spin 40s linear infinite;
    svg { width: 100%; height: 100%; }
    justify-self: start;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .text {
    .eyebrow { @include eyebrow; color: var(--c-emerald); display: block; margin-bottom: var(--sp-2); }
    h2 {
      @include display;
      font-size: var(--fs-2xl);
      color: var(--c-emerald-deep);
      margin: 0 0 var(--sp-2);
      em { font-style: italic; color: var(--c-gold-deep); }
    }
    p {
      font-family: var(--f-sans);
      font-size: var(--fs-base);
      color: var(--c-muted);
      max-width: 40ch;
      line-height: 1.55;
      margin: 0;
    }
  }

  .links {
    list-style: none; margin: 0; padding: 0;
    display: grid;
    gap: 0;
    border-top: 1px solid var(--c-rule);
    a {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--c-rule);
      text-decoration: none;
      color: var(--c-emerald-deep);
      transition: padding-left 0.4s var(--ease-out);
      &:hover {
        padding-left: 1rem;
        background: rgba(184,148,90,0.06);
        .arr { transform: translate(4px,-4px) rotate(0); }
      }
    }
    .idx { font-family: var(--f-mono); font-size: var(--fs-xs); color: var(--c-gold-deep); letter-spacing: var(--tracking-mono); }
    .lbl { @include display; font-style: italic; font-size: var(--fs-lg); }
    .arr { font-size: 1.2rem; color: var(--c-gold); transition: transform 0.3s; }
  }
</style>
