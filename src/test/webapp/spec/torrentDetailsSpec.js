define(
	[
	'scripts/views/torrent_details',
	'scripts/collections/torrents',
	'scripts/views/error',
	'scripts/namespace',
	'fake-ajax'
	],
	function(TorrentDetails,TorrentCollection, ErrorView, namespace)
	{

		describe("TorrentDetails", function() {

			var app = namespace.app;

			var sampleData = [{
				id: "1234",
				name: "Some.Movie",
				sizeInBytes: 1025,
				fileNames:["movie.avi", "sample.avi"]
				},

				{
				id: "2345",
				name: "Good.Movie",
				sizeInBytes: 1023,
				fileNames:["film.avi", "sample.mkv"]
				}];


			var container = null;
			var refreshContainer = function() {
				container = $(TorrentDetails.el);

				$(container).html("");
				namespace.app.router.navigate("torrents/1234", true);
			};

			beforeEach(function() {
				registerFakeAjax({
					url : "api/torrents",
					successData: sampleData
				});
				TorrentCollection.initialize();
				refreshContainer();
			});

			it("is included", function() {
				expect(TorrentDetails).toBeDefined();
				expect(TorrentDetails).not.toEqual(null);
			});

			it("can flush the content", function() {
				$(container).html("");
				expect(container).toBeEmpty();
			});

			it("renders a h1", function() {
				expect(container).toContain("h1");
			});

			it("renders the title in a h1", function() {
				expect(container.find("h1")).toHaveHtml("Some.Movie");
			});

			it("renders an error message if given a weird id", function() {
				errorSpy = spyOn(ErrorView, 'render');
				TorrentDetails.render("deadbeef");
				expect(ErrorView.render).toHaveBeenCalled();
				expected_error = {
					message: "This torrent does not exist",
					title: "404 Not found!"
				};
				expect(errorSpy.mostRecentCall.args).toEqual([expected_error]);
			});

		});
	});