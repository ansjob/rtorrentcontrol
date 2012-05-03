define([
	'scripts/namespace',
	'underscore',
	'jquery',
	'backbone',
	//Views
	'scripts/views/torrent_details',
	'scripts/views/torrents_list',
	'scripts/views/settings'
	], function(namespace, _, $, Backbone,
		TorrentDetailsView,
		TorrentsList,
		SettingsView) {
		var app = namespace.app;
	
		var rTorrentRouter = Backbone.Router.extend({
			routes: {
				'torrents/:id'	: 'viewTorrent',
				'torrents'		: 'torrentsList',
				'torrents/'		: 'torrentsList',
				''				: 'defaultView',
				'settings'		: 'settingsView',
				'settings/'		: 'settingsView',
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