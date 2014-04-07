//散彈 瞄自機
p1 = function() {
};
p1.prototype = new ShotPattern();
p1.prototype.onInited = function() {
	this.addComponent("PlayerAim");
	this.loop = 5;
	this.shotAngle = this.aimPlayerAngle();
	this.shots = 4;
	this.bulletId=1;
};
p1.prototype.onEachShot = function(frame) {
	console.log("p1.prototype.onUpdate" + this.loop);
	var intervalAngle = this.shotRange / this.shots;
	for (var i = 0; i < this.shots; i++) {
		var angle = (this.shotAngle + i * intervalAngle) - (this.shotRange / 2);
		var v = 250;
		var bullet = createBulletById("bullet_"+this.bulletId);
		bullet.addComponent("EnemyBullet");
		bullet.v = Crafty.math.randomInt(200, 250);
		bullet.moveAngle = angle;
		bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
	}
};

//瞄自機
var p2 = function() {
};
p2.prototype = new ShotPattern();
p2.prototype.init = function() {
	var _this = ShotPattern.prototype.init.call(this);
	this.loop = 30;
	this.shots = 1;
	this.shotInterval = 3;
	this.addComponent("PlayerAim");
	this.bulletId=91;
	return _this;
};
p2.prototype.onEachShot = function(frame) {
	var intervalAngle = this.shotRange / this.shots;
	console.log("p2.prototype.onUpdate:" + this.loop);
	for (var i = 0; i < this.shots; i++) {
		var angle = this.aimPlayerAngle();
		var v = 150;
		var bullet = createBulletById("bullet_"+this.bulletId);
		bullet.addComponent("EnemyBullet");
		bullet.v = v;
		bullet.a=10;
		bullet.moveAngle = angle;
		bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
	}
};

//360
var p3 = function() {
};
p3.prototype = new ShotPattern();
p3.prototype.init = function() {
	var _this = ShotPattern.prototype.init.call(this);
	this.loop = 10;
	this.shots = 25;
	this.shotRange = 360;
	this.shotAngle = 90;
	this.shotInterval = 5;
	this.bulletId=61;
	//this.addComponent("PlayerAim");
	return _this;
};
p3.prototype.onEachShot = function(frame) {

	var intervalAngle = this.shotRange / this.shots;
	console.log("p3.prototype.onUpdate:" + this.loop);
	for (var i = 0; i < this.shots; i++) {
		var angle = (this.shotAngle + i * intervalAngle) - (this.shotRange / 2);
		var v = 250;
		var bullet = createBulletById("bullet_"+this.bulletId);
		bullet.addComponent("EnemyBullet");
		bullet.v = v;
		bullet.moveAngle = angle;
		bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
	}
};

//sin
var p4 = function() {
};
p4.prototype = new ShotPattern();
p4.prototype.init = function() {
	var _this = ShotPattern.prototype.init.call(this);
	this.loop = 5;
	this.shots = 15;
	this.shotRange = 180;
	this.shotAngle = -90;
	this.shotInterval = 15;
	this.bulletId=91;
	//this.addComponent("PlayerAim");
	return _this;
};
p4.prototype.onEachShot = function(frame) {

	var intervalAngle = this.shotRange / this.shots;
	console.log("p3.prototype.onUpdate:" + this.loop);
	for (var i = 0; i < this.shots; i++) {
		var angle = (this.shotAngle + i * intervalAngle) - (this.shotRange / 2);
		var v = 250;
		var bullet = createBulletById("bullet_"+this.bulletId);
		bullet.addComponent("EnemyBullet");
		bullet.v = v;
		
		bullet.moveAngle = angle;
		bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
		
		bullet.addComponent("TrackBullet");
		bullet.startTrackTime=20;
		bullet.endTrackTime=120;
		
		
	}
};

//360 x2
var p5 = function() {
};
p5.prototype = new ShotPattern();
p5.prototype.init = function() {
	var _this = ShotPattern.prototype.init.call(this);
	this.loop = 5;
	this.shots = 20;
	this.shotRange = 360;
	this.shotAngle = 90;
	this.shotInterval = 50;
	this.bulletId=21;
	return _this;
};
p5.prototype.onEachShot = function(frame) {

	var intervalAngle = this.shotRange / this.shots;
	console.log("p3.prototype.onUpdate:" + this.loop);
	for (var i = 0; i < this.shots * 2; i++) {
		var angle = (this.shotAngle + i * intervalAngle) - (this.shotRange / 2);
		var v = 100;
		if (i >= this.shots)
			v = 90;
		var bullet = createBulletById("bullet_"+this.bulletId);
		bullet.addComponent("EnemyBullet");
		bullet.v = v;
		bullet.moveAngle = angle;
		bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
	}
};






Crafty.c("p1", new window["p1"]());
Crafty.c("p2", new window["p2"]());
Crafty.c("p3", new window["p3"]());
Crafty.c("p4", new window["p4"]());
Crafty.c("p5", new window["p5"]());
