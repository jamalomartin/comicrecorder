var ComicStore = {
	comcis: [],
	callbacks: {
		'addComic': [],
		'loadComic': []
	},

	addConsumer: function(type, callback) {
		var relevantCallbacks = this.callbacks[type];
		relevantCallbacks.push(callback);
	},

	setConsumer: function (type, callback) {
		this.callbacks[type] = [callback];
	},

	notifyConsumers: function (type, data) {
		var relevantCallbacks = this.callbacks[type];
		for (var i = 0; i < relevantCallbacks.length; i++) {
		  relevantCallbacks[i](data);
		}
	},

	addComic: function(comic) {
		console.log("ComicStore", comic);
		$.ajax({
			url: '/py/record_comics',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(comic),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			success: function (data) {
				this.notifyConsumers('addComic', data);
			}.bind(this)
		});
	},

	loadComic: function() {
		$.ajax({
			url: '/py/retrieve_comics',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				var comics = data
				this.comics = comics;
				console.log(this.comics);
				this.notifyConsumers('loadComic', data);
			}.bind(this)
		});
	},

	getComics: function() {
		return this.comics;
	}
};

module.exports = ComicStore;
