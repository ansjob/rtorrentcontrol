
var MAIN_SRC_BASE = "../../main/webapp/";
var TEST_BASE = "../../test/webapp/";
var SPEC_PREFIX = TEST_BASE + "spec/";

/* Load application config, and tests */
define([MAIN_SRC_BASE + 'scripts/require_config'], function() {
	/* Override default baseUrl */
	require.config({
		baseUrl : MAIN_SRC_BASE,
	});

	require([
		'order!' + TEST_BASE + "lib/jasmine-1.2.0.rc3/jasmine.js",
		'order!' + TEST_BASE + "lib/jasmine-1.2.0.rc3/jasmine-html.js",
		'order!' + TEST_BASE + "lib/jasmine-jquery-1.3.1.js",
		'order!' + TEST_BASE + "test-init",
		'order!' + SPEC_PREFIX + "helloTest",
		'order!' + SPEC_PREFIX + "helloFakeAjax",
		'order!' + SPEC_PREFIX + "routerSpec",
		'order!' + SPEC_PREFIX + "torrentDetailsSpec",
		'order!' + SPEC_PREFIX + "errorMessageSpec",
		'order!' + SPEC_PREFIX + "torrentCollectionSpec"
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