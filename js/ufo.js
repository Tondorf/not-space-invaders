
function spawnUfo(game, world) {
    var x = game.width / 2;
    var y = -100;
    var ufo = game.add.sprite(x, y, 'ufo');
    ufo.anchor.setTo(0.5, 0.5);
    ufo.scale.setTo(SCALE);
    game.physics.arcade.enable(ufo);

    ufo.approaching = true;
    ufo.rad = Y/2 + 100;
    ufo.pos = 3/4;

    return ufo
}

function moveUfo(game, world) {
    var ufo = world.ufo

    if (ufo == null) {
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
