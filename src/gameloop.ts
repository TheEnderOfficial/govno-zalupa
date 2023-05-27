import player from "./objects/player";
import { GGData, GObject } from "./types";


let objectList: GObject[] = [
    player,

];

let cnv: HTMLCanvasElement | undefined;
const gData: GGData = {
    spawnObject(o) {
        objectList.push(o)
        o.setup(cnv!, this);
    },
    destroyObject(o) {
        objectList = objectList.filter(i => i !== o)
        console.log("Destroyed object", o)
    },
    getAllObjects() {
        return objectList;
    },
    getAllObjectsByType(type) {
        return objectList.filter(i => i.name === type)
    },
}

addEventListener("keypress", (event: KeyboardEvent) => {
    objectList.map(i => i.keyEvent(event, gData))
});


export function onCreate(c: HTMLCanvasElement) {
    console.log("Game Initialized");
    cnv = c;
    objectList.map(i => i.setup(c, gData));

}

export function onDraw(cnv: HTMLCanvasElement) {
    const ctx = cnv.getContext("2d")!;

    // render background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    objectList.map(i => i.draw(ctx, cnv, gData));

    objectList.filter(i => i.guiSupport).map(i => i.drawGui(ctx, cnv, gData));
}