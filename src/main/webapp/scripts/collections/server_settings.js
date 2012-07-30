define(["backbone"], function(Backbone) {

	var ServerSettingsCollection = Backbone.Collection.extend({
		url : "api/settings/server",
		id: "serversettings"
	});

	return ServerSettingsCollection;
})