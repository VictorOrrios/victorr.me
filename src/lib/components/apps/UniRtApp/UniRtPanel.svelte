<script lang="ts">
    import { Renderer } from "$lib/uni-rt/renderer";
    import { Scene } from "$lib/uni-rt/scene";
    
    import { onDestroy, onMount } from "svelte";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
    } from "$lib/components/ui/card";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Slider } from "$lib/components/ui/slider/index.js";
    import { Tween } from 'svelte/motion';
    import { cubicOut } from "svelte/easing";
	import { uniRtFPS, uniRtParams } from "$lib/stores";

    let {launchHelp} = $props();

    let transient_on: boolean = $state(false);
    let range_slider_ini: number = $state($uniRtParams.range_ini);
    let range_animation_ini: number = $state($uniRtParams.range_ini);
    let range_animated:boolean = $state(false);

    $effect(() => {
        transient_on;range_slider_ini;range_animation_ini;
        $uniRtParams.transient_on = transient_on;
        $uniRtParams.range_ini = range_animated? range_animation_ini:range_slider_ini;
    })

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function animateRange(){
        if(!range_animated) return;
        range_animation_ini += 0.1;
        if(range_animation_ini>30.0){
            range_animation_ini = $uniRtParams.range_ini;
            range_animated = false;
            return;
        }
        await sleep(100);
        requestAnimationFrame(animateRange)
    }

    function endScene(){
        $uniRtParams.stopRendering = true;
        $uniRtParams.endScene = true;
    }

    onDestroy(() => {
        endScene();
    });
    
</script>

<div class="w-full h-full flex flex-col gap-3 p-2">
    <div class="flex justify-between items-center">
        <div class="flex-1 text-base gradient h-full flex items-center justify-center">
            <div>
            {$uniRtFPS}FPS
            </div>  
        </div>
        <div class="flex">
            <Button
                class="w-11"
                onclick={() => {
                    $uniRtParams.needCapture = true;
                }}>
                    <img class="w-[1rem]" src="camera.svg" alt="camera"/>
            </Button>
            <Button
            class="w-11"
                onclick={() => {
                    $uniRtParams.stopRendering = !$uniRtParams.stopRendering;
                }}>
                    {#if $uniRtParams.stopRendering}
                        ▶
                    {:else}
                        <img class="w-[0.8rem]" src="pause.svg" alt="pause"/>
                    {/if}
            </Button>
            <Button
                class="w-11"
                onclick={() => {
                    launchHelp();
                }}>
                    <b>?</b>
            </Button>
            <Button
                class="w-11"
                onclick={() => {endScene()}}>
                    <b>X</b>
            </Button>
        </div>
    </div>
    <hr>

    <!-- Samples per pixel -->
    <div class="flex gap-4 justify-between">
        <Label for="spp" class="text-nowrap">Samples per pixel</Label>
        <Input
            id="spp"
            type="number"
            min="1"
            step="1"
            class="w-25"
            bind:value={$uniRtParams.samplesPerPixel}
        />
    </div>

    <!-- Russian roulette chance -->
    <div class="flex gap-4 justify-between">
        <Label for="rr" class="text-nowrap">Mean bounces</Label>
        <Input id="rr" type="number" min="1" class="w-25" bind:value={$uniRtParams.meanBounces} />
    </div>

    <!-- Frame acummulation toggle -->
    <div class="flex gap-4">
        <Switch bind:checked={$uniRtParams.frame_acummulation} />
        <Label>Frame acummulation</Label>
    </div>

    <!-- Frame acummulation toggle -->
    <div class="flex gap-4">
        <Switch bind:checked={$uniRtParams.fast_mode} />
        <Label>Fast mode</Label>
    </div>
    <hr>

    <!-- Thin lense -->
    <div class="space-y-2">
        <div class="flex gap-4 justify-between px-1">
            <Label>Aperture</Label>
            <Label>Focal distance</Label>
        </div> 
        <div class="flex items-center gap-4">
            <p class="text-md text-muted-foreground italic">f</p> 
            <Input id="aperture" class="w-35" type="number" min="0" step="0.01" bind:value={$uniRtParams.aperture_radius}/>
            <Slider type="single" bind:value={$uniRtParams.focal_distance} 
            max={30.0} min={0.1} step={0.1} />
        </div>
    </div>
    <hr>
    <!-- Range thing toggle -->
     <div class="flex gap-4">
        <Switch bind:checked={transient_on} /> 
        <Label>Transient mode</Label>
    </div>

    <div class="space-y-2">
        <div class="flex items-center gap-4">
            <Label>Animate</Label>
            <Button 
            disabled={!$uniRtParams.transient_on}
            onclick={() => {
                if(!range_animated){
                    range_animated = true;
                    range_animation_ini = $uniRtParams.range_ini;
                    animateRange();
                }else{
                    range_slider_ini = range_animation_ini;
                    range_animated = false;
                }
                
            }}>
                {#if range_animated}
                    ●
                {:else}
                    ▶
                {/if}
            </Button>
            <Slider type="single" bind:value={range_slider_ini} 
            disabled={!$uniRtParams.transient_on}
            max={30.0} step={0.1} />
            
        </div>
    </div>

    <div class="flex gap-4 justify-between">
        <Label class="text-nowrap">Window size</Label>
        <Input id="rangesize" 
        type="number" min="0" step="0.01" 
        class="w-25"
        bind:value={$uniRtParams.range_size} disabled={!$uniRtParams.transient_on}/>
    </div>

    <div class="flex gap-4 justify-between">
        <Label class="text-nowrap">Kernel sigma</Label>
        <Input id="kernelsigma" 
        type="number" min="0" step="0.01" 
        class="w-25"
        bind:value={$uniRtParams.kernel_sigma} disabled={!$uniRtParams.transient_on}/>
    </div>
    
    <div class="space-y-2">
        <Label></Label>
        <div class="text-sm {$uniRtParams.transient_on?'':'text-muted-foreground'} flex justify-between">
            <p>Activate</p> 
            <p>Offset</p>
        </div>
        <div class="flex items-center gap-2">
            <Slider type="single" bind:value={range_slider_ini} 
            disabled={!$uniRtParams.transient_on}
            max={30.0} step={0.1} />
            <Button 
            disabled={!$uniRtParams.transient_on}
            onclick={() => {
                if(!range_animated){
                    range_animated = true;
                    range_animation_ini = $uniRtParams.range_ini;
                    animateRange();
                }else{
                    range_slider_ini = range_animation_ini;
                    range_animated = false;
                }
                
            }}>
                {#if range_animated}
                    ●
                {:else}
                    ▶
                {/if}
            </Button>
        </div>
        <div class="flex items-center gap-2 text-sm ">
            <p>Range</p> 
        </div>
        <div class="flex items-center gap-2 text-sm ">
            <p>Sigma</p>
            <Input id="kernelsigma" type="number" min="0" step="0.01" bind:value={$uniRtParams.kernel_sigma} disabled={!$uniRtParams.transient_on}/>
        </div>    
    </div>

</div>

<style>

    .gradient{
        background: linear-gradient(to right, var(--theme-color-darker), var(--theme-color-basic), var(--theme-color-lighter), var(--theme-color-basic) ,var(--theme-color-darker));
		background-size: 1000% 100%;
		animation: move-gradient 90s linear infinite;
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

