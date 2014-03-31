var p = [{
	start : 20,
	pattern : "1"
}, {
	start : 80,
	pattern : "2"
}];

Crafty.c("Luncher", {
	events : p,
	//frameCount : 0,
	init : function() {
		this.frameCount = 0;
		this.bind("EnterFrame", function(frame) {
			this.frameCount += 1;
			var fc = this.frameCount;
			var _this = this;
			this.events.every(function(e) {
				if (e.start == fc) {
					_this.addComponent("Pattern" + e.pattern);
				}
			});
		});
		return this;
	}
});

Crafty.c("PlayerAim", {
	aimPlayerAngle : 0,
	init : function() {
		this.bind("EnterFrame", function(frame) {
			var player = Crafty("Player");
			this.aimPlayerAngle = Math.atan2(player.y - this.y, player.x - this.x);
		});
		return this;
	}
});
