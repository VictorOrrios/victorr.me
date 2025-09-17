<script lang="ts">

    const articles = [
        "hobby-raytracer",
    ]

</script>

<div class="h-full w-hull main-container p-4 overflow-auto backdrop-blur-md">
    <div class="flex flex-wrap">
        {#each articles as article}
            <a class="flex flex-col items-center gap-2 m-4" href={"/articles/"+article}>
                <img src="page4.svg" alt="File" class="h-[80px]">
                {article}
            </a>
        {/each}
    </div>
</div>

<style>
    img{
		transform-origin: center center;
		transform-style: preserve-3d;
		transform: rotateX(30deg) rotateY(-30deg) scaleX(0.8);
	}

    .main-container{
        border: 1px solid white;
    }
</style>