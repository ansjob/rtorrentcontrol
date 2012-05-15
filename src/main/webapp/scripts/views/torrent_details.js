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

		var app = namespace.app;

		var TorrentDetails = Backbone.View.extend({

			el: "#content",
			render: function(torrent) {
				this.template(torrent);
			},

			template: function(torrent) {
				var output = Mustache.render(
					pageTemplate, {
						id: torrent.get('id'),
						name: torrent.get('name')
					});
				$(this.el).html(output);
			}

		});

		return new TorrentDetails();

	});