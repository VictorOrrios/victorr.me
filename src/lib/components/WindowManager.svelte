<script lang="ts">
	import { activeWindows } from "$lib/stores";
	import { fly, slide } from "svelte/transition";
	import Window from "./Window.svelte";


    
</script>

{#each $activeWindows as window, i (window.type)}
        <div class="absolute h-full w-full"
        style="padding-top: {window.type * 5 + '%'}; padding-left: {window.type * 5 + '%'}; 
        {window.onScreen ? '' : 'display: none;'}"
        in:slide={{axis: 'x', duration: 400 }}
        out:fly={{ x: 300, opacity: 0, duration: 400 }}>
            <Window type={window.type}/>
        </div>
{/each}
