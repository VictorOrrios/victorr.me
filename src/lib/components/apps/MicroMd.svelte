<script lang="ts">

    const { preset, title } = $props();
    let editMode = $state(false);

    const presetLibrary = [
        "#Hola",
        "##Que tal",
        "- Pascual"
    ];

    function onClickMode(){
        editMode = !editMode;
    }

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
            <textarea class="w-full h-full">Ejemplo</textarea>
        </div>
    {:else}
        <div class="p-4">
            {presetLibrary[preset]}
        </div>
    {/if}
</div>

<style>
    
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