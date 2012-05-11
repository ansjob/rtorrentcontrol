define([
	'scripts/namespace',
	'underscore',
	'jquery',
	'backbone',
	//Views
	'scripts/models/torrent_details',
	'scripts/views/torrents_list',
	'scripts/views/settings',
	'scripts/views/error'
	], function(namespace, _, $, Backbone,
		TorrentDetailsLogic,
		TorrentsList,
		SettingsView,
		ErrorView) {
		var app = namespace.app;

		var rTorrentRouter = Backbone.Router.extend({
			routes: {
				'torrents/:id'	: 'viewTorrent',
				'torrents'		: 'torrentsList',
				'torrents/'		: 'torrentsList',
				''				: 'defaultView',
				'settings'		: 'settingsView',
				'settings/'		: 'settingsView',
				'*actions'		: 'unknownRoute'
			},

			viewTorrent: function(id) {
				TorrentDetailsLogic.showTorrent(id);
			},

			defaultView: function() {
				this.navigate("torrents", true);
			},

			torrentsList: function() {
				TorrentsList.render();
			},

			settingsView : function() {
				SettingsView.render();
			},

			unknownRoute: function(path) {
				ErrorView.render({
					title: "404 Error",
					message: "The route you specified <pre>#"+path+"</pre> is not valid."
				});
			}
		});

		var initialize = function() {
			app.router = new rTorrentRouter();
			Backbone.history.start();
		};

		return {
			initialize: initialize
		};
	});