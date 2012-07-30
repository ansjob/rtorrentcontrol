define(
	[
	'collections/torrents'
	],
	function(TorrentCollection)
	{

		describe("TorrentCollection", function() {

			var collection;

			var emptyCollection = function() {
				sampleData.length = 0;
				collection.fetch();
			}

			beforeEach(function() {
				collection = new TorrentCollection();
				collection.fetch();
			})

			it("loads the test elements elements", function(){
				expect(collection.length).toEqual(sampleData.length);
			});

			it("removes models when they are removed from the server", function() {
				emptyCollection();
				expect(collection.length).toEqual(0);
			});

			it("calls methods bound to the models when removing them", function() {
				var model = collection.at(0);

				var SomeClass = function(){};
				SomeClass.prototype.callback = function() {};
				spyOn(SomeClass.prototype, 'callback');

				model.bind("remove", SomeClass.prototype.callback);
				collection.remove(model);

				expect(SomeClass.prototype.callback).toHaveBeenCalled();
			});

			it("adds a third element when calling fetch", function() {
				sampleData.push({
					id: "3456hash",
					name: "Some.Song",
					sizeInBytes: 1024*1024,
					fileNames: "song.ogg"
				});
				collection.fetch();
				expect(collection.length).toEqual(3);
			});

		});

	});
