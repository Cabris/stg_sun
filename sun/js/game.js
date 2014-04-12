Game = {
	//renderer : null,
	// Initialize and start our game
	start : function() {
		// Start crafty and set a background color so that we can see it's working
		var stageDiv = document.getElementById("cr-stage");
		Crafty.init(600, 800);

		var renderer = PIXI.autoDetectRenderer(600, 800);
		renderer.view.className = "rendererView";
		console.log(renderer);

		var draw = function() {
			renderer.render(stage);
		};

		// add render view to DOM
		stageDiv.appendChild(renderer.view);

		// create an new instance of a pixi stage
		var stage = new PIXI.Stage(0xFFFFFF);

		// create a background texture
		var pondFloorTexture = PIXI.Texture.fromImage("BGrotate.jpg");
		// create a new background sprite
		var pondFloorSprite = new PIXI.Sprite(pondFloorTexture);
		stage.addChild(pondFloorSprite);

		//Crafty.canvas.init();
		//Set canvas under interface
		//Crafty.canvas._canvas.style.zIndex = '1';
		Crafty.timer.steptype("variable");
		Crafty.background('green');

		var toLoad = [];
		for (var i in Crafty.assets) {
			toLoad.push(i);
		}

		Crafty.load(toLoad, function() {
			//Everything is loaded
			console.log("Everything is loaded");

		}, function(e) {
			var src = e.src || "";

			//update progress
			console.log("Loading " + src.substr(src.lastIndexOf('/') + 1).toLowerCase() + " Loaded: " + ~~e.percent + "%");

		}, function(e) {
			//uh oh, error loading
			var src = e.src || "";
			console.log("Error on loading: " + src.substr(src.lastIndexOf('/') + 1).toLowerCase());
		});

		Crafty.scene("Level1");

		Crafty.uniqueBind("RenderScene", draw);
	}
};
