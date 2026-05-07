<!-- Courbe SVG signature — silhouette tour stylisée.
     Décorative récurrente dans le site (hero, séparateurs, footer).
     Props : size, color, rotate -->
<script>
	let { size = 120, color = 'currentColor', rotate = 0, opacity = 1 } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 120 120"
	fill="none"
	style="transform: rotate({rotate}deg); opacity: {opacity};"
	aria-hidden="true"
>
	<!-- Tour stylisée + arche + flèche -->
	<path
		d="M60 4 L60 18 M52 18 L68 18 M48 28 Q60 22 72 28 L72 96 Q72 108 60 116 Q48 108 48 96 Z"
		stroke={color}
		stroke-width="1.2"
		fill="none"
	/>
	<path
		d="M54 56 Q60 48 66 56 L66 76 L54 76 Z"
		stroke={color}
		stroke-width="1"
		fill="none"
	/>
	<circle cx="60" cy="40" r="2.5" fill={color} />
</svg>
