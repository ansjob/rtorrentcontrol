define([
	'namespace',
	'jquery',
	'marionette',
	'underscore',
	'mustache',
	//Templates:
	'text!../../templates/settings.html'
	],function(namespace, $, Marionette, _, Mustache,
		pageTemplate) {

	var app = namespace.app;

	var SettingsView = Marionette.CompositeView.extend({

		render: function(id) {
			var output = Mustache.render(pageTemplate, {id: id});
			$(this.el).html(output);
		}
	});
		return SettingsView;
	});