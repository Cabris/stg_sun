Crafty.c(Com.point, {
	init : function() {
		this.requires("Bullet,Collision,sunflower.png");
		this.addComponent(Com.trackBullet);
		this.a = 0;
		this.v = 1500;
		this.diffRange = 0;
		this.endTrackTime = 9999;
		this.onHit("PlayerCollider", function(ent) {
			this.removeComponent("Collision");
			this.destroy();
		});
		return this;
	}
});
