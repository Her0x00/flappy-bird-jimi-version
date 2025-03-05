import { GameObjects, Scene } from "phaser";

export default class GameOverView extends GameObjects.Container {
    constructor(scene: Scene, score: number, onRestart: () => void) {
        super(scene, 0, 0)

        const bg = new GameObjects.Rectangle(scene, 0, 0, scene.game.config.width as number, scene.game.config.height as number, 0x000000, 0.75)
        bg.setOrigin(0, 0)
        this.add(bg)

        const title = new GameObjects.Text(scene, (scene.game.config.width as number)/2, 200, 'Game Over', {
            fontFamily: 'Courier New',
            fontStyle: 'bold',
            fontSize: 64,
            color: 'white'
        })
        title.setOrigin(0.5, 0.5)
        this.add(title)
        const scoreLabel = new GameObjects.Text(scene, (scene.game.config.width as number)/2, (scene.game.config.height as number)/2, score.toString(), {
            fontFamily: 'Courier New',
            fontStyle: 'bold',
            fontSize: 128,
            color: 'white'
        })
        scoreLabel.setOrigin(0.5, 0.5)
        this.add(scoreLabel)
        const restart = new GameObjects.Text(scene, (scene.game.config.width as number)/2, (scene.game.config.height as number) - 200, '[Click to restart]', {
            fontFamily: 'Courier New',
            fontStyle: 'bold',
            fontSize: 28,
            color: 'white'
        })
        restart.setOrigin(0.5, 0.5)
        this.add(restart)

        this.setScrollFactor(0, 0)
        scene.add.existing(this)

        scene.input.on('pointerdown', onRestart)
    }
}