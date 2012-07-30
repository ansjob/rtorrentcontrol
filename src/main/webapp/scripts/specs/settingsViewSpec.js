define([
	"views/settings",
	"jquery",
	"collections/server_settings"
	],
	function(
		SettingsLayout,
		$,
		ServerSettingsCollection
		) {
		describe("SettingsView", function() {

			var layout, serverSettings, poller;

			beforeEach(function() {
				serverSettings = new ServerSettingsCollection();
				poller = PollingManager.getPoller(serverSettings);
				var collections = {};
				collections[serverSettings.id] = serverSettings;
				layout = new SettingsLayout({
					collections: collections
				});
			});

			afterEach(function() {
				poller.stop(); //clean up after ourselves
			})

			it("renders successfully", function() {
				serverSettings.fetch();
				layout.render();
			/* If an error is thrown during the render, it would be triggered here */
			});

			it("stops the poller when rendered", function() {
				serverSettings.fetch();
				layout.render();
				expect(poller.active()).toBeFalsy();
			});

			it("starts the poller again when removed", function() {
				serverSettings.fetch();
				layout.render();
				layout.close();
				expect(poller.active()).toBeTruthy();
			});

			describe("when the collection hasn't been fetched", function() {
				it("tries to fetch the collection", function() {
					spyOn(serverSettings, 'fetch');
					layout.render();
					expect(serverSettings.fetch).toHaveBeenCalled();
				});
			})

			describe("when the collection has been fetched", function() {

				beforeEach(function() {
					serverSettings.fetch();
				});

				it("renders the server settings", function() {
					var items = $(layout.el).find("#serversettings").find(".well");
					expect(items.length).toEqual(sampleServerSettings.length);
				});
			});
		});
	});