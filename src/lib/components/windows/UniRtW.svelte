<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { addWindow, closeWindow } from "$lib/tools/windowFunctions";
	import { SceneType } from "$lib/uni-rt/scene";
	import UniRtLauncher from "../apps/UniRtApp/UniRtLauncher.svelte";
	import UniRtCanvas from "../apps/UniRtApp/UniRtCanvas.svelte";
	import { activeWindows, uniRtFPS, uniRtParams, uniRtParamsNull } from "$lib/stores";

    let launched:boolean = $state(false);
    let scene:SceneType = $state(SceneType.CORNEL);

    $effect(() => {
        $uniRtParams.endScene;
        if(launched && $uniRtParams.endScene){
            endScene();
        }
    });

    function startScene(p:SceneType){
        scene = p;
        $uniRtParams.endScene = false;
        launched = true;
        addWindow(9);
        setTimeout(() => {
            addWindow(9);
        },1);  
        
    }

    function endScene(){
        closeWindow(9);
        launched = false;
        $uniRtParams.endScene = false;
    }

    onMount(() => {
        endScene();
    })

    onDestroy(() => {
        closeWindow(9);
    })
</script>


<div class="flex-1 overflow-scroll bg-emerald-950">
    <p>{scene.toString()}</p>
    {#if !launched}
        <UniRtLauncher {startScene}/>
    {:else}
        <UniRtCanvas {scene}/>
    {/if}
</div>