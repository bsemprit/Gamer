//Intersection

function Intersect(ax, ay, aw, ah, bx, by, bw, bh) {
	return ax < bx+bw && bx < ax+aw && ay < by+bh && by < ay+ah;

};


//Bullet
function Bullet(x, y, velocityy, w, h, color){
	this.x = x;
	this.y = y;
	this.velocityy = velocityy;
	this.width = w;
	this.height = h;
	this.color = color;
};

Bullet.prototype.update = function (){
	this.y += this.velocityy;
}

//Screen
function Screen(width, height) {
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width = width;
	this.canvas.height = this.height = height;
	this.ctx = this.canvas.getContext("2d");
	console.log("Screen loaded")
	document.getElementById("spaceInvader").appendChild(this.canvas)
}

Screen.prototype.drawSprite = function(sprite, x, y) {
	this.ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height)
};

Screen.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
};

Screen.prototype.drawBullet = function(bullet){
	this.ctx.fillStyle = bullet.color;
	this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height)
}

//Sprite
function Sprite(image, x, y, width, height) {
	this.image = image;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

//InputHandeler

function PressedKeyHandeler() {
	this.down = {};
	this.pressed = {};
	var pressedHandelerThis = this;
	document.addEventListener("keydown", function(event) {
		if (event.keyCode === 32){
			event.preventDefault();
		}
		pressedHandelerThis.down[event.keyCode] = true;
	})
	document.addEventListener("keyup", function(event) {
		delete pressedHandelerThis.down[event.keyCode]
		delete pressedHandelerThis.pressed[event.keyCode]
	})
};

PressedKeyHandeler.prototype.isDown = function(keyCode) {
	return this.down[keyCode];
};

PressedKeyHandeler.prototype.isPressed = function(keyCode) {
	if(this.pressed[keyCode]){
		return false;
	} else if (this.down[keyCode]) {
		return this.pressed[keyCode] = true;
	}
	else {
		return false;	
	}
};