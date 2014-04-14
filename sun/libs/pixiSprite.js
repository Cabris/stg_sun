PixiSprite = function(name) {
	this.name = name;
	this.sprite = null;

	this.init = function() {
		this.sprite = PIXI.Sprite.fromFrame(this.name);
		this.requires("2D");
		this.uniqueBind("NewComponent", this.addSprite);
		this.uniqueBind("RemoveComponent", this.removeSprite);
		this.uniqueBind("Remove", this.removeSprite);
		this.uniqueBind("EnterFrame", this.updateSprite);
		return this;
	};
	this.addSprite = function(c) {
		//console.log("addSprite:" + c + "::" + this.name);
		if (contains(c, this.name)) {
			console.log("addSprite:" + this.name);
			PixiSpriteBatch.addChild(this.sprite);
		}
	};
	this.removeSprite = function(c) {
		//console.log("removeSprite:" + c + "::" + this.name);
		if (typeof c == "undefined"||contains(c, this.name)) {
			console.log("removeSprite:" + this.name);
			PixiSpriteBatch.removeChild(this.sprite);
		}
	};
	this.updateSprite = function(frame) {
		this.w = this.sprite.width;
		this.h = this.sprite.height;
		this.sprite.position.x = this.x;
		this.sprite.position.y = this.y;
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.sprite.alpha = this.alpha;
		this.sprite.z =  this.z;
		this.sprite.rotation =  Crafty.math.degToRad(this.rotation);
	};
};

function CraetePixiSprite(name) {
	Crafty.c(name, new PixiSprite(name));
}

function contains(a, b) {
	return a.indexOf(b) != -1;
};

