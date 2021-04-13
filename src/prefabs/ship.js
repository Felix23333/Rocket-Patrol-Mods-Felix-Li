class Ship extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.speed = 1;
    }

    update()
    {
        this.x -= this.speed;

        if(this.x < -this.width)
        {
            this.x = game.config.width;
        }
    }

    reset()
    {
        this.x = game.config.width + 50;
        this.alpha = 1;
    }
}