var ps1 = [{
	start : 60,
	pattern : "3"
}];

var ps2 = [{
	start : 100,
	pattern : "1"
}, {
	start : 200,
	pattern : "2"
}, {
	start : 300,
	pattern : "3"
}, {
	start : 400,
	pattern : "4"
}, {
	start : 500,
	pattern : "5"
}, {
	start : 600,
	pattern : "6"
}, {
	start : 700,
	pattern : "7"
}];

Crafty.c("Luncher", {
	lunchEvents : [],
	patterns : null,
	init : function() {
		this.patterns = [];
		//console.log(this.patterns);
		this.frameCount = 0;
		this.bind("EnterFrame", this.onUpdate);
		this.bind("Remove", this.onDestroy);
		return this;
	},
	onUpdate : function(frame) {
		this.frameCount += 1;
		var fc = this.frameCount;
		var _this = this;
		this.lunchEvents.forEach(function(e) {
			if (e.start == fc) {
				//console.log(_this.patterns);
				var pattern = Crafty.e("p" + e.pattern);
				pattern.setLuncher(_this);
				_this.patterns.push(pattern);
			}
		});
	},
	onDestroy : function() {
		var _this = this;
		this.unbind("EnterFrame", this.onUpdate);
		this.patterns.forEach(function(e) {
			e.destroy();
		});
		Crafty(Com.enemyBullet).each(function() {
			if (this.luncher == _this)
				this.toPoint();
		});
	}
});

