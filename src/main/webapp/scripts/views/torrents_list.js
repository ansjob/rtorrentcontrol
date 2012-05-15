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

		render: function() {
			var output = Mustache.render(pageTemplate, {});
			$(this.el).html(output);
		},

		onClose : function() {
			this.log("Closing!");
		},

		log : function(msg) {
			if (DEBUG)
				console.log("[TORRENT LIST] " + msg);
		}

	});

	return TorrentsList;

	});