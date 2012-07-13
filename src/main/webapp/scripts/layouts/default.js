define(['marionette', 'underscore', 'jquery', 'text!../../templates/layouts/default.html'], 
	function(Marionette, _, $, template) {
		
	AppLayout =	Marionette.Layout.extend({
		el: $("body"),
		
		template: template,
		
		regions: {
			navigation	: "#menu",
			content		: "#content",
		}
	});
	
	return AppLayout;
});
