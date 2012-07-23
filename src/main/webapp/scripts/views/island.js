define([
	"underscore",
	"jquery",
	"marionette",
	"mustache",
	"text!../../templates/island.html"
], function(_, $, Marionette, Mustache, template) {

	var IslandView = Marionette.ItemView.extend({

		initialize: function() {
			_.bindAll("render");
		},

		tagName: "div",

		render: function() {
			$(this.el).addClass("island").addClass("well");
			var content = Mustache.render(template, {
				title: this.options.title,
				content: this.options.content
			});
			$(this.el).html(content);
		}
	});


	return IslandView;
});