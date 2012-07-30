define([
	'marionette',
	'underscore',
	'jquery',
	'views/torrent_list_item_view',
	'order!backbone',
	'order!lib/backbone.poller'
	],function(
		Marionette, _, $,
		TorrentListItemView) {

		var TorrentsList= Marionette.CollectionView.extend({

			tagName: "div",

			itemView: TorrentListItemView,

			initialize: function(opts) {
				opts = opts || {};
				_.bindAll(this, "render");
				this.collection = opts.collection;
			},

			beforeRender: function() {
				$(this.el).html('');
			},

			onClose: function() {
				this.log("closing...");
			},

			log: function(msg) {
				if (this.DEBUG)
					console.log("[TORRENT LIST] " + msg);
			}
		});
		TorrentsList.prototype.DEBUG = false;

		return TorrentsList;

	});
