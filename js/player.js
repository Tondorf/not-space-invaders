function createPlayerAndGun(game, world) {

    var player = game.add.sprite(0, 0, 'player');
    player.scale.setTo(SCALE);
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);

    //  Creates 30 bullets, using the 'bullet' graphic
    var gun = game.add.weapon(10, 'bullet');
    gun.bulletAngleOffset = 90;

    //  The bullet will be automatically killed when it leaves the world bounds
    gun.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  Because our bullet is drawn facing up, we need to offset its rotation:

    //  The speed at which the bullet is fired
    gun.bulletSpeed = 600;
    gun.fireRate = 600;
    // weapon.bulletSpeedVariance = 200;
    gun.trackSprite(player, 0, 0);

    return [player, gun];
}

function updatePlayerAndGun(game, world) {
    world.player.x = posToX(world.pos, rad=RADIUS);
    world.player.y = posToY(world.pos, rad=RADIUS);
    world.player.angle = world.pos * 360 - 90;

    world.gun.fireAngle = world.pos * 360 - 180;
    // console.log("angle: " + weapon.bulletAngleOffset)

}
