define(['scripts/views/error'],
	function(ErrorMessageView) {

		var ErrorView;
		var el;
		describe("ErrorView", function() {

			beforeEach(function() {
				var data = {
					message: "Sample error",
					title: "some title"
				};
				ErrorView = new ErrorMessageView({
					model : data
				});
				ErrorView.render();
				el = ErrorView.el;
			});

			it("is defined", function() {
				expect(ErrorMessageView).toBeDefined();
				expect(ErrorMessageView).not.toEqual(null);
			});

			it("has a function render", function() {
				expect(ErrorMessageView.prototype.render).toBeDefined();
				expect(typeof(ErrorMessageView.prototype.render)).toEqual("function");
			});

			it("renders an error message", function() {

				expect($(el).find(".error")).toHaveHtml("Sample error");
				expect($(el).find("strong")).toHaveHtml("some title");
			});

			it("renders a link to the start of the application", function() {
				expect($(el).find("a").length).toEqual(1);
				expect($(el).find("a").attr("href")).toEqual("#");
			})
		});
	});