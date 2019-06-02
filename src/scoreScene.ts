import "phaser";

export class ScoreScene extends Phaser.Scene {
    win: boolean;
    result: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "ScoreScene" });
    }

    init(params: { win: boolean }): void {
        this.win = params.win;
    }

    create(): void {
        const resultText: string = this.win ? "You win!" : "You lose!";
        this.result = this.add.text(200, 250, resultText, {
            font: "48px Arial Bold",
            fill: "#FBFBAC"
        });

        const hintText: string = "Click to restart";
        this.hint = this.add.text(300, 350, hintText, {
            font: "24px Arial Bold",
            fill: "#FBFBAC"
        });

        this.input.on(
            "pointerdown",
            function() {
                this.scene.start("WelcomeScene");
            },
            this
        );
    }
}
