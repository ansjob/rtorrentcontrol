define([
	'namespace',
	'jquery',
	'marionette',
	'underscore',
	'mustache',
	//Templates:
	'text!../../templates/torrent_details.html',
	],function(namespace, $, Marionette, _, Mustache,
		pageTemplate
		) {

		var DEBUG = false;

		var TorrentDetails = Marionette.ItemView.extend({

			initialize: function() {
				var that = this;
				this.model.bind("change", function() {
					that.render();
				});
			},

			render : function() {
				var torrent = this.model;
				var output = Mustache.render(
					pageTemplate, {
						id: torrent.get('id'),
						name: torrent.get('name')
					});
				$(this.el).html(output);
			},

			onClose: function() {
				this.model.unbind("change", null, this);
				delete(this.model.view);
				this.log("closing!");
			},

			log: function(msg) {
				if (DEBUG)
					console.log("[TORRENT DETAILS VIEW] " + msg);
			}
		});

		return TorrentDetails;

	});