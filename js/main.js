(function () {

    // Globals
    const X = 1200;
    const Y = 800;
    const midX = X/2;
    const midY = Y/2;
    const RADIUS = Y/2-100;

    // Game
    var game = new Phaser.Game(X, Y, Phaser.CANVAS, 'container', {preload: preload, create: create, update: update});

    function preload() {
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('enemy1', 'assets/enemy1.png', 48, 64);
        game.load.spritesheet('enemy2', 'assets/enemy2.png', 48, 64);
        game.load.spritesheet('enemy3', 'assets/enemy3.png', 48, 64);
    }

    // TODO: class for global game with one instance named 'world', which holds all data

    var cursors;
    var player;
    var player_graphics;
    var enemies;

    // important value in [0, 1]
    // 0 is right, 0.25 is bottom, 0.5 is left, 0.75 is top
    var pos = 0.25;

    var x = Math.cos(2 * Math.PI * pos);
    var y = Math.sin(2 * Math.PI * pos);

    console.log("x: " + x + " y: " + y);

    function create() {
        cursors = game.input.keyboard.createCursorKeys();

        // TODO: draw static parts of HUD

        var graphics = game.add.graphics(0, 0);
        player_graphics =  game.add.graphics(0, 0);

        // TODO: generate enemies (not directly here, write and call a function for that) so that they reside in an inner circular shape
        // The enemies group contains all enemies in the middle
        // enemies = game.add.group();
        // for (e=0; e<20; e++) {
        //     var enemy = enemies.create(midX, midY, 'enemy1');
        //     enemies.push()
        // }

        graphics.lineStyle(3, 0xc0c0c0, 1);

        // draw player movement circle once
        graphics.drawCircle(midX, midY, 2 * RADIUS);
    }

    function update() {
        // TODO: draw dynamic parts of HUD

        if (cursors.left.isDown) {
            pos += 0.003;
            if (pos >= 1) pos -= 1
        }
        if (cursors.right.isDown) {
            pos -= 0.003;
            if (pos < 0) pos += 1
        }
        // TODO: check for space and spawn a player shot towards the player

        // console.log(pos)

        x = Math.cos(2 * Math.PI * pos);
        y = Math.sin(2 * Math.PI * pos);
        // TODO calculate orientation for player sprite so that it looks toward the center

        // TODO: draw real sprite (with calculated orientation)
        player_graphics.clear();
        player_graphics.lineStyle(3, 0xff0000, 1);
        player_graphics.beginFill(0xff0000, 1);
        player_graphics.drawCircle((midX-RADIUS) + (1+x)*RADIUS, (midY-RADIUS) + (1+y)*RADIUS, 5)

        // TODO: randomly move, rotate and let the generated enemies shoot

        // TODO: collision for playershot<->enemy and enemyshot<->player, also spawn awesome explosions on hit and update game state accordingly
    }
})();
