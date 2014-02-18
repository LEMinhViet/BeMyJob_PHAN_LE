// Class menu tab
	var MenuTab = function(src, width,  height, x, y, ratioX, ratioY) {		
		var tab_img = new Image();
		tab_img.src = src;
		
		this.width = width;
		this.height = height;
		this.posX = x;
		this.posY = y;
		
		this.update = function(mouse_x, mouse_y, command) {
			if(mouse_x > this.posX*ratioX && mouse_x < (this.posX + this.width)*ratioX
				&& mouse_y > this.posY*ratioY && mouse_y < (this.posY + this.height)*ratioY) {
					if(command === 'start') {
						navigator.app.loadUrl("file://F:/BeMyJob/BeMyJob_PHAN_LE/www/map.html");
					} else if(command === 'exit') {						
						navigator.notification.alert("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No"); 												
					}
				}
		}
		
		function onConfirm(button) {
			
			//navigator.app.exitApp();	// Otherwise we quit the app.
			
		}

	    this.draw = function(context) {	    	
       		context.drawImage(tab_img, 0, 0, this.width, this.height, this.posX*ratioX, this.posY*ratioY, this.width*ratioX, this.height*ratioY);        		
	    }
	}