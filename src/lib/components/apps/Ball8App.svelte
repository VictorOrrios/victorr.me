<script lang="ts">
	import { onMount } from "svelte";

    interface prompt {
        text:string,
        chance:number
    }

    const threshold = 300;

    const prompts:prompt[] = [
        {text:"Yes",chance:1.0},
        {text:"Of course",chance:1.0},
        {text:"No doubt",chance:1.0},
        {text:"YES!",chance:1.0},
        {text:"Most likely",chance:1.0},
        {text:"Signs point to yes",chance:1.0},
        {text:"The stars say yes",chance:1.0},
        {text:"Afirmative",chance:1.0},
        {text:"Good outlook",chance:1.0},
        {text:"Positive",chance:1.0},
        {text:"No",chance:1.0},
        {text:"NO!",chance:1.0},
        {text:"Don't count on it",chance:1.0},
        {text:"No chance",chance:1.0},
        {text:"Very doubtful",chance:1.0},
        {text:"Bad outlook",chance:1.0},
        {text:"Of course no",chance:1.0},
        {text:"Absolutly no",chance:1.0},
        {text:"Negative",chance:1.0},
        {text:"Ask later",chance:1.0},
        {text:"Try again",chance:1.0},
        {text:"Can't answer now",chance:1.0},
        {text:"Can't preddict",chance:1.0},
        {text:"Concentrate harder",chance:1.0},
        {text:"No clue",chance:1.0},
        {text:"I don't know",chance:1.0},
        {text:"Why should I care",chance:0.5},
        {text:"Dont care",chance:0.5},
        {text:"Go ask your mom",chance:0.5},
        {text:"I'm tired",chance:0.5},
        {text:"Boring question",chance:0.5},
        {text:":p",chance:0.5},
        {text:"¯\\(ツ)/¯",chance:0.5},
        {text:"No, but yes",chance:0.5},
        {text:"No??????",chance:0.5},
        {text:"Yes??????",chance:0.5},
        {text:"??????",chance:0.5},
        {text:"Yep!",chance:0.5},
        {text:"Nop!",chance:0.5},
        {text:"Do you need to shake so hard?",chance:0.5},
        {text:"Shake me like a polaroid",chance:0.5},
    ];

    let sumChance = 0.0
    prompts.map((v,i,a) => sumChance+=v.chance);

    let container:HTMLDivElement;
    let text = $state("Shake me");
    let lastPosition = $state({x:0.0,y:0.0});
    let animation = $state(false);
    let rotation = $state(0);
    let positionX = $state(0);
    let positionY = $state(0);
    let scale = $state(1);


    function getCurrentPosition():{x:number,y:number}{
        if(container){
            const rect:DOMRect = container.getBoundingClientRect();
            return {x:rect.x, y:rect.y}
        }else{
            return {x:0.0, y:0.0};
        }   
    }

    function generateAnswer():string{
        const t = Math.random()*sumChance;
        let sum = 0.0;
        for(let i = 0; i<prompts.length; i++){
            sum += prompts[i].chance
            if(sum>=t) return prompts[i].text;
        }
        return prompts[prompts.length-1].text;
    }

    function shake(power:number){
        if(animation) return;
        power = Math.min(Math.max(power,1.8),1.0);
        animation = true;
        rotation += Math.random()*power * 180 - 90;
        positionX = Math.random()*power * 100 - 50;
        positionY = Math.random()*power * 100 - 50;
        scale = Math.random()*power*0.5 +0.5;

        setTimeout(() => {
            text = generateAnswer();
        },1000);

        setTimeout(() => {
            animation = false;
            scale = 1;
        },1500)
    }

    function pollPosition(){
        const current = getCurrentPosition();

        const distance = Math.sqrt(Math.pow(Math.abs(current.x-lastPosition.x),2.0)+
                                   Math.pow(Math.abs(current.y-lastPosition.y),2.0));

        if(distance>threshold){
            shake(distance/threshold-0.5);
        }

        lastPosition = current;

        setTimeout(() => {
            pollPosition();
        },100);
    }

    onMount(() => {
        lastPosition = getCurrentPosition();
        pollPosition();
    });

</script>

<div bind:this={container} class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-[170px] h-[170px] rounded-full flex items-center justify-center border-2 ball border-white overflow-hidden">
        <div class="triangle z-1 {animation? 'active-tri': ''}"
             style="transform: rotate({rotation}deg) scale({scale},{scale}); 
             margin-top: {positionX}%; margin-left: {positionY}%;"></div>
    </div>
    <p class="absolute z-2 w-[100px] text-center select-none text {animation? 'active-text': ''}">{text}</p>
</div>

<style>
    .ball{
        background-color: var(--color-background);
    }

    .text{
        font-size: 120%;
        font-weight: 900;
        transition: color 1s ease-out;
    }

    .active-text{
        color:transparent
    }

    .triangle {
        width: 100px;
        aspect-ratio: 1 / 0.86602540378;
        -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
		background: radial-gradient(circle, var(--theme-color-lighter), var(--theme-color-basic), transparent, transparent);
        background-size: 150% 150%;
        background-position: 50% 10%;
		background-repeat: no-repeat;
        transition: background-size 0.5s ease-out, background-position 0.5s ease-out,
         transform 1.2s ease-out, margin 1.2s ease-out;
    }

    .active-tri{
        background-size: 75% 75%;
        background-position: 50% 100%;
    }
</style>