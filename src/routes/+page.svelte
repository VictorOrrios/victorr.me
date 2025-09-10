<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import Clock from "$lib/components/Clock.svelte";
	import { nextTheme, updateTheme } from "$lib/tools/themeSwitcher";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { Button } from "$lib/components/ui/button";


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
		<div class="h-full p-0 grid grid-cols-[auto_auto_auto_auto_auto] gap-4">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<button type="button" {...props} class="name-card">
							<span>VICTOR ORRIOS</span>
						</button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56" align="start">
					<DropdownMenu.Item onclick={onClickHelp}>
						About
					</DropdownMenu.Item>
					<DropdownMenu.Item onclick={onClickHelp}>
						Resume (PDF)
					</DropdownMenu.Item>
					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger>Contac info</DropdownMenu.SubTrigger>
						<DropdownMenu.SubContent>
						<a href="mailto:victorr.orrios.b@gmail.com">
							<DropdownMenu.Item>Email</DropdownMenu.Item>
						</a>
						<a href="https://www.linkedin.com/in/víctor-orrios-4b1579366">
							<DropdownMenu.Item>LinkedIn</DropdownMenu.Item>
						</a>
						<a href="https://www.instagram.com/v.baron_?igsh=MTh5ejJjM213dnYzbA==">
							<DropdownMenu.Item>Instagram</DropdownMenu.Item>
						</a>
						<a href="https://github.com/VictorOrrios">
							<DropdownMenu.Item>Github</DropdownMenu.Item>
						</a>
						</DropdownMenu.SubContent>
					</DropdownMenu.Sub>
					<DropdownMenu.Separator />
					<DropdownMenu.Item onclick={onClickHelp}>
						Enter fullscreen
					</DropdownMenu.Item>
					<DropdownMenu.Item onclick={onClickHelp}>
						Shutdown
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<button type="button" {...props}>CLICK</button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56" align="start">
					<DropdownMenu.Item onclick={onClickHelp}>
						victorr.me
					</DropdownMenu.Item>
					<DropdownMenu.Item onclick={onClickHelp}>
						Resume
					</DropdownMenu.Item>
					<DropdownMenu.Item onclick={onClickHelp}>
						About
					</DropdownMenu.Item>
					<DropdownMenu.Item onclick={onClickHelp}>
						Articles
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<button type="button" onclick={onClickStyle}>STYLE</button>
			<button type="button" onclick={onClickBackground}>BACKGROUND</button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<button type="button" {...props}>HELP</button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56" align="start">
					<DropdownMenu.Item onclick={onClickHelp}>
						Close all windows
					</DropdownMenu.Item>
					<DropdownMenu.Item onclick={onClickHelp}>
						FAQ
					</DropdownMenu.Item>
					<a href="mailto:victorr.orrios.b@gmail.com?subject=I found a bug in victorr.me">
						<DropdownMenu.Item>Report a bug</DropdownMenu.Item>
					</a>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div class="flex items-center justify-center pr-8"><Clock/></div>
	</div>
	<a href="articles/hobby-raytracer">link</a>
	<img src="iconMeta.svg" alt="About this website" class="w-[100px]"/>
	<img src="page.svg" alt="About this website" class="w-[100px]"/>
	<img src="man.svg" alt="About this website" class="w-[100px]"/>
	<img src="folder.svg" alt="About this website" class="w-[100px]"/>
	
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
		background-size: 1000% 100%;
		animation: move-gradient 30s linear infinite;

		margin: 4px;
		width: 1.5rem;
		border-radius: 100%;
		box-shadow: 0px 0px 5px var(--theme-color-lighter);
		overflow: hidden;

		transition: 
			width 0.5s ease,
			margin 0.1s ease,
			font-size 0.5s ease,
			border-radius 0.7s ease-in,
			box-shadow 0.7s ease-in;
	}

	.name-card:hover{
		animation: move-gradient 60s linear infinite;

		margin: 0px;
		width: 10rem;
		border-radius: 0%;
		box-shadow: 0 0px 0px var(--theme-color-lighter);

		transition: 
			width 0.5s ease,
			margin 0.5s ease,
			font-size 0.5s ease,
			border-radius 0.2s ease-out,
			box-shadow 0.2s ease-out;
	}

	.name-card span{
		display: inline-block;
		white-space: nowrap;
		opacity: 0;
		font-weight: 900;

		transform: translateX(100%); 
		transition: transform 0.5s ease, opacity 0.5s ease; /* Slide from the right*/
	}

	.name-card:hover span {
		opacity: 1;
		transform: translateX(0); 
	}


	.bg-basic{
		background-color: var(--theme-color-basic);
	}

	@keyframes move-gradient {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 1000% 0%;
		}
	}



</style>