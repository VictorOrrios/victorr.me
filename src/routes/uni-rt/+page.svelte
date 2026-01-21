<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { SceneType } from "$lib/uni-rt/scene";
	import UniRtFull from "$lib/uni-rt/UniRtFull.svelte";

	let showApp = $state(false);
	let scene:SceneType = $state(SceneType.FINAL);
	
	function launch(type:SceneType){
		scene = type;
		showApp = true;
	}

</script>
<div class="w-[100%] h-[100vh]">
	{#if showApp}
    	<UniRtFull preset={scene}/>
	{:else}
		<h1 class="p-8">
			Webgl pathtracer
		</h1>
		<h2 class="text-center pb-8">Made by Víctor Orrios & <a href="https://www.linkedin.com/in/jos%C3%A9-miguel-qu%C3%ADlez-798391209/">José Miguel Quílez</a></h2>
		<div class="mx-auto flex flex-col gap-4 text-xl max-w-7xl">
			<div class="w-full relative flex justify-between gap-4 p-4 border-2 hover:border-white">
				<img class="w-[500px]" src="renders/final.png" alt="Render of uni contest">
				<div class="w-full flex flex-col gap-4 text-justify">
					<h2>University contest scene</h2>
					<hr>
					<p>This scene was created specifically for a university competition and showcases a rich variety of 3D models arranged to highlight the capabilities of the pathtracer. </p>
					<p> It shows realistic lighting and shadows, reflections, refractions, and complex material interactions used by state of the art 3d rendering engines.</p>
					<p> <b>WARNING</b> This scene is very expensive! You need a good GPU to run it.</p>
				</div>
				<div class="absolute bottom-2 right-2">
					<Button onclick={() => launch(SceneType.FINAL)}>
						<p class="button">Launch</p>
					</Button>
				</div>
			</div>
			<div class="w-full relative flex justify-between gap-4 p-4 border-2 hover:border-white">
				<img class="w-[500px]" src="renders/plane.png" alt="Render of uni contest">
				<div class="w-full flex flex-col gap-4 text-justify">
					<h2>Test plane scene</h2>
					<hr>
					<p>A simple infinite plane scene to test textures, models, skyboxes and other miscellaneous features.</p>
					<p>It's cheap and fast to run.</p>
				</div>
				<div class="absolute bottom-2 right-2">
					<Button onclick={() => launch(SceneType.TESTPLANE)}>
						<p class="button">Launch</p>
					</Button>
				</div>
			</div>
			<div class="w-full relative flex justify-between gap-4 p-4 border-2 hover:border-white">
				<img class="w-[500px]" src="renders/transient3.gif" alt="Render of uni contest">
				<div class="w-full flex flex-col gap-4 text-justify">
					<h2>Transient rendering scene</h2>
					<hr>
					<p>A playground for playing with the transient rendering controls and seeing how dielectrics slow down the velocity of light.</p>
				</div>
				<div class="absolute bottom-2 right-2">
					<Button onclick={() => launch(SceneType.TRANSIENT)}>
						<p class="button">Launch</p>
					</Button>
				</div>
			</div>
			<div class="w-full relative flex justify-between gap-4 p-4 border-2 hover:border-white">
				<img class="w-[500px]" src="renders/bruce.png" alt="Render of uni contest">
				<div class="w-full flex flex-col gap-4 text-justify">
					<h2>Bruce Walter rough dielectric scene</h2>
					<hr>
					<p>A dielectric sphere with roughness modulated by a texture in the shape of the earth.</p>
					<p>Scene made up to match as close as the one seen in "<a href="https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf">Microfacet Models for Refraction through Rough Surfaces</a>" by Bruce Walter et al 2007.</p>
				</div>
				<div class="absolute bottom-2 right-2">
					<Button onclick={() => launch(SceneType.BRUCE)}>
						<p class="button">Launch</p>
					</Button>
				</div>
			</div>
			<div class="w-full relative flex justify-between gap-4 p-4 border-2 hover:border-white">
				<img class="w-[500px]" src="renders/cornell.png" alt="Render of uni contest">
				<div class="w-full flex flex-col gap-4 text-justify">
					<h2>Cornell box scene</h2>
					<hr>
					<p>The classic Cornell Box, with a shiny and a cristal sphere.</p>
				</div>
				<div class="absolute bottom-2 right-2">
					<Button onclick={() => launch(SceneType.CORNEL)}>
						<p class="button">Launch</p>
					</Button>
				</div>
			</div>

			<div class="w-full relative flex flex-col text-justify gap-4 p-4 border-2">
				<p>Credits for assets:</p>
				<p>Chair, TV, elephant and wood textures: <a href="https://polyhaven.com/">Polyhaven</a></p>
				<p>Skybox: <a href="https://ambientcg.com/view?id=NightSkyHDRI008">ambientcg</a></p>
				<p>
					<a href="models/gltf/bureau_desk/license.txt">Desk</a>,
					<a href="models/gltf/leather_book/license.txt">book</a>,
					<a href="models/gltf/monitor_iii_mod/license.txt">monitor</a>,
					<a href="models/gltf/simple_retro_desk_lamp/license.txt">lamp</a>,
					<a href="models/gltf/skull_salazar/license.txt">skull</a>,
					<a href="models/gltf/sphere-mirror-4k-materialtest/license.txt">sphere</a>,
					<a href="models/gltf/stanford_dragon_pbr/license.txt">dragon</a>: Sketchfab</p>
			</div>
		</div>
	{/if}
</div>

<style>
	h1{
		font-size: var(--text-7xl);
	}

	h2{
		font-size: var(--text-3xl);
	}

	.button{
		font-size: var(--text-4xl);
    	line-height: var(--tw-leading, var(--text-3xl--line-height));
		font-weight: 900;
	}
</style>
