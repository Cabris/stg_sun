//散彈 瞄自機
p1 = function() {
};
p1.prototype = new ShotPattern();
p1.prototype.onInited = function() {
	this.addComponent("PlayerAim");
	this.loop = 5;
	this.shotAngle = this.aimPlayerAngle();
	this.shots = 4;
	this.bulletId = 1;
};
p1.prototype.onEachShot = function(frame, i) {
	var angle = (this.shotAngle + i * this.intervalAngle) - (this.shotRange / 2);
	var v = 250;
	var bullet = createBulletById("bullet_" + this.bulletId);
	bullet.addComponent("EnemyBullet");
	bullet.v = Crafty.math.randomInt(200, 250);
	bullet.moveAngle = angle;
	bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
	return bullet;
};

//瞄自機
var p2 = function() {
};
p2.prototype = new ShotPattern();
p2.prototype.init = function() {
	var _this = ShotPattern.prototype.init.call(this);
	this.loop = 20;
	this.shots = 3;
	this.shotInterval = 10;
	this.addComponent("PlayerAim");
	this.bulletId = 91;
	return _this;
};
p2.prototype.onEachShot = function(frame, i) {
	var angle = this.aimPlayerAngle() + Crafty.math.randomInt(-10, 10);
	var v = 150;
	var bullet = createBulletById("bullet_" + this.bulletId);
	bullet.addComponent("EnemyBullet");
	bullet.v = v;
	bullet.a = 5;
	bullet.moveAngle = angle;
	bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
	return bullet;
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
	this.bulletId = 61;
	//this.addComponent("PlayerAim");
	return _this;
};
p3.prototype.onEachShot = function(frame, i) {
	var angle = (this.shotAngle + i * this.intervalAngle) - (this.shotRange / 2);
	var v = 250;
	var bullet = createBulletById("bullet_" + this.bulletId);
	bullet.addComponent("EnemyBullet");
	bullet.v = v;
	bullet.moveAngle = angle;
	bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
	return bullet;
};

//tracking
var p4 = function() {
};
p4.prototype = new ShotPattern();
p4.prototype.init = function() {
	var _this = ShotPattern.prototype.init.call(this);
	this.loop = 5;
	this.shots = 15;
	this.shotRange = 150;
	this.shotAngle = -90;
	this.shotInterval = 15;
	this.bulletId = 91;
	//this.addComponent("PlayerAim");
	return _this;
};
p4.prototype.onEachShot = function(frame, i) {
	var angle = (this.shotAngle + i * this.intervalAngle) - (this.shotRange / 2);
	var v = randomInt(250, 300);
	var bullet = createBulletById("bullet_" + this.bulletId);
	bullet.addComponent("EnemyBullet");
	bullet.v = v;

	bullet.moveAngle = angle;
	bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);

	bullet.addComponent("TrackBullet");
	bullet.startTrackTime = 20;
	bullet.endTrackTime = 80;
	bullet.diffRange = 5;
	return bullet;
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
	this.bulletId = 21;
	return _this;
};
p5.prototype.onEachShot = function(frame, i) {

	var angle = (this.shotAngle + i * this.intervalAngle) - (this.shotRange * 0.5);
	var v = 150;
	if (i >= this.shots) {
		v = 120;
		angle = (this.shotAngle + i * intervalAngle) - (this.shotRange * 0.5) + intervalAngle * 0.5;
	}
	var bullet = createBulletById("bullet_" + this.bulletId);
	bullet.addComponent("EnemyBullet");
	bullet.v = v;
	bullet.moveAngle = angle;
	bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
	//bullet.aR=0.001;
	return bullet;
};

//naruto
var p6 = function() {
};
p6.prototype = new ShotPattern();
p6.prototype.init = function() {
	var _this = ShotPattern.prototype.init.call(this);
	this.loop = 30;
	this.shots = 20;
	this.shotRange = 360;
	this.shotAngle = 90;
	this.shotInterval = 15;
	this.bulletId = 81;
	return _this;
};
p6.prototype.onEachShot = function(frame, i) {
	var da = this.loopCount * 25;
	var angle = (this.shotAngle + i * this.intervalAngle) - (this.shotRange * 0.5) + da;
	var v = 200;
	var bullet = createBulletById("bullet_" + this.bulletId);
	bullet.addComponent("EnemyBullet");
	bullet.v = v;
	bullet.moveAngle = angle;
	bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
	return bullet;
};

//wave
var p7 = function() {
};
p7.prototype = new ShotPattern();
p7.prototype.init = function() {
	var _this = ShotPattern.prototype.init.call(this);
	this.loop = 50;
	this.shots = 1;
	this.shotRange = 70;
	this.shotAngle = 90;
	this.shotInterval = 5;
	this.bulletId = 151;
	this.waves = 2;
	return _this;
};
p7.prototype.onEachShot = function(frame, i) {
	var l = Math.sin(this.waves * Math.PI * 2 * this.loopCount / this.loop);
	var da = l * 20;
	var halfRange = this.shotRange * 0.5;
	if (this.shots == 1)
		halfRange = 0;
	var angle = (this.shotAngle + i * this.intervalAngle) - halfRange + da;
	var v = 200;
	var bullet = createBulletById("bullet_" + this.bulletId);
	bullet.addComponent("EnemyBullet");
	bullet.v = v;
	bullet.moveAngle = angle;
	bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
	return bullet;
};

Crafty.c("p1", new window["p1"]());
Crafty.c("p2", new window["p2"]());
Crafty.c("p3", new window["p3"]());
Crafty.c("p4", new window["p4"]());
Crafty.c("p5", new window["p5"]());
Crafty.c("p6", new window["p6"]());
Crafty.c("p7", new window["p7"]());
