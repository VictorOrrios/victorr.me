<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { addWindow, closeWindow } from "$lib/tools/windowFunctions";
	import UniRtPanel from "../apps/UniRtApp/UniRtPanel.svelte";
	import { uniRtParams } from "$lib/stores";





    onMount(() => {
        addWindow(8);
    })

    onDestroy(() => {
        $uniRtParams.endScene = true;
    })
</script>


<div class="flex-1 overflow-hidden bg-blue-950">
    <UniRtPanel/>
</div>