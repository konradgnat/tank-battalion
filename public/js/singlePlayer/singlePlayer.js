'use strict';

define(['game', 'bullets', 'mwObstacle', 'audio', 'images'], function (game, bullets, mwObstacle, audio, images) {

	var ai = {};
	ai.bots = [];

	ai.elapsedTime = game.time;
	ai.dir = ['up', 'down', 'right', 'left'];

	var loadBot = function loadBot() {
		var dir = game.time % 2 == 0 ? 'right' : 'left';
		var bot = {
			id: game.time + '',
			index: ai.bots.length,
			dir: game.time % 2 == 0 ? 'right' : 'left',
			moving: true,
			x: game.randomBotPositionX(),
			y: 20,
			bullets: []
		};
		ai.bots.push(bot);
		game.bots_on_screen++;
		game.bots_loaded++;
		console.log('game.bots_on_screen', game.bots_on_screen);
		game.display_bots[game.bots_on_screen - 1].classList.add('on_screen');
	};

	var init = function init() {

		var speed = (game.difficulty + 1) * game.enemy_speed;
		var detect_dist = 1 * 16;
		setTimeout(loadBot, 500);
		game.loadBots = setInterval(function () {
			loadBot();
			if (game.bots_loaded >= 20) {
				clearInterval(game.loadBots);
			}
		}, 3000);
		game.bots = setInterval(function () {
			ai.bots.forEach(function (bot) {
				if (bot.moving) {
					if (bot.dir == 'up') {
						// detect if collision with player
						detectCollision(bot.x, bot.y - detect_dist);
						// detect if collision with other enemy tanks
						if (detect(bot.x, bot.y - detect_dist, bot.index)) {
							bot.y += 8;
							bot.dir = 'down';
							// detect if collision with walls
						} else if (mwObstacle.detect(bot.x, bot.y - detect_dist, bot.dir)) {
							bot.y += speed;
							bot.dir = ai.dir[Math.floor(Math.random() * 4)];
						} else {
							bot.y -= speed;
							if (shootBool()) {
								shootBullet(bot.x, bot.y, bot.index, bot.dir);
							}
						}
					} else if (bot.dir == 'down') {
						detectCollision(bot.x, bot.y + detect_dist);
						if (detect(bot.x, bot.y + detect_dist, bot.index)) {
							bot.y -= 8;
							bot.dir = 'up';
						} else if (mwObstacle.detect(bot.x, bot.y + detect_dist, bot.dir)) {
							bot.y -= speed;
							bot.dir = ai.dir[Math.floor(Math.random() * 4)];
						} else {
							bot.y += speed;
							if (shootBool()) {
								shootBullet(bot.x, bot.y, bot.index, bot.dir);
							}
						}
					} else if (bot.dir == 'right') {
						detectCollision(bot.x + detect_dist, bot.y);
						if (detect(bot.x + detect_dist, bot.y, bot.index)) {
							bot.x -= 8;
							bot.dir = 'left';
						} else if (mwObstacle.detect(bot.x + detect_dist, bot.y, bot.dir)) {
							bot.x -= speed;
							bot.dir = ai.dir[Math.floor(Math.random() * 4)];
						} else {
							bot.x += speed;
							if (shootBool()) {
								shootBullet(bot.x, bot.y, bot.index, bot.dir);
							}
						}
					} else if (bot.dir == 'left') {
						detectCollision(bot.x - detect_dist, bot.y);
						if (detect(bot.x - detect_dist, bot.y, bot.index)) {
							bot.x += 8;
							bot.dir = 'right';
						} else if (mwObstacle.detect(bot.x - detect_dist, bot.y, bot.dir)) {
							bot.x += speed;
							bot.dir = ai.dir[Math.floor(Math.random() * 4)];
						} else {
							bot.x -= speed;
							if (shootBool()) {
								shootBullet(bot.x, bot.y, bot.index, bot.dir);
							}
						}
					}
				}
			});
		}, 100);
	};

	var detect = function detect(x, y, index) {
		var collision = false;
		var len = ai.bots.length;
		x = Math.floor(x / 10);
		y = Math.floor(y / 10);
		for (var k = 0; k < len; k++) {
			var b = ai.bots[k];
			var b_x = Math.floor(b.x / 10);
			var b_y = Math.floor(b.y / 10);
			if (b.moving && (x == b_x || x == b_x + 1 || x == b_x - 1) && (y == b_y || y == b_y + 1 || y == b_y - 1) && k != index) {
				collision = true;
				break;
			}
		}
		if (collision) return true;
		return false;
	};

	var shootBool = function shootBool() {
		var random = Math.floor(Math.random() * (30 * (1 - game.difficulty)));
		return random === 7;
	};

	var shootBullet = function shootBullet(b_x, b_y, i, b_dir) {
		if (b_dir == 'up') b_y -= 20;else if (b_dir == 'down') b_y += 20;else if (b_dir == 'right') b_x += 20;else if (b_dir == 'left') b_x -= 20;

		var bullet = {
			x: b_x,
			y: b_y,
			dir: b_dir
		};

		ai.bots[i].bullets.push(bullet);
	};

	var detectCollision = function detectCollision(x, y) {
		var g_x = Math.floor(game.x / 10);
		var g_y = Math.floor(game.y / 10);
		x = Math.floor(x / 10);
		y = Math.floor(y / 10);
		if ((g_x == x || g_x - 1 == x || g_x + 1 == x || g_x + 2 == x || g_x - 2 == x) && (g_y == y || g_y - 1 == y || g_y + 1 == y || g_y + 2 == y || g_y - 2 == y)) {
			audio.explode.load();
			audio.explode.play();
			// game.context.drawImage(images.bigRedExplosion, (x*10)-10, (y*10)-10);
			game.explosion = true;
			game.newGame = true;
			return true;
		}
	};

	return {
		init: init,
		ai: ai
	};
});