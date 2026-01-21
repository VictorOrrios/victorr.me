<script lang="ts">
    import { Renderer } from "$lib/uni-rt/renderer";
    import { Scene } from "$lib/uni-rt/scene";
    import { uniRtFPS, uniRtParams } from "$lib/stores";
    import { onDestroy, onMount } from "svelte";
    import { cubicOut } from "svelte/easing";
    import { Tween } from 'svelte/motion';

    const { preset } = $props();

    let scene = new Scene(preset);
    let renderer: Renderer;

    let rafId:number;

    let canvas!: HTMLCanvasElement;

    let mousePos = new Tween({ x: 2.0*Math.PI, y: 0.5*Math.PI }, { duration: 200, easing: cubicOut });

    let stopRendering: boolean = $state(false);
    let isDragging: boolean = false;

    let lastFrameTime = performance.now();
    let frameCount = 0;


    function mousedown(event: any) {
        isDragging = true;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    }

    function mouseup(event: MouseEvent) {
        isDragging = false;
    }

    function wheel(event: any) {
        scene.camera.radius += event.deltaY / 1000;
        if (scene.camera.radius <= 0) scene.camera.radius = 0.01;
        scene.camera.tick();
        renderer.resetFrameAcummulation();
    }

    function mousemove(event: any) {
        //if (!listenToMove) return;
        if (!isDragging) return;
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.right;
        const y = Math.min(Math.max((event.clientY - rect.top) / rect.bottom,0.05),0.95);
        let azymuth:number = x * 4*Math.PI;
        let polar:number = y * Math.PI;
        mousePos.target = {x:azymuth,y:polar};
    }

    $effect(() => {
        mousePos.current;
        if(renderer && scene){
            scene.camera.moveTo(mousePos.current.x, mousePos.current.y);
            renderer.resetFrameAcummulation();
        }
    })

    $effect(() => {
        $uniRtParams;
        if(renderer) renderer.resetFrameAcummulation();
    })


    $effect(() => {
        $uniRtParams.stopRendering;
        if(stopRendering !== $uniRtParams.stopRendering){
            stopRendering = $uniRtParams.stopRendering;
            if(!stopRendering){
                rafId = requestAnimationFrame(main_loop);
            }else{
                cancelAnimationFrame(rafId);
            }
        }
    })


    function updateFPS(time: number) {
        frameCount++;
        if (time - lastFrameTime >= 1000) {
            $uniRtFPS = frameCount;
            frameCount = 0;
            lastFrameTime = time;
        }
    }

    function saveScreenshot() {
        if (!canvas) return;

        canvas.toBlob((blob) => {
            if (!blob) {
                alert("Error generating screenshot.");
                return;
            }

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `
            ${Date.now()}
            ${$uniRtFPS}fps
            ${$uniRtParams.frame_acummulation?"TAA":""}
            ${$uniRtParams.samplesPerPixel}spp
            ${Math.floor(1-1/$uniRtParams.meanBounces * 1000) / 1000}rr
            .png`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        }, "image/png");
    }

    function main_loop(time: number) {
        if (stopRendering) return;
        renderer.render(time);
        if ($uniRtParams.needCapture) {
            saveScreenshot();
            $uniRtParams.needCapture = false;
        }
        updateFPS(time);
        requestAnimationFrame(main_loop);
    }

    async function setUpMain() {
        lastFrameTime = performance.now();
        frameCount = 0;

        const gl = canvas.getContext("webgl2");
        if (!gl) throw new Error("WebGL2 not supported");
        const ext = gl.getExtension("EXT_color_buffer_float");
        if (!ext) throw new Error("EXT_color_buffer_float not supported");
        
        await scene.setupScene();
        
        renderer = new Renderer(gl, scene);

        await renderer.initialize();
        
        rafId = requestAnimationFrame(main_loop);
    }

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    function randomJitter(){
        let azymuth:number = (Math.random()/100+0.5) * 4*Math.PI;
        let polar:number = (Math.random()/100+0.5) * Math.PI;
        mousePos.target = {x:azymuth,y:polar};
        setTimeout(() => randomJitter(),1500);
    }

    // MAIN LOOP
    onMount(async () => {
        $uniRtFPS = 0;
        canvas.addEventListener("mousedown", (e) => mousedown(e));
        canvas.addEventListener("mouseup", (e) => mouseup(e));
        canvas.addEventListener("wheel", (e) => wheel(e));
        canvas.addEventListener("mousemove", (e) => mousemove(e));
        await setUpMain();
    });

    onDestroy(() => {
        cancelAnimationFrame(rafId);
        stopRendering = true;
        $uniRtParams.stopRendering = true;
        $uniRtParams.endScene = true;
    });
    
</script>

<div class="main w-full h-full">

    <div class="w-full h-full flex gap-8 p-4">
        

        <div class="flex-1 relative">
            {#if $uniRtFPS <= 0}
                <div class="absolute m-20 text-4xl">
                    LOADING...
                </div>
            {/if}
            <canvas id="canvas" class="w-full h-full block object-contain" width={scene.iniP.canvas_width} height={scene.iniP.canvas_height} bind:this={canvas}></canvas>
        </div>

        
    </div>
</div>

<style>
    canvas {
        display: block;
        border: 1px solid #333;
        margin-top: 10px;
    }

    .main {
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #111;
        color: white;
    }

</style>
