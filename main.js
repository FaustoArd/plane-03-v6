import './style.css'
import Phaser from 'phaser';
import Game from './scenes/game';


const sizes = {
    width: 1366,
    height: 768
}

const speedDown = 300;



const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    scale:{
        //mode: Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH
    },
   // autoRound: false,
    canvas: gameCanvas,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [Game]
};

const game = new Phaser.Game(config);


