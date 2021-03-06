// Class: Player
var Player = function(name, rate) {
	var player_img = new Image();
	player_img.src = 'images/business_man.png';

	var index_frame = 0;
	var left_clipboard = 0;		
	var width = 80;
	var height = 128;
	this.rate = rate;
	this.name   = name;
	this.left   = arr_place[0].getX()+arr_place[0].getWidth()/2-width/2;
	this.top    = arr_place[0].getY()+arr_place[0].getHeight()-height;

    this.update = function() {
    		// left: 37, right: 39, up: 38, down: 40  

            if(is_mouse_click) {            	
            	// Verify mouse position matches with the places' regions and move the player            	
            	for(var i=0; i<arr_place.length; i++) {
            		if(check_pos(mouse_position['x'], mouse_position['y'], arr_place[i])) {
	            		this.left = (arr_place[i].getX()+arr_place[i].getWidth()/2-width/2);
	    				this.top = (arr_place[i].getY()+arr_place[i].getHeight()-height);		    					    				
	    				if(id_place == i) {
	    					// Enter the place	    					
							id_page = 2;							
	    				}
	    				id_place = i;
	    				break;
	            	}	
            	}
            	for(var i=0; i<arr_boss.length; i++) {
            		if(check_pos(mouse_position['x'], mouse_position['y'], arr_boss[i])) {
	            		this.left = (arr_boss[i].getX()+arr_boss[i].getWidth()/2-width/2);
	    				this.top = (arr_boss[i].getY()+arr_boss[i].getHeight()-height);		    				
	            	}	
            	}
            	
				is_mouse_click = false;
            }

            // choose a frame in image 
            if(time_count % this.rate == 0) {
            	index_frame++;
	            if(index_frame == 4) {
	            	index_frame = 0;
	            }
	            left_clipboard = width * index_frame + index_frame;
            }

            function check_pos(x, y, obj) {	         	            		            	
            	if(x > obj.getX()*ratioX && x < (obj.getX() + obj.getWidth())*ratioX
            			&& y > obj.getY()*ratioY && y < (obj.getY() + obj.getHeight())*ratioY) {	            		
            		return true;
            	} else {
            		return false;
            	}
            }
    }
    
    this.draw = function() {	    	
   		context.drawImage(player_img, left_clipboard, 0, width, height, this.left*ratioX, this.top*ratioY, width*ratioX, height*ratioY);
    }

}