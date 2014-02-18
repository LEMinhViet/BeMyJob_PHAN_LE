// Class menu tab
	var MenuTab = function(src, width,  height, x, y) {		
		var tab_img = new Image();
		tab_img.src = src;
		
		this.width = width;
		this.height = height;
		this.posX = x;
		this.posY = y;
		
		this.update = function(command) {			
			if(mouse_position['x'] > this.posX*ratioX && mouse_position['x'] < (this.posX + this.width)*ratioX
				&& mouse_position['y'] > this.posY*ratioY && mouse_position['y'] < (this.posY + this.height)*ratioY) {
					if(command === 'start') {												
						id_page = 1;						
						//navigator.app.loadUrl("file://F:/BeMyJob/BeMyJob_PHAN_LE/www/map.html");
					} else if(command === 'exit') {						
						alert('exit');
						//navigator.notification.alert("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No"); 												
						//navigator.app.exitApp();
					}
				}
		}
		
		function onConfirm(button) {
			
			//navigator.app.exitApp();	// Otherwise we quit the app.
			
		}

	    this.draw = function() {	    	
       		context.drawImage(tab_img, 0, 0, this.width, this.height, this.posX*ratioX, this.posY*ratioY, this.width*ratioX, this.height*ratioY);        		
	    }
	}