import Player from '../gameobjects/player';
export default class Game extends Phaser.Scene {
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
        
    }

    preload() {
        this.load.image('sky', 'assets/background_01.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
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
        this.player = new Player(this,this.center_width,this.center_height);
    //    this.player =this.physics.add.sprite(100,450, 'dude');
       this.cameras.main.setBackgroundColor(0x87ceeb);
       this.cameras.main.startFollow(this.player);
    //    this.player.setBounce(0.2);
    //    this.player.setCollideWorldBounds(true);
    //    this.player.setGravityY(300);
       this.physics.add.collider(this.player, this.platforms);
        this.cursor = this.input.keyboard.createCursorKeys();

    //    this.anims.create({
    //     key: 'left',
    //     frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
    //     frameRate: 10,
    //     repeat: -1
    //    });

    //    this.anims.create({
    //     key: 'turn',
    //     frames: [{key: 'dude', frame: 4 }],
    //     frameRate: 20
    //    });

    //    this.anims.create({
    //     key: 'right',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    //     frameRate: 10,
    //     repeat: -1
    //    });

       this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: {x: 12, y:0, stepX: 70}
       });
       this.stars.children.iterate(function (child){
        child.setBounce(Phaser.Math.FloatBetween(0.4,0.8));
       });
       this.physics.add.collider(this.stars,this.platforms);
       this.physics.add.overlap(this.player,this.stars,collectStar,null,this);

       function collectStar(player,star){
        star.disableBody(true,true);
        this.score += 10;
        this.scoreText.setText('Score ' + this.score);

        if(this.stars.countActive(true)=== 0){
            this.stars.children.iterate(function (child){
                child.enableBody(true,child.x,0, true,true);
            });
            var x = (player.x <400) ? Phaser.Math.Between(400,800): Phaser.Math.Between(0,400);

            var bomb = this.bombs.create(x,16,'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200,200),20);
          }
          
       }
       this.scoreText = this.add.text(16,16,'score: 0', { fontSize: '32px', fill: '#DAED38 '});
        this.bombs = this. physics.add.group();
       this.physics.add.collider(this.bombs,this.platforms);
       this.physics.add.collider(this.player,this.bombs,this.hitBomb,null,this);

      
    }

    hitBomb(){
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.gameOver = true;
       }

    update() {
        if(this.cursor.left.isDown){
            this.player.x += -160;
            this.player.anims.play('left', true);
        }else if(this.cursor.right.isDown){
            this.player.x += 160;
            this.player.anims.play('right', true);
        }
        else{
            this.player.x = 0;
            this.player.anims.play('turn');
        }
        if(this.cursor.up.isDown && this.player.body.touching.down){
            this.player.y += -600;
        }
    }


}