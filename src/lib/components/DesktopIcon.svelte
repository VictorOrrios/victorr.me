<script lang="ts">
	import { occupiedCells, selectedType } from "$lib/stores";
	import interact from "interactjs";
	import { onMount } from "svelte";
	import Meta from "./icons/Meta.svelte";
	import Resume from "./icons/Resume.svelte";
	import About from "./icons/About.svelte";
	import Articles from "./icons/Articles.svelte";

	let { type } = $props();
	const cellWidth = 150;
	const cellHeight = 150;
	const debugLogs = false;

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
		const el = document.getElementById("desktop-icon-"+type);
		if(!el) return;

		const prect = el.parentElement!.getBoundingClientRect();
		if(!prect) return;

		const rect = el.getBoundingClientRect();
		if(!rect) return;

		if(debugLogs) console.log("COORX:",rect.left,prect.left);
		if(debugLogs) console.log("COORY:",rect.top,prect.top);
		const xIndexIni = Math.abs(Math.round((rect.left-prect.left) / cellWidth));
		const yIndexIni = Math.abs(Math.round((rect.top-prect.top) / cellHeight));

		$occupiedCells.push({x:xIndexIni,y:yIndexIni});

		let x = rect.left, y = rect.top, startX = rect.left, startY = rect.top;
		const iniX = rect.left, iniY = rect.top;

		if(debugLogs) console.log("INI:",xIndexIni,yIndexIni,x,y);


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
			if(debugLogs) console.log($selectedType,"=>",type);
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
			if(debugLogs) console.log("START: ",xIndexStart,yIndexStart,startX,startY);
			if(debugLogs) console.log("END: ",xIndexEnd,yIndexEnd,x,y);

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
			if(debugLogs) console.log($selectedType,"=>",type);
			$selectedType = type;
			if(debugLogs) console.log("TAP",type);
			event.preventDefault()
		})
		.on('doubletap', function (event) {
			if(debugLogs) console.log("DOUBLE TAP",type);
			event.preventDefault()
		});

	});
	
</script>

<div class="select-none relative m-0
	{$selectedType === type ? 'z-20':'z-10 cursor-default!'}" id={"desktop-icon-"+type}
	style="width: {cellWidth}px; height: {cellHeight}px;">
	{#if type === 1}
		<Meta/>
	{:else if type === 2}
		<Resume/>
	{:else if type === 3}
		<About/>
	{:else if type === 4}
		<Articles/>
	{/if}
</div>

