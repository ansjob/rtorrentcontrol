define([
	'scripts/namespace',
	'underscore',
	'jquery',
	'backbone',
	//Views
	'scripts/views/torrent_details',
	'scripts/views/torrents_list',
	'scripts/views/settings',
	'scripts/views/error'
	], function(namespace, _, $, Backbone,
		TorrentDetailsView,
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
				asInt = parseInt(id, 10);
				TorrentDetailsView.render(asInt);
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