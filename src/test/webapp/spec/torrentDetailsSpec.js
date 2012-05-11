define(
	[
	'scripts/views/torrent_details',
	'scripts/views/error',
	'scripts/namespace',
	'fake-ajax'
	],
	function(TorrentDetailsView,ErrorView, namespace)
	{

		describe("TorrentDetails", function() {

			var app = namespace.app;


			var container = null;
			var refreshContainer = function() {
				container = $(TorrentDetailsView.el);

				$(container).html("");
				namespace.app.router.navigate("torrents/1234", true);
			};

			beforeEach(function() {
				refreshContainer();
			});

			it("is included", function() {
				expect(TorrentDetailsView).toBeDefined();
				expect(TorrentDetailsView).not.toEqual(null);
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

			it("calls the error view when given an ID not in the collection", function() {
				spyOn(ErrorView, 'render');
				app.router.navigate("torrents/wtfbbqomg", true);
				var expected_error = {
					title: "404 Not found!",
					message: "The torrent you appear to be looking for was not"+
							" loaded in the client."
				};
				expect(ErrorView.render).toHaveBeenCalled();
				expect(ErrorView.render).toHaveBeenCalledWith(expected_error);
			});

		});
	});