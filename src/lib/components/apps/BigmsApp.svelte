<script lang="ts">
	import { decodeString, encodeString } from "$lib/tools/stringDEncoder";
	import { onMount, tick } from "svelte";
    import { fit, parent_style } from '@leveluptuts/svelte-fit'


    const styles:string[] = [
        "BIGMS",
        "EVANG",
        "BRATY",
        "SEIZR",
        "BLSCR",
    ]

    const presets:string[] = [
        "Your text here...",
        "NEON GENESIS\nEVANGELION\nFINALE:\nTake care of yourself.",
        "brat and it's the same but there's three more songs so it's not",
        "Epilepsy warning. Be careful",
        ":(\nYour PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.\n69% complete"
    ]

    const base:string = 'http://localhost:5173/bigms';

    let { standAlone } = $props();

    let text = $state('Your text here...');
    let style = $state(0);
    let showMode = $state(false);
    let loaded = $state(false);
    let showCopied = $state(false); 
    let parts:string[] = $state([])
    let bratSingle = $state(false);
    let smallerViewPort = $state(false);


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

    function changeStyle(id:number){
        style = id;
        if(text === "" || presets.find(s => s === text) !== undefined)
            text = presets[style]
    }

    function evangelionParser(){
        parts = text.split("\n", 4);
        for(let i = 0; i<3; i++){
            if(parts[i]) parts[i] = parts[i].toUpperCase();
        }
    }

    function bratParser(){
        bratSingle = /^\S+$/.test(text);
    }

    function msParser(){
        parts = text.split("\n", 3);
        console.log(parts)
    }


    async function updateFit() {
        await tick();
        let textElem = document.getElementById("text-id");
        if(textElem) fit(textElem,{min_size: 10, max_size:100000});
        let appCont = document.getElementById("app-container-id");
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
            if(style === 2) bratParser();
            if(style === 4) msParser();
            showMode = true;
        }

        smallerViewPort = window.matchMedia('(max-width: 500px)').matches;


        loaded = true;
        setTimeout(() => {
            updateFit()
        },1);
    });

</script>

{#if loaded}
    {#if !showMode}
        <div class="h-full w-full main-container p-8 flex flex-col items-center">

            <div class="h-full w-full text-3xl flex flex-col items-center gap-4 justify-center {smallerViewPort?'scale-80':''}">
                <div class="flex gap-4">
                    <div>
                        <div class="flex justify-between items-center">
                            <p class="p-1">MESSG</p>
                            {#if standAlone}
                                <a class="p-1" href="/">VICTORR.ME</a>
                            {/if}
                        </div>
                        <textarea bind:value={text} class="p-4"></textarea>
                    </div>
                    <div class="flex flex-col">
                        <p class="p-1">STYLE</p>
                        {#each styles as text, i}
                            <button type="button" onclick={() => changeStyle(i)} class="p-1 {style === i ? 'selected':''}">{text}</button>
                        {/each}
                    </div>
                </div>
                <div class="w-[435px] flex gap-4 items-center">
                    {#if standAlone}
                        <a href={url_text} class="p-1 py-[0.4rem]" onclick={() => window.location.href=url_text}>LINK!</a>
                    {:else}
                        <a href={url_text} target="_blank" class="p-1 py-[0.4rem]">LINK!</a>
                    {/if}
                    <button class="url p-2 text-left overflow-hidden text-nowrap rtl inline-block flex-1" onclick={onClickUrl}>
                        {#if showCopied}
                            Copied to clipboard
                        {:else}
                            {url_text}
                        {/if}
                    </button>
                </div>
            </div>
        </div>
    {:else if style === 0}
        <div class="main-text overflow-hidden text-center flex items-center justify-center select-none">
            <button id="text-id"
                    onclick={clickText}
                    class="cursor-pointer italic big-button">
                {text}
            </button>
        </div>
    {:else if style === 1}
        <div class="main-text eva-main overflow-hidden text-center flex items-center justify-center select-none">
            <button id="text-id"
                    onclick={clickText}
                    class="cursor-pointer eva-button big-button">
                <div class="eva-0">{parts[0]}</div>
                <div class="eva-1">{parts[1]}</div>
                <div class="eva-2">{parts[2]}</div>
                <div class="eva-3">{parts[3]}</div>
            </button>
        </div>
    {:else if style === 2}
        {#if bratSingle}
            <div class="main-text brat-main overflow-hidden text-center flex items-center justify-center select-none">
                <div class="w-[50%] h-full flex items-center justify-center">
                    <button id="text-id"
                            onclick={clickText}
                            class="cursor-pointer brat-button big-button">
                        <div class="mx-auto brat-single-fix">
                            {text}
                        </div>
                    </button>
                </div>
            </div>
        {:else}
            <div class="main-text brat-main overflow-hidden text-center flex items-center justify-center select-none">
                <button id="text-id"
                        onclick={clickText}
                        class="cursor-pointer brat-button big-button">
                    <div class="brat-div mx-auto">
                        {text}
                    </div>
                </button>
            </div>
        {/if}
    {:else if style === 3}
        <div class="main-text seizr overflow-hidden text-center flex items-center justify-center select-none">
            <button id="text-id"
                    onclick={clickText}
                    class="cursor-pointer big-button">
                {text.toUpperCase()}
            </button>
        </div>
    {:else if style === 4}
        <div class="main-text win-main overflow-hidden text-center flex items-center justify-center select-none">
            <button id="text-id"
                    onclick={clickText}
                    class="cursor-pointer big-button win-button">
                <div class="msb-0">{parts[0]}</div>
                <div class="msb-1">{parts[1]}</div>
                <div class="msb-2">{parts[2]}</div>
                <div class="grid grid-cols-[1fr_6fr] items-center gap-8"> 
                    <img src="qr.svg" alt="qr code" class="h-[13vh] w-[13vh] mx-auto"/>
                    <div class="msb-r flex flex-col h-full justify-between">
                        <div>
                            For more information about this issue and possible fixes, 
                            visit <a href="https://victorr.me">https://victorr.me</a>
                        </div>
                        <div>
                            <div>
                                If you <a href="mailto:victorr.orrios.b@gmail.com">email support</a>
                                , give them this info:
                            </div>
                            <div>
                                Stop code: BIG_MS_BLSCR_STYLE_ERROR
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    {/if}
{/if}

<style>

    textarea {
        resize: none;
        background-color: var(--color-background);
        border: 2px solid white;
        width: 20rem;
        height: 13.8rem;
    }

    textarea:focus,
    textarea:focus-visible,
    textarea:-moz-focusring {
        border: 2px solid white;
        outline: none !important;
        box-shadow: none !important;
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
        width: 65%;
        line-height: 0.9;
        transform: scaleY(1.2);
    }

    .eva-1 {
        font-family: 'Century';
        line-height: 1.2;
        transform: scaleY(1.2);
        word-break: none;
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

    .brat-main{
        background-color: #8ACE00;

    }

    .big-button:hover{
        background-color: transparent;
    }

    .brat-button{
        width: 100%;
        font-family: "Arial Narrow Custom";
        font-weight: 400;
        color: black;
        font-stretch: condensed;
        transform: scaleX(0.8);
        line-height: 1.0;
        text-shadow: 0px 0px min(0.5vh,0.5vw) black;
        filter: blur(4px);
    }

    .brat-div{
        text-align: justify;
        text-align-last: justify;
        text-justify: inter-word;
        width: min(100vh,100vw);
    }

    .brat-single-fix{
        text-align: center;
    }

    .seizr{
        animation: magic 0.2s infinite;
        font-weight: 900;
        letter-spacing: -7%;
    }

    .win-main{
        font-family: 'open-sans';
        background-color: #0079d8;
    }

    .win-button{
        text-align: left;
        margin: 10%;
    }

    .msb-0{
        font-size: 100%;
    }

    .msb-1{
        font-size: 25%;
    }

    .msb-2{
        font-size: 25%;
        margin-top: 6%;
        margin-bottom: 6%;
    }

    .msb-r{
        font-size: 14%;
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

    @keyframes magic{
        0%{
            background-color: rgb(170, 255, 0);
            color: black;
            filter: blur(10px);
        }
        10%{
            background-color: red;
            color: white;
            filter: none;
        }
        20%{
            background-color: blue;
            color: white;
            filter: blur(10px);
        }
        30%{
            background-color: yellow;
            color: black;
            filter: none;
        }
        40%{
            background-color: rgb(255, 0, 255);
            color: black;
            filter: blur(10px);
        }
        50%{
            background-color: rgb(170, 255, 0);
            color: black;
        }
        60%{
            background-color: black;
            color: white;
            filter: blur(10px);
        }
        70%{
            background-color: orange;
            color: black;
            filter: none;
        }
        80%{
            background-color: #00e1ff;
            color: white;
            filter: blur(10px);
        }
        90%{
            background-color: #ff0059;
            color: white;
            filter: none;
        }
        100%{
            background: white;
            color: black;
            filter: blur(10px);
        }
    }

</style>