<script lang="ts">
	import { fade} from "svelte/transition";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
	import { onMount } from "svelte";
	import { ghAccessToken } from "$lib/stores";
    import { formatDate, getAllMessages, getUser, postChatMessage, type ghMessage } from "./ChatUtils"

    const CLIENT_ID = "Ov23limxkwBq55RCkMMS"

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
            iconSrc:"kitty.png",
            initialMss:"Hey. Wadup?",
            mssPool:["Nothing much, just chillin'","U free this sunday got bbq prty","yu also know victor?","cool cool"],
            times:{reactionMin:300,reactionMax:1000,writingMin:1500,writingMax:3000},
            chat:[]
        },
        {
            name:"Emi",
            iconSrc:"microemi.png",
            initialMss:"You got IC P2?",
            mssPool:["how did you do it??","Is the server up","server down",
            "ok","Ok","OK","ok 👍","👍","do you also have P3?",
            "whats the .env??","api docs wrong AGAIN","do we have meeting monday","thxs"],
            times:{reactionMin:50,reactionMax:120,writingMin:500,writingMax:1300},
            chat:[]
        },
        {
            name:"HK",
            iconSrc:"doggi.png",
            mssPool:["local database, think about it",
            "JSONB is truly the best option right now",
            "Trust me, I tried it in my machine and it 100% works",
            "Migrating to COBOL should fix all the problems",
            "raw sql from front is secure, it's https",
            "no i have not read the docs and im not going to so stop asking",
            "Check out the revision i made for the pr: http://localhost:5173/index.html",
            "Water cooling the network switch is 200% the move",
            "i got better gaming chair than u so shut up",
            "look at my new linkedin post, give it a like",
            "if a was in charge db would have been done by now"],
            times:{reactionMin:300,reactionMax:1000,writingMin:1500,writingMax:3000},
            chat:[]
        }
    ]);
    
    let { botId } = $props();
    
    let globalChat = $state(true);
    let globalMessages:ghMessage[] = $state([]);
    let userValidated:boolean = $state(false);

    let bot = $state(botLibrary[botId])
    let mssKey = $state(1);
    let text = $state('');
    let messages:message[] = $state([]);

    let botSending = $state(false);
    let thinking = $state(false);

    function randInt(max: number, min: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getKey():number{
        mssKey++;
        return mssKey;
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
                if(botSending){
                    thinking = true;
                    scrollToBottom();
                }
            },randInt(bot.times.reactionMax,bot.times.reactionMin));

            setTimeout(() => {
                if(botSending){
                    thinking = false;
                    setTimeout(() => {
                        if(botSending){
                            const newMss:message = { id: getKey(), user:bot.name, text:generateBotMss()};
                            messages = [...messages,newMss];
                            bot.chat = [...messages];
                            botSending = false;
                            scrollToBottom();
                        }
                    },100);
                }
            }, randInt(bot.times.writingMax,bot.times.writingMin));
        }
    }

    async function onClickSend(e:any){
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if(text.length == 0) return;

            if(globalChat){
                if(userValidated){
                    const savedMsm = await postChatMessage($ghAccessToken,text);
                    const newMsm:ghMessage = {
                        id:savedMsm.id,
                        user:savedMsm.name,
                        avatar:savedMsm.avatar,
                        link:savedMsm.link,
                        date:formatDate(savedMsm.date),
                        text:text
                    };
                    globalMessages = [...globalMessages,newMsm]
                    scrollToBottom();
                    text = '';
                }else{
                    loginWithGithub();
                }
            }else{
                const newMss:message = { id: getKey(), user:null, text:text};
                
                messages = [...messages,newMss];
                bot.chat = [...messages];
                scrollToBottom();
                sendBotMss();
                text = '';
            }
        }
    }

    async function updateGlobalChat() {
        const msms = await getAllMessages();
        globalMessages = msms;
    }

    function changeBot(id:number){
        globalChat = false;
        thinking = false;
        botSending = false;
        bot = botLibrary[id];
        if(bot.chat.length === 0 && bot.initialMss !== undefined){
            bot.chat.push({id:getKey(),user:bot.name,text:bot.initialMss})
        }
        messages = [...bot.chat];
    }

    function changeToGlobal(){
        globalChat = true;
    }

    async function validateUser() {
        const user = await getUser($ghAccessToken);
        userValidated = user !== null;
        console.log("User validated:",user)
    }

    function forgetUser(){
        $ghAccessToken = ""
        userValidated = false;
    }

    function loginWithGithub(){
        const width = 600;
        const height = 700;
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);

        const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;

        window.open(
            url,
            'GitHubLogin',
            `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
        );
    }

    onMount(async () => {
        window.addEventListener('message', (event) => {
            console.log("Message event recieved",event.origin)
            if (event.origin !== "https://api.victorr.me") return;
            const access_token = event.data;
            console.log("Acces token recieved:",access_token)
            $ghAccessToken = access_token;
            validateUser();
        });

        validateUser();

        //changeBot(0);
        changeToGlobal();

        await updateGlobalChat();
    })

</script>

<div class="h-full w-full flex flex-col gap-2 justify-between backdrop-blur-md main-container pt-2">

    <div class="flex-1 flex flex-col gap-2 overflow-y-auto messages-container px-[7px]">
        {#if globalChat}
            {#each globalMessages as m, i (m.id)}
                <div class="flex items-end gap-2 justify-start w-full"
                in:fade={{duration: 300 }}>
                        <img src={m.avatar} alt="Github avatar" class="w-[25px] h-[25px] rounded-full">
                    <div class="not-me-mss p-1">{m.text}</div>
                </div>
                <p class="text-xs">
                    <a href={m.link} >{m.user}</a> - {m.date}
                </p>
            {/each}
        {:else}
            {#each messages as m, i (m.id)}
                <div class="flex items-end gap-2 {m.user === null? 'justify-end' : 'justify-start'}"
                in:fade={{duration: 300 }}>
                    {#if m.user !== null}
                        <img src={bot.iconSrc} alt="Bot icon" class="h-6 w-6 rounded-full mb-1">
                    {/if}
                    <div class="{m.user === null? 'me-mss' : 'not-me-mss'} p-1">{m.text}</div>
                </div>
            {/each}
            {#if thinking}
                <div class="flex items-end gap-2 justify-start"
                in:fade={{duration: 100 }}>
                    <img src={bot.iconSrc} alt="Bot icon" class="h-6 w-6 rounded-full mb-1">
                    <div class="not-me-mss p-1">...</div>
                </div>
            {/if}
        {/if}
    </div>

    <div class="flex">
        <textarea onkeydown={onClickSend} bind:value={text} 
            maxlength="125"
            placeholder="Type a message to..." class="flex-1 h-10 p-2"></textarea>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {#snippet child({ props })}
                    <button type="button" {...props} class="p-2 hover:cursor-pointer">
                        {#if globalChat}
                            <span>·Global</span>
                        {:else}
                            <span>·{bot.name}</span>
                        {/if}
                    </button>
                {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content class="" align="start">
                <DropdownMenu.Item onclick={() => changeToGlobal()}>
                        Global
                </DropdownMenu.Item>
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

    textarea:focus,
    textarea:focus-visible,
    textarea:-moz-focusring {
        outline: none !important;
        box-shadow: none !important;
        border-bottom: 1px solid white;
    }

    .not-me-mss{
        background-color: var(--theme-color-lighter);
        margin-right: 1rem;
        word-break: break-all;
    }

    .me-mss{
        border-bottom: 1px solid white;
        margin-left: 1rem;
    }

</style>