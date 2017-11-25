// Globals
const X = 1200;
const Y = 800;
const midX = X / 2;
const midY = Y / 2;
const RADIUS = Y / 2 - 50;
const MAXLIFE = 5;
const ENEMY_FIRE_CHANCE = 0.005; // [0..1]

function posToX(pos) {
    return (midX - RADIUS) + (1 + Math.cos(2 * Math.PI * pos)) * RADIUS
}

function posToY(pos) {
    return (midY - RADIUS) + (1 + Math.sin(2 * Math.PI * pos)) * RADIUS
}

function spawnExplosion(game, world, opfer) {

}
