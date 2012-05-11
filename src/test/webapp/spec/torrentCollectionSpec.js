define(
	[
	 'scripts/collections/torrents',
	 'scripts/namespace'
	 ],
	 function(TorrentCollection, namespace)
	 {
		var app = namespace.app;



		describe("TorrentCollection", function() {
			beforeEach(function() {
				try {
					Router.initialize();
				} catch(e) {}
			});

			it("loads the two test elements elements", function(){
				expect(app.torrents.length).toEqual(2);
			});

		});

		describe("Updating the collection", function() {

			it("has two elements to begin with", function() {
				expect(app.torrents.length).toEqual(2);
			});

			it("adds a third element when calling fetch", function() {
				sampleData.push({
					id: "3456hash",
					name: "Some.Song",
					sizeInBytes: 1024*1024,
					fileNames: "song.ogg"
				});
				app.torrents.fetch();
				expect(app.torrents.length).toEqual(3);
			});
		});
	 });