<!-- Grain fin permanent — renforce texture brutaliste sobre -->
<svg class="noise" aria-hidden="true">
	<filter id="mjm-grain">
		<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
		<feColorMatrix type="saturate" values="0" />
	</filter>
	<rect width="100%" height="100%" filter="url(#mjm-grain)" opacity="1" />
</svg>

<style>
	.noise {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 9999;
		mix-blend-mode: overlay;
		opacity: 0.22;
	}
</style>
