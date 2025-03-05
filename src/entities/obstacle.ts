import { GameObjects, Physics, Scene } from "phaser";

export default class Obstacle extends GameObjects.Container {

    public width = 100
    public gap = 200
    public hasGivenScore = false

    private top: GameObjects.Rectangle
    private bottom: GameObjects.Rectangle

    constructor(scene: Scene, x: number, collisionGroup: Physics.Arcade.Group) {
        super(scene, x)

        const min = this.gap/2 + 50
        const max = (this.scene.game.config.height as number) - this.gap/2 - 50
        this.setY(min + (max - min) * Math.random())

        this.top = new GameObjects.Rectangle(scene, 0, 0, this.width, 1000, 0x0000ff)
        this.top.setOrigin(0.5, 1)
        this.top.setY(-this.gap/2)
        this.add(this.top)

        this.bottom = new GameObjects.Rectangle(scene, 0, 0, this.width, 1000, 0x0000ff)
        this.bottom.setOrigin(0.5, 0)
        this.bottom.setY(this.gap/2)
        this.add(this.bottom)

        this.scene.add.existing(this)

        collisionGroup.add(this.top)
        collisionGroup.add(this.bottom)
    }
}