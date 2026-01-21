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

<div class="main w-full h-full">

    <div class="w-full h-full flex gap-8 p-4">

        <Card class="max-w-md w-70">
            <CardHeader>
                <CardTitle>Render Control Panel</CardTitle>
            </CardHeader>

            <CardContent class="space-y-6">
                <Label>Actions</Label>
                <div class="space-y-2 flex justify-between">
                    <Button
                        onclick={() => {
                            $uniRtParams.needCapture = true;
                        }}>Capture PNG</Button
                    >
                    <Button
                        onclick={() => {
                            $uniRtParams.stopRendering = !$uniRtParams.stopRendering;
                        }}>
                            {$uniRtParams.stopRendering?'Resume':'Pause'}
                        </Button
                    >
                </div>

                <!-- Samples per pixel -->
                <div class="space-y-2">
                    <Label for="spp">Samples per pixel</Label>
                    <Input
                        id="spp"
                        type="number"
                        min="1"
                        step="1"
                        bind:value={$uniRtParams.samplesPerPixel}
                    />
                </div>

                <!-- Russian roulette chance -->
                <div class="space-y-2">
                    <Label for="rr">Mean bounces</Label>
                    <Input id="rr" type="number" min="1" bind:value={$uniRtParams.meanBounces} />
                </div>

                <!-- Frame acummulation toggle -->
                <div class="space-y-2 flex gap-4">
                    <Label>Frame acummulation</Label>
                    <Switch bind:checked={$uniRtParams.frame_acummulation} />
                </div>

                <!-- Frame acummulation toggle -->
                <div class="space-y-2 flex gap-4">
                    <Label>Fast mode</Label>
                    <Switch bind:checked={$uniRtParams.fast_mode} />
                </div>

                <!-- Thin lense -->
                <div class="space-y-2">
                    <Label>Thin lense</Label>
                    <div class="flex items-center gap-2">
                        <p class="text-md text-muted-foreground italic">f</p> 
                        <Input id="aperture" class="w-30" type="number" min="0" step="0.005" bind:value={$uniRtParams.aperture_radius}/>
                        <Slider type="single" bind:value={$uniRtParams.focal_distance} 
                        max={30.0} min={0.1} step={0.1} />
                    </div>
                </div>

                <!-- Range thing toggle -->
                <div class="space-y-2">
                    <Label>Transient options</Label>
                    <div class="text-sm {$uniRtParams.transient_on?'':'text-muted-foreground'} flex justify-between">
                        <p>Activate</p> 
                        <p>Offset</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <Switch bind:checked={transient_on} /> 
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
                        <Input id="rangesize" type="number" min="0" step="0.01" bind:value={$uniRtParams.range_size} disabled={!$uniRtParams.transient_on}/>
                    </div>
                    <div class="flex items-center gap-2 text-sm ">
                        <p>Sigma</p>
                        <Input id="kernelsigma" type="number" min="0" step="0.01" bind:value={$uniRtParams.kernel_sigma} disabled={!$uniRtParams.transient_on}/>
                    </div>    
                </div>

            </CardContent>
        </Card>
        <Card class="max-w-md w-70">
            <CardHeader>
                <CardTitle>Render info</CardTitle>
            </CardHeader>

            <CardContent class="space-y-6">
                <div class="text-sm text-muted-foreground">
                    <p><strong>FPS:</strong> {$uniRtFPS}</p>
                    <p><strong>SPP:</strong> {$uniRtParams.samplesPerPixel}</p>
                    <p>
                        <strong>Rusian roulette chance:</strong>
                        {Math.floor(1-1/$uniRtParams.meanBounces * 1000) / 1000}
                    </p>
                    <p><strong>Frame acummulation:</strong> {$uniRtParams.frame_acummulation}</p>
                    <p><strong>Aperture radius:</strong> {$uniRtParams.aperture_radius}</p>
                    <p><strong>Focal distance:</strong> {$uniRtParams.focal_distance}</p>
                    <p><strong>Ray range:</strong> 
                        {Math.floor($uniRtParams.range_ini * 1000) / 1000},
                        {Math.floor(($uniRtParams.range_size+$uniRtParams.range_ini) * 1000) / 1000}
                    </p>
                    <p><strong>Kernel sigma:</strong> {$uniRtParams.kernel_sigma}</p>
                </div>
            </CardContent>
        </Card>
    </div>
</div>

<style>

    .main {
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #111;
        color: white;
    }

</style>

