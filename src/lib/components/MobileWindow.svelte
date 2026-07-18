<script lang="ts">
	import { activeWindows, window_library } from "$lib/stores";
	import interact from "interactjs";
	import { onMount } from "svelte";
	import { derived } from "svelte/store";
	import MetaW from "./windows/MetaW.svelte";
	import ResumeW from "./windows/ResumeW.svelte";
	import AboutW from "./windows/AboutW.svelte";
	import ArticlesW from "./windows/ArticlesW.svelte";
	import { closeWindow, minimizeWindow, pushToFront } from "$lib/tools/windowFunctions";

    

    let {type} = $props();

    const window_data = window_library.find(w => w.type === type);


    $effect(() => {
        $activeWindows;
    });

</script>

    
{#if window_data}
    <div class="absolute w-full h-full window pointer-events-auto flex flex-col p-[4px] z-0">

        <div class="window-header select-none cursor-default! border-1 border-white flex justify-between">
            <p class="p-1 pl-2 ">{window_data.text}</p>
        </div>
        <window_data.window isMobile={true}/>
    </div>
{/if}

<style>
    .window-header{
        background-color: var(--color-background);
    }

</style>