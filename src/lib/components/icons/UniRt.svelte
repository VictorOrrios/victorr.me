<script lang="ts">
	import { selectedType } from "$lib/stores";
	import { draw } from "svelte/transition";
    const type:number = 8;
</script>

<div class="group  p-4 flex flex-col items-center gap-2 relative">
    {#if $selectedType === type}
		<svg class="absolute" width="80" height="80" viewBox="0 0 400 300">
			<defs>
				<linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stop-color="var(--theme-color-darker)" />
				<stop offset="100%" stop-color="var(--theme-color-lighter)" />
				</linearGradient>
			</defs>
			<polyline
				in:draw={{duration: 750}}
				out:draw={{duration: 500}}
				points="0,0 175,190 220,0 350,110, 270,190"
				fill="none"
				stroke="url(#lineGradient)"
				stroke-width="15" />
		</svg>
    {/if}
    <img src="teapot.svg" alt="teapot" class="h-[50px] ml-[10px] mt-[30px] overflow-visible z-[6]"/>
    <p class="rounded-[3px] group-hover:bg-(--theme-color-dark)">uni-rt</p>
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