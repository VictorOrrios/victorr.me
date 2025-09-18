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
    let parts:string[] = $state([])


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

    function clickText(){
        showMode = false;
    }

    function evangelionParser(){
        parts = text.split("\n", 4);
    }

    async function updateFit() {
        await tick();
        let textElem = document.getElementById("text-id");
        if(textElem) fit(textElem,{min_size: 10, max_size:100000});
        await tick();
    }

    
    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const textParam = urlParams.get('t');
        const styleParam = urlParams.get('s');
        
        if (textParam && styleParam) {
            text = decodeString(textParam);
            style = parseInt(styleParam) || 0;
            if(style === 1) evangelionParser();
            showMode = true;
        }

        loaded = true;
        setTimeout(() => {
            updateFit()
        },1);
    });

</script>

{#if loaded}
    {#if !showMode}
        <div class="h-full w-full main-container p-8 text-3xl flex flex-col items-center gap-4 justify-center">

            <div class="flex gap-4">
                <div>
                    <p class="p-1">MESSG</p>
                    <textarea bind:value={text} class="p-4"></textarea>
                </div>
                <div class="flex flex-col">
                    <p class="p-1">STYLE</p>
                    {#each styles as text, i}
                        <button type="button" onclick={() => style = i} class="p-1 {style === i ? 'selected':''}">{text}</button>
                    {/each}
                </div>
            </div>
            <div class="w-[435px] flex gap-4 items-center">
                <a href={url_text} class="p-1 py-[0.4rem]" onclick={() => window.location.href=url_text}>LINK!</a>
                <button class="url p-2 text-left overflow-hidden text-nowrap rtl inline-block flex-1" onclick={onClickUrl}>
                    {#if showCopied}
                        Copied to clipboard
                    {:else}
                        {url_text}
                    {/if}
                </button>
            </div>
        </div>
    {:else if style === 0}
        <div class="main-text overflow-hidden text-center flex items-center justify-center select-none">
            <button id="text-id"
                    onclick={clickText}
                    class="cursor-pointer italic">
                {text}
            </button>
        </div>
    {:else if style === 1}
        <div class="main-text eva-main overflow-hidden text-center flex items-center justify-center select-none">
            <button id="text-id"
                    onclick={clickText}
                    class="cursor-pointer eva-button">
                <div class="eva-0">{parts[0]}</div>
                <div class="eva-1">{parts[1]}</div>
                <div class="eva-2">{parts[2]}</div>
                <div class="eva-3">{parts[3]}</div>
            </button>
        </div>
            
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

    p, button, a{
        font-weight: 900;
    }

    a:hover{
        text-decoration: none;
    }

    button:hover, a:hover {
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
        cursor: pointer;   
        padding: 2%;
    }

    .eva-button {
        transform: scaleX(0.7);
        text-shadow: 0px 0px 7px white;
        text-align: left;
        letter-spacing: -5px;
    }

    .eva-0 {
        font-family: 'Century';
        font-size: 60%;
        width: 0%;
        line-height: 0.9;
        transform: scaleY(1.2);
    }

    .eva-1 {
        font-family: 'Century';
        line-height: 1.2;
        transform: scaleY(1.2);
    }

    .eva-2{
        font-family: Helvetica;
        font-size: 54%;
        line-height: 1.3;
        transform: scaleY(0.8);
    }

    .eva-3{
        font-family: Times;
        text-align: right;
        font-size: 61%;
        line-height: 1.0;
        font-weight: 400;
        letter-spacing: 0px;
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