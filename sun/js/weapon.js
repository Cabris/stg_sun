Crafty.c("PlayerWeapon", {
	isAbleFire : false,
	interval : 5,
	ap : 1,
	init : function() {
		this.requires("2D,Canvas").bind("EnterFrame", function(frame) {
			if (frame.frame % this.interval == 0) {
				this.isAbleFire = true;
			} else
				this.isAbleFire = false;
		}).origin("center");
		return this;
	},
	onWeaponAttached : function(_player) {
		this.player = _player;
		this.attr({
			x : _player.center.x,
			y : _player.center.y
		});
	},
	shot : function() {
		if (this.isAbleFire) {
			// var bullet = Crafty.e("Bullet", "sprite_bullet_colors01", "SpriteAnimation").origin("center");
			// bullet.reel("sprite_bullet_colors", 0, 3, 2, 1).animate("sprite_bullet_colors", 1);
			var bullet = createPlayerBullet(3, 2);
			bullet.v = 1200;
			bullet.moveAngle = -90;
			bullet.weapon = this;
			bullet.w *= 0.8;
			bullet.h *= 0.8;
			bullet.setPos(this.x, this.y);
			bullet.onHit("Enemy", function(ent) {
				var obj = ent[0].obj;
				if (obj != null)
					obj.onDamage(bullet);
				this.destroy();
			});
			//Crafty.audio.play("shot1",1,0.8);
		}
	}
});


