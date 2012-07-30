define([
	'jquery',
	'backbone',
	'underscore',
	'namespace',
	'models/torrent'
	], function ($, Backbone, _, namespace,
		TorrentModel) {

		var TorrentsCollection = Backbone.Collection.extend({
			model: TorrentModel,
			url: 'api/torrents'
		});


		return TorrentsCollection;
	});
