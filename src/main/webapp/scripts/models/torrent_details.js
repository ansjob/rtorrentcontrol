define(["scripts/namespace", "scripts/views/torrent_details",
		"scripts/views/error",
		"backbone", "underscore"],
	function(namespace, TorrentDetailsView, ErrorView, Backbone, _) {

	var app = namespace.app;
	var TorrentDetailsLogic = Backbone.Model.extend({

		showTorrent: function(id) {
			var torrent = app.torrents.get(id);
			if (torrent){
				TorrentDetailsView.render(torrent);
			} else {
				this.fetchAndTryAgain(id);
			}
		},

		fetchAndTryAgain: function(id) {
			app.torrents.fetch({
			success: function() {
				var torrent = app.torrents.get(id);
				if (torrent){
					TorrentDetailsView.render(torrent);
				} else {
					ErrorView.render({
						title: "404 Not found!",
						message: "The torrent you appear to be looking for was not"+
							" loaded in the client."
					});
				}
			},
			error: function() {
				ErrorView.render({
					title: "Connection error",
					message: "An I/O error occured while fetching the torrent!"
				})
			}
		});
		},

		
	});

	return new TorrentDetailsLogic;
});