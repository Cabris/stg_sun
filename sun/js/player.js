Crafty.c("Player", {
	isFire : false,
	isSlow : false,
	weapon : null,
	playerCollision : null,
	movementSpeed : 8,
	preparing : false,
	center : {
		x : 0,
		y : 0
	},
	init : function() {

		this.requires("2D,Canvas,Multiway,Keyboard,player.png")//Add needed Components
		.multiway(this.movementSpeed, this.moveControls).origin("center").bind('Moved', function(from) {/*Bind a function which is triggered if player is moved*/
			/*Dont allow to move the player out of Screen*/
			if (this.x + this.w > Crafty.viewport.width//r
			|| this.x < 0//l
			|| this.y < 30//t
			|| this.y + this.h > Crafty.viewport.height - 30//d
			|| this.preparing) {
				this.attr({
					x : from.x,
					y : from.y
				});
			}
		}).bind("EnterFrame", function(frame) {
			this.preparing = false;
			if (this.isFire) {
				if (this.weapon != null)
					this.weapon.shot();
			}
			this.rotation += 0.5;
			if (this.isSlow) {
				this.multiway(this.movementSpeed * 0.45, this.moveControls);
			} else {
				this.multiway(this.movementSpeed, this.moveControls);
			}
			this.center.x = this.x + this.w / 2;
			this.center.y = this.y + this.h / 2;
			//console.log(this.center);
		}).bind("KeyDown", function(e) {
			if (e.keyCode === Crafty.keys.SPACE) {
				this.isFire = true;
			}
			if (e.keyCode === Crafty.keys.SHIFT) {
				this.isSlow = true;
			}
		}).bind("KeyUp", function(e) {
			if (e.keyCode === Crafty.keys.SPACE) {
				this.isFire = false;
			}
			if (e.keyCode === Crafty.keys.SHIFT) {
				this.isSlow = false;
			}
		}).reset();
		this.z = zIndex.Player;
		this.playerCollision = Crafty.e("PlayerCollider", "MySprite", "Collision", "sprite_player_collision");
		this.playerCollision.x = this.center.x - this.playerCollision.w / 2;
		this.playerCollision.y = this.center.y - this.playerCollision.h / 2;
		this.playerCollision.z = zIndex.PlaterCollider;
		this.attach(this.playerCollision);

		return this;
	},
	reset : function() {
		Crafty.trigger("UpdateStats");
		this.setPos(Crafty.viewport.width / 2, Crafty.viewport.height - 100);
		this.center.x = this.x + this.w / 2;
		this.center.y = this.y + this.h / 2;
		this.preparing = true;
		//this.alpha=0;
	},
	setWeapon : function(_weapon) {
		this.weapon = _weapon;
		this.attach(this.weapon);
		_weapon.x = this.center.x;
		_weapon.y = this.center.y - 20;
		_weapon.rotation = -90;
		//this.weapon.onWeaponAttached(this);
	},
	setPos : function(cx, cy) {
		this.x = cx - this.w / 2;
		this.y = cy - this.h / 2;
		this.center.x = cx;
		this.center.y = cy;
	},
	moveControls : {
		UP_ARROW : -90,
		DOWN_ARROW : 90,
		RIGHT_ARROW : 0,
		LEFT_ARROW : 180,
		W : -90,
		S : 90,
		D : 0,
		A : 180
	}
});

