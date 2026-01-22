<script lang="ts">
	import { goto } from "$app/navigation";
	import UniRtCanvas from "$lib/components/apps/UniRtApp/UniRtCanvas.svelte";
	import UniRtLauncher from "$lib/components/apps/UniRtApp/UniRtLauncher.svelte";
	import UniRtPanel from "$lib/components/apps/UniRtApp/UniRtPanel.svelte";
	import { uniRtParams } from "$lib/stores";
	import { SceneType } from "$lib/uni-rt/scene";
	import { onMount } from "svelte";

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
        $uniRtParams.stopRendering = false;
        launched = true;
    }

    function endScene(){
        launched = false;
        $uniRtParams.endScene = false;
    }

	function launchHelp(){
		endScene();
		goto("/uni-rt/help");
    }

    onMount(() => {
        endScene();
    })

</script>


<div class="w-screen h-screen overflow-hidden backdrop-blur-md">
	<div class="fixed right-0 bg-color p-4 flex items-center gap-4">
		<a href="/" class="text-2xl">victorr.me</a>
	</div>
	{#if !launched}
		<div class="w-[500px] mx-auto">
			<UniRtLauncher {startScene}/>
		</div>
	{:else}
		<div class="w-full h-full flex justify-between">
			<div class="flex-1">
				<UniRtCanvas preset={scene}/>
			</div>
			<div class="mt-10 p-4">
				<UniRtPanel {launchHelp}/>
			</div>
		</div>
	{/if}
</div>