define([
	"marionette",
	"jquery",
	"underscore",
	"views/setting_details",
	], function(Marionette, $, _, SettingDetailsView) {

		var DEBUG = true;

		var SettingsList = Marionette.CollectionView.extend({
			tagName: "div",
			itemView: SettingDetailsView,

			initialize: function(opts) {
				this.collection = opts.collection;
			},

			debug: function(msg) {
				if (DEBUG) {
					console.log("[SETTINGS LIST] " + msg);
				}
			}
		});

		var ServerSettingDetailsView = SettingDetailsView.extend({

			initialize: function() {
				_.bindAll(this, "save");
			},

			save: function() {
				this.model.save();
			}
		});

		var ClientSettingDetailsView = SettingDetailsView.extend({
			//TODO
		});

		var ServerSettingsList = SettingsList.extend({
			itemView: ServerSettingDetailsView
		});

		var ClientSettingsList = SettingsList.extend({
			itemView: ClientSettingDetailsView
		});

		return {
			serversettings: ServerSettingsList,
			clientsettings: ClientSettingsList
		};
	});