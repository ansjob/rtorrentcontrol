define(['scripts/namespace', 'scripts/views/error'],
	function(namespace, ErrorMessageView) {

	var el = "#content";
	describe("ErrorView", function() {

		beforeEach(function() {
			ErrorMessageView.render({
				message: "Sample error",
				title: "some title"
			});
		});

		it("is defined", function() {
			expect(ErrorMessageView).toBeDefined();
			expect(ErrorMessageView).not.toEqual(null);
		});

		it("has a function render", function() {
			expect(ErrorMessageView.render).toBeDefined();
			expect(typeof(ErrorMessageView.render)).toEqual("function");
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