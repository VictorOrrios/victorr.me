<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import Clock from "$lib/components/Clock.svelte";
	import { nextTheme, updateTheme } from "$lib/tools/themeSwitcher";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { Button } from "$lib/components/ui/button";
	import interact from "interactjs";


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
			
		/*
		let occupied:boolean[][] = [];
		const maxX = 12, maxY = 4;
		for(let i=0; i<maxY; i++){
			occupied[i] = [];
			for(let j=0; j<maxX; j++){
				occupied[i][j] = false;
			}
		}
		occupied[0][0] = true;
		occupied[0][1] = true;
		*/

		function isCellOccupied(x: number, y: number) {
			return occupiedCells.some(cell => cell.x === x && cell.y === y);
		}
		
		const cellWidth = 100;
		const cellHeight = 100;

		const occupiedCells: { x: number, y: number }[] = [];
		

		const elements = document.querySelectorAll<HTMLElement>(".desktop-icon");

		elements.forEach((el) => {

			const prect = el.parentElement!.getBoundingClientRect();
			if(!prect) return;

			const rect = el.getBoundingClientRect();
			if(!rect) return;

			console.log("COORX:",rect.left,prect.left);
			console.log("COORY:",rect.top,prect.top);
			const xIndexIni = Math.abs(Math.round((rect.left-prect.left) / cellWidth));
			const yIndexIni = Math.abs(Math.round((rect.top-prect.top) / cellHeight));

			occupiedCells.push({x:xIndexIni,y:yIndexIni});

			let x = rect.left, y = rect.top, startX = rect.left, startY = rect.top;
			const iniX = rect.left, iniY = rect.top;

			console.log("INI:",xIndexIni,yIndexIni,x,y);


			interact(el).draggable({
				modifiers: [
				interact.modifiers.snap({
					targets: [
						interact.snappers.grid({
							x: cellWidth,y: cellHeight,
							offset: { x: prect.left, y: prect.top },
						})
					],
					range: Infinity,
					relativePoints: [ { x: 0, y: 0 } ],
					endOnly: true
				}),
				interact.modifiers.restrictRect({
					restriction: 'parent',
					endOnly: true
				})
				],
				inertia: false
			})
			.on("dragstart", (event) => {
				startX = x;
				startY = y;
			})
			.on("dragmove", (event) => {
				x += event.dx;
				y += event.dy;
				event.target.style.transform = `translate(${x-iniX}px, ${y-iniY}px)`;
			})
			.on("dragend", (event) => {
				const xIndexEnd = Math.abs(Math.round((x-prect.left) / cellWidth));
				const yIndexEnd = Math.abs(Math.round((y-prect.top) / cellHeight));
				const xIndexStart = Math.abs(Math.round((startX-prect.left) / cellWidth));
				const yIndexStart = Math.abs(Math.round((startY-prect.top) / cellHeight));
				console.log("START: ",xIndexStart,yIndexStart,startX,startY);
				console.log("END: ",xIndexEnd,yIndexEnd,x,y);

				if(isCellOccupied(xIndexEnd, yIndexEnd)) {
					x = startX;
					y = startY;
					console.log("Cell ocupied");
				} else {
					const rmIndex = occupiedCells.findIndex(cell => 
						cell.x === xIndexStart && cell.y === yIndexStart
					);
					if(rmIndex === -1){
						console.error("rmIndex not found:",xIndexStart,yIndexStart);
						occupiedCells.forEach(cell => {
							console.log("Cell:",cell.x,cell.y,cell.x === xIndexStart && cell.y === yIndexStart);
						});
					}else{
						console.log("Remove:",xIndexStart,yIndexStart);
						occupiedCells.splice(rmIndex, 1);

					}

					console.log("Push:",xIndexEnd,yIndexEnd);
					occupiedCells.push({ x: xIndexEnd, y: yIndexEnd });
				}

				event.target.style.transform = `translate(${x-iniX}px, ${y-iniY}px)`;
			});
		});

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

	<div class="w-[1000px] h-[500px]" id="desktop-icon-container">
		<div class="w-[100px] h-[100px] border-2 border-white desktop-icon" id="grid-snap1">
			<img src="iconMeta.svg" alt="About this website" class="w-[80px]"/>
			<p class="text-center">Hola</p>
		</div>
		<div class="w-[100px] h-[100px] border-2 border-white desktop-icon" id="grid-snap2">
			<img src="iconMeta.svg" alt="About this website" class="w-[80px]"/>
			<p class="text-center">Hola</p>
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