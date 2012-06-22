define([
	'scripts/namespace',
	'jquery',
	'marionette',
	'underscore',
	'mustache',
	//Templates:
	'text!templates/errorMessage.html'
	],function(namespace, $, Marionette, _, Mustache,
		errorTemplate) {

		var app = namespace.app;

		var ErrorView = Marionette.ItemView.extend({
			render: function() {
				var message = this.model;
				var output = Mustache.render(errorTemplate, {
					error: message
				});
				$(this.el).html(output);
			}
		});

		return ErrorView;
	});