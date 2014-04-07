var ps1 = [{
	start : 60,
	pattern : "4"
}];

var ps2 = [{
	start : 20,
	pattern : "1"
}, {
	start : 80,
	pattern : "2"
}, {
	start : 120,
	pattern : "3"
}, {
	start : 180,
	pattern : "4"
}, {
	start : 240,
	pattern : "5"
}];

Crafty.c("Luncher", {
	events : ps1,
	init : function() {
		this.frameCount = 0;
		this.bind("EnterFrame", function(frame) {
			this.frameCount += 1;
			var fc = this.frameCount;
			var _this = this;
			this.events.forEach(function(e) {
				if (e.start == fc) {
					//console.log("p" + e.pattern + ":" + fc);
					var pattern=Crafty.e("p" + e.pattern);			
					pattern.setLuncher(_this);
				}
			});
		});
		return this;
	}
});

