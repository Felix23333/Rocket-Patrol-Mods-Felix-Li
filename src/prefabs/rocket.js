class Rocket extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.speed = 1.5;
        this.isFire = false;
        this.sfxRocket = scene.sound.add("sfx_shoot"); // add rocket sfx
    }

    update()
    {
        if(this.isFire)
        {
            this.y -= this.speed * 1.5;
            if(this.y < borderUIsize * 3)
            {
                this.reset();
            }
        }
        else
        {
            if(leftMove.isDown && this.x > borderUIsize + borderPadding)
            {   
                this.x -= this.speed;
            }
            if(rightMove.isDown && this.x < game.config.width - borderUIsize * 1.35)
            {
                this.x += this.speed;
            }
            if(Phaser.Input.Keyboard.JustDown(fireKey))
            {
                this.isFire = true;
                this.sfxRocket.play();
            }
        }
        
    }
    reset()
    {
        this.y = game.config.height - 45;
        this.isFire = false;
    }
}