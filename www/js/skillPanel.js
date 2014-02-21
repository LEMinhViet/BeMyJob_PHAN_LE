// Class Skill extend Panel
var Skill = function(id, name, x, y, content) {
	var id = id;
	var _this = new Panel(name, x, y, content);
	_this.setPhrase(50, 50, 1, 10, true, 180);
	_this.update = function() {
		if(check_pos(mouse_position['x'], mouse_position['y'])) {
			if (!_this.getIsActive()) {
				if(id_skill < 2) {
					_this.setImgSrc('images/answerPressed.png');
					_this.setIsActive(true);
					id_skill++;
					arr_skill_chosen[id_skill]['id'] = id;
					arr_skill_chosen[id_skill]['nom'] = name;
				}
			} else {
				if (id_skill >= 0) {
					_this.setIsActive(false);
					_this.resetSrc();
					id_skill--;					
				}
			}
		}

		function check_pos(x, y) {
			if(x > _this.getX()*ratioX && x < (_this.getX() + _this.getWidth())*ratioX
					&& y > _this.getY()*ratioY && y < (_this.getY() + _this.getHeight())*ratioY) {
				return true;
			} else {
				return false;
			}
		}
	}
	return _this;
}


