<script lang="ts">
	import { decodeString, encodeString } from "$lib/tools/stringDEncoder";
	import { onMount, tick } from "svelte";
    import { fit, parent_style } from '@leveluptuts/svelte-fit'


    const styles:string[] = [
        "BIGMS",
        "EVANG",
        "BRATY",
        "SEIZR",
        "DITHR"
    ]

    const base:string = 'http://localhost:5173/bigms';

    let text = $state('');
    let style = $state(0);
    let showMode = $state(false);
    let loaded = $state(false);
    let showCopied = $state(false); 


    const url_text = $derived(createUrl());

    function onClickUrl(){
        navigator.clipboard.writeText(createUrl());

        showCopied = true;
        setTimeout(() => {
            showCopied = false;
        }, 750);
    }

    function createUrl():string{
        if(text.length === 0) return base;
        const s = encodeString(text);
        return base+'?s='+style+'&t='+s;
    }

    
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const textParam = urlParams.get('t');
        const styleParam = urlParams.get('s');
        
        if (textParam && styleParam) {
            text = decodeString(textParam);
            style = parseInt(styleParam) || 0;
            showMode = true;
        }

        loaded = true;
    });

</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if loaded}
    {#if !showMode}
        <div class="h-full w-full main-container p-8 text-3xl flex flex-col items-center gap-4 justify-center">

            <div class="flex gap-4">
                <div>
                    <p class="p-1">MESSAGE</p>
                    <textarea bind:value={text} class="p-4"></textarea>
                </div>
                <div class="flex flex-col">
                    <p class="p-1">STYLE</p>
                    {#each styles as text, i}
                        <button type="button" onclick={() => style = i} class="p-1 {style === i ? 'selected':''}">{text}</button>
                    {/each}
                </div>
            </div>
            <button class="url w-[435px] p-2 text-left text-nowrap overflow-hidden inline-block" onclick={onClickUrl}>
                {#if showCopied}
                    Copied to clipboard
                {:else}
                    {url_text}
                {/if}
            </button>
        </div>
    {:else if style === 0}
        <div class="main-text text-center flex items-center justify-center select-none"
            onclick={() => text = text+' '}>
            <p use:fit={{min_size: 10, max_size:100000}}>{text}</p>
        </div>
    {:else if style === 1}
        {text}
    {:else if style === 2}
        {text}
    {:else if style === 3}
        {text}
    {:else if style === 4}
        {text}
    {/if}
{/if}

<style>

    textarea {
        resize: none;
        background-color: var(--color-background);
        border: 2px solid white;
        width: 20rem;
        height: 14rem;
    }

    p, button{
        font-weight: 900;
    }

    a:hover{
        text-decoration: none;
    }

    button:hover {
        background-color: var(--color-background);
    }

    .selected {
        background-color: var(--color-background);
    }

    .main-container{
        background-color: var(--theme-color-lighter);
    }

    .main-text{
        width: 100vw;
        height: 100vh;
        /*font-size: calc(min(20vw,20vh));*/
        cursor: pointer;   
    }

    .url{
        font-size: 1.5rem;
        font-weight: 400;
        background-color: var(--color-background);
        border: 2px solid white;
        text-wrap: none;
    }

    .url:hover{
        background-color: var(--color-background);
        color: var(--color-foreground);
        text-decoration: underline;
    }

</style>