'use strict';

var $ = require('jquery');

var ComicStore = function() {
	$.ajax({
		url: '/py/retrieve_comics',
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			if (data === null) {
				data = [];
			}
		}
	});
};
console.log(ComicStore());
module.exports = ComicStore;