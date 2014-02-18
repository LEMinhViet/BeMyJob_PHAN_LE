$(document).ready(function() {

	/******* Init *******/
	/* Init Canvas */
	var canvas    = document.createElement('canvas');
	bgwidth       = $('body').width();
	bgheight      = $('body').height();
	canvas.width  = bgwidth; 
	canvas.height = bgheight;			
	context       = canvas.getContext('2d');
	$("#canvas").html(canvas);	
	// End Init Canvas

	/* Init value and event */
	keys           = [];
	mouse_position = [];
	is_mouse_click = false;
	time_count     = 0;
	ratioX         = bgwidth/1920;
	ratioY         = bgheight/1080;	
	arr_place      = [];	
	arr_boss       = [];
	arr_answer 	   = [];
	is_load        = [];
	
	id_page        = 0; // 0: page d'accueil, 1: carte, 2: réponse - question
	id_place       = 0;	// id of the place where the hero is after mouse click event	
	number_scene  = 3; // need to change
	for(var i=0; i<number_scene; i++) {
		is_load[i] = false;
	}

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

	// Init pageaccueil  <=> id_page = 0
	function initPageAccueil() {
		bg_welcome = new Background('images/menu.jpg');
		start_tab  = new MenuTab('images/start.png', 248, 59, 837, 727);
		exit_tab   = new MenuTab('images/exit.png', 186, 61, 864, 824);
	}			

	// Init la carte     <=> id_page = 1
	function initCarte() {
		bg_map = new Background('images/map.jpg');		

		arr_place[0] = new Place(0, 'Tower House', 109, 225, 280, 270, 'images/tower.png');
		arr_place[1] = new Place(1, 'Cafe Shop', 1293, 600, 118, 157, 'images/cafe_shop.png');
		arr_place[2] = new Place(2, 'Rock', 327, 651, 168, 171, 'images/rock.png');
		arr_place[3] = new Place(3, 'Traffic Lights', 495, 354, 61, 106, 'images/traffic_lights.png');
		arr_place[4] = new Place(4, 'Bus Stop', 981, 311, 228, 132, 'images/bus_stop.png');
		arr_place[5] = new Place(5, 'Park', 655, 607, 352, 202, 'images/park.png');
		arr_place[6] = new Place(6, 'Recycle Bin', 343, 113, 68, 73, 'images/recycle_bin.png');

		arr_boss[0] = new Boss(0, 'TPE', 641, 80, 152, 170, 'images/boss_small.png');
		arr_boss[1] = new Boss(1, 'TME', 913, 872, 152, 170, 'images/boss_small.png');
		arr_boss[2] = new Boss(2, 'GE', 1485, 535, 306, 333, 'images/boss_big.png');

		player = new Player('Name', 5);
	}

	// Init la thème "question - réponse"
	function initAnswer() {
		bg_answer = new Background('images/questionScene.jpg');		
		arr_answer[0] = new Answer('Answer 1', 69, 674);
		arr_answer[1] = new Answer('Answer 2', 690, 674);
		arr_answer[2] = new Answer('Answer 3', 1320, 674);
	}

	
	// Commencer !!! 

	function play() {			
		time_count++;
		if(time_count == 1000) {
			time_count = 0;
		}
		context.clearRect(0, 0, bgwidth, bgheight);		
		
		if(id_page == 0) {
			// page d'accueil
			if(!is_load[id_page]) {
				initPageAccueil();
				is_load[id_page] = true;
			}
			bg_welcome.draw();
			if(is_mouse_click) {				
				start_tab.update('start');								
				exit_tab.update('exit');							
				is_mouse_click = false;
			}			
			start_tab.draw();
			exit_tab.draw();		
		} else if(id_page == 1) {
			if(!is_load[id_page]) {
				initCarte();
				is_load[id_page] = true;
			}
			bg_map.draw();					
			for(var i=0; i<arr_place.length; i++) {
				arr_place[i].draw();
			}
			for(var i=0; i<arr_boss.length; i++) {
				arr_boss[i].draw();
			}

			player.update();			
			player.draw();
		} else if(id_page == 2) {
			if(!is_load[id_page]) {
				initAnswer();
				is_load[id_page] = true;
			}
			bg_answer.draw();							
			for (var i=0; i<arr_answer.length; i++) {
				arr_answer[i].update();
				arr_answer[i].draw();
			}
		}
		window.requestAnimationFrame(play);
	}	

	play();
});