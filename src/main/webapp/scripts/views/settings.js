define([
	'scripts/namespace',
	'jquery',
	'backbone',
	'underscore',
	'mustache',
	//Templates:
	'text!templates/settings.html'
	],function(namespace, $, Backbone, _, Mustache,
		pageTemplate) {
	
	var app = namespace.app;
	
	var SettingsView = Backbone.View.extend({
		el: "#content",
		render: function(id) {
			var output = Mustache.render(pageTemplate, {id: id});
			$(this.el).html(output);
		}
	});
	return new SettingsView();
	});