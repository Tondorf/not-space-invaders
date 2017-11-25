
const boxPadding = 15;
const boxWidth = 150;
const boxHeight = 30;
const boxSmoothing = 10;

var hearts;
var currentLife = 4;

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

    hearts = new Array(LIFE).fill(undefined).map((_, i) => game.add.sprite(boxPadding + boxWidth / (LIFE + 1) * (1 + i), boxPadding + boxHeight / 2, 'heart'));
    hearts.map(t => t.scale.set(0.5))
    hearts.map(t => t.anchor.set(0.5, 0.5))
}

function updateHUD(game, world) {

    hearts.slice(0, currentLife).map(t => t.visible = true)
    hearts.slice(currentLife, LIFE).map(t => t.visible = false)


    // console.log(hearts)

    // world.foreground_rendering.add()
}