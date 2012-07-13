require( ['lib/order!require_config' ],
	function() {
		require(["lib/order!app", "lib/order!jquery", "lib/order!bootstrap", "lib/order!bootstrap-collapse"], function(App, $) {
			App.initialize();
		})
	}
);
