// Class panel
var Panel = function(name, x, y, content) {
	var button_img = new Image();
	button_img.src = 'images/answer.png';

	var width = 566;
	var height = 301;
	var posX = x;
	var posY = y;
	var name = name;
	var phrase = null;
	var is_active = false;

	this.draw = function() {
		context.drawImage(button_img, 0, 0, 566, 301, posX*ratioX, posY*ratioY, width*ratioX, height*ratioY);
		if(phrase != null) {
			phrase.draw();
		}
	}

	this.resetSrc = function() {
		button_img.src = 'images/answer.png';
	}

	this.setDimension = function(w, h) {
		width = w;
		height = h;
	}

	this.setPhrase = function(pad_x, pad_y, taille, pad, is_adjust, width_panel) {
		phrase = new Phrase(content, posX + pad_x, posY + pad_y, taille, pad, is_adjust, width_panel);
	}
	
	this.getWidth = function() {
		return width;
	}
	
	this.getHeight = function() {
		return height;
	}
	
	this.getX = function() {
		return posX;
	}
	
	this.getY = function() {
		return y;
	}
	
	this.getIsActive = function() {
		return is_active;
	}
	
	this.setIsActive = function(value) {
		is_active = value;
	}
	
	this.setImgSrc = function(src) {
		button_img.src = src;
	}
}