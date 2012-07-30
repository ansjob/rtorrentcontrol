define([
	"namespace",
	"marionette",
	"jquery",
	"underscore",
	"mustache",
	"text!../../templates/setting_details.html"
	],
	function(namespace, Marionette, $, _, Mustache, template) {
		var SettingDetails = Marionette.ItemView.extend({

			initialize: function() {
				_.bindAll(this, "value");
			},

			tagName: "div",

			render: function() {
				var input = this.model.toJSON();
				var output = Mustache.render(template, input);
				$(this.el).html(output);
				this.editor = this.getEditor();
				this.saveBtn = this.getSaveButton();
				$(this.el).find(".editorcontainer").html(this.editor);
				$(this.el).find(".savebuttoncontainer").html(this.saveBtn);
				$(this.el).addClass("well");
			},

			getEditor : function() {
				var settingType = this.model.get("type");
				switch(settingType) {
					default:
						this.warnUnknown(settingType);
					case "string":
						var el = document.createElement("input");
						var key = this.model.get("key");
						var val = this.model.get("val");
						$(el).attr("name", key);
						$(el).attr("value", val);
						return el;
						break;
				}
			},

			value: function() {
				var settingType = this.model.get("type");
				switch(settingType) {
					default:
						this.warnUnknown(settingType);
					case "string":
						return $(this.editor).val();
						break;
				};
				return "unknown";
			},

			getSaveButton: function() {
				var btn = document.createElement("button");
				$(btn).html("Save");
				$(btn).addClass("btn");
				$(btn).click(this.save);
				return btn;
			},

			warnUnknown: function(settingType) {
				namespace.vent.trigger("warning", {
					message: "Unknown setting type: " + settingType
				});
			}
		});

		return SettingDetails;
	});