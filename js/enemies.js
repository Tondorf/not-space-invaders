
function initEnemySprites(game) {
    game.load.spritesheet('enemy1', 'assets/enemy1.png', 32, 32);
    game.load.spritesheet('enemy2', 'assets/enemy2.png', 48, 32, 2);
    game.load.spritesheet('enemy3', 'assets/enemy3.png', 48, 32, 2);
}

var enemyBoundary;

function spawnEnemies(game) {
    // The enemies group contains all enemies in the middle
    enemies = game.add.group();
    for (e = 0; e < 50; e++) {
        var spawnSquare = 150;
        var x = game.width/2 + Math.floor(Math.random()*2*spawnSquare-spawnSquare);
        var y = game.height/2 + Math.floor(Math.random()*2*spawnSquare-spawnSquare);

        var enemy = enemies.create(x, y, 'enemy1', 0);
        enemy.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(enemy);
        enemy.body.bounce.x = Math.random()*0.5;
        enemy.body.bounce.y = Math.random()*0.5;
        enemy.body.velocity.x = Math.floor(Math.random()*100-50);
        enemy.body.velocity.y = Math.floor(Math.random()*100-50);

        // Define Animation and play it endlessly
        enemy.animations.add('idle', [0, 1], 2, true);
        enemy.animations.play('idle');
    }

    enemyBoundary = 200;

    return enemies
}

function moveEnemies(game, enemies) {
    enemies.forEach(function (enemy) {
        if (game.physics.arcade.distanceToXY(enemy, game.width/2, game.height/2) > enemyBoundary) {
            enemy.body.velocity.x = Math.floor(Math.random()*100-50);
            enemy.body.velocity.y = Math.floor(Math.random()*100-50);
        }
    });
}
