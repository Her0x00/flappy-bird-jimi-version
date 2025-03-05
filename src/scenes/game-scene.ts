import { Physics, Scene } from "phaser";
import Player from "../entities/player";
import Obstacle from "../entities/obstacle";
import GameOverView from "../ui/game-over.view";
import { GameObjects } from "phaser";

export default class GameScene extends Scene GameObjects.Container {

    public player?: Player

    private obstacleCollisionGroup?: Physics.Arcade.Group

    private obstacles: Array<Obstacle>

    private spaceBetweenObstacles = 300

    private isGameOver = false
    private score = 0
    
    constructor(scene, score: number,) {
        super({key: 'game-scene'})

        this.obstacles = []

        const scoreLabel = new GameObjects.Text(scene, (scene.game.config.width as number)/2, (scene.game.config.height as number)/2, score.toString(), {
            fontFamily: 'Courier New',
            fontStyle: 'bold',
            fontSize: 128,
            color: 'white'
        })
        scoreLabel.setOrigin(0.5, 0.5)
        this.add(scoreLabel)
    }

    preload(){

    }

    create(){
        this.isGameOver = false
        this.obstacles = []
        this.score = 0

        this.player = new Player(this)

        this.obstacleCollisionGroup = this.physics.add.group({
            immovable: true,
            allowGravity: false
        })

        this.physics.add.collider(this.player, this.obstacleCollisionGroup, this.onCollision.bind(this))

        this.spawnObstacle()
        this.spawnObstacle()
        this.spawnObstacle()

    }
    
    update(time: number, delta: number) {

        if(this.isGameOver) {
            return
        }
        
        this.player!.update()
        if(this.player!.y < 0 || this.player!.y > (this.game.config.height as number)){
            this.onCollision()
        }

        this.cameras.main.scrollX = this.player!.x - 100

        if(this.obstacles[0].x + this.obstacles[0].width/2 < this.cameras.main.scrollX) {
        this.obstacles[0].destroy()
        this.obstacles.splice(0, 1)

        this.spawnObstacle()
        }
        if(this.obstacles[0].hasGivenScore == false && this.obstacles[0].x < this.player!.x) {
            this.score++
            this.obstacles[0].hasGivenScore = true
            console.log(this.score)
        }
    }

    private spawnObstacle(){
        let x = (this.game.config.width as number) + this.spaceBetweenObstacles
        if(this.obstacles.length > 0) {
            x = this.obstacles[this.obstacles.length - 1].x + this.spaceBetweenObstacles
        }

        const obstacle = new Obstacle(this, x, this.obstacleCollisionGroup!)
        this.obstacles.push(obstacle)
    }

    private onCollision(){
        this.isGameOver = true
        this.player!.kill()

        new GameOverView(this, this.score, () => {
            this.scene.restart()
        })
    }
}

