<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { Tween } from 'svelte/motion';
  	import { cubicOut } from 'svelte/easing';
	import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
	import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
	import { activeBackground, themeStore } from '$lib/stores';
	import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
	import * as CANNON from 'cannon-es';
	import { Text } from 'troika-three-text';

	let vertex = $activeBackground.filter.vertex;
	let fragment = $activeBackground.filter.fragment;

	let container: HTMLDivElement;
	let renderer: THREE.WebGLRenderer;
	let composer: EffectComposer;
	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let cube_material: THREE.MeshStandardMaterial;
	let light: THREE.PointLight;
	let gridHelper: THREE.GridHelper;

	let mousePos = new Tween({ x: 0.5, y: 0.5 }, { duration: 0, easing: cubicOut });
	
	function onMouseMove(event: MouseEvent) {
		if(container){
			const { left, top, width, height } = container.getBoundingClientRect();
			const x = (event.clientX - left) / width;
			const y = 1 - (event.clientY - top) / height;
			mousePos.target = { x,y };
		}
	}

	$effect(() => {
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

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize(width, height);
		renderer.setAnimationLoop(animate);
		container.appendChild(renderer.domElement);

		camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
		camera.position.set(20, 20, 20);
		camera.lookAt(new THREE.Vector3(0,0,0));

		const directionalLight = new THREE.PointLight(0xffffff, 200.0);
		directionalLight.position.set(3.0, 10.0, -3.0);
		scene.add(directionalLight);

		scene.background = null;

		const world = new CANNON.World({
			gravity: new CANNON.Vec3(0, -9.82, 0),
		});

		const roomHeight = 5;
		const roomWidth = 20;
		const roomDepth = 20;

		function addPlane(x:number,y:number,z:number,a:number,b:number,c:number){
			const groundBody = new CANNON.Body({
				shape: new CANNON.Plane(),
				mass: 0,
			});
			groundBody.position.set(x, y, z);
			groundBody.quaternion.setFromEuler(a,b,c);
			world.addBody(groundBody);
		}
		addPlane(0,0,0,-Math.PI / 2, 0, 0);
		addPlane(0, roomHeight, 0, Math.PI / 2, 0, 0);
		addPlane(-roomWidth / 2, roomHeight / 2, 0, 0, Math.PI / 2, 0);
		addPlane(roomWidth / 2, roomHeight / 2, 0, 0, -Math.PI / 2, 0);
		addPlane(0, roomHeight / 2, -roomDepth / 2, 0, 0, 0);
		addPlane(0, roomHeight / 2, roomDepth / 2, 0, Math.PI, 0);

		const roomGeo = new THREE.PlaneGeometry(20, 20);
		const roomMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
		const roomMesh = new THREE.Mesh(roomGeo, roomMat);
		roomMesh.rotation.x = -Math.PI / 2;
		scene.add(roomMesh);

		const myText = new Text();
		myText.text = '.MEVICTORR.MEVIC';
		myText.font = '/fonts/DotMatrix/DOTMATRI.TTF';
		myText.fontSize = 5.2;
		myText.position.set(0.0,0.1,0.0);
		myText.rotation.x = -Math.PI / 2;
		myText.rotation.z = Math.PI / 4;
		myText.anchorX = 'center';
		myText.anchorY = 'middle';
		myText.color = 0x09090b;
		myText.sync();
		scene.add(myText);

		function copyText(offset:number){
			const myText2 = new Text();
			myText2.copy(myText);
			myText2.position.set(offset*1.3,0.1,offset*0.7);
			scene.add(myText2);
		}
		copyText(3.0)
		copyText(6.0)
		copyText(9.0)
		copyText(-3.0)
		copyText(-6.0)
		copyText(-9.0)

		
		const boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
		const boxBody = new CANNON.Body({
			mass: 1,
			shape: boxShape,
			position: new CANNON.Vec3(0, 2.5, 0),
		});
		world.addBody(boxBody);

		const boxGeo = new THREE.BoxGeometry(2, 2, 2);
		const boxMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
		const boxMesh = new THREE.Mesh(boxGeo, boxMat);
		scene.add(boxMesh);

		const sphereShape = new CANNON.Sphere(1.0);
		const sphereBody = new CANNON.Body({
			mass: 0,
			shape: sphereShape,
			position: new CANNON.Vec3(0, 0.0, 0),
		});
		world.addBody(sphereBody);

		const sphereGeo = new THREE.SphereGeometry(1.0)
		const sphereMat = new THREE.MeshStandardMaterial({ color: $themeStore.lighter });
		const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
		scene.add(sphereMesh);

		light = new THREE.PointLight($themeStore.lighter, 40, 550); 
		light.position.copy(sphereBody.position);
		scene.add(light);


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
		//composer.addPass( effect_filter );


		window.addEventListener('resize', onWindowResize );
		window.addEventListener('mousemove', onMouseMove);

		function onWindowResize() {
			const width = container.clientWidth;
			const height = container.clientHeight;

			camera.aspect = width/height;
			camera.updateProjectionMatrix();

			effect_filter.uniforms.u_resolution.value = new THREE.Vector2(width,height);

			renderer.setSize( window.innerWidth, window.innerHeight );
			composer.setSize( window.innerWidth, window.innerHeight );
		}

		function clamp(min:number, x:number, max:number):number{
			return Math.max(min,Math.min(max,x))
		}

		// Animation loop
		const clock = new THREE.Clock();
		let lastTime = performance.now();
		function animate() {
			const now = performance.now();
			effect_filter.uniforms.u_time.value += (now - lastTime) * 0.001;
			lastTime = now;

			const delta = clock.getDelta();
      		world.step(1 / 60, delta, 3);

			const scale = 20.0;
			const x_pos = mousePos.current.x*scale-scale/2.0;
			const y_pos = mousePos.current.y*scale-scale/2.0;
			sphereBody.position.x = clamp(-9.0,-y_pos+x_pos,9.0);
			sphereBody.position.z = clamp(-9.0,-y_pos-x_pos,9.0);
			light.position.copy(sphereBody.position);
			sphereMesh.position.copy(sphereBody.position);

			boxMesh.position.copy(boxBody.position);
      		boxMesh.quaternion.copy(boxBody.quaternion);


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
 

