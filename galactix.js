/////////////////////////////////////////////////
/*
 
 to do:

 known bugs: 

 */
/////////////////////misc/////////////////////////
(function() {
	function RND(start, end) {
		return Math.floor(Math.random() * (++end - start) + start);
	}

	function coinFlip() {
		var flip = RND(0, 1);
		if (flip) return true;
		return false;
	}
	function probable(x) {
		var flip = RND(0, 99);
		if (flip <= x) return true;
		return false;
	}
	function MAX() {
		var i;
		var max = arguments[0];
		var AL = arguments.length;
		for (i = 1; i < AL; i++) {
			if (arguments[i] > max) max = arguments[i];
		}
		return max;
	}
	function MIN() {
		var i;
		var min = arguments[0];
		var AL = arguments.length;
		for (i = 1; i < AL; i++) {
			if (arguments[i] < min) min = arguments[i];
		}
		return min;
	}
	window.MAX = MAX;
	window.MIN = MIN;
	window.RND = RND;
	window.coinFlip = coinFlip;
	window.probable = probable;
})();

/////////////debug vars: remove all in production/////////////////////
var DEBUG = {};
//DEBUG.CHEAT = true;
//DEBUG.ENDLESS_LIFE = true;
//DEBUG.INVINCIBLE = true;
//DEBUG.INVINCIBLE = false;
//DEBUG.CHEAT = false;
DEBUG.LEVEL = 10;
////////////////////////////////////////////////////////////////////

CanvasRenderingContext2D.prototype.roundRect = function(
	x,
	y,
	width,
	height,
	radius,
	fill,
	stroke
) {
	var cornerRadius = {
		upperLeft: 0,
		upperRight: 0,
		lowerLeft: 0,
		lowerRight: 0
	};
	if (typeof stroke == "undefined") {
		stroke = true;
	}
	if (typeof radius === "object") {
		for (var side in radius) {
			cornerRadius[side] = radius[side];
		}
	}
	this.beginPath();
	this.moveTo(x + cornerRadius.upperLeft, y);
	this.lineTo(x + width - cornerRadius.upperRight, y);
	this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
	this.lineTo(x + width, y + height - cornerRadius.lowerRight);
	this.quadraticCurveTo(
		x + width,
		y + height,
		x + width - cornerRadius.lowerRight,
		y + height
	);
	this.lineTo(x + cornerRadius.lowerLeft, y + height);
	this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
	this.lineTo(x, y + cornerRadius.upperLeft);
	this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
	this.closePath();
	if (stroke) {
		this.stroke();
	}
	if (fill) {
		this.fill();
	}
};

/* collection of prototypes LS */

Array.prototype.clear = function() {
	if (!this) return false;
	this.splice(0, this.length);
};

Array.prototype.swap = function(x, y) {
	var TMP = this[x];
	this[x] = this[y];
	this[y] = TMP;
	return this;
};

Array.prototype.shuffle = function() {
	var i = this.length,
		j;
	while (--i > 0) {
		j = rnd(0, i);
		this.swap(i, j);
	}
	return this;

	function rnd(start, end) {
		return Math.floor(Math.random() * (++end - start) + start);
	}
};

Array.prototype.sum = function() {
	var x = this.length;
	var total = 0;
	for (var y = 0; y < x; y++) {
		total += this[y];
	}
	return total || -1;
};

Array.prototype.average = function() {
	var sum = this.sum();
	var x = this.length;
	return sum / x || -1;
};

Array.prototype.createPool = function(mx, N) {
	if (!this) return false;
	this.clear();
	var tempArray = [];
	for (var ix = 0; ix < mx; ix++) {
		tempArray[ix] = ix;
	}
	var top;
	for (var iy = 0; iy < N; iy++) {
		top = tempArray.length;
		var addx = rnd(0, top - 1);
		this[iy] = tempArray[addx];
		tempArray.splice(addx, 1);
	}
	return this;

	function rnd(start, end) {
		return Math.floor(Math.random() * (++end - start) + start);
	}
};

Array.prototype.compare = function(array) {
	if (!array) return false;
	var LN = this.length;
	if (LN !== array.length) return false;
	for (var x = 0; x < LN; x++) {
		if (this[x] !== array[x]) return false;
	}
	return true;
};

Array.prototype.remove = function(value) {
	var LN = this.length;
	for (var x = 0; x < LN; x++) {
		if (this[x] === value) {
			this.splice(x, 1);
			this.remove(value);
		}
	}
};

Array.prototype.chooseRandom = function() {
	var LN = this.length;
	var choose = rnd(1, LN) - 1;
	return this[choose];

	function rnd(start, end) {
		return Math.floor(Math.random() * (++end - start) + start);
	}
};

Array.prototype.removeRandom = function() {
	var LN = this.length;
	var choose = rnd(1, LN) - 1;
	return this.splice(choose, 1);

	function rnd(start, end) {
		return Math.floor(Math.random() * (++end - start) + start);
	}
};

String.prototype.fill = function(stringy, howMany) {
	var s = "";
	for (;;) {
		if (howMany & 1) s += stringy;
		howMany >>= 1;
		if (howMany) stringy += stringy;
		else break;
	}
	return s;
};

String.prototype.padLeft = function(LN, fill) {
	var s = "".fill(fill, LN) + this;
	return s.substring(s.length - LN);
};

String.prototype.padRight = function(LN, fill) {
	var s = this + "".fill(fill, LN);
	return s.substring(0, LN);
};

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
};
var Vector = function(x, y) {
	this.x = parseInt(x, 10);
	this.y = parseInt(y, 10);
};
var Pointer = function(x, y, vector) {
	this.x = x;
	this.y = y;
	this.vector = vector;
};
Vector.prototype.add = function(vector) {
	return new Vector(this.x + vector.x, this.y + vector.y);
};
Vector.prototype.mul = function(vector, num) {
	return new Vector(this.x + num * vector.x, this.y + num * vector.y);
};
Vector.prototype.distance = function(vector) {
	var distance = Math.abs(this.x - vector.x) + Math.abs(this.y - vector.y);
	return distance;
};
Vector.prototype.mirror = function() {
	var nx, ny;
	if (this.x) {
		nx = -this.x;
	} else {
		nx = 0;
	}
	if (this.y) {
		ny = -this.y;
	} else {
		ny = 0;
	}
	return new Vector(nx, ny);
};
Vector.prototype.direction = function(vector) {
	var dx = (vector.x - this.x) / Math.abs(this.x - vector.x) || 0;
	var dy = (vector.y - this.y) / Math.abs(this.y - vector.y) || 0;
	return new Vector(dx, dy);
};
var Square = function(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
};
var UP = new Vector(0, -1);
var DOWN = new Vector(0, 1);
var LEFT = new Vector(-1, 0);
var RIGHT = new Vector(1, 0);

//////////////////engine.js/////////////////////////
var ENGINE = {
	init: function() {
		LAYER = {};
		SPRITE = {};
		$("#temp").append("<canvas id ='temp_canvas'></canvas>");
		$("#temp2").append("<canvas id ='temp_canvas2'></canvas>");
		LAYER.temp = $("#temp_canvas")[0].getContext("2d");
		LAYER.temp2 = $("#temp_canvas2")[0].getContext("2d");
	},
	gameWindowId: "#game",
	gameWIDTH: 960,
	currentTOP: 0,
	addBOX: function(id, height, layers, alias) {
		if (id == null) return;
		if (height == null) return;
		layers = layers || 1;
		$(ENGINE.gameWindowId).append(
			"<div id ='" + id + "' style='position: relative'></div>"
		);
		var prop;
		if (layers === 1) {
			$("#" + id).append(
				"<canvas id='" +
					id +
					"_canvas' width='" +
					ENGINE.gameWIDTH +
					"' height='" +
					height +
					"'></canvas>"
			);
			prop = alias.shift();
			LAYER[prop] = $("#" + id + "_canvas")[0].getContext("2d");
		} else {
			var canvasElement;
			for (var x = 0; x < layers; x++) {
				canvasElement =
					"<canvas class='layer' id='" +
					id +
					"_canvas_" +
					x +
					"' width='" +
					ENGINE.gameWIDTH +
					"' height='" +
					height +
					"' style='z-index:" +
					x +
					"; top:" +
					ENGINE.currentTOP +
					"px'></canvas>";
				$("#" + id).append(canvasElement);
				prop = alias.shift();
				LAYER[prop] = $("#" + id + "_canvas_" + x)[0].getContext("2d");
			}
			ENGINE.currentTOP = ENGINE.currentTOP + height;
		}
	},
	spriteDraw: function(layer, X, Y, image) {
		var CX = X - image.width / 2;
		var CY = Y - image.height / 2;
		var CTX = LAYER[layer];
		CTX.drawImage(image, CX, CY);
	},
	draw: function(layer, X, Y, image) {
		var CTX = LAYER[layer];
		CTX.drawImage(image, X, Y);
	},
	clearLayer: function(layer) {
		var CTX = LAYER[layer];
		CTX.clearRect(0, 0, CTX.canvas.width, CTX.canvas.height);
	},
	fillLayer: function(layer, colour) {
		var CTX = LAYER[layer];
		CTX.fillStyle = colour;
		CTX.fillRect(0, 0, CTX.canvas.width, CTX.canvas.height);
	},
	tileToImage: function() {
		var image;
		for (var prop in World) {
			var LN = World[prop].length;
			if (LN) {
				for (var ix = 0; ix < LN; ix++) {
					image = $("#" + World[prop][ix].id)[0];
					SPRITE[World[prop][ix].name] = image;
				}
			}
		}
	},
	trimCanvas: function(data) {
		var top = 0,
			bottom = data.height,
			left = 0,
			right = data.width;
		var width = data.width;
		while (top < bottom && rowBlank(data, width, top)) ++top;
		while (bottom - 1 > top && rowBlank(data, width, bottom - 1)) --bottom;
		while (left < right && columnBlank(data, width, left, top, bottom)) ++left;
		while (right - 1 > left && columnBlank(data, width, right - 1, top, bottom))
			--right;

		return { left: left, top: top, right: right, bottom: bottom };

		function rowBlank(data, width, y) {
			for (var x = 0; x < width; ++x) {
				if (data.data[y * width * 4 + x * 4 + 3] !== 0) return false;
			}
			return true;
		}

		function columnBlank(data, width, x, top, bottom) {
			for (var y = top; y < bottom; ++y) {
				if (data.data[y * width * 4 + x * 4 + 3] !== 0) return false;
			}
			return true;
		}
	},
	rotateImage: function(image, degree, newName) {
		var CTX = LAYER.temp;
		var CW = image.width;
		var CH = image.height;
		var max = MAX(CW, CH);
		var min = MAX(CW, CH);
		CTX.canvas.width = max * 2;
		CTX.canvas.height = max * 2;
		CTX.save();
		CTX.translate(CW, CH);
		CTX.rotate(degree * Math.PI / 180);
		CTX.drawImage(image, -min / 2, -min / 2);
		CTX.restore();
		var imgDATA = CTX.getImageData(0, 0, CTX.canvas.width, CTX.canvas.height);
		var TRIM = ENGINE.trimCanvas(imgDATA);
		var trimmed = CTX.getImageData(
			TRIM.left,
			TRIM.top,
			TRIM.right - TRIM.left,
			TRIM.bottom - TRIM.top
		);
		CTX.canvas.width = TRIM.right - TRIM.left;
		CTX.canvas.height = TRIM.bottom - TRIM.top;
		CTX.putImageData(trimmed, 0, 0);
		SPRITE[newName] = new Image();
		SPRITE[newName].onload = ENGINE.creationSpriteCount;
		SPRITE[newName].crossOrigin = "Anonymous";
		SPRITE[newName].src = CTX.canvas.toDataURL("image/png");
		SPRITE[newName].width = CTX.canvas.width;
		SPRITE[newName].height = CTX.canvas.height;
	},
	createSprites: function() {
		var LN = Creation.length;
		var totalLength = 0;
		for (var x = 0; x < LN; x++) {
			var LAN = Creation[x].angles.length;
			if (LAN === 0) {
				for (
					var q = Creation[x].series.first;
					q <= Creation[x].series.last;
					q += Creation[x].series.step
				) {
					Creation[x].angles.push(q);
				}
			}
			LAN = Creation[x].angles.length;
			totalLength += LAN;
			for (var y = 0; y < LAN; y++) {
				var newName = Creation[x].name + "_" + Creation[x].angles[y];
				ENGINE.rotateImage(Creation[x].origin, Creation[x].angles[y], newName);
			}
		}
		PRG.HMCI = totalLength;
	},
	creationSpriteCount: function() {
		PRG.spriteCount++;
		ENGINE.drawLoadingGraph(PRG.spriteCount, PRG.HMCI, "Sprites");
		if (PRG.spriteCount === PRG.HMCI) {
			$("#buttons").prepend("<input type='button' id='startGame' value='START'>");
			$("#load").addClass("hidden");
			$("#startGame").on("click", PRG.start);
		}
	},
	collision: function(actor1, actor2) {
		var X = Math.abs(actor1.x - actor2.x);
		var Y = Math.abs(actor1.y - actor2.y);
		if (Y >= INI.COLLISION_SAFE) return false;
		if (X >= INI.COLLISION_SAFE) return false;
		var w1 = parseInt(actor1.width / 2, 10);
		var w2 = parseInt(actor2.width / 2, 10);
		var h1 = parseInt(actor1.height / 2, 10);
		var h2 = parseInt(actor2.height / 2, 10);
		if ((X >= w1 + w2) || (Y >= h1 + h2)) return false; //no rectangle overlapping 

		var act1 = new Vector(actor1.x, actor1.y);
		var act2 = new Vector(actor2.x, actor2.y);
		var SQ1 = new Square(act1.x - w1, act1.y - h1, w1 * 2, h1 * 2);
    var SQ2 = new Square(act2.x - w2, act2.y - h2, w2 * 2, h2 * 2);
		
		var x = parseInt(MAX(SQ1.x, SQ2.x), 10) - 1;
    var y = parseInt(MAX(SQ1.y, SQ2.y), 10) - 1;
    var w = parseInt(MIN(SQ1.x + SQ1.w - x, SQ2.x + SQ2.w - x), 10) + 1;
    var h = parseInt(MIN(SQ1.y + SQ1.h - y, SQ2.y + SQ2.h - y), 10) + 1;
		if (w === 0 || h === 0) return false;
		
		var area = new Square(x, y, w, h);
		var area1 = new Square(
      area.x - SQ1.x, 
      area.y - SQ1.y,
      area.w,
      area.h
    );

    var area2 = new Square(
      area.x - SQ2.x, 
      area.y - SQ2.y,
      area.w,
      area.h
    );
		var CTX1 = LAYER.temp;
		var CTX2 = LAYER.temp2;
		
		CTX1.canvas.width = INI.sprite_maxW;
    CTX1.canvas.height = INI.sprite_maxH;
    CTX2.canvas.width = INI.sprite_maxW;
    CTX2.canvas.height = INI.sprite_maxH;
		
		
		ENGINE.draw("temp", 0, 0, SPRITE[actor1.name]);
		ENGINE.draw("temp2", 0, 0, SPRITE[actor2.name]);
		var data1 = CTX1.getImageData(area1.x, area1.y, area1.w, area1.h);
		var data2 = CTX2.getImageData(area2.x, area2.y, area2.w, area2.h);
		var DL = data1.data.length;
		var index;
		for (index = 3; index < DL; index += 4) {
			if (data1.data[index] > 0 && data2.data[index] > 0) return true;
		}
		return false;
	},
	collisionBulletShip: function() {
		if (SHIP.dead) return;
		if (DEBUG.INVINCIBLE) return;
		if (!SHIP.live) return;
		var SBAL = ALIENS.bullet.arsenal.length;
		if (SBAL === 0) return;
		var ship = new ACTOR(SHIP.ship, SHIP.x, SHIP.y, 0);
		for (var q = SBAL - 1; q >= 0; q--) {
			var BulletActor = new ACTOR(
				"alienbullet",
				ALIENS.bullet.arsenal[q].x,
				ALIENS.bullet.arsenal[q].y,
				0
			);
			var hit = ENGINE.collision(BulletActor, ship);
			if (hit) {
				EXPLOSIONS.pool.push(new AnimationSPRITE(SHIP.x, SHIP.y, "ShipExp", 8));
				ALIENS.bullet.kill(q);
				if (!DEBUG.ENDLESS_LIFE) GAME.lives--;
				TEXT.ships();
				ALIENS.ready = false;
				if (ALIENS.existence.length === 0) GAME.levelComplete = true;
				SHIP.live = false;
				SHIP.init();
				break;
			}
		}
		if (GAME.lives < 0) GAME.over();
	},
	collisionBulletAlien: function() {
		var SBAL = SHIP.bullet.arsenal.length;
		if (SBAL === 0) return;
		for (var q = SBAL - 1; q >= 0; q--) {
			var BulletActor = new ACTOR(
				"bullet",
				SHIP.bullet.arsenal[q].x,
				SHIP.bullet.arsenal[q].y,
				0
			);
			var AEL = ALIENS.existence.length;
			var hit;
			for (var w = AEL - 1; w >= 0; w--) {
				hit = ENGINE.collision(BulletActor, ALIENS.existence[w]);
				if (hit) {
					GAME.score += ALIENS.existence[w].score;
					SHIP.killShots += 1;
					TEXT.score();
					EXPLOSIONS.pool.push(
						new AnimationSPRITE(
							ALIENS.existence[w].x,
							ALIENS.existence[w].y,
							"AlienExp",
							6
						)
					);
					ALIENS.existence.splice(w, 1);
					SHIP.bullet.kill(q);
					if (ALIENS.existence.length === 0) {
						console.log("Level " + GAME.level + " clear!");
						GAME.levelComplete = true;
						GAME.endLevel();
					}
					break;
				}
			}
		}
	},
	collisionAlienShip: function() {
		if (SHIP.dead) return;
		if (DEBUG.INVINCIBLE) return;
		if (!SHIP.live) return;
		var ship = new ACTOR(SHIP.ship, SHIP.x, SHIP.y, 0);
		var AEL = ALIENS.existence.length;
		var hit;
		for (var w = AEL - 1; w >= 0; w--) {
			hit = ENGINE.collision(ship, ALIENS.existence[w]);
			if (hit) {
				GAME.score += ALIENS.existence[w].score;
				TEXT.score();
				EXPLOSIONS.pool.push(
					new AnimationSPRITE(
						ALIENS.existence[w].x,
						ALIENS.existence[w].y,
						"AlienExp",
						6
					)
				);
				ALIENS.existence.splice(w, 1);
				EXPLOSIONS.pool.push(new AnimationSPRITE(SHIP.x, SHIP.y, "ShipExp", 8));
				if (!DEBUG.ENDLESS_LIFE) GAME.lives--;
				TEXT.ships();
				ALIENS.ready = false;
				if (ALIENS.existence.length === 0) GAME.levelComplete = true;
				SHIP.init();
				SHIP.live = false;
				break;
			}
		}
		if (GAME.lives < 0) GAME.over();
	},
	collisionBulletRubble: function() {
		var SBAL = SHIP.bullet.arsenal.length;
		var ABAL = ALIENS.bullet.arsenal.length;
		var RPL = RUBBLE.pool.length;
		var hit;
		if (SBAL === 0 && ABAL === 0) return false;
		if (SBAL > 0) {
			for (var q = SBAL - 1; q >= 0; q--) {
				var BulletActor = new ACTOR(
					"bullet",
					SHIP.bullet.arsenal[q].x,
					SHIP.bullet.arsenal[q].y,
					0
				);
				RPL = RUBBLE.pool.length;
				for (var w = RPL - 1; w >= 0; w--) {
					hit = ENGINE.collision(BulletActor, RUBBLE.pool[w].actor);
					if (hit) {
						SHIP.bullet.kill(q);
						RUBBLE.pool[w].lives--;
						if (RUBBLE.pool[w].lives <= 0) {
							GAME.score += RUBBLE.pool[w].actor.score;
							TEXT.score();
							RUBBLE.kill(w);
						}
					}
				}
			}
		}
		if (ABAL > 0) {
			for (var z = ABAL - 1; z >= 0; z--) {
				var AlienBullet = new ACTOR(
					"alienbullet",
					ALIENS.bullet.arsenal[z].x,
					ALIENS.bullet.arsenal[z].y,
					0
				);
				RPL = RUBBLE.pool.length;
				for (var ww = RPL - 1; ww >= 0; ww--) {
					hit = ENGINE.collision(AlienBullet, RUBBLE.pool[ww].actor);
					if (hit) {
						ALIENS.bullet.kill(z);
						RUBBLE.pool[ww].lives--;
						if (RUBBLE.pool[ww].lives <= 0) {
							GAME.score += RUBBLE.pool[ww].actor.score;
							TEXT.score();
							RUBBLE.kill(ww);
						}
					}
				}
			}
		}
	},
	collisionAlienRubble: function() {
		var AEL = ALIENS.existence.length;
		var RPL = RUBBLE.pool.length;
		if (AEL === 0 || RPL === 0) return false;
		var hit;
		for (var q = RPL - 1; q >= 0; q--) {
			AEL = ALIENS.existence.length;
			for (var w = AEL - 1; w >= 0; w--) {
				hit = ENGINE.collision(ALIENS.existence[w], RUBBLE.pool[q].actor);
				if (hit) {
					GAME.score += ALIENS.existence[w].score;
					TEXT.score();
					EXPLOSIONS.pool.push(
						new AnimationSPRITE(
							ALIENS.existence[w].x,
							ALIENS.existence[w].y,
							"AlienExp",
							6
						)
					);
					ALIENS.existence.splice(w, 1);
					if (ALIENS.existence.length === 0) {
						GAME.levelComplete = true;
						GAME.endLevel();
					}
					RPL = RUBBLE.pool.length;
					if (RPL === 0) return;
					RUBBLE.pool[q].lives--;
					if (RUBBLE.pool[q].lives <= 0) {
						GAME.score += RUBBLE.pool[q].actor.score;
						TEXT.score();
						RUBBLE.kill(q);
						break;
					}
				}
			}
		}
	},
	drawLoadingGraph: function(count, HMI, text) {
		var percent = Math.floor(count / HMI * 100);
		var CTX = PRG.ctx;
		CTX.clearRect(0, 0, INI.LOAD_W, INI.LOAD_H);
		CTX.beginPath();
		CTX.lineWidth = "1";
		CTX.strokeStyle = "black";
		CTX.rect(0, 0, INI.LOAD_W, INI.LOAD_H);
		CTX.closePath();
		CTX.stroke();
		CTX.fillStyle = "#999";
		CTX.fillRect(
			1,
			1,
			Math.floor((INI.LOAD_W - 2) * (percent / 100)),
			INI.LOAD_H - 2
		);
		CTX.fillStyle = "black";
		CTX.font = "10px Verdana";
		CTX.fillText(
			text + ": " + percent + "%",
			INI.LOAD_W * 0.1,
			INI.LOAD_H * 0.62
		);
		return;
	}
};

///////////////////////////////prg.js/////////////////////

var PRG = {
	VERSION: "1.04",
	NAME: "GalactiX",
	SOURCE: "https://www.c00lsch00l.eu/Games/AA/",
	SRC_rel: "/Games/AA/",
	tileGraphics: [],
	INIT: function() {
		console.clear();
		console.log(
			PRG.NAME +
				" " +
				PRG.VERSION +
				" by Lovro Selic, (c) C00lSch00l 2017 on " +
				navigator.userAgent
		);
		PRG.isFirefox = navigator.userAgent.indexOf("Firefox");
		$("#title").html(PRG.NAME);
		$("#version").html(
			PRG.NAME +
				" V" +
				PRG.VERSION +
				" by Lovro Selič <span style='font-size:14px'>&copy</span> C00lSch00l 2017"
		);
		$("input#toggleAbout").val("About " + PRG.NAME);
		$("#about fieldset legend").append(" " + PRG.NAME + " ");
		$("#load").append(
			"<canvas id ='preload_canvas' width='" +
				INI.LOAD_W +
				"' height='" +
				INI.LOAD_H +
				"'></canvas>"
		);
		PRG.ctx = $("#preload_canvas")[0].getContext("2d");
		ENGINE.init();
		$(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
		ENGINE.addBOX("TITLE", INI.TITLE_HEIGHT, 1, ["title"]);
		ENGINE.addBOX("ROOM", INI.GAME_HEIGHT, 8, [
			"background",
			"sign",
			"ship",
			"aliens",
			"explosion",
			"rubble",
			"bullets",
			"text"
		]);

		$("#temp").append("<canvas id ='temp_canvas'></canvas>");
	},
	setup: function() {
		$("#toggleHelp").click(function() {
			$("#help").toggle(400);
		});
		$("#toggleAbout").click(function() {
			$("#about").toggle(400);
		});
	},
	start: function() {
		console.log(PRG.NAME + " started.");
		$("#startGame").addClass("hidden");

		$(document).keypress(function(event) {
			if (event.which === 32) {
				event.preventDefault();
			}
		});
		$(document).keypress(function(event) {
			if (event.which === 13) {
				event.preventDefault();
			}
		});

		GAME.start();
	},
	preLoadImages: function() {
		PRG.count = 0;
		PRG.spriteCount = 0;
		var fileNames = getImgFileNames();
		PRG.HMI = fileNames.length;
		for (var ix = 0; ix < PRG.HMI; ix++) {
			PRG.tileGraphics[ix] = new Image();
			PRG.tileGraphics[ix].onload = cnt;
			PRG.tileGraphics[ix].crossOrigin = "Anonymous";
			PRG.tileGraphics[ix].src = fileNames[ix].filename;
			$("#preload").append(
				"<img id='" +
					fileNames[ix].id +
					"' src='" +
					fileNames[ix].filename +
					"' crossOrigin='Anonymous'/>"
			);
		}
		return;

		function cnt() {
			PRG.count++;
			ENGINE.drawLoadingGraph(PRG.count, PRG.HMI, "Loading");

			if (PRG.count === PRG.HMI) {
				PRG.imagesLoaded = true;
				ENGINE.tileToImage();
				Creation = [
					{
						origin: SPRITE.invader,
						name: "invader",
						angles: [],
						series: { first: 0, last: 355, step: 5 }
					},
					{
						origin: SPRITE.redinvader,
						name: "redinvader",
						angles: [],
						series: { first: 0, last: 355, step: 5 }
					},
					{
						origin: SPRITE.greeninvader,
						name: "greeninvader",
						angles: [],
						series: { first: 0, last: 355, step: 5 }
					},
					{
						origin: SPRITE.bullet,
						name: "bullet",
						angles: [0]
					},
					{
						origin: SPRITE.alienbullet,
						name: "alienbullet",
						angles: [0]
					},
					{
						origin: SPRITE.whiteship,
						name: "whiteship",
						angles: [0]
					},
					{
						origin: SPRITE.darkship,
						name: "darkship",
						angles: [0]
					},
					{
						origin: SPRITE.redship,
						name: "redship",
						angles: [0]
					},
					{
						origin: SPRITE.redship,
						name: "slimship",
						angles: [0]
					},
					{
						origin: SPRITE.Asteroid1,
						name: "Asteroid1",
						angles: [],
						series: { first: 0, last: 355, step: 5 }
					},
					{
						origin: SPRITE.Asteroid2,
						name: "Asteroid2",
						angles: [],
						series: { first: 0, last: 355, step: 5 }
					},
					{
						origin: SPRITE.Asteroid3,
						name: "Asteroid3",
						angles: [],
						series: { first: 0, last: 355, step: 5 }
					},
					{
						origin: SPRITE.Asteroid4,
						name: "Asteroid4",
						angles: [],
						series: { first: 0, last: 355, step: 5 }
					},
					{
						origin: SPRITE.Asteroid5,
						name: "Asteroid5",
						angles: [],
						series: { first: 0, last: 355, step: 5 }
					},
					{
						origin: SPRITE.Asteroid6,
						name: "Asteroid6",
						angles: [],
						series: { first: 0, last: 355, step: 5 }
					},
					{
						origin: SPRITE.basic1Fighter,
						name: "basic1Fighter",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic3Attacker,
						name: "basic3Attacker",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic1Attacker,
						name: "basic1Attacker",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic1Charger,
						name: "basic1Charger",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic2Attacker,
						name: "basic2Attacker",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic4Attacker,
						name: "basic4Attacker",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic2Fighter,
						name: "basic2Fighter",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic2Charger,
						name: "basic2Charger",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic5Attacker,
						name: "basic5Attacker",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic3Fighter,
						name: "basic3Fighter",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic3Charger,
						name: "basic3Charger",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic4Charger,
						name: "basic4Charger",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic7Attacker,
						name: "basic7Attacker",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic4Fighter,
						name: "basic4Fighter",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic5Fighter,
						name: "basic5Fighter",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic6Fighter,
						name: "basic6Fighter",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic7Fighter,
						name: "basic7Fighter",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic8Fighter,
						name: "basic8Fighter",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic6Attacker,
						name: "basic6Attacker",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.basic5Attacker,
						name: "basic5Attacker",
						angles: [],
						series: { first: 0, last: 350, step: 10 }
					},
					{
						origin: SPRITE.alienMother,
						name: "alienMother",
						angles: [],
						series: { first: 0, last: 355, step: 5 }
					}
				];

				ENGINE.createSprites();
			}
		}

		function getImgFileNames() {
			var fileNames = [];
			for (var prop in World) {
				var LN = World[prop].length;
				if (LN) {
					for (var ix = 0; ix < LN; ix++) {
						var name = PRG.SOURCE + World[prop][ix].id + "." + World[prop][ix].type;
						fileNames.push({
							id: World[prop][ix].id,
							filename: name
						});
					}
				}
			}
			return fileNames;
		}
	}
};

var CONST = {
	SPACE: "\u0020",
	NBS: "&nbsp",
	NEWLINE: "\n"
};
var INI = {
	LOAD_W: 202,
	LOAD_H: 22
};
INI.TITLE_HEIGHT = 72;
INI.GAME_HEIGHT = 768;
INI.ANIMATION_INTERVAL = 17;
INI.BORDER_PADDING = 24;
INI.BOTTOM_PADDING = 32;
INI.SHIPS_SPACE = 96;
INI.BULLET_TIMEOUT = 200;
INI.COLLISION_SAFE = 50;
INI.PADDING = 72;
INI.TOP_Y = 24;
INI.ALIEN_EXP_MAX = 6;
INI.START_TIMEOUT = 2500;
INI.SHIP_TIMEOUT = 1000;
INI.ALIEN_DELAY_TIMEOUT = 600;
INI.RUBBLE_Y = 540;
INI.METEOR_OUT = 30;
INI.METEOR_ROTATION_PROBABILITY = 15;
INI.LEVEL_DELAY = 5000;
INI.LAST_LEVEL = 11;
INI.ATTACK = 420;
var map = { 17: false, 37: false, 38: false, 39: false, 40: false };
INI.sprite_maxW = 64;
INI.sprite_maxH = 64;
/////////////////////////////////////////score.js//////////////

var SCORE = {
	checkScore: function(xxx) {
		xxx = parseInt(xxx, 10);
		var start = SCORE.SCORE.depth - 1;
		while (xxx > SCORE.SCORE.value[start] && start >= 0) {
			start--;
		}
		start++;
		if (start === SCORE.SCORE.depth) {
			return;
		} else {
			var yourName = prompt(
				"You reached top " +
					SCORE.SCORE.depth +
					" score. Enter your name (max 10 characters): "
			);
			if (yourName.length > 10) {
				yourName = yourName.substring(0, 10);
			} else if (yourName.length < 10) {
				var temp = 10 - yourName.length;
				var sub = "".fill("&nbsp", temp);
				yourName += sub;
			}
			SCORE.SCORE.value.splice(start, 0, xxx);
			SCORE.SCORE.name.splice(start, 0, yourName);
			SCORE.SCORE.value.splice(SCORE.SCORE.depth, 1);
			SCORE.SCORE.name.splice(SCORE.SCORE.depth, 1);
		}
		return;
	},
	hiScore: function() {
		var HS = "";
		var tempVal;
		for (var hs = 1; hs <= SCORE.SCORE.depth; hs++) {
			HS +=
				hs.toString().padLeft(2, "0") +
				". " +
				SCORE.SCORE.name[hs - 1] +
				" " +
				SCORE.SCORE.value[hs - 1].toString().padLeft(7, "\u0020") +
				"<br/>";
		}
		$("#hiscore").html(HS);
		SCORE.saveHS();
		return;
	},
	saveHS: function() {
		localStorage.setItem(SCORE.SCORE.id, JSON.stringify(SCORE.SCORE));
		return;
	},
	loadHS: function() {
		if (localStorage[SCORE.SCORE.id]) {
			SCORE.SCORE = JSON.parse(localStorage[SCORE.SCORE.id]);
		}
	},
	SCORE: {
		value: [10000, 7500, 5000, 4000, 3000, 2000, 1000, 500, 200, 100],
		name: [
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l",
			"C00lSch00l"
		],
		depth: 10,
		id: "GalactiX"
	},
	dom: "<div id='hiscore'></div>",
	init: function(id) {
		var appTo;
		if (!id) {
			appTo = "body";
		} else appTo = "#" + id;
		$(appTo).append(SCORE.dom);
	},
	extraLife: [10000, 50000, 100000, 200000, 500000, 1000000]
};

////////////////////end of score.js/////////////////////////

///////////////Preloading////////////////////

var Tile = function(id, x, y, type, name) {
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
var AnimationSPRITE = function(x, y, type, howmany) {
	this.x = x;
	this.y = y;
	this.pool = [];
	for (var i = 1; i <= howmany; i++) {
		this.pool.push(type + i);
	}
};
var Creation;
var ACTOR = function(sprite_class, x, y, angle, score, probable) {
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
ACTOR.prototype.sprite = function(sprite_class) {
	var name = this.class + "_" + this.angle;
	return SPRITE[name];
};
ACTOR.prototype.refresh = function() {
	this.name = this.class + "_" + this.angle;
	this.width = SPRITE[this.name].width;
	this.height = SPRITE[this.name].height;
};
var ALIENS = {
	bullet: {
		speed: 16,
		draw: function() {
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
		move: function() {
			var LN = ALIENS.bullet.arsenal.length;
			if (LN < 1) return;
			for (var i = LN - 1; i >= 0; i--) {
				ALIENS.bullet.arsenal[i].y += ALIENS.bullet.speed;
				if (ALIENS.bullet.arsenal[i].y > INI.GAME_HEIGHT) ALIENS.bullet.kill(i);
			}
		},
		kill: function(i) {
			ALIENS.bullet.arsenal.splice(i, 1);
		},
		killAll: function() {
			ALIENS.bullet.arsenal.clear();
		}
	},
	init: function() {
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
		setTimeout(function() {
			ALIENS.chargerReady = true;
		}, GAME.levels[GAME.level].CD);
	},
	findChargers: function() {
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
	findActiveChargers: function() {
		ALIENS.chargers.clear();
		var AEL = ALIENS.existence.length;
		for (var i = 0; i < AEL; i++) {
			if (ALIENS.existence[i].stage != "waiting") ALIENS.chargers.push(i);
		}
	},
	releaseCharger: function() {
		var find = ALIENS.findChargers();
		if (find.length === 0) return;
		var select = find[RND(0, find.length - 1)];
		ALIENS.chargers.push(select);
		ALIENS.existence[select].stage = "rotate";
	},
	move: function() {
		ALIENS.findActiveChargers();
		var AC = ALIENS.chargers.length;
		if (ALIENS.chargerReady) {
			var allowed = GAME.levels[GAME.level].chargers;
			if (allowed > AC) {
				ALIENS.releaseCharger();
				ALIENS.chargerReady = false;
				setTimeout(function() {
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
						if (ALIENS.existence[ALIENS.chargers[q]].y >= INI.ATTACK ) {
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
	draw: function() {
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
	shoot: function() {
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
	draw: function() {
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
var MeteorClass = function(actor, lives) {
	this.actor = actor;
	this.lives = lives;
};
var RUBBLE = {
	pool: [],
	purge: function(score) {
		var RPL = RUBBLE.pool.length;
		if (RPL === 0) return;
		for (var i = RPL - 1; i >= 0; i--) {
			RUBBLE.kill(i);
			if (score) GAME.score += 100;
		}
		TEXT.score();
	},
	kill: function(x) {
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
	draw: function() {
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
	set: function(num) {
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
	move: function() {
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
//////////////
var GAME = {
	start: function() {
		$("#bottom")[0].scrollIntoView();
		$(document).keydown(GAME.checkKey);
		$(document).keyup(GAME.clearKey);
		GAME.level = 1;
		/****************/
		if (DEBUG.CHEAT) {
			GAME.level = DEBUG.LEVEL;
		}
		/****************/
		GAME.score = 0;
		GAME.extraLife = [].concat(SCORE.extraLife);
		GAME.lives = 4;
		ALIENS.init();
		ALIENS.ready = false;
		SHIP.dead = false;
		SHIP.firstInit(); //
		GAME.stopAnimation = false;
		GAME.initLevel(GAME.level);
		GAME.frame = {};
		GAME.frame.start = null;
		GAME.firstFrameDraw();
		GAME.run();
	},
	stop: function() {
		console.log(PRG.NAME, " is stopping.");
		GAME.stopAnimation = true;
		$(document).off("keyup", GAME.clearKey);
		$(document).off("keydown", GAME.checkKey);
		GAME.end();
	},
	over: function() {
		if (SHIP.dead) return;
		RUBBLE.purge(false);
		console.log("GAME OVER");
		SHIP.dead = true;
		ENGINE.clearLayer("text");
		TITLE.gameOver();
		setTimeout(GAME.stop, 2000);
	},
	end: function() {
		TITLE.render();
		console.log(PRG.NAME, " ended.");
		SCORE.checkScore(GAME.score);
		SCORE.hiScore();
		TEXT.score();
		$("#startGame").removeClass("hidden");
	},
	run: function() {
		if (!GAME.frame.start) GAME.frame.start = Date.now();
		var current = Date.now();
		GAME.frame.delta = current - GAME.frame.start;
		if (GAME.frame.delta > INI.ANIMATION_INTERVAL) {
			ALIENS.move();
			ALIENS.shoot();
			SHIP.bullet.move();
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
	},
	firstFrameDraw: function() {
		TITLE.render();
		BACKGROUND.render();
		TEXT.ships();
		TEXT.score();
		SHIP.draw();
		ALIENS.draw();
		RUBBLE.draw();
	},
	frameDraw: function() {
		SHIP.draw();
		ENGINE.clearLayer("bullets");
		SHIP.bullet.draw();
		ALIENS.bullet.draw();
		ALIENS.draw();
		RUBBLE.draw();
		EXPLOSIONS.draw();
	},
	endLevel: function() {
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
		setTimeout(function() {
			GAME.nextLevel();
		}, INI.LEVEL_DELAY);
	},
	nextLevel: function() {
		ENGINE.clearLayer("text");
		GAME.level++;
		console.log("Ascending to level ", GAME.level);
		ALIENS.ready = false;
		GAME.initLevel(GAME.level);
	},
	createLevel: function(level) {
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
	initLevel: function(level) {
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
	respond: function() {
		if (map[17]) {
			SHIP.shoot();
		}
		if (map[37]) {
			SHIP.move(LEFT);
			return;
		}
		if (map[39]) {
			SHIP.move(RIGHT);
			return;
		}
		if (map[38]) {
			SHIP.move(UP);
			return;
		}
		if (map[40]) {
			SHIP.move(DOWN);
			return;
		}
	},
	clearKey: function(e) {
		e = e || window.event;
		if (e.keyCode in map) {
			map[e.keyCode] = false;
		}
	},
	checkKey: function(e) {
		e = e || window.event;
		if (e.keyCode in map) {
			map[e.keyCode] = true;
			e.preventDefault();
		}
	},
	levels: {
		1: {
			maxBullets: 1,
			chargers: 0,
			CD: 9999,
			chargerDescent: 4,
			alienBullets: 2,
			AXS: 2,
			AYS: 24,
			asteroids: 10,
			ship: "whiteship",
			layout: {
				1: {
					num: 8,
					actor: "redinvader",
					score: 30,
					probable: 50
				},
				2: {
					num: 9,
					actor: "greeninvader",
					score: 20,
					probable: 40
				},
				3: {
					num: 8,
					actor: "invader",
					score: 10,
					probable: 30
				},
				4: {
					num: 6,
					actor: "invader",
					score: 10,
					probable: 30
				}
			}
		},
		2: {
			maxBullets: 2,
			chargers: 1,
			CD: 9999,
			chargerDescent: 4,
			alienBullets: 3,
			AXS: 3,
			AYS: 26,
			asteroids: 9,
			ship: "redship",
			layout: {
				1: {
					num: 3,
					actor: "basic1Charger",
					score: 100,
					probable: 50,
					type: "charger"
				},
				2: {
					num: 8,
					actor: "basic1Attacker",
					score: 75,
					probable: 40
				},
				3: {
					num: 8,
					actor: "basic2Attacker",
					score: 40,
					probable: 35
				},
				4: {
					num: 7,
					actor: "basic1Fighter",
					score: 40,
					probable: 35
				}
			}
		},
		3: {
			maxBullets: 2,
			chargers: 2,
			CD: 8000,
			chargerDescent: 4,
			alienBullets: 4,
			AXS: 3,
			AYS: 26,
			asteroids: 9,
			ship: "redship",
			layout: {
				1: {
					num: 3,
					actor: "basic1Charger",
					score: 100,
					probable: 50,
					type: "charger"
				},
				2: {
					num: 5,
					actor: "basic1Charger",
					score: 100,
					probable: 50,
					type: "charger"
				},
				3: {
					num: 8,
					actor: "basic2Attacker",
					score: 40,
					probable: 35
				},
				4: {
					num: 7,
					actor: "basic3Attacker",
					score: 40,
					probable: 35
				}
			}
		},
		4: {
			maxBullets: 2,
			chargers: 4,
			CD: 4000,
			chargerDescent: 4,
			alienBullets: 4,
			AXS: 3,
			AYS: 26,
			asteroids: 8,
			ship: "redship",
			layout: {
				1: {
					num: 7,
					actor: "basic2Charger",
					score: 100,
					probable: 50,
					type: "charger"
				},
				2: {
					num: 5,
					actor: "basic4Attacker",
					score: 50,
					probable: 40,
					type: "charger"
				},
				3: {
					num: 8,
					actor: "basic2Fighter",
					score: 40,
					probable: 40
				},
				4: {
					num: 7,
					actor: "basic4Attacker",
					score: 25,
					probable: 40
				}
			}
		},
		5: {
			maxBullets: 3,
			chargers: 4,
			CD: 2000,
			chargerDescent: 4,
			alienBullets: 4,
			AXS: 3,
			AYS: 26,
			asteroids: 8,
			ship: "darkship",
			layout: {
				1: {
					num: 7,
					actor: "basic4Charger",
					score: 100,
					probable: 50,
					type: "charger"
				},
				2: {
					num: 5,
					actor: "basic3Charger",
					score: 50,
					probable: 40,
					type: "charger"
				},
				3: {
					num: 7,
					actor: "basic3Fighter",
					score: 40,
					probable: 40
				},
				4: {
					num: 8,
					actor: "basic5Attacker",
					score: 50,
					probable: 45
				}
			}
		},
		6: {
			maxBullets: 3,
			chargers: 4,
			CD: 2000,
			chargerDescent: 5,
			alienBullets: 4,
			AXS: 4,
			AYS: 26,
			asteroids: 8,
			ship: "darkship",
			layout: {
				1: {
					num: 7,
					actor: "basic6Fighter",
					score: 100,
					probable: 50,
					type: "charger"
				},
				2: {
					num: 8,
					actor: "basic5Fighter",
					score: 50,
					probable: 40,
					type: "charger"
				},
				3: {
					num: 7,
					actor: "basic7Attacker",
					score: 40,
					probable: 35,
					type: "charger"
				},
				4: {
					num: 8,
					actor: "basic4Fighter",
					score: 25,
					probable: 30
				}
			}
		},
		7: {
			maxBullets: 4,
			chargers: 4,
			CD: 2000,
			chargerDescent: 6,
			alienBullets: 5,
			AXS: 4,
			AYS: 26,
			asteroids: 7,
			ship: "slimship",
			layout: {
				1: {
					num: 7,
					actor: "basic7Fighter",
					score: 100,
					probable: 50,
					type: "charger"
				},
				2: {
					num: 8,
					actor: "basic8Fighter",
					score: 50,
					probable: 40,
					type: "charger"
				},
				3: {
					num: 7,
					actor: "basic4Fighter",
					score: 40,
					probable: 35,
					type: "charger"
				},
				4: {
					num: 5,
					actor: "basic7Attacker",
					score: 25,
					probable: 30
				}
			}
		},
		8: {
			maxBullets: 4,
			chargers: 5,
			CD: 2000,
			chargerDescent: 7,
			alienBullets: 5,
			AXS: 4,
			AYS: 26,
			asteroids: 7,
			ship: "slimship",
			layout: {
				1: {
					num: 7,
					actor: "basic6Attacker",
					score: 100,
					probable: 50,
					type: "charger"
				},
				2: {
					num: 8,
					actor: "basic5Attacker",
					score: 50,
					probable: 40,
					type: "charger"
				},
				3: {
					num: 9,
					actor: "basic1Charger",
					score: 40,
					probable: 35,
					type: "charger"
				},
				4: {
					num: 7,
					actor: "basic2Charger",
					score: 25,
					probable: 30,
					type: "charger"
				}
			}
		},
		9: {
			maxBullets: 4,
			chargers: 5,
			CD: 1750,
			chargerDescent: 8,
			alienBullets: 5,
			AXS: 4,
			AYS: 26,
			asteroids: 7,
			ship: "slimship",
			layout: {
				1: {
					num: 7,
					actor: "basic5Fighter",
					score: 100,
					probable: 50,
					type: "charger"
				},
				2: {
					num: 8,
					actor: "basic2Attacker",
					score: 50,
					probable: 40,
					type: "charger"
				},
				3: {
					num: 9,
					actor: "basic2Fighter",
					score: 40,
					probable: 35,
					type: "charger"
				},
				4: {
					num: 7,
					actor: "basic1Charger",
					score: 25,
					probable: 30,
					type: "charger"
				}
			}
		},
		10: {
			maxBullets: 4,
			chargers: 5,
			CD: 1750,
			chargerDescent: 8,
			alienBullets: 5,
			AXS: 4,
			AYS: 26,
			asteroids: 7,
			ship: "slimship",
			layout: {
				1: {
					num: 7,
					actor: "basic8Fighter",
					score: 66,
					probable: 70,
					type: "charger"
				},
				2: {
					num: 2,
					actor: "alienMother",
					score: 1000,
					probable: 99
				},
				3: {
					num: 9,
					actor: "basic3Attacker",
					score: 40,
					probable: 50,
					type: "charger"
				},
				4: {
					num: 10,
					actor: "basic1Charger",
					score: 50,
					probable: 60,
					type: "charger"
				}
			}
		},
		11: {
			maxBullets: 4,
			chargers: 6,
			CD: 1500,
			chargerDescent: 9,
			alienBullets: 6,
			AXS: 5,
			AYS: 26,
			asteroids: 7,
			ship: "slimship",
			layout: {
				1: {
					num: 7,
					actor: "random",
					sscore: 50,
					probable: 50,
					type: "charger"
				},
				2: {
					num: 8,
					actor: "random",
					score: 50,
					probable: 50,
					type: "charger"
				},
				3: {
					num: 9,
					actor: "random",
					score: 50,
					probable: 50,
					type: "charger"
				},
				4: {
					num: 7,
					actor: "random",
					score: 50,
					probable: 50,
					type: "charger"
				}
			}
		}
	}
};
var BulletClass = function(x, y) {
	this.x = x;
	this.y = y;
};
var SHIP = {
	bullet: {
		max: 1,
		speed: 24,
		init: function() {
			SHIP.bullet.sprite = SPRITE.bullet;
			SHIP.bullet.arsenal = [];
		},
		shoot: function() {
			SHIP.cannonHot = true;
			SHIP.shots += 1;
			SHIP.bullet.arsenal.push(
				new BulletClass(
					SHIP.x,
					parseInt(
						SHIP.y - SHIP.sprite.height / 2 - SHIP.bullet.sprite.height / 2,
						10
					)
				)
			);
			if (SHIP.bullet.arsenal.length >= SHIP.bullet.max) SHIP.loaded = false;
			setTimeout(function() {
				SHIP.cannonHot = false;
			}, INI.BULLET_TIMEOUT);
		},
		kill: function(i) {
			SHIP.bullet.arsenal.splice(i, 1);
			if (SHIP.bullet.arsenal.length < SHIP.bullet.max) SHIP.loaded = true;
		},
		draw: function() {
			var LN = SHIP.bullet.arsenal.length;
			for (var i = 0; i < LN; i++) {
				ENGINE.spriteDraw(
					"bullets",
					SHIP.bullet.arsenal[i].x,
					SHIP.bullet.arsenal[i].y,
					SHIP.bullet.sprite
				);
			}
		},
		move: function() {
			var LN = SHIP.bullet.arsenal.length;
			if (LN < 1) return;
			for (var i = LN - 1; i >= 0; i--) {
				SHIP.bullet.arsenal[i].y -= SHIP.bullet.speed;
				if (SHIP.bullet.arsenal[i].y < 0) SHIP.bullet.kill(i);
			}
		}
	},
	firstInit: function() {
		SHIP.live = false;
		SHIP.maxX = ENGINE.gameWIDTH - INI.BORDER_PADDING;
		SHIP.minX = INI.BORDER_PADDING;
		SHIP.minY = INI.GAME_HEIGHT - INI.BOTTOM_PADDING - INI.SHIPS_SPACE;
		INI.AUTO_ATTACK = SHIP.minY - 100;
		SHIP.maxY = INI.GAME_HEIGHT - INI.BOTTOM_PADDING;
		SHIP.x = parseInt(ENGINE.gameWIDTH / 2, 10);
		SHIP.y = parseInt((SHIP.maxY - SHIP.minY) / 2) + SHIP.minY;
		SHIP.speed = 10;
	},
	init: function() {
		if (SHIP.dead) return;
		if (GAME.levelComplete) GAME.endLevel();
		TITLE.getReady();
		SHIP.sprite = SPRITE[SHIP.ship];
		SHIP.loaded = true;
		SHIP.cannonHot = false;
		setTimeout(function() {
			SHIP.live = true;
		}, INI.SHIP_TIMEOUT);
		setTimeout(function() {
			if (!SHIP.dead) ENGINE.clearLayer("text");
			setTimeout(function() {
				ALIENS.ready = true;
			}, INI.ALIEN_DELAY_TIMEOUT);
		}, INI.START_TIMEOUT);
	},
	draw: function() {
		var CTX = LAYER["ship"];
		CTX.clearRect(0, SHIP.minY - 24, CTX.canvas.width, INI.SHIPS_SPACE + 48);
		if (!SHIP.live) return;
		if (SHIP.dead) return;
		ENGINE.spriteDraw("ship", SHIP.x, SHIP.y, SHIP.sprite);
	},
	move: function(dir) {
		SHIP.x += SHIP.speed * dir.x;
		SHIP.y += SHIP.speed * dir.y;
		if (SHIP.x < SHIP.minX) {
			SHIP.x = SHIP.minX;
			return;
		}
		if (SHIP.x > SHIP.maxX) {
			SHIP.x = SHIP.maxX;
			return;
		}
		if (SHIP.y < SHIP.minY) {
			SHIP.y = SHIP.minY;
			return;
		}
		if (SHIP.y > SHIP.maxY) {
			SHIP.y = SHIP.maxY;
			return;
		}
	},
	shoot: function() {
		if (!SHIP.loaded) return;
		if (SHIP.cannonHot) return;
		if (!SHIP.live) return;
		SHIP.bullet.shoot();
		return;
	}
};
var BACKGROUND = {
	render: function() {
		ENGINE.draw("background", 0, 0, SPRITE.stars);
	}
};
var TEXT = {
	render: function() {},
	ships: function() {
		var x = 0;
		var y = INI.GAME_HEIGHT - 20;
		TEXT.clearSign(x, y, ENGINE.gameWIDTH, 20);
		if (GAME.lives <= 0) return;
		for (var i = 0; i < GAME.lives; i++) {
			ENGINE.draw("sign", x + i * 16, y, SPRITE.smallship);
		}
	},
	clearSign: function(x, y, w, h) {
		var CTX = LAYER["sign"];
		CTX.clearRect(x, y, w, h);
	},
	score: function() {
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
		var score = GAME.score.toString().padLeft(8, "0");
		CTX.fillText("SCORE: " + score, x, y);
		x += 260;
		var level = GAME.level.toString().padLeft(2, "0");
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
var TITLE = {
	render: function() {
		TITLE.background();
		TITLE.title();
	},
	bigText: function(text, fs) {
		var x = ENGINE.gameWIDTH / 2;
		var y = INI.GAME_HEIGHT / 2;
		TITLE.text(text, fs, x, y);
	},
	centeredText: function(text, fs, y) {
		var x = ENGINE.gameWIDTH / 2;
		TITLE.text(text, fs, x, y);
	},
	text: function(text, fs, x, y) {
		var CTX = LAYER["text"];
		CTX.fillStyle = "#FFF";
		//CTX.font = fs + "px Consolas";
		CTX.font = fs + "px Arcade";
		CTX.shadowColor = "#333333";
		CTX.shadowOffsetX = 3;
		CTX.shadowOffsetY = 3;
		CTX.shadowBlur = 3;
		CTX.textAlign = "center";
		CTX.fillText(text, x, y);
	},
	gameOver: function() {
		TITLE.bigText("GAME OVER", 120);
	},
	getReady: function() {
		if (GAME.levelComplete) return;
		ENGINE.clearLayer("text");
		TITLE.bigText("GET READY FOR WAVE " + GAME.level, 60);
	},
	title: function() {
		var CTX = LAYER.title;
		var grad = CTX.createLinearGradient(8, 100, 128, 128);
		grad.addColorStop("0", "#000000");
		grad.addColorStop("0.2", "#00ee00");
		grad.addColorStop("0.5", "#00ff00");
		grad.addColorStop("0.8", "#eef442");
		grad.addColorStop("1.0", "#b2f441");
		CTX.fillStyle = grad;
		//CTX.font = "40px Consolas";
		CTX.font = "40px Arcade";
		CTX.shadowColor = "#ccff66";
		CTX.shadowOffsetX = 1;
		CTX.shadowOffsetY = 1;
		CTX.shadowBlur = 2;
		var x = 30;
		var y = 48;
		CTX.fillText(PRG.NAME, x, y);
		CTX.font = "12px Consolas";
		//CTX.font = "12px Arcade";
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
		//CTX.font = "14px Arcade";
		CTX.fillText(String.fromCharCode(169) + " C00lSch00l 2017", x, y);
	},
	background: function() {
		var CTX = LAYER.title;
		CTX.fillStyle = "#000";
		CTX.roundRect(
			0,
			0,
			ENGINE.gameWIDTH,
			INI.TITLE_HEIGHT,
			{
				upperLeft: 10,
				upperRight: 10,
				lowerLeft: 10,
				lowerRight: 10
			},
			true,
			true
		);
	}
};

$(document).ready(function() {
	PRG.INIT();
	PRG.setup();
	PRG.preLoadImages();
	SCORE.init("SC");
	SCORE.loadHS();
	SCORE.hiScore();
});
