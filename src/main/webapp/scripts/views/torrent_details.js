define([
	'scripts/namespace',
	'jquery',
	'backbone',
	'underscore',
	'mustache',
	//Templates:
	'text!templates/torrent_details.html',
	'text!templates/errorMessage.html'
	],function(namespace, $, Backbone, _, Mustache,
		pageTemplate, errorMessage) {
	
	var app = namespace.app;
	
	var TorrentDetails = Backbone.View.extend({
		el: "#content",
		render: function(id) {
			var torrent = app.torrents.get(id);
			var output;
			if (torrent) {
				output = Mustache.render(
				pageTemplate, {id: torrent.get('id'), name: torrent.get('name')});
			} else {
				output = Mustache.render(errorMessage, {error: "Unknown torrent id"});
			}
			$(this.el).html(output);
		}
	});
	
	return new TorrentDetails();
	
	});