// Class Background
	var Background = function(src) {		
		var bg_img = new Image();
		bg_img.src = src;

		var index_frame = 0;		
		var left_clipboard = 0;
		var width = 1920;
		var height = 1080;

	    this.draw = function() {  	
       		context.drawImage(bg_img, 0, 0, width, height, 0, 0, width*ratioX, height*ratioY);        		
	    }
	}