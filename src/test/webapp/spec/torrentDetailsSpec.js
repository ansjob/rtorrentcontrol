define(
	[
	'scripts/views/torrent_details',
	'scripts/views/error',
	'scripts/namespace'
	],
	function(TorrentDetailsView , ErrorView , namespace)
	{
		describe("TorrentDetails", function() {

			var app = namespace.app;

			/* Utility functions for this unit test */
			var container;
			var refreshContainer = function() {
				container = $(TorrentDetailsView.el);

				$(container).html("");
				namespace.app.router.navigate("torrents/1234", true);
			};

			var addExtraTorrent = function() {

			};

			beforeEach(function() {
				refreshContainer();
			});

			it("is included", function() {
				console.log(typeof(TorrentDetailsView));
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

			it("calls the render(2345) since it is in the collection", function() {
				spyOn(TorrentDetailsView, "render");
				TorrentDetailsView.showTorrent("2345");
				expect(TorrentDetailsView.render).toHaveBeenCalled();
			});

			it("fetches a torrent that appeared since the last sync", function() {
				addExtraTorrent();
				spyOn(app.torrents, 'fetch');
				TorrentDetailsView.showTorrent("3456");
				expect(app.torrents.fetch).toHaveBeenCalled();
			});

			it("can render a torrent when it has appeared on the server", function() {
				addExtraTorrent();
				spyOn(TorrentDetailsView, 'render');
				TorrentDetailsView.showTorrent("3456");
				expect(TorrentDetailsView.render).toHaveBeenCalled();
			});

			it("calls the error view when given an ID not in the collection", function() {
				spyOn(ErrorView, 'render');
				app.router.navigate("torrents/wtfbbqomg", true);
				var expected_error = {
					title: "404 Not found!",
					message: "The torrent you appear to be looking for does not exist on the server."
				};
				expect(ErrorView.render).toHaveBeenCalled();
				expect(ErrorView.render).toHaveBeenCalledWith(expected_error);
			});

			it("calls for a new render when the torrent collection resets", function() {
				spyOn(TorrentDetailsLogic, 'showTorrent');
				sampleData[0].name = "Some.Crap";
				app.torrents.fetch();
				expect(TorrentDetailsView.showTorrent).toHaveBeenCalled();
			});

		});
	});