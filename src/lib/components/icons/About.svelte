<script lang="ts">
	import { selectedType } from "$lib/stores";
    const type:number = 3;
</script>

<div class="group  p-4 flex flex-col items-center gap-2">
    <img src="man.svg" alt="Man" class="h-[80px] m-auto overflow-visible z-[6]"/>
    <p class="rounded-[3px] group-hover:bg-(--theme-color-dark)">about</p>
	<div class="absolute rounded-full z-[5] {$selectedType === type ? 'active':''}"></div>
</div>

<style>

	.active{
		background: linear-gradient(var(--theme-color-darker), var(--theme-color-basic), var(--theme-color-lighter));
		animation: size 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) forwards, rotate-bg 2.5s ease-out forwards;
		transform-origin: center center;
		box-shadow: 0px 0px 5px var(--theme-color-lighter);
		transition: box-shadow 0.3s linear;
	}


	@keyframes size {
		0% {
			margin-top: 30%;
			width: 0%;
			height: 0%;
		}
		100% {
			margin-top: 0%;
			width: 55%;
			height: 55%;
		}
	}
	@keyframes rotate-bg {
		from { transform: rotate(0deg); }
		to   { transform: rotate(360deg); }
	}
	

</style>