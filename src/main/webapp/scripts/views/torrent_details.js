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

				if (torrent) {
					this.template(torrent);
				} else {
					this.notFound();
				}
			},

			notFound: function() {
				ErrorView.render({
					title: "404 Not found!",
					message: "The torrent you appear to be looking for was not"+
							" loaded in the client."
				});
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