define([
	'scripts/namespace',
	'jquery',
	'backbone',
	'underscore',
	'mustache',
	//Templates:
	'text!templates/errorMessage.html'
	],function(namespace, $, Backbone, _, Mustache,
		errorTemplate) {

		var app = namespace.app;

		var ErrorView = Backbone.View.extend({
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