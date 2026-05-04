<script>
  let { data } = $props();
  let lightbox = $state(null);
</script>

<section class="galerie" id="galerie">
  <div class="wrap">
    <header>
      <span class="num" aria-hidden="true">11</span>
      <span class="eyebrow">— Carnet visuel —</span>
      <h2>Le Quai, <em>en images</em>.</h2>
    </header>

    <div class="masonry">
      {#each data as img, i}
        <button
          class="cell"
          class:tall={img.tall}
          style="--i:{i}"
          onclick={() => lightbox = img}
        >
          <img src={img.src} alt={img.alt} loading="lazy"/>
          <span class="overlay">
            <span class="cap-num">{String(i+1).padStart(2,'0')} / {String(data.length).padStart(2,'0')}</span>
            {#if img.label}<span class="cap-lbl">{img.label}</span>{/if}
          </span>
        </button>
      {/each}
    </div>
  </div>

  {#if lightbox}
    <div class="lb" role="dialog" aria-modal="true" onclick={() => lightbox = null}>
      <img src={lightbox.src} alt={lightbox.alt}/>
      <button class="close" onclick={() => lightbox = null} aria-label="Fermer">✕</button>
      <span class="lb-cap">{lightbox.label || lightbox.alt}</span>
    </div>
  {/if}
</section>

<style lang="scss">
  @use './styles/mixins' as *;
  .galerie {
    background: var(--c-emerald-deep);
    color: var(--c-paper);
    padding: var(--sp-section) 0;
    @include grain;
  }
  .wrap { @include container; }
  header { margin-bottom: var(--sp-5); position: relative; }
  .num {
    position: absolute;
    top: -2.5rem; left: -0.2em;
    font-family: var(--f-display);
    font-style: italic;
    font-size: var(--fs-numeral);
    color: var(--c-emerald-soft);
    opacity: 0.45;
    line-height: 0.85;
  }
  .eyebrow { @include eyebrow; color: var(--c-gold-light); display: block; position: relative; }
  h2 {
    @include display;
    font-size: var(--fs-3xl);
    color: var(--c-paper);
    margin: var(--sp-2) 0 0;
    position: relative;
    em { font-style: italic; color: var(--c-gold-light); }
  }

  .masonry {
    columns: 1;
    column-gap: 1rem;
    @include breakpoint('medium') { columns: 2; }
    @include breakpoint('large') { columns: 3; column-gap: 1.5rem; }
  }
  .cell {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    break-inside: avoid;
    position: relative;
    background: transparent;
    border: 1px solid var(--c-gold-deep);
    padding: 0;
    cursor: pointer;
    overflow: hidden;
    @include breakpoint('large') { margin-bottom: 1.5rem; }
    &.tall img { aspect-ratio: 3/4.5; }
    img {
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      display: block;
      transition: transform 1s var(--ease-out), filter 0.6s;
      filter: saturate(0.85) contrast(1.05);
    }
    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(transparent 50%, rgba(8,44,32,0.85));
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 1rem;
      gap: 0.25rem;
      opacity: 0;
      transition: opacity 0.4s;
      .cap-num { @include eyebrow; color: var(--c-gold-light); }
      .cap-lbl { @include display; font-style: italic; color: var(--c-paper); font-size: var(--fs-md); }
    }
    &:hover {
      img { transform: scale(1.05); filter: saturate(1.1) contrast(1.05); }
      .overlay { opacity: 1; }
    }
  }

  .lb {
    position: fixed;
    inset: 0;
    background: rgba(8,20,15,0.95);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    cursor: zoom-out;
    img {
      max-width: 90%;
      max-height: 85vh;
      object-fit: contain;
    }
    .close {
      position: absolute;
      top: 1rem; right: 1rem;
      background: transparent;
      border: 1px solid var(--c-gold);
      color: var(--c-gold);
      width: 40px; height: 40px;
      cursor: pointer;
      font-family: var(--f-mono);
    }
    .lb-cap {
      position: absolute;
      bottom: 1rem; left: 0; right: 0;
      text-align: center;
      @include eyebrow;
      color: var(--c-gold-light);
    }
  }
</style>
