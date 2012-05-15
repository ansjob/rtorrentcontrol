define([
	'scripts/namespace',
	'underscore',
	'jquery',
	'backbone',
	//Views
	'scripts/main_view',
	'scripts/views/torrents_list',
	'scripts/views/torrent_details',
	'scripts/views/settings',
	'scripts/views/error',
	'scripts/views/loading'
], function(namespace, _, $, Backbone,
MainView,
TorrentsList,
TorrentDetailsView,
SettingsView,
ErrorView,
LoadingView) {
	var app = namespace.app;

	var rTorrentRouter = Backbone.Router.extend({

		initialize: function() {
			this.mainView = MainView;
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
			var that = this;
			app.torrents.fetch({
				success: function() {
					var torrent = app.torrents.get(id);
					if (!torrent) {
						that.error({});
					} else {

						that.renderTorrentView(torrent);
					}
				},
				error: function() {
					that.io_error();
				}
			});
		},

		renderTorrentView : function(torrentModel) {
			var torrentView = new TorrentDetailsView({
				model : torrentModel
			});
			this.mainView.showView(torrentView);
		},

		io_error: function() {
			var data = {
				title: "Network Error",
				message: "A network error occurred. Please check your connection and try again"
			};
			var errorView = new ErrorView({model: data});
			this.mainView.showView(errorView);
		},

		error: function() {

		},

		showLoadingMessage: function(data) {
			var loadingView = new LoadingView({
				model: data
			});
			loadingView.render(data);
			this.mainView.showView(loadingView);
		},

		defaultView: function() {
			this.navigate("torrents", true);
		},

		torrentsList: function() {
			var listView = new TorrentsList();
			this.mainView.showView(listView);
		},

		settingsView : function() {
			var settingsView = new SettingsView();
			this.mainView.showView(settingsView);
		},

		unknownRoute: function(path) {
			var data = {
				title: "404 Error",
				message: "The route you specified <pre>#"+path+"</pre> is not valid."
			};
			var errorView = new ErrorView({model: data});
			this.mainView.showView(errorView);
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