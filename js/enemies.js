function preloadEnemySprites(game) {
    game.load.spritesheet('enemy1', 'image/enemy1.png', 32, 32);
    game.load.spritesheet('enemy2', 'image/enemy2.png', 48, 32, 2);
    game.load.spritesheet('enemy3', 'image/enemy3.png', 48, 32, 2);
}

var enemyBoundaryRadius;
var enemyBounds;

function spawnEnemies(game, world) {
    // The enemies group contains all enemies in the middle
    var enemies2spawn = 5 + 2 * world.level;
    world.enemies = game.add.group();
    for (e = 0; e < enemies2spawn; e++) {
        var spawnSquare = 150;
        var x = game.width / 2 + Math.floor(Math.random() * 2 * spawnSquare - spawnSquare);
        var y = game.height / 2 + Math.floor(Math.random() * 2 * spawnSquare - spawnSquare);

        var enemy = world.enemies.create(x, y, 'enemy1', 0);
        enemy.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(enemy);
        // [enemy.body.bounce.x, enemy.body.bounce.y] = [Math.random()*0.5, Math.random()*0.5];

        randomVelocity(enemy);

        // Define Animation and play it endlessly
        enemy.animations.add('idle', [0, 1], 2, true);
        enemy.animations.play('idle');

        // start with random rotation
        enemy.angle = Math.random() * 360;

        // create a shared gun for all enemies, mostly copied over from player gun setup
        enemy.gun = game.add.weapon(5, 'enemyshot');
        enemy.gun.bulletAngleOffset = 90;
        enemy.gun.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        enemy.gun.bulletSpeed = 200;
        enemy.gun.fireRate = 180;
        enemy.gun.trackSprite(enemy, 0, 0);
    }

    enemyBoundaryRadius = RADIUS - 100;
    enemyBounds = Phaser.Circle(midX, midY, enemyBoundaryRadius); // maybe possible to use this for automated arcade collision?
    //enemyBounds.immovable.setTo(true);
}

function moveEnemies(game, world) {
    world.enemies.forEach(function (enemy) {
        if (game.physics.arcade.distanceToXY(enemy, game.width / 2, game.height / 2) > enemyBoundaryRadius) {
            game.physics.arcade.moveToXY(enemy, midX, midY, Math.floor(Math.random() * 100 - 50));
            // if enemy is too far from the center, with 1 percent chance, apply random direction
            if (Math.random() > 0.99) {
                randomVelocity(enemy);
            }
        }
        // rotate by a random amount of degrees
        enemy.angle += Math.random() * 3;
    });
}

function randomVelocity(enemy) {
    enemy.body.velocity.setTo(Math.floor(Math.random() * 100 - 50), Math.floor(Math.random() * 100 - 50));
}

function enemiesShoot(game, world) {
    world.enemies.forEachAlive(function (enemy) {
        if (Math.random() > 1 - ENEMY_FIRE_CHANCE) {
            enemy.gun.fireAngle = -enemy.angle;
            enemy.gun.fire();
        }
    });
}

function allEnemiesDead(game, world) {
    return world.enemies.filter(e => e.alive).list.length === 0
}
