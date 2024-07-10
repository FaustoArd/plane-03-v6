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
    scale: {
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH
    },
     autoRound: false,
    canvas: gameCanvas,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }
    },
    scene: [Game]
};

const game = new Phaser.Game(config);
//  window.focus();
//  resize();
//  window.addEventListener("resize", resize, false);


// function resize() {
//     let gameCanvas = document.querySelector("gameCanvas");
//     let windowWidth = window.innerWidth;
//     let windowHeight = window.innerHeight;
//     let windowRatio = windowWidth / windowHeight;
//     let gameRatio = config.width / config.height;
//     if (windowRatio < gameRatio) {
//         gameCanvas.style.width = windowWidth + "px";
//         gameCanvas.style.height = (windowWidth / gameRatio) + "px";
//     }
//     else {
//         gameCanvas.style.width = (windowHeight * gameRatio) + "px";
//         gameCanvas.style.height = windowHeight + "px";
//     }
// }


