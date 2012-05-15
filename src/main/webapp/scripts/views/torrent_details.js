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

			el : "#content",

			render : function(torrent) {
				this.template(torrent);
				return this;
			},

			template : function(torrent) {
				var output = Mustache.render(
					pageTemplate, {
						id: torrent.get('id'),
						name: torrent.get('name')
					});
				$(this.el).html(output);
			},

			showTorrentNoRetry : function(torrent) {
				if (torrent){
					this.render(torrent);
				} else {
					ErrorView.render({
						title: "404 Not found!",
						message: "The torrent you appear to be looking for does not exist on the server."
					});
				}
			},

			showTorrent : function(id) {
				var torrent = app.torrents.get(id);
				if (torrent){
					this.render(torrent);
				} else {
					this.fetchAndTryAgain(id);
				}
			},

			fetchAndTryAgain: function(id) {
				var that = this;
				app.torrents.fetch({
					success: function() {
						var torrent = app.torrents.get(id);
						that.showTorrentNoRetry(torrent);
					},
					error: function() {
						ErrorView.render({
							title: "Connection error",
							message: "An I/O error occured while fetching the torrent!"
						})
					}
				});
			}

		});

		return new TorrentDetails();

	});