
/* Load application config, and tests */
define(['require_config'], function() {
	/* Override default baseUrl */
	require([
		"order!scripts/lib/jasmine-1.2.0.rc3/jasmine.js",
		"order!scripts/lib/jasmine-1.2.0.rc3/jasmine-html.js",
		"order!scripts/lib/jasmine-jquery-1.3.1.js",
		"order!test-init",
		"order!specs/helloTest",
		"order!specs/helloFakeAjax",
		"order!specs/routerSpec",
		"order!specs/torrentDetailsSpec",
		"order!specs/errorMessageSpec",
		"order!specs/torrentCollectionSpec",
		"order!specs/torrentPollerSpec",
		"order!specs/torrentListSpec"
		], function() {

			/* Then run tests */
			var jasmineEnv = jasmine.getEnv();
			jasmineEnv.updateInterval = 1000;

			var trivialReporter = new jasmine.TrivialReporter();

			jasmineEnv.addReporter(trivialReporter);

			jasmineEnv.specFilter = function(spec) {
				return trivialReporter.specFilter(spec);
			};
			jasmineEnv.execute();
		});


});
