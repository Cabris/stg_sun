Crafty.c("Enemy", {
	v : 0,
	a : 0,
	speedr : 0,
	aR : 0,
	hp : 10,
	preparing : false,
	init : function() {
		this.requires("2D,Canvas,Collision").bind("EnterFrame", function(frame) {
			if(insideView(this)&&this.preparing){
				this.preparing=false;
			}
			
			if (!insideView(this)|| this.hp <= 0) {
				if (!this.preparing) {
					this.destroy();
				}
			}
			var dt = frame.dt / 1000.0;
			//console.log(dt);
			this.speedr += this.aR;
			this.xspeed = this.v * Math.cos(this._rotation / (180 / Math.PI)) * dt;
			this.yspeed = this.v * Math.sin(this._rotation / (180 / Math.PI)) * dt;
			this.v += this.a;

			this.x = this._x + this.yspeed;
			this.y = this._y - this.xspeed;
			this.rotation = this._rotation + this.speedr;

		});
		this.x = 0;
		this.y = 0;
		this.z = zIndex.Enemy;
		this.preparing=true;
		return this;
	},
	setPos : function(_x, _y) {
		this.attr({
			x : _x - this.w / 2,
			y : _y - this.h / 2
		});
	},
	onDamage : function(bullet) {
		this.hp -= bullet.weapon.ap;
		//console.log(this.hp);
		Crafty.audio.play("enemy_vanish1", 1, 0.8);
	}
}); 