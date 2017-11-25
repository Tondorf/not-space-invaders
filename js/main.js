(function () {

    // Game
    var game = new Phaser.Game(X, Y, Phaser.CANVAS, 'container', {preload: preload, create: create, update: update});

    function preload() {
        game.load.image('player', 'assets/player.png');
        game.load.image('heart', 'assets/heart.png');
        game.load.image('bullet', 'assets/bullet.png');

        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        preloadEnemySprites(game);
    }

    // TODO: class for global game with one instance named 'world', which holds all data

    var world = {
        cursors: null,
        fireButtons: null,
        background_rendering: null,
        foreground_rendering: null,

        player: null,
        enemies: null,
        weapon: null,

        pos: 0
    };


    function create() {
        cursors = game.input.keyboard.createCursorKeys();
        world.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


        world.background_rendering = game.add.graphics(0, 0);
        world.foreground_rendering = game.add.graphics(0, 0);

        player = game.add.sprite(0, 0, 'player');
        player.scale.setTo(0.5);
        player.anchor.setTo(0.5, 0.5);

        game.physics.arcade.enable(player);


        // TODO: generate enemies (not directly here, write and call a function for that) so that they reside in an inner circular shape
        world.enemies = spawnEnemies(game);


        //  Creates 30 bullets, using the 'bullet' graphic
        world.weapon = game.add.weapon(30, 'bullet');
        world.weapon.bulletAngleOffset = 90;

        //  The bullet will be automatically killed when it leaves the world bounds
        world.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //  Because our bullet is drawn facing up, we need to offset its rotation:


        //  The speed at which the bullet is fired
        world.weapon.bulletSpeed = 400;
        world.weapon.fireRate = 180;
        // weapon.bulletSpeedVariance = 200;
        world.weapon.trackSprite(player, 0, 0);



        createHUD(game, world);
    }

    function update() {
        // TODO: draw dynamic parts of HUD

        if (cursors.left.isDown) {
            world.pos += 0.003;
            if (world.pos >= 1) world.pos -= 1
        }
        if (cursors.right.isDown) {
            world.pos -= 0.003;
            if (world.pos < 0) world.pos += 1
        }

        if (world.fireButton.isDown) {
            world.weapon.fire();
        }

        player.x = posToX(world.pos);
        player.y = posToY(world.pos);
        player.angle = world.pos * 360 - 90;

        world.weapon.fireAngle = world.pos * 360 - 180
        // console.log("angle: " + weapon.bulletAngleOffset)
        // TODO: check for space and spawn a player shot towards the player


        // console.log(pos)

        updateHUD(game, world);


        // TODO: randomly move, rotate and let the generated enemies shoot
        moveEnemies(game, world);

        // TODO: collision for playershot<->enemy and enemyshot<->player, also spawn awesome explosions on hit and update game state accordingly
    }

    function posToX(pos) {
        return (midX - RADIUS) + (1 + Math.cos(2 * Math.PI * pos)) * RADIUS
    }

    function posToY(pos) {
        return (midY - RADIUS) + (1 + Math.sin(2 * Math.PI * pos)) * RADIUS
    }
})();
