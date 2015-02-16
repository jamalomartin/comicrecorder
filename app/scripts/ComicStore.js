var ComicStore = {
	comcis: [],
	callbacks: {
		'addComic': [],
		'loadComic': []
	},

	addConsumer: function(type, callBack) {
		var relevantCallbacks = this.callbacks[type];
		console.log(relevantCallbacks);
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
	},

	loadComic: function() {

	},

	getComics: function() {
		return this.comics;
	}
};

module.exports = ComicStore;
