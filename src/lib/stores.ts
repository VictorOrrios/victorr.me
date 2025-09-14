import { persisted } from "svelte-persisted-store";
import { writable } from "svelte/store";


export const themeStore = writable("blue");
export const occupiedCells = writable<{ x: number, y: number }[]>([]);
export const selectedType = writable(0);
export const activeWindows = writable<{type:number,onScreen:boolean}[]>([]);


export const window_library = [
    {
        text:"victorr.me",
        type: 1,
        width:400,
        link:undefined
    },
    {
        text:"resume",
        type: 2,
        width:500,
        link:"https://google.com"
    },
    {
        text:"about",
        type: 3,
        width:600,
        link:undefined
    },
    {
        text:"articles",
        type: 4,
        width:500,
        link:undefined
    },
];