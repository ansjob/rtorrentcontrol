define([
	"scripts/collections/torrents",
	"backbone"
	],
	function( TorrentCollection, Backbone){
		var initialize = function(){

			/* Extend Backbone with a close mthod for views */
			Backbone.View.prototype.close = function() {
				this.remove();
				this.unbind();
				if (this.onClose)
					this.onClose();
			};

			TorrentCollection.initialize();
			require(["scripts/router"], function(Router) {
				Router.initialize();
			});
		};
		return {
			initialize	: initialize,
		};
	});