ShotPattern = function() {
	this.shots = 0;
	this.shotInterval = 0;
	this.shotRange = 0;
	this.shotAngle = 0;
	this.frameCount = 0;
	this.loop = 0;
	this.loopCount = 0;
};
ShotPattern.prototype.init = function() {
	console.log(1);
	this.shots = 3;
	this.shotInterval = 20;
	this.shotRange = 20;
	this.shotAngle = 90;
	this.loop = 5;
	this.bind("EnterFrame", this.onUpdate);
	return this;
};

ShotPattern.prototype.onUpdate = function(frame) {
	this.frameCount+=1;
};

p1 = function() {
};
p1.prototype = new ShotPattern();
p1.prototype.init = function() {
	var _this = ShotPattern.prototype.init.call(this);
	this.loop = 10;
	this.shots=8;
	return _this;
};

p1.prototype.onUpdate = function(frame) {
	if (this.frameCount % this.shotInterval == 0 
		&& (this.loopCount < this.loop 
			|| this.loop < 0)) {
		this.loopCount++;
		console.log(2);
		var intervalAngle = this.shotRange / this.shots;
		for (var i = 0; i < this.shots; i++) {
			var angle = (this.shotAngle + i * intervalAngle) - (this.shotRange / 2);
			var v = 250;
			var bullet = createBullet(2, 2);
			bullet.v = Crafty.math.randomInt(200, 250);;
			bullet.shotRotation = angle;
			bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
			bullet.onHit("Player", function(ent) {
				this.destroy();
			});
		}
	}
	ShotPattern.prototype.onUpdate.call(this,frame);	
};

Crafty.c("Pattern0", new p1());

// //3發 扇形方向 等速
// Crafty.c("Pattern1", {
// init : function() {
// this.requires("Pattern");
// this.shots = 3;
// this.shotInterval = 20;
// this.shotRange = 20;
// this.shotAngle = 90;
// this.bind("EnterFrame", this.onUpdate);
// return this;
// },
// onUpdate : function(frame) {
// this.b_frameCount++;
// if (this.frameCount % this.shotInterval == 0 && (this.loopCount < this.loop || this.loop < 0)) {
// this.loopCount++;
// var intervalAngle = this.shotRange / this.shots;
// for (var i = 0; i < this.shots; i++) {
// var angle = (this.shotAngle + i * intervalAngle) - (this.shotRange / 2);
// var v = 250;
// var bullet = createBullet(2, 1);
// bullet.v = v;
// bullet.shotRotation = angle;
// bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
// bullet.onHit("Player", function(ent) {
// this.destroy();
// });
// }
// }
// }
// });
//
// //8發 扇形方向 隨機速度
// Crafty.c("Pattern2", {
// shots : 8,
// shotInterval : 20,
// shotRange : 15,
// shotAngle : 90,
// b_frameCount : 0,
// loop : 4,
// init : function() {
// this.b_frameCount = 0;
// this.bind("EnterFrame", this.onUpdate);
// this.loopCount = 0;
// return this;
// },
// onUpdate : function(frame) {
// this.b_frameCount++;
// if (this.frameCount % this.shotInterval == 0 && (this.loopCount < this.loop || this.loop < 0)) {
// this.loopCount++;
// var intervalAngle = this.shotRange / this.shots;
// for (var i = 0; i < this.shots; i++) {
// var angle = (this.shotAngle + i * intervalAngle) - (this.shotRange / 2);
// var v = Crafty.math.randomInt(200, 250);
// var bullet = createBullet(2, 1);
// bullet.v = v;
// bullet.shotRotation = angle;
// bullet.setPos(this.x + this.w / 2, this.y + this.h / 2);
// bullet.onHit("Player", function(ent) {
// this.destroy();
// });
// this.onBulletCreated(bullet);
// }
// }
// },
// onBulletCreated : function(_bullet) {
// }
// });

