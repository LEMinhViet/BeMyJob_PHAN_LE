// Class Skill extend Answer
var Answer = function(name, x, y, content) {
	var _this = new Panel(name, x, y, content);

	_this.update = function() {
		if(check_pos(mouse_position['x'], mouse_position['y'])) {
			if (!_this.getIsActive()) {
				for (var i=0; i<arr_answer.length; i++) {
					arr_answer[i].resetSrc();
					arr_answer[i].setIsActive(false);
				}
				_this.setImgSrc('images/answerPressed.png');
				_this.setIsActive(true);
			} else {
				_this.setIsActive(false);
				_this.resetSrc();
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


