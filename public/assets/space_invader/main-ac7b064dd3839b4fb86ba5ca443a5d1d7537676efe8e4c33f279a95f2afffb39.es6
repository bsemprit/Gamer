$(document).on("page:change", function(){
	console.log("Getting started")

	$('.slider').slider();


$("#Space").on("click", function(event){
	event.preventDefault();
	$(event.currentTarget).empty();
	main();
	
})




//Main variables

var screen, input, adSprites, meSprite, deadBullets, deadAliens, maxHeight;
var alienAds, frames, spriteFrames, changeFrames;
var dir, shooter, bullet, bullets, bulletsAlien, deadAlienBullets;
var isGameOver = false;
var points = 0;

//Functions needed to start the game

function main() {
	screen = new Screen(1200, 600);
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
		// console.log("ALIENS IMAGES");
		ready();
	})

	meSpriteImage.addEventListener("load", function(){
		// console.log("ME IMAGE");
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
	deadAlienBullets = [];
	deadBullets = [];
	deadAliens = [];

	shooter = {
		sprite: meSprite,
		x: (screen.width - meSprite.width)/ 2,
		y: screen.height - (30 + meSprite.height)
	};
	

	for(var i = 0; i < rows.length - 1	; i++) {
		// console.log("ROWS LOOP");
		for(var j = 0; j < 5; j++) {
			// console.log("INDIVIDUAL LOOP");
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

		if (isGameOver === true){
			// console.log("GAME OVA");
			screen.clear();

			var explosiveness = "<div class='valign start-holder center'> <img src='/assets/explosion2.gif' class='explosion' alt='Explosion GIF'> </div>"
			$("#Space").empty();
			$("#Space").append(explosiveness);
			setTimeout(afterExplosion, 1000);
			return;
		}

		// console.log("CONTINUING WITH GAME!!!");

		window.requestAnimationFrame(paintScene, screen.canvas);

		update();
		render();
	};

	paintScene();
};

function update(){
	// console.log("UPDATE");
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
		// console.log("New Bullet")
		bullets.push(new Bullet(shooter.x, shooter.y, -10, 2, 6, "#fff"))
	}

	deadBullets = [];
	deadAliens = [];

	for(var i = 0, len = bullets.length; i < len; i++){
		// console.log("BULLER LLOOOOPPPPPPPP");
		var b = bullets[i]
		b.update();
		if (b.y + b.height < 0 || b.y > screen.height){
			deadBullets.push(i);
		}
		console.log(alienAds.length, "Alien Length")
		for(var k = 0, alienl = alienAds.length; k < alienl; k++){
			// console.log("HE GOT SHOT");
			var possiblyHitAlien = alienAds[k];
			// console.log(possiblyHitAlien, b)
			if(Intersect(possiblyHitAlien.x, possiblyHitAlien.y, possiblyHitAlien.w, possiblyHitAlien.h, b.x, b.y, b.width, b.height)) {
				// console.log(k, "---", i)
				deadAliens.push(k);
				deadBullets.push(i);
				addPoints();
			}
		}
		}
		
	if(alienAds.length === 0){
		endGame();
	}
		var amountOfAliens = alienAds.length
		var randomness = Math.random()
		// console.log("SHOOT?", { amountOfAliens, randomness })

	//random alien shooting
	if(randomness < .1 && alienAds.length > 0) {
		var randomAlien = Math.floor(Math.random()*alienAds.length)

		for(var i = 0, len = alienAds.length; i< len; i++){
			// console.log("shoot maybe?>>>>??????");
			var oneAlien = alienAds[i]
			if (randomAlien === i){
				// console.log("random bullet", oneAlien.x, oneAlien.w, oneAlien.y, oneAlien.h);
				bulletsAlien.push(new Bullet(oneAlien.x + oneAlien.w*0.5, oneAlien.y + oneAlien.h, 4, 2, 4, "#f00")) 
			}
		}
	}

			deadAlienBullets = [];
		for(var j = 0, len = bulletsAlien.length; j <len; j++) {
			// console.log("Move alien bullet")
			var alienBullet = bulletsAlien[j]
			alienBullet.update();
			// console.log(screen.height, alienBullet.y)
		if(alienBullet.y > screen.height){
			deadAlienBullets.push(j);
		}
		if(Intersect(shooter.x, shooter.y, 13, 22, alienBullet.x, alienBullet.y, alienBullet.width, alienBullet.height)){
			// console.log("Me HIT")
			endGame();
			}
		}
		// console.log(deadAlienBullets, "Alien bullets");
		removeIndexes(alienAds, deadAliens);
		removeIndexes(bullets, deadBullets);
		removeIndexes(bulletsAlien, deadAlienBullets);


	//frames and alien movement update
	frames ++;
	if (frames % changeFrames === 0){

	var maxPosition = 0, minPosition = screen.width;
		for(var i = 0; i < alienAds.length; i++){
			// console.log("MOVEMENT LOOPPPPp");
			var movAlien = alienAds[i];
			movAlien.x +=260 * dir;
			// console.log(maxPosition);
			var alienPositionSide = movAlien.x + movAlien.w;
			var alienPositionHeight = movAlien.y + movAlien.h*2;
			// console.log(movAlien.w)
			maxPosition = Math.max(maxPosition, alienPositionSide);
			minPosition = Math.min(minPosition, movAlien.x);
			// console.log(maxPosition);
			maxHeight = Math.max(alienPositionHeight);
		}

		if(maxPosition > screen.width || minPosition < 0){
			// console.log("Down!!")
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
	screen.clear();
	for(var i = 0; i < alienAds.length; i++){
		var nextAlien = alienAds[i];
		screen.drawSprite(nextAlien.sprite, nextAlien.x, nextAlien.y)
	}

	for(var i = 0; i < bullets.length; i++){
		// console.log("BULLER RENDER");
		screen.drawBullet(bullets[i]);
	}

	for(var i = 0; i < bulletsAlien.length; i++){
		// console.log("Alien bullet RENDER");

		screen.drawBullet(bulletsAlien[i]);
	}
	screen.ctx.save();
	screen.ctx.restore();

	screen.drawSprite(shooter.sprite, shooter.x, shooter.y);
};


function removeIndexes (list, deadIndexes) {
	// console.log("Remove alien and bullet")
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
	// console.log(list);
	// console.log(deadIndexes);
}

function addPoints(){
	points += 100;
	$(".points").text(points)
	// console.log("Adding points", points)
}


function endGame(){
	screen.clear();
	isGameOver = true;
	generateSession(points);
	console.log("Explosion!")
}

function generateSession(score){
	// var gameID = $(".points-holder").data("game-id")
	var userID = $(".points-holder").data("user-id")
	$.ajax({
		url: '/api/game_sessions',
		data: {game_session: {score: `${score}`, user_id: `${userID}`}},
		method: "POST",
		success: function(event) {
			console.log("Yes! Sent it", event)
		},
		error: function(event) {
			console.log(event)
		}
	})
}

function afterExplosion(){
	var html ="<div class='valign start-holder center-align'> <h4 class='red-text darken-4-text game-over'> GAME OVER </h4> </div>"
			$("#Space").empty()
			$("#Space").append(html)
}

})
