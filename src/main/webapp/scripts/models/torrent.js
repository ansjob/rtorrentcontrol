define([
	'jquery',
	'backbone',
	'underscore',
	], function($, Backbone, _) {
		var TorrentModel = Backbone.Model.extend({
			urlRoot: 'api/torrents'
		});		
		return TorrentModel;
	});