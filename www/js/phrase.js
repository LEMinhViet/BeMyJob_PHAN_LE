// Class Text
var Phrase = function(str, x, y, taille, space, is_adjust, width_panel) {
	var phrase_img = new Image();
	phrase_img.src = 'images/font.png';		
	var content = str;		
	var posX = x;
	var posY = y;
	var taille = taille;
	var space = space;	
	var charSpacing = 0;		
	if(is_adjust) {
		// if is_adjust = true and the width of context is smaller than width_panel => center
		var width_content = 0;
		for(var i=0; i<content.length; i++) {
			if(content[i] != " ") {
				width_content += (fontData[content[i]].w + charSpacing);
			} else {
				width_content += space;
			}
		}
		
		if(width_content < width_panel) {
			posX += (width_panel-width_content)/2;			
		}
	}
	
	this.draw = function() {			
		var offSet_x = 0;	
		var offSet_y = 0;	
		
		for(var i=0; i<content.length; i++) {						
			// adjust text's position inside to fit the panel
			if(content[i] != " ") {
				context.drawImage(phrase_img, fontData[content[i]].x, fontData[content[i]].y, fontData[content[i]].w, fontData[content[i]].h, 
					posX*ratioX+offSet_x, (posY+fontData[content[i]].t+offSet_y)*ratioY, fontData[content[i]].w*ratioX/taille, fontData[content[i]].h*ratioY/taille);
				offSet_x += (fontData[content[i]].w + charSpacing)*ratioX;
				if(is_adjust) {
					if(offSet_x >= width_panel*ratioX) {
						offSet_y += 35/taille;
						offSet_x = 0;
					}
				}
			} else {
				offSet_x += space*ratioX;
				if(is_adjust) {
					if(offSet_x >= width_panel*ratioX) {
						offSet_y += 35/taille;
						offSet_x = 0;
					}
				}
			}					
		}			
	}	
}