let config = {
    type: Phaser.CANVAS,
    width: 640,
    height:480,
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);

let borderUIsize = game.config.height / 15;
let borderPadding = borderUIsize / 3;

let leftMove, rightMove, fireKey, restartKey, menuKey;
let highScore = 0;
let gameSpeed = 1;