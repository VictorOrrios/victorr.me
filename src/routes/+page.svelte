<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	onMount(() => {
		//goto("articles/hobby-raytracer");
	});

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="flex-col content-center">
	<h1>Hello!</h1>
	<p><a href="https://victorr.me">victorr.me</a> is under construction</p>
	<img src="penguin.gif" alt="Penguin with jackhammer" class="h-[10vh] w-[10vh]">
	<p>In the mean time why don't you visit the <a href="articles/hobby-raytracer">article</a> that I wrote?</p>
</div>