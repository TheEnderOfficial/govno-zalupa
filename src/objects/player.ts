import { GGData, GObject } from "../types";
import bullet from "./bullet";
import enemy from "./enemy";

export default (new class Player implements GObject {
    name = "player";

    x = 0;
    y = 0;
    health = 3; // 1-3
    guiSupport = true;
    static playerSize = [32, 32];
    static playerStep = [32, 32];

    draw(ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement): void {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, Player.playerSize[0], Player.playerSize[1]);
    }

    setup(cnv: HTMLCanvasElement, d: GGData): void {
        this.y = cnv.height - Player.playerSize[1]
        this.x = cnv.width / 2 - Player.playerSize[0]
        console.log({
            h: cnv.width,
            p: Player.playerStep[0],
            x: this.x
        })

        // creating enemies
        const enemyX = [0, 5, 10, 15, 19];
        const enemyY = [0, 1, 2, 3, 4];
        const enemies = enemyX.map((x, i) => {
            const y = enemyY[i];
            const e = new enemy()
            e.x = x * Player.playerSize[0];
            e.y = y * Player.playerSize[1];
            return e
        })
        enemies.map(i => d.spawnObject(i))
    }

    drawGui(ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement, d: GGData): void {
    }

    shoot(d: GGData) {
        const b = new bullet()
        b.x = this.x;
        b.y = this.y - Player.playerStep[0];
        b.spawnTime = Date.now();
        b.byWho = "player";
        b.direction = 1;
        d.spawnObject(b);

    }

    takeDamage(damage: number) {
        this.health -= damage;
    }


    keyEvent(e: KeyboardEvent, d: GGData): void {
        console.log(e.key)
        switch (e.key) {
            case "q": {
                this.shoot(d)
                break;
            }
            case "a": {
                this.x -= Player.playerStep[1];
                break;
            }
            case "d": {
                this.x += Player.playerStep[1];
                break;
            }
        }
    }
})