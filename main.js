import './style.css'
import Phaser from 'phaser';
import Game from './scenes/game';


const sizes = {
    width: 800,
    height: 600
}

const speedDown = 300;



const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas: gameCanvas,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: speedDown },
            debug: true
        }
    },
    scene: [Game]
};

const game = new Phaser.Game(config);


