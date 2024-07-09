export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, name = "dude"){
        super(scene, x, y, name);
        this.scene = scene;
        this.name = name;
        scene.add.existing(this);
       scene.physics.add.existing(this);
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(300);
      
    }

    init(){
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
           });
    
           this.scene.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4 }],
            frameRate: 20
           });
    
           this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
           });
         
    
    }

   

   
}