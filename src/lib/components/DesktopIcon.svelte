<script lang="ts">
	import interact from "interactjs";
	import { onMount } from "svelte";


    onMount(() => {
		const cellWidth = 100;
		const cellHeight = 100;

		const occupiedCells: { x: number, y: number }[] = [];
		occupiedCells.push({x:0,y:0});
		occupiedCells.push({x:0,y:1});
		function isCellOccupied(x: number, y: number) {
			return occupiedCells.some(cell => cell.x === x && cell.y === y);
		}

		const elements = document.querySelectorAll<HTMLElement>(".desktop-icon");

		elements.forEach((el) => {
			let x = 0, y = 0;
			let startX = 0, startY = 0;

			const rect = el.parentElement!.getBoundingClientRect();
			if(!rect) return;

			interact(el).draggable({
				modifiers: [
				interact.modifiers.snap({
					targets: [
						interact.snappers.grid({
							x: cellWidth,y: cellHeight,
							offset: { x: rect.left, y: rect.top },
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
				event.target.style.transform = `translate(${x}px, ${y}px)`;
			})
			.on("dragend", (event) => {
				const xIndexEnd = Math.abs(Math.round(x / cellWidth));
				const yIndexEnd = Math.abs(Math.round(y / cellHeight));
				const xIndexStart = Math.abs(Math.round(startX / cellWidth));
				const yIndexStart = Math.abs(Math.round(startY / cellHeight));
				console.log("START: ",xIndexStart,yIndexStart,startX,startY);
				console.log("END: ",xIndexEnd,yIndexEnd,x,y);

				if(isCellOccupied(xIndexEnd, yIndexEnd)) {
					x = startX;
					y = startY;
					console.log("Cell ocupied")
				} else {
					const rmIndex = occupiedCells.findIndex(cell => 
						cell.x === xIndexStart && cell.y === yIndexStart
					);
					if(rmIndex){
						console.error("rmIndex not found")
					}else{
						occupiedCells.splice(rmIndex, 1);

					}

					occupiedCells.push({ x: xIndexEnd, y: yIndexEnd });
				}

				event.target.style.transform = `translate(${x}px, ${y}px)`;
			});
		});

	});
</script>

<div class="w-[100px] h-[100px] border-2 border-white desktop-icon" id="grid-snap1">
    <img src="iconMeta.svg" alt="About this website" class="w-[80px]"/>
    <p class="text-center">Hola</p>
</div>