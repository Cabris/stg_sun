Crafty.c("Player", {
	isFire : false,
	isSlow : false,
	weapon : null,
	playerCollision : null,
	movementSpeed : 8,
	preparing : false,
	init : function() {

		this.requires("2D,Canvas,Multiway,Keyboard,player.png")//Add needed Components
		.multiway(this.movementSpeed, this.moveControls).origin("center").bind('Moved', function(from) {/*Bind a function which is triggered if player is moved*/
			/*Dont allow to move the player out of Screen*/
			if (this.x  > Crafty.viewport.width//r
			|| this.x < 0//l
			|| this.y < 0//t
			|| this.y > Crafty.viewport.height //d
			|| this.preparing) {
				this.attr({
					x : from.x,
					y : from.y
				});
			}
		//	console.log(this.has("Collision"));
		}).bind("EnterFrame", function( ) {
			this.preparing = false;
			if (this.isFire) {
				if (this.weapon != null)
					this.weapon.shot();
			}
			//this.rotation += 0.5;
			if (this.isSlow) {
				this.multiway(this.movementSpeed * 0.45, this.moveControls);
			} else {
				this.multiway(this.movementSpeed, this.moveControls);
			}
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
		this.playerCollision = Crafty.e("PlayerCollider", "Collision", "playerCollision.png","SolidHitBox");
		this.playerCollision.x = this.x;
		this.playerCollision.y = this.y;
		this.playerCollision.z = zIndex.PlaterCollider;
		this.attach(this.playerCollision);

		return this;
	},
	reset : function() {
		Crafty.trigger("UpdateStats");
		this.x = Crafty.viewport.width / 2;
		this.y = Crafty.viewport.height - 100;
		this.preparing = true;
		//this.alpha=0;
	},
	setWeapon : function(_weapon) {
		this.weapon = _weapon;
		this.attach(this.weapon);
		_weapon.x = this.x;
		_weapon.y = this.y - 20;
		_weapon.rotation = -90;
		//this.weapon.onWeaponAttached(this);
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

