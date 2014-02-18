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
	var mouse_position = [];
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
		mouse_position['x'] = event.pageX;
		mouse_position['y'] = event.pageY;		
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
	var background = new Background('images/menu.jpg', ratioX, ratioY);
	var start_tab = new MenuTab('images/start.png', 248, 59, 837, 727, ratioX, ratioY);
	var exit_tab = new MenuTab('images/exit.png', 186, 61, 864, 824, ratioX, ratioY);
	
	var str_lvl = new Phrase("Max Level", 1700, 10, ratioX, ratioY);
	var lastLoop = new Date;
	
	function play() {	
		var thisLoop = new Date;
		var fps = 1000 / (thisLoop - lastLoop);
		lastLoop = thisLoop;
		str_lvl = new Phrase("fps : " + fps, 100, 10, ratioX, ratioY);
		
		time_count++;
		if(time_count == 1000) {
			time_count = 0;
		}
		context.clearRect(0, 0, bgwidth, bgheight);		
		
		background.draw(context);					

		if(is_mouse_click) {
			start_tab.update(mouse_position['x'], mouse_position['y'], 'start');				
			exit_tab.update(mouse_position['x'], mouse_position['y'], 'exit');							
			is_mouse_click = false;
		}
		
		start_tab.draw(context);									
		exit_tab.draw(context);					
		str_lvl.draw(context);
		window.requestAnimationFrame(play);
	}	

	play();
});