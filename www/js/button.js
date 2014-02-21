// Class: Player
var Button = function(name, src, width, height, x, y) {
	var btn_img = new Image();
	btn_img.src = src;
	
	var width = width;
	var height = height;
	var name   = name;
	var posX = x;
	var posY = y;

	this.update = function() {		
		if(mouse_position['x'] > posX*ratioX && mouse_position['x'] < (posX + width)*ratioX
		    && mouse_position['y'] > posY*ratioY && mouse_position['y'] < (posY + height)*ratioY) {
			if(name === 'Back Button') {
				id_page--;
				is_load[id_page] = false;
				if (id_page == 0) {
				    for(var i=0; i<nb_skill_chosen; i++) {
					    arr_skill_chosen[i] = -1;	
				    }
				    id_skill = 0;
				}
			} else if(name === 'Next Button') {
				id_page ++;
				is_load[id_page] = false;
			}
		}
	}
	
	this.draw = function() {
		    context.drawImage(btn_img, 0, 0, width, height, posX*ratioX, posY*ratioY, width*ratioX, height*ratioY);
	}
}