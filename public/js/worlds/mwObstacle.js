'use strict';

define(['game', 'tank', 'mWorld'], function (game, tank, mWorld) {

	var detect = function detect(x, y, dir) {
		y = Math.floor(y / 10);
		x = Math.floor(x / 10);
		if (x <= 0 || x >= 60 || y <= 0 || y >= 60) {
			return true;
		}
		var row = mWorld.data[y];
		row = row.split('');
		var pos = Number(row[x]);
		var pos2, pos3;
		if (dir == 'up' || dir == 'down') {
			pos2 = Number(row[x - 1]);
			pos3 = Number(row[x + 1]);
		} else if (dir == 'right' || dir == 'left') {
			var row2 = mWorld.data[y - 1];
			row2 = row2.split('');
			var row3 = mWorld.data[y + 1];
			row3 = row3.split('');
			pos2 = Number(row2[x]);
			pos3 = Number(row3[x]);
		}
		if (pos || pos2 || pos3) {
			return true;
		} else {
			return false;
		}
	};

	return {
		detect: detect
	};
});