(function () {

    // Game
    var game = new Phaser.Game(X, Y, Phaser.CANVAS, 'container', {preload: preload, create: create, update: update});

    function preload() {
        game.load.image('player', 'assets/player.png');
        game.load.image('heart', 'assets/heart.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.spritesheet('explosion', 'assets/explosion-flamethrower.png', 512/8, 512/8, 8*8);

        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        preloadEnemySprites(game);
    }

    // TODO: class for global game with one instance named 'world', which holds all data

    // TODO: introduce bombs as super attack

    var world = {
        cursors: null,
        fireButton: null,
        background_rendering: null,
        foreground_rendering: null,

        player: null,
        life: 5,
        gun: null,
        enemies: null,

        pos: 0
    };


    function create() {
        cursors = game.input.keyboard.createCursorKeys();
        world.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);


        world.background_rendering = game.add.graphics(0, 0);
        world.foreground_rendering = game.add.graphics(0, 0);

        [world.player, world.gun] = createPlayerAndGun(game, world);

        // TODO: generate enemies (not directly here, write and call hearts function for that) so that they reside in an inner circular shape
        world.enemies = spawnEnemies(game);

        createHUD(game, world);
    }

    function update() {
        world.foreground_rendering.clear()

        updateHUD(game, world);

        if (cursors.left.isDown) {
            world.pos += 0.003;
            if (world.pos >= 1) world.pos -= 1
        }
        if (cursors.right.isDown) {
            world.pos -= 0.003;
            if (world.pos < 0) world.pos += 1
        }
        if (world.fireButton.isDown) {
            world.gun.fire();
        }

        updatePlayerAndGun(game, world);


        // TODO: check for space and spawn a player shot towards the player


        // console.log(pos)



        // TODO: randomly move, rotate and let the generated enemies shoot
        moveEnemies(game, world);

        // TODO: collision for playershot<->enemy and enemyshot<->player, also spawn awesome explosions on hit and update game state accordingly
    }


})();
