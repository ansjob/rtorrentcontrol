define(
	[
	'scripts/namespace',
	'jquery'
	],
	function(namespace, $)
	{
		var app = namespace.app;



		describe("TorrentCollection", function() {

			var emptyCollection = function() {
				sampleData.length = 0;
				app.torrents.fetch();
			}

			it("loads the test elements elements", function(){
				expect(app.torrents.length).toEqual(sampleData.length);
			});

			it("removes models when they are removed from the server", function() {
				emptyCollection();
				expect(app.torrents.length).toEqual(0);
			});

			it("calls methods bound to the models when removing them", function() {
				var model = app.torrents.at(0);

				var SomeClass = function(){};
				SomeClass.prototype.callback = function() {};
				spyOn(SomeClass.prototype, 'callback');

				model.bind("remove", SomeClass.prototype.callback);
				app.torrents.remove(model);

				expect(SomeClass.prototype.callback).toHaveBeenCalled();
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