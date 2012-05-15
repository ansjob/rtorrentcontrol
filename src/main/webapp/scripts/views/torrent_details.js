define([
	'scripts/namespace',
	'jquery',
	'backbone',
	'underscore',
	'mustache',
	//Templates:
	'text!templates/torrent_details.html',
	],function(namespace, $, Backbone, _, Mustache,
		pageTemplate
		) {

		var DEBUG = false;
		var app = namespace.app;

		var TorrentDetails = Backbone.View.extend({

			initialize: function() {
				this.model.view = this;
				this.model.bind("change", this.renderFromModel);
			},

			render : function() {
				var torrent = this.model;
				this.renderModel(torrent);
			},

			renderFromModel: function() {
				this.view.renderModel(this)
			},

			renderModel: function(torrent) {
				var output = Mustache.render(
					pageTemplate, {
						id: torrent.get('id'),
						name: torrent.get('name')
					});
				$(torrent.view.el).html(output);
			},

			onClose: function() {
				this.model.unbind("change", null, this);
				this.log("closing!");
			},

			log: function(msg) {
				if (DEBUG)
					console.log("[TORRENT DETAILS VIEW] " + msg);
			}
		});

		return TorrentDetails;

	});