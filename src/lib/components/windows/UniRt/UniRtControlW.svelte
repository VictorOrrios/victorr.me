<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { addWindow, closeWindow } from "$lib/tools/windowFunctions";
	import UniRtPanel from "$lib/components/apps/UniRtApp/UniRtPanel.svelte";
	import { uniRtParams } from "$lib/stores";

    function launchHelp(){
        addWindow(10);
    }

    onDestroy(() => {
        closeWindow(10);
        $uniRtParams.endScene = true;
    })
</script>


<div class="w-full h-full overflow-hidden backdrop-blur-md">
    <UniRtPanel {launchHelp}/>
</div>