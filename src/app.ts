import "phaser";
import { WelcomeScene } from "./welcomeScene";
import { GameScene } from "./gameScene";
import { ScoreScene } from "./scoreScene";

const config: Phaser.Types.Core.GameConfig = {
    title: "Breakout",
    width: 800,
    height: 600,
    parent: "game",
    scene: [new WelcomeScene(), new GameScene(), new ScoreScene()],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    backgroundColor: "#000033"
};

export class StarfallGame extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.onload = () => {
    var game = new StarfallGame(config);
};
