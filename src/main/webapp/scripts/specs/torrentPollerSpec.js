define(["order!backbone",
	"order!torrent_poller",
	"order!namespace",
	"order!lib/backbone.poller"],

	function(Backbone, TorrentPoller, namespace){

		var app = namespace.app;

		describe("Polling Feature", function() {

			it("is included", function() {
				expect(typeof(TorrentPoller)).toEqual("function");
			});

			it("has a start function", function(){
				expect(typeof(new TorrentPoller().start)).toEqual("function");
			});

			describe("start()", function() {

				var tPoller, poller, TIMEOUT;

				beforeEach(function() {
					poller = PollingManager.getPoller(app.torrents);
					tPoller = new TorrentPoller();
					TIMEOUT = 2 * tPoller.INTERVAL;
				});

				it("calls the library function start()", function() {
					spyOn(poller, 'start');
					tPoller.start();
					expect(poller.start).toHaveBeenCalled();
				});

				it("calls the callback when the torrent has been fetched", function() {
					var hasFetched = false;
					var fetchCallback = function(){
						hasFetched = true;
					}
					poller.on("success", fetchCallback);

					runs(function() {
						new TorrentPoller().start();
					});

					waitsFor(function() {
						return hasFetched;
					}, "fetch callback", TIMEOUT);

					runs(function(){
						expect(hasFetched).toBeTruthy();
					});
				});
			});
		});
	});