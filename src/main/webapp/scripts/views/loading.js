define([
	'jquery',
	'marionette',
	'underscore',
	'mustache',
	//Templates:
	'text!../../templates/loadingMessage.html'
	],function($, Marionette, _, Mustache,
		loadingTemplate) {

		var DEBUG = false;

		var LoadingView = Marionette.ItemView.extend({
			render: function() {
				this.log("rendering...");
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