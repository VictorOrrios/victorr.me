import { themeStore } from "$lib/stores";
import { get } from "svelte/store";

export type Theme = {
    name:string
    basic:number
    dark:number
    darker:number
    light:number
    lighter:number
};

export const themes:Theme[] = [
    {
        name:   "blue",
        basic:  0x054771,
        dark:   0x032B45,
        darker: 0x010F18,
        light:  0x07639D,
        lighter:0x087FC9,
    },
    {
        name:   "red",
        basic:  0x5F1616,
        dark:   0x3A0E0E,
        darker: 0x150505,
        light:  0x841F1F,
        lighter:0xff0000,
    }
]


export function updateTheme(){
    const current = get(themeStore);
    document.documentElement.setAttribute('data-theme', current.name);
}

export function nextTheme(){
    const current = get(themeStore);
    const currentIndex = themes.findIndex((v) => v.name === current.name);
    const newTheme = themes[(currentIndex+1)%themes.length];
    themeStore.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme.name);
}

export function changeTheme(theme:string){
    const currentIndex = themes.findIndex((v) => v.name === theme);
    const newTheme = themes[(currentIndex+1)%themes.length];
    themeStore.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme.name);
}

