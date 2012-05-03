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
		
		describe("Router", function() {
			
			beforeEach(function() {
				try {
					Router.initialize();
				} catch(e) {}
			});

			it("has a property initialize", function() {
				expect(Router.initialize).toBeDefined();
			});
			
			it("can access torrents list", function() {
				expect(TorrentsList).toBeDefined();
				expect(TorrentsList.render).toBeDefined();
			});
		
			it ("calls TorrentList.render when the url is #torrents", function() {
				namespace.app.router.navigate("settings", true);
				spyOn(TorrentsList, 'render');
				namespace.app.router.navigate("torrents", true);
				expect(TorrentsList.render).toHaveBeenCalled();
			});
			
			it ("calls TorrentList.render when the url is #torrents/", function() {
				namespace.app.router.navigate("", true);
				spyOn(TorrentsList, 'render');
				namespace.app.router.navigate("torrents/", true);
				expect(TorrentsList.render).toHaveBeenCalled();
			});
			

			it ("calls TorrentDetails.render(23) when the url is #torrents/23", function() {
				namespace.app.router.navigate("", true);
				spyOn(TorrentDetailsView, 'render');
				namespace.app.router.navigate("torrents/23", true);
				expect(TorrentDetailsView.render).toHaveBeenCalled();
				expect(TorrentDetailsView.render).toHaveBeenCalledWith(23);
			});
		
			it("calls Settings.render()", function() {
				spyOn(SettingsView, 'render');
				namespace.app.router.navigate("settings", true);
				expect(SettingsView.render).toHaveBeenCalled();
			});
			
			it("calls Settings.render()", function() {
				namespace.app.router.navigate("", true);
				spyOn(SettingsView, 'render');
				namespace.app.router.navigate("settings/", true);
				expect(SettingsView.render).toHaveBeenCalled();
			});
			
		});
	 });