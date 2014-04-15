Crafty.scene("Level1", function() {

	var up = Crafty.e("UpdateHandler");
	up.update = function(f) {
		Game.sortLayer();
	};

	var pondFloorTexture = PIXI.Texture.fromImage("BGrotate.jpg");
	var pondFloorSprite = new PIXI.Sprite(pondFloorTexture);
	pondFloorSprite.z = zIndex.BackGround;

	var fpsCounter = Crafty.e("Fps");
	var player = Crafty.e(Com.player);
	var w = Crafty.e(Com.playerWeapon);
	player.setWeapon(w);

	PixiSpriteBatch.addChild(pondFloorSprite);

	var e = Crafty.e(Com.enemy, "sprite_enemy1").origin("center");
	e.setPos(Crafty.viewport.width / 2 + 200, Crafty.viewport.height / 2 - 300);
	e.hp = 10;
	e.addComponent(Com.luncher);
	e.addComponent(Com.modifierContainer);
	e.lunchEvents = ps1;
	var modifier = new Modifier();
	//modifier.startTime = 20;
	//modifier.finishTime = 40;
	modifier.duration = 20;
	modifier.onUpdate = function(f, _m) {
	};
	//e.addModifier(modifier);

	var moveM = new MoveModifier(e.x, e.y, e.x, e.y + 400, 120);
	moveM.startTime = 50;
	//e.addModifier(moveM);

	var e1 = Crafty.e(Com.enemy, "sprite_enemy1").origin("center");
	e1.setPos(Crafty.viewport.width / 2 - 200, Crafty.viewport.height / 2 - 300);
	e1.hp = 10;
	e1.addComponent(Com.luncher);
	e1.addComponent(Com.modifierContainer);
	e1.lunchEvents = ps1;
	// moveM = new MoveModifier(e.x, e.y, e.x + 100, e.y - 80, 150);
	// moveM.startTime=150;
	// e.addModifier(moveM);
	// moveM = new MoveModifier(e.x, e.y, e.x - 100, e.y + 80, 150);
	// moveM.startTime=300;
	// e.addModifier(moveM);
	// e.tween({
	// alpha : 0.5,
	// x : player.center.x-e.w/2,
	// y : player.center.y-e.h/2
	// }, 2000);

	Crafty.bind("UpdateStats", updateStats);

	function updateStats() {

	}
	
Game.sortLayer();

});

Crafty.c("UpdateHandler", {
	onUpdate : update = function(f) {
	},
	init : function() {
		this.bind("EnterFrame", function(frame) {
			this.update(frame);
		});
	}
});
