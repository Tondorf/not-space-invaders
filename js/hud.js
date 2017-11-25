
const boxPadding = 15;
const boxWidth = 150;
const boxHeight = 30;
const boxSmoothing = 10;

function createHUD(background_rendering) {
// draw player movement circle once
    background_rendering.lineStyle(10, 0xc0c0c0, 0.15);
    background_rendering.drawCircle(midX, midY, 2 * RADIUS);




    background_rendering.lineStyle(0, 0, 0);
    background_rendering.beginFill(0xc0c0c0, 0.15);
    background_rendering.drawRoundedRect(boxPadding, boxPadding, boxWidth, boxHeight, boxSmoothing);
    background_rendering.drawRoundedRect(X - boxWidth - boxPadding, boxPadding, boxWidth, boxHeight, boxSmoothing);
    background_rendering.drawRoundedRect(boxPadding, Y - boxHeight - boxPadding, boxWidth, boxHeight, boxSmoothing);
    background_rendering.drawRoundedRect(X - boxWidth - boxPadding, Y - boxHeight - boxPadding, boxWidth, boxHeight, boxSmoothing)
}

function updateHUD(background_rendering) {

}