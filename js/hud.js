
const fontStyle = { font: "20px", fill: "#ff0044" };

const boxPadding = 16;
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

    var level = game.add.text(boxPadding + boxWidth / 2, boxPadding + boxHeight/2 + 3, "Level " + world.level, {fill: "#c0c0c0"}) // no idea why +3 is needed
    level.anchor.set(0.5, 0.5);

    var score = game.add.text(X - boxWidth - boxPadding + boxWidth / 2, boxPadding + boxHeight/2 + 3, "Score " + world.score, {fill: "#c0c0c0"}) // no idea why +3 is needed
    score.anchor.set(0.5, 0.5);


    hearts.slice(0, world.life).map(t => t.visible = true)
    hearts.slice(world.life, MAXLIFE).map(t => t.visible = false)


    // console.log(hearts)

    // world.foreground_rendering.add()
}