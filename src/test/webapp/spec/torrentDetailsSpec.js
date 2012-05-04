define(
	[
	 'scripts/views/torrent_details',
	 'scripts/collections/torrents',
	 'scripts/namespace',
	 'fake-ajax'
	 ], 
	 function(TorrentDetails,TorrentCollection, namespace) 
	 {
		
		describe("TorrentDetails", function() {
			
			var sampleData = [{id: "1234", name: "Some.Movie", sizeInBytes: 1025, fileNames:["movie.avi", "sample.avi"]}, 
							  {id: "2345", name: "Good.Movie", sizeInBytes: 1023, fileNames:["film.avi", "sample.mkv"]}];
			
			
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
				namespace.app.router.navigate("torrents/deadbeef", true);
				expect(container.find(".error")).toHaveHtml("Unknown torrent id");
			});
			
		});
	 });