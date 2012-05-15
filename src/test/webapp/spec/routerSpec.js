define(
	[
	'scripts/router',
	'scripts/views/torrents_list',
	'scripts/views/torrent_details',
	'scripts/views/settings',
	'scripts/views/error',
	'scripts/namespace'
	],
	function(Router, TorrentsList, TorrentDetailsView, SettingsView, ErrorView, namespace)
	{
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
				spyOn(TorrentsList, 'render');
				namespace.app.router.navigate("torrents", true);
				expect(TorrentsList.render).toHaveBeenCalled();
			});

			it("calls TorrentList.render when the url is #torrents/", function() {
				namespace.app.router.navigate("", true);
				spyOn(TorrentsList, 'render');
				namespace.app.router.navigate("torrents/", true);
				expect(TorrentsList.render).toHaveBeenCalled();
			});


			it("calls TorrentDetails.showTorrent(1234) when the url is #torrents/1234", function() {
				namespace.app.router.navigate("", true);
				spyOn(TorrentDetailsView, 'showTorrent');
				namespace.app.router.navigate("torrents/1234", true);
				expect(TorrentDetailsView.showTorrent).toHaveBeenCalled();
				expect(TorrentDetailsView.showTorrent).toHaveBeenCalledWith("1234");
			});

			it("calls SettingsView.render() when url is #settings", function() {
				spyOn(SettingsView, 'render');
				namespace.app.router.navigate("settings", true);
				expect(SettingsView.render).toHaveBeenCalled();
			});

			it("calls SettingsView.render() when url is #settings/", function() {
				namespace.app.router.navigate("", true);
				spyOn(SettingsView, 'render');
				namespace.app.router.navigate("settings/", true);
				expect(SettingsView.render).toHaveBeenCalled();
			});


			it("calls ErrorView.render() when a weird-looking url is entered", function() {
				var renderSpy = spyOn(ErrorView, 'render');
				namespace.app.router.navigate("someWeirdUrl", true);
				var expected_error = {
					title: "404 Error",
					message: "The route you specified <pre>#someWeirdUrl</pre> is not valid."
				};

				expect(renderSpy.mostRecentCall.args).toEqual([expected_error]);
			});
		});
	});