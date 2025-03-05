import Phaser, { Game } from 'phaser'
import './style.css'
import GameScene from './scenes/game-scene'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 320 * 1.5 ,
    height: 480 * 1.5,
    parent: 'app',
    scene: [
        GameScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 900}
        }
    }
}

// @ts-ignore
const game = new Game(config)