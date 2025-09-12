<script lang="ts">
	import { selectedType } from "$lib/stores";
    const type:number = 2;
</script>

<div class="group  p-4 flex flex-col items-center gap-2">
    <img src="page4.svg" alt="About this website" class="h-[80px] m-auto overflow-visible {$selectedType === type ? 'active':''}"/>
    <p class="rounded-[3px] group-hover:bg-(--theme-color-dark)">resume</p>
</div>

<style>

	img{
		transform-origin: center center;
		transform-style: preserve-3d;
		transform: rotateX(30deg) rotateY(-30deg) scaleX(0.8);

	}

	.active{
		animation: spin 3s linear infinite, gradient-slide 0.5s ease-out forwards;
		background: radial-gradient(circle, var(--theme-color-lighter), var(--theme-color-basic), var(--color-background), var(--color-background));
		background-size: 200% 200%;
		background-repeat: no-repeat;
	}

	@keyframes spin {
		from {
			transform: rotateX(30deg) rotateY(-30deg) scaleX(0.8);
		}
		to {
			transform: rotateX(30deg) rotateY(330deg) scaleX(0.8);
		}
	}

	@keyframes gradient-slide {
		0% {
			background-position: center -90%;
		}
		100% {
			background-position: center -30%;
		}
	}

</style>