require(['require_config'], function() {
	require( ['app' ,'jquery'],
		function(App, $) {
			require(['bootstrap'], function() {
				App.initialize();
			});
		});
});