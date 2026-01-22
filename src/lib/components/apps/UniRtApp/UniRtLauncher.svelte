<script lang="ts">
	import { SceneType } from "$lib/uni-rt/scene";

    let { startScene } = $props();

</script>


<div class="w-full h-full text-sm flex flex-col overflow-y-scroll">
    <div class="relative">
        <button class="absolute card" onclick={() => {startScene(SceneType.CORNEL)}}>
            <div class="text-xl">University contest scene</div>
            <hr>
            <p>This scene was created specifically for a university competition and showcases a rich variety of 3D models arranged to highlight the capabilities of the pathtracer. </p>
            <p> It shows realistic lighting and shadows, reflections, refractions, and complex material interactions used by state of the art 3d rendering engines.</p>
            <p> <b>WARNING</b> This scene is very expensive! You need a good GPU to run it.</p>
				
        </button>
        <img class="w-full" src="renders/final.png" alt="Render of uni contest">
        
    </div>

</div>

<style>
    .card{
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