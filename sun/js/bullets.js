var Bullet = function() {
	this.moveAngle = 0;
	this.v = 0;
	this.a = 0;
	this.speedR = 0;
	this.aR = 0;
	this.weapon = null;
	this.frameCount = 0;
};
Bullet.prototype.init = function() {
	this.requires("2D,Canvas,Collision");
	this.bind("EnterFrame", this.onUpdate);
	this.z = zIndex.Bullet;
	return this;
};
Bullet.prototype.onUpdate = function(frame) {
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
};
Bullet.prototype.setPos = function(_x, _y) {
	this.attr({
		x : _x,
		y : _y
	});
};

Crafty.c("Bullet", new Bullet());

var EnemyBullet = function() {
	this.luncher = null;
};
EnemyBullet.prototype.init = function() {
	this.requires("Bullet,Collision");
	this.onHit("PlayerCollider", function(ent) {
		this.destroy();
	});
	return this;
};
EnemyBullet.prototype.toPoint = function() {
	var point = Crafty.e(Com.point);
	point.x = this.x;
	point.y = this.y;
	this.destroy();
};

Crafty.c(Com.enemyBullet, new EnemyBullet());

// function createEnemyBullet(mx, my) {//3,2
// var bullet = Crafty.e("EnemyBullet", "sprite_bullet_normal", "SpriteAnimation").origin("center");
// bullet.reel("normal_bullet_colors", 0, mx, my, 1).animate("normal_bullet_colors", 1);
// bullet.v = 1200;
// //console.log("10");
// return bullet;
// }

function createPlayerBullet(mx, my) {//3,2
	var bullet = Crafty.e("Bullet", "sprite_bullet_normal", "SpriteAnimation").origin("center");
	bullet.reel("normal_bullet_colors", 0, mx, my, 1).animate("normal_bullet_colors", 1);
	bullet.v = 1200;
	//console.log("10");
	return bullet;
}

function createEnemyBullet(id) {//3,2
	var bullet = Crafty.e("Bullet", id).origin("center");
	//	var bullet = createPlayerBullet(0,0);
	//bullet.reel("normal_bullet_colors", 0, mx, my, 1).animate("normal_bullet_colors", 1);
	bullet.v = 1200;
	//var circle = new Crafty.circle(0, 0, this.w * 0.5);
	//bullet.collision(circle);
	//console.log("created: "+id);
	return bullet;
}

var Bullets = {
	bulletPool : {},
	createBullet:function(){}
	
	
	
};

