import { persisted } from "svelte-persisted-store";
import { writable } from "svelte/store";


export const themeStore = writable("blue");