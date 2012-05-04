require(['require_config'], function() {
	require( ['scripts/app' ,'jquery'],
		function(App, $) {
			require(['order!bootstrap', 'order!bootstrap-collapse'], function() {
				require.config({
					baseUrl: '..'
				});
				App.initialize();
			});
		});
});