<script lang="ts">
	import { selectedType } from "$lib/stores";
    const type:number = 4;
</script>

<div class="group  p-4 flex flex-col items-center gap-2">
    <div class="h-[80px] flex items-center justify-center">
        <img src="folder4.svg" alt="Folder" class="h-[70px] z-[6]"/>
	    <div class="absolute rounded-[100%] z-[7] overflow-hidden {$selectedType === type ? 'active':''}">
            <div class="w-[200%] h-[200%] ml-[-50%] mt-[-10%] {$selectedType === type ? 'active-bg':''}"></div>
        </div>
        <img src="square.svg" alt="Square on top of folder" class=" w-[68px] z-[8] absolute scale-y-[0.75] top-[29px]"/>
    </div>
    <p class="rounded-[3px] group-hover:bg-(--theme-color-dark)">articles</p>
</div>

<style>

	.active{
        animation: move-up 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
		transform-origin: center center;
		box-shadow: 0px 0px 10px var(--theme-color-lighter);
	}

    .active-bg{
        background: linear-gradient(var(--theme-color-darker), var(--theme-color-basic), var(--theme-color-lighter));
        animation: rotate-bg 2.5s ease-out forwards;
    }


	@keyframes move-up {
		0% {
			margin-top: 30%;
            width: 35%;
		    height: 10%;
		}
		100% {
			margin-top: -15%;
            width: 35%;
		    height: 35%;
		}
	}
	@keyframes rotate-bg {
		from { transform: rotate(0deg); }
		to   { transform: rotate(180deg); }
	}
	

</style>