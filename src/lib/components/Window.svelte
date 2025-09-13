<script lang="ts">
	import { activeWindows } from "$lib/stores";
	import interact from "interactjs";
	import { onMount } from "svelte";
	import { derived } from "svelte/store";

    const window_library = [
        {
            text:"victorr.me",
            type: 1,
            width:400,
            height:400,
            link:undefined
        },
        {
            text:"resume",
            type: 2,
            width:500,
            height:600,
            link:"https://google.com"
        },
        {
            text:"about",
            type: 3,
            width:600,
            height:400,
            link:undefined
        },
        {
            text:"articles",
            type: 4,
            width:500,
            height:300,
            link:undefined
        },
    ];

    let { type } = $props();
    let window_data = window_library.find(w => w.type === type);

    function onClose(){
        console.log($activeWindows)
    }

    function onMinimize(){

    }

    onMount(() => {

        const el = document.getElementById("window-"+type);
		if(!el) return;

        let x = 0, y = 0;

        interact(el).draggable({
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
        .on("dragstart", (event) => {
			const i = $activeWindows.findIndex(w => w === type);
            if(i<0) console.log("Error finding window on drag start");
            $activeWindows.splice(i,1);
            $activeWindows.unshift(type);
		})

    });

</script>

{#if window_data}
    <div class="window z-30 pointer-events-auto" id="window-{type}"
            style="width: {window_data.width}px; height: {window_data.height}px;">

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
        <div class="window-body">
            Content
        </div>
    </div>
{/if}

<style>
    .window{
        border: 1px solid white;
    }

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