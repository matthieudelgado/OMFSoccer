 window.onload = function() {

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, render:render });
        var player;
        var position = 1; //0 : LEFT, 1 : CENTER, 2 : RIGHT 
        var textPosition;
        var cursors;

        function preload () {
        	game.load.image('field', 'img/background.png');
            game.load.spritesheet('player', 'img/blue_player.png', 150, 150);
        }

        var velocity = 300;
        function create () {

            game.stage.backgroundColor = 0x2d2d2d;

        	//var field = game.add.sprite(0, 0, 'field');

            player = game.add.sprite(400,225, 'player');
            player.animations.add('run', [ 5, 6, 7, 8, 9, 10 ], 8, true);
            player.animations.add('turnleft', [ 11, 12, 13, 14, 15, 16 ], 8, true);
            player.animations.add('turnright', [ 5, 6, 7, 8, 9, 10 ], 20, true);
            player.body.bounce.setTo(2,2);
            player.anchor.setTo(0.5, 0.5);
            player.play('run');

            textPosition = game.add.text(10, 10, "Position : 1", {
                font: "20px Arial",
                fill: "#ff0044"
            });

            cursors = game.input.keyboard.createCursorKeys();

            resetCursorListeners();

        }

        function resetCursorListeners(){
            cursors.left.onDown.add(onLeft, this);
            cursors.right.onDown.add(onRight, this);
        }

        function clearCursorListeners(){
            cursors.left.onDown.removeAll();
            cursors.right.onDown.removeAll();
        }

        function onRight(){
            move('RIGHT');
        }

        function onLeft(){
            move('LEFT');
        }

        function move(direction){
            var factor = 0;
            if(direction == 'LEFT' && position != 0)
                factor = -1;
            else if(direction == 'RIGHT' && position != 2)
                factor = 1;

            if(factor != 0){ 
                clearCursorListeners();
                tweenPlayer(factor);
            }
        }

        function tweenPlayer(direction){
            if(direction*direction != 1) return;
            var animation = direction == -1 ? 'turnleft' : 'turnright';
            player.play(animation);
            game.add.tween(player)
                    .to({ x: player.x + (direction * 250) }, 500, Phaser.Easing.Linear.None, true)
                    .onComplete.add(function(){
                                    position += direction;
                                    resetCursorListeners();
                                    player.play('run');
                                }, this);
        }

        function render() {
            // Sprite debug info
            game.debug.renderSpriteInfo(player, 150, 150);
            //game.debug.renderLocalTransformInfo(sprite, 32, 160);
            //game.debug.renderWorldTransformInfo(sprite, 32, 290);
            textPosition.setText("Position : "+position);

        }

    };