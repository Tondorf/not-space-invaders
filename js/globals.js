// Globals
const X = 1200;
const Y = 800;
const midX = X / 2;
const midY = Y / 2;
const RADIUS = Y / 2 - 75;
const MAXLIFE = 3;
const ENEMY_FIRE_CHANCE = 0.005; // [0..1]
const UFO_SPAWN_CHANCE = 0.005; // [0..1]
const SCALE = 1;

function posToX(pos, rad=RADIUS) {
    return (midX - rad) + (1 + Math.cos(2 * Math.PI * pos)) * rad
}

function posToY(pos, rad=RADIUS) {
    return (midY - rad) + (1 + Math.sin(2 * Math.PI * pos)) * rad
}

function rnd_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
