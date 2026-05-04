<script>
  let { data } = $props();
  const actif = data?.alerteOuverture?.actif;
  const message = data?.alerteOuverture?.message ?? '';
</script>

{#if actif}
  <aside class="alerte" aria-live="polite">
    <div class="track">
      {#each Array(8) as _, i}
        <span class="item">
          <span class="dot">●</span>
          <span class="msg">{message}</span>
          <span class="sep">— communiqué n°{String(i+1).padStart(2,'0')} —</span>
        </span>
      {/each}
    </div>
  </aside>
{/if}

<style lang="scss">
  @use './styles/mixins' as *;

  .alerte {
    background: var(--c-emerald-deep);
    color: var(--c-paper);
    overflow: hidden;
    border-block: 1px solid var(--c-gold-deep);
    padding-block: 0.75rem;
    position: relative;
  }
  .track {
    display: flex;
    gap: 3rem;
    width: max-content;
    animation: marquee 50s linear infinite;
    white-space: nowrap;
  }
  .item {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--f-mono);
    font-size: var(--fs-xs);
    letter-spacing: var(--tracking-mono);
    text-transform: uppercase;
  }
  .dot { color: var(--c-gold); }
  .sep { color: var(--c-gold-light); opacity: 0.7; }
  @keyframes marquee {
    to { transform: translateX(-50%); }
  }
</style>
