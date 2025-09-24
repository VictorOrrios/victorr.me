<script lang="ts">
	import { fade} from "svelte/transition";

    type message = {
        id:number,
        user:string|null,
        text:string
    }

    type bot = {
        name:string,
        iconSrc:string,
        initialMss:string,
        mssPool:string[],
        times:{
            reactionMin:number,
            reactionMax:number,
            writingMin:number,
            writingMax:number
        }
    }

    const botLibrary:bot[] = [
        {
            name:"Kyle",
            iconSrc:"iconMeta.svg",
            initialMss:"Hey. Wadup?",
            mssPool:["Nothing much, just chillin'","U free this sunday got bbq prty","yu also know victor?","cool cool"],
            times:{reactionMin:300,reactionMax:1000,writingMin:1500,writingMax:3000}
        }
    ];
    
    let { botId } = $props();
    
    let bot = botLibrary[botId]
    let mssKey = $state(2);
    let text = $state('');
    let messages:message[] = $state([{id:1,user:bot.name,text:bot.initialMss}]);

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
                    const idk = mssKey;
                    mssKey++;
                    const newMss:message = { id: idk, user:bot.name, text:generateBotMss()};
                    messages = [...messages,newMss];
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
                const idk = mssKey;
                mssKey++;
                const newMss:message = { id: idk, user:null, text:text};
                
                messages = [...messages,newMss];
                scrollToBottom();
                sendBotMss();
            }
            text = '';
        }
    }

</script>

<div class="h-full w-full flex flex-col gap-2 justify-between backdrop-blur-md main-container pt-2">

    <div class="flex-1 flex flex-col gap-2 overflow-y-auto messages-container px-[7px]">
        {#each messages as m, i (m.id)}
            <div class="flex items-end gap-2 {m.user === null? 'justify-end' : 'justify-start'}"
            transition:fade={{duration: 300 }}>
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

    <div>
        <textarea onkeydown={onClickSend} bind:value={text} 
            maxlength="28"
            placeholder="Type a message to {bot.name}..." class="w-full h-10 p-2"></textarea>
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