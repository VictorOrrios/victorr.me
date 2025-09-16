<script lang="ts">
    import snarkdown from 'snarkdown';
	import { onMount } from 'svelte';

    const presetLibrary = [
        "#Hola\n##Que tal\nYo *bien*\n\n_this_ is **easy** to `use`\n\n- Uno\n- Dos\n- Tres",
        "##Que tal",
        "- Pascual"
    ];

    const { preset, title } = $props();
    let editMode = $state(false);
    let html = $state(snarkdown(presetLibrary[preset]));
    let md = $state(presetLibrary[preset]);

    

    function onClickMode(){
        convert();
        editMode = !editMode;
    }

    function convert(){
        html = snarkdown(md);
    }
    
    onMount(() => {
        
    });

</script>

<div class="h-full w-full flex flex-col">
    <div class="flex justify-between items-center pl-4">
        <div>micro_md 1.0</div>
        <div>buffer:{title}</div>
        <button type="button" onclick={onClickMode} class="mode-button p-1 pl-8 pr-8">
        {#if editMode}
            VIEW
        {:else}
            EDIT
        {/if}
        </button>
    </div>
    {#if editMode}
        <div class="p-4 w-full h-full">
            <textarea bind:value={md} class="w-full h-full"></textarea>
        </div>
    {:else}
        <div class="p-4 generated-html">
            {@html html}
        </div>
    {/if}
</div>

<style>

    .generated-html :global{
        h1{
            font-size: 2rem;
        }
        h2{
            font-size: 1.5rem;
        }
        h3{

        }
        em{

        }
        strong{

        }
        code{

        }
        ul{

        }
        ol{

        }
        li{

        }
    }
    
    textarea {
        resize: none;
    }

    .mode-button:hover{
        background: linear-gradient(to right, var(--theme-color-darker), var(--theme-color-basic), var(--theme-color-lighter));
		background-repeat: no-repeat;
		background-size: 300% 100%;
		animation: move-gradient 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
    
    }

    @keyframes move-gradient {
		0% {
			background-position: -100% 0%;
		}
		100% {
			background-position: 0% 0%;
		}
	}


</style>