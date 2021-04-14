
class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }
    preload()
    {
        this.load.audio("sfx_select", "assets/blip_select12.wav");
        this.load.audio("sfx_explode", "assets/explosion38.wav");
        this.load.audio("sfx_shoot", "assets/rocket_shot.wav");
        this.load.audio("background_music", "assets/background.wav");
    }
    BeginPlay()
    {
        this.scene.start("playScene");
    }

    create()
    {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '42px',
            backgroundColor: '#DEFACE',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500
        }

        let infoConfig = {
            fontFamily: 'Courier',
            fontSize: '23px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 300
        }
        //Set Menu info text
        this.add.text(game.config.width/2, 100, "Rocket Patrol Menu", menuConfig).setOrigin(0.5);
        this.add.text(20, 20, "'A' - Left Move    'D' - Right Move").setOrigin(-0.4, -15);
        this.add.text(20, 20, "'K' - Shoot").setOrigin(-2.3, -18);
        this.add.text(game.config.width/2, 400, "Click 'Enter' to play!", infoConfig).setOrigin(0.5);
        

        //Handle Scene Transition
        this.input.keyboard.on('keydown-ENTER', this.BeginPlay, this);
    }

}