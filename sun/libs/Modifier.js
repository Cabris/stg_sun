Modifier = function() {
	this.startTime = 0;
	this.finishTime = 0;
	this.duration = 0;
	this.counter = 0;
};
Modifier.prototype.init = function() {

};
Modifier.prototype.getProgress = function() {
	var s = this.startTime;
	var f = this.finishTime;
	var c = this.counter;
	var p = (c - s) / (f - s);
	if (isNaN(p))
		p = 0;
	return p;
};
Modifier.prototype.update = function(frame, _this) {
	this.finishTime = this.startTime + this.duration;
	if (this.counter >= this.startTime && this.counter <= this.finishTime) {
		this.onUpdate(frame, _this);
	}
	if (this.counter == this.startTime) {
		this.onStart(_this);
	}
	if (this.counter == this.finishTime) {
		this.onFinish(_this);
	}
	if (this.counter <= this.finishTime)
		this.counter++;
};
Modifier.prototype.onUpdate = function(frame, _this) {
};
Modifier.prototype.onStart = function(_this) {
};
Modifier.prototype.onFinish = function(_this) {
	//console.log("onFinish m" + "," + this.counter + "," + this.finishTime);
};

MoveModifier = function(x0, y0, x1, y1, dur) {
	this.dx = x1 - x0;
	this.dy = y1 - y0;
	this.x0 = x0;
	this.y0 = y0;
	this._d = dur;
};
MoveModifier.prototype = new Modifier();
MoveModifier.prototype.onUpdate = function(frame, _this) {
	_this.x = this.x0 + this.dx * this.getProgress();
	_this.y = this.y0 + this.dy * this.getProgress();
};
MoveModifier.prototype.init = function() {
	this.duration = this._d;
};

Crafty.c("ModifierContainer", {
	modifiers : null,
	init : function() {
		this.modifiers = [];
		this.bind("EnterFrame", function(frame) {
			var _thisEntity = this;
			this.modifiers.forEach(function(m) {
				m.update(frame, _thisEntity);
			});

			for (var i = 0; i < this.modifiers.length ; i++) {
				var m = this.modifiers[i];
				if (m.counter >= m.finishTime) {
					remove(this.modifiers, m);
					//console.log("remove m");
				}
			}
		});
		return this;
	},
	addModifier : function(m) {
		this.modifiers.push(m);
		m.init();
	},
	addModifiers : function(ms) {
		var _this = this;
		for (var i = 0; i < ms.length - 1; i++) {
			var m = ms[i];
			m.onFinish = function(this2) {
				this2.addModifier(ms[i + 1]);
			};
		}
		//this.modifiers.push(m);
	}
});

