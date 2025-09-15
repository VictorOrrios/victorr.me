import { persisted } from "svelte-persisted-store";
import { writable } from "svelte/store";
import Meta from "$lib/components/icons/Meta.svelte";
import MetaW from "./components/windows/MetaW.svelte";
import Resume from "./components/icons/Resume.svelte";
import ResumeW from "./components/windows/ResumeW.svelte";
import About from "./components/icons/About.svelte";
import AboutW from "./components/windows/AboutW.svelte";
import Articles from "./components/icons/Articles.svelte";
import ArticlesW from "./components/windows/ArticlesW.svelte";
import type { Component } from "svelte";


export const themeStore = writable("blue");
export const occupiedCells = writable<{ x: number, y: number }[]>([]);
export const selectedType = writable(0);
export const activeWindows = writable<{type:number,onScreen:boolean}[]>([]);


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
    window: Component;
};

export const window_library:WindowConfig[] = [
    {
        text:"victorr.me",
        type: 1,
        width:400,
        height:400,
        resizeable: false,
        icon: Meta,
        window: MetaW
    },
    {
        text:"resume",
        type: 2,
        width:500,
        height:500,
        link:"https://google.com",
        resizeable: true,
        resizeParams: {
            maxWidth: 10000,
            maxHeight: 10000,
            minWidth: 300,
            minHeight: 250,
        },
        icon: Resume,
        window: ResumeW
    },
    {
        text:"about",
        type: 3,
        width:600,
        height:600,
        resizeable: true,
        resizeParams: {
            maxWidth: 10000,
            maxHeight: 10000,
            minWidth: 300,
            minHeight: 250,
        },
        icon: About,
        window: AboutW
    },
    {
        text:"articles",
        type: 4,
        width:500,
        height:500,
        resizeable: true,
        resizeParams: {
            maxWidth: 10000,
            maxHeight: 10000,
            minWidth: 300,
            minHeight: 250,
        },
        icon: Articles,
        window: ArticlesW
    },
];