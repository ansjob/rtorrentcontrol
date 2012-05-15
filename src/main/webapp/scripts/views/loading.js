define([
	'jquery',
	'backbone',
	'underscore',
	'mustache',
	//Templates:
	'text!templates/loadingMessage.html'
	],function($, Backbone, _, Mustache,
		loadingTemplate) {

		var DEBUG = false;

		var LoadingView = Backbone.View.extend({
			render: function() {
				var data = this.model;
				var output = Mustache.render(loadingTemplate, {
					title: data.title,
					message: data.message
					});
				$(this.el).html(output);
			},

			onClose: function() {
				this.log("closing!");
			},

			log: function(msg) {
				if (DEBUG){
					console.log("[LOADING VIEW] " + msg);
				}
			}
		});
		return LoadingView;
	});