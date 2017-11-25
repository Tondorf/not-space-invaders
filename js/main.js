(function () {

    // Globals
    const X = 1200;
    const Y = 800;
    const midX = X / 2;
    const midY = Y / 2;
    const RADIUS = Y / 2 - 100;

    // Game
    var game = new Phaser.Game(X, Y, Phaser.CANVAS, 'container', {preload: preload, create: create, update: update});

    function preload() {
        game.load.image('player', 'assets/player.png');
        game.load.image('heart', 'assets/heart.png');
        game.load.image('bullet', 'assets/bullet.png');

        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        initEnemySprites(game);
    }

    // TODO: class for global game with one instance named 'world', which holds all data

    var cursors;
    var fireButton;
    var background_rendering;
    var foreground_rendering;

    var player;
    var enemies;
    var weapon;

    var pos = 0;


    function create() {
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


        background_rendering = game.add.graphics(0, 0);
        foreground_rendering = game.add.graphics(0, 0);

        player = game.add.sprite(0, 0, 'player');
        player.scale.setTo(0.5);
        player.anchor.setTo(0.5, 0.5);

        game.physics.arcade.enable(player);


        // TODO: generate enemies (not directly here, write and call a function for that) so that they reside in an inner circular shape
        enemies = spawnEnemies(game);


        //  Creates 30 bullets, using the 'bullet' graphic
        weapon = game.add.weapon(30, 'bullet');
        weapon.bulletAngleOffset = 90;

        //  The bullet will be automatically killed when it leaves the world bounds
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //  Because our bullet is drawn facing up, we need to offset its rotation:


        //  The speed at which the bullet is fired
        weapon.bulletSpeed = 400;
        weapon.fireRate = 180;
        // weapon.bulletSpeedVariance = 200;
        weapon.trackSprite(player, 0, 0);


        // draw player movement circle once
        background_rendering.lineStyle(10, 0xc0c0c0, 0.15);
        background_rendering.drawCircle(midX, midY, 2 * RADIUS);


        var boxPadding = 15;
        var boxWidth = 150;
        var boxHeight = 30;
        var boxSmoothing = 10;

        background_rendering.lineStyle(0, 0, 0);
        background_rendering.beginFill(0xc0c0c0, 0.15);
        background_rendering.drawRoundedRect(boxPadding, boxPadding, boxWidth, boxHeight, boxSmoothing);
        background_rendering.drawRoundedRect(X - boxWidth - boxPadding, boxPadding, boxWidth, boxHeight, boxSmoothing);
        background_rendering.drawRoundedRect(boxPadding, Y - boxHeight - boxPadding, boxWidth, boxHeight, boxSmoothing);
        background_rendering.drawRoundedRect(X - boxWidth - boxPadding, Y - boxHeight - boxPadding, boxWidth, boxHeight, boxSmoothing)
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

        if (fireButton.isDown) {
            weapon.fire();
        }

        player.x = posToX(pos);
        player.y = posToY(pos);
        player.angle = pos * 360 - 90;

        weapon.fireAngle = pos * 360 - 180
        // console.log("angle: " + weapon.bulletAngleOffset)
        // TODO: check for space and spawn a player shot towards the player


        // console.log(pos)


        // TODO: randomly move, rotate and let the generated enemies shoot
        moveEnemies(game, enemies);

        // TODO: collision for playershot<->enemy and enemyshot<->player, also spawn awesome explosions on hit and update game state accordingly
    }

    function posToX(pos) {
        return (midX - RADIUS) + (1 + Math.cos(2 * Math.PI * pos)) * RADIUS
    }

    function posToY(pos) {
        return (midY - RADIUS) + (1 + Math.sin(2 * Math.PI * pos)) * RADIUS
    }
})();
