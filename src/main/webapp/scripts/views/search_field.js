define([
	'namespace',
	'jquery',
	'marionette',
	'underscore',
	'mustache',
	//Templates:
	'text!../../templates/search_field.html'
	],function(namespace, $, Marionette, _, Mustache,
		pageTemplate) {

	var app = namespace.app;
	var DEBUG = false;

	var SearchView= Marionette.ItemView.extend({

		initialize: function() {
		},

		events: {

		},

		render: function() {
			var input = {
			};
			var output = Mustache.render(pageTemplate, input);
			$(this.el).html(output);
		},

		onClose : function() {
			this.log("Closing!");
		},

		log : function(msg) {
			if (DEBUG)
				console.log("[SEARCH VIEW] " + msg);
		}

	});

	var inject = function() {
		var searchView = new SearchView();
		searchView.el = "#search_container";
		searchView.render();
	}

	return { initialize: inject };
	});