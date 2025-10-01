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

	let vertex = $activeBackground.filter.vertex;
	let fragment = $activeBackground.filter.fragment;

	let container: HTMLDivElement;
	let renderer: THREE.WebGLRenderer;
	let composer: EffectComposer;
	let scene: THREE.Scene;
	let camera: THREE.OrthographicCamera;
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
		}
	});




	onMount(async () => {
		scene = new THREE.Scene();

		const width = container.clientWidth;
		const height = container.clientHeight;

		camera = new THREE.OrthographicCamera(0, width, height, 0, -1000, 1000);

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize(width, height);
		renderer.setAnimationLoop(animate);
		container.appendChild(renderer.domElement);

		const myText = new Text();
		myText.text = 'VICTORR.ME';
		myText.font = '/fonts/dotcom/dotcom.ttf';
		myText.fontSize = Math.min(height,width*0.8) / 10;
		myText.position.set(width - 5.2*myText.fontSize, myText.fontSize, 0);
		myText.anchorX = 'center';
		myText.anchorY = 'middle';
		myText.color = 0xffffff;
		myText.sync();
		scene.add(myText);

		const radius:number = Math.min(height,width)/7
		const geometry = new THREE.SphereGeometry( radius );
		material =  new THREE.MeshPhongMaterial({ 
								color: 0xffffff,
								emissive: $themeStore.lighter,
								emissiveIntensity: 0.6
							});
		const sphere = new THREE.Mesh( geometry, material ); 
		sphere.position.set(width-radius*1.5,radius*1.5,-1000.0);
		scene.add( sphere );

		const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
		directionalLight.position.set(1, 1, 1);
		scene.add(directionalLight);


		composer = new EffectComposer( renderer );
		composer.addPass( new RenderPass( scene, camera ) );

		const effect_filter = new ShaderPass( {
							uniforms: {
								tDiffuse: { value: null },
								u_time: { value: 0 },
								u_mouse: { value: new THREE.Vector2(0, 0) },
								u_resolution: { value: new THREE.Vector2(width,height) },
							},
							vertexShader: vertex,
							fragmentShader: fragment
						} );
		effect_filter.renderToScreen = true;
		composer.addPass( effect_filter );


		window.addEventListener('resize', onWindowResize );
		window.addEventListener('mousemove', onMouseMove);

		function onWindowResize() {
			const width = container.clientWidth;
			const height = container.clientHeight;

			camera.right = width;
			camera.top = height;
			camera.updateProjectionMatrix();

			myText.fontSize = Math.min(height,width*0.8) / 10;
			myText.position.set(width - 5.2*myText.fontSize, myText.fontSize, 0);

			const radius:number = Math.min(height,width)/7
			sphere.geometry = new THREE.SphereGeometry( radius );
			sphere.position.set(width-radius*1.5,radius*1.5,-1000.0);

			effect_filter.uniforms.u_resolution.value = new THREE.Vector2(width,height);

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
 

