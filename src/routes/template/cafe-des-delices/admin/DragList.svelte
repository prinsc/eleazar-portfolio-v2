<script>
	/**
	 * DragList — reorderable list via HTML5 drag & drop.
	 *
	 * Props:
	 *   items   : T[]          — reactive array (pass the $state array directly)
	 *   onreorder : (items: T[]) => void  — called with the reordered array
	 *
	 * Slot: receives { item, index } for each row.
	 *
	 * Usage:
	 *   <DragList {items} onreorder={(r) => (myList = r)}>
	 *     {#snippet row({ item, index })}
	 *       ...your row content...
	 *     {/snippet}
	 *   </DragList>
	 */

	let { items, onreorder, row } = $props();

	let dragIndex = $state(null); // index being dragged
	let overIndex = $state(null); // index currently hovered

	function onDragStart(e, i) {
		dragIndex = i;
		e.dataTransfer.effectAllowed = 'move';
		// ghost image = the row itself (default browser behaviour, fine)
	}

	function onDragOver(e, i) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		overIndex = i;
	}

	function onDrop(e, i) {
		e.preventDefault();
		if (dragIndex === null || dragIndex === i) return;
		const next = [...items];
		const [moved] = next.splice(dragIndex, 1);
		next.splice(i, 0, moved);
		onreorder(next);
		dragIndex = null;
		overIndex = null;
	}

	function onDragEnd() {
		dragIndex = null;
		overIndex = null;
	}

	function onKeyDown(e, i) {
		if (e.key === 'ArrowUp' && i > 0) {
			e.preventDefault();
			const next = [...items];
			[next[i - 1], next[i]] = [next[i], next[i - 1]];
			onreorder(next);
		}
		if (e.key === 'ArrowDown' && i < items.length - 1) {
			e.preventDefault();
			const next = [...items];
			[next[i], next[i + 1]] = [next[i + 1], next[i]];
			onreorder(next);
		}
	}
</script>

<div class="drag-list">
	{#each items as item, i (item)}
		<div
			class="drag-row"
			class:dragging={dragIndex === i}
			class:drag-over={overIndex === i && dragIndex !== i}
			draggable="true"
			ondragstart={(e) => onDragStart(e, i)}
			ondragover={(e) => onDragOver(e, i)}
			ondrop={(e) => onDrop(e, i)}
			ondragend={onDragEnd}
		>
			<!-- Drag handle -->
			<button
				class="drag-handle"
				aria-label="Déplacer"
				tabindex="0"
				onkeydown={(e) => onKeyDown(e, i)}
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					width="14"
					height="14"
				>
					<circle cx="9" cy="5" r="1" fill="currentColor" stroke="none" />
					<circle cx="15" cy="5" r="1" fill="currentColor" stroke="none" />
					<circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
					<circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
					<circle cx="9" cy="19" r="1" fill="currentColor" stroke="none" />
					<circle cx="15" cy="19" r="1" fill="currentColor" stroke="none" />
				</svg>
			</button>

			<!-- Row content injected by parent -->
			<div class="drag-content">
				{@render row({ item, index: i })}
			</div>
		</div>
	{/each}
</div>

<style>
	.drag-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.drag-row {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		border-radius: var(--radius);
		transition:
			background 0.1s,
			opacity 0.15s;
		position: relative;
	}

	.drag-row.dragging {
		opacity: 0.4;
	}

	.drag-row.drag-over {
		background: var(--accent-muted);
		outline: 1px solid var(--accent);
		outline-offset: -1px;
	}

	.drag-handle {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		min-height: 36px;
		background: transparent;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--text-2);
		cursor: grab;
		padding: 0;
		margin-top: 2px;
		transition:
			color 0.1s,
			background 0.1s;
	}

	.drag-handle:hover,
	.drag-handle:focus-visible {
		color: var(--text-1);
		background: var(--bg-2);
		outline: none;
	}

	.drag-handle:active {
		cursor: grabbing;
	}

	.drag-content {
		flex: 1;
		min-width: 0;
	}
</style>
