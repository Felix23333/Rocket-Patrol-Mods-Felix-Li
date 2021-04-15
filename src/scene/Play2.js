class Play2 extends Phaser.Scene
{
    constructor()
    {
        super("play2Scene");
    }
    preload()
    {
        this.load.image("rareship", "assets/rareship.png");
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
        music.play();
        this.gameover = false;
        this.showGameoverUI = false;

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
            fixedWidth: 75
        }

        let scoreConfig2 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#DEFACE',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 75
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
        this.rship = new RareShip(this, Phaser.Math.Between(0, 600), 150, "rareship");
        this.ship1 = new Ship(this, Phaser.Math.Between(0, 600), 200, "ship");
        this.ship2 = new Ship(this, Phaser.Math.Between(0, 600), 250, "ship");
        this.ship3 = new Ship(this, Phaser.Math.Between(0, 600), 300, "ship");
        this.rship.scale = 0.7;
        //green UI
        this.add.rectangle(0, borderPadding + borderUIsize, 
                           game.config.width, borderUIsize * 2, 
                           0x00FF00).setOrigin(0,0);
        
        //show high score
        this.add.text(50, 63, "P1:", highScoreConfig);
        this.add.text(175, 63, "P2:", highScoreConfig);
        this.scoreP2 = this.add.text(210, 53, p2Score, scoreConfig2);

        //display Fire UI
        this.fireUI = this.add.text(320, 53, "FIRE!", fireUIConfig);
        this.fireUI.alpha = 0;
        
        //display score
        this.scoreLeft = this.add.text(borderUIsize + borderPadding + 45, 
                        borderUIsize + borderPadding * 2, p1Score, scoreConfig);
        
        //display time
        this.add.text(435, 63, "Time:", highScoreConfig);
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
        mouseModeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        //animation
        this.anims.create({
            key: "explode", 
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate : 30,
        });

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        //count remain time;
        this.time.addEvent({ delay: 1000, callback: this.countTime, 
                            callbackScope: this, loop: true });

        // this.clock = this.time.delayedCall(60000, () => {
        //             this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        //             this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
        //             this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press (M) to Main menu', scoreConfig).setOrigin(0.5);
        //             this.gameover = true;
        // }, null, this);
        
        //2player UI
        this.goUI1 = this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.goUI2 = this.add.text(game.config.width/2, game.config.height/2 + 64, "Press (R) to start P2's game", scoreConfig).setOrigin(0.5);
        this.goUI3 = this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press (M) to Main menu', scoreConfig).setOrigin(0.5);

        this.p1Win = this.add.text(game.config.width/2, game.config.height/2 + 64, "P1 is the winner!", scoreConfig).setOrigin(0.5);
        this.p2Win = this.add.text(game.config.width/2, game.config.height/2 + 64, "P2 is the winner!", scoreConfig).setOrigin(0.5);
        this.tie = this.add.text(game.config.width/2, game.config.height/2 + 64, "Wow! It is a tie!", scoreConfig).setOrigin(0.5);
        this.goUI1.alpha = 0;
        this.goUI2.alpha = 0;
        this.goUI3.alpha = 0;
        this.p1Win.alpha = 0;
        this.p2Win.alpha = 0;
        this.tie.alpha = 0;

        this.time.delayedCall(30000, () =>{
            gameSpeed = 1.7;
        }, null, this);
        
    }

    

    update() 
    {
        this.timeLeft.text = this.timer;
        if(this.gameover)
        {
            this.sound.get("background_music").stop();
            gameSpeed = 1;
        }
        if(this.gameover && !this.showGameoverUI)
        {
            this.showGameoverUI = true;
            if(!isP2)
            { 
                this.goUI1.alpha = 1;
                this.goUI2.alpha = 1;
                this.goUI3.alpha = 1;
            }
            else
            {
                this.goUI1.alpha = 1;
                this.goUI3.alpha = 1;
                if(p1Score > p2Score)
                {
                    this.p1Win.alpha = 1;
                }
                else if(p2Score > p1Score)
                {
                    this.p2Win.alpha = 1;
                }
                else
                {
                    this.tie.alpha = 1;
                }
            }
            
        }
        if(this.gameover && restartKey.isDown && !isP2)
        {
            isP2 = true;
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
            this.rship.update();
            this.starfield.tilePositionX -= 2;
        }
        
        this.checkcollision(this.rocket, this.ship1);
        this.checkcollision(this.rocket, this.ship2);
        this.checkcollision(this.rocket, this.ship3);
        this.checkcollision(this.rocket, this.rship);
    }

    checkcollision(rocket, ship)
    {
        if(rocket.x + rocket.width >= ship.x 
            && rocket.y + rocket.height >= ship.y
            && rocket.x <= ship.x + ship.width
            && rocket.y <= ship.y + ship.height)
        {
            this.shipExplosion(ship);
            if(!isP2)
            {
                p1Score += 1;
                if(ship == this.rship)
                {
                    p1Score += 1;
                }
                this.scoreLeft.text = p1Score;
            }
            else
            {
                p2Score += 1;
                if(ship == this.rship)
                {
                    p2Score += 1;
                }
                this.scoreP2.text = p2Score;
            }
            rocket.reset();
        }
    }

    shipExplosion(ship)
    {
        ship.alpha = 0;
        this.timer += 1;
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