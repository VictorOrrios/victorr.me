<script lang="ts">
	import { text } from "@sveltejs/kit";
	import { onDestroy, onMount } from "svelte";

    type line = {
        text:string,
        state:number
    };
 
    const spinner_states = ["/","—","\\","|"];

    let text_library = [
        "Hola, que tal estas?",
        "Doin' sm, idk",
        "Working on it, don't rush",
        "Working working working working",
        "Loading loader to load",
        "This is a fake loading screen btw",
        "You are not supposed to read all of this!",
        "Ain't this a cool animation",
        "Wait for 32 picoseconds longer",
        "Only 23.5 hours to go!",
        "2% complete",
        "Thinking 100 lines is hard, you got any suggestions?",
        "This text is 1Kb worth of wasted data",
        "Screwing screws",
        "Hammering nails",
        "Tipping cows",
        "Spoting UFOS",
        "Shooting cans",
        "Drinking milkshake",
        "Eating ice-cream",
        "Petting dog",
        "Petting cat",
        "Petting cow",
        "Doing a burnout",
        "Patching the mainframe firmware",
        "Hacking the CIA website to display kitties",
        "Installing cryptominer, kidding, unless",
        "My fingers hurt writting this fast",
        "If I did some typo on these don't tell me",
        "Mopping tears from the floor",
        "Reading the book my friend gave me 5 years ago",
        "Watching the series you told me about",
        "Scratching behind the ears",
        "Taking a shower",
        "Horsing around",
        "Putting all the eggs in one basket",
        "Dunking from the three point line",
        "Playing underwatter golf",
        "Lore impsum blah blah, I forgor the rest",
        "Pretending this line is funny",
        "Stealing credit card info",
        "Getting into a videocall",
        "Recording audio",
        "Recording video",
        "Installing tracker",
        "Posting about how cool this page is",
        "Logging IP",
        "Pulling location",
        "Snooping around your open tabs",
        "Following victor on linkedin",
        "Emailing victor to give him a job position",
        "Redacting internship acceptance email",
        "Consulting with the magic 8 ball",
        "Throwing dice to set random seed",
        "Throwing something to the wall and seeing what sticks",
        "Disregarding COORS policy",
        "DDosing the hackaton API",
        "Uploading JSON to the db",
        "Taking a small 5 min break",
        "Taking turns for the xbox360",
        "Taking the turn for the ps4",
        "Taking turns for the nintendo ds",
        "Hydrating plants",
        "Scrathing dvds",
        "Putting hard drives in the microwave",
        "Smashing ssds",
        "Polishing marble",
        "Stealing ASCII art from a website I found",
        "Watching some youtube",
        "Coding while in class",
        "Reading Tailwind docs again",
        "Consulting with Gepetto",
        "Asking Emi for help",
        "Want to add a line? Email/dm me",
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
        if(r>0.90) new_state = 2;
        if(r>0.95) new_state = 3;
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
<!--found on https://textart.sh/topic/crow-->
<pre class="fixed right-8 bottom-8 text-[1.6vh]! leading-none select-none">                                                                  
              ░░                                                  
          ░░  ░░                                                  
░░░░      ░░░░░░░░                                                
    ░░░░  ░░▒▒▒▒▒▒░░                                              
      ▒▒▒▒  ▓▓▒▒▓▓▒▒░░                                            
      ░░▓▓▒▒▓▓▓▓▓▓▒▒░░▒▒░░░░░░    ░░▒▒██▓▓▓▓██▓▓▒▒░░              
        ▒▒▓▓▓▓▓▓▒▒▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓██████▓▓▒▒░░░░░░░░      
          ▒▒▓▓▒▒▓▓▓▓▒▒▓▓▓▓▓▓▓▓░░▓▓▓▓▓▓████▓▓▓▓▓▓▓▓▓▓▒▒▒▒░░    ░░  
          ░░▓▓▓▓████▓▓▓▓▓▓▓▓▒▒▓▓▓▓▒▒▒▒▓▓▓▓████▓▓▒▒▓▓▒▒▒▒░░▒▒▒▒░░  
            ▒▒▓▓░░▓▓████▓▓▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▓▓██▓▓▒▒▒▒▒▒▒▒░░    
              ▒▒▒▒▒▒▓▓██▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▓▓▓▓▒▒            
              ▒▒▒▒▒▒▓▓▒▒▒▒▓▓▓▓▒▒████▓▓▓▓▓▓██████▓▓▓▓▓▓▒▒          
                ▒▒  ▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▒▒░░      
                    ▓▓▒▒▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒██████▒▒░░░░        
                    ▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▓▓▒▒▓▓░░    ▓▓▓▓▓▓▒▒          
                  ▒▒▒▒▒▒▓▓░░▒▒░░▒▒▒▒▓▓▓▓▓▓▓▓▒▒    ▓▓▓▓▒▒▓▓▒▒      
                  ▒▒▒▒▒▒▓▓▒▒▒▒░░░░▒▒▒▒▒▒▒▒▓▓▒▒      ▓▓▓▓░░░░░░░░  
                  ▒▒▒▒▓▓▒▒▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▓▒▒▓▓▒▒      ▒▒▓▓        
                ░░▓▓▒▒▓▓██▒▒▓▓▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒          ▒▒▒▒      
                ▒▒▓▓▓▓▓▓██  ▒▒▒▒▓▓▒▒▒▒▓▓▓▓░░░░              ▒▒░░  
                ▒▒██▓▓▒▒    ░░▓▓▒▒▒▒▒▒▒▒▒▒░░                      
                ░░██▒▒      ▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒░░                    
                ▒▒░░        ▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒░░                    
                ▒▒          ▓▓▒▒▒▒▒▒▓▓▓▓▒▒▒▒░░                    
                          ▒▒▓▓▒▒▒▒▒▒░░▓▓▒▒▒▒░░                    
                          ▓▓▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒                      
                        ░░▓▓▒▒░░▒▒▒▒▓▓▓▓▒▒░░░░                    
                        ░░▓▓▒▒▒▒▒▒▓▓▓▓▓▓▒▒░░░░                    
                        ░░▒▒▒▒▓▓▓▓▓▓▓▓▓▓▒▒░░                      
                        ▒▒▒▒▓▓▒▒▒▒▒▒▓▓▓▓▒▒░░                      
                        ▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒░░                      
                        ▒▒▓▓▓▓▓▓▓▓▒▒▒▒░░░░░░                      
                        ▒▒██▒▒▓▓▓▓▓▓░░▒▒░░                        
                        ▓▓▓▓▒▒▓▓▓▓▓▓▒▒░░░░                        
                        ▒▒▒▒▒▒▓▓░░▒▒▒▒  ░░                        
                      ░░▓▓▒▒▒▒▒▒  ▒▒▒▒  ░░                        
                      ▒▒▒▒░░▒▒▒▒  ░░░░                            
                      ▒▒░░  ▒▒░░  ░░                              
                    ░░░░░░░░░░░░  ░░                              
                    ░░░░  ▒▒░░░░  ▒▒                              
                    ▒▒░░  ░░      ░░                              
                  ░░░░  ░░░░                                      
                  ░░    ░░                                        
</pre>
    <div class="wrapper w-full h-full text-left p-4">

<pre class="leading-none"> __     __   
 \ \   / /o    
  \ \ / //     ==VICTORR.ME==
  /\ V /_,-.   
 o  \_/-(_/    /victorr/src/+page.svelte
   //          @{navigator.userAgent}
  (__)       

</pre>

    <div class="grid grid-cols-[4rem_1fr] gap-x-4 w-full pb-12">
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
                    {#if line.state === 0}
                        <span class="">{line.text}.</span>   
                    {:else if line.state === 1}
                        <span class="">{line.text}...</span>   
                    {:else if line.state === 2}
                        <span class="text-yellow-400 font-bold">{line.text}.</span>   
                    {:else}
                        <span class="text-red-400 font-bold">{line.text.toUpperCase()}.</span>   
                    {/if}
            {/each}
            <div class="line-bracket text-center">
                <span class="text-blue-400">{spinner}</span>
            </div>
        </div>
    </div>
</div>

<style>
    pre{
        background-color: transparent;
        box-shadow: none;
    }

    .bg-black {
        background-color: var(--color-background);
    }

    .line-bracket{
        border-left: 1px solid white;
        border-right: 1px solid white;
    }

</style>