(function () {
    var game = new Phaser.Game(800, 601, Phaser.CANVAS, 'body', {preload: preload, create: create, update: update});

    function preload() {

        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    }

    // important value in [0, 1]
    var radius = 300;
    var value = 0.5;
    var x = value * radius;
    var y = 1 - value * value

    function create() {
        var graphics = game.add.graphics(0, 0);

        graphics.lineStyle(3, 0xc0c0c0, 1);

        // graphics.beginFill(0x000000, 1);
        graphics.drawCircle(radius, radius, radius);

        graphics.lineStyle(3, 0xff0000, 1);
        graphics.beginFill(0xff0000, 1);
        graphics.drawCircle(0,300, 5)
    }

    function update() {


    }
})();
