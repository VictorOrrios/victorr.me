<script lang="ts">
	import { selectedType } from "$lib/stores";
    const type:number = 1;
</script>

<div class="group p-4 flex flex-col items-center gap-2">
    <img src="iconMeta.svg" alt="About this website" class="h-[80px] m-auto overflow-visible {$selectedType === type ? 'gradient':''}"/>
    <p class="rounded-[3px] group-hover:bg-(--theme-color-dark)">victorr.me</p>
</div>

<style>

	.gradient{
		background: radial-gradient(circle, var(--theme-color-lighter), var(--theme-color-basic), var(--color-background),var(--color-background));
		background-size: 300% 300%;
		animation: move-gradient 2s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
		border-radius: 100%;
		background-repeat: no-repeat;
	}


	@keyframes move-gradient {
		0% {
			background-position: 100% -60%;
		}
		100% {
			background-position: 15% 35%;
		}
	}

</style>