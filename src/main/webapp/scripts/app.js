define([
	"marionette",
	"scripts/namespace",
	"scripts/collections/torrents",
	"scripts/layouts/default"
	],
	function(Marionette, namespace, TorrentCollection, DefaultLayout){
		
		var initialize = function(){

			TorrentCollection.initialize();
			
			namespace.rootLayout = new DefaultLayout();
			
			namespace.rootLayout.render();
			
			namespace.app.vent = new Marionette.EventAggregator();

			require(["scripts/router"], function(Router) {
				Router.initialize();
			});
		};
		return {
			initialize	: initialize,
		};
	});