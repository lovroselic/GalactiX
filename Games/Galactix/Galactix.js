/////////////////////////////////////////////////
/*
 
 to do:

 known bugs: 

 */
/////////////////////misc/////////////////////////




const DEBUG = {
	FPS: true,
};
//DEBUG.CHEAT = true;
//DEBUG.ENDLESS_LIFE = true;
//DEBUG.INVINCIBLE = true;
//DEBUG.INVINCIBLE = false;
//DEBUG.CHEAT = false;
//DEBUG.LEVEL = 10;


const CONST = {
	SPACE: "\u0020",
	NBS: "&nbsp",
	NEWLINE: "\n"
};

const INI = {
	LOAD_W: 202,
	LOAD_H: 22,
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
	METEOR_ROTATION_PROBABILITY: 15,
	LEVEL_DELAY: 5000,
	LAST_LEVEL: 11,
	ATTACK: 420,
	sprite_maxW: 64,
	sprite_maxH: 64
};

const PRG = {
	VERSION: "1.06.00",
	NAME: "GalactiX",
	YEAR: "2017",
	CSS: "color: #239AFF;",
	//SOURCE: "https://www.c00lsch00l.eu/Games/AA/",
	//SRC_rel: "/Games/AA/",
	//tileGraphics: [],
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
		ENGINE.init();

		//$("#temp").append("<canvas id ='temp_canvas'></canvas>");
	},
	setup() {
		$("#engine_version").html(ENGINE.VERSION);
		//$("#grid_version").html(GRID.VERSION);
		//$("#iam_version").html(IndexArrayManagers.VERSION);
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
		ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["background", "sign", "ship", "aliens", "explosion", "rubble", "bullets", "text", "FPS", "button"]);
		ENGINE.addBOX("DOWN", ENGINE.gameWIDTH, ENGINE.bottomHEIGHT, ["bottom", "bottomText"]);

	},
	start() {
		console.log(PRG.NAME + " started.");
		$("#startGame").addClass("hidden");

		$(document).keypress(function (event) {
			if (event.which === 32 || event.which === 13) {
				event.preventDefault();
			}
		});

		//GAME.start();

		TITLE.startTitle();
	},
};

//const map = { 17: false, 37: false, 38: false, 39: false, 40: false };

/*
var Tile = function (id, x, y, type, name) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.type = type;
	this.name = name;
};

var Invader = new Tile("invader", 48, 38, "png", "invader");
var RedInvader = new Tile("redinvader", 44, 40, "png", "redinvader");
var GreenInvader = new Tile("greeninvader", 48, 35, "png", "greeninvader");
var RedShip = new Tile("redship", 43, 48, "png", "redship");
var DarkShip = new Tile("motherShip4", 48, 47, "png", "darkship");
var SlimShip = new Tile("motherShip3", 48, 46, "png", "slimship");
var WhiteShip = new Tile("ship", 43, 48, "png", "whiteship");
var SmallShip = new Tile("smallship", 14, 16, "png", "smallship");
var Stars = new Tile("stars", 960, 768, "png", "stars");
var AExp1 = new Tile("ALIEN_exp_01", 48, 51, "png", "AlienExp1");
var AExp2 = new Tile("ALIEN_exp_02", 58, 57, "png", "AlienExp2");
var AExp3 = new Tile("ALIEN_exp_03", 58, 58, "png", "AlienExp3");
var AExp4 = new Tile("ALIEN_exp_04", 55, 54, "png", "AlienExp4");
var AExp5 = new Tile("ALIEN_exp_05", 49, 46, "png", "AlienExp5");
var AExp6 = new Tile("ALIEN_exp_06", 42, 38, "png", "AlienExp6");
var Bullet1 = new Tile("bullet1", 5, 16, "png", "bullet");
var AlienBullet = new Tile("alienBullet01", 4, 12, "png", "alienbullet");
var SExp1 = new Tile("SHIP_exp_01", 42, 53, "png", "ShipExp1");
var SExp2 = new Tile("SHIP_exp_02", 95, 90, "png", "ShipExp2");
var SExp3 = new Tile("SHIP_exp_03", 118, 111, "png", "ShipExp3");
var SExp4 = new Tile("SHIP_exp_04", 130, 125, "png", "ShipExp4");
var SExp5 = new Tile("SHIP_exp_05", 156, 146, "png", "ShipExp5");
var SExp6 = new Tile("SHIP_exp_06", 186, 167, "png", "ShipExp6");
var SExp7 = new Tile("SHIP_exp_07", 148, 131, "png", "ShipExp7");
var SExp8 = new Tile("SHIP_exp_08", 123, 100, "png", "ShipExp8");
var Ast1 = new Tile("Asteroid_1", 60, 61, "png", "Asteroid1");
var Ast2 = new Tile("Asteroid_2", 50, 55, "png", "Asteroid2");
var Ast3 = new Tile("Asteroid_3", 43, 40, "png", "Asteroid3");
var Ast4 = new Tile("Asteroid_4", 54, 39, "png", "Asteroid4");
var Ast5 = new Tile("Asteroid_5", 60, 68, "png", "Asteroid5");
var Ast6 = new Tile("Asteroid_6", 48, 47, "png", "Asteroid6");
var AstExp1 = new Tile("ASTEROID_exp_01", 48, 37, "png", "AstExp1");
var AstExp2 = new Tile("ASTEROID_exp_02", 56, 39, "png", "AstExp2");
var AstExp3 = new Tile("ASTEROID_exp_03", 64, 45, "png", "AstExp3");
var AstExp4 = new Tile("ASTEROID_exp_04", 72, 47, "png", "AstExp4");
var AstExp5 = new Tile("ASTEROID_exp_05", 80, 50, "png", "AstExp5");
var AstExp6 = new Tile("ASTEROID_exp_06", 96, 59, "png", "AstExp6");
var AstExp7 = new Tile("ASTEROID_exp_07", 96, 62, "png", "AstExp7");
var AstExp8 = new Tile("ASTEROID_exp_08", 80, 49, "png", "AstExp8");
var AstExp9 = new Tile("ASTEROID_exp_09", 72, 46, "png", "AstExp9");
var AstExp10 = new Tile("ASTEROID_exp_10", 64, 34, "png", "AstExp10");
var AstExp11 = new Tile("ASTEROID_exp_11", 56, 32, "png", "AstExp11");
var AstExp12 = new Tile("ASTEROID_exp_12", 48, 34, "png", "AstExp12");
var AlienMother = new Tile("alienMother1", 96, 65, "png", "alienMother");
var AlienShip1 = new Tile("alienShip1", 48, 47, "png", "basic1Fighter");
var AlienShip2 = new Tile("alienShip2", 48, 41, "png", "basic1Attacker");
var AlienShip3 = new Tile("alienShip3", 29, 48, "png", "basic2Attacker");
var AlienShip4 = new Tile("alienShip4", 48, 25, "png", "basic1Charger");
var AlienShip5 = new Tile("alienShip5", 38, 64, "png", "basic3Attacker");
var AlienShip6 = new Tile("alienShip6", 46, 48, "png", "basic2Fighter");
var AlienShip7 = new Tile("alienShip7", 45, 64, "png", "basic3Fighter");
var AlienShip8 = new Tile("alienShip8", 61, 64, "png", "basic2Charger");
var AlienShip9 = new Tile("alienShip9", 43, 64, "png", "basic4Fighter");
var AlienShip10 = new Tile("alienShip10", 48, 49, "png", "basic5Fighter");
var AlienShip11 = new Tile("alienShip11", 37, 64, "png", "basic3Charger");
var AlienShip12 = new Tile("alienShip12", 36, 48, "png", "basic6Fighter");
var AlienShip13 = new Tile("alienShip13", 48, 42, "png", "basic7Fighter");
var AlienShip14 = new Tile("alienShip14", 37, 64, "png", "basic8Fighter");
var AlienShip15 = new Tile("alienShip15", 48, 64, "png", "basic4Attacker");
var AlienShip16 = new Tile("alienShip16", 48, 47, "png", "basic5Attacker");
var AlienShip17 = new Tile("alienShip17", 46, 48, "png", "basic6Attacker");
var AlienShip18 = new Tile("alienShip18", 64, 55, "png", "basic4Charger");
var AlienShip19 = new Tile("alienShip19", 42, 48, "png", "basic7Attacker");
var AlienShips = [
	"basic7Attacker",
	"basic4Charger",
	"basic6Attacker",
	"basic5Attacker",
	"basic4Attacker",
	"basic8Fighter",
	"basic7Fighter",
	"basic6Fighter",
	"basic3Charger",
	"basic5Fighter",
	"basic4Fighter",
	"basic2Charger",
	"basic3Fighter",
	"basic2Fighter",
	"basic3Attacker",
	"basic1Charger",
	"basic2Attacker",
	"basic1Attacker",
	"basic1Fighter"
];
var World = {
	sprite: [
		Invader,
		RedInvader,
		GreenInvader,
		RedShip,
		WhiteShip,
		SmallShip,
		Bullet1,
		AlienBullet,
		AlienShip1,
		AlienShip2,
		AlienShip3,
		AlienShip4,
		DarkShip,
		SlimShip,
		AlienShip5,
		AlienShip6,
		AlienShip7,
		AlienShip8,
		AlienShip9,
		AlienShip10,
		AlienShip11,
		AlienShip12,
		AlienMother,
		AlienShip13,
		AlienShip14,
		AlienShip15,
		AlienShip16,
		AlienShip17,
		AlienShip18,
		AlienShip19
	],
	rubble: [Ast1, Ast2, Ast3, Ast4, Ast5, Ast6],
	animation: [
		AExp1,
		AExp2,
		AExp3,
		AExp4,
		AExp5,
		AExp6,
		SExp1,
		SExp2,
		SExp3,
		SExp4,
		SExp5,
		SExp6,
		SExp7,
		SExp8,
		AstExp1,
		AstExp2,
		AstExp3,
		AstExp4,
		AstExp5,
		AstExp6,
		AstExp7,
		AstExp8,
		AstExp9,
		AstExp10,
		AstExp11,
		AstExp12
	],
	background: [Stars]
};
*/

/*var AnimationSPRITE = function (x, y, type, howmany) {
	this.x = x;
	this.y = y;
	this.pool = [];
	for (var i = 1; i <= howmany; i++) {
		this.pool.push(type + i);
	}
};*/
//var Creation;

/*
var ACTOR = function (sprite_class, x, y, angle, score, probable) {
	this.class = sprite_class;
	this.x = x || 0;
	this.y = y || 0;
	this.angle = angle || 0;
	this.score = score || 0;
	this.probable = probable || 33;
	this.refresh();
	this.type = "grunt";
	this.stage = "waiting";
};
ACTOR.prototype.sprite = function (sprite_class) {
	var name = this.class + "_" + this.angle;
	return SPRITE[name];
};
ACTOR.prototype.refresh = function () {
	this.name = this.class + "_" + this.angle;
	this.width = SPRITE[this.name].width;
	this.height = SPRITE[this.name].height;
};
var ALIENS = {
	bullet: {
		speed: 16,
		draw() {
			var LN = ALIENS.bullet.arsenal.length;
			for (var i = 0; i < LN; i++) {
				ENGINE.spriteDraw(
					"bullets",
					ALIENS.bullet.arsenal[i].x,
					ALIENS.bullet.arsenal[i].y,
					ALIENS.bullet.sprite
				);
			}
		},
		move() {
			var LN = ALIENS.bullet.arsenal.length;
			if (LN < 1) return;
			for (var i = LN - 1; i >= 0; i--) {
				ALIENS.bullet.arsenal[i].y += ALIENS.bullet.speed;
				if (ALIENS.bullet.arsenal[i].y > INI.GAME_HEIGHT) ALIENS.bullet.kill(i);
			}
		},
		kill(i) {
			ALIENS.bullet.arsenal.splice(i, 1);
		},
		killAll() {
			ALIENS.bullet.arsenal.clear();
		}
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
		}, GAME.levels[GAME.level].CD);
	},
	findChargers() {
		var AEL = ALIENS.existence.length;
		var find = [];
		for (var i = 0; i < AEL; i++) {
			if (
				ALIENS.existence[i].type === "charger" &&
				ALIENS.existence[i].stage === "waiting"
			)
				find.push(i);
		}
		return find;
	},
	findActiveChargers() {
		ALIENS.chargers.clear();
		var AEL = ALIENS.existence.length;
		for (var i = 0; i < AEL; i++) {
			if (ALIENS.existence[i].stage != "waiting") ALIENS.chargers.push(i);
		}
	},
	releaseCharger() {
		var find = ALIENS.findChargers();
		if (find.length === 0) return;
		var select = find[RND(0, find.length - 1)];
		ALIENS.chargers.push(select);
		ALIENS.existence[select].stage = "rotate";
	},
	move() {
		ALIENS.findActiveChargers();
		var AC = ALIENS.chargers.length;
		if (ALIENS.chargerReady) {
			var allowed = GAME.levels[GAME.level].chargers;
			if (allowed > AC) {
				ALIENS.releaseCharger();
				ALIENS.chargerReady = false;
				setTimeout(function () {
					ALIENS.chargerReady = true;
				}, GAME.levels[GAME.level].CD);
			}
		}
		if (AC > 0) {
			var whereX, whereY;
			for (var q = AC - 1; q >= 0; q--) {
				var angle;
				var where =
					(SHIP.x - ALIENS.existence[ALIENS.chargers[q]].x) /
					Math.abs(SHIP.x - ALIENS.existence[ALIENS.chargers[q]].x) || 0;
				switch (ALIENS.existence[ALIENS.chargers[q]].stage) {
					case "rotate":
						var ROTDIR;
						if (ALIENS.dir.x != 0) {
							ROTDIR = ALIENS.dir.x;
						} else ROTDIR = 1;
						if (angle != 0)
							angle = ALIENS.existence[ALIENS.chargers[q]].angle + 10 * ROTDIR;
						if (angle === 360 || angle === 0) {
							angle = 0;
							ALIENS.existence[ALIENS.chargers[q]].stage = "descend";
						}
						if (angle < 0) angle += 360;
						ALIENS.existence[ALIENS.chargers[q]].angle = angle;
						ALIENS.existence[ALIENS.chargers[q]].y -= 1;
						if (ALIENS.existence[ALIENS.chargers[q]].y <= INI.TOP_Y)
							ALIENS.existence[ALIENS.chargers[q]].y = INI.TOP_Y;
						ALIENS.existence[ALIENS.chargers[q]].refresh();
						break;
					case "descend":
						ALIENS.existence[ALIENS.chargers[q]].y +=
							GAME.levels[GAME.level].chargerDescent;
						ALIENS.existence[ALIENS.chargers[q]].x += where * ALIENS.speed;
						if (ALIENS.existence[ALIENS.chargers[q]].x > ENGINE.gameWIDTH)
							ALIENS.existence[ALIENS.chargers[q]].x = ENGINE.gameWIDTH;
						if (ALIENS.existence[ALIENS.chargers[q]].x < 0)
							ALIENS.existence[ALIENS.chargers[q]].x = 0;
						if (ALIENS.existence[ALIENS.chargers[q]].y >= INI.ATTACK) {
							ALIENS.existence[ALIENS.chargers[q]].stage = "attack";
							ALIENS.existence[ALIENS.chargers[q]].score =
								ALIENS.existence[ALIENS.chargers[q]].score * 2;
						}
						break;
					case "attack":
						if (!SHIP.live) {
							ALIENS.existence[ALIENS.chargers[q]].stage = "turn";
							break;
						}
						ALIENS.existence[ALIENS.chargers[q]].probable = 99;
						whereX = SHIP.x - ALIENS.existence[ALIENS.chargers[q]].x;
						whereY = SHIP.y - ALIENS.existence[ALIENS.chargers[q]].y;
						var hyp = Math.sqrt(Math.pow(whereX, 2) + Math.pow(whereY, 2));
						var cosa = whereY / hyp;
						var rota = Math.acos(cosa) * (180 / Math.PI);
						var rot = Math.round(rota / 10) * 10;
						if (rot > 40) rot = 40;
						rot = rot * where * -1;
						var vx = ALIENS.speed * where;
						var vy = GAME.levels[GAME.level].chargerDescent;
						ALIENS.existence[ALIENS.chargers[q]].x += vx;
						ALIENS.existence[ALIENS.chargers[q]].y += vy;
						if (ALIENS.existence[ALIENS.chargers[q]].x > ENGINE.gameWIDTH)
							ALIENS.existence[ALIENS.chargers[q]].x = ENGINE.gameWIDTH;
						if (ALIENS.existence[ALIENS.chargers[q]].x < 0)
							ALIENS.existence[ALIENS.chargers[q]].x = 0;
						if (rot < 0) rot += 360;
						if (rot === -0) rot = 0;
						ALIENS.existence[ALIENS.chargers[q]].angle = rot;
						ALIENS.existence[ALIENS.chargers[q]].refresh();
						if (
							ALIENS.existence[ALIENS.chargers[q]].y >=
							INI.GAME_HEIGHT +
							parseInt(ALIENS.existence[ALIENS.chargers[q]].height / 2, 10)
						) {
							ALIENS.existence[ALIENS.chargers[q]].stage = "return";
							ALIENS.existence[ALIENS.chargers[q]].y = -parseInt(
								ALIENS.existence[ALIENS.chargers[q]].height / 2,
								10
							);
						}
						break;
					case "return":
						if (ALIENS.existence[ALIENS.chargers[q]].y < INI.TOP_Y) {
							ALIENS.existence[ALIENS.chargers[q]].y +=
								GAME.levels[GAME.level].chargerDescent;
						} else {
							ALIENS.existence[ALIENS.chargers[q]].stage = "attack";
						}
						break;
					case "turn":
						vy = GAME.levels[GAME.level].chargerDescent;
						vx = ALIENS.speed;
						angle = ALIENS.existence[ALIENS.chargers[q]].angle;
						var rotDir, vertDir;
						if (angle >= 180) {
							rotDir = -1;
						} else rotDir = 1;
						if (angle >= 0 && angle < 90) vertDir = 1;
						if (angle > 270 && angle < 360) vertDir = 1;
						if (angle === 90 || angle === 270) vertDir = 0;
						if (angle > 90 && angle <= 180) vertDir = -1;
						if (angle < 270 && angle > 180) vertDir = -1;
						angle = angle + 10 * rotDir;
						if (angle === 180) {
							ALIENS.existence[ALIENS.chargers[q]].score =
								ALIENS.existence[ALIENS.chargers[q]].score / 2;
							ALIENS.existence[ALIENS.chargers[q]].stage = "ascend";
						}
						ALIENS.existence[ALIENS.chargers[q]].angle = angle;
						ALIENS.existence[ALIENS.chargers[q]].x += vx * rotDir * -2;
						ALIENS.existence[ALIENS.chargers[q]].y += vy * vertDir;
						if (ALIENS.existence[ALIENS.chargers[q]].x > ENGINE.gameWIDTH)
							ALIENS.existence[ALIENS.chargers[q]].x = ENGINE.gameWIDTH;
						if (ALIENS.existence[ALIENS.chargers[q]].x < 0)
							ALIENS.existence[ALIENS.chargers[q]].x = 0;
						ALIENS.existence[ALIENS.chargers[q]].refresh();
						break;
					case "ascend":
						ALIENS.existence[ALIENS.chargers[q]].y -=
							GAME.levels[GAME.level].chargerDescent;
						if (ALIENS.existence[ALIENS.chargers[q]].y <= INI.TOP_Y + 64) {
							ALIENS.existence[ALIENS.chargers[q]].stage = "rotate";
						}
						break;
				}
			}
		}
		if (!ALIENS.moving) {
			ALIENS.moving = true;
			var options = [LEFT, RIGHT];
			ALIENS.dir = options[RND(0, 1)];
			ALIENS.dirCopy = ALIENS.dir;
		} else {
			var AEL = ALIENS.existence.length;
			var i;
			var minX = ENGINE.gameWIDTH;
			var maxX = 0;
			for (i = 0; i < AEL; i++) {
				if (ALIENS.existence[i].stage === "waiting") {
					if (ALIENS.existence[i].x > maxX) maxX = ALIENS.existence[i].x;
					if (ALIENS.existence[i].x < minX) minX = ALIENS.existence[i].x;
				}
			}
			if (maxX < minX) return;
			if (ALIENS.descent) {
				ALIENS.descent = false;
				ALIENS.dir = ALIENS.dirCopy.mirror();
				ALIENS.dirCopy = ALIENS.dir;
			} else {
				if (minX <= ALIENS.minX || maxX >= ALIENS.maxX) {
					ALIENS.dir = DOWN;
					ALIENS.descent = true;
				}
			}
			var index;
			for (index = 0; index < AEL; index++) {
				if (ALIENS.existence[index].stage === "waiting")
					ALIENS.existence[index].x += ALIENS.speed * ALIENS.dir.x;
				if (ALIENS.existence[index].stage === "waiting") {
					ALIENS.existence[index].y += ALIENS.Dspeed * ALIENS.dir.y;
					if (ALIENS.existence[index].y > INI.AUTO_ATTACK) {
						ALIENS.existence[index].type = "charger";
						ALIENS.existence[index].stage = "attack";
					}
				}
			}
		}
	},
	draw() {
		ENGINE.clearLayer("aliens");
		var LN = ALIENS.existence.length;
		var ix;
		for (ix = 0; ix < LN; ix++) {
			ENGINE.spriteDraw(
				"aliens",
				ALIENS.existence[ix].x,
				ALIENS.existence[ix].y,
				SPRITE[ALIENS.existence[ix].name]
			);
		}
		LN = ALIENS.chargers.length;
		for (var iy = 0; iy < LN; iy++) {
			ENGINE.spriteDraw(
				"aliens",
				ALIENS.existence[ALIENS.chargers[iy]].x,
				ALIENS.existence[ALIENS.chargers[iy]].y,
				SPRITE[ALIENS.existence[ALIENS.chargers[iy]].name]
			);
		}
	},
	shoot() {
		if (SHIP.dead) return;
		if (!ALIENS.ready) return;
		var ABP = ALIENS.bullet.arsenal.length;
		if (ABP >= GAME.levels[GAME.level].alienBullets) return;
		if (ALIENS.existence.length === 0) return;
		var toss = coinFlip();
		if (toss) return;
		var candidates = [];
		var AEL = ALIENS.existence.length;
		var X, Y;
		for (var z = AEL - 1; z >= 0; z--) {
			X = ALIENS.existence[z].x;
			Y = ALIENS.existence[z].y;
			if (candidates[X]) {
				if (Y > candidates[X].y) {
					candidates[X].y = Y;
					candidates[X].i = z;
				}
			} else {
				candidates[X] = { y: Y, i: z };
			}
		}
		var closest = [];
		var CL = candidates.length;
		for (var i = 0; i < CL; i++) {
			if (candidates[i]) {
				closest.push({ x: i, y: candidates[i].y, i: candidates[i].i });
			}
		}
		ALIENS.closest = closest;
		var selected = RND(0, closest.length - 1);
		if (probable(ALIENS.existence[closest[selected].i].probable)) {
			ALIENS.bullet.arsenal.push(
				new BulletClass(
					closest[selected].x,
					parseInt(
						closest[selected].y +
						ALIENS.existence[closest[selected].i].height / 2 +
						ALIENS.bullet.sprite.height / 2,
						10
					)
				)
			);
		}
	}
};
var EXPLOSIONS = {
	pool: [],
	draw() {
		ENGINE.clearLayer("explosion");
		var PL = EXPLOSIONS.pool.length;
		if (PL === 0) return;
		for (var instance = PL - 1; instance >= 0; instance--) {
			var sprite = EXPLOSIONS.pool[instance].pool.shift();
			ENGINE.spriteDraw(
				"explosion",
				EXPLOSIONS.pool[instance].x,
				EXPLOSIONS.pool[instance].y,
				SPRITE[sprite]
			);
			if (EXPLOSIONS.pool[instance].pool.length === 0) {
				EXPLOSIONS.pool.splice(instance, 1);
			}
		}
	}
};
var MeteorClass = function (actor, lives) {
	this.actor = actor;
	this.lives = lives;
};
var RUBBLE = {
	pool: [],
	purge(score) {
		var RPL = RUBBLE.pool.length;
		if (RPL === 0) return;
		for (var i = RPL - 1; i >= 0; i--) {
			RUBBLE.kill(i);
			if (score) GAME.score += 100;
		}
		TEXT.score();
	},
	kill(x) {
		EXPLOSIONS.pool.push(
			new AnimationSPRITE(
				RUBBLE.pool[x].actor.x,
				RUBBLE.pool[x].actor.y,
				"AstExp",
				12
			)
		);
		RUBBLE.pool.splice(x, 1);
	},
	draw() {
		var CTX = LAYER["rubble"];
		CTX.clearRect(0, INI.RUBBLE_Y - 64, ENGINE.gameWIDTH, 128);
		var PL = RUBBLE.pool.length;
		var i;
		for (i = 0; i < PL; i++) {
			ENGINE.spriteDraw(
				"rubble",
				RUBBLE.pool[i].actor.x,
				RUBBLE.pool[i].actor.y,
				SPRITE[RUBBLE.pool[i].actor.name]
			);
		}
	},
	set(num) {
		var width = parseInt((SHIP.maxX - SHIP.minX) / (num - 1), 10);
		var graphics = [
			"Asteroid1",
			"Asteroid2",
			"Asteroid3",
			"Asteroid4",
			"Asteroid5",
			"Asteroid6"
		];
		var pool = [].concat(graphics);
		var PL = pool.length;
		while (PL < num) {
			pool.push(graphics[RND(0, graphics.length - 1)]);
			PL = pool.length;
		}
		pool.shuffle;
		var index;
		var meteor, actor;
		for (index = 0; index < num; index++) {
			actor = new ACTOR(
				pool[index],
				SHIP.minX + index * width,
				RNDy(),
				RND(0, 35) * 10,
				1
			);
			meteor = new MeteorClass(actor, 4);
			RUBBLE.pool.push(meteor);
		}
		return;

		function RNDy() {
			var flip = coinFlip();
			var Y = RND(1, 24);
			if (flip) {
				return INI.RUBBLE_Y + Y;
			} else {
				return INI.RUBBLE_Y - Y;
			}
		}
	},
	move() {
		var PL = RUBBLE.pool.length;
		var i;
		for (i = 0; i < PL; i++) {
			RUBBLE.pool[i].actor.x += 1;
			if (RUBBLE.pool[i].actor.x > ENGINE.gameWIDTH + INI.METEOR_OUT)
				RUBBLE.pool[i].actor.x = -INI.METEOR_OUT;
			if (probable(INI.METEOR_ROTATION_PROBABILITY)) {
				RUBBLE.pool[i].actor.angle += 5;
				if (RUBBLE.pool[i].actor.angle === 360) RUBBLE.pool[i].actor.angle = 0;
				RUBBLE.pool[i].actor.refresh();
			}
		}
	}
};
*/
//////////////

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

		//$(document).keyup(GAME.clearKey);

		//$("#bottom")[0].scrollIntoView();
		//$(document).keydown(GAME.checkKey);
		//$(document).keyup(GAME.clearKey);
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

		/*
		ALIENS.init();
		ALIENS.ready = false;
		SHIP.dead = false;
		SHIP.firstInit(); //
		GAME.stopAnimation = false;
		GAME.initLevel(GAME.level);
		GAME.frame = {};
		GAME.frame.start = null;
		GAME.firstFrameDraw();
		GAME.run();*/

		/** DEBUG */
		//ENGINE.GAME.ANIMATION.stop();
	},
	setup() {
		console.info("GAME SETUP");
	},
	prepareForRestart() {
		let clear = ["background", "text", "FPS", "button", "bottomText"];
		ENGINE.clearManylayers(clear);
	},
	levelStart(level) {
		console.info(" - start -", GAME.level);
		GAME.prepareForRestart();
		//DESTRUCTION_ANIMATION.init(null);
		//PROFILE_BALLISTIC.init(MAP[GAME.getRealLevel()]);
		//PROFILE_ACTORS.init(MAP[GAME.getRealLevel()]);
		//GAME.initLevel(GAME.getRealLevel());
		GAME.initLevel(level);
		GAME.continueLevel(level);
	},
	initLevel(level) {
		console.info("init level", level);
		GAME.levelComplete = false;

		SHIP.shots = 0;
		SHIP.killShots = 0;
		SHIP.ship = MAP[level].ship;
		SHIP.init();
		SHIP.bullet.init();
		SHIP.bullet.max = MAP[level].maxBullets;

		/** */
	},
	/*
initLevel(level) {
		if (level > INI.LAST_LEVEL) {
			GAME.createLevel(level);
		}
		GAME.levelComplete = false;
		SHIP.shots = 0;
		SHIP.killShots = 0;
		SHIP.ship = GAME.levels[level].ship;
		SHIP.init();
		SHIP.bullet.init();
		SHIP.bullet.max = GAME.levels[level].maxBullets;
		ALIENS.speed = GAME.levels[level].AXS;
		ALIENS.Dspeed = GAME.levels[level].AYS;
		console.log("initlevel ", level);
		var layout = GAME.levels[level].layout;
		var center = parseInt(ENGINE.gameWIDTH / 2, 10);
		for (var row in layout) {
			var odd = layout[row].num % 2;
			var count = layout[row].num;
			var xes = [];
			if (odd) {
				xes.push(center);
				count--;
			}
			var round = 1;
			while (count) {
				xes.push(center + round * INI.PADDING);
				xes.push(center - round * INI.PADDING);
				count -= 2;
				round++;
			}
			var LN = xes.length;
			var Y = INI.TOP_Y + parseInt(row, 10) * INI.PADDING;
			for (var q = 0; q < LN; q++) {
				var angle = 0;
				if (layout[row].type === "charger") angle = 180;
				if (layout[row].actor === "random") {
					layout[row].actor = AlienShips[RND(0, AlienShips.length - 1)];
				}
				ALIENS.existence.push(
					new ACTOR(
						layout[row].actor,
						xes[q],
						Y,
						angle,
						layout[row].score,
						layout[row].probable
					)
				);
				if (layout[row].type === "charger")
					ALIENS.existence[ALIENS.existence.length - 1].type = "charger";
			}
		}
		RUBBLE.set(GAME.levels[level].asteroids);
	},
	*/

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

		GAME.respond(lapsedTime);
		GAME.frameDraw(lapsedTime);
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
	firstFrameDraw() {
		TITLE.render();
		BACKGROUND.render();
		TEXT.ships();
		TEXT.score();
		SHIP.draw();
		//ALIENS.draw();
		//RUBBLE.draw();
	},
	frameDraw(lapsedTime) {
		ENGINE.clearLayerStack();
		SHIP.draw();
		SHIP.bullet.draw();

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

class Bullet {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

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
			SHIP.bullet.arsenal.push(new Bullet(SHIP.x, parseInt(SHIP.y - SHIP.sprite.height / 2 - SHIP.bullet.sprite.height / 2, 10)));
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
	/*
	bigText(text, fs) {
		var x = ENGINE.gameWIDTH / 2;
		var y = INI.GAME_HEIGHT / 2;
		TITLE.text(text, fs, x, y);
	},
	*/
	centeredText(text, fs = 48) {
		let GameRD = new RenderData("Arcade", fs, "#DDD", "text", "#000", 2, 2, 2);
		ENGINE.TEXT.setRD(GameRD);
		ENGINE.TEXT.centeredText(text, ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2);
	},
	/*
	text(text, fs, x, y) {
		console.warn(text, fs, x, y);
		var CTX = LAYER["text"];
		CTX.fillStyle = "#FFF";
		CTX.font = fs + "px Arcade";
		CTX.shadowColor = "#333333";
		CTX.shadowOffsetX = 3;
		CTX.shadowOffsetY = 3;
		CTX.shadowBlur = 3;
		CTX.textAlign = "center";
		CTX.fillText(text, x, y);
	},
	*/
	gameOver() {
		TITLE.centeredText("GAME OVER", 120);
		//TITLE.bigText("GAME OVER", 120);
	},
	getReady() {
		if (GAME.levelComplete) return;
		ENGINE.clearLayer("text");
		TITLE.centeredText("GET READY FOR WAVE " + GAME.level);
		console.log("GET READY FOR WAVE " + GAME.level);
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
