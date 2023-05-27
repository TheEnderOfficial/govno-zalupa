import { GGData, GObject } from "../types";
import Enemy, { TEnemy } from "./enemy";

export default (class Bullet implements GObject {
    name = "bullet";
    x = 0;
    y = 0;
    color = "yellow";
    lifeTime = 5;
    guiSupport = false
    spawnTime = Date.now();
    size = [5, 25];
    damage: number = 1;
    byWho: "enemy" | "player" = "player"
    speed: number = 3
    // 1 - up
    // -1 - down
    direction: -1 | 1 = 1;
    
    draw(ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement, d: GGData): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size[0], this.size[1]);

        if (Date.now() - this.spawnTime > this.lifeTime * 1000) {
            d.destroyObject(this)
        }

        this.y -= this.direction * this.speed;
        if (this.y < 0 || this.y + this.size[1] > cnv.height) {
            d.destroyObject(this);
        }

        const ourEnemy = this.byWho === "enemy" ? "player" : "enemy";
        const ourEnemies = d.getAllObjectsByType(ourEnemy);

        ourEnemies.map(i => {
            const rectOneLeft = this.x
            const rectOneTop = this.y
            const rectOneRight = this.x + this.size[0]
            const rectOneBottom = this.y + this.size[1]

            const rectTwoLeft = i.x
            const rectTwoTop = i.y
            const rectTwoRight = i.x + Enemy.playerSize[0]
            const rectTwoBottom = i.y + Enemy.playerSize[1] 
            if(rectOneRight < rectTwoLeft || rectOneLeft > rectTwoRight || rectOneBottom < rectTwoTop || rectOneTop > rectTwoBottom){
                d.destroyObject(this);
                (i as unknown as TEnemy).takeDamage(this.damage, d);
                
            }
        })
        
    }

    setup(cnv: HTMLCanvasElement): void {

    }

    drawGui(ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement): void {}
    keyEvent(e: KeyboardEvent): void {}
})