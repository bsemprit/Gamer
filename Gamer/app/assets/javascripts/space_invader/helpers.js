//Helper functions

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
		PressedKeyHandeler.down[event.keyCode] = true;
	})
	document.addEventListener("keyup", function(event) {
		delete PressedKeyHandeler.down[event.keyCode]
		delete PressedKeyHandeler.pressed[event.keyCode]
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