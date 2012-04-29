define([
	"router",
	"collections/torrents",
	], 
	function(Router, TorrentCollection){
		var initialize = function(){
			TorrentCollection.initialize();
			Router.initialize();
		};
		return { 
			initialize	: initialize,
		};
	});
