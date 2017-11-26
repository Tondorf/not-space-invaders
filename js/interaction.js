function enemyHit(game, world, bullet, enemy) {
    //  When a bullet hits an alien we kill them both
    bullet.kill();
    enemy.kill();
    world.score += 1;

    // create explosion
    var explosion = world.explosions.getFirstExists(false);
    explosion.reset(enemy.body.x + enemy.width / 2, enemy.body.y + enemy.height / 2); // for some reason this isn't focused on the enemy... :(
    explosion.play('kaboom', 30, false, true);

    // if (aliens.countLiving() == 0)
    // {
    //     enemyBullets.callAll('kill',this);
    //     stateText.text = " You Won, \n Click to restart";
    //     stateText.visible = true;
    //
    //     //the "click to restart" handler
    //     game.input.onTap.addOnce(restart,this);
    // }
}

function ufoHit(game, world, bullet, ufo) {
    //  When a bullet hits an alien we kill them both
    bullet.kill();
    ufo.kill();
    world.score += 10;
    world.life = Math.min(MAXLIFE, world.life+1);

    // create explosion
    var explosion = world.explosions.getFirstExists(false);
    explosion.reset(ufo.body.x + ufo.width / 2, ufo.body.y + ufo.height / 2);
    explosion.play('kaboom', 30, false, true);

    world.ufo.alive = false; // you will be reborn soon
}

function playerHit(game, world, bullet, player) {
    bullet.kill();
    world.life--;
    if (world.life <= 0) {
        game.state.start('finish')
    }
    // ... TODO ...
}
