import fragmentBayesDither from '$lib/components/backgrounds/filters/BayesDither/fragment.glsl';
import vertexBayesDither from '$lib/components/backgrounds/filters/BayesDither/vertex.glsl';
import fragmentPixel from '$lib/components/backgrounds/filters/Pixel/fragment.glsl';
import vertexPixel from '$lib/components/backgrounds/filters/Pixel/vertex.glsl';
import fragmentDots from '$lib/components/backgrounds/filters/Dots/fragment.glsl';
import vertexDots from '$lib/components/backgrounds/filters/Dots/vertex.glsl';
import fragmentLenticular from '$lib/components/backgrounds/filters/Lenticular/fragment.glsl';
import vertexLenticular from '$lib/components/backgrounds/filters/Lenticular/vertex.glsl';
import Meta from "$lib/components/icons/Meta.svelte";
import type { Component } from "svelte";
import { writable } from "svelte/store";
import Bg0 from "./components/backgrounds/scenes/Bg0.svelte";
import Bg1 from "./components/backgrounds/scenes/Bg1.svelte";
import Bg2 from "./components/backgrounds/scenes/Bg2.svelte";
import About from "./components/icons/About.svelte";
import Articles from "./components/icons/Articles.svelte";
import Bigms from "./components/icons/Bigms.svelte";
import Chat from "./components/icons/Chat.svelte";
import Resume from "./components/icons/Resume.svelte";
import AboutW from "./components/windows/AboutW.svelte";
import ArticlesW from "./components/windows/ArticlesW.svelte";
import BigmsW from "./components/windows/BigmsW.svelte";
import ChatW from "./components/windows/ChatW.svelte";
import MetaW from "./components/windows/MetaW.svelte";
import ResumeW from "./components/windows/ResumeW.svelte";
import { themes, type Theme } from "./tools/themeSwitcher";
import Ball8 from './components/icons/Ball8.svelte';
import Ball8W from './components/windows/Ball8W.svelte';
import { persisted } from 'svelte-persisted-store';
import UniRt from '$lib/components/icons/UniRt.svelte';
import UniRtW from '$lib/components/windows/UniRt/UniRtW.svelte';
import UniRtControlW from '$lib/components/windows/UniRt//UniRtControlW.svelte';
import UniRtHelpW from './components/windows/UniRt/UniRtHelpW.svelte';

export interface BackgroundConfig {
    scene: BackgroundScene;
    filter: Filter;
}

export interface BackgroundScene {
    name:string;
    component: Component;
    allowedFilters:string[];
};

export interface Filter {
    name:string;
    vertex: string;
    fragment: string;
};

export interface WindowConfig {
    text: string;
    type: number;
    width: number;
    height: number;
    link?: string;
    resizeable: boolean;
    resizeParams?: {
        maxWidth: number;
        maxHeight: number;
        minWidth: number;
        minHeight: number;
    };
    window: Component;
    hasIcon: boolean;
    icon?: Component;   
    iconX?: number;
    iconY?: number;
};

export interface UniRtParams {
    endScene: boolean,
    stopRendering: boolean,
    needCapture: boolean,
    samplesPerPixel: number,
    meanBounces: number,
    frame_acummulation: boolean,
    fast_mode: boolean,
    transient_on: boolean,
    range_ini: number,
    range_size: number,
    kernel_sigma: number,
    aperture_radius: number,
    focal_distance: number,
}


export const window_library:WindowConfig[] = [
    {
        text:"victorr.me",
        type: 1,
        width:500,
        height:400,
        link:"/micromd",
        resizeable: true,
        resizeParams: {
            maxWidth: 10000,
            maxHeight: 10000,
            minWidth: 450,
            minHeight: 250,
        },
        hasIcon:true,
        icon: Meta,
        iconX: 1,
        iconY: 1,
        window: MetaW
    },
    {
        text:"resume",
        type: 2,
        width:500,
        height:500,
        link:"/micromd",
        resizeable: true,
        resizeParams: {
            maxWidth: 10000,
            maxHeight: 10000,
            minWidth: 400,
            minHeight: 250,
        },
        hasIcon:true,
        icon: Resume,
        iconX: 2,
        iconY: 1,
        window: ResumeW
    },
    {
        text:"about",
        type: 3,
        width:600,
        height:600,
        link:"/micromd",
        resizeable: true,
        resizeParams: {
            maxWidth: 10000,
            maxHeight: 10000,
            minWidth: 400,
            minHeight: 250,
        },
        hasIcon:true,
        icon: About,
        iconX: 1,
        iconY: 2,
        window: AboutW
    },
    {
        text:"articles",
        type: 4,
        width:600,
        height:400,
        resizeable: true,
        resizeParams: {
            maxWidth: 10000,
            maxHeight: 10000,
            minWidth: 300,
            minHeight: 250,
        },
        hasIcon:true,
        icon: Articles,
        iconX: 1,
        iconY: 3,
        window: ArticlesW
    },
    {
        text:"bigms",
        type: 5,
        width:500,
        height:450,
        link:"/bigms",
        resizeable: false,
        hasIcon:true,
        icon: Bigms,
        iconX: 1,
        iconY: 4,
        window: BigmsW
    },
    {
        text:"chat",
        type: 6,
        width:300,
        height:450,
        resizeable: true,
        resizeParams: {
            maxWidth: 10000,
            maxHeight: 10000,
            minWidth: 275,
            minHeight: 250,
        },
        hasIcon:true,
        icon: Chat,
        iconX: 2,
        iconY: 2,
        window: ChatW
    },
    {
        text:"8ball",
        type: 7,
        width:250,
        height:250,
        resizeable: false,
        hasIcon:true,
        icon: Ball8,
        iconX: 2,
        iconY: 3,
        window: Ball8W
    },
    {
        text:"uni-rt",
        link:"/uni-rt",
        type: 8,
        width:500,
        height:534,
        resizeable: true,
        resizeParams: {
            maxWidth: 10000,
            maxHeight: 10000,
            minWidth: 250,
            minHeight: 284,
        },
        hasIcon:true,
        icon: UniRt,
        iconX: 2,
        iconY: 4,
        window: UniRtW
    },
    {
        text:"uni-rt control panel",
        link:"/uni-rt",
        type: 9,
        width:300,
        height:534,
        resizeable: false,
        hasIcon:false,
        window: UniRtControlW
    },
    {
        text:"uni-rt help",
        link:"/uni-rt",
        type: 10,
        width:300,
        height:534,
        resizeable: false,
        hasIcon:false,
        window: UniRtHelpW
    }
];

export const bg_scene_library:BackgroundScene[] = [
    {
        name:"DotCom",
        component:Bg0,
        allowedFilters:["BayesDither","Dots","Lenticular"]
    },
    {
        name:"Blocks",
        component:Bg1,
        allowedFilters:["Pixel"]
    },
    {
        name:"Physics",
        component:Bg2,
        allowedFilters:["BayesDither"]
    },
];

export const filter_library:Filter[] = [
    {
        name:"BayesDither",
        vertex:vertexBayesDither,
        fragment:fragmentBayesDither,
    },
    {
        name:"Pixel",
        vertex:vertexPixel,
        fragment:fragmentPixel,
    },
    {
        name:"Dots",
        vertex:vertexDots,
        fragment:fragmentDots,
    },
    {
        name:"Lenticular",
        vertex:vertexLenticular,
        fragment:fragmentLenticular,
    },
];

export const uniRtParamsNull:UniRtParams = {
    endScene: false,
    stopRendering: false,
    needCapture: false,
    samplesPerPixel: 0,
    meanBounces: 5,
    frame_acummulation: false,
    fast_mode: false,
    transient_on: false,
    range_ini: 0.0,
    range_size: 100000.0,
    kernel_sigma: 0.0,
    aperture_radius: 0.0,
    focal_distance: 1.0,
};

export const themeStore = writable<Theme>(themes[0]);
export const occupiedCells = writable<{ x: number, y: number }[]>([]);
export const selectedType = writable(0);
export const activeWindows = writable<{type:number,onScreen:boolean}[]>([]);
export const activeBackground = writable<BackgroundConfig>({
    scene:bg_scene_library[0],
    filter:filter_library[0]
});

export const uniRtParams = writable<UniRtParams>(uniRtParamsNull);
export const uniRtFPS = writable<number>(0);