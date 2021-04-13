//Name: Felix Li  Project Title: Rocket-Patrol-Mods
//Date:              The total time spend:

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

//Extra Mods BreakDown
// Track high score (10)
// Fire UI (10)
// Own Background Music (10)
// Random ship direction (10)
// New scolling background picture (10)
// Allow player to control after shoot (10)
// Display the time remaining (15)