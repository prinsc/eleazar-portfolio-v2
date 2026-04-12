<!-- Texture de grain papier en overlay fixé -->
<svg class="grain" aria-hidden="true">
	<filter id="cdd-grain">
		<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
		<feColorMatrix type="saturate" values="0" />
	</filter>
	<rect width="100%" height="100%" filter="url(#cdd-grain)" opacity="1" />
</svg>

<style>
	.grain {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9999;
		mix-blend-mode: multiply;
		opacity: 0.5;
	}
</style>
