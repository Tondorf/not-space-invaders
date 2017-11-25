var game = new Phaser.Game(X, Y, Phaser.CANVAS, 'container', startState);

(function () {

    game.state.add('start', startState)
    game.state.add('play', playState)
    // game.state.add('finish', finishState)

})();
