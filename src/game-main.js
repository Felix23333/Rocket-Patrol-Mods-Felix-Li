//Name: Felix Li  Project Title: Rocket-Patrol-Mods
//Date:              The total time spend:

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height:480,
    scene: [Menu, Play, Play2],
};

let game = new Phaser.Game(config);

let borderUIsize = game.config.height / 15;
let borderPadding = borderUIsize / 3;

let leftMove, rightMove, fireKey, restartKey, menuKey, mouseModeKey;
let highScore = 0;
let gameSpeed = 1;
let mouseX;
let p1Score = 0;
let p2Score = 0;
let isP2 = false;
let music;
let addMusic = false;

// Extra Mods BreakDown
// Track high score (5)
// Fire UI (5)
// Own Background Music (5)
// Random ship direction (5)
// New scolling background picture (5)
// Allow player to control after shoot (5)
// Display the time remaining (10)
// Create a new title screen (10)
// Implement add time when successful hit (20)
// Implement mouse control mode, press "N" to switch (20)
// Create a new spaceship type that's smaller, moves faster, and is worth more points (20)
// Implement an alternating two-player mode (20)