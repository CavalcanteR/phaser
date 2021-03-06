/// <reference path="../../_definitions.ts" />
/**
* Phaser - PauseScreen
*
* The PauseScreen is displayed whenever the game loses focus or the player switches to another browser tab.
*/
var Phaser;
(function (Phaser) {
    var PauseScreen = (function () {
        /**
        * PauseScreen constructor
        * Create a new <code>PauseScreen</code> with specific width and height.
        *
        * @param width {number} Screen canvas width.
        * @param height {number} Screen canvas height.
        */
        function PauseScreen(game, width, height) {
            this.game = game;
            this._canvas = document.createElement('canvas');
            this._canvas.width = width;
            this._canvas.height = height;
            this._context = this._canvas.getContext('2d');
        }
        PauseScreen.prototype.onPaused = /**
        * Called when the game enters pause mode.
        */
        function () {
            //  Take a grab of the current canvas to our temporary one
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
            this._context.drawImage(this.game.stage.canvas, 0, 0);
            this._color = {
                r: 255,
                g: 255,
                b: 255
            };
            this.fadeOut();
        };
        PauseScreen.prototype.onResume = /**
        * Called when the game resume from pause mode.
        */
        function () {
            this._fade.stop();
            this.game.tweens.remove(this._fade);
        };
        PauseScreen.prototype.update = /**
        * Update background color.
        */
        function () {
            this._color.r = Math.round(this._color.r);
            this._color.g = Math.round(this._color.g);
            this._color.b = Math.round(this._color.b);
        };
        PauseScreen.prototype.render = /**
        * Render PauseScreen.
        */
        function () {
            this.game.stage.context.drawImage(this._canvas, 0, 0);
            this.game.stage.context.fillStyle = 'rgba(0, 0, 0, 0.4)';
            this.game.stage.context.fillRect(0, 0, this.game.stage.width, this.game.stage.height);
            //  Draw a 'play' arrow
            var arrowWidth = Math.round(this.game.stage.width / 2);
            var arrowHeight = Math.round(this.game.stage.height / 2);
            var sx = this.game.stage.centerX - arrowWidth / 2;
            var sy = this.game.stage.centerY - arrowHeight / 2;
            this.game.stage.context.beginPath();
            this.game.stage.context.moveTo(sx, sy);
            this.game.stage.context.lineTo(sx, sy + arrowHeight);
            this.game.stage.context.lineTo(sx + arrowWidth, this.game.stage.centerY);
            this.game.stage.context.fillStyle = 'rgba(' + this._color.r + ', ' + this._color.g + ', ' + this._color.b + ', 0.8)';
            this.game.stage.context.fill();
            this.game.stage.context.closePath();
        };
        PauseScreen.prototype.fadeOut = /**
        * Start fadeOut effect.
        */
        function () {
            this._fade = this.game.add.tween(this._color);
            this._fade.to({
                r: 50,
                g: 50,
                b: 50
            }, 1000, Phaser.Easing.Linear.None);
            this._fade.onComplete.add(this.fadeIn, this);
            this._fade.start();
        };
        PauseScreen.prototype.fadeIn = /**
        * Start fadeIn effect.
        */
        function () {
            this._fade = this.game.add.tween(this._color);
            this._fade.to({
                r: 255,
                g: 255,
                b: 255
            }, 1000, Phaser.Easing.Linear.None);
            this._fade.onComplete.add(this.fadeOut, this);
            this._fade.start();
        };
        return PauseScreen;
    })();
    Phaser.PauseScreen = PauseScreen;    
})(Phaser || (Phaser = {}));
