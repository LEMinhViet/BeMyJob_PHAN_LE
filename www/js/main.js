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
	keys            = [];
	mouse_position  = [];
	is_mouse_click  = false;
	time_count      = 0;
	ratioX          = bgwidth/1920;
	ratioY          = bgheight/1080;
	arr_place       = [];
	arr_boss        = [];
	arr_skill 	= [];
	arr_answer      = [];
	arr_logo        = [];
	is_load         = [];

	id_page        = 0; // 0: page d'accueil, 1: carte, 2: réponse - question
	id_place       = 0;	// id of the place where the hero is after mouse click event
	nb_skill_chosen = 3;	// nb of skill which the player must choose
	number_scene   = 4; // need to change
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
	var background = null;
	var start_tab = null;
	var exit_tab = null;
	var player = null;
	var back_button = null;
	var next_button = null;
	var skill_tut = null;

	// Init pageaccueil  <=> id_page = 0
	function initPageAccueil() {
		background = new Background('images/menu.jpg');
		start_tab  = new MenuTab('images/start.png', 248, 59, 837, 727);
		exit_tab   = new MenuTab('images/exit.png', 186, 61, 864, 824);
	}

	// Init le thème "skill" <=> id_page = 1
	function initSkillScene() {
		background = new Background('images/questionScene.jpg');
		if (arr_skill == null) {
			arr_skill = [];
		}
		$.getJSON( "serverSide/skill.php", function( data ) {
			$.each( data, function( key, val ) {
				arr_skill[key] = new Skill(key, val, 440+parseInt(key%3)*350, 700+parseInt(key/3)*180, val);
				arr_skill[key].setDimension(300, 150);
			});
		});

		back_button = new Button('Back Button', 'images/back.png', 128, 123, 0, 0);
		next_button = new Button('Next Button', 'images/next.png', 128, 123, 1500, 800);
		skill_tut = new Phrase("Veuillez choissir 3 competences preferees", 250, 400, 1, 10, true, 1400);
	}

	// Init la carte     <=> id_page = 2
	function initCarte() {
		background = new Background('images/map.jpg');
		if (arr_place == null) {
			arr_place = [];
		}
		arr_place[0] = new Place(0, 'Tower House', 109, 225, 280, 270, 'images/tower.png');
		arr_place[1] = new Place(1, 'Cafe Shop', 1293, 600, 118, 157, 'images/cafe_shop.png');
		arr_place[2] = new Place(2, 'Rock', 327, 651, 168, 171, 'images/rock.png');
		arr_place[3] = new Place(3, 'Traffic Lights', 495, 354, 61, 106, 'images/traffic_lights.png');
		arr_place[4] = new Place(4, 'Bus Stop', 981, 311, 228, 132, 'images/bus_stop.png');
		arr_place[5] = new Place(5, 'Park', 655, 607, 352, 202, 'images/park.png');
		arr_place[6] = new Place(6, 'Recycle Bin', 343, 113, 68, 73, 'images/recycle_bin.png');

		/*arr_logo[0] = new Logo(arr_skill_chosen[0]['nom'], 109, 225, 327, 651, 'images/logo/logo_' + arr_skill_chosen[0]['nom'].toLowerCase() + '.png');
		arr_logo[1] = new Logo(arr_skill_chosen[1]['nom'], 495, 354, 655, 607, 'images/logo/logo_' + arr_skill_chosen[1]['nom'].toLowerCase() + '.png');
		arr_logo[2] = new Logo(arr_skill_chosen[2]['nom'], 109, 225, 343, 113, 'images/logo/logo_' + arr_skill_chosen[2]['nom'].toLowerCase() + '.png');*/
		
		if (arr_boss == null) {
			arr_boss = [];
		}
		arr_boss[0] = new Boss(0, 'TPE', 641, 80, 152, 170, 'images/boss_small.png');
		arr_boss[1] = new Boss(1, 'TME', 913, 872, 152, 170, 'images/boss_small.png');
		arr_boss[2] = new Boss(2, 'GE', 1485, 535, 306, 333, 'images/boss_big.png');

		back_button = new Button('Back Button', 'images/back.png', 128, 123, 0, 0);

		player = new Player('Name', 5);
	}

	// Init le thème "question - réponse" <=> id_page = 3
	function initAnswer() {
		background = new Background('images/questionScene.jpg');
		/*$.getJSON( "serverSide/resp_ques.php?id_1=" + arr_skill_chosen[0] + "&id_2=" + arr_skill_chosen[1] + "&id_3=" + arr_skill_chosen[2], function( data ) {
			$.each( data, function( key, val ) {
				arr_skill[key] = new Skill(key, val, 440+parseInt(key%3)*350, 700+parseInt(key/3)*180, val);
				arr_skill[key].setDimension(300, 150);
			});
		});*/
		if (arr_answer == null) {
			arr_answer = [];
		}
		arr_answer[0] = new Answer('Answer 1', 69, 674);
		arr_answer[1] = new Answer('Answer 2', 690, 674);
		arr_answer[2] = new Answer('Answer 3', 1320, 674);
		back_button = new Button('Back Button', 'images/back.png', 128, 123, 0, 0);
	}

	// delete objects
	function removeObject() {
		background = null;
		start_tab = null;
		exit_tab = null;
		player = null;
		back_button = null;
		next_button = null;
		arr_skill = null;
		arr_place = null;
		arr_boss = null;
		arr_answer = null;
	}

	/***** Skill *****/
	arr_skill_chosen = [];
	id_skill = -1;
	for(var i=0; i<nb_skill_chosen; i++) {
		arr_skill_chosen[i] = [];
	}

	// End of Skill

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
				removeObject();
				initPageAccueil();
				is_load[id_page] = true;
			}
			background.draw();
			if(is_mouse_click) {
				start_tab.update('start');
				exit_tab.update('exit');
				is_mouse_click = false;
			}
			start_tab.draw();
			exit_tab.draw();
		} else if(id_page == 1) {
			// thème "Skill"
			if(!is_load[id_page]) {
				removeObject();
				initSkillScene();
				is_load[id_page] = true;
			}
			background.draw();
			for (var i=0; i<arr_skill.length; i++) {
				if(is_mouse_click) {
					arr_skill[i].update();
				}
				arr_skill[i].draw();
			}
			if(is_mouse_click) {
				back_button.update();
				next_button.update();
				is_mouse_click = false;
			}
			back_button.draw();
			skill_tut.draw();
			if (id_skill == nb_skill_chosen-1) {
				next_button.draw();
			}
		} else if(id_page == 2) {
			// thème "carte"
			if(!is_load[id_page]) {
				removeObject();
				initCarte();
				is_load[id_page] = true;
			}
			background.draw();
			for(var i=0; i<arr_place.length; i++) {
				arr_place[i].draw();
			}
			for(var i=0; i<arr_boss.length; i++) {
				arr_boss[i].draw();
			}
			for(var i=0; i<arr_logo.length; i++) {
				arr_logo[i].draw();
			}
			player.update();
			if(is_mouse_click) {
				back_button.update();
				is_mouse_click = false;
			}

			back_button.draw();
			player.draw();
		} else if(id_page == 3) {
			// thème "question-réponse"
			if(!is_load[id_page]) {
				removeObject();
				initAnswer();
				is_load[id_page] = true;
			}
			background.draw();
			for (var i=0; i<arr_answer.length; i++) {
				if(is_mouse_click) {
					arr_answer[i].update();
				}
				arr_answer[i].draw();
			}
			if(is_mouse_click) {
				back_button.update();
				is_mouse_click = false;
			}
			back_button.draw();
		}
		window.requestAnimationFrame(play);
	}

	play();
});