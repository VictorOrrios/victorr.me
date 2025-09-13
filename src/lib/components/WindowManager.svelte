<script lang="ts">
	import { activeWindows, minimizedWindows } from "$lib/stores";
	import Window from "./Window.svelte";

    $activeWindows = [2,1];
    $minimizedWindows = [];



</script>

{#each $activeWindows as windowType}
    <Window type={windowType}/>
{/each}