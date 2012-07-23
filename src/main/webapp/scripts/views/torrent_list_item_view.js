define([
	'views/island',
	'mustache',
	'text!../../templates/torrent_list_item_view.html',
	'utils/byteconverter'
], function(IslandView, Mustache,template, ByteUtil) {

	var titleTemplate = "<a href = '#torrents/{{id}}'>{{title}}</a>";


	var TorrentListViewItem = IslandView.extend({

		tagName: "div",

		initialize: function() {
			var viewData = this.model.toJSON();
			viewData.completed = this.model.getCompletedPercentage();
			viewData.downloadSpeed = ByteUtil.formatBytes(viewData.downloadSpeed);
			viewData.uploadSpeed = ByteUtil.formatBytes(viewData.uploadSpeed);

			var content = Mustache.render(template, viewData);

			var title = this.model.get("name");
			var titleLink = Mustache.render(titleTemplate, {
				id: this.model.get("id"),
				title: title
			})

			this.options.content = content;
			this.options.title = titleLink;
		},

		remove: function() {
			this.log("removing myself");
		},

		render: function() {
			IslandView.prototype.render.call(this);
			$(this.el).addClass("span4");
		},


		log: function(msg) {
			if (this.DEBUG)
				console.log("[TORRENT LIST VIEW ITEM] " + msg);
		}
	});
	TorrentListViewItem.prototype.DEBUG = false;
	return TorrentListViewItem;
});