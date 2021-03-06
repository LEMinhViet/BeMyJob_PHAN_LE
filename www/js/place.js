// Class Place
var Place = function(id, name, x, y, width, height, src) {
	var place_img = new Image();
	place_img.src = src;
		
	this.posX = x;
	this.posY = y;
	this.id = id;
	this.width = width;
	this.height = height;

	this.draw = function() {					
		context.drawImage(place_img, 0, 0, this.width, this.height, this.posX*ratioX, this.posY*ratioY, this.width*ratioX, this.height*ratioY);
	}

	this.getX = function() {
		return this.posX;
	}

	this.getY = function() {
		return this.posY;
	}

	this.getWidth = function() {
		return this.width;
	}

	this.getHeight = function() {
		return this.height;
	}
}