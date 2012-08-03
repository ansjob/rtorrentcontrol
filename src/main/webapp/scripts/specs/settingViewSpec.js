define([
	"backbone",
	"views/setting_details",
	"jquery",
	"underscore"
	], function(Backbone, SettingDetailsViews, $, _) {

		describe("SettingView", function() {
			var stringModel, view, saveBtn;
			beforeEach(function() {
				stringModel = new Backbone.Model({
					key : "sampleKey",
					val : "sampleValue",
					type: "string",
					description: "This is a sample setting"
				});
				view = new SettingDetailsViews.base({
					model: stringModel
				});
				view.render();
				saveBtn = $(view.el).find(".savebuttoncontainer").find("button");
			});

			describe("rendering a string model", function() {

				it("has a regular input field with the value filled in", function() {
					var inputFields = $(view.el).find("input");
					inputFields = _.filter(inputFields, function(field) {
						return $(field).val() == stringModel.get("val")
					});
					expect(inputFields.length).toEqual(1);
				});

				it("hides all the status messages to begin with", function() {
					var statusMsgs = $(view.el).find(".msgcontainer").children();
					expect(statusMsgs.length).not.toEqual(0);
				});

				it("has the description visible", function() {
					expect($(view.el).html()).toContain(stringModel.get("description"));
				});


			});

			it("has a save button that calls the model's save function", function() {
				var called = false;
				stringModel.save = function() {
					called = true;
				}
				expect(saveBtn.length).toEqual(1);
				$(saveBtn).click();
				expect(called).toBeTruthy();
			});

			describe("interactions during saving", function() {
				var visibleMessages = function() {
					return _.filter(
						$(view.el).find(".msgcontainer").children(),
						function(child) {
							return $(child).css("display") != 'none';
						}
						);
				};

				describe("loading stage", function() {
					beforeEach(function() {
						stringModel.save = function() {} //Not calling callbacks should leave view in "loading" state
					});

					it("does not copy the edited field to the model when pressing save", function() {
						$(view.el).find("input").val("Some new value");
						view.save();
						expect(stringModel.get("val")).not.toEqual("Some new value");
					});

					it("has only a loading message before any callback has been issued", function() {
						view.save();
						var msgs = visibleMessages();
						expect(msgs.length).toEqual(1);
						var loadingMsg = msgs[0];
						expect($(loadingMsg)).toHaveClass("loading");
					});

					it("disables the save button", function() {
						view.save();
						spyOn(stringModel, 'save');
						$(view.saveBtn).click();
						expect(stringModel.save).not.toHaveBeenCalled();
					});
				});

				describe("behaviour when the save is successful", function() {
					var msgs, okMsg;
					beforeEach(function() {
						stringModel.save = function(ignored, callbacks) {
							callbacks.success();
						};
					});

					it("updates the model with the new value", function() {
						$(view.el).find("input").val("Some new value");
						view.save();
						expect(stringModel.get("val")).toEqual("Some new value");
					});

					it("has only the success message visible after success has been called", function() {
						view.save();
						msgs = visibleMessages();
						okMsg = msgs[0];
						expect(msgs.length).toEqual(1);
						expect($(okMsg)).toHaveClass("saveSuccess");
					});

					it("hides the OK message after a second", function() {
						var tmp = window.setTimeout;
						window.setTimeout = function (fn) {
							fn();
						};
						spyOn($.fn, 'fadeOut');
						view.save();
						window.setTimeout = tmp;
						expect($.fn.fadeOut).toHaveBeenCalled();
					});

					it("enables the save button again", function() {
						view.save();
						expect($(view.saveBtn).attr("disabled")).toBeFalsy();
					})

				});

				describe("behaviour when errors occur", function() {
					var error;
					beforeEach(function() {
						error = {
							statusText: "Sample Error Message",
							status: 500
						};
						stringModel.save = function(ignored, callbacks) {
							callbacks.error(stringModel, error);
						}
					});

					it("enables the save button again", function() {
						view.save(),
						expect($(view.saveBtn).attr("disabled")).toBeFalsy();
					});

					it("has only the error message visible, with the text sent upon an error", function() {
						view.save();
						var msgs = visibleMessages();
						expect(msgs.length).toEqual(1);
						var errorNode = msgs[0];
						expect($(errorNode)).toHaveText(error.statusText);
					});
				});

			});
		});
	});