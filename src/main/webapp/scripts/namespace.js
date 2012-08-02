define([
  // Libs
  "jquery",
  "underscore",
  "backbone",
  "marionette"
],
function($, _, Backbone, Marionette) {

	// Put application wide code here
	namespace = {
		// Create a custom object with a nested Views object
		module: function(additionalProps) {
			return _.extend({ Views: {} }, additionalProps);
		},
		// Keep active application instances namespaced under an app object.
		app: _.extend({}, Backbone.Events),
		vent: new Marionette.EventAggregator()
	};

	return namespace;
});