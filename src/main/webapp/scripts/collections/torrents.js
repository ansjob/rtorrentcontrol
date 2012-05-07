define([
	'jquery',
	'backbone',
	'underscore',
	'scripts/namespace',
	'scripts/models/torrent'
	], function ($, Backbone, _, namespace,
		TorrentModel) {
		var app = namespace.app;
		var INTERVAL = 1000;

		var timeoutId;

		var TorrentsCollection = Backbone.Collection.extend({
			model: TorrentModel,
			url: 'api/torrents',

		});

		var loopFunction = function() {
			console.log("Fetching torrents...");
			app.torrents.fetch();
			timeoutId = setTimeout(loopFunction, INTERVAL);
		}

		var initialize = function() {
			app.torrents = new TorrentsCollection();
			loopFunction();
		};

		return {initialize: initialize};
	});