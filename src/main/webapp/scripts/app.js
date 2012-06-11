define([
	"scripts/collections/torrents",
	"scripts/views/search_field",
	"backbone"
	],
	function( TorrentCollection, SearchView, Backbone){
		
		var initialize = function(){

			/* Extend Backbone with a close method for views */
			Backbone.View.prototype.close = function() {
				this.remove();
				this.unbind();
				if (this.onClose)
					this.onClose();
			};

			TorrentCollection.initialize();
			require(["scripts/router"], function(Router) {
				Router.initialize();
				SearchView.initialize();
			});
		};
		return {
			initialize	: initialize,
		};
	});