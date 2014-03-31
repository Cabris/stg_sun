










Crafty.c("Pattern", {
	shots : 0,
	shotInterval : 0,
	shotRange:0,
	shotAngle : 0,
	b_frameCount:0,//
	loop:0,//
	init : function() {
		this.b_frameCount = 0;
		this.loopCount=0;
		return this;
	}
});


//3發 扇形方向 等速
Crafty.c("Pattern1", {
	init : function() {
		this.requires("Pattern");
		this.shots=3;
		this.shotInterval=20;
		this.shotRange=20;
		this.shotAngle=90;
		this.bind("EnterFrame", this.onUpdate);
		return this;
	},
	onUpdate : function(frame) {
		this.b_frameCount++;
		if (this.frameCount % this.shotInterval == 0&&(this.loopCount<this.loop||this.loop<0)) {
			this.loopCount++;			
			var intervalAngle=this.shotRange/this.shots;
			for (var i = 0; i < this.shots; i++) {
				var angle = (this.shotAngle+i*intervalAngle)-(this.shotRange/2);
				var v = 250;
				var bullet = createBullet(2, 1);
				bullet.v = v;
				bullet.shotRotation = angle;
				bullet.setPos(this.x+this.w/2, this.y+this.h/2);
				bullet.onHit("Player", function(ent) {
					this.destroy();
				});
			}
		}
	},
});

//8發 扇形方向 隨機速度
Crafty.c("Pattern2", {
	shots : 8,
	shotInterval : 20,
	shotRange:15,
	shotAngle : 90,
	b_frameCount:0,
	loop:4,
	init : function() {
		this.b_frameCount = 0;
		this.bind("EnterFrame", this.onUpdate);
		this.loopCount=0;
		return this;
	},
	onUpdate : function(frame) {
		this.b_frameCount++;
		if (this.frameCount % this.shotInterval == 0&&(this.loopCount<this.loop||this.loop<0)) {
			this.loopCount++;			
			var intervalAngle=this.shotRange/this.shots;
			for (var i = 0; i < this.shots; i++) {
				var angle = (this.shotAngle+i*intervalAngle)-(this.shotRange/2);
				var v = Crafty.math.randomInt(200,250);
				var bullet = createBullet(2, 1);
				bullet.v = v;
				bullet.shotRotation = angle;
				bullet.setPos(this.x+this.w/2, this.y+this.h/2);
				bullet.onHit("Player", function(ent) {
					this.destroy();
				});
				this.onBulletCreated(bullet);
			}
		}
	},
	onBulletCreated:function(_bullet){}
});






