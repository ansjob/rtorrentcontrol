require(['require_config'], function() {
	require( ['scripts/app' ,'jquery'],
		function(App, $) {
			require(['bootstrap'], function() {
				require.config({
					baseUrl: '..'
				});
				App.initialize();
			});
		});
});