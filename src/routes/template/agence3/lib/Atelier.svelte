<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let wrapEl = $state();
	let canvasEl = $state();
	let engine, runner, world, mouseConstraint;
	let bodies = [];
	let gravityFlipped = $state(false);
	let isReady = $state(false);
	let Matter;

	const items = [
		{ t: '500€',         k: 'price', big: true,  color: '#ff4500' },
		{ t: '3 jours',      k: 'time',  big: true,  color: '#14110d' },
		{ t: 'SvelteKit',    k: 'tech',  big: false, color: '#9fe870' },
		{ t: 'Matter.js',    k: 'tech',  big: false, color: '#ffb3c1' },
		{ t: 'GSAP',         k: 'tech',  big: false, color: '#9fe870' },
		{ t: 'Three.js',     k: 'tech',  big: false, color: '#ffb3c1' },
		{ t: 'Mapbox',       k: 'tech',  big: false, color: '#9fe870' },
		{ t: 'Vitrine',      k: 'serv',  big: false, color: '#14110d' },
		{ t: 'E-commerce',   k: 'serv',  big: false, color: '#14110d' },
		{ t: 'Sur mesure',   k: 'serv',  big: false, color: '#14110d' },
		{ t: 'Honnête',      k: 'word',  big: false, color: '#ff4500' },
		{ t: 'Rapide',       k: 'word',  big: false, color: '#ff4500' },
		{ t: '★',            k: 'icon',  big: false, color: '#ff4500' },
		{ t: '✱',            k: 'icon',  big: false, color: '#9fe870' },
		{ t: '€',            k: 'icon',  big: false, color: '#ffb3c1' }
	];

	function measureLabel(text, big) {
		const fontSize = big ? 28 : 14;
		const padX = big ? 22 : 14;
		const padY = big ? 14 : 9;
		const ctx = document.createElement('canvas').getContext('2d');
		ctx.font = `${big ? '700' : '500'} ${fontSize}px "Geist Mono", ui-monospace, monospace`;
		const w = Math.ceil(ctx.measureText(text).width) + padX * 2;
		const h = fontSize + padY * 2;
		return { w, h, fontSize };
	}

	async function init() {
		if (!browser || !wrapEl) return;
		const mod = await import('matter-js');
		Matter = mod.default || mod;
		const { Engine, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

		await new Promise((r) => requestAnimationFrame(() => r()));

		let rect = wrapEl.getBoundingClientRect();
		let tries = 0;
		while (rect.width < 50 && tries < 30) {
			await new Promise((r) => setTimeout(r, 50));
			rect = wrapEl.getBoundingClientRect();
			tries++;
		}
		const W = Math.max(320, Math.floor(rect.width));
		const H = Math.max(420, Math.min(560, Math.floor(W * 0.55)));

		canvasEl.width = W;
		canvasEl.height = H;
		canvasEl.style.width = W + 'px';
		canvasEl.style.height = H + 'px';

		engine = Engine.create();
		engine.gravity.y = 1;
		world = engine.world;

		const wallOpts = { isStatic: true, restitution: 0.4, friction: 0.6, render: { visible: false } };
		const thick = 60;
		World.add(world, [
			Bodies.rectangle(W / 2, H + thick / 2, W * 2, thick, wallOpts),
			Bodies.rectangle(W / 2, -thick / 2, W * 2, thick, wallOpts),
			Bodies.rectangle(-thick / 2, H / 2, thick, H * 2, wallOpts),
			Bodies.rectangle(W + thick / 2, H / 2, thick, H * 2, wallOpts)
		]);

		bodies = items.map((it, i) => {
			const { w, h, fontSize } = measureLabel(it.t, it.big);
			const x = 60 + Math.random() * (W - 120);
			const y = -200 - i * 80 - Math.random() * 200;
			const body = Bodies.rectangle(x, y, w, h, {
				restitution: 0.55,
				friction: 0.35,
				frictionAir: 0.012,
				density: it.big ? 0.0025 : 0.0014,
				chamfer: { radius: 4 },
				angle: (Math.random() - 0.5) * 0.6
			});
			body.label = it.t;
			body.kltk = { ...it, w, h, fontSize };
			return body;
		});
		World.add(world, bodies);

		const mouse = Mouse.create(canvasEl);
		mouseConstraint = MouseConstraint.create(engine, {
			mouse,
			constraint: { stiffness: 0.18, render: { visible: false } }
		});
		World.add(world, mouseConstraint);

		runner = Runner.create();
		Runner.run(runner, engine);

		const ctx = canvasEl.getContext('2d');
		const draw = () => {
			ctx.clearRect(0, 0, W, H);

			ctx.save();
			ctx.fillStyle = 'rgba(20,17,13,0.04)';
			for (let y = 0; y < H; y += 28) ctx.fillRect(0, y, W, 1);
			ctx.restore();

			ctx.save();
			ctx.strokeStyle = 'rgba(20,17,13,0.2)';
			ctx.setLineDash([4, 6]);
			ctx.strokeRect(8, 8, W - 16, H - 16);
			ctx.restore();

			for (const b of bodies) {
				const { t, color, w, h, fontSize, big } = b.kltk;
				ctx.save();
				ctx.translate(b.position.x, b.position.y);
				ctx.rotate(b.angle);

				ctx.fillStyle = 'rgba(20,17,13,0.18)';
				ctx.fillRect(-w / 2 + 3, -h / 2 + 3, w, h);

				ctx.fillStyle = color === '#14110d' ? '#14110d' : '#f6efde';
				if (color === '#14110d') ctx.fillStyle = '#14110d';
				else ctx.fillStyle = color;
				ctx.fillRect(-w / 2, -h / 2, w, h);

				ctx.strokeStyle = '#14110d';
				ctx.lineWidth = 1.5;
				ctx.strokeRect(-w / 2, -h / 2, w, h);

				ctx.fillStyle = color === '#14110d' ? '#f6efde' : '#14110d';
				ctx.font = `${big ? '700' : '500'} ${fontSize}px "Geist Mono", ui-monospace, monospace`;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(t, 0, 1);

				ctx.restore();
			}

			rafId = requestAnimationFrame(draw);
		};
		let rafId = requestAnimationFrame(draw);
		cleanups.push(() => cancelAnimationFrame(rafId));

		const onResize = () => {
			const r = wrapEl.getBoundingClientRect();
			const newW = r.width;
			const newH = Math.max(420, Math.min(560, r.width * 0.55));
			if (Math.abs(newW - W) < 4 && Math.abs(newH - H) < 4) return;
			canvasEl.width = newW;
			canvasEl.height = newH;
			canvasEl.style.width = newW + 'px';
			canvasEl.style.height = newH + 'px';
		};
		window.addEventListener('resize', onResize);
		cleanups.push(() => window.removeEventListener('resize', onResize));

		isReady = true;
	}

	let cleanups = [];

	export function shake() {
		if (!Matter || !bodies.length) return;
		for (const b of bodies) {
			Matter.Body.applyForce(b, b.position, {
				x: (Math.random() - 0.5) * 0.12 * b.mass,
				y: -(0.05 + Math.random() * 0.15) * b.mass
			});
		}
	}

	export function flipGravity() {
		if (!engine) return;
		gravityFlipped = !gravityFlipped;
		engine.gravity.y = gravityFlipped ? -1 : 1;
	}

	export function reset() {
		if (!Matter || !bodies.length) return;
		const W = canvasEl.width;
		bodies.forEach((b, i) => {
			Matter.Body.setPosition(b, {
				x: 60 + Math.random() * (W - 120),
				y: -150 - i * 70
			});
			Matter.Body.setVelocity(b, { x: 0, y: 0 });
			Matter.Body.setAngularVelocity(b, 0);
			Matter.Body.setAngle(b, (Math.random() - 0.5) * 0.6);
		});
	}

	onMount(() => {
		init();
	});

	onDestroy(() => {
		cleanups.forEach((c) => { try { c(); } catch {} });
		if (runner && Matter) Matter.Runner.stop(runner);
		if (engine && Matter) {
			Matter.World.clear(engine.world, false);
			Matter.Engine.clear(engine);
		}
	});
</script>

<div class="atelier-wrap" bind:this={wrapEl} class:ready={isReady}>
	<canvas bind:this={canvasEl} class="atelier-canvas" aria-label="Bac à sable physique interactif"></canvas>

	<div class="atelier-controls" aria-label="Contrôles">
		<button type="button" class="ctl" onclick={shake}>
			<span class="ctl-k">[ A ]</span> secouer
		</button>
		<button type="button" class="ctl" onclick={flipGravity}>
			<span class="ctl-k">[ G ]</span> {gravityFlipped ? 'gravité ↓' : 'gravité ↑'}
		</button>
		<button type="button" class="ctl" onclick={reset}>
			<span class="ctl-k">[ R ]</span> reset
		</button>
	</div>

	<span class="atelier-hint mono" aria-hidden="true">
		ATTRAPEZ LES BLOCS · GLISSEZ-LES · LANCEZ-LES
	</span>
</div>

<style lang="scss">
	.atelier-wrap {
		position: relative;
		width: 100%;
		border: 2px solid var(--p-rule, #1a1612);
		background:
			repeating-linear-gradient(
				0deg,
				rgba(20, 17, 13, 0.03) 0,
				rgba(20, 17, 13, 0.03) 1px,
				transparent 1px,
				transparent 28px
			),
			var(--p-bg, #f6efde);
		box-shadow: 10px 10px 0 var(--p-ink, #14110d);
		opacity: 0;
		transition: opacity 0.4s ease;

		&.ready { opacity: 1; }

		&::before {
			content: 'BAC À SABLE · MATTER.JS';
			position: absolute;
			top: -1px;
			left: -1px;
			padding: 0.35rem 0.7rem;
			background: var(--p-ink, #14110d);
			color: var(--p-bg, #f6efde);
			font-family: 'Geist Mono', ui-monospace, monospace;
			font-size: 0.65rem;
			letter-spacing: 0.22em;
			z-index: 2;
		}
	}

	.atelier-canvas {
		display: block;
		width: 100%;
		touch-action: none;
		cursor: grab;

		&:active { cursor: grabbing; }
	}

	.atelier-controls {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		z-index: 3;

		@media (max-width: 540px) {
			position: static;
			margin: 0 1rem 1rem;
			justify-content: flex-start;
		}
	}

	.ctl {
		appearance: none;
		font-family: 'Geist Mono', ui-monospace, monospace;
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		padding: 0.5rem 0.85rem;
		background: var(--p-bg, #f6efde);
		color: var(--p-ink, #14110d);
		border: 2px solid var(--p-ink, #14110d);
		cursor: pointer;
		transition: transform 0.15s ease, background 0.15s ease, color 0.15s ease;

		.ctl-k {
			color: var(--p-orange, #ff4500);
			margin-right: 0.4rem;
		}

		&:hover {
			background: var(--p-ink, #14110d);
			color: var(--p-bg, #f6efde);
			transform: translate(-2px, -2px);
			box-shadow: 3px 3px 0 var(--p-orange, #ff4500);

			.ctl-k { color: var(--p-green, #9fe870); }
		}

		&:active { transform: translate(0, 0); box-shadow: 1px 1px 0 var(--p-orange, #ff4500); }
	}

	.atelier-hint {
		position: absolute;
		top: 0.6rem;
		right: 0.8rem;
		font-size: 0.6rem;
		letter-spacing: 0.22em;
		color: var(--p-ink-soft, #4f4738);
		opacity: 0.7;
		pointer-events: none;

		@media (max-width: 540px) { display: none; }
	}
</style>
