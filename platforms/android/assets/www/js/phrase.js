// Class Text
var Phrase = function(str, x, y, ratioX, ratioY) {
	var phrase_img = new Image();
	phrase_img.src = 'images/font.png';		
	this.str = str;		
	this.posX = x;
	this.posY = y;
	var charSpacing = 0;

	this.draw = function(context) {			
		var offSet = 0;
		for(var i=0; i<this.str.length; i++) {
			if(this.str[i] != " ") {
				context.drawImage(phrase_img, fontData[this.str[i]].x, fontData[this.str[i]].y, fontData[this.str[i]].w, fontData[this.str[i]].h, (this.posX+offSet)*ratioX, (this.posY+fontData[this.str[i]].t)*ratioY, fontData[this.str[i]].w*ratioX, fontData[this.str[i]].h*ratioY);
				offSet += fontData[this.str[i]].w + charSpacing;
			} else {
				offSet += 10;
			}
		}			
	}
}