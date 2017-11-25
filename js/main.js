(function () {
    var game = new Phaser.Game(800, 601, Phaser.CANVAS, '', {preload: preload, create: create, update: update});

    function preload() {

        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

    }




    // important value in [0, 1]
    // 0 is left, 0.5 is top, 1 is right, 1.5 is bottom, 2 is left
    var pos = 0.75;

    var radius = 300;
    var x = Math.cos(2 * Math.PI * pos);
    var y = Math.sin(2 * Math.PI * pos);


    console.log("x: " + x + " y: " + y);

    function create() {
        var graphics = game.add.graphics(0, 0);

        graphics.lineStyle(3, 0xc0c0c0, 1);

        // graphics.beginFill(0x000000, 1);
        graphics.drawCircle(radius, radius, radius);

        graphics.lineStyle(3, 0xff0000, 1);
        graphics.beginFill(0xff0000, 1);
        graphics.drawCircle((1 + x) * radius, (1 + y) * radius, 5)
    }

    function update() {


    }
})();
