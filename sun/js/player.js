Crafty.c("Player", {
	keyDown : false,
	weapon : null,
	movementSpeed : 8,
	preparing : false,
	center : {
		x : 0,
		y : 0
	},
	init : function() {

		this.requires("2D,Canvas,Multiway,Keyboard,Collision,sprite_ship1")//Add needed Components
		.multiway(this.movementSpeed, {//Enable Movement Control
			UP_ARROW : -90,
			DOWN_ARROW : 90,
			RIGHT_ARROW : 0,
			LEFT_ARROW : 180,
			W : -90,
			S : 90,
			D : 0,
			A : 180
		}).origin("center").bind('Moved', function(from) {/*Bind a function which is triggered if player is moved*/
			/*Dont allow to move the player out of Screen*/
			if (this.x + this.w  > Crafty.viewport.width//r
			|| this.x  < 0//l
			|| this.y  < 30//t
			|| this.y + this.h  > Crafty.viewport.height - 30//d
			|| this.preparing) {
				this.attr({
					x : from.x,
					y : from.y
				});
			}
		}).bind("EnterFrame", function(frame) {
			this.preparing = false;
			if (this.keyDown) {
				if (this.weapon != null)
					this.weapon.shot();
			}
			this.center.x = this.x + this.w / 2;
			this.center.y = this.y + this.h / 2;
		}).bind("KeyDown", function(e) {
			if (e.keyCode === Crafty.keys.SPACE) {
				this.keyDown = true;
			}
		}).bind("KeyUp", function(e) {
			if (e.keyCode === Crafty.keys.SPACE) {
				this.keyDown = false;
			}
		}).reset();

		// this.sprite = Crafty.e("MySprite", "sprite_ship1");
		// this.sprite.setPos(this.x,this.y);
		// this.attach(this.sprite);

		return this;
	},
	reset : function() {
		Crafty.trigger("UpdateStats");
		this.setPos(Crafty.viewport.width / 2, Crafty.viewport.height - 100);
		this.center.x = this.x + this.w / 2;
		this.center.y = this.y + this.h / 2;
		this.preparing = true;
	},
	setWeapon : function(_weapon) {
		this.weapon = _weapon;
		this.attach(this.weapon);
		_weapon.x = this.center.x;
		_weapon.y = this.center.y - 20;
		_weapon.rotation=-90;
		//this.weapon.onWeaponAttached(this);
	},
	setPos:function(cx,cy){
		this.x=cx- this.w / 2;
		this.y=cy- this.h / 2;
		this.center.x = cx;
		this.center.y = cy;
	}
});

