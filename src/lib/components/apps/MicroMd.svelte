<script lang="ts">
    import snarkdown from 'snarkdown';
	import { onMount } from 'svelte';
    import testmd from '$lib/md_presets/test.md?raw'
    import metamd from '$lib/md_presets/meta.md?raw'
    import resumemd from '$lib/md_presets/resume.md?raw'
    import aboutmd from '$lib/md_presets/about.md?raw'
    
    const presetLibrary = [
        testmd,
        metamd,
        resumemd,
        aboutmd,
    ];

    const { preset, title } = $props();
    let editMode = $state(false);
    let md = $state(presetLibrary[preset]);
    let html = $state(snarkdown(presetLibrary[preset]));


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

<div class="h-full w-full flex flex-col backdrop-blur-md main-container">
    <div class="flex justify-between items-center pl-4">
        {#if preset === 0}
            <div>
                <a href="/">victorr.me</a> micro_md 1.0
            </div>
        {:else}
            <div>micro_md 1.0</div>
        {/if}
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
        <textarea bind:value={md} class="p-4 flex-1"></textarea>
    {:else}
        <div class="p-4 flex-1 generated-html overflow-auto">
            {@html html}
        </div>
    {/if}
</div>

<style>
    textarea {
        resize: none;
    }

    textarea:focus,
    textarea:focus-visible,
    textarea:-moz-focusring {
        outline: none !important;
        box-shadow: none !important;
    }

    .main-container{
        border: 1px solid white;
    }

    .mode-button:hover{
        background: linear-gradient(to right, var(--theme-color-darker), var(--theme-color-basic), var(--theme-color-lighter));
		background-repeat: no-repeat;
		background-size: 300% 100%;
		animation: move-gradient 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
    
    }

    .generated-html :global{
        h1{
            font-family: 'Dot Matrix';
            font-size: 2rem;
        }
        h2{
            font-family: 'Dot Matrix';
            font-size: 1.5rem;
        }
        ul {
            list-style: disc;
            margin-left: 1rem;
            padding-left: 1rem;
        }
        ol {
            list-style: decimal;
            margin-left: 1rem;
            padding-left: 1rem;
        }
        li {
            padding: 0.25rem;
        }
        a:hover{
            color: var(--theme-color-lighter);
        }
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