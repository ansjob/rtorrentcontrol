define(
	[
	'views/torrent_details',
	'collections/torrents'
	],
	function(TorrentDetailsView, TorrentCollection)
	{
		describe("TorrentDetails", function() {

			var TorrentView, el, model, collection;

			beforeEach(function() {
				collection = new TorrentCollection();
				collection.fetch();
				model = collection.get("1234");
				TorrentView = new TorrentDetailsView({
					model: model
				});
				TorrentView.render();
				el = TorrentView.el;
			});

			it("has a method render", function() {
				expect(typeof(TorrentView.render)).toEqual("function");
			});

			it("has a method onClose", function() {
				expect(typeof(TorrentView.onClose)).toEqual("function");
			});

			it("binds rendering to changes in the model", function() {
				spyOn(TorrentView, 'render');
				model.set({
					name: "hello"
				});
				expect(TorrentView.render).toHaveBeenCalled();
			});

			it("unbinds when onClose is called", function() {
				spyOn(TorrentView, 'render');
				TorrentView.onClose();
				model.set({
					name: "hello"
				});
				expect(TorrentView.render).not.toHaveBeenCalled();
			});

			it("unbinds when closed from fetch() updates", function() {
				var globalModel = collection.get("1234");
				var localView = new TorrentDetailsView({
					model: globalModel
				});
				localView.render();

				spyOn(localView,'render');

				sampleData[0].name = "hello";
				localView.onClose();
				collection.fetch();

				expect(localView.render).not.toHaveBeenCalled();
			});

			afterEach(function() {
				TorrentView.onClose();
			});

		});
	});