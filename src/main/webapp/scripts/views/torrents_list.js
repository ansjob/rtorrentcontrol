define([
	'namespace',
	'jquery',
	'backbone',
	'underscore',
	'mustache',
	//Templates:
	'text!templates/torrents_list.html'
	],function(namespace, $, Backbone, _, Mustache,
		pageTemplate) {
	
	var app = namespace.app;
	
	var TorrentsList= Backbone.View.extend({
		el: "#content",
		
		render: function() {
			var output = Mustache.render(pageTemplate, {});
			$(this.el).html(output);
		}
	});
	
	return new TorrentsList();
	
	});