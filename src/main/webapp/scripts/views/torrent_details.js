define([
	'scripts/namespace',
	'jquery',
	'backbone',
	'underscore',
	'mustache',
	'scripts/views/error',
	//Templates:
	'text!templates/torrent_details.html',
	],function(namespace, $, Backbone, _, Mustache,
		ErrorView,
		pageTemplate
		) {

		var app = namespace.app;

		var TorrentDetails = Backbone.View.extend({
			el: "#content",
			render: function(id) {
				var torrent = app.torrents.get(id);

				var output;
				if (torrent) {
					output = Mustache.render(
						pageTemplate, {
							id: torrent.get('id'),
							name: torrent.get('name')
						});
					$(this.el).html(output);
				} else {
					ErrorView.render({
						message: "This torrent does not exist",
						title: "404 Not found!"
					});
				}
			}
		});

		return new TorrentDetails();

	});