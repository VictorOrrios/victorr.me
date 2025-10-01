<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { Text } from 'troika-three-text';
	import { Tween } from 'svelte/motion';
  	import { cubicOut } from 'svelte/easing';
	import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
	import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
	import { activeBackground, themeStore } from '$lib/stores';
	import { Font, FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';

	let vertex = $activeBackground.filter.vertex;
	let fragment = $activeBackground.filter.fragment;

	let container: HTMLDivElement;
	let renderer: THREE.WebGLRenderer;
	let composer: EffectComposer;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let material: THREE.MeshPhongMaterial;

	let mousePos = new Tween({ x: 0, y: 0 }, { duration: 1000, easing: cubicOut });
	
	function onMouseMove(event: MouseEvent) {
		if(container){
			const { left, top, width, height } = container.getBoundingClientRect();
			const x = (event.clientX - left) / width;
			const y = 1 - (event.clientY - top) / height;
			mousePos.target = { x,y };
		}
	}

	$effect(() => {
		$themeStore.lighter;
		if(material){
			let color = $themeStore.lighter
			material.emissive.set(color);
			console.log("NIA")
		}
	});

	async function loadFont(url:string) {
		const loader = new FontLoader();
		return new Promise((resolve, reject) => {
			loader.load(
			url,
			font => resolve(font),
			undefined, // onProgress
			err => reject(err)
			);
		});
	}

	onMount(async () => {
		const font:any = await loadFont("/fonts/PixelTwist/PixelTwist.json");

		scene = new THREE.Scene();

		const width = container.clientWidth;
		const height = container.clientHeight;

		camera = new THREE.PerspectiveCamera(35, width/height, 0.1, 1000);
		camera.position.set(20, 20, 50);
		camera.lookAt(new THREE.Vector3(0,0,0));


		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize(width, height);
		renderer.setAnimationLoop(animate);
		container.appendChild(renderer.domElement);

		const text_geometry = new TextGeometry('VICTORR ME', {
			font,
			size: 5,
			depth:6,
		});

		const text_material = new THREE.MeshStandardMaterial({ color: 0xffffff });
		const text_mesh = new THREE.Mesh(text_geometry, text_material);
		text_mesh.position.set(-27,0,0.0);
    	scene.add(text_mesh);

		const cube_size = 2;
		const cube_geometry = new THREE.BoxGeometry(cube_size,cube_size,cube_size);
		const cube_material = new THREE.MeshStandardMaterial({ color: 0xffffff });
		const cube = new THREE.Mesh(cube_geometry, cube_material);
		cube.position.set(17.2,cube_size/2,cube_size/2);
		scene.add(cube);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
		directionalLight.position.set(1, 1, 5);
		scene.add(directionalLight);

		const ambient = new THREE.AmbientLight(0xffffff,1);
		//scene.add(ambient)


		composer = new EffectComposer( renderer );
		composer.addPass( new RenderPass( scene, camera ) );

		const effect_filter = new ShaderPass( {
							uniforms: {
								tDiffuse: { value: null },
								u_time: { value: 0 },
								u_mouse: { value: new THREE.Vector2(0, 0) },
							},
							vertexShader: vertex,
							fragmentShader: fragment
						} );
		effect_filter.renderToScreen = true;
		//composer.addPass( effect_filter );


		window.addEventListener('resize', onWindowResize );
		window.addEventListener('mousemove', onMouseMove);

		function onWindowResize() {
			const width = container.clientWidth;
			const height = container.clientHeight;

			//myText.fontSize = Math.min(height,width*0.8) / 10;
			//myText.position.set(width - 5.2*myText.fontSize, myText.fontSize, 0);

			renderer.setSize( window.innerWidth, window.innerHeight );
			composer.setSize( window.innerWidth, window.innerHeight );

		}

		// Animation loop
		let lastTime = performance.now();
		function animate() {
			const now = performance.now();
			effect_filter.uniforms.u_time.value += (now - lastTime) * 0.001;
			lastTime = now;

			directionalLight.position.x = mousePos.current.x - 0.5;
			directionalLight.position.y = mousePos.current.y;

			effect_filter.uniforms.u_mouse.value.set(mousePos.current.x, mousePos.current.y);

			composer.render();
		}

	});

	onDestroy(() => {
		if (renderer) {
			renderer.dispose();
		}
	});
	
</script>

<div class="h-full w-full" bind:this={container}></div>
 

