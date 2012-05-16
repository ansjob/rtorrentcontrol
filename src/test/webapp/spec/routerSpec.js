define(
	[
	'scripts/router',
	'scripts/views/torrents_list',
	'scripts/views/torrent_details',
	'scripts/views/settings',
	'scripts/views/error',
	'scripts/views/loading',
	'scripts/namespace'
	],
	function(Router,
		TorrentsList,
		TorrentDetailsView,
		SettingsView,
		ErrorView,
		LoadingView,
		namespace)
		{

		var app = namespace.app;

		beforeEach(function() {
			try {
				Router.initialize();
			} catch(e) {}
			namespace.app.router.navigate("", true);
		});
		describe("Router", function() {

			it("has a property initialize", function() {
				expect(Router.initialize).toBeDefined();
			});

			it("calls TorrentList.render when the url is #torrents", function() {
				namespace.app.router.navigate("settings", true);
				spyOn(TorrentsList.prototype, 'render');
				namespace.app.router.navigate("torrents", true);
				expect(TorrentsList.prototype.render).toHaveBeenCalled();
			});

			it("calls TorrentList.render when the url is #torrents/", function() {
				spyOn(TorrentsList.prototype, 'render');
				namespace.app.router.navigate("torrents/", true);
				expect(TorrentsList.prototype.render).toHaveBeenCalled();
			});


			it("calls TorrentDetails.render when the url is #torrents/1234", function() {
				namespace.app.router.navigate("", true);
				spyOn(TorrentDetailsView.prototype, 'render');
				namespace.app.router.navigate("torrents/1234", true);
				expect(TorrentDetailsView.prototype.render).toHaveBeenCalled();
			});

			it("calls SettingsView.render() when url is #settings", function() {
				spyOn(SettingsView.prototype, 'render');
				namespace.app.router.navigate("settings", true);
				expect(SettingsView.prototype.render).toHaveBeenCalled();
			});

			it("calls SettingsView.render() when url is #settings/", function() {
				namespace.app.router.navigate("", true);
				spyOn(SettingsView.prototype, 'render');
				namespace.app.router.navigate("settings/", true);
				expect(SettingsView.prototype.render).toHaveBeenCalled();
			});

			it("calls ErrorView.render() when a weird-looking url is entered", function() {
				spyOn(ErrorView.prototype, 'render');
				app.router.navigate("someWeirdUrl", true);
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

				it("calls fetch() on the collection", function() {
					spyOn(app.torrents, 'fetch');
					app.router.viewTorrent("3456");
					expect(app.torrents.fetch).toHaveBeenCalled();
				});

				it("displays a loadingMessage while the collection is fetched", function() {
					spyOn(LoadingView.prototype, 'render');
					app.router.viewTorrent("3456");
					expect(LoadingView.prototype.render).toHaveBeenCalled();
				});

				it("hides the loading message afterwards", function() {
					spyOn(LoadingView.prototype, 'onClose');
					app.router.viewTorrent("3456");
					expect(LoadingView.prototype.onClose).toHaveBeenCalled();
				});

				it("shows an error message if there is a connection error", function() {
					spyOn(ErrorView.prototype, 'render');
					jasmine.FakeAjax.clearContext();
					fakeAjax({
						registrations: [
							{url: "api/torrents", errorMessage: "Some error occurred"}
						]
					});
					app.router.viewTorrent("3456");
					expect(ErrorView.prototype.render).toHaveBeenCalled();
				});

				it("shows an error message if the torrent was not found", function() {
					spyOn(ErrorView.prototype, 'render');
					app.router.viewTorrent("non-existant");
					expect(ErrorView.prototype.render).toHaveBeenCalled();
				});
			});


		});
	});