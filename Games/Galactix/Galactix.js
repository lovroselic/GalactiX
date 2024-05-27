/////////////////////////////////////////////////
/*
 
 to do:
	* timer for realeasing chargers
 known bugs: 

 */
/////////////////////misc/////////////////////////

const DEBUG = {
	FPS: true,
	grid: false,
	coord: false,
};

const CONST = {
	SPACE: "\u0020",
	NBS: "&nbsp",
	NEWLINE: "\n"
};

const INI = {
	TITLE_HEIGHT: 72,
	GAME_HEIGHT: 768,
	ANIMATION_INTERVAL: 17,
	BORDER_PADDING: 24,
	BOTTOM_PADDING: 32,
	SHIPS_SPACE: 96,
	BULLET_TIMEOUT: 200,
	COLLISION_SAFE: 50,
	PADDING: 72,
	TOP_Y: 24,
	ALIEN_EXP_MAX: 6,
	START_TIMEOUT: 2500,
	SHIP_TIMEOUT: 1000,
	ALIEN_DELAY_TIMEOUT: 600,
	RUBBLE_Y: 540,
	METEOR_OUT: 30,
	LEVEL_DELAY: 5000,
	LAST_LEVEL: 11,
	ATTACK: 420,
	sprite_maxW: 64,
	sprite_maxH: 64,
	NMETEORS: 6,
	METEOR_LIVES: 4,
	METEOR_SPEED: 25,
	METEOR_ROTATION_SPEED: 25,
};

/** */

class Bullet {
	constructor(x, y, sprite) {
		this.x = x;
		this.y = y;
		this.actor = new ACTOR(sprite);
	}
	updateActor() {
		this.actor.x = this.x;
		this.actor.y = this.y;
	}
	hit(index) {
		SHIP.bullet.kill(index);
	}
}

class GeneralRotatingEntity {
	constructor(position, assetName, angle, limits) {
		this.assetNAme = assetName;
		this.limits = limits;
		this.actor = new Rotating_ACTOR(assetName, position.x, position.y);
		this.moveState = new PX_MoveState(position, this);
		this.setAngle(angle);
	}
	setAngle(a) {
		this.angle = a % 360;
		this.actor.setAngle(Math.round(this.angle) % 360);
	}
	addAngle(a) {
		this.setAngle(this.angle + a);
	}
	rotate(lapsedTime) {
		this.addAngle(lapsedTime * this.rotSpeed);
	}
	getSprite() {
		return this.actor.sprite();
	}
}

class Meteor extends GeneralRotatingEntity {
	constructor(position, assetName, angle, limits) {
		super(position, assetName, angle, limits);
		this.rotSpeedFactor = RND(1, 3);
		this.lives = INI.METEOR_LIVES;
		this.name = "Asteroid";
	}
	draw() {
		ENGINE.spriteDraw('rubble', this.actor.x, this.actor.y, this.getSprite());
		ENGINE.layersToClear.add("rubble");
	}
	move(lapsedTime) {
		let timeDelta = lapsedTime / 1000;
		let delta = INI.METEOR_SPEED * timeDelta;
		this.moveState.pos = this.moveState.pos.add(RIGHT, delta);

		if (this.moveState.pos.x > ENGINE.gameWIDTH + INI.METEOR_OUT) {
			this.moveState.pos.x = -INI.METEOR_OUT;
		}
		this.moveState.refresh();
		this.actor.setPositionFromMoveStatePos(this.moveState.pos);
		let angleDelta = INI.METEOR_ROTATION_SPEED * timeDelta * this.rotSpeedFactor;
		this.addAngle(angleDelta);
	}
	hit() {
		this.lives--;
		if (this.lives > 0) {
			AUDIO.Hit.play();
		} else {
			this.explode();
		}
	}
	explode() {
		DESTRUCTION_ANIMATION.add(new AsteroidExplosion(this.moveState.pos));
		AUDIO.Explosion.play();
		PIXEL_ACTORS.remove(this.id);
	}

	collisionToActors(map) {
		return;
	}
}

class Alien extends GeneralRotatingEntity {
	constructor(position, assetName, angle, limits, score, probable) {
		super(position, assetName, angle, limits);
		this.score = score;
		this.probable = probable;
	}
	collisionToActors(map) {
		return;
	}
	draw() {
		ENGINE.spriteDraw('aliens', this.actor.x, this.actor.y, this.getSprite());
		ENGINE.layersToClear.add("aliens");
	}
	move(lapsedTime) {
		return;
	}
	hit(){}
}

class GeneralDestruction {
	constructor(grid) {
		this.grid = grid;
		this.layer = 'explosion';
	}
	draw() {
		ENGINE.spriteDraw(this.layer, this.grid.x, this.grid.y, this.actor.sprite());
		ENGINE.layersToClear.add("explosion");
	}
}

class AsteroidExplosion extends GeneralDestruction {
	constructor(grid) {
		super(grid);
		this.actor = new ACTOR("AsteroidExp", grid.x, grid.y, "linear", ASSET.AsteroidExp);
	}
}
/** */

const PRG = {
	VERSION: "1.07.02",
	NAME: "GalactiX",
	YEAR: "2017",
	CSS: "color: #239AFF;",
	INIT() {
		console.clear();
		console.log("%c**************************************************************************************************************************************", PRG.CSS);
		console.log(`${PRG.NAME} ${PRG.VERSION} by Lovro Selic, (c) LaughingSkull ${PRG.YEAR} on ${navigator.userAgent}`);
		console.log("%c**************************************************************************************************************************************", PRG.CSS);
		$("#title").html(PRG.NAME);
		$("#version").html(`${PRG.NAME} V${PRG.VERSION} <span style='font-size:14px'>&copy</span> LaughingSkull ${PRG.YEAR}`);
		$("input#toggleAbout").val("About " + PRG.NAME);
		$("#about fieldset legend").append(" " + PRG.NAME + " ");

		ENGINE.autostart = true;
		ENGINE.start = PRG.start;
		ENGINE.readyCall = GAME.setup;
		ENGINE.setSpriteSheetSize(100);
		ENGINE.setGridSize(64);
		ENGINE.init();
	},
	setup() {
		$("#engine_version").html(ENGINE.VERSION);
		$("#grid_version").html(GRID.VERSION);
		$("#iam_version").html(IndexArrayManagers.VERSION);
		$("#lib_version").html(LIB.VERSION);

		$("#toggleHelp").click(function () {
			$("#help").toggle(400);
		});
		$("#toggleAbout").click(function () {
			$("#about").toggle(400);
		});
		$("#toggleVersion").click(function () {
			$("#debug").toggle(400);
		});

		ENGINE.gameWIDTH = 960;
		ENGINE.titleHEIGHT = INI.TITLE_HEIGHT;
		ENGINE.gameHEIGHT = INI.GAME_HEIGHT;
		ENGINE.bottomHEIGHT = 40;

		$("#bottom").css("margin-top", ENGINE.gameHEIGHT + ENGINE.titleHEIGHT + ENGINE.bottomHEIGHT);
		$(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);

		ENGINE.addBOX("TITLE", ENGINE.gameWIDTH, ENGINE.titleHEIGHT, ["title"]);
		ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["background", "sign", "ship", "aliens", "explosion", "rubble", "bullets", "coord", "grid", "text", "FPS", "button"]);
		ENGINE.addBOX("DOWN", ENGINE.gameWIDTH, ENGINE.bottomHEIGHT, ["bottom", "bottomText"]);

		MAP.init();
	},
	start() {
		console.log(PRG.NAME + " started.");
		$("#startGame").addClass("hidden");

		$(document).keypress(function (event) {
			if (event.which === 32 || event.which === 13) {
				event.preventDefault();
			}
		});

		TITLE.startTitle();
	},
};

const GAME = {
	getRealLevel() {
		return GAME.level % INI.LAST_LEVEL;
	},
	start() {
		console.log("GAME started");
		if (AUDIO.Title) {
			AUDIO.Title.pause();
			AUDIO.Title.currentTime = 0;
		}


		$(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
		$(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
		$(ENGINE.topCanvas).css("cursor", "");
		ENGINE.hideMouse();

		$("#pause").prop("disabled", false);
		$("#pause").off();
		GAME.paused = true;
		ENGINE.watchVisibility(GAME.lostFocus);
		ENGINE.GAME.start(16);

		GAME.level = 1;

		/****************/

		if (DEBUG.CHEAT) {
			GAME.level = DEBUG.LEVEL;
		}

		/****************/
		GAME.score = 0;
		GAME.extraLife = SCORE.extraLife.clone();
		GAME.lives = 4;

		GAME.fps = new FPS_short_term_measurement(300);
		GAME.ended = false;
		SHIP.dead = false;
		SHIP.firstInit();
		GAME.levelStart(GAME.level);
	},
	setup() {
		console.info("GAME SETUP");
		$("#conv").remove();
	},
	prepareForRestart() {
		let clear = ["background", "text", "FPS", "button", "bottomText"];
		ENGINE.clearManylayers(clear);
	},
	levelStart(level) {
		console.info(" - start -", GAME.level);
		GAME.prepareForRestart();
		DESTRUCTION_ANIMATION.init(null);
		PIXEL_ACTORS.init(MAP[GAME.getRealLevel()]);
		GAME.initLevel(level);
		GAME.continueLevel(level);
	},
	createLevel(level) {
		throw "createLevel not yet implemented";
	},
	initLevel(level) {
		console.info("init level", level);
		if (level > INI.LAST_LEVEL) {
			GAME.createLevel(level);
		}
		GAME.levelComplete = false;

		SHIP.shots = 0;
		SHIP.killShots = 0;
		SHIP.ship = MAP[level].ship;
		SHIP.init();
		SHIP.bullet.init();
		SHIP.bullet.max = MAP[level].maxBullets;
		ALIENS.init();
		ALIENS.ready = false;

		ALIENS.speed = MAP[level].AXS;
		ALIENS.Dspeed = MAP[level].AYS;


		SPAWN.meteors();
		SPAWN.aliens();
		/** */
	},
	continueLevel(level) {
		console.log("game continues on level", level);
		GAME.levelExecute(level);
	},
	levelExecute(level) {
		console.log("level", level, "executes");
		GAME.firstFrameDraw();
		GAME.resume();
	},
	stop() {
		console.log(PRG.NAME, " is stopping.");
		GAME.stopAnimation = true;
		$(document).off("keyup", GAME.clearKey);
		$(document).off("keydown", GAME.checkKey);
		GAME.end();
	},
	over() {
		if (SHIP.dead) return;
		RUBBLE.purge(false);
		console.log("GAME OVER");
		SHIP.dead = true;
		ENGINE.clearLayer("text");
		TITLE.gameOver();
		setTimeout(GAME.stop, 2000);
	},
	end() {
		TITLE.render();
		console.log(PRG.NAME, " ended.");
		SCORE.checkScore(GAME.score);
		SCORE.hiScore();
		TEXT.score();
		$("#startGame").removeClass("hidden");
	},
	run(lapsedTime) {
		if (ENGINE.GAME.stopAnimation) return;
		SHIP.bullet.move(lapsedTime);
		PIXEL_ACTORS.manage(lapsedTime);
		SHIP.bullet.manage(lapsedTime);
		DESTRUCTION_ANIMATION.manage(lapsedTime);

		GAME.respond(lapsedTime);
		GAME.frameDraw(lapsedTime);

		if (SHIP.dead) GAME.checkIfProcessesComplete();
		/*


		
		if (!GAME.frame.start) GAME.frame.start = Date.now();
		var current = Date.now();
		GAME.frame.delta = current - GAME.frame.start;
		if (GAME.frame.delta > INI.ANIMATION_INTERVAL) {
			ALIENS.move();
			ALIENS.shoot();
			
			ALIENS.bullet.move();
			RUBBLE.move();
			GAME.respond();
			GAME.frameDraw();
			ENGINE.collisionBulletAlien();
			ENGINE.collisionBulletShip();
			ENGINE.collisionAlienShip();
			ENGINE.collisionBulletRubble();
			ENGINE.collisionAlienRubble();
			GAME.frame.start = null;
		}
		if (GAME.stopAnimation) {
			return;
		} else requestAnimationFrame(GAME.run);
		*/
	},
	checkIfProcessesComplete() {
		if (DESTRUCTION_ANIMATION.POOL.length !== 0) return;
		console.log("SCENE completed!");
		SHIP.death();
	},
	firstFrameDraw() {
		TITLE.render();
		BACKGROUND.render();
		TEXT.ships();
		TEXT.score();
		SHIP.draw();
		//ALIENS.draw();

		if (DEBUG.coord) GRID.paintCoord("coord", MAP[GAME.getRealLevel()].planeLimits, true);
		if (DEBUG.grid) GRID.grid();
	},
	frameDraw(lapsedTime) {
		ENGINE.clearLayerStack();
		SHIP.draw();
		SHIP.bullet.draw();
		PIXEL_ACTORS.draw(lapsedTime);
		DESTRUCTION_ANIMATION.draw(lapsedTime);

		if (DEBUG.FPS) GAME.FPS(lapsedTime);
		//ALIENS.bullet.draw();
		//ALIENS.draw();
		//RUBBLE.draw();
		//EXPLOSIONS.draw();
	},
	endLevel() {
		GAME.levelComplete = true;
		ALIENS.bullet.killAll();
		var RPL = RUBBLE.pool.length;
		RUBBLE.purge(true);
		ENGINE.clearLayer("text");
		var y = INI.GAME_HEIGHT / 2 - 100;
		var accuracy = SHIP.killShots / SHIP.shots * 100;
		accuracy = accuracy.toFixed(1);
		var fs = 32;
		TITLE.centeredText("Wave " + GAME.level + " destroyed", fs, y);
		y += fs;
		TITLE.centeredText("Accuracy: " + accuracy + "%", fs, y);
		y += fs;
		var bonus = parseInt(accuracy * GAME.level * 1000 / 100, 10);
		TITLE.centeredText("Level bonus: " + bonus, fs, y);
		y += fs;
		TITLE.centeredText("Asteroid bonus: " + RPL + " * 100 = " + RPL * 100, fs, y);
		GAME.score += bonus;
		TEXT.score();
		setTimeout(function () {
			GAME.nextLevel();
		}, INI.LEVEL_DELAY);
	},
	nextLevel() {
		ENGINE.clearLayer("text");
		GAME.level++;
		console.log("Ascending to level ", GAME.level);
		ALIENS.ready = false;
		GAME.initLevel(GAME.level);
	},
	createLevel(level) {
		GAME.levels[level] = $.extend(true, {}, GAME.levels[level - 1]);
		var layout = GAME.levels[level].layout;
		for (var row in layout) {
			layout[row].actor = "random";
		}
		GAME.levels[level].chargers++;
		GAME.levels[level].alienBullets++;
		GAME.levels[level].AXS++;
		GAME.levels[level].chargerDescent;
	},

	respond(lapsedTime) {
		if (SHIP.dead) return;
		if (!SHIP.live) return;
		const map = ENGINE.GAME.keymap;

		if (map[ENGINE.KEY.map.F4]) {
			$("#pause").trigger("click");
			map[ENGINE.KEY.map.F4] = false;
		}

		if (map[ENGINE.KEY.map.ctrl]) {
			SHIP.shoot();
		}

		if (map[ENGINE.KEY.map.right]) {
			SHIP.move(RIGHT, lapsedTime);
			return;
		}
		if (map[ENGINE.KEY.map.left]) {
			SHIP.move(LEFT, lapsedTime);
			return;
		}
		if (map[ENGINE.KEY.map.up]) {
			SHIP.move(UP, lapsedTime);
			return;
		}
		if (map[ENGINE.KEY.map.down]) {
			SHIP.move(DOWN, lapsedTime);
			return;
		}
	},
	setTitle() {
		const text = GAME.generateTitleText();
		const RD = new RenderData("Annie", 16, "#0E0", "bottomText");
		const SQ = new RectArea(0, 0, LAYER.bottomText.canvas.width, LAYER.bottomText.canvas.height);
		GAME.movingText = new MovingText(text, 4, RD, SQ);
	},
	generateTitleText() {
		let text = `${PRG.NAME} ${PRG.VERSION
			}, a game by Lovro Selič, ${"\u00A9"} LaughingSkull ${PRG.YEAR
			}. 
             
            Music: 'Dance In the Rain' written and performed by LaughingSkull, ${"\u00A9"
			} 2014 Lovro Selič. `;
		text += "     ENGINE, GRID, IAM, .... and GAME code by Lovro Selič using JavaScript. ";
		text += "     Remastered and ported to ENGINE v4 in 2024. ";
		text = text.split("").join(String.fromCharCode(8202));
		return text;
	},
	runTitle() {
		if (ENGINE.GAME.stopAnimation) return;
		GAME.movingText.process();
		GAME.titleFrameDraw();
	},
	titleFrameDraw() {
		GAME.movingText.draw();
	},
	addScore(score) {
		GAME.score += score;
		TEXT.score();
	},
	lostFocus() {
		if (GAME.paused) return;
		GAME.clickPause();
	},
	clickPause() {
		if (GAME.levelCompleted) return;
		$("#pause").trigger("click");
		ENGINE.GAME.keymap[ENGINE.KEY.map.F4] = false;
	},
	pause() {
		if (GAME.paused) return;
		if (GAME.levelFinished) return;
		if (SHIP.dead) return;
		if (!SHIP.live) return;
		console.log("%cGAME paused.", PRG.CSS);
		let GameRD = new RenderData("Arcade", 48, "#DDD", "text", "#000", 2, 2, 2);
		ENGINE.TEXT.setRD(GameRD);
		$("#pause").prop("value", "Resume Game [F4]");
		$("#pause").off("click", GAME.pause);
		$("#pause").on("click", GAME.resume);
		ENGINE.GAME.ANIMATION.next(ENGINE.KEY.waitFor.bind(null, GAME.clickPause, "F4"));
		ENGINE.TEXT.centeredText("Game Paused", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2);
		GAME.paused = true;
	},
	resume() {
		console.log("%cGAME resumed.", PRG.CSS);
		$("#pause").prop("value", "Pause Game [F4]");
		$("#pause").off("click", GAME.resume);
		$("#pause").on("click", GAME.pause);
		if (SHIP.live) ENGINE.clearLayer("text");
		ENGINE.GAME.ANIMATION.resetTimer();
		ENGINE.GAME.ANIMATION.next(GAME.run);
		GAME.paused = false;
	},
	FPS(lapsedTime) {
		let CTX = LAYER.FPS;
		CTX.fillStyle = "white";
		ENGINE.clearLayer("FPS");
		let fps = 1000 / lapsedTime || 0;
		GAME.fps.update(fps);
		CTX.fillText(GAME.fps.getFps(), 5, 10);
	},
};

const ALIENS = {
	bullet: {
		speed: 16,
		/* draw() {
			var LN = ALIENS.bullet.arsenal.length;
			for (var i = 0; i < LN; i++) {
				ENGINE.spriteDraw(
					"bullets",
					ALIENS.bullet.arsenal[i].x,
					ALIENS.bullet.arsenal[i].y,
					ALIENS.bullet.sprite
				);
			}
		}, */
		/* move() {
			var LN = ALIENS.bullet.arsenal.length;
			if (LN < 1) return;
			for (var i = LN - 1; i >= 0; i--) {
				ALIENS.bullet.arsenal[i].y += ALIENS.bullet.speed;
				if (ALIENS.bullet.arsenal[i].y > INI.GAME_HEIGHT) ALIENS.bullet.kill(i);
			}
		}, */
		/* kill(i) {
			ALIENS.bullet.arsenal.splice(i, 1);
		}, */
		/* killAll() {
			ALIENS.bullet.arsenal.clear();
		} */
	},
	init() {
		ALIENS.existence = [];
		ALIENS.chargers = [];
		ALIENS.bullet.arsenal = [];
		ALIENS.bullet.sprite = SPRITE.alienbullet;
		ALIENS.moving = false;
		ALIENS.speed = 2;
		ALIENS.Dspeed = 24;
		ALIENS.descent = false;
		ALIENS.minX = 52;
		ALIENS.maxX = ENGINE.gameWIDTH - ALIENS.minX;
		ALIENS.chargerReady = false;
		setTimeout(function () {
			ALIENS.chargerReady = true;
			console.warn("charger ready");
		}, MAP[GAME.getRealLevel()].CD);
	}
};

const SHIP = {
	ship: null,
	bullet: {
		max: 1,
		speed: 1400,//24
		init() {
			SHIP.bullet.sprite = SPRITE.bullet;
			SHIP.bullet.arsenal = [];
		},
		shoot() {
			console.log("shooting ...");
			SHIP.cannonHot = true;
			SHIP.shots += 1;
			SHIP.bullet.arsenal.push(new Bullet(SHIP.x, parseInt(SHIP.y - SHIP.sprite.height / 2 - SHIP.bullet.sprite.height / 2, 10), 'bullet'));
			AUDIO.Shoot.play();
			if (SHIP.bullet.arsenal.length >= SHIP.bullet.max) SHIP.loaded = false;

			setTimeout(function () {
				SHIP.cannonHot = false;
			}, INI.BULLET_TIMEOUT);
		},
		kill(i) {
			SHIP.bullet.arsenal.splice(i, 1);
			if (SHIP.bullet.arsenal.length < SHIP.bullet.max) SHIP.loaded = true;
		},
		draw() {
			ENGINE.layersToClear.add("bullets");
			for (let i = 0; i < SHIP.bullet.arsenal.length; i++) {
				ENGINE.spriteDraw("bullets", SHIP.bullet.arsenal[i].x, SHIP.bullet.arsenal[i].y, SHIP.bullet.sprite);
			}
		},
		move(lapsedTime) {
			const LN = SHIP.bullet.arsenal.length;
			if (LN < 1) return;
			let timeDelta = lapsedTime / 1000;
			const delta = Math.round(SHIP.bullet.speed * timeDelta);
			for (let i = LN - 1; i >= 0; i--) {
				SHIP.bullet.arsenal[i].y -= delta;
				if (SHIP.bullet.arsenal[i].y < 0) SHIP.bullet.kill(i);
			}
		},
		manage(lapsedTime) {
			PIXEL_ACTORS.collisionFromExternalPool(SHIP.bullet.arsenal);
		}
	},
	firstInit() {
		SHIP.live = false;
		SHIP.maxX = ENGINE.gameWIDTH - INI.BORDER_PADDING;
		SHIP.minX = INI.BORDER_PADDING;
		SHIP.minY = INI.GAME_HEIGHT - INI.BOTTOM_PADDING - INI.SHIPS_SPACE;
		INI.AUTO_ATTACK = SHIP.minY - 100;
		SHIP.maxY = INI.GAME_HEIGHT - INI.BOTTOM_PADDING;
		SHIP.x = parseInt(ENGINE.gameWIDTH / 2, 10);
		SHIP.y = parseInt((SHIP.maxY - SHIP.minY) / 2) + SHIP.minY;
		SHIP.speed = 500;
	},
	init() {
		if (SHIP.dead) return;
		if (GAME.levelComplete) GAME.endLevel();
		TITLE.getReady();
		AUDIO.Ufo.play();
		SHIP.sprite = SPRITE[SHIP.ship];
		SHIP.loaded = true;
		SHIP.cannonHot = false;

		setTimeout(function () {
			SHIP.live = true;
		}, INI.SHIP_TIMEOUT);

		setTimeout(function () {
			if (!SHIP.dead) ENGINE.clearLayer("text");

			setTimeout(function () {
				//ALIENS.ready = true;
				console.warn("ALIENS.ready = true;");
			}, INI.ALIEN_DELAY_TIMEOUT);

		}, INI.START_TIMEOUT);
	},
	draw() {
		const CTX = LAYER["ship"];
		CTX.clearRect(0, SHIP.minY - 24, CTX.canvas.width, INI.SHIPS_SPACE + 48);
		if (!SHIP.live) return;
		if (SHIP.dead) return;
		ENGINE.spriteDraw("ship", SHIP.x, SHIP.y, SHIP.sprite);
	},
	move(dir, lapsedTime) {
		let timeDelta = lapsedTime / 1000;
		SHIP.x += Math.round(SHIP.speed * dir.x * timeDelta);
		SHIP.y += Math.round(SHIP.speed * dir.y * timeDelta);
		SHIP.x = Math.max(SHIP.minX, Math.min(SHIP.x, SHIP.maxX));
		SHIP.y = Math.max(SHIP.minY, Math.min(SHIP.y, SHIP.maxY));
	},

	shoot() {
		if (!SHIP.loaded) return;
		if (SHIP.cannonHot) return;
		if (!SHIP.live) return;
		SHIP.bullet.shoot();
		return;
	}
};

const BACKGROUND = {
	render() {
		ENGINE.draw("background", 0, 0, TEXTURE.stars);
	},
	black() {
		const CTX = LAYER.background;
		CTX.fillStyle = "#000";
		CTX.fillRect(0, 0, ENGINE.gameWIDTH, ENGINE.gameHEIGHT);
	}
};

const TEXT = {
	render() { },
	ships() {
		var x = 0;
		var y = INI.GAME_HEIGHT - 20;
		TEXT.clearSign(x, y, ENGINE.gameWIDTH, 20);
		if (GAME.lives <= 0) return;
		for (var i = 0; i < GAME.lives; i++) {
			ENGINE.draw("sign", x + i * 16, y, SPRITE.smallship);
		}
	},
	clearSign(x, y, w, h) {
		var CTX = LAYER["sign"];
		CTX.clearRect(x, y, w, h);
	},
	score() {
		var EL = GAME.extraLife[0];
		if (GAME.score >= EL) {
			GAME.lives++;
			GAME.extraLife.shift();
			TEXT.ships();
		}
		var CTX = LAYER["sign"];
		var x = 80;
		var y = 24;
		TEXT.clearSign(x, 0, ENGINE.gameWIDTH - x, y + 8);
		CTX.color = "#00FF00";
		CTX.fillStyle = "#00FF00";
		//CTX.font = "24px Consolas";
		CTX.font = "14px Emulogic";
		CTX.shadowColor = "#000";
		CTX.shadowOffsetX = 1;
		CTX.shadowOffsetY = 1;
		CTX.shadowBlur = 1;
		var score = GAME.score.toString().padStart(8, "0");
		CTX.fillText("SCORE: " + score, x, y);
		x += 260;
		var level = GAME.level.toString().padStart(2, "0");
		CTX.fillText("WAVE: " + level, x, y);
		x += 170;
		var index = SCORE.SCORE.name[0].indexOf("&nbsp");
		var HS;
		if (index > 0) {
			HS = SCORE.SCORE.name[0].substring(0, SCORE.SCORE.name[0].indexOf("&nbsp"));
		} else {
			HS = SCORE.SCORE.name[0];
		}
		CTX.fillText("HISCORE: " + SCORE.SCORE.value[0] + " by " + HS, x, y);
	}
};

const TITLE = {
	startTitle() {
		console.info(" - start title -");
		if (AUDIO.Title) TITLE.music();
		TITLE.render();
		ENGINE.draw("background", (ENGINE.gameWIDTH - TEXTURE.Title.width) / 2, (ENGINE.gameHEIGHT - TEXTURE.Title.height) / 2, TEXTURE.Title);
		ENGINE.topCanvas = ENGINE.getCanvasName("ROOM");
		TITLE.drawButtons();
		$("#DOWN")[0].scrollIntoView();
		GAME.setTitle();
		ENGINE.GAME.start(16);
		ENGINE.GAME.ANIMATION.next(GAME.runTitle);
	},
	drawButtons() {
		ENGINE.clearLayer("button");
		FORM.BUTTON.POOL.clear();
		const w = 166;
		const h = 24;
		let x = ((ENGINE.gameWIDTH - TEXTURE.Title.width) / 2);
		let y = ENGINE.gameHEIGHT - (3 * h);

		let startBA = new Area(x, y, w, h);
		const buttonColors = new ColorInfo("#F00", "#A00", "#222", "#666", 13);
		const musicColors = new ColorInfo("#0E0", "#090", "#222", "#666", 13);
		FORM.BUTTON.POOL.push(new Button("Start game", startBA, buttonColors, GAME.start));
		y += 1.8 * h;
		let music = new Area(x, y, w, h);
		FORM.BUTTON.POOL.push(new Button("Play title music", music, musicColors, TITLE.music));
		FORM.BUTTON.draw();
		$(ENGINE.topCanvas).on("mousemove", { layer: ENGINE.topCanvas }, ENGINE.mouseOver);
		$(ENGINE.topCanvas).on("click", { layer: ENGINE.topCanvas }, ENGINE.mouseClick);
	},
	render() {
		TITLE.background();
		TITLE.title();
		BACKGROUND.black();
		TITLE.bottomBackground();
	},

	centeredText(text, fs = 48) {
		let GameRD = new RenderData("Arcade", fs, "#DDD", "text", "#000", 2, 2, 2);
		ENGINE.TEXT.setRD(GameRD);
		ENGINE.TEXT.centeredText(text, ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2);
	},

	gameOver() {
		TITLE.centeredText("GAME OVER", 120);
		//TITLE.bigText("GAME OVER", 120);
	},
	getReady() {
		if (GAME.levelComplete) return;
		ENGINE.clearLayer("text");
		TITLE.centeredText("GET READY FOR WAVE " + GAME.level);
	},
	title() {
		var CTX = LAYER.title;
		var grad = CTX.createLinearGradient(8, 100, 128, 128);
		grad.addColorStop("0", "#000000");
		grad.addColorStop("0.2", "#00ee00");
		grad.addColorStop("0.5", "#00ff00");
		grad.addColorStop("0.8", "#eef442");
		grad.addColorStop("1.0", "#b2f441");
		CTX.fillStyle = grad;
		CTX.font = "40px Arcade";
		CTX.shadowColor = "#ccff66";
		CTX.shadowOffsetX = 1;
		CTX.shadowOffsetY = 1;
		CTX.shadowBlur = 2;
		var x = 30;
		var y = 48;
		CTX.fillText(PRG.NAME, x, y);
		CTX.font = "12px Consolas";
		CTX.shadowOffsetX = 1;
		CTX.shadowOffsetY = 1;
		CTX.shadowBlur = 1;
		y = 32;
		x = 272;
		CTX.fillText("Version " + PRG.VERSION, x, y);
		y = 48;
		CTX.fillText("by Lovro Selič", x, y);
		y = 48;
		x = 400;
		CTX.font = "14px Consolas";
		CTX.fillText(String.fromCharCode(169) + " LaughingSkull 2017", x, y);
	},
	bottomBackground() {
		let CTX = LAYER.bottom;
		CTX.fillStyle = "#000";
		CTX.roundRect(0, 0, ENGINE.gameWIDTH, ENGINE.bottomHEIGHT, { upperLeft: 0, upperRight: 0, lowerLeft: 10, lowerRight: 10 }, true, true);
	},
	background() {
		let CTX = LAYER.title;
		CTX.fillStyle = "#000";
		CTX.roundRect(0, 0, ENGINE.gameWIDTH, ENGINE.titleHEIGHT, { upperLeft: 10, upperRight: 10, lowerLeft: 0, lowerRight: 0 }, true, true);
	},
	music() {
		AUDIO.Title.play();
	},
};

$(document).ready(function () {
	PRG.INIT();
	PRG.setup();
	//PRG.preLoadImages();
	ENGINE.LOAD.preload();
	SCORE.init("SC", "Galactix", 10, 2500);
	SCORE.loadHS();
	SCORE.hiScore();
	SCORE.extraLife = [10000, 50000, 100000, 200000, 500000, 1000000, Infinity]
});
