define(
	[
	'scripts/views/torrents_list',
	'scripts/namespace',	],
	function(TorrentsListView, namespace)
	{
		describe("TorrentsList", function() {

			var app = namespace.app;
			var listView;
			var el;
			var model;

			beforeEach(function() {
				listView = new TorrentsListView();
				listView.render();
				el = listView.el;
			});

			var verifyLengthComparedToCollection = function() {
				var ul= $(el).find("ul");
				var lis = ul.find("li");
				expect(lis.length).toEqual(sampleData.length);
			};

			it("has a method render", function() {
				expect(typeof(listView.render)).toEqual("function");
			});

			it("has a method onClose", function() {
				expect(typeof(listView.onClose)).toEqual("function");
			});

			it("has a ul of the same length as the model data", function() {
				verifyLengthComparedToCollection();
				});

			it("removes a li when the collection shrinks", function() {
				sampleData.pop();
				app.torrents.fetch();
				verifyLengthComparedToCollection();

			});

			afterEach(function() {
				listView.onClose();
			});

		});
	});