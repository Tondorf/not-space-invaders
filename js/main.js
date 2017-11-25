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
            game.load.image('player', 'assets/player.png', 52, 32);
            game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            game.load.spritesheet('enemy1', 'assets/enemy1.png', 48, 64);
            game.load.spritesheet('enemy2', 'assets/enemy2.png', 48, 64);
            game.load.spritesheet('enemy3', 'assets/enemy3.png', 48, 64);
        }

        // TODO: class for global game with one instance named 'world', which holds all data

        var cursors;
        var player;
        var background_rendering;
        var foreground_rendering;
        var enemies;

        var pos = 0;


        function create() {
            cursors = game.input.keyboard.createCursorKeys();

            // TODO: draw static parts of HUD

            background_rendering = game.add.graphics(0, 0);
            foreground_rendering =  game.add.graphics(0, 0);

            player = game.add.sprite(0, 0, 'player');
            player.scale.setTo(0.5  )
            player.anchor.setTo(0.5, 0.5)

            game.physics.arcade.enable(player)
            console.log("X: " + player.width)

            // TODO: generate enemies (not directly here, write and call a function for that) so that they reside in an inner circular shape
            // The enemies group contains all enemies in the middle
            // enemies = game.add.group();
            // for (e=0; e<20; e++) {
            //     var enemy = enemies.create(midX, midY, 'enemy1');
            //     enemies.push()
            // }

            background_rendering.lineStyle(10, 0xc0c0c0, 0.1);

            // draw player movement circle once
            background_rendering.drawCircle(midX, midY, 2 * RADIUS);
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

            player.x = posToX(pos)
            player.y = posToY(pos)
            player.angle = pos * 360 - 90
            // TODO: check for space and spawn a player shot towards the player

            // console.log(pos)


            // TODO calculate orientation for player sprite so that it looks toward the center

            // TODO: draw real sprite (with calculated orientation)
            // foreground_rendering.clear();
            // foreground_rendering.lineStyle(3, 0xBCA9F5, 1);
            // foreground_rendering.beginFill(0xBCA9F5 , 1);
            // foreground_rendering.drawCircle((midX-RADIUS) + (1+x)*RADIUS, (midY-RADIUS) + (1+y)*RADIUS, 15)

            console.log()

            // TODO: randomly move, rotate and let the generated enemies shoot

            // TODO: collision for playershot<->enemy and enemyshot<->player, also spawn awesome explosions on hit and update game state accordingly
        }

        function posToX(pos) {
            return (midX - RADIUS) + (1 + Math.cos(2 * Math.PI * pos)) * RADIUS
        }

        function posToY(pos) {
            return (midY - RADIUS) + (1 + Math.sin(2 * Math.PI * pos)) * RADIUS
        }
    })();
