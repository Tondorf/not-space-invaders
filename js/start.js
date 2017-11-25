
var startState = {
    create: function () {
        var title = game.add.text(game.world.centerX, 150, "- not space invaders -");

        //  Centers the text
        title.anchor.set(0.5, 0);

        //  Our font + size
        title.font = 'Arial';
        title.fontWeight = 'bold';
        title.fontSize = 70;

        //  Here we create a linear gradient on the Text context.
        //  This uses the exact same method of creating a gradient as you do on a normal Canvas context.
        var grd = title.context.createLinearGradient(0, 0, 0, title.height);

        //  Add in 2 color stops
        grd.addColorStop(0, '#8ED6FF');
        grd.addColorStop(1, '#004CB3');

        //  And apply to the Text
        title.fill = grd;



        var strings = ["Start with Enter", "Move with arrows", "Shoot with Space", "Pause with P"]
        strings.forEach((s, i) => {
            var help = game.add.text(game.world.centerX, 350 + i * 80, s)
            help.anchor.set(0.5, 0);

            help.font = 'Arial';
            help.fontSize = 36;
            help.fill = '#ffffff'
        })





        // console.log("wtf")



        var startKey = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        startKey.onDown.add(function () {
            game.state.start('play')
        }, this)
    }
};