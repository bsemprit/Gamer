$(document).on("ready", function(){
	console.log("Getting started")

	main();




//Main variables

var screen, input, adSprites, meSprite;
var alienAds, frames, spriteFrames, changeFrames;
var dir, shooter, bullets;


//Functions needed to start the game

function main() {
	screen = new Screen(900, 600);
	input = new PressedKeyHandeler();

	var meSpriteImage = new Image();
	meSpriteImage.src = "/assets/nurek.png"
	var alien = new Image();
	alien.src = "/assets/UFOs.png"

	alien.addEventListener("load", function(){
		adSprites = [
			[new Sprite(alien, 0, 0, 150, 75)],
			[new Sprite(alien, 170, 0, 150, 75)],
			[new Sprite(alien, 0, 110, 150, 75)]
		];
		console.log("Trying to add images");
		initialize();
		run();
	})

	meSpriteImage.addEventListener("load", function(){
		meSprite = new Sprite(this, 0, 0, 13, 22)
		initialize();
		run();
	})
};

function initialize(){
	frames = 0;
	// spriteFrames = 0;
	changeFrames = 60;
	dir = 1;

	alienAds = [];
	var rows = [0,1,2];

	bullets = [];

	shooter = {
		sprite: meSprite,
		x: (screen.width - meSprite.width)/ 2,
		y: screen.height - (30 + meSprite.height)
	};
	

	for(var i = 0; i < rows.length - 1	; i++) {
		for(var j = 0; j < 3; j++) {
			var whichRow = rows[i];
			alienAds.push({
				sprite: adSprites[whichRow][0],
				x: 40 + j*150,
				y: 40 + i*75,
				w: adSprites[whichRow][0].width,
				h: adSprites[whichRow][0].height
			})
		}
	}
};

function run(){
	var loop = function(){
		update();
		render();

		window.requestAnimationFrame(loop, screen.canvas);
	}
	window.requestAnimationFrame(loop, screen.canvas);

};

function update(){

	if (input.isDown(37)) {
		//Left key is pressed
		shooter.x -= 4;
	} else if (input.isDown(39)) {
		//Right key is pressed
		shooter.x += 4;
	}
	var maxPossibleShooterMove = screen.width - (30 + meSprite.width);
	shooter.x = Math.max(Math.min(shooter.x, maxPossibleShooterMove), 30);

	if(input.isPressed(32) || input.isPressed(38)){
		//spacebar or up arrow
		bullets.push(new Bullet(shooter.x, shooter.y, -10, 2, 6, "#fff"))
	}

	for(var i = 0; i < bullets.length; i++){
		bullets[i].update();
	}


	frames ++;
	if (frames % changeFrames === 0){

	var maxPosition = 0, minPosition = screen.width;
		for(var i = 0; i < alienAds.length; i++){
			var movAlien = alienAds[i];
			movAlien.x +=160 * dir;
			// console.log(maxPosition);
			var alienPosition = movAlien.x + movAlien.w;
			// console.log(movAlien.w)
			maxPosition = Math.max(maxPosition, alienPosition);
			minPosition = Math.min(minPosition, movAlien.x);
			// console.log(maxPosition);
		}

		if(maxPosition > screen.width || minPosition < 0){
			console.log("Down!!")
			dir *= -1;
			for(var i = 0; i < alienAds.length; i++){
				var movAlien = alienAds[i];
				movAlien.x +=160 * dir;
				movAlien.y +=100; 
			}
		}

	}

};

function render(){
	screen.clear();
	for(var i = 0; i < alienAds.length; i++){
		var nextAlien = alienAds[i];
		screen.drawSprite(nextAlien.sprite, nextAlien.x, nextAlien.y)
	}

	screen.ctx.save();
	for(var i = 0; i < bullets.length; i++){
		screen.drawBullet(bullets[i]);
	}
	screen.ctx.restore();

	screen.drawSprite(shooter.sprite, shooter.x, shooter.y);
};

})