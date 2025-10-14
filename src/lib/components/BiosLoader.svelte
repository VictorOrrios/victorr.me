<script lang="ts">
	import { text } from "@sveltejs/kit";
	import { onDestroy, onMount } from "svelte";

    type line = {
        text:string,
        state:number
    };
 
    const spinner_states = ["/","—","\\","|"];

    let text_library = [
        "Hola",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Que tal",
        "Estas"
    ];
    
    let textBox:line[] = $state([])

    let spinner:string = $state("");
    let current_spinner_state = $state(0);
    let destroyed = $state(false);
    let speed = $state(1);

    function randomIntFromInterval(min:number, max:number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function scrollToBottom(){
        const messageContainer = document.querySelector('.bios-container');
        if (messageContainer){
            setTimeout(() =>{
                messageContainer.scrollTop = messageContainer.scrollHeight
            },1);
        }
    }

    function spinnerNextState(){
        if(destroyed) return;
        current_spinner_state = (current_spinner_state+1)%spinner_states.length;
        spinner = spinner_states[current_spinner_state];
        console.log("Active");
        setTimeout(() => {
            spinnerNextState();
        },100);
    }

    function addLine(){
        if(destroyed || text_library.length === 0) return;
        const index = randomIntFromInterval(0,text_library.length-1);
        const new_text = text_library.splice(index,1)[0];
        const r = Math.random();
        let new_state = 0;
        if(r>0.70) new_state = 1;
        if(r>0.80) new_state = 2;
        if(r>0.90) new_state = 3;
        if(textBox.length === 0) new_state = 0;
        textBox.push({text:new_text,state:new_state});
        textBox = [...textBox];
        scrollToBottom();
        setTimeout(() => {
            addLine()
        }, randomIntFromInterval(100,300)*speed)
    }


    onMount(() => {
        spinnerNextState();
        addLine();
        setTimeout(() => {
            speed = 0.5;
        },1000);
        setTimeout(() => {
            speed = 0.2;
        },2000);
    });

    onDestroy(() => {
        destroyed = true;
    })
    

</script>

<div class="absolute w-[100vw] h-[100vh] bg-black z-10000 bios-container overflow-scroll text-left">
    <div class="wrapper w-full h-full text-left p-4">
        <div class="flex items-center logo-div h-24">
            <img src="favicon.ico" alt="Logo" class="h-full p-4"/>  
            <div class="h-full">
                <div class="mb-4">==VICTORR.ME==</div>
                <div>/victorr/src/+page.svelte</div>
                <div>@{navigator.userAgent}</div>
            </div>
        </div>
        <div class="grid grid-cols-[4rem_1fr] gap-x-4 w-full mb-12">
            {#each textBox as line, i (i)}
                    {#if line.state === 1}
                        <span></span>
                    {:else}
                        <div class="line-bracket text-center">
                            {#if line.state === 0}
                                <span class="text-green-400">OK</span>
                            {:else if line.state === 2}
                                <span class="text-yellow-400">WARN</span>   
                            {:else}
                                <span class="text-red-400">ERR</span>   
                            {/if}
                        </div>
                    {/if}
                    {#if line.state === 0 || line.state === 1}
                        <span class="">{line.text}</span>   
                    {:else if line.state === 2}
                        <span class="text-yellow-400 font-bold">{line.text}</span>   
                    {:else}
                        <span class="text-red-400 font-bold">{line.text.toUpperCase()}</span>   
                    {/if}
            {/each}
            <div class="line-bracket text-center">
                <span class="text-blue-400">{spinner}</span>
            </div>
        </div>
    </div>
</div>

<style>
    .bg-black {
        background-color: var(--color-background);
    }

    .wrapper{
    }

    .line-bracket{
        border-left: 1px solid white;
        border-right: 1px solid white;
    }

</style>