import { themeStore } from "$lib/stores";
import { get } from "svelte/store";

const themes:string[] = [
    "blue",
    "red"
]

export function updateTheme(){
    const current = get(themeStore);
    document.documentElement.setAttribute('data-theme', current);
}

export function nextTheme(){
    const current = get(themeStore);
    const currentIndex = themes.findIndex((v) => v === current);
    const newTheme = themes[(currentIndex+1)%themes.length];
    themeStore.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
}

export function changeTheme(theme:string){
    const currentIndex = themes.findIndex((v) => v === theme);
    const newTheme = themes[(currentIndex+1)%themes.length];
    themeStore.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
}

