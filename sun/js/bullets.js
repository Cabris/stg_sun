var Bullet = function() {
	this.isActive = false;
	this.moveAngle = 0;
	this.v = 0;
	this.a = 0;
	this.speedR = 0;
	this.aR = 0;
	this.weapon = null;
	this.frameCount = 0;
};
Bullet.prototype.setActive = function(isActive) {
	this.isActive = isActive;
	if (!this.isActive) {
		this.x = 50;
		this.y = 50;
		this.removeComponent("Collision");
		this.destroy();
	}
};
Bullet.prototype.init = function() {
	this.requires("2D,Collision");
	this.bind("EnterFrame", this.onUpdate);
	this.z = zIndex.Bullet;
	this.setActive(true);
	return this;
};
Bullet.prototype.reset = function() {
	this.setActive(true);
	this.moveAngle = 0;
	this.v = 0;
	this.a = 0;
	this.speedR = 0;
	this.aR = 0;
	this.weapon = null;
	this.frameCount = 0;
};
Bullet.prototype.onUpdate = function(frame) {
	if (!insideView(this)) {
		this.setActive(false);
	}
	if (this.isActive) {
		var dt = frame.dt / 1000.0;
		this.rotation = this.moveAngle + 90;
		this.speedR += this.aR;
		this.xspeed = this.v * Math.cos(this.moveAngle / (180 / Math.PI)) * dt;
		this.yspeed = this.v * Math.sin(this.moveAngle / (180 / Math.PI)) * dt;
		this.v += this.a;
		this.x = this._x + this.xspeed;
		this.y = this._y + this.yspeed;
		this.moveAngle += this.speedR;
		this.frameCount++;
	}
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
		this.setActive(false);
	});
	return this;
};
EnemyBullet.prototype.toPoint = function() {
	var point = Crafty.e(Com.point);
	point.x = this.x;
	point.y = this.y;
	this.setActive(false);
};

Crafty.c(Com.enemyBullet, new EnemyBullet());

function createPlayerBullet(mx, my) {//3,2
	// var bullet = Crafty.e("Bullet", "sprite_bullet_normal", "SpriteAnimation").origin("center");
	// bullet.reel("normal_bullet_colors", 0, mx, my, 1).animate("normal_bullet_colors", 1);
	
	var bullet = Crafty.e("Bullet", "pBullet_2");
	//bullet.reel("normal_bullet_colors", 0, mx, my, 1).animate("normal_bullet_colors", 1);
	bullet.v = 1200;
	return bullet;
}

function createEnemyBullet(id) {//3,2
	//var bullet=createPlayerBullet(0,0);
	//var bullet = BulletManager.getBullet(id);
	//id="playerCollision.png";
	var bullet = Crafty.e("Bullet", id);
	return bullet;
}
/*
var Bullets = function() {
	this.maxBulletEachType = 300;
	this.bulletPools = {};
	// this.freePool = [];
	// this.busyPool = [];
	this.init = function() {
	};
};
Bullets.prototype.createBullet = function(id) {
	var bullet = Crafty.e("Bullet", id).origin("center");
	this.bulletPools[id].push(bullet);
	console.log("craete: " + id + ", p: " + this.bulletPools[id].length);
	return bullet;
};
Bullets.prototype.getBullet = function(id) {//get a free bullet
	this.upDatePool();
	if (!this.bulletPools.hasOwnProperty(id)) {
		this.bulletPools[id] = [];
		//console.log("hasOwnProperty: " + id);
		for (var i = 0; i < this.maxBulletEachType; i++) {
			var _bullet = this.createBullet(id);
			_bullet.setActive(false);
		}
	}
	var bullet = null;
	if (hasFreeBullet(this.bulletPools, id)) {
		bullet = findFirstFreeBullet(this.bulletPools, id);
		bullet.reset();
		console.log("reuse: " + id + ", p: " + this.bulletPools[id].length);
	} else {
	//	bullet = this.createBullet(id);
		bullet = this.bulletPools[id][0];
		//console.log(bullet);
		bullet.reset();

	}
	return bullet;
};
Bullets.prototype.upDatePool = function() {
	//this.busyPool = [];
	//this.freePool = [];

	// for (var i = 0; i < this.bulletPool.length; i++) {
	// var b = this.bulletPool[i];
	// if (b.isActive) {//add to busy
	// if (!this.busyPool.contains(b))
	// this.busyPool.push(b);
	// if (this.freePool.contains(b))
	// remove(this.freePool,b);
	// } else {//add to free
	// if (!this.freePool.contains(b))
	// this.freePool.push(b);
	// if (this.busyPool.contains(b))
	// remove(this.busyPool,b);
	// }
	// }
};

function hasFreeBullet(pools, id) {
	//console.log(id);
	var pool = pools[id];
	var t = false;
	for (var i = 0; i < pool.length; i++) {
		var b = pool[i];
		//console.log(b.name);
		if (b.name == id && !b.isActive)
			t = true;
	}
	//console.log("hasBullet: " + t);
	return t;
}

function findFirstFreeBullet(pools, id) {
	var bullet = null;
	var pool = pools[id];
	for (var i = 0; i < pool.length; i++) {
		var b = pool[i];
		if (b.name == id && !b.isActive) {
			bullet = b;
			return bullet;
		}
	}
	return bullet;
}



var BulletManager = new Bullets();
*/























