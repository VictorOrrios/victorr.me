<script lang="ts">
	import { fade} from "svelte/transition";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
	import { onMount } from "svelte";

    type message = {
        id:number,
        user:string|null,
        text:string
    }

    type bot = {
        name:string,
        iconSrc:string,
        initialMss?:string,
        mssPool:string[],
        times:{
            reactionMin:number,
            reactionMax:number,
            writingMin:number,
            writingMax:number
        },
        chat:message[]
    }

    let botLibrary:bot[] = $state([
        {
            name:"Kyle",
            iconSrc:"iconMeta.svg",
            initialMss:"Hey. Wadup?",
            mssPool:["Nothing much, just chillin'","U free this sunday got bbq prty","yu also know victor?","cool cool"],
            times:{reactionMin:300,reactionMax:1000,writingMin:1500,writingMax:3000},
            chat:[]
        },
        {
            name:"John",
            iconSrc:"iconMeta.svg",
            initialMss:"Hey. Wadup?",
            mssPool:["Nothing much, just chillin'","U free this sunday got bbq prty","yu also know victor?","cool cool"],
            times:{reactionMin:300,reactionMax:1000,writingMin:1500,writingMax:3000},
            chat:[]
        },
        {
            name:"Emi",
            iconSrc:"iconMeta.svg",
            initialMss:"Hey. Wadup?",
            mssPool:["Nothing much, just chillin'","U free this sunday got bbq prty","yu also know victor?","cool cool"],
            times:{reactionMin:300,reactionMax:1000,writingMin:1500,writingMax:3000},
            chat:[]
        },
        {
            name:"Cat",
            iconSrc:"iconMeta.svg",
            initialMss:"Hey. Wadup?",
            mssPool:["Nothing much, just chillin'","U free this sunday got bbq prty","yu also know victor?","cool cool"],
            times:{reactionMin:300,reactionMax:1000,writingMin:1500,writingMax:3000},
            chat:[]
        }
    ]);
    
    let { botId } = $props();
    
    let bot = $state(botLibrary[botId])
    let mssKey = $state(1);
    let text = $state('');
    let messages:message[] = $state([]);

    let botSending = $state(false);
    let thinking = $state(false);

    function randInt(max: number, min: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function scrollToBottom(){
        const messageContainer = document.querySelector('.messages-container');
        if (messageContainer){
            setTimeout(() =>{
                messageContainer.scrollTop = messageContainer.scrollHeight
        },1);
        }
    }

    function generateBotMss():string{
        return bot.mssPool[randInt(bot.mssPool.length-1,0)];
    }

    function sendBotMss(){
        if(!botSending){
            botSending = true;
            setTimeout(() => {
                thinking = true;
                scrollToBottom();
            },randInt(bot.times.reactionMax,bot.times.reactionMin));

            setTimeout(() => {
                thinking = false;
                setTimeout(() => {
                    const newMss:message = { id: getKey(), user:bot.name, text:generateBotMss()};
                    messages = [...messages,newMss];
                    bot.chat = [...messages];
                    botSending = false;
                    scrollToBottom();
                },100);
            }, randInt(bot.times.writingMax,bot.times.writingMin));
        }
    }

    function onClickSend(e:any){
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if(text.length !== 0){
                const newMss:message = { id: getKey(), user:null, text:text};
                
                messages = [...messages,newMss];
                bot.chat = [...messages];
                scrollToBottom();
                sendBotMss();
            }
            text = '';
        }
    }

    function getKey():number{
        mssKey++;
        return mssKey;
    }

    function changeBot(id:number){
        bot = botLibrary[id];
        if(bot.chat.length === 0 && bot.initialMss !== undefined){
            bot.chat.push({id:getKey(),user:bot.name,text:bot.initialMss})
        }
        messages = [...bot.chat];
    }

    onMount(() => {
        changeBot(0);
    })

</script>

<div class="h-full w-full flex flex-col gap-2 justify-between backdrop-blur-md main-container pt-2">

    <div class="flex-1 flex flex-col gap-2 overflow-y-auto messages-container px-[7px]">
        {#each messages as m, i (m.id)}
            <div class="flex items-end gap-2 {m.user === null? 'justify-end' : 'justify-start'}"
            in:fade={{duration: 300 }}>
                {#if m.user !== null}
                    <img src={bot.iconSrc} alt="Bot icon" class="h-6 rounded mb-1">
                {/if}
                <div class="{m.user === null? 'me-mss' : 'not-me-mss'} p-1">{m.text}</div>
            </div>
        {/each}
        {#if thinking}
            <div class="flex items-end gap-2 justify-start"
            in:fade={{duration: 100 }}>
                <img src={bot.iconSrc} alt="Bot icon" class="h-6 rounded mb-1">
                <div class="not-me-mss p-1">...</div>
            </div>
        {/if}
    </div>

    <div class="flex">
        <textarea onkeydown={onClickSend} bind:value={text} 
            maxlength="28"
            placeholder="Type a message to..." class="flex-1 h-10 p-2"></textarea>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {#snippet child({ props })}
                    <button type="button" {...props} class="p-2">
                        <span>·{bot.name}</span>
                    </button>
                {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content class="" align="start">
                {#each botLibrary as botI, i (botI.name)}
                    <DropdownMenu.Item onclick={() => changeBot(i)}>
                        {botI.name}
                    </DropdownMenu.Item>
                {/each}
            </DropdownMenu.Content>
        </DropdownMenu.Root>            
    </div>

</div>

<style>

    textarea {
        resize: none;
        border-bottom: 1px solid white;
    }


    .not-me-mss{
        background-color: var(--theme-color-lighter);

    }

    .me-mss{
        border-bottom: 1px solid white;
    }

</style>