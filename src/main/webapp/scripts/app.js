define([
	"marionette",
	"namespace",
	"collections/torrents",
	"layouts/default"
	],
	function(Marionette, namespace, TorrentCollection, DefaultLayout){

		var initialize = function(){

			TorrentCollection.initialize();

			namespace.rootLayout = new DefaultLayout();

			namespace.rootLayout.render();

			namespace.app.vent = new Marionette.EventAggregator();

			require(["router"], function(Router) {
				Router.initialize();
			});
		};
		return {
			initialize	: initialize
		};
	});