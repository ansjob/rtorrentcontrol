define([
	"marionette",
	"namespace",
	"collections/torrents",
	"collections/server_settings",
	"layouts/default",
	"router",
	"underscore"
	],
	function(
		Marionette,
		namespace,
		TorrentCollection,
		ServerSettingsCollection,
		DefaultLayout,
		Router,
		_){

		var APP_DEBUG = true;

		var debug = function(msg) {
			if (APP_DEBUG) {
				console.log("[APP] " + msg);
			}
		}

		var initialize = function(){

			debug("initializing!");

			var torrents = new TorrentCollection();
			var rootLayout = new DefaultLayout();
			var serverSettings = new ServerSettingsCollection();

			rootLayout.render();

			collections = {
				torrents: torrents,
				serverSettings : serverSettings
			}

			var routerOpts = {
				collections : collections,
				rootLayout: rootLayout,
				serverSettings: serverSettings
			};

			var router = new Router(routerOpts);

			namespace.vent.bind("startApp", function() {
				debug("starting...")
				_.forEach(collections, function(collection) {
					var poller = PollingManager.getPoller(collection);
					poller.on("error", function(results) {
						namespace.vent.trigger("fetchError", results);
					});
					poller.start();
				});
				router.start();
			});

			namespace.vent.bind("shutdownApp", function() {
				debug("stopping...")
				_.forEach(collections, function(collection) {
					var poller = PollingManager.getPoller(collection);
					poller.stop();
				});
				router.shutdown();
			});

			namespace.vent.trigger("startApp");
		};

		var App = {
			initialize	: initialize,
		};
		return App;
	});