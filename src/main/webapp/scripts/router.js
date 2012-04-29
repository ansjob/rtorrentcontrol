define([
	'namespace',
	'underscore',
	'jquery',
	'backbone',
	//Views
	'views/torrent_details',
	'views/torrents_list',
	], function(namespace, _, $, Backbone,
		TorrentDetailsView,
		TorrentsList) {
		var app = namespace.app;
	
		var rTorrentRouter = Backbone.Router.extend({
			routes: {
				'torrents/:id'	: 'viewTorrent',
				'torrents'		: 'torrentsList',
				'torrents/'		: 'torrentsList',
				''				: 'defaultView',
			},
		
			viewTorrent: function(id) {
				TorrentDetailsView.render(id);
			},
		
			defaultView: function() {
				this.navigate("/torrents");
			},
		
			torrentsList: function() {
				TorrentsList.render();
			}
		});
	
	
		var initialize = function() {
			app.router = new rTorrentRouter();
			Backbone.history.start();
		}
	
		return {
			initialize: initialize
		};
	});