var Game = {
	PixiStage : null,
	PixiRenderer : null,
	load : function() {
		var assetsToLoader = ["images/stage.json", "images/bullet/kuushot.json"];
		loader = new PIXI.AssetLoader(assetsToLoader);

		function onAssetsLoading(asset) {
			var frames = [];
			console.log("asset loaded: " + asset.url);

			for (var propertyName in asset.json.frames) {
				frames.push(propertyName.toString());
			}

			frames.forEach(function(e) {
				//console.log("loaded: " + e);
				CraetePixiSprite(e);
			});
		}

		function onAssetsLoaded() {
			console.log("all assets loaded");
			Game.start();
		}


		loader.onProgress = onAssetsLoading;
		loader.onComplete = onAssetsLoaded;
		loader.load();
	},
	start : function() {

		console.log("start game");
		// Start crafty and set a background color so that we can see it's working
		var stageDiv = document.getElementById("cr-stage");
		Crafty.init(screenSize.w, screenSize.h);

		Game.PixiRenderer = PIXI.autoDetectRenderer(screenSize.w, screenSize.h);
		Game.PixiRenderer.view.className = "rendererView";
		stageDiv.appendChild(Game.PixiRenderer.view);

		Game.PixiStage = new PIXI.Stage(0xFFFFFF);

		PixiSpriteBatch = new PIXI.SpriteBatch();
		Game.PixiStage.addChild(PixiSpriteBatch);

		Crafty.timer.steptype("variable");
		Crafty.background('green');

		Crafty.scene("Level1");
		Crafty.uniqueBind("RenderScene", Game.draw);
	},
	draw : function() {
		Game.PixiRenderer.render(Game.PixiStage);
	},
	sortLayer : function() {
		function depthCompare(a, b) {
			if (a.z < b.z)
				return -1;
			if (a.z > b.z)
				return 1;
			return 0;
		}


		PixiSpriteBatch.children.sort(depthCompare);
		//console.log(PixiSpriteBatch.children);
	}
};

