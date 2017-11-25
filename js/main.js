(function () {

    // Game
    var game = new Phaser.Game(X, Y, Phaser.CANVAS, 'container', {preload: preload, create: create, update: update});

    // var finish = new Phaser.Game(X, Y, Phaser.AUTO, 'container', {preload: {}, create: {}, update: {}});

    var cursors;
    var pauseKey;
    var fireKey;



    function preload() {
        game.load.image('player', 'image/player.png');
        game.load.image('heart', 'image/heart.png');
        game.load.image('bullet', 'image/bullet.png');
        game.load.image('enemyshot', 'image/enemyshot.png');
        game.load.spritesheet('kaboom', 'image/kaboom.png', 128, 128, 16);

        game.load.spritesheet('dude', 'image/dude.png', 32, 48);
        preloadEnemySprites(game);

        game.paused = false
    }

    // TODO: introduce bombs as super attack

    var world = {
        cursors: null,
        background_rendering: null,
        foreground_rendering: null,

        player: null,
        level: 1,
        score: 0,
        life: 5,
        gun: null,
        enemies: null,
        explosions: null,

        pos: 0.25
    };


    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.desiredFps = 60;
        game.stage.backgroundColor = "#101010";

        cursors = game.input.keyboard.createCursorKeys();
        fireKey = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        pauseKey = this.input.keyboard.addKey(Phaser.KeyCode.P);
        pauseKey.onDown.add(function () {
            game.paused = !game.paused
        }, this)

        world.background_rendering = game.add.graphics(0, 0);
        world.foreground_rendering = game.add.graphics(0, 0);

        [world.player, world.gun] = createPlayerAndGun(game, world);

        world.explosions = game.add.group();
        world.explosions.createMultiple(42, 'kaboom');
        world.explosions.forEach(function setupInvader(explos) {
            explos.scale.setTo(0.5, 0.5);
            explos.anchor.setTo(0.5, 0.5);
            explos.animations.add('kaboom');
        }, this);

        spawnEnemies(game, world, 3);


        createHUD(game, world);
    }

    function update() {
        // if (gam)
        world.foreground_rendering.clear();
        // console.log(world.enemies.length)

        if (allEnemiesDead(game, world)) {
            world.level += 1
            spawnEnemies(game, world, 5 + 2 * world.level);
        }

        updateHUD(game, world);

        if (cursors.left.isDown) {
            world.pos += 0.003;
            if (world.pos >= 1) world.pos -= 1
        }
        if (cursors.right.isDown) {
            world.pos -= 0.003;
            if (world.pos < 0) world.pos += 1
        }
        if (fireKey.isDown) {
            world.gun.fire();
        }

        updatePlayerAndGun(game, world);

        // TODO: check for space and spawn a player shot towards the player

        // console.log(pos)
        moveEnemies(game, world);
        enemiesShoot(game, world);
        //world.enemies = world.enemies.filter(function (x) { return x.alive; });

        // TODO: collision for playershot<->enemy and enemyshot<->player, also spawn awesome explosions on hit and update game state accordingly
        //  Run collision
        game.physics.arcade.overlap(world.gun.bullets, world.enemies, (b, e) => {
            enemyHit(game, world, b, e);
        }, null, this);
        //game.physics.arcade.overlap(world.gun.bullets, world.ufos, ufoHit, null, this); // TODO: ufos
        world.enemies.forEachAlive(function (enemy) {
            game.physics.arcade.overlap(enemy.gun.bullets, world.player, (b, p) => {
                playerHit(game, world, p, b);
            }, null, this);
        })

    }

})();
