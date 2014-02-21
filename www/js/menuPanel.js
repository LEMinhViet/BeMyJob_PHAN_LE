// Class menu tab
	var MenuTab = function(src, width,  height, x, y) {		
		var tab_img = new Image();
		tab_img.src = src;
		
		var width = width;
		var height = height;
		var posX = x;
		var posY = y;				
		
		this.update = function(command) {			
			if(mouse_position['x'] > posX*ratioX && mouse_position['x'] < (posX + width)*ratioX
				&& mouse_position['y'] > posY*ratioY && mouse_position['y'] < (posY + height)*ratioY) {
					if(command === 'start') {												
						id_page = 1;	// aller au thème "Skill"
						is_load[id_page] = false;											
					} else if(command === 'exit') {						
						navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", ["Yes","No"]); 												
					}
				}
		}
		
		function onConfirm(button) {
			if (button == 1)
				navigator.app.exitApp();	// Otherwise we quit the app.			
		}

	    this.draw = function() {	    	
       		context.drawImage(tab_img, 0, 0, width, height, posX*ratioX, posY*ratioY, width*ratioX, height*ratioY);        		
	    }
	}