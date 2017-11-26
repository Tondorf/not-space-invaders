
// Control globals
var cursors;
var pauseKey;
var fireKey;

var world;

var playState = {
    // var finish = new Phaser.Game(X, Y, Phaser.AUTO, 'container', {preload: {}, create: {}, update: {}});


    preload: function () {
        game.load.image('player', 'image/player.png');
        game.load.image('heart', 'image/heart.png');
        game.load.image('bullet', 'image/bullet.png');
        game.load.image('enemyshot', 'image/enemyshot.png');
        game.load.spritesheet('kaboom', 'image/kaboom.png', 128, 128, 16);

        game.load.spritesheet('dude', 'image/dude.png', 32, 48);
        preloadEnemySprites(game);
        game.load.image('ufo', 'image/ufo.png');

        game.paused = false

        world = {
            background_rendering: null,
            foreground_rendering: null,

            player: null,
            level: 1,
            score: 0,
            life: MAXLIFE,
            gun: null,
            enemies: null,
            ufo: null,
            explosions: null,

            pos: 0.25
        };
    },

    // TODO: introduce bombs as super attack


    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.desiredFps = 60;
        game.stage.backgroundColor = "#101010";

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

        spawnEnemies(game, world);

        createHUD(game, world);


        // overlays
        var pauseOverlay = game.add.graphics()
        pauseOverlay.beginFill(0x000000)
        pauseOverlay.drawRect(0, 0, game.width, game.height)
        pauseOverlay.fill = "#000000"
        pauseOverlay.alpha = 0.8
        pauseOverlay.visible = false

        var pauseLabel = game.add.text(game.world.centerX, game.world.centerY, "Paused", {fill: "#ffffff"})
        pauseLabel.anchor.set(0.5, 0.5)
        pauseLabel.visible = false

        cursors = game.input.keyboard.createCursorKeys();
        fireKey = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        pauseKey = this.input.keyboard.addKey(Phaser.KeyCode.P);
        pauseKey.onDown.add(function () {
            game.paused = !game.paused
            pauseOverlay.visible = game.paused
            pauseLabel.visible = game.paused
        }, this)


    },

    update: function () {
        // if (gam)
        world.foreground_rendering.clear();


        if (allEnemiesDead(game, world)) {
            world.level += 1;
            spawnEnemies(game, world);
        }

        if (world.ufo === null && Math.random() > 1-UFO_SPAWN_CHANCE) {
            world.ufo = spawnUfo(game, world);
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

        moveUfo(game, world);

        // TODO: collision for playershot<->enemy and enemyshot<->player, also spawn awesome explosions on hit and update game state accordingly
        //  Run collision
        game.physics.arcade.overlap(world.gun.bullets, world.enemies, (b, e) => {
            enemyHit(game, world, b, e);
        }, null, this);

        game.physics.arcade.overlap(world.gun.bullets, world.ufo, (bullet, ufo) => {
            ufoHit(game, world, bullet, ufo);
        }, null, this);

        //game.physics.arcade.overlap(world.gun.bullets, world.ufos, ufoHit, null, this); // TODO: ufos
        world.enemies.forEachAlive(function (enemy) {
            game.physics.arcade.overlap(enemy.gun.bullets, world.player, (b, p) => {
                playerHit(game, world, p, b);
            }, null, this);
        })

    }
};