class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }
    preload()
    {
        this.load.image("starfield", "assets/starbackground.jpg");
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("ship", "assets/spaceship.png")
        this.load.spritesheet("explosion", "assets/explosion.png",
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    countTime()
    {
        this.timer -= 1;
        if(this.timer < 0)
        {
            this.timer = 0;
            this.gameover = true;
        }
    }

    create()
    {
        this.sound.play("background_music");
        this.gameover = false;
        //init score
        this.score = 0;

        //init timer;
        this.timer = 60;

        //score config
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#DEFACE',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        let highScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#000000',
        }

        let fireUIConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#FE1010',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        
        //add background
        this.starfield = this.add.tileSprite(
            0, 0, 640, 480, "starfield"
        ).setOrigin(0,0);
        //create rocket
        this.rocket = new Rocket(this, game.config.width / 2, game.config.height - 45,
                                "rocket");
        
        //create Ship
        this.ship1 = new Ship(this, 100, 200, "ship");
        this.ship2 = new Ship(this, 200, 250, "ship");
        this.ship3 = new Ship(this, 400, 300, "ship");
        //green UI
        this.add.rectangle(0, borderPadding + borderUIsize, 
                           game.config.width, borderUIsize * 2, 
                           0x00FF00).setOrigin(0,0);
        
        //show high score
        this.add.text(150, 63, "1st: ", highScoreConfig);
        this.add.text(200, 53, highScore, scoreConfig);

        //display Fire UI
        this.fireUI = this.add.text(320, 53, "FIRE!", fireUIConfig);
        this.fireUI.alpha = 0;
        
        //display score
        this.scoreLeft = this.add.text(borderUIsize + borderPadding, 
                        borderUIsize + borderPadding * 2, this.score, scoreConfig);
        
        //display time
        this.add.text(435, 63, "Time: ", highScoreConfig);
        this.timeLeft = this.add.text(game.config.width - borderPadding - borderUIsize - 100,
            borderUIsize + borderPadding * 2, this.time, timeConfig);

        // white borders
	    this.add.rectangle(0, 0, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUIsize, game.config.width, borderUIsize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUIsize, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
        //detect keyboard input
        leftMove = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        rightMove = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        menuKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        //animation
        this.anims.create({
            key: "explode", 
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate : 30
        });

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        //count remain time;
        this.time.addEvent({ delay: 1000, callback: this.countTime, 
                            callbackScope: this, loop: true });
        this.clock = this.time.delayedCall(60000, () => {
                    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
                    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
                    this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press (M) to Main menu', scoreConfig).setOrigin(0.5);
                    this.gameover = true;
        }, null, this);

        this.time.delayedCall(30000, () =>{
            gameSpeed = 1.7;
        }, null, this);
        
    }

    

    update() 
    {
        this.timeLeft.text = this.timer;
        if(this.gameover)
        {
            gameSpeed = 1;
            if(this.score > highScore)
            {
                highScore = this.score;
            }
        }
        if(this.gameover && restartKey.isDown)
        {
            this.scene.restart();
        }
        if(this.gameover && menuKey.isDown)
        {
            this.scene.start("menuScene");
        }
        if(!this.gameover)
        {
            this.rocket.update();
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
            this.starfield.tilePositionX -= 2;
        }
        
        this.checkcollision(this.rocket, this.ship1);
        this.checkcollision(this.rocket, this.ship2);
        this.checkcollision(this.rocket, this.ship3);
    }

    checkcollision(rocket, ship)
    {
        if(rocket.x + rocket.width >= ship.x 
            && rocket.y + rocket.height >= ship.y
            && rocket.x <= ship.x + ship.width
            && rocket.y <= ship.y + ship.height)
        {
            this.shipExplosion(ship);
            this.score += 1;
            this.scoreLeft.text = this.score;
            rocket.reset();
        }
    }

    shipExplosion(ship)
    {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x - ship.width, 
                    ship.y - ship.height * 0.5, 'explosion').setOrigin(0, 0);
        boom.anims.play("explode");
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position    
            boom.destroy();                       // remove explosion sprite
            this.sound.play("sfx_explode");
        });       
    }

    
    
}