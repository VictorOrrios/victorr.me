<script lang="ts">
	import { goto } from "$app/navigation";
	import Clock from "$lib/components/Clock.svelte";
	import DesktopIcon from "$lib/components/DesktopIcon.svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import WindowManager from "$lib/components/WindowManager.svelte";
	import { activeWindows, occupiedCells, selectedType, themeStore, window_library } from "$lib/stores";
	import { nextTheme, updateTheme } from "$lib/tools/themeSwitcher";
	import { addWindow, closeWindow, maximizeWindow, minimizeWindow } from "$lib/tools/windowFunctions";
	import { onMount } from "svelte";
	import { slide } from "svelte/transition";


	$occupiedCells = [];

	let isInFullScreen:boolean = $state(false);

	const minimizedWindows:{title:string,type:number}[] = $derived.by(() => {
		let list:{title:string,type:number}[] = [];
		$activeWindows.forEach(aw => {
			if(!aw.onScreen){
				const window_data = window_library.find(w => w.type === aw.type);
				if(window_data !== undefined)
					list.push({title:window_data.text,type:window_data.type});
			}
		});
        return list;
    });

	function toogleFullScreen(){
		if(isInFullScreen){
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if ((document as any).webkitExitFullscreen) { // Safari
				(document as any).webkitExitFullscreen();
			} else if ((document as any).msExitFullscreen) { // IE11
				(document as any).msExitFullscreen();
			}
		}else{
			let elem: HTMLElement = document.documentElement
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if ((elem as any).webkitRequestFullscreen) { // Safari
				(elem as any).webkitRequestFullscreen();
			} else if ((elem as any).msRequestFullscreen) { // IE11
				(elem as any).msRequestFullscreen();
			}
		}
		isInFullScreen = !isInFullScreen;
	}


	function onClickAbout(){
		const w = window_library.find(w => w.text === "about");
		if(w) addWindow(w.type);
	}
	
	function onClickShutdown(){
		location.reload();
	}

	function onClickStyle(){
		nextTheme();
	}

	function onClickFoo(){
		nextTheme();
	}

	function onClickBackground(){
		nextTheme();
		console.log($activeWindows);
	}

	function onClickHelp1(){
		window_library.forEach(w => {
			closeWindow(w.type);
		});
	}

	function onClickHelp2(){
		window_library.forEach(w => {
			minimizeWindow(w.type);
		});
	}
	
	function onClickDesktop(){
		$selectedType = 0;
	}

	onMount(() => {

	});

</script>

<svelte:head>
	<title>victorr.me</title>
	<meta name="description" content="Landing page" />
</svelte:head>

<div class="w-[100vw] overflow-hidden flex flex-col content-center">

	<!--TOP BAR-->
	<div class="w-full h-8 flex justify-between p-0 text-sm ">
		<div class="flex gap-6">
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
						<DropdownMenu.Item onclick={onClickAbout}>
							About
						</DropdownMenu.Item>
						<DropdownMenu.Item onclick={onClickFoo}>
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
						<DropdownMenu.Item onclick={toogleFullScreen}>
							{#if isInFullScreen}
								Exit fullscreen
							{:else}
								Enter fullscreen
							{/if}
						</DropdownMenu.Item>
						<DropdownMenu.Item onclick={onClickShutdown}>
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
						{#each window_library as window, i (window.type)}
							<DropdownMenu.Item onclick={() => addWindow(window.type)}>
								{window.text}
							</DropdownMenu.Item>
						{/each}
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
						<DropdownMenu.Item onclick={onClickHelp1}>
							Close all windows
						</DropdownMenu.Item>
						<DropdownMenu.Item onclick={onClickHelp2}>
							Minimize all windows
						</DropdownMenu.Item>
						<a href="mailto:victorr.orrios.b@gmail.com?subject=I found a bug in victorr.me">
							<DropdownMenu.Item>Report a bug</DropdownMenu.Item>
						</a>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>

			<div class="flex items-center">
				{#each minimizedWindows as w, i (w.type)}
					<button class="pr-2 pl-2 mini-title" 
						onclick={() => {maximizeWindow(w.type)}}
						transition:slide={{axis: 'x', duration: 400 }}>
						{w.title}
					</button>
				{/each}
			</div>
		</div>

		<div class="flex items-center justify-center pr-8"><Clock/></div>
	</div>

	<div class="w-full h-[calc(100vh-2rem)]">
		<div class="w-full h-[calc(100vh-2rem)] absolute z-30 pointer-events-none overflow-hidden" >
			<WindowManager/>
		</div>

		<div class="w-full h-full overflow-hidden">
			<button onclick={onClickDesktop} class="w-full h-[calc(100vh-2rem)] absolute z-0 cursor-default!" 
					aria-label="desktop background"></button>
			{#each window_library as window, i (window.type)}
				<DesktopIcon type={window.type}/>
			{/each}
		</div>

	</div>
	
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

	.desktop-icon.switch-bg{
		border: 3px solid blue;
	}

	.desktop-icon.switch-bg2{
		border: 3px solid red;
	}

	.desktop-icon.switch-bg3{
		border: 3px solid yellow;
	}


	.bg-basic{
		background-color: var(--theme-color-basic);
	}

	.mini-title:hover{
		background: linear-gradient(var(--theme-color-darker), var(--theme-color-basic), var(--theme-color-lighter));
		animation: move-gradient-2 0.3s ease-out forwards;
		background-repeat: no-repeat;
		background-size: 100% 200%;
	}

	@keyframes move-gradient {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 1000% 0%;
		}
	}

	@keyframes move-gradient-2 {
		0% {
			background-position: 0% -100%;
		}
		100% {
			background-position: 0% 100%;
		}
	}



</style>