<script lang="ts">
	import { occupiedCells, selectedType } from "$lib/stores";
	import interact from "interactjs";
	import { onMount } from "svelte";

	let { type } = $props();

	function isCellOccupied(x: number, y: number) {
		return $occupiedCells.some(cell => cell.x === x && cell.y === y);
	}

	function changeCell(xStart: number, yStart: number, xEnd: number, yEnd: number) {
		const index = $occupiedCells.findIndex(cell => cell.x === xStart && cell.y === yStart);
		if(index >= 0){
			$occupiedCells.splice(index,1);
			$occupiedCells.push({x:xEnd,y:yEnd});
		}else{
			console.log("ChangeCell error:",xStart,yStart,xEnd,yEnd);
		}
	}

	onMount(() => {
		const cellWidth = 100;
		const cellHeight = 100;

		const el = document.getElementById("desktop-icon-"+type);
		if(!el) return;

		const prect = el.parentElement!.getBoundingClientRect();
		if(!prect) return;

		const rect = el.getBoundingClientRect();
		if(!rect) return;

		console.log("COORX:",rect.left,prect.left);
		console.log("COORY:",rect.top,prect.top);
		const xIndexIni = Math.abs(Math.round((rect.left-prect.left) / cellWidth));
		const yIndexIni = Math.abs(Math.round((rect.top-prect.top) / cellHeight));

		$occupiedCells.push({x:xIndexIni,y:yIndexIni});

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
			console.log($selectedType,"=>",type);
			$selectedType = type;
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
				changeCell(xIndexStart,yIndexStart,xIndexEnd,yIndexEnd);
			}

			event.target.style.transform = `translate(${x-iniX}px, ${y-iniY}px)`;
		})
		.on('tap', function (event) {
			console.log($selectedType,"=>",type);
			$selectedType = type;
			console.log("TAP",type);
			event.preventDefault()
		})
		.on('doubletap', function (event) {
			console.log("DOUBLE TAP",type);
			event.preventDefault()
		});

	});
	
</script>

<div class="w-[100px] h-[100px] desktop-icon relative z-10 {$selectedType === type ? 'border-2 border-white':''}" id={"desktop-icon-"+type}>
    <img src="iconMeta.svg" alt="About this website" class="w-[70px] m-auto"/>
	{#if $selectedType === type}
		<p class="text-center">Selected {type}</p>
	{:else}
		<p class="text-center">Hola {type}</p>
	{/if}
</div>

<style>
	.desktop-icon{
		user-select: none;
  		-webkit-user-select: none;
	}

	.desktop-icon:hover{
		color: aqua;
	}
</style>