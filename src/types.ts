export type GGData = {
    spawnObject: (o: GObject) => void;
    destroyObject: (o: GObject) => void;
    getAllObjects: () => GObject[];
    getAllObjectsByType: (type: string) => GObject[];
}

export interface GObject {
    name: string;
    x: number;
    y: number;
    guiSupport: boolean;
    setup(cnv: HTMLCanvasElement, d: GGData): void;
    drawGui(ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement, d: GGData): void;
    draw(ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement, d: GGData): void;
    keyEvent(e: KeyboardEvent, d: GGData): void;
    
}