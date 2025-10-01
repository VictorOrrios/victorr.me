import { activeBackground, bg_scene_library, filter_library } from "$lib/stores"
import { get } from "svelte/store";

function randomIntFromInterval(min:number, max:number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomIntFromIntervalExcluding(min:number, max:number, excluding:number){
    if(max === min) return min;
    let i = randomIntFromInterval(min,max);
    while(i === excluding){
        i = randomIntFromInterval(min,max);
    }
    return i;
}

export function changeBackground(){
    const activeBg = get(activeBackground);
    let currentSceneIndex = bg_scene_library.findIndex((sce) => sce.name === activeBg.scene.name);
    let currentFilterIndex = filter_library.findIndex((filter) => filter.name === activeBg.filter.name);
    const sceneIndex = randomIntFromIntervalExcluding(0,bg_scene_library.length-1,currentSceneIndex);
    const filterIndex = randomIntFromIntervalExcluding(0,filter_library.length-1,currentFilterIndex);
    activeBackground.set({
        scene:bg_scene_library[sceneIndex],
        filter:filter_library[filterIndex]
    });
    console.log("BG Changed to ",sceneIndex,filterIndex)
}