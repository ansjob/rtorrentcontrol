
/* Load application config, and tests */
define(['require_config'], function() {
	require([
		"order!scripts/lib/jasmine-1.2.0.rc3/jasmine.js",
		"order!scripts/lib/jasmine-1.2.0.rc3/jasmine-html.js",
		"order!scripts/lib/jasmine-jquery-1.3.1.js",
		"order!test-init",
		"order!specs/helloTest",
		"order!specs/helloFakeAjax",
		"order!specs/torrentListSpec",
		"order!specs/routerSpec",
		"order!specs/byteConverterSpec",
		"order!specs/torrentDetailsSpec",
		"order!specs/errorMessageSpec",
		"order!specs/torrentCollectionSpec",
		"order!specs/islandSpec",
		"order!specs/settingsViewSpec",
		"order!specs/settingViewSpec"
		], function() {

			/* Then run tests */
		var jasmineEnv = jasmine.getEnv();
		jasmineEnv.updateInterval = 1000;

		var trivialReporter = new jasmine.TrivialReporter();

		jasmineEnv.addReporter(trivialReporter);

		jasmineEnv.specFilter = function(spec) {
			return trivialReporter.specFilter(spec);
		};

		beforeEach(function() {
			setupFakeHttp();
		});

		jasmineEnv.execute();

	});

});
