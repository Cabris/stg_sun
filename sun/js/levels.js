
Crafty.scene("Level1",function(){
	Crafty.bind("UpdateStats",function(){
		
	});
	var up= Crafty.e("UpdateHandler");
	up.update=function(f){
		//console.log(f);
	};
	var fpsCounter=Crafty.e("Fps");
	var player=Crafty.e("Player");
	var w=Crafty.e("PlayerWeapon");
	player.setWeapon(w);
	
	var e=Crafty.e("Enemy","sprite_enemy1").origin("center");
	e.setPos(Crafty.viewport.width/2,Crafty.viewport.height/2-100);
	e.hp=100;
	e.addComponent("Luncher");
});

Crafty.c("UpdateHandler", {
	onUpdate: update=function(f){},
	init : function() {
		this.bind("EnterFrame", function(frame) {
			this.update(frame);
		});
	}
});