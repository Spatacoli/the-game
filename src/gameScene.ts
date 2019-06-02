import "phaser";

export class GameScene extends Phaser.Scene {
    info: Phaser.GameObjects.Text;

    gameOver: boolean = false;

    bricks: Phaser.Physics.Arcade.Image[] = [];
    padding: number = 18;
    vPadding: number = 10;
    numberOfBricksX: number = 10;
    numberOfBricksY: number = 5;
    brickWidth: number = 60;
    brickHeight: number = 30;
    brick: Phaser.Physics.Arcade.Image;
    paddle: Phaser.Physics.Arcade.Image;
    ball: Phaser.Physics.Arcade.Image;
    ballDVY: number = 5;
    ballDVX: number = 0;

    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({
            key: "GameScene"
        });
    }

    init(params): void {}

    preload(): void {
        this.load.image("brickImg", "assets/brick.png");
        this.load.image("paddle", "assets/paddle.png");
        this.load.image("ball", "assets/ball.png");
    }

    create(): void {
        this.gameOver = false;
        this.info = this.add.text(10, 10, "", {
            font: "24px Arial Bold",
            fill: "#FBFBAC"
        });
        this.ball = this.physics.add.image(200, 300, "ball");
        this.paddle = this.physics.add.image(250, 550, "paddle");
        this.paddle.setCollideWorldBounds(true);
        this.ball.setCollideWorldBounds(true);

        this.physics.add.overlap(
            this.paddle,
            this.ball,
            this.bounce,
            null,
            this
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        for (let y = 0; y < this.numberOfBricksY; y++) {
            for (let x = 0; x < this.numberOfBricksX; x++) {
                let posY = y * this.brickHeight + this.vPadding * (y + 1) + 15;
                let posX = x * this.brickWidth + this.padding * (x + 1) + 30;
                this.bricks.push(
                    this.physics.add.image(posX, posY, "brickImg")
                );
                var brick = this.bricks[this.bricks.length - 1];
                this.physics.add.overlap(
                    this.ball,
                    brick,
                    this.destroyBrick,
                    null,
                    this
                );
            }
        }
    }

    destroyBrick(
        ball: Phaser.Physics.Arcade.Image,
        brick: Phaser.Physics.Arcade.Image
    ): void {
        this.ballDVY = -1 * this.ballDVY;
        brick.destroy();
    }

    bounce(): void {
        this.ballDVY = -1 * this.ballDVY;

        var leftBallPos = this.ball.x;
        var leftPaddlePos = this.paddle.x;

        var collisionPoint = leftBallPos - leftPaddlePos;
        var modifier = 1;

        if (collisionPoint < 0) {
            modifier = -1;
        }

        if (collisionPoint < 10 && collisionPoint > -10) {
            this.ballDVX = 0;
        } else if (collisionPoint < 30 && collisionPoint > -30) {
            this.ballDVX = modifier * 1;
        } else if (collisionPoint < 60 && collisionPoint > -60) {
            this.ballDVX = modifier * 2;
        } else if (collisionPoint >= 60 || collisionPoint <= -60) {
            this.ballDVX = modifier * 5;
        }
        console.log({
            collisionPoint,
            leftBallPos,
            leftPaddlePos,
            dvx: this.ballDVX,
            dvy: this.ballDVY
        });
    }

    update(): void {
        if (this.cursors.left.isDown) {
            this.paddle.x = this.paddle.x - 10;
        } else if (this.cursors.right.isDown) {
            this.paddle.x = this.paddle.x + 10;
        }

        if (this.ball.x - this.ball.width / 2 < 0) {
            this.ballDVX = -1 * this.ballDVX;
        } else if (this.ball.x + this.ball.width / 2 > 800) {
            this.ballDVX = -1 * this.ballDVX;
        }

        this.ball.x = this.ball.x + this.ballDVX;
        this.ball.y = this.ball.y + this.ballDVY;

        if (this.ball.y + this.ball.height / 2 >= 600) {
            this.scene.start("ScoreScene", { win: false });
        } else if (this.ball.y - this.ball.height / 2 <= 0) {
            this.scene.start("ScoreScene", { win: true });
        }
    }
}
