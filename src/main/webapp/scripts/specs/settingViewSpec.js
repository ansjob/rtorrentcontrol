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
					return _.filter($(view.el).find(".msgcontainer").children(),
						function(child) {
							return $(child).css("display") != 'none';
						});
				};

				it("has only a loading message before any callback has been issued", function() {
					stringModel.save = function() {} //Not calling callbacks should leave view in "loading" state
					view.save();
					var msgs = visibleMessages();
					expect(msgs.length).toEqual(1);
					var loadingMsg = msgs[0];
					expect($(loadingMsg)).toHaveClass("loading");
				});

				it("has only the success message visible after success has been called", function() {
					stringModel.save = function(ignored, callbacks) {
						callbacks.success();
					};
					view.save();
					var msgs = visibleMessages();
					expect(msgs.length).toEqual(1);
					var okMsg = msgs[0];
					expect($(okMsg)).toHaveClass("saveSuccess");
				});

				it("has only the error message visible, with the text sent upon an error", function() {
					var error = {
						statusText: "Sample Error Message",
						status: 500
					};
					stringModel.save = function(ignored, callbacks) {
						callbacks.error(stringModel, error);
					}

					view.save();
					var msgs = visibleMessages();
					expect(msgs.length).toEqual(1);
					var errorNode = msgs[0];
					expect($(errorNode)).toHaveText(error.statusText);
				});
			});

		});

	})