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
        this.playerSpeed= speedDown;
        this.reverseSpeed = this.playerSpeed /4.5
        
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
        this.center_width = this.width /2;
        this.center_height = this.height /2;
       // this.add.image(400, 300, 'sky');
     
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400,568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600,400,'ground');
        this.platforms.create(50,250,'ground');
        this.platforms.create(750,220,'ground');

       this.player =this.physics.add.sprite(this.center_width,this.center_height, 'ship');
       this.cameras.main.setBackgroundColor(0x0000);
       this.cameras.main.startFollow(this.player);
       this.player.setBounce(0.2);
       this.player.setCollideWorldBounds(true);
       this.player.setImmovable(false);
       this.player.body.setAllowGravity(false);
       this.physics.add.collider(this.player, this.platforms);
       this.cursors = this.input.keyboard.createCursorKeys();

       this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('ship', {start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
       });

       this.anims.create({
        key: 'down',
        frames: [{key: 'ship', frame: 1 }],
        frameRate: 20
       });

       this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('ship', { start: 2, end: 2 }),
        frameRate: 10,
        repeat: -1
       });

    //    this.stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 11,
    //     setXY: {x: 12, y:0, stepX: 70}
    //    });
    //    this.stars.children.iterate(function (child){
    //     child.setBounce(Phaser.Math.FloatBetween(0.4,0.8));
    //    });
    //    this.physics.add.collider(this.stars,this.platforms);
    //    this.physics.add.overlap(this.player,this.stars,collectStar,null,this);

    //    function collectStar(player,star){
    //     star.disableBody(true,true);
    //     this.score += 10;
    //     this.scoreText.setText('Score ' + this.score);

    //     if(this.stars.countActive(true)=== 0){
    //         this.stars.children.iterate(function (child){
    //             child.enableBody(true,child.x,0, true,true);
    //         });
    //         var x = (player.x <400) ? Phaser.Math.Between(400,800): Phaser.Math.Between(0,400);

    //         var bomb = this.bombs.create(x,16,'bomb');
    //         bomb.setBounce(1);
    //         bomb.setCollideWorldBounds(true);
    //         bomb.setVelocity(Phaser.Math.Between(-200,200),20);
    //       }
          
    //    }
    //    this.scoreText = this.add.text(16,16,'score: 0', { fontSize: '32px', fill: '#DAED38 '});

    //    this.bombs = this. physics.add.group();
    //    this.physics.add.collider(this.bombs,this.platforms);
    //    this.physics.add.collider(this.player,this.bombs,this.hitBomb,null,this);

      
    // }

    // hitBomb(){
    //     this.physics.pause();
    //     this.player.setTint(0xff0000);
    //     this.player.anims.play('turn');
    //     this.gameOver = true;
       }

    update() {
        this.player.anims.play('left', true);
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-this.playerSpeed);
            this.player.anims.play('left', true);
        }else if(this.cursors.right.isDown){
            this.player.setVelocityX(this.playerSpeed);
            this.player.anims.play('left', true);
        }else if(this.cursors.up.isDown){
            this.player.setVelocityY(-this.playerSpeed);
            this.player.anims.play('up');
        }else if(this.cursors.down.isDown){
            this.player.setAccelerationY(this.playerSpeed);
            this.player.anims.play('down');
        }
        else{
            this.player.setVelocityX(0);
            this.player.anims.play('left');
        }
      
    }


}