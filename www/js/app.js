$(document).ready(function() {

	/******* Init *******/
	/* Init Canvas */
	var canvas    = document.createElement('canvas');
	var bgwidth = $('body').width();
	var bgheight = $('body').height();
	canvas.width  = bgwidth; 
	canvas.height = bgheight;			
	context       = canvas.getContext('2d');
	$("#canvas").html(canvas);	
	// End Init Canvas

	/* Init value and event */
	var keys = [];
	var mouse_postion = [];
	var is_mouse_click = false;
	var time_count = 0;
	var ratioX = bgwidth/1920;
	var ratioY = bgheight/1080;	

	function press(event) {
	    console.log(event.keyCode);
	    keys[event.keyCode] = true;
	}

	function release(event) {
	    keys[event.keyCode] = false;
	}

	function mouse_press(event) {		
		mouse_postion['x'] = event.pageX;
		mouse_postion['y'] = event.pageY;		
	}

	function mouse_release(event) {
		is_mouse_click = true;
	}

	window.addEventListener('keydown', press, false);
	window.addEventListener('keyup', release, false);
	window.addEventListener('mousedown', mouse_press, false);
	window.addEventListener('mouseup', mouse_release, false);
	// End Init value and event

	/* Init object */

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

	    this.update = function(left, top) {
	    		// left: 37, right: 39, up: 38, down: 40     

	            if(is_mouse_click) {
	            	// Verify mouse postion matches with the places' regions and move the player
	            	for(var i=0; i<arr_place.length; i++) {
	            		if(check_pos(mouse_postion['x'], mouse_postion['y'], arr_place[i])) {	            			
		            		this.left = (arr_place[i].getX()+arr_place[i].getWidth()/2-width/2);
		    				this.top = (arr_place[i].getY()+arr_place[i].getHeight()-height);		    				
		            	}	
	            	}
	            	for(var i=0; i<arr_boss.length; i++) {
	            		if(check_pos(mouse_postion['x'], mouse_postion['y'], arr_boss[i])) {
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
	    
	    this.draw = function(context) {	    	
       		context.drawImage(player_img, left_clipboard, 0, width, height, this.left*ratioX, this.top*ratioY, width*ratioX, height*ratioY);       		
	    }

	}	

	var background = new Background('images/map.jpg', ratioX, ratioY);		

	var arr_place = [];	
	arr_place[0] = new Place(0, 'Tower House', 109, 225, 280, 270, 'images/tower.png', ratioX, ratioY);
	arr_place[1] = new Place(1, 'Cafe Shop', 1293, 600, 118, 157, 'images/cafe_shop.png', ratioX, ratioY);
	arr_place[2] = new Place(2, 'Rock', 327, 651, 168, 171, 'images/rock.png', ratioX, ratioY);
	arr_place[3] = new Place(3, 'Traffic Lights', 495, 354, 61, 106, 'images/traffic_lights.png', ratioX, ratioY);
	arr_place[4] = new Place(4, 'Bus Stop', 981, 311, 228, 132, 'images/bus_stop.png', ratioX, ratioY);
	arr_place[5] = new Place(5, 'Park', 655, 607, 352, 202, 'images/park.png', ratioX, ratioY);
	arr_place[6] = new Place(6, 'Recycle Bin', 343, 113, 68, 73, 'images/recycle_bin.png', ratioX, ratioY);

	var arr_boss = [];
	arr_boss[0] = new Boss(0, 'TPE', 641, 80, 152, 170, 'images/boss_small.png', ratioX, ratioY);
	arr_boss[1] = new Boss(1, 'TME', 913, 872, 152, 170, 'images/boss_small.png', ratioX, ratioY);
	arr_boss[2] = new Boss(2, 'GE', 1485, 535, 306, 333, 'images/boss_big.png', ratioX, ratioY);

	var player = new Player('Name', 5);
	
	var str_lvl = new Phrase("Max Level", 1700, 10, ratioX, ratioY);

	function play() {	
		time_count++;
		if(time_count == 1000) {
			time_count = 0;
		}
		context.clearRect(0, 0, bgwidth, bgheight);		

		background.draw(context);					
		for(var i=0; i<arr_place.length; i++) {
			arr_place[i].draw(context);
		}
		for(var i=0; i<arr_boss.length; i++) {
			arr_boss[i].draw(context);
		}

		player.update();			
		player.draw(context);

		str_lvl.draw(context);		

		window.requestAnimationFrame(play);
	}	

	play();
});