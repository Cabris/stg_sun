Modifier = function() {
	this.startTime = 0;
	this.finishTime = 0;
	this.duration = 0;
	this.counter = 0;
	this.getProgress = function() {
		var s = this.startTime;
		var f = this.finishTime;
		var c = this.counter;
		var p = (c - s) / (f - s);
		return p;
	};
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
	this.counter++;
};
Modifier.prototype.onUpdate = function(frame, _this) {
};
Modifier.prototype.onStart = function(_this) {
};
Modifier.prototype.onFinish = function(_this) {
};

MoveModifier = function(x0, y0, x1, y1, dur) {
	this.dx = x1 - x0;
	this.dy = y1 - y0;
	this.x0=x0;
	this.y0=y0;
	this._d = dur;
};
MoveModifier.prototype = new Modifier();
MoveModifier.prototype.onUpdate = function(frame, _this) {
	this.duration = this._d;
	_this.x = this.x0+this.dx * this.getProgress();
	_this.y = this.y0+this.dy * this.getProgress();
	//console.log(_this);
};

Crafty.c("ModifierContainer", {
	modifiers : null,
	init : function() {
		this.modifiers = [];
		this.bind("EnterFrame", function(frame) {
			var _this = this;
			this.modifiers.forEach(function(m) {
				m.update(frame, _this);
			});
		});
		return this;
	},
	addModifier : function(m) {
		this.modifiers.push(m);
	}
});
