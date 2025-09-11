import { persisted } from "svelte-persisted-store";
import { writable } from "svelte/store";


export const themeStore = writable("blue");
export const occupiedCells = writable<{ x: number, y: number }[]>([]);
export const selectedType = writable(0);
