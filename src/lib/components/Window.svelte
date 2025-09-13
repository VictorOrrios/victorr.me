<script lang="ts">
	import interact from "interactjs";
	import { onMount } from "svelte";

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

    onMount(() => {


        let x = 0, y = 0;

        interact('.window').draggable({
            allowFrom: '.window-header',
            inertia: true,
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

                }
            }
        })

    });

</script>

{#if window_data}
    <div class="window z-30 pointer-events-auto"
            style="width: {window_data.width}px; height: {window_data.height}px;">

        <div class="window-header select-none cursor-default! p-1 pl-2 pr-2 border-1 border-white flex justify-between">
            <p>{window_data.text}</p>
            <div class="flex items-center gap-2 button-group">
                {#if window_data.link}
                    <a class="triangle" href={window_data.link} aria-label="Link to standalone app"></a>
                {/if}
                <div class="flex gap-2">
                    <button class="control-button aux-button" aria-label="Maximize/Minize"></button>
                    <button class="control-button close-button" aria-label="close"></button>
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
        background-color: white;
        transition: all 0.2s ease-out;
    }

    .triangle {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background-color: white;
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
    }

    .button-group:hover .aux-button{
        background-color: var(--theme-color-light);
    }

</style>