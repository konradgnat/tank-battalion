'use strict';

console.log('util here');

var info_button = document.getElementsByClassName('controls__icon')[0];
var info_content = document.getElementsByClassName('controls__content')[0];
console.log(info_content);
console.log(info_content.style.display);

info_button.onclick = function () {
	if (info_content.style.display == 'inline-block') {
		info_content.style.display = 'none';
	} else {
		info_content.style.display = 'inline-block';
	}
};