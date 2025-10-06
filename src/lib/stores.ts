import fragmentBayesDither from '$lib/components/backgrounds/filters/BayesDither/fragment.glsl';
import vertexBayesDither from '$lib/components/backgrounds/filters/BayesDither/vertex.glsl';
import fragmentPixel from '$lib/components/backgrounds/filters/Pixel/fragment.glsl';
import vertexPixel from '$lib/components/backgrounds/filters/Pixel/vertex.glsl';
import fragmentDots from '$lib/components/backgrounds/filters/Dots/fragment.glsl';
import vertexDots from '$lib/components/backgrounds/filters/Dots/vertex.glsl';
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
    icon: Component;   
    iconX: number;
    iconY: number;
    window: Component;
};

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
        icon: Ball8,
        iconX: 2,
        iconY: 3,
        window: Ball8W
    },
];

export const bg_scene_library:BackgroundScene[] = [
    {
        name:"DotCom",
        component:Bg0,
        allowedFilters:["BayesDither","Dots"]
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
];




export const themeStore = writable<Theme>(themes[0]);
export const occupiedCells = writable<{ x: number, y: number }[]>([]);
export const selectedType = writable(0);
export const activeWindows = writable<{type:number,onScreen:boolean}[]>([]);
export const activeBackground = writable<BackgroundConfig>({
    scene:bg_scene_library[0],
    filter:filter_library[0]
});
