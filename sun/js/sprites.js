Crafty.sprite(45, 45, game_path + "images/sunf.png", {
	sprite_ship1 : [0, 0]
});

Crafty.sprite(27, 36, game_path + "images/weapon2.png", {
	sprite_bullet1 : [0, 0]
});

Crafty.sprite(15, 20, game_path + "images/bullet/colors01.png", {
	sprite_bullet_colors01 : [0, 0]
});

Crafty.sprite(62, 74, game_path + "images/enemy.png", {
	sprite_enemy1 : [0, 0]
});

Crafty.c("MySprite", {

	setPos : function(_x, _y) {
		this.attr({
			x : _x - this.w / 2,
			y : _y - this.h / 2
		});
	},
	init : function() {
		this.requires("2D,Canvas").origin("center").bind("EnterFrame", function(frame) {
			if (this.parent != null) {
				//this.x = this.parent.x - this.w / 2;
				//this.y = this.parent.y - this.h / 2;
			}
		});
		return this;
	}
});