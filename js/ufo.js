
function createUfo(game, world) {
    world.ufo = game.add.sprite(-1000, -1000, 'ufo');
    world.ufo.anchor.setTo(0.5, 0.5);
    world.ufo.scale.setTo(SCALE);
    game.physics.arcade.enable(world.ufo);
    world.ufo.alive = false;
}

function resetUfo(game, world) {
    var x = game.width / 2;
    var y = -100;
    world.ufo.reset(x, y);
    world.ufo.approaching = true;
    world.ufo.rad = Y/2 + 100;
    world.ufo.pos = 3/4;
}

function moveUfo(game, world) {
    var ufo = world.ufo

    if (ufo == null || !ufo.alive) {
        return;
    }

    if (ufo.approaching) {
        ufo.rad -= 1;
        if (ufo.rad <= RADIUS + 50) {
            ufo.approaching = false;
        }
    } else {
        ufo.pos += 0.001;
    }

    ufo.x = posToX(ufo.pos, ufo.rad);
    ufo.y = posToY(ufo.pos, ufo.rad);
    ufo.angle = ufo.pos * 360 + 90;

}
