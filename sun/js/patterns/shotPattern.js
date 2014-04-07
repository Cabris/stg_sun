ShotPattern = function() {
	this.shots = 0;
	this.shotInterval = 0;
	this.shotRange = 0;
	this.shotAngle = 0;
	this.frameCount = 0;
	this.loop = 0;
	this.loopCount = 0;
	this.luncher = null;
	this.bulletId=1;
};
ShotPattern.prototype.onInited=function(){};
ShotPattern.prototype.setLuncher = function(luncher) {
	this.addComponent("2D");
	this.luncher = luncher;
	this.x = luncher.x;
	this.y = luncher.y;
	this.w = luncher.w;
	this.h = luncher.h;
	this.onInited();
};
ShotPattern.prototype.init = function() {
	this.shots = 3;
	this.shotInterval = 20;
	this.shotRange = 20;
	this.shotAngle = 90;
	this.loop = 5;
	this.bind("EnterFrame", this.onUpdate);
	//this.addComponent("PlayerAim");
	return this;
};
ShotPattern.prototype.onEachShot = function(frame) {
};
ShotPattern.prototype.onUpdate = function(frame) {
	if (this.frameCount % this.shotInterval == 0 && (this.loopCount < this.loop || this.loop < 0)) {
		this.onEachShot(frame);
		this.loopCount++;
	}
	this.frameCount += 1;
	if (this.loopCount >= this.loop) {
		this.destroy();
	}
	this.x = this.luncher.x;
	this.y = this.luncher.y;
	this.w = this.luncher.w;
	this.h = this.luncher.h;
};
