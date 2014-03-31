Crafty.c("Transform", {

	tranformParent : null,
	position : {
		x : 0,
		y : 0
	},
	innerPosition : {
		x : 0,
		y : 0
	},
	init : function() {
		this.requires("2D").bind("EnterFrame", function(frame) {

			if (this.tranformParent != null) {
				this.position.x = this.innerPosition.x + tranformParent.position.x;
				this.position.y = this.innerPosition.y + tranformParent.position.y;
			}else{
				this.position.x = this.x;
				this.position.y = this.y;
			}
		});

		function traceTransform() {

		}

	}
});
