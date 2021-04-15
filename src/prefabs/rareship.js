class RareShip extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.speed = 1;
        this.direction = Phaser.Math.Between(0, 1);
        if(!this.direction)
        {
            this.angle = 180;
        }
        
    }

    update()
    {
        if(this.direction)
        {
            this.x -= this.speed * gameSpeed * 2;

            if(this.x < -this.width)
            {
                this.x = game.config.width;
            }
        }
        else
        {
            this.x += this.speed * gameSpeed * 2;

            if(this.x > game.config.width + this.width)
            {
                this.x = 0;
            }
        }
        
    }

    reset()
    {
        if(this.direction)
        {
            this.x = game.config.width + 50;
        }
        else
        {
            this.x = 50;
        }
        
        this.alpha = 1;
    }
}