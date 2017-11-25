function enemyHit (game, world, bullet, enemy) {
    //  When a bullet hits an alien we kill them both
    bullet.kill();
    enemy.kill();
    world.score += 1

    // TODO: Increase score

    // create explosion
    var explosion = world.explosions.getFirstExists(false);
    explosion.reset(enemy.body.x+enemy.width/2, enemy.body.y+enemy.height/2); // for some reason this isn't focused on the enemy... :(
    explosion.play('explosion', 30, false, true);

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

function playerHit (game, world, bullet, player) {
    bullet.kill();
    world.life--;
    if (world.life <= 0) {

    }
    // ... TODO ...
}
