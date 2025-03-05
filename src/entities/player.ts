import { GameObjects, Scene } from "phaser";

export default class Player extends GameObjects.Rectangle {

    declare body: Phaser.Physics.Arcade.Body

    private jumpStrength = 420
    private speed = 250

    constructor(scene: Scene) {
        super(
            scene,
            100,
            300,
            40,
            40,
            0xffff00
        )

        scene.add.existing(this)

        scene.physics.add.existing(this)

        this.body.setAllowGravity(false)

        this.jump = this.jump.bind(this)
        this.scene.input.on('pointerdown', this.jump)
    }

    public update() {
        if(this.body.allowGravity == false)
            return
        this.body.setVelocityX(this.speed)

        const vx = this.body.velocity.x
        const vy = this.body.velocity.y
        const angle = Math.atan2(vy, vx)
        this.setRotation(angle)
    }

    public kill(){
        this.body.setAllowGravity(false)
        this.body.setVelocity(0, 0)
        this.scene.input.off('pointerdown', this.jump)
    }


    private jump(){
        if(this.body.allowGravity === false) {
            this.body.setAllowGravity(true)
        }
        this.body.setVelocityY(-this.jumpStrength)
    }
}