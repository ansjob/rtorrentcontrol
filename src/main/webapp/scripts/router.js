define([
	'namespace',
	'underscore',
	'jquery',
	'backbone',
	//Views
	'views/torrents_list',
	'views/torrent_details',
	'views/settings',
	'views/error',
	'views/loading'
	], function(namespace, _, $, Backbone,
		TorrentsList,
		TorrentDetailsView,
		SettingsView,
		ErrorView,
		LoadingView) {
		var app = namespace.app;

		var rTorrentRouter = Backbone.Router.extend({
			
			initialize: function() {
				_.bindAll(this, 'io_error', 'torrentFetchingDone');
				this.layout = namespace.rootLayout;
			},

			routes: {
				'torrents/:id'	: 'viewTorrent',
				'torrents'		: 'torrentsList',
				'torrents/'		: 'torrentsList',
				''				: 'defaultView',
				'settings'		: 'settingsView',
				'settings/'		: 'settingsView',
				'*actions'		: 'unknownRoute'
			},

			viewTorrent : function(id) {
				var torrent = app.torrents.get(id);
				if (torrent){
					this.renderTorrentView(torrent);
				} else {
					this.tryToFetchTorrent(id);
				}
			},

			tryToFetchTorrent : function(id) {
				var data = {
					title: "Fetching torrents",
					message: "Updating torrent information..."
				}
				this.showLoadingMessage(data);
				app.torrents.fetch({
					success: this.torrentFetchingDone,
					error: this.io_error
				});
			},
			
			torrentFetchingDone: function(id) {
				var torrent = app.torrents.get(id);
						if (!torrent) {
							this.showError({
								title: "404 Not found!",
								message: "The torrent you're looking for does not seem to exist"
							});
						} else {
							this.renderTorrentView(torrent);
						}
			},

			renderTorrentView : function(torrentModel) {
				var torrentView = new TorrentDetailsView({
					model : torrentModel
				});
				this.layout.content.show(torrentView);
			},

			io_error: function() {
				var data = {
					title: "Network Error",
					message: "A network error occurred. Please check your connection and try again"
				};
				this.showError(data);
			},

			showError: function(data) {
				var errorView = new ErrorView({
					model: data
				});
				this.layout.content.show(errorView);
			},

			showLoadingMessage: function(data) {
				var loadingView = new LoadingView({
					model: data
				});
				loadingView.render(data);
				this.layout.content.show(loadingView);
			},

			defaultView: function() {
				this.navigate("torrents", true);
			},

			torrentsList: function() {
				var listView = new TorrentsList({
					collection: app.torrents
				});
				this.layout.content.show(listView);
			},

			settingsView : function() {
				var settingsView = new SettingsView();
				this.layout.content.show(settingsView);
			},

			unknownRoute: function(path) {
				var data = {
					title: "404 Error",
					message: "The route you specified <pre>#"+path+"</pre> is not valid."
				};
				var errorView = new ErrorView({
					model: data
				});
				this.layout.content.show(errorView);
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