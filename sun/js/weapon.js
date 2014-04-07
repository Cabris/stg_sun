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
			var bullet = createBullet(3, 2);
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

Crafty.c("Bullet", {
	moveAngle : 0,
	v : 0,
	a : 0,
	speedR : 0,
	aR : 0,
	weapon : null,
	frameCount : 0,
	init : function() {
		this.requires("2D,Canvas,Collision").bind("EnterFrame", function(frame) {
			if (!insideView(this)) {
				this.destroy();
			}
			var dt = frame.dt / 1000.0;
			this.rotation = this.moveAngle + 90;
			//console.log(dt);
			this.speedR += this.aR;
			this.xspeed = this.v * Math.cos(this.moveAngle / (180 / Math.PI)) * dt;
			this.yspeed = this.v * Math.sin(this.moveAngle / (180 / Math.PI)) * dt;
			this.v += this.a;
			this.x = this._x + this.xspeed;
			this.y = this._y + this.yspeed;
			this.moveAngle += this.speedR;
			this.frameCount++;
		});
		this.z = zIndex.Bullet;
		return this;
	},
	setPos : function(_x, _y) {
		this.attr({
			x : _x - this.w / 2,
			y : _y - this.h / 2
		});
	}
});

Crafty.c(Com.enemyBullet, {
	luncher : null,
	init : function() {
		this.requires("Bullet,Collision");
		this.onHit("PlayerCollider", function(ent) {
			this.destroy();
		});
		return this;
	},
	toPoint : function() {
		var point = Crafty.e(Com.point);
		point.x = this.x;
		point.y = this.y;
		this.destroy();
	}
});
