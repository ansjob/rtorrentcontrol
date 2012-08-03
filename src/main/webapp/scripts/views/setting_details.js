define([
	"namespace",
	"marionette",
	"jquery",
	"underscore",
	"mustache",
	"text!../../templates/setting_details.html",
	],
	function(namespace, Marionette, $, _, Mustache, template) {
		var SettingDetails = Marionette.ItemView.extend({

			initialize: function() {
				_.bindAll(this, "value", "save","saveSuccess", "saveError");
			},

			tagName: "div",

			render: function() {
				var asJSON = this.model.toJSON();
				var output = Mustache.render(template, asJSON);
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
						$(el).val(val);
						el.getValue = function() {return $(this).val(); };
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
			},

			save: function() {
				if ($(this.saveBtn).attr("disabled"))
					return;

				this.showLoadingView();
				this.savingVals = this.model.toJSON();
				this.savingVals.val = this.editor.getValue();
				this.disableSaveBtn();
				this.model.save(this.savingVals, {
					success: this.saveSuccess,
					error: this.saveError
				});
			},

			saveError: function(model, response) {
				this.hideAllMessages();
				this.enableSaveBtn();
				this.showErrorMessage(response);
			},

			showErrorMessage: function(error) {
				var errorNode = $(this.el).find(".msgcontainer").find(".saveError");
				$(errorNode).html(error.statusText);
				$(errorNode).show();
			},

			saveSuccess: function() {
				this.model.set("val", this.savingVals.val);
				this.enableSaveBtn();
				this.hideAllMessages();
				this.showSuccessMessage();
				var successMsg = $(this.el).find(".msgcontainer").find(".saveSuccess");
				setTimeout(function() {
					$(successMsg).fadeOut(250);
				}, 750);
			},

			showSuccessMessage: function() {
				$(this.el).find(".msgcontainer").find(".saveSuccess").show();
			},

			hideAllMessages: function() {
				$(this.el).find(".msgcontainer").children().hide();
			},

			showLoadingView: function() {
				$(this.el).find(".msgcontainer").find(".loading").show();
			},

			enableSaveBtn: function() {
				$(this.saveBtn).attr("disabled", false);
			},

			disableSaveBtn: function() {
				$(this.saveBtn).attr("disabled", true);
			},
		});

		var ServerSettingDetailsView = SettingDetails.extend({

			});

		var ClientSettingDetailsView = SettingDetails.extend({

			});

		return {
			base: SettingDetails,
			serversettings: ServerSettingDetailsView,
			clientsettings: ClientSettingDetailsView
		};
	});