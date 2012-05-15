define([
	"scripts/namespace",
	"scripts/models/torrent_details",
	"scripts/views/torrent_details",
	"scripts/views/error"],
	function(namespace,
		TorrentDetailsLogic,
		TorrentDetailsView,
		ErrorView) {

		describe("TorrentDetailsLogic", function() {

			it("is included", function() {
				expect(TorrentDetailsLogic).toBeDefined(),
				expect(TorrentDetailsLogic).not.toEqual(null);
			});

			it("has a function showTorrent(id)", function() {
				expect(typeof(TorrentDetailsLogic.showTorrent)).toEqual("function");
			});

			it("calls the TorrentDetailsView.render(2345) since it is in the collection", function() {
				spyOn(TorrentDetailsView, "render");
				TorrentDetailsLogic.showTorrent("2345");
				expect(TorrentDetailsView.render).toHaveBeenCalled();
			});

			it("has access to app.torrents", function() {
				expect(namespace.app.torrents).toBeDefined();
			})

			it("fetches a torrent that appeared since the last sync", function() {
				sampleData.push({
					id: "3456",
					name: "Some.Movie2",
					sizeInBytes: 1025,
					files:["movie.avi", "sample.avi"]
				});
				spyOn(namespace.app.torrents, 'fetch');
				TorrentDetailsLogic.showTorrent("3456");
				expect(namespace.app.torrents.fetch).toHaveBeenCalled();
			});

			it("calls the error view when given an ID not in the collection", function() {
				spyOn(ErrorView, 'render');
				namespace.app.router.navigate("torrents/wtfbbqomg", true);
				var expected_error = {
					title: "404 Not found!",
					message: "The torrent you appear to be looking for does not exist on the server."
				};
				expect(ErrorView.render).toHaveBeenCalled();
				expect(ErrorView.render).toHaveBeenCalledWith(expected_error);
			});

		});
	});