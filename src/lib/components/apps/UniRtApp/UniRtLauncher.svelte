<script lang="ts">
	import { SceneType } from "$lib/uni-rt/scene";

    let { startScene } = $props();

</script>

		
<div class="w-full h-full text-sm overflow-y-scroll">
    <h1 class="p-2">
        Webgl pathtracer
    </h1>
    <h2 class="text-center pb-2">Made by Víctor Orrios & <a href="https://www.linkedin.com/in/jos%C3%A9-miguel-qu%C3%ADlez-798391209/">José Miguel Quílez</a></h2>

    <div class="relative w-full h-[230px] overflow-hidden">
        <img class="w-full absolute top-[-65px]" src="renders/final.png" alt="Render of uni contest">
        <button class="absolute w-full h-full align-top card" onclick={() => {startScene(SceneType.FINAL)}}>
            <div class="text-xl">University contest scene</div>
            <hr>
            <p>This scene was created specifically for a university competition and showcases a rich variety of 3D models arranged to highlight the capabilities of the pathtracer. </p>
            <p> <b>WARNING</b> This scene is very expensive! You need a good GPU to run it.</p>	
        </button>
    </div>
    <div class="relative w-full h-[230px] overflow-hidden">
        <img class="w-full absolute top-[-90px]" src="renders/plane.png" alt="Render of uni contest">
        <button class="absolute w-full h-full align-top card" onclick={() => {startScene(SceneType.TESTPLANE)}}>
            <div class="text-xl">Test plane scene</div>
            <hr>
            <p>A simple infinite plane scene to test textures, models, skyboxes and other miscellaneous features.</p>
            <p>It's cheap and fast to run.</p>
        </button>
    </div>
    <div class="relative w-full h-[230px] overflow-hidden">
        <img class="w-full h-full absolute object-cover" src="renders/transient3.gif" alt="Render of uni contest">
        <button class="absolute w-full h-full align-top card" onclick={() => {startScene(SceneType.TRANSIENT)}}>
            <div class="text-xl">Transient rendering scene</div>
            <hr>
            <p>A playground for playing with the transient rendering controls and seeing how dielectrics slow down the velocity of light.</p>
		</button>
    </div>
    <div class="flex">
        <div class="relative w-full h-[230px] overflow-hidden">
            <img class="w-full h-full absolute object-cover" src="renders/bruce.png" alt="Render of uni contest">
            <button class="absolute w-full h-full align-top card !p-2" onclick={() => {startScene(SceneType.BRUCE)}}>
                <div class="text-xl">Rough dielectric</div>
                <hr>
				<p>A dielectric sphere with roughness modulated by a texture in the shape of the earth.</p>
                <p>Scene made up to match as close as the one seen in <a href="https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf">Bruce Walter et al 2007</a>.</p>
            </button>
        </div>
        <div class="relative w-full h-[230px] overflow-hidden">
            <img class="w-full h-full absolute object-cover" src="renders/cornell.png" alt="Render of uni contest">
            <button class="absolute w-full h-full align-top card" onclick={() => {startScene(SceneType.CORNEL)}}>
                <div class="text-xl">Cornell box scene</div>
                <hr>
                <p>The classic Cornell Box, with a shiny and a cristal sphere.</p>
            </button>
        </div>
    </div>
    <div class="w-full relative flex flex-col text-xs text-justify gap-1 p-4">
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

<style>
    h1{
        font-family: 'Dot Matrix';
    }
    .card{
        padding: 2rem;
        text-align: left;
        opacity: 0%;
        background-color: none;
		transition: background-color 0.5s ease, opacity 0.5s ease;
    }
    .card:hover{
        cursor: pointer;
        opacity: 100%;
        background-color: rgba(0.0,0.0,0.0,0.5);
    }
</style>