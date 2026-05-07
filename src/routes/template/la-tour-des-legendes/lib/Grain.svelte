<!-- Grain texture SVG fixe en overlay. Adoucit fonds plats sans alourdir DOM. -->
<div class="grain" aria-hidden="true"></div>

<style lang="scss">
	.grain {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 9999;
		opacity: 0.06;
		mix-blend-mode: multiply;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
		background-size: 200px 200px;
	}
	@media (prefers-reduced-motion: reduce) {
		.grain { opacity: 0.04; }
	}
</style>
