/* Set so that we can load resources */
require.config({
	baseUrl : "../../main/webapp/",
});

var TEST_BASE = "../../test/webapp/";
var SPEC_PREFIX = TEST_BASE + "spec/";
/* Load application config, and tests */
define(['scripts/lib/underscore-min','scripts/require_config'], function() {
	require([ 
	     'order!' + TEST_BASE + "lib/jasmine-1.2.0.rc3/jasmine.js",
         'order!' + TEST_BASE + "lib/jasmine-1.2.0.rc3/jasmine-html.js",
         'order!' + SPEC_PREFIX + "helloTest",
         //'order!' + SPEC_PREFIX + "helloNetwork",
         'order!' + SPEC_PREFIX + "helloFakeAjax"
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