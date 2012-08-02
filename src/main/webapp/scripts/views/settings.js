define([
	'namespace',
	'jquery',
	'marionette',
	'underscore',
	'mustache',
	'views/settings_list',
	//Templates:
	'text!../../templates/settings.html'
	],function(namespace, $, Marionette, _, Mustache,
		SettingsList,
		template) {
		var SettingsLayout = Marionette.Layout.extend({

			template: template,

			initialize: function(opts) {
				this.log("initializing...");
				_.bindAll(this, "render", "showCollection", "addCollectionRegion", "onClose");

				this.collections = opts.collections;
				this.regions = {};
				_.each(this.options.collections, this.addCollectionRegion);
				this.reInitializeRegions();
			},

			addCollectionRegion: function(collection) {
				var poller = PollingManager.getPoller(collection);
				poller.stop();
				this.regions[collection.id] = "#" + collection.id;
				collection.on("reset", this.render);
			},

			render: function() {
				Marionette.Layout.prototype.render.call(this);
				_.each(this.collections, this.showCollection);
			},

			showCollection: function (collection) {
				if (collection.length === 0) {
					this.tryToFetch(collection);
				}
				else {
					this.log("rendering " + collection.id);
					var listView = new SettingsList[collection.id]({
						collection: collection
					});
					listView.render();
					this[collection.id].show(listView);
				}
			},

			tryToFetch: function(collection) {
				this.log("fetching " + collection.id);
				this.showLoadingMessage(collection);
				collection.fetch();
			},

			showLoadingMessage: function(collection) {
			//				console.log($("#serversettings"));
			},

			onClose: function() {
				for (var id in this.collections) {
					var collection = this.collections[id];
					collection.off(null, null, this);
				}
				this.startPollers();
			},

			startPollers: function() {
				_.each(this.collections, function(collection) {
					var poller = PollingManager.getPoller(collection);
					poller.start();
				});
			},

			DEBUG: false,

			log: function(msg) {
				if (this.DEBUG) {
					console.log("[SETTINGS LAYOUT] " + msg);
				}
			}
		});
		return SettingsLayout;
	});