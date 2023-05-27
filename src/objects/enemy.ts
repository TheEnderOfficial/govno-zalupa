import { GGData, GObject } from "../types";
import bullet from "./bullet";

export type TEnemy = {
    name: "enemy" | "player";
    x: number;
    y: number;
    guiSupport: false;
    takeDamage: (damage: number, d: GGData) => void;
}

export default (class Enemy implements GObject {
    name = "enemy";

    x = 0;
    y = 0;
    health = 3; // 1-3
    guiSupport = true;
    static playerSize = [32, 32];
    static playerStep = [32, 32];

    draw(ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement): void {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, Enemy.playerSize[0], Enemy.playerSize[1]);
    }

    setup(cnv: HTMLCanvasElement): void {
    
    }

    drawGui(ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement, d: GGData): void {
    }

    shoot(d: GGData) {
        const b = new bullet()
        b.x = this.x;
        b.y = this.y - Enemy.playerStep[0];
        b.spawnTime = Date.now();
        b.byWho = "enemy";
        b.direction = -1;
        d.spawnObject(b);

    }

    takeDamage(damage: number, d: GGData) {
        this.health -= damage;
        console.log(`Enemy at ${this.x}:${this.y} take damage (${damage}) ${this.health+damage}=>${this.health}`)
        if (this.health <= 0) {
            d.destroyObject(this);
        }
    }

    keyEvent(e: KeyboardEvent, d: GGData): void {}
})