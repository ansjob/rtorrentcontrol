define([], function() {
	require.config({
		baseUrl: '../',
		paths : {
			/* Common libs */
			'jquery'		: 'scripts/lib/jquery-1.7.1.min',
			'order'			: 'scripts/lib/order',
			'underscore'	: 'scripts/lib/underscore-min',
			'transitions'	: 'scripts/plugin/bootstrap-transition',
			'collapse'		: 'scripts/plugin/bootstrap-collapse',
			'backbone'		: 'scripts/lib/backbone-min',
			'underscore'	: 'scripts/lib/underscore-min',
			'bootstrap'		: 'scripts/lib/bootstrap.min',
			'text'			: 'scripts/lib/text',
			'mustache'		: 'scripts/lib/requirejs.mustache',
			/* Testing libs */
			'mock-ajax'		: 'scripts/lib/mock-ajax',
			'fake-ajax'		: 'scripts/lib/jasmine-fake-ajax-0.3.4',
			
		}
	});
});