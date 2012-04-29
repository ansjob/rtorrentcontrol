define([
	'jquery',
	'backbone',
	'underscore',
	'namespace',
	'models/torrent'
	], function ($, Backbone, _, namespace,
		TorrentModel) {
		var app = namespace.app;
		
		var TorrentsCollection = Backbone.Collection.extend({
			model: TorrentModel,
			url: 'api/torrents'
		});
		
		var initialize = function() {
			app.torrents = new TorrentsCollection();
			app.torrents.fetch();
		}
		
		return {initialize: initialize};
	});