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
Bullet.prototype.setActive=function(isActive){
	this.isActive = isActive;
	if (!this.isActive) {
		this.x = -5000;
		this.y = -5000;
	}
};
Bullet.prototype.init = function() {
	this.requires("2D,Canvas,Collision");
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
	var bullet = Crafty.e("Bullet", "sprite_bullet_normal", "SpriteAnimation").origin("center");
	bullet.reel("normal_bullet_colors", 0, mx, my, 1).animate("normal_bullet_colors", 1);
	bullet.v = 1200;
	//console.log("10");
	return bullet;
}

function createEnemyBullet(id) {//3,2
	//var bullet = Crafty.e("Bullet", id).origin("center");
	var bullet = BulletManager.getBullet(id);
	//console.log(bullet);
	//	var bullet = createPlayerBullet(0,0);
	//bullet.reel("normal_bullet_colors", 0, mx, my, 1).animate("normal_bullet_colors", 1);
	//bullet.v = 1200;
	//var circle = new Crafty.circle(0, 0, this.w * 0.5);
	//bullet.collision(circle);
	//console.log("created: "+id);
	return bullet;
}

var Bullets = function() {
	this.maxBulletEachType = 500;
	this.bulletPool = [];
	this.freePool = [];
	this.busyPool = [];
	this.init = function() {
	};
};
Bullets.prototype.createBullet = function(id) {
	var bullet = Crafty.e("Bullet", id).origin("center");
	this.bulletPool.push(bullet);
	return bullet;
};
Bullets.prototype.getBullet = function(id) {//get a free bullet
	this.upDatePool();
	//console.log("getBullet: " + id);
	var bullet = null;
	if (hasBullet(this.freePool, id)) {
		bullet = findFirstBullet(this.freePool, id);
		bullet.reset();
		console.log("reuse: " + id);
	} else {
		bullet = this.createBullet(id);
		console.log("craete: " + id);
		//console.log(bullet);
	}
	return bullet;
};
Bullets.prototype.upDatePool = function() {
	this.busyPool = [];
	this.freePool = [];
	
	
	
	
	for (var i = 0; i < this.bulletPool.length; i++) {
		var b = this.bulletPool[i];
		if (b.isActive) {//add to busy
			if (!this.busyPool.contains(b))
				this.busyPool.push(b);
		} else {//add to free
			if (!this.freePool.contains(b))
				this.freePool.push(b);
		}
	}
};

function hasBullet(pool, id) {
	//console.log(id);
	var t = false;
	for (var i = 0; i < pool.length; i++) {
		var b = pool[i];
		//console.log(b.name);
		if (b.name == id)
			t = true;
	}
	//console.log("hasBullet: " + t);
	return t;
}

function findFirstBullet(pool, id) {
	var bullet = null;
	for (var i = 0; i < pool.length; i++) {
		var b = pool[i];
		if (b.name == id) {
			bullet = b;
			return bullet;
		}
	}
	return bullet;
}

function remove(arr, item) {
	for (var i = arr.length; i--; ) {
		if (arr[i] === item) {
			arr.splice(i, 1);
		}
	}
}

var BulletManager = new Bullets();
