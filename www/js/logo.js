// Class Logo
var Logo = function(name, x, y, src) {
	var logo_img = new Image();
	logo_img.src = src;
		
	var posX = x;
	var posY = y;	
	var width = 70;
	var height = 70;

	this.draw = function() {					
		context.drawImage(logo_img, 0, 0, width, height, posX*ratioX, posY*ratioY, width*ratioX, height*ratioY);
	}

	this.getX = function() {
		return posX;
	}

	this.getY = function() {
		return posY;
	}

	this.getWidth = function() {
		return width;
	}

	this.getHeight = function() {
		return height;
	}
}