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

		var ServerSettingsList = SettingsList.extend({
			itemView: SettingDetailsView.serversettings
		});

		var ClientSettingsList = SettingsList.extend({
			itemView: SettingDetailsView.clientsettings
		});

		return {
			serversettings: ServerSettingsList,
			clientsettings: ClientSettingsList
		};
	});