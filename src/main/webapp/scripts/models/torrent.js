define([
	'jquery',
	'backbone',
	'underscore',
	], function($, Backbone, _) {
		var TorrentModel = Backbone.Model.extend({
			urlRoot: 'api/torrents',

			getCompletedPercentage: function() {
				var ratio = this.get("totalCompletedBytes") / this.get("totalSize");
				return Math.round(100 * ratio);
			},
		});
		return TorrentModel;
	});