import Generator from '../gameobjects/generator';

const speedDown = 200;
const spawnRange = [100,350];
const platformSizeRange = [50,250];

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
        this.load.image('platform', 'assets/platform.png');
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
        this.platformGroup = this.add.group({
          removeCallback: function(platform){
            platform.scene.platformPool.add(platform)
          }
        });
        this.platformPool = this.add.group({
          removeCallback: function(platform){
            platform.scene.platformGroup.add(platform);
          }
        });
        this.addPlatform(this.width,this.height /2)
        this.generator = new Generator(this);
      
        this.cameras.main.setBackgroundColor(0x0000);
       this.setPlayer();
       this.physics.add.collider(this.player, this.platformGroup);
       this.cursor = this.input.keyboard.createCursorKeys();

    }

    addPlatform(platformWidth, posX){
      let platform;
      if(this.platformPool.getLength()){
        platform = this.platformPool.getFirst();
        platform.x = posX;
        platform.active = true;
        platform.visible = true;
        this.platformPool.remove(platform);
      }else{
        platform = this.physics.add.sprite(posX, this.height * 0.8, "platform");
        platform.setImmovable(true);
        platform.setVelocityX(speedDown * -1);
        this.platformGroup.add(platform);
      }
      platform.displayWidth = platformWidth;
      this.nextPlatformDistance= Phaser.Math.Between(spawnRange[0],spawnRange[1]);
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
        this.reciclePlatform();
        if (this.cursor.up.isDown) {
            this.player.setVelocityY(-this.playerSpeed)
          } else if (this.cursor.down.isDown) {
            this.player.setVelocityY(this.playerSpeed);
          } else if (this.cursor.right.isDown) {
            this.player.setVelocityX(this.playerSpeed)
          }else if (this.cursor.left.isDown){
            this.player.setVelocityX(0)
          }
          else {
            this.player.setVelocityY(0);
          }
          if (this.cursor.space.isDown) {
            console.log("SPACE!!!!");
          }

    }

    reciclePlatform(){
       // recycling platforms
      let minDistance = this.width;
      this.platformGroup.getChildren().forEach(function(platform){
        let platformDistance = this.width -platform.x - platform.displayWidth /2;
        minDistance = Math.min(minDistance, platformDistance);
        if(platform.x < - platform.displayWidth /2){
          this.platformGroup.killAndHide(platform);
          this.platformGroup.remove(platform);
        }
      },this);
        // adding new platforms
      if(minDistance < this.nextPlatformDistance){
        var nexPlatformWidth = Phaser.Math.Between(platformSizeRange[0],platformSizeRange[1]);
        this.addPlatform(nexPlatformWidth, this.width + nexPlatformWidth /2);
      }
    }


}