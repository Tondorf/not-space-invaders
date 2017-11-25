
const boxPadding = 15;
const boxWidth = 150;
const boxHeight = 30;
const boxSmoothing = 10;

var hearts;

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


    hearts = new Array(MAXLIFE).fill(undefined).map((_, i) => game.add.sprite(boxPadding + boxWidth / (MAXLIFE + 1) * (1 + i), Y - boxHeight - boxPadding + boxHeight / 2, 'heart'));
    hearts.map(t => t.scale.set(0.5))
    hearts.map(t => t.anchor.set(0.5, 0.5))
}

function updateHUD(game, world) {

    game.add.text("hi")

    hearts.slice(0, world.life).map(t => t.visible = true)
    hearts.slice(world.life, MAXLIFE).map(t => t.visible = false)


    // console.log(hearts)

    // world.foreground_rendering.add()
}