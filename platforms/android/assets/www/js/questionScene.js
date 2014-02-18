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
		
		this.draw = function(context) {	    	
			context.drawImage(button_img, 0, 0, width, height, PosX*ratioX, PosY*ratioY, width*ratioX, height*ratioY);       		
		}
		
		this.resetSrc = function() {
			button_img.src = 'images/answer.png';
		}
	}

	var background = new Background('images/questionScene.jpg', ratioX, ratioY);		
	
	var arr_answer = [];	
	arr_answer[0] = new Answer('Answer 1', 69, 674, ratioX, ratioY);
	arr_answer[1] = new Answer('Answer 2', 690, 674, ratioX, ratioY);
	arr_answer[2] = new Answer('Answer 3', 1320, 674, ratioX, ratioY);
	
	var str_lvl = new Phrase("Max Level", 1700, 10, ratioX, ratioY);
	
	//var lastLoop = new Date;
	
	function play() {	
		/*var thisLoop = new Date;
		var fps = 1000 / (thisLoop - lastLoop);
		lastLoop = thisLoop;
		str_lvl = new Phrase("fps : " + fps, 100, 10);*/
	
		time_count++;
		if(time_count == 1000) {
			time_count = 0;
		}
		context.clearRect(0, 0, bgwidth, bgheight);		

		background.draw(context);					
		
		for (var i=0; i<arr_answer.length; i++) {
			arr_answer[i].update(is_mouse_click, mouse_postion);
			arr_answer[i].draw(context);
		}
		
		str_lvl.draw(context);		

		window.requestAnimationFrame(play);
	}	

	play();
});