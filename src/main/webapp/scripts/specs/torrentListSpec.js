define(
	[
	'collections/torrents',
	'views/torrents_list',
	'namespace',
	],
	function(TorrentCollection, TorrentsListView, namespace)
	{
		describe("TorrentsList", function() {

			var listView;
			var collection;

			beforeEach(function() {

				collection = new TorrentCollection();
				collection.fetch();

				listView = new TorrentsListView({
					collection: collection
				});
				listView.render();
			});

			var verifyLengthComparedToCollection = function() {
				var lis = $(listView.el).find(".island");
				expect(lis.length).toEqual(collection.length);
			};

			it("has a list of the same length as the model data", function() {
				verifyLengthComparedToCollection();
			});

			it("empties the list when the collection is emptied", function() {
				sampleData.length = 0;
				collection.fetch();
				verifyLengthComparedToCollection();
			});

			it("removes a listItem when the collection shrinks", function() {
				sampleData.pop();
				collection.fetch();
				verifyLengthComparedToCollection();
			});

			afterEach(function() {
				listView.close();
			});

			describe("TorrentList - Poller relationship", function() {

				var listView;
				var poller;

				beforeEach(function() {
					poller = PollingManager.getPoller(collection);
					listView = new TorrentsListView({
						collection: collection,
						poller : poller
					});
					listView.render();
				});

				it("means the poller is stopped when the view is removed", function() {
					listView.close();
					expect(poller.active()).toBeFalsy();
				});
			});

		});


	});