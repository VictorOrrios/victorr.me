<script lang="ts">
    import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";

    type Option = {
        text:string;
        correct:boolean;
        comment:string;
    };

    type Question = {
        prompt: string;
        options: Option[];
    };

    type Reward = {
        text: string;
        image: string
    };


    let q_number:number = $state(0);
    let answered:boolean = $state(false);
    let selectedValue: string = $state("");
    let currentComment:string = $state("");
    let score:number = $state(0);

    const questions:Question [] = [
        {
            prompt:"Which is correct about ray hitting a surface?",
            options: [
                {text:"Reflection goes OUT and refraction IN",correct:true,comment:""},
                {text:"Reflection goes IN and refraction OUT",correct:false,comment:""},
                {text:"Refraction goes OUT and reflection OUT",correct:false,comment:""},
                {text:"Reflection goes IN and refraction IN",correct:false,comment:""},
            ]
        },
        {
            prompt:"What does BTDF mean?",
            options: [
                {text:"Bidirectional Transfer Distribution Function",correct:true,comment:""},
                {text:"Bidirectional Transition Distribution Function",correct:false,comment:""},
                {text:"Bicycle Tram Drone FerryOUT",correct:true,comment:"I’ll give it to you for free"},
                {text:"Bidirectional Transmision Distribution Function",correct:false,comment:"That's not how you spell transmission"},
                {text:"Bidirectional Transmission Distribution Function",correct:true,comment:""},
            ]
        },
        {
            prompt:"Which is correct?",
            options: [
                {text:"Cornell teapot",correct:false,comment:""},
                {text:"Utha teapot",correct:false,comment:"It’s Utah not Utha"},
                {text:"MIT teapot",correct:false,comment:""},
                {text:"Stanford dragon",correct:true,comment:"Yep, look it up"},
            ]
        },
        {
            prompt:"Is obsidian considered a type of glass?",
            options: [
                {text:"Yes",correct:true,comment:""},
                {text:"No",correct:false,comment:""},
                {text:"Perchance",correct:true,comment:""},
            ]
        },
        {
            prompt:"Who is my best friend currently?",
            options: [
                {text:"Bruce Walter",correct:true,comment:""},
                {text:"Walter White",correct:false,comment:""},
                {text:"Jesse Pinkman",correct:true,comment:"Yeah, I’m cool like that 😎"},
                {text:"Horizontally rotating colorful quad",correct:false,comment:""},
                {text:"Saul Goodman",correct:false,comment:""},
            ]
        },
        {
            prompt:"Snell’s window appears when…",
            options: [
                {text:"the reflective index is bigger than the one the medium you are in has",correct:true,comment:""},
                {text:"the reflective index is smaller than the one the medium you are in has",correct:false,comment:""},
                {text:"you show up to his house",correct:true,comment:"Correct by technicality"},
            ]
        },
        {
            prompt:"What is my favourite ice cream flavour?",
            options: [
                {text:"Chocolate",correct:false,comment:""},
                {text:"Strawberry",correct:false,comment:""},
                {text:"Coffee, Turron and dulce de leche",correct:true,comment:""},
                {text:"Vanilla",correct:false,comment:""},
            ]
        },
        {
            prompt:"What's your favourite ice cream flavour?",
            options: [
                {text:"Chocolate",correct:false,comment:"This is no ones favourite flavour, stop lying"},
                {text:"Strawberry",correct:true,comment:""},
                {text:"Coffee, Turron and dulce de leche",correct:true,comment:""},
                {text:"Vanilla",correct:true,comment:""},
                {text:"Other",correct:true,comment:""},
            ]
        },
    ];

    const rewards:Reward[] = [
        {
            text:"Really? Did you do it on purpose? Anyway, read the book, you need it.",
            image:"/articles/hobby-raytracer/book.jpg",
        },
        {
            text:"Better than nothin'. A low effort reward for a low effort attempt:",
            image:"/articles/hobby-raytracer/hal.gif",
        },
        {
            text:"I don't have a joke for 2/8. A Walter sticker or somethin",
            image:"/articles/hobby-raytracer/walter.webp",
        },
        {
            text:"Do better next time. Cool water cube gif:",
            image:"/articles/hobby-raytracer/water.gif",
        },
        {
            text:"You passed! (barely). Your rewards is a signed copy of my favourite render",
            image:"/articles/hobby-raytracer/reward.png",
        },
        {
            text:"You did somewhat decent, sort of, your reward is the full tierlist of artifacts",
            image:"/articles/hobby-raytracer/tierlist.png",
        },
        {
            text:"And your reward is Spot the cow homeomorphing to a sphere, how cool is that!",
            image:"/articles/hobby-raytracer/Spot_the_cow.gif",
        },
        {
            text:"Almost perfect! Here is a Bruce gif with green artifacts, enjoy it.",
            image:"/articles/hobby-raytracer/bruce.gif",
        },
        {
            text:"And your reward is...",
            image:"/articles/hobby-raytracer/bragging.gif",
        },
    ];

    function reset() {
        q_number = 0;
        score = 0;
        selectedValue="";
    }

    function next() {
        answered = false;
        q_number++;
        currentComment="";
    }

    function submit() {
        answered = true;
        let selectedOption = questions[q_number].options.find(opt => opt.text === selectedValue);
        if(selectedOption){
            if(selectedOption.correct) score++;
            currentComment = selectedOption.comment;
        }
    }

</script>

<div class="min-h-80">
    {#if q_number < questions.length}
        <div class="question">
            <h3>{questions[q_number].prompt}</h3>
            <hr>
            <RadioGroup.Root bind:value={selectedValue}>
            {#each questions[q_number].options as opt, i}
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value={opt.text} id={"opt-" + q_number + "-" + i} disabled={answered}/>
                    <Label for={"opt-" + q_number + "-" + i} 
                        class="text-base {(answered && !opt.correct) ? 'line-through':''}">
                        {opt.text}
                    </Label>
                </div>
            {/each}
            </RadioGroup.Root>
        </div>
    {:else}
        <h3>Congratulations! You got <span>{score}</span>/8 </h3>
        <hr>
        <p>{rewards[score].text}</p>
        <img src={rewards[score].image} alt="reward" class="m-auto mt-4 max-h-96 max-w-[85%] h-auto w-auto object-contain"/>
    {/if}
    <div class="flex mt-2 gap-6">
        {#if q_number >= questions.length}
            <button onclick={reset}>>Reset</button>
        {:else}
            {#if answered}
                    <button onclick={next}>>Next</button> 
                    <p>{currentComment}</p>
            {:else}
                <button onclick={submit}>>Submit</button>
            {/if}
        {/if}
    </div>
</div>
    
<style>
    hr {
        margin-bottom: 0.5rem;
    }

    span{
        color: var(--color-theme-1);
    }

    button {
		transition: all 0.2s linear; 
        color: var(--color-theme-1);
        border-radius: var(--radius-xl);
	}

	button:hover{ 
		color: var(--text-foreground); 
		background-color: var(--color-theme-1); 
		font-weight: 900; 
	}
</style>
