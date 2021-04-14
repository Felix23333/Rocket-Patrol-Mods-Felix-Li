class Rocket extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.speed = 1.5;
        this.isFire = false;
        this.sfxRocket = scene.sound.add("sfx_shoot"); // add rocket sfx
        this.mouse = false;
        this.sfxPlayed = false;
        
    }

    update()
    {
        //switch mode
        if(Phaser.Input.Keyboard.JustDown(mouseModeKey))
        {
            this.mouse = !this.mouse;
        }
        if(this.mouse)
        {
            if(game.input.mousePointer.leftButtonDown())
            {
                this.isFire = true;
                if(!this.sfxPlayed)
                {
                    this.sfxPlayed = true;
                    this.sfxRocket.play();
                }
            }
            if(game.input.mousePointer.x < borderUIsize + borderPadding)
            {
                this.x = borderUIsize + borderPadding;
            }
            else if(game.input.mousePointer.x > game.config.width - borderUIsize * 1.35)
            {
                this.x = game.config.width - borderUIsize * 1.35;
            }
            else
            {
                this.x = game.input.mousePointer.x;
            }

        }
        
        if(this.isFire)
        {
            if(leftMove.isDown && this.x > borderUIsize + borderPadding && !this.mouse)
            {   
                this.x -= this.speed * gameSpeed;
            }
            if(rightMove.isDown && this.x < game.config.width - borderUIsize * 1.35 && !this.mouse)
            {
                this.x += this.speed * gameSpeed;
            }
            if(game.input.mousePointer.x < borderUIsize + borderPadding && this.mouse)
            {
                this.x = borderUIsize + borderPadding;
            }
            else if(game.input.mousePointer.x > game.config.width - borderUIsize * 1.35 && this.mouse)
            {
                this.x = game.config.width - borderUIsize * 1.35;
            }
            this.scene.fireUI.alpha = 1;
            this.y -= this.speed * 1.5;
            if(this.y < borderUIsize * 3)
            {
                this.reset();
            }
        }
        else
        {
            if(leftMove.isDown && this.x > borderUIsize + borderPadding && !this.mouse)
            {   
                this.x -= this.speed * gameSpeed;
            }
            if(rightMove.isDown && this.x < game.config.width - borderUIsize * 1.35 && !this.mouse)
            {
                this.x += this.speed * gameSpeed;
            }
            if(Phaser.Input.Keyboard.JustDown(fireKey) && !this.mouse)
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
        this.sfxPlayed = false;
        this.scene.fireUI.alpha = 0;
    }
}