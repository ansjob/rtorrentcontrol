define(
	[
	'scripts/views/torrents_list',
	'scripts/namespace'
	],
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

			it("has a method render", function() {
				expect(typeof(listView.render)).toEqual("function");
			});

			it("has a method onClose", function() {
				expect(typeof(listView.onClose)).toEqual("function");
			});

			it("calls render when a model is updated", function() {
				spyOn(listView, 'render');
				var model = app.torrents.get("1234");
				model.set({
					name: "hello"
				});
				expect(listView.render).toHaveBeenCalled();
			});

			it("unbinds itself when called to close", function() {
				spyOn(listView, 'render');
				listView.onClose();
				var model = app.torrents.get("1234");
				model.set({
					name: "hello"
				});
				expect(listView.render).not.toHaveBeenCalled();
			});
			
			afterEach(function() {
				listView.onClose();
			});

		});
	});