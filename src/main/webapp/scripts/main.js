require( ['require_config' ],
	function() {
		require(["order!app", "order!jquery", "order!bootstrap", "order!bootstrap-collapse"], function(App, $) {
			App.initialize();
		})
	}
);
