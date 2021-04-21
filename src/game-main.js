//Name: Felix Li  Project Title: Rocket-Patrol-Mods
//Date: 4/20/2021 The total time spend: 15 hours

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height:480,
    scene: [Menu, Play, Play2, CoPlay2],
};

let game = new Phaser.Game(config);

let borderUIsize = game.config.height / 15;
let borderPadding = borderUIsize / 3;

let leftMove, rightMove, fireKey, restartKey, menuKey, mouseModeKey, p2LeftKey, p2RightKey, p2ShootKey;
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
// Own Background Music (5) -- Use a music tool BeepBox to create
// Random ship direction (5)
// New scolling background picture (5) -- Use pixel studio to make
// Allow player to control after shoot (5)
// Display the time remaining (10)
// Create a new title screen (10) -- Use pixel studio to make
// Implement add time when successful hit (20) -- each hit will add 1 sec
// Implement mouse control mode (20) -- During the game, press "N" key to switch, also can switch back.
// Create a new spaceship type that's smaller, moves faster, and is worth more points (20) 
// Implement an alternating two-player mode (20) -- Press 2 to play this mode, after 1 round p1 and p2 play, game will tell you who wins.
// Implement a simultaneous two-player mode (30) -- Press 3 to play this mode, p1 and p2 play together, after time ends, game will tell you who wins.