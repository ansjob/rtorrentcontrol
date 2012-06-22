define(
	[
	'scripts/views/torrents_list',
	'scripts/namespace',	],
	function(TorrentsListView, namespace)
	{
		describe("TorrentsList", function() {

			var app = namespace.app;
			var listView;
			

			beforeEach(function() {
				listView = new TorrentsListView({
					collection: app.torrents
				});
				listView.render();
			});

			var verifyLengthComparedToCollection = function() {
				var lis = $(listView.el).find("li");
				expect(lis.length).toEqual(sampleData.length);
			};

			it("has a method render", function() {
				expect(typeof(listView.render)).toEqual("function");
			});

			it("has a ul of the same length as the model data", function() {
				verifyLengthComparedToCollection();
			});
				
			it("empties the list when the collection is emptied", function() {
				sampleData.length = 0;
				app.torrents.fetch();
				verifyLengthComparedToCollection();
			});

			it("removes a li when the collection shrinks", function() {
				sampleData.pop();
				app.torrents.fetch();
				verifyLengthComparedToCollection();
			});

			afterEach(function() {
				listView.close();
			});
			

		});
	});