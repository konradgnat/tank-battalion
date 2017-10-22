'use strict';

define(['game', 'tank', 'bullets'], function(game, tank, bullets) {
 
	const mWorld = {};

	mWorld.parent = [
		 '000000000000000000000000000000000000000000000000000000000000',
		 '000000000000000000000000000000000000000000000000000000000000',
		 '000000000000000000000000000000000000000000000000000000000000',
		 '000000000000000000000000000000000000000000000000000000000000',
		 '000001111111111111111111111110000111111111111111000011110000',
		 '000001111111111111111111111110000111111111111111000011110000',
		 '000001111111111111111111111110000111111111111111000011110000',
		 '000001111111111111111111111110000111111111111111000011110000',
		 '000001111000000000000000011110000111100000000000000011110000',
		 '000001111000000000000000011110000111100000000000000011110000',
		 '000001111000000000000000011110000111100000000000000011110000',
		 '000001111000011110000000011110000111100001111000000011110000',
		 '000001111000011110000000000000000111100001111000000000000000',
		 '000000000000011110000000000000000111100001111000000000000000',
		 '000000000000011110000000000000000111100001111000000000000000',
		 '000000000000011110000000000000000111100001111000000000000000',
		 '000001111000011110000000000000000111100001111000000011110000',
		 '000001111000011110000000011110000111100001111000000011110000',
		 '000001111000011110000000011110000111100001111000000011110000',
		 '000001111000000000000000011110000111100001111000000011110000',
		 '000000000000000000000000011110000000000001111000000011110000',
		 '000000000000000000000000011110000000000001111000000011110000',
		 '000000000000000000000000011110000000000001111000000011110000',
		 '000000000000000000000000011110000000000001111000000011110000',
		 '000000000000000000000000011110000111100000000000000011110000',
		 '111111111111111100000111111111111111100000000000000011110000',
		 '111111111111111100000111111111111111100000000000000011110000',
		 '111111111111111100000111111111111111100000000000000011110000',
		 '111111111111111100000111111111111111100001111111111111110000',
		 '000000000000000000000000000000000111100001111111111111110000',
		 '000000000000000000000000000000000111100001111111111111110000',
		 '000000000000000000000000000000000111100001111111111111110000',
		 '000000000000000000000111100000000000000000000000000000000000',
		 '000011110000111100000111100000000000000000000000000000000000',
		 '000011110000111100000111100000000000000000000000000000000000',
		 '000011110000111100000111100000000000000000000000000000000000',
		 '000011110000111100000111100000000111100001111111111111110000',
		 '000011110000111100000111100000000111100001111111111111110000',
		 '000011110000111100000111100000000111100001111111111111110000',
		 '000011110000111100000111100000000111100001111111111111110000',
		 '000011110000111100000111100000000111100001111000000000000000',
		 '000011110000000000000111100000000111100001111000000000000000',
		 '000011110000000000000111100000000111100001111000000000000000',
		 '000011110000000000000111100000000111100001111000000000000000',
		 '000011110000000000000111111111111111100000000000011110000000',
		 '000011110000000000000111111111111111100000000000011110000000',
		 '000011110000000000000111111111111111100000000000011110000000',
		 '000011110000000000000111111111111111100000000000011110000000',
		 '000011110000000000000000000000000000000001111000011110000000',
		 '000000000000111100000000000000000000000001111000011110000000',
		 '000000000000111100000000000000000000000001111000011110000000',
		 '000000000000111100000000000000000000000001111000011110000000',
		 '000000000000111100000000000000000000000001111111111111110000',
		 '000011110000111100000011111111111111000001111111111111110000',
		 '000011110000111100000011111111111111000001111111111111110000',
		 '000011110000111100000011111111111111000001111111111111110000',
		 '000011110000111100000011100000000111000000000000000000000000',
		 '000000000000000000000011100000000111000000000000000000000000',
		 '000000000000000000000011100000000111000000000000000000000000',
		 '000000000000000000000011100000000111000000000000000000000000',
	];

	let img = document.getElementById('brick'),
		brick = game.context.createPattern(img,"repeat"),
		img2 = document.getElementById('border'),
		border = game.context.createPattern(img2,"repeat");

	const createWallSegment = (x, y, w, h, ptrn) => {
		game.context.fillStyle = ptrn;
		game.context.fillRect(x, y, w, h);
	}

	mWorld.draw = (worldData) => {
		worldData.forEach((i, index) => {
			i = i.split('');
			i.map((cell, cell_i) => {
				if(Number(cell)){
					createWallSegment((cell_i*10), (index*10), 10, 10, brick);
				}
			})
		});
	}


	return mWorld;

});