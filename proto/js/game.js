 window.onload = function() {
        
        // creation du canevas
        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, render:render });
        //le joueur
        var player;
        // position du joueur
        var position = 1; //0 : LEFT, 1 : CENTER, 2 : RIGHT
        // coordonnees du text de debug
        var textPosition;
        // inputs
        var cursors;

        /**
         * Chargement des images
         */ 
        function preload () {
        	game.load.image('field', 'img/background.png');
            game.load.spritesheet('player', 'img/blue_player.png', 150, 150);
        }

        var velocity = 300;
        function create () {

            game.stage.backgroundColor = 0x2d2d2d;
            //ajout de la sprite du terrain
        	//var field = game.add.sprite(0, 0, 'field');

            //creation du personnage du joueur
            player = game.add.sprite(400,225, 'player');
            //ajout des animations
            player.animations.add('run', [ 5, 6, 7, 8, 9, 10 ], 8, true);
            player.animations.add('turnleft', [ 11, 12, 13, 14, 15, 16 ], 8, true);
            player.animations.add('turnright', [ 5, 6, 7, 8, 9, 10 ], 20, true);
            
            player.body.bounce.setTo(2,2);
            player.anchor.setTo(0.5, 0.5);
            
            // lancement de l'animation 'run'
            player.play('run');

            // text pour debug
            textPosition = game.add.text(10, 10, "Position : 1", {
                font: "20px Arial",
                fill: "#ff0044"
            });
            
            // creation d'une variable raccourci (pas vraiment necessaire)
            cursors = game.input.keyboard.createCursorKeys();

            resetCursorListeners();

        }

        /**
         * Binding des actions aux touches associes
         */
        function resetCursorListeners(){
            cursors.left.onDown.add(onLeft, this);
            cursors.right.onDown.add(onRight, this);
        }

        /**
         * Permet d'arreter d'ecouter les input entrant 
         */
        function clearCursorListeners(){
            cursors.left.onDown.removeAll();
            cursors.right.onDown.removeAll();
        }

        /**
         * Action associe au mouvement vers la droite du joueur
         */ 
        function onRight(){
            move('RIGHT');
        }

        /**
         * Action associe au mouvement vers la gauche du joueur
         */ 
        function onLeft(){
            move('LEFT');
        }

        /**
         * Deplacer le joueur dans la direction souhaitée si cela est possible. 
         * On arrete d'ecouter les inputs pendant toute la durée du mouvement.
         */ 
        function move(direction){
            var factor = 0;
            if(direction == 'LEFT' && position != 0)
                factor = -1;
            else if(direction == 'RIGHT' && position != 2)
                factor = 1;

            if(factor != 0){ 
                //on stop l'ecoute des inputs
                clearCursorListeners();
                //on deplace le joueur
                tweenPlayer(factor);
            }
        }

        /**
         * Permet de deplacer le sprite du joueur dans la direction souhaitée.
         * -1 à gauche et 1 à droite en activant l'animation associée.
         * Une fois le mouvement terminé, on met a jour la position du joueur
         * et reactive l'ecoute des inputs et active l'animation 'run'.
         */ 
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

        /**
         * Affichage pour debug
         */ 
        function render() {
            // Sprite debug info
            textPosition.setText("Position : "+position);
            // Je n'arrive pas a faire marcher ce qui suit.
            //game.debug.renderSpriteInfo(player, 150, 150);
            //game.debug.renderLocalTransformInfo(sprite, 32, 160);
            //game.debug.renderWorldTransformInfo(sprite, 32, 290);

        }

    };