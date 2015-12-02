var height = window.innerHeight;
var width = window.innerWidth;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', {
	preload: preload,
	create: create,
	update: update
});

var swallow;
var win;
var monkey;
var map;
var platforms;
var background;
var decoration;
var bananas;
var score = 0;
var scoreText = {};

var jumpTimer = 0;

function preload() {
	game.load.image('bg', 'assets/sky.png');
	game.load.spritesheet('monkey', 'assets/monkey.png', 80, 70);
	game.load.tilemap('level1', 'assets/monkey-puzzle-level1.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('blocks', 'assets/blocks.png');
	game.load.image('banana', 'assets/banana.png');
	game.load.audio('swallow', 'assets/gulp.mp3');
	game.load.audio('win', 'assets/win.mp3');
}

function create() {
	var SPEED = 0;
	var GRAVITY = 1000;

	game.world.setBounds(0, 0, 1024, 2048);

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = GRAVITY;
	game.camera.follow(monkey);
	game.camera.setSize(width, height);

	var cursors = game.input.keyboard.createCursorKeys();
	var bg = game.add.tileSprite(0, 0, this.world.width, this.world.height, 'bg');
	//background.autoScroll(-SPEED, 0);

	map = game.add.tilemap('level1');
	map.addTilesetImage('blocks');
	background = map.createLayer('background');
	decoration = map.createLayer('decoration');
	platforms = map.createLayer('platforms');

	game.physics.arcade.enable('platforms');
	//map.setCollisionByExclusion([], 'Branches');
	map.setCollisionByExclusion([], true, platforms);
	//  This resizes the game world to match the layer dimensions
	//platforms.resizeWorld();

	//game.map = this.game.add.tilemap('level1');

	monkey = game.add.sprite(0, game.world.height - 200, 'monkey');
	game.physics.arcade.enableBody(monkey);
	monkey.body.bounce.y = 0.2;
	monkey.body.collideWorldBounds = true;

	monkey.animations.add('idle', [0], 5, true);
	monkey.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 16, true);
	monkey.animations.play('idle');
	monkey.anchor.setTo(.5, 0);
	monkey.scale.x = -1;
	game.camera.follow(monkey);
	monkey.body.checkCollision.up = false;
	monkey.body.checkCollision.left = false;
	monkey.body.checkCollision.right = false; //game.physics.arcade.collide(monkey, layer);


	bananas = game.add.group();
	bananas.enableBody = true;
	for (var i = 0; i < 30; i++) {
		//  Create a star inside of the 'stars' group
		var banana = bananas.create(Math.random() * 1024, Math.random() * 1600 + 200, 'banana');
	}
	swallow = game.add.audio('swallow');
	win = game.add.audio('win');
}

function update() {
	game.physics.arcade.collide(monkey, platforms);
	game.physics.arcade.collide(bananas, platforms);

	game.physics.arcade.overlap(monkey, bananas, collectBanana, null, this);

	cursors = game.input.keyboard.createCursorKeys();
	jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	monkey.body.velocity.x = 0;
	if (cursors.left.isDown) {
		monkey.scale.x = 1;
		monkey.body.velocity.x = -200;
		monkey.animations.play('walk');
	} else if (cursors.right.isDown) {
		monkey.scale.x = -1;
		monkey.body.velocity.x = 200;
		monkey.animations.play('walk');
	} else {
		monkey.body.velocity.x = 0;
		monkey.animations.play('idle');
	}
	//  Allow the player to jump if they are touching the ground.
	if (jumpButton.isDown && game.time.now > jumpTimer && monkey.body.onFloor()) {
		//map.setCollisionByExclusion([]);
		monkey.body.velocity.y = -600;
		jumpTimer = game.time.now + 650;
	}

}

function collectBanana(monkey, banana) {

	// Removes the star from the screen
	banana.kill();

	//  Add and update the score
	score += 10;
	scoreText.text = 'Score: ' + score;
	console.log(scoreText.text);
	swallow.play();
	if (score == 300) {
		win.play();
	}
}
