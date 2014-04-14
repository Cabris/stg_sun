var PixiSpriteBatch;
var screenSize={w:600,h:800};

var zIndex={
	Player:10,
	PlaterCollider:12,
	Enemy:8,
	Bullet:12,
	BackGround:3
};

var Com={
	player:"Player",
	enemy:"Enemy",
	luncher:"Luncher",
	playerWeapon:"PlayerWeapon",
	bullet:"Bullet",
	enemyBullet:"EnemyBullet",
	playerAimer:"PlayerAim",
	trackBullet:"TrackBullet",
	modifierContainer:"ModifierContainer",
	point:"Point"
};

var shotDatas = {
};

var render = {
	ADD : 0,
	NORMAL : 1
};

function rect(x1, y1, x2, y2) {
	return {
		x : x1,
		y : y1,
		w : x2-x1,
		h : y2-y1
	};
}

function color(r, g, b) {
	return {
		r : r,
		g : g,
		b : b
	};
}

//function overloading
function ShotData(id, rect, color, angular_velocity, renderSetting) {
	var shotData = {
		Id : id,
		Rect : rect,
		Delay_color : color,
		Angular_velocity : 0,
		Render : render.NORMAL
	};

	if ( typeof angular_velocity !== "undefined") {
		shotData.Angular_velocity = angular_velocity;
	}
	if ( typeof renderSetting !== "undefined") {
		shotData.Render = renderSetting;
	}

	shotDatas[id] = shotData;
};

		// var toLoad = [];
		// for (var i in Crafty.assets) {
		// toLoad.push(i);
		// }
		// Crafty.load(toLoad, function() {
		// //Everything is loaded
		// console.log("Everything is loaded");
		// }, function(e) {//update progress
		// var src = e.src || "";
		// console.log("Loading " + src.substr(src.lastIndexOf('/') + 1).toLowerCase() + " Loaded: " + ~~e.percent + "%");
		// }, function(e) {//uh oh, error loading
		// var src = e.src || "";
		// console.log("Error on loading: " + src.substr(src.lastIndexOf('/') + 1).toLowerCase());
		// });