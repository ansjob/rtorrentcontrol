define(
	[
	 'scripts/router',
	 'scripts/views/torrents_list',
	 'scripts/views/torrent_details',
	 'scripts/views/settings',
	 'scripts/namespace'
	 ], 
	 function(Router, TorrentsList, TorrentDetailsView, SettingsView, namespace) 
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
			

			it("calls TorrentDetails.render(23) when the url is #torrents/23", function() {
				namespace.app.router.navigate("", true);
				spyOn(TorrentDetailsView, 'render');
				namespace.app.router.navigate("torrents/23", true);
				expect(TorrentDetailsView.render).toHaveBeenCalled();
				expect(TorrentDetailsView.render).toHaveBeenCalledWith(23);
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
			
		});
	 });