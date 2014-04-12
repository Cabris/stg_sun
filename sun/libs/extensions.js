function createEnemyBullet(mx, my) {//3,2
	var bullet = Crafty.e("EnemyBullet", "sprite_bullet_normal", "SpriteAnimation").origin("center");
	bullet.reel("normal_bullet_colors", 0, mx, my, 1).animate("normal_bullet_colors", 1);
	bullet.v = 1200;
	//console.log("10");
	return bullet;
}

function createBullet(mx, my) {//3,2
	var bullet = Crafty.e("Bullet", "sprite_bullet_normal", "SpriteAnimation").origin("center");
	bullet.reel("normal_bullet_colors", 0, mx, my, 1).animate("normal_bullet_colors", 1);
	bullet.v = 1200;
	//console.log("10");
	return bullet;
}

function createBulletById(id) {//3,2
	var bullet = Crafty.e("Bullet", id).origin("center");
	//bullet.reel("normal_bullet_colors", 0, mx, my, 1).animate("normal_bullet_colors", 1);
	bullet.v = 1200;
	var circle = new Crafty.circle(this.w / 2, this.h / 2, this.w * 0.5);
	bullet.collision(circle);
	//console.log("created: "+id);
	return bullet;
}

function loadBulletSprite() {
	var path = "images/bullet/kuushot.png";
	var shotMap = {};
	for (var key in shotDatas) {
		var s = shotDatas[key];
		var r = s.Rect;
		//console.log(r);
		shotMap["bullet_" + s.Id] = [r.x, r.y, r.w, r.h];
	}
	Crafty.sprite(game_path + path, shotMap);
}

Crafty.c("PlayerAim", {
	init : function() {
		this.requires("2D");
		return this;
	},
	aimPlayerAngle : function() {
		var player = Crafty("Player");
		var playerAngle = Crafty.math.radToDeg(Math.atan2(player.center.y - this.y, player.center.x - this.x));
		//console.log("aimPlayerAngle: " + playerAngle);
		return playerAngle;
	}
});

Crafty.c("TrackBullet", {
	startTrackTime : 0,
	endTrackTime : 0,
	diffRange : 10,
	init : function() {
		this.requires("Bullet,PlayerAim");
		this.bind("EnterFrame", this.track);
		this.diff = Crafty.math.randomInt(-this.diffRange, this.diffRange);
		this.bind("RemoveComponent", function(component) {
			if (component == "TrackBullet")
				this.unbind("EnterFrame", this.track);
		});
		return this;
	},
	track : function(frame) {
		if (this.frameCount > this.startTrackTime && this.frameCount < this.endTrackTime) {
			this.moveAngle = this.aimPlayerAngle() + this.diff;
		}
		if (this.frameCount >= this.endTrackTime) {
			this.unbind("EnterFrame", this.track);
			this.removeComponent("TrackBullet");
		}
	}
});

function randomInt(a, b) {
	return Crafty.math.randomInt(a, b);
}

function insideView(obj) {
	var t = obj.x > Crafty.viewport.width + obj.w 
	|| obj.x < -obj.w 
	|| obj.y < -obj.h 
	|| obj.y > Crafty.viewport.height + obj.h;
	//console.log(!t);
	return !t;
}





