define([
	'jquery',
	'backbone',
	'underscore',
	], function($, Backbone, _) {
		var TorrentModel = Backbone.Model.extend({
			url: 'api/torrents'
		});
	});