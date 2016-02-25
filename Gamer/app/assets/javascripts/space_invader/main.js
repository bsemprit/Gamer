$(document).on("ready", function(){
	console.log("Getting started")

	main();




//Main variables

var screen, input, adSprites, meSprite;
var alienAds, frames, spriteFrames, changeFrames;
var dir, shooter, bullet, bullets, bulletsAlien;
var isGameOver = false;


//Functions needed to start the game

function main() {
	console.log("MAIN");
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
		console.log("ALIENS IMAGES");
		ready();
	})

	meSpriteImage.addEventListener("load", function(){
		console.log("ME IMAGE");
		meSprite = new Sprite(this, 0, 0, 13, 22)
		ready();
	})

	var readyCount = 0;

	function ready () {
		readyCount += 1;

		if (readyCount >= 2) {
			initialize();
			run();
		}
	}
};

function initialize(){
	console.log("INITIALIZE");
	frames = 0;
	// spriteFrames = 0;
	changeFrames = 60;
	dir = 1;

	alienAds = [];
	var rows = [0,1,2];

	bullets = [];
	bulletsAlien = [];

	shooter = {
		sprite: meSprite,
		x: (screen.width - meSprite.width)/ 2,
		y: screen.height - (30 + meSprite.height)
	};
	

	for(var i = 0; i < rows.length - 1	; i++) {
		console.log("ROWS LOOP");
		for(var j = 0; j < 3; j++) {
			console.log("INDIVIDUAL LOOP");
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
	var paintScene = function(){
		console.log("PAINTIN");

		if (isGameOver === true){
			console.log("GAME OVA");
			return;
		}

		console.log("CONTINUING WITH GAME!!!");

		window.requestAnimationFrame(paintScene, screen.canvas);

		update();
		render();
	};

	paintScene();
};

function update(){
	console.log("UPDATE");
	//Shooter
	if (input.isDown(37)) {
		//Left key is pressed
		shooter.x -= 4;
	} else if (input.isDown(39)) {
		//Right key is pressed
		shooter.x += 4;
	}
	var maxPossibleShooterMove = screen.width - (30 + meSprite.width);
	shooter.x = Math.max(Math.min(shooter.x, maxPossibleShooterMove), 30);

	//Bullets
	if(input.isPressed(32)){
		//spacebar or up arrow
		console.log("New Bullet")
		bullets.push(new Bullet(shooter.x, shooter.y, -10, 2, 6, "#fff"))
	}

	var deadBullets = [];
	var deadAliens = [];

	for(var i = 0, len = bullets.length; i < len; i++){
		console.log("BULLER LLOOOOPPPPPPPP");
		var b = bullets[i]
		b.update();
		if (b.y + b.height < 0 || b.y > screen.height){
			deadBullets.push(i);
		}

		for(var k = 0, alienl = alienAds.length; k < alienl; k++){
			console.log("HE GOT SHOT");
			var possiblyHitAlien = alienAds[k];
			if(Intersect(possiblyHitAlien.x, possiblyHitAlien.y, possiblyHitAlien.width, possiblyHitAlien.height, b.x, b.y, b.width, b.height)) {
				console.log(k, "---", i)
				deadAliens.push(k);
				deadBullets.push(i);
			}

		}

		removeIndexes(alienAds, deadAliens);
		removeIndexes(bullets, deadBullets);

		}
		for(var j = 0, len = bulletsAlien.length; j <len; j++) {
			console.log("Check if HIT")
			var alienBullet = bulletsAlien[j]
		if(Intersect(alienBullet.x, alienBullet.y, alienBullet.width, alienBullet.height, meSprite.x, meSprite.y, meSprite.width, meSprite.height)){
			console.log("Me HIT")
			endGame();
		}
	}

	//random alien shooting
	if(Math.random() < .05 && alienAds.length > 0) {
		var randomAlien = Math.floor(Math.random()*alienAds.length -1)

		for(var i = 0, len = alienAds.length; i< len; i++){
			console.log("shoot maybe?>>>>??????");
			var oneAlien = alienAds[i]
			if (randomAlien === i){
				console.log("random bullet");
				randomAlien = oneAlien;
			}
		}
		bulletsAlien.push(new Bullet(randomAlien.x + randomAlien.w*0.5, randomAlien.y + randomAlien.h, 4, 2, 4, "blue")) 
	}




	//frames and alien movement update
	frames ++;
	if (frames % changeFrames === 0){

	var maxPosition = 0, minPosition = screen.width;
		for(var i = 0; i < alienAds.length; i++){
			console.log("MOVEMENT LOOPPPPp");
			var movAlien = alienAds[i];
			movAlien.x +=160 * dir;
			// console.log(maxPosition);
			var alienPositionSide = movAlien.x + movAlien.w;
			var alienPositionHeight = movAlien.y + movAlien.h;
			// console.log(movAlien.w)
			maxPosition = Math.max(maxPosition, alienPositionSide);
			minPosition = Math.min(minPosition, movAlien.x);
			// console.log(maxPosition);
			maxHeight = Math.max(alienPositionHeight);
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

		if(maxHeight > screen.height) {
			console.log("Game Over")
			console.log(screen.height, " ---", maxHeight)
			screen.clear();
			endGame();
		}
	}

};

function render(){
	console.log("RENDER");
	screen.clear();
	for(var i = 0; i < alienAds.length; i++){
		console.log("RENDER LOOP");
		var nextAlien = alienAds[i];
		screen.drawSprite(nextAlien.sprite, nextAlien.x, nextAlien.y)
	}

	screen.ctx.save();
	for(var i = 0; i < bullets.length; i++){
		console.log("BULLER RENDER");
		screen.drawBullet(bullets[i]);
	}
	screen.ctx.restore();

	screen.drawSprite(shooter.sprite, shooter.x, shooter.y);
};


function removeIndexes (list, deadIndexes) {
	console.log("Remove alien and bullet")
	//This is the change of possible index of dead things
	var removedSoFar = 0;

	//This removes the dead bullet/alienAd from the list
	deadIndexes.forEach(function(index){
		//Subtracts the change when deleted
		var newIndex = index - removedSoFar;
		list.splice(newIndex, 1);
		//IMPORTANT!!! Adds to the change index
		removedSoFar +=1;
	})
	console.log(list);
	console.log(deadIndexes);
}


function endGame(){
	screen.clear();
	isGameOver = true;
}

})