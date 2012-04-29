require.config({
	baseUrl: 'scripts',
	paths : {
		'jquery'		: 'lib/jquery-1.7.1.min',
		'underscore'	: 'lib/underscore-min',
		'transitions'	: 'plugin/bootstrap-transition',
		'collapse'		: 'plugin/bootstrap-collapse',
		'backbone'		: 'lib/backbone-min',
		'underscore'	: 'lib/underscore-min',
		'bootstrap'		: 'lib/bootstrap.min',
		'text'			: 'lib/text',
		'mustache'		: 'lib/requirejs.mustache'
	}
});

require(['app' ,'jquery'],
	function(App, $) {
		require(['bootstrap'], function() {
			App.initialize();
		});
	});