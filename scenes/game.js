const speedDown = 200;

export default class Game extends Phaser.Scene {
    reverseEnabled;
    constructor() {
        super("game");
        this.platforms;
        this.player;
        this.cursors;
        this.stars;
        this.score = 0;
        this.scoreText;
        this.bombs;
        this.gameOver;
        this.playerSpeed = speedDown;
        this.reverseSpeed = this.playerSpeed / 4.5

    }

    preload() {
        this.load.image('sky', 'assets/background_01.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('ship',
            'assets/space_ship_01.png',
            { frameWidth: 64, frameHeight: 64 }
        );
    }

    create() {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width / 2;
        this.center_height = this.height / 2;
        // this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(3).refreshBody();
        // this.platforms.create(600, 400, 'ground');
        // this.platforms.create(50, 250, 'ground');
        // this.platforms.create(750, 220, 'ground');
        this.cameras.main.setBackgroundColor(0x0000);
       this.setPlayer();
       this.cursor = this.input.keyboard.createCursorKeys();

    }

    setPlayer(){
        this.player = this.physics.add.sprite(this.center_width, this.center_height, 'ship').setOrigin(0.0);
        this.cameras.main.startFollow(this.player);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setImmovable(false);
       this.player.body.setAllowGravity(false);
       //this.player.body.allowGravity = false;
        this.physics.add.collider(this.player, this.platforms);
      

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: [{ key: 'ship', frame: 1 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('ship', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        this.player.anims.play('left', true);
        if (this.cursor.up.isDown) {
            this.player.setVelocityY(-this.playerSpeed)
          } else if (this.cursor.down.isDown) {
            this.player.setVelocityY(this.playerSpeed);
          } else if (this.cursor.right.isDown) {
            this.player.setVelocityX(this.playerSpeed)
          }else if (this.cursor.left.isDown){
            this.player.setVelocityX(-this.playerSpeed)
          }
          else {
            this.player.setVelocityY(0);
          }
          if (this.cursor.space.isDown) {
            console.log("SPACE!!!!");
          }

    }


}