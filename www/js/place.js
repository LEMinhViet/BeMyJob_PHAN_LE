// Class Place
var Place = function(id, name, x, y, width, height, src, ratioX, ratioY) {
	var place_img = new Image();
	place_img.src = src;		
	
	this.ratioX = ratioX;
	this.ratioY = ratioY;
	this.posX = x;
	this.posY = y;
	this.id = id;
	this.width = width;
	this.height = height;

	this.draw = function(context) {						
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

// Class Boss extend Place	
var Boss = function(id, name, x, y, width, height, src, ratioX, ratioY) {
	var _this = new Place(id, name, x, y, width, height, src, ratioX, ratioY);
	return _this;
}	
