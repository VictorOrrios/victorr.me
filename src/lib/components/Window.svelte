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

    let wel:HTMLElement;

    function onClose(){
        console.log("click close");
        closeWindow(type);
    }

    function onMinimize(){
        minimizeWindow(type);
    }

    const windowZIndexes = $derived.by(() => {
        const i = $activeWindows.findIndex(w => w.type === type);
        if(i<0) return;

        if(wel) wel.style.zIndex = String(50-i);
        
        return;
    });

    function handleControlButtonClick(e:Event) {
        // Timeout to not crush control buttons events
        setTimeout(() => pushToFront(type), 0);
    }

    onMount(() => {

        const el = document.getElementById("window-"+type);
		if(!el) return;
        wel = el;

        let x = 0, y = 0;

        interact(el).draggable({
            ignoreFrom: '.control-button, .triangle',
            allowFrom: '.window-header',
            inertia: {
                resistance: 10.0,
            },
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: false
                })
            ],
            listeners: {
                move (event) {
                    var target = event.target
                    x +=  event.dx
                    y += event.dy

                    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
                },
            }
        })

    });

    

</script>

    
{#if window_data}
    <div class="absolute window pointer-events-auto" id="window-{type}"
            style="width: {window_data.width}px;"
            onpointerdown={(e) => handleControlButtonClick(e)}>

        <div class="window-header select-none cursor-default! border-1 border-white flex justify-between">
            <p class="p-1 pl-2 ">{window_data.text}</p>
            <div class="flex items-center gap-2 button-group ">
                {#if window_data.link}
                    <a class="triangle" href={window_data.link} aria-label="Link to standalone app"></a>
                {/if}
                <div class="flex gap-2 h-full items-center control-button-group pr-2">
                    <button class="control-button aux-button" aria-label="Minimize" onclick={onMinimize}></button>
                    <button class="control-button close-button" aria-label="close" onclick={onClose}></button>
                </div>
            </div>
        </div>
        {#if window_data.type === 1}
            <MetaW/>
        {:else if window_data.type === 2}
            <ResumeW/>
        {:else if window_data.type === 3}
            <AboutW/>
        {:else if window_data.type === 4}
            <ArticlesW/>
        {/if}
    </div>
{/if}

<style>

    .window-header{
        background-color: var(--color-background);
    }

    .control-button{
        border-radius: 100%;
        width: 1rem;
        height: 1rem;
        background-color: var(--color-background);
        transition: all 0.2s ease-out;
		border: 1px solid white;
    }


    .triangle {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background-color: var(--color-background);
        transition: all 0.2s ease-out;
    }

    .button-group:hover .control-button-group{
        background: linear-gradient(to right, var(--theme-color-darker), var(--theme-color-basic));
        transition: all 0.2s ease-out;
    }

    .button-group:hover .triangle {
        border-radius: 15%;
        background-color: var(--color-background);
        border-left: 0.5rem solid transparent; 
        border-right: 0.5rem solid transparent; 
        border-top: 0.9rem solid var(--theme-color-basic);
    }

    .button-group:hover .close-button{
        background-color: var(--theme-color-lighter);
		box-shadow: 0px 0px 5px var(--theme-color-darker);
        border-color: var(--theme-color-lighter);
    }

    .button-group:hover .aux-button{
        background-color: var(--theme-color-light);
		box-shadow: 0px 0px 5px var(--theme-color-dark);
        border-color: var(--theme-color-light);
    }

</style>