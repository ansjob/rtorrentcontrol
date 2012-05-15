define([
	'scripts/namespace',
	'jquery',
	'backbone',
	'underscore',
	'mustache',
	//Templates:
	'text!templates/torrents_list.html'
	],function(namespace, $, Backbone, _, Mustache,
		pageTemplate) {

	var app = namespace.app;
	var DEBUG = false;

	var TorrentsList= Backbone.View.extend({

		initialize: function() {
			var that = this;
			app.torrents.bind("reset change", function() {
				that.render();
			});
		},

		render: function() {
			var input = {
				torrents : app.torrents
			};
			var output = Mustache.render(pageTemplate, input);
			$(this.el).html(output);
		},

		onClose : function() {
			app.torrents.unbind("reset change", null, this);
			this.log("Closing!");
		},

		log : function(msg) {
			if (DEBUG)
				console.log("[TORRENT LIST] " + msg);
		}

	});

	return TorrentsList;

	});