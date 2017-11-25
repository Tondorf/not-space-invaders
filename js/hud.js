
const boxPadding = 15;
const boxWidth = 150;
const boxHeight = 30;
const boxSmoothing = 10;

function createHUD(game, world) {
// draw player movement circle once
    world.background_rendering.lineStyle(10, 0xc0c0c0, 0.15);
    world.background_rendering.drawCircle(game.width/2, game.height/2, 2 * RADIUS);



    world.background_rendering.lineStyle(0, 0, 0);
    world.background_rendering.beginFill(0xc0c0c0, 0.15);
    world.background_rendering.drawRoundedRect(boxPadding, boxPadding, boxWidth, boxHeight, boxSmoothing);
    world.background_rendering.drawRoundedRect(X - boxWidth - boxPadding, boxPadding, boxWidth, boxHeight, boxSmoothing);
    world.background_rendering.drawRoundedRect(boxPadding, Y - boxHeight - boxPadding, boxWidth, boxHeight, boxSmoothing);
    world.background_rendering.drawRoundedRect(X - boxWidth - boxPadding, Y - boxHeight - boxPadding, boxWidth, boxHeight, boxSmoothing)
}

function updateHUD(game, world) {

}