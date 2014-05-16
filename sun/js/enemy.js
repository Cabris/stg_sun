var Enemy = function() {
	this.v = 0;
	this.a = 0;
	this.speedr = 0;
	this.aR = 0;
	this.hp = 10;
	this.preparing = false;
};

Enemy.prototype.init = function() {
	this.requires("2D,Collision").bind("EnterFrame", this.onUpDate);
	this.x = 0;
	this.y = 0;
	this.z = zIndex.Enemy;
	this.preparing = true;
	return this;
};
Enemy.prototype.onUpDate = function(frame) {
	if (insideView(this) && this.preparing) {
		this.preparing = false;
	}

	if (!insideView(this) || this.hp <= 0) {
		if (!this.preparing) {
			for (var i = 0; i < this._children.length; i++) {
				if (this._children[i].destroy) {
					this._children[i].destroy();
				}
				this.detach(this._children[i]);
			}
			///hitbox bug
			// var p = new Crafty.polygon([-5000, -5000], [-5000, -5000], [-5000, -5000]);
			// this.collision(p);
			this.x=-5000;
			this0y=-5000;
			this.removeComponent("Collision");
			this.destroy();
			this.detach(this.map);
			delete this.map;
			console.log("destroy");
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

};

Enemy.prototype.setPos = function(_x, _y) {
	this.attr({
		x : _x,
		y : _y
	});
};
Enemy.prototype.onDamage = function(bullet) {
	this.hp -= bullet.weapon.ap;
	//console.log(this.hp);
	Crafty.audio.play("enemy_vanish1", 1, 0.8);
};

Crafty.c("Enemy", new Enemy());
