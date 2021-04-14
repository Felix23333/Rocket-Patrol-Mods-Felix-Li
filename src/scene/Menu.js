
class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }
    preload()
    {
        this.load.image("title", "assets/title.jpg");
        this.load.image("gamemode", "assets/gamemode.jpg");
        this.load.audio("sfx_select", "assets/blip_select12.wav");
        this.load.audio("sfx_explode", "assets/explosion38.wav");
        this.load.audio("sfx_shoot", "assets/rocket_shot.wav");
        this.load.audio("background_music", "assets/background.wav");
    }
    OnePlayer()
    {
        this.scene.start("playScene");
    }

    create()
    {
        // let menuConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '42px',
        //     backgroundColor: '#DEFACE',
        //     color: '#843605',
        //     align: 'center',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 600,
        //     fixedHeight: 75
        // }


        let infoConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#DEFACE',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 300
        }

        let opConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 175
        }

        let opConfig2 = {
            fontFamily: 'Courier',
            fontSize: '16px',
            backgroundColor: '#DEFACE',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 175
        }
        //add title
        this.add.tileSprite(
            20, 20, 600, 75, "title"
        ).setOrigin(0);
        //Set Menu info text
        //Keyboard mode info
        this.add.text(game.config.width/5, 150, "Keyboard Mode", opConfig2).setOrigin(0.5);
        this.add.text(game.config.width/5, 175, "'A' - Move Left", opConfig).setOrigin(0.5);
        this.add.text(game.config.width/5, 200, "'D' - Move Right", opConfig).setOrigin(0.5);
        this.add.text(game.config.width/5, 225, "'K' - Shoot", opConfig).setOrigin(0.5);
        this.add.text(game.config.width/5, 250, "'N' - Switch Mode", opConfig).setOrigin(0.5);
        //Mouse mode info
        this.add.text(game.config.width/5 + 200, 150, "Mouse Mode", opConfig2).setOrigin(0.5);
        this.add.text(game.config.width/5 + 200, 175, "Move your mouse", opConfig).setOrigin(0.5);
        this.add.text(game.config.width/5 + 200, 200, "to control the", opConfig).setOrigin(0.5);
        this.add.text(game.config.width/5 + 200, 225, "rocket, click left", opConfig).setOrigin(0.5);
        this.add.text(game.config.width/5 + 200, 250, "button to shoot!", opConfig).setOrigin(0.5);
        //Co-op 2P info
        this.add.text(game.config.width/5 + 400, 150, "Co-op 2P Control", opConfig2).setOrigin(0.5);
        this.add.text(game.config.width/5 + 400, 175, "'<-' - Move Left", opConfig).setOrigin(0.5);
        this.add.text(game.config.width/5 + 400, 200, "'->' - Move Right", opConfig).setOrigin(0.5);
        this.add.text(game.config.width/5 + 400, 225, "'Enter' - Shoot", opConfig).setOrigin(0.5);
        this.add.text(game.config.width/5 + 400, 250, "Can't switch mode!", opConfig).setOrigin(0.5);
        
        this.add.tileSprite(
            game.config.width/2, 375, 300, 150, "gamemode"
        ).setOrigin(0.5);
        //Handle Scene Transition
        this.input.keyboard.on('keydown-ONE', this.OnePlayer, this);
    }

}