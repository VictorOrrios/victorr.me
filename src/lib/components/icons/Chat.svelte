<script lang="ts">
	import { selectedType } from "$lib/stores";
    const type:number = 6;

    let iconText = $state(":)")
    $effect(() => {
        if($selectedType === type){
            setTimeout(() => iconText = ";)",800)
            setTimeout(() => iconText = ":)",1300)
        }
    })
</script>

<div class="group p-4 flex flex-col items-center gap-2">
    <div class="flex flex-col items-center {$selectedType === type ? 'active-img':''}">
        <div class="absolute text-center icon-text {$selectedType === type ? 'active-txt':''}">
            {iconText}
        </div>
        <div class="absolute w-[20px] h-[20px] rounded-full ml-[57px] {$selectedType === type ? 'active-circle':''}"></div>
        <img src="chat.svg" alt="About this website" class="h-[80px] w-[60px] m-auto overflow-visible incon-img "/>
    </div>
    <p class="rounded-[3px] group-hover:bg-(--theme-color-dark)">chat</p>
    
</div>

<style>

    .icon-text{
        letter-spacing: -2px;
        font-size: 100%;
        margin-top: 20px;
    }

    .active-circle{
        animation: circle-anim 0.3s ease-in forwards;
		box-shadow: 0px 0px 8px var(--theme-color-lighter);
        transition: box-shadow 0.3s ease;
    }

	.active-txt{
		animation: text-anim 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
	}

    .active-img{
		animation: img-anim 0.7s ease forwards;

    }

    @keyframes text-anim{
        0%{
            rotate: 0deg;
            font-size: 100%;
            margin-top: 20px;
        }
        100%{
            rotate: 90deg;
            font-size: 110%;
            margin-top: 18px;
        }
    }

	@keyframes img-anim {
		0% { transform:translateY(0%);}
        25% { transform:translateY(-15%); }
        50% { transform:translateY(0%); }
        75% { transform:translateY(-7%); }
        100% { transform:translateY(0%); }
	}

    @keyframes circle-anim {
        0%{
            opacity: 0%;
            background-color: var(--theme-color-darker);
            border: 1px solid var(--theme-color-lighter);
        }
        50%{
            opacity: 100%;
        }
        100%{
            opacity: 100%;
            background-color: var(--theme-color-lighter);
            border: 1px solid var(--theme-color-basic);
        }
    }

</style>