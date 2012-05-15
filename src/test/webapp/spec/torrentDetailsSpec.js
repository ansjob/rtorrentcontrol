define(
	[
	'scripts/views/torrent_details',
	'scripts/namespace'
	],
	function(TorrentDetailsView, namespace)
	{
		describe("TorrentDetails", function() {

			var app = namespace.app;
			var TorrentView;
			var el;
			var model;

			beforeEach(function() {
				model = app.torrents.get("1234");
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
				spyOn(TorrentView, 'renderModel');
				model.set({
					name: "hello"
				});
				expect(TorrentView.renderModel).toHaveBeenCalled();
			});

			it("unbinds when onClose is called", function() {
				spyOn(TorrentView, 'renderModel');
				TorrentView.onClose();
				model.set({
					name: "hello"
				});
				expect(TorrentView.renderModel).not.toHaveBeenCalled();
			});


			it("updates when fetch is called", function() {
				var globalModel = app.torrents.get("1234");
				var localView = new TorrentDetailsView({
					model: globalModel
				});
				localView.render();

				spyOn(localView,'renderModel');

				sampleData[0].name = "hello";
				app.torrents.fetch();

				expect(localView.renderModel).toHaveBeenCalled();
			});

			it("unbinds when closed from fetch() updates", function() {
				var globalModel = app.torrents.get("1234");
				var localView = new TorrentDetailsView({
					model: globalModel
				});
				localView.render();

				spyOn(localView,'renderModel');

				sampleData[0].name = "hello";
				localView.onClose();
				app.torrents.fetch();

				expect(localView.renderModel).not.toHaveBeenCalled();
			});

			afterEach(function() {
				TorrentView.onClose();
			});

		});
	});