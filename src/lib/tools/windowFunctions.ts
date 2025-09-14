import { activeWindows } from "$lib/stores";
import { tick } from "svelte";
import { get } from "svelte/store";


export function closeWindow(type:number){
    activeWindows.update(list => {
        const i = list.findIndex(w => w.type === type);
        if (i > -1){
            list.splice(i, 1);
        }else{
            console.error("Error finding window on close",type,list);
        }
        return list;
    });
}

export function minimizeWindow(type:number){
    activeWindows.update(list => {
        const w = list.find(w => w.type === type);
        if(w === undefined){
            console.error("Error finding window on maximize",type,list);
            return list;
        }
        w.onScreen = true;
        return list;
    });
    const w = get(activeWindows).find(w => w.type === type);
    if(w === undefined){
        console.error("Error finding window on maximize",type);
        return;
    }
    w.onScreen = false;
}

export function maximizeWindow(type:number){
    activeWindows.update(list => {
        const w = list.find(w => w.type === type);
        if(w === undefined){
            console.error("Error finding window on maximize",type,list);
            return list;
        }
        w.onScreen = true;
        return list;
    });
    const w = get(activeWindows).find(w => w.type === type);
    if(w === undefined){
        console.error("Error finding window on maximize",type);
        return;
    }
    w.onScreen = true;
    pushToFront(type);
}

export function addWindow(type:number){
    if(get(activeWindows).find(w => w.type === type) !== undefined){
        maximizeWindow(type);
        return;
    }
    activeWindows.update(list => {
        if(list.find(w => w.type === type) !== undefined) return list;
        list.push({type:type,onScreen:true});
        return list;
    });
}

export function pushToFront(type:number){
    activeWindows.update(list => {
        const i = list.findIndex(w => w.type === type);
        if (i <0){
            console.error("Error finding window on push to front",type,list);
            return list;
        }
        const w = list.splice(i,1);
        list.push(w[0]);
        return list;
    });
}
