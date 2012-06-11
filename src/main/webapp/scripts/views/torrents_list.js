define([
	'scripts/namespace',
	'jquery',
	'backbone',
	'underscore',
	'mustache',
	'scripts/views/torrent_list_item_view',
	//Templates:
	'text!templates/torrents_list.html'
	],function(namespace, $, Backbone, _, Mustache,
		TorrentListItemView,
		pageTemplate) {

		var app = namespace.app;

		var TorrentsList= Backbone.View.extend({

			initialize: function() {
				_.bindAll(this, "render", "addAllTorrents");
				this.torrentViews = [];
				app.torrents.bind("reset", this.addAllTorrents);
			},

			render: function() {
				this.log("render()");
				var output = Mustache.render(pageTemplate);
				$(this.el).html(output);
				this.torrentUl = $(this.el).find("ul");
				this.addAllTorrents();
				return this;
			},

			addAllTorrents: function() {
				this.log("addAllTorrents()");
				_.each(this.torrentViews, function(view) {
					view.close();
				});
				$(this.torrentUl).empty();
				app.torrents.each(function (model) {
					this.addOneTorrent(model);
				}, this);
			},

			addOneTorrent: function(model) {
				this.log("Appending torrent");
				var ul = $(this.el).find("ul");
				var torrentView = new TorrentListItemView({
					model: model
				});
				torrentView.render();
				$(ul).append(torrentView.el);
				model.bind('remove', torrentView.remove);

				this.torrentViews.push(torrentView);
			},

			removeItem: function(model) {
				this.log("Removing model: " + model);
				model.trigger("remove");
			},

			onClose : function() {
				app.torrents.unbind("reset change", null, this);
				this.log("Closing!");
			},

			log : function(msg) {
				if (this.DEBUG)
					console.log("[TORRENT LIST] " + msg);
			}

		});
		TorrentsList.prototype.DEBUG = false;
		return TorrentsList;

	});