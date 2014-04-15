
PixiSprite = function(name) {
	this.name = name;
	this.sprite = null;
	//console.log(name+"::new");
};

PixiSprite.prototype.init = function() {
	 this.sprite = PIXI.Sprite.fromFrame(this.name);
	/////neck
	this.requires("2D");
	//this.uniqueBind("NewComponent", this.addSprite);
	this.addSprite(this.name);
	//this.uniqueBind("RemoveComponent", this.removeSprite);
	this.bind("Remove", this.removeSprite);
	this.bind("EnterFrame", this.updateSprite);
	this.w = this.sprite.width;
	this.h = this.sprite.height;
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.position.x = -5000;
	this.sprite.position.y = -5000;
	//onsole.log("init");
	return this;
};
PixiSprite.prototype.addSprite = function(c) {
	//console.log("addSprite:" + c + "::" + this.name);
	if (contains(c, this.name)) {
		//console.log("addSprite:" + this.name);
		AddSprite(this.sprite);
	}
};
PixiSprite.prototype.removeSprite = function(c) {
	//console.log("removeSprite:" + c + "::" + this.name);
	if ( typeof c == "undefined" || contains(c, this.name)) {
		//console.log("removeSprite:" + this.name);
		RemoveSprite(this.sprite);
	}
};
PixiSprite.prototype.updateSprite = function(frame) {
	this.sprite.position.x = this.x;
	this.sprite.position.y = this.y;
	this.sprite.alpha = this.alpha;
	this.sprite.z = this.z;
	this.sprite.rotation = Crafty.math.degToRad(this.rotation);

	if (this.has("Collision")) {
		var hw = this.w / 2;
		var hh = this.h / 2;
		var p = new Crafty.polygon([hw, -hh], [hw, hh], [-hw, hh], [-hw, -hh]);
		var c = new Crafty.circle(0, 0, this.w / 2);
		this.collision(p);
	}
};

function AddSprite(sprite) {
	if (!PixiSpriteBatch.children.contains(sprite))
		PixiSpriteBatch.addChild(sprite);
}

function RemoveSprite(sprite) {
	if (PixiSpriteBatch.children.contains(sprite))
		PixiSpriteBatch.removeChild(sprite);
}

function GetSprite(id) {

}

function CraetePixiSprite(name) {
	Crafty.c(name, new PixiSprite(name));
}

function contains(a, b) {
	return a.indexOf(b) != -1;
};


