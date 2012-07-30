define(
	[
	'router',
	'views/torrents_list',
	'collections/torrents',
	'views/torrent_details',
	'views/settings',
	'views/error',
	'views/loading',
	'layouts/default',
	'collections/server_settings'
	],
	function(
		Router,
		TorrentsList,
		TorrentCollection,
		TorrentDetailsView,
		SettingsView,
		ErrorView,
		LoadingView,
		DefaultLayout,
		ServerSettingsCollection
		)
		{
		describe("Router", function() {


			var router;
			var rootLayout = new DefaultLayout();
			rootLayout.render();

			beforeEach(function() {
				var routerOpts = {
					rootLayout : rootLayout,
					collections: {
						torrents: new TorrentCollection(),
						serverSettings: new ServerSettingsCollection()
					}
				};
				router = new Router(routerOpts);
				router.start();
				router.navigate("", true);
			});

			afterEach(function() {
				router.shutdown();
			});

			it("calls TorrentList.render when the url is #torrents", function() {
				router.navigate("settings", true);
				spyOn(TorrentsList.prototype, 'render');
				router.navigate("torrents", true);
				expect(TorrentsList.prototype.render).toHaveBeenCalled();
			});

			it("calls TorrentList.render when the url is #torrents/", function() {
				spyOn(TorrentsList.prototype, 'render');
				router.navigate("torrents/", true);
				expect(TorrentsList.prototype.render).toHaveBeenCalled();
			});

			it("calls TorrentDetails.render when the url is #torrents/1234", function() {
				spyOn(TorrentDetailsView.prototype, 'render');
				router.navigate("torrents/1234", true);
				expect(TorrentDetailsView.prototype.render).toHaveBeenCalled();
			});

			it("calls SettingsView.render() when url is #settings", function() {
				spyOn(SettingsView.prototype, 'render');
				router.navigate("settings", true);
				expect(SettingsView.prototype.render).toHaveBeenCalled();
			});

			it("calls SettingsView.render() when url is #settings/", function() {
				router.navigate("", true);
				spyOn(SettingsView.prototype, 'render');
				router.navigate("settings/", true);
				expect(SettingsView.prototype.render).toHaveBeenCalled();
			});

			it("calls ErrorView.render() when a weird-looking url is entered", function() {
				spyOn(ErrorView.prototype, 'render');
				router.navigate("someWeirdUrl", true);
				expect(ErrorView.prototype.render).toHaveBeenCalled();
			});

			describe("Fetching torrents when an unknown torrent is requested", function() {

				var addNewTorrentToServer = function() {
					sampleData.push({
						id: "3456",
						name: "Some.Movie.2",
						sizeInBytes: 1025,
						files:["movie.avi", "sample.avi"]
					});
				};

				beforeEach(function() {
					addNewTorrentToServer();
				});

				it("shows an error message if there is a connection error", function() {
					spyOn(ErrorView.prototype, 'render');
					jasmine.FakeAjax.clearContext();
					fakeAjax({
						registrations: [
						{
							url: "api/torrents",
							errorMessage: "Some error occurred"
						}
						]
					});
					router.navigate("torrents/3456", {
						trigger: true
					});
					expect(ErrorView.prototype.render).toHaveBeenCalled();
				});

				it("shows an error message if the torrent was not found", function() {
					spyOn(ErrorView.prototype, 'render');
					router.navigate("non-existant", {
						trigger: true
					});
					expect(ErrorView.prototype.render).toHaveBeenCalled();
				});

				it("calls fetch() on the collection", function() {
					spyOn(router.collections.torrents, 'fetch');
					router.navigate("torrents/3456", {
						trigger: true
					});
					expect(router.collections.torrents.fetch).toHaveBeenCalled();
				});

				it("hides the loading message afterwards", function() {
					spyOn(LoadingView.prototype, 'onClose');
					router.navigate("torrents/3456", {
						trigger: true
					});
					expect(LoadingView.prototype.onClose).toHaveBeenCalled();
				});

				it("displays a loading message while the collection is fetched", function() {
					spyOn(LoadingView.prototype, 'render');
					router.navigate("torrents/3456", {
						trigger: true
					});
					expect(LoadingView.prototype.render).toHaveBeenCalled();
				});

			});

		});
	});