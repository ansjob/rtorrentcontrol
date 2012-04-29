define([
	'namespace',
	'jquery',
	'backbone',
	'underscore',
	'mustache',
	//Templates:
	'text!templates/torrent_details.html'
	],function(namespace, $, Backbone, _, Mustache,
		pageTemplate) {
	
	var app = namespace.app;
	
	var TorrentDetails= Backbone.View.extend({
		el: "#content",
		
		render: function(id) {
			var output = Mustache.render(pageTemplate, {id: id});
			$(this.el).html(output);
		}
	});
	
	return new TorrentDetails();
	
	});