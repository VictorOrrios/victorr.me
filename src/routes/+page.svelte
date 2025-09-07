<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import Clock from "$lib/components/Clock.svelte";
	import { nextTheme, updateTheme } from "$lib/tools/themeSwitcher";


	function onClickName(){
		nextTheme();
	}

	function onClickClick(){
		nextTheme();
	}
	
	function onClickStyle(){
		nextTheme();
	}

	function onClickBackground(){
		nextTheme();
	}

	function onClickHelp(){
		nextTheme();
	}

	onMount(() => {
		//goto("articles/hobby-raytracer");
	});

</script>

<svelte:head>
	<title>victorr.me</title>
	<meta name="description" content="Landing page" />
</svelte:head>

<div class="w-full flex-col content-center">

	<!--TOP BAR-->
	<div class="w-full h-8 flex justify-between p-0 text-sm ">
		<div class="w-[30rem] h-full p-0 grid grid-cols-[10rem_auto_auto_auto_auto]">
			<button type="button" onclick={onClickName} class=" name-card">VICTOR ORRIOS</button>
			<button type="button" onclick={onClickClick}>CLICK</button>
			<button type="button" onclick={onClickStyle}>STYLE</button>
			<button type="button" onclick={onClickBackground}>BACKGROUND</button>
			<button type="button" onclick={onClickHelp}>HELP</button>
		</div>
		<div class="flex items-center justify-center pr-8"><Clock/></div>
	</div>
	<a href="articles/hobby-raytracer">link</a>
	<img src="iconMeta.svg" alt="About this website" class="w-[100px]"/>
	
</div>

<style>
	button {
		cursor: pointer;
	}

	button:hover{
		font-weight: 900;
	}

	.name-card{
		background: linear-gradient(to right, var(--theme-color-darker), var(--theme-color-basic), var(--theme-color-lighter), var(--theme-color-basic) ,var(--theme-color-darker));
		background-size: 500% 100%;
		animation: move-gradient 25s linear infinite;
		
	}

	.bg-basic{
		background-color: var(--theme-color-basic);
	}

	@keyframes move-gradient {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 500% 0%;
		}
	}



</style>