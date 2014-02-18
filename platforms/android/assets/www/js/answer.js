// Class answer
var Answer = function(name, x, y) {		
	var button_img = new Image();
	button_img.src = 'images/answer.png';
	
	var width = 566;
	var height = 301;
	var PosX = x;
	var PosY = y;
	this.name = name;	
	
	this.update = function() {
			if(is_mouse_click) {
				// Verify mouse postion matches with the places' regions and move the player
				
				if(check_pos(mouse_postion['x'], mouse_postion['y'])) {	   
					for (var i=0; i<arr_answer.length; i++) {
						arr_answer[i].resetSrc();
					}
					
					button_img.src = 'images/answerPressed.png';
										
					is_mouse_click = false;
				}
			}

			function check_pos(x, y) {	         
				if(x > PosX*ratioX && x < (PosX + width)*ratioX
						&& y > PosY*ratioY && y < (PosY + height)*ratioY) {	            		
					return true;
				} else {
					return false;
				}
			}
	}
	
	this.draw = function() {	    	
		context.drawImage(button_img, 0, 0, width, height, PosX*ratioX, PosY*ratioY, width*ratioX, height*ratioY);       		
	}
	
	this.resetSrc = function() {
		button_img.src = 'images/answer.png';
	}
}