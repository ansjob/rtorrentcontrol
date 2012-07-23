define(["views/island", "jquery"], function(IslandView, $) {

	var testData = {
		simpleSample: {
			title : "Some title",
			content : "<h2>Some content</h2>"
		}
	};

	describe("Island View", function() {
		//var view;

		beforeEach(function() {
			view = new IslandView(testData.simpleSample);
			view.render();
		});

		it("has class island", function() {
			expect($(view.el)).toHaveClass("island");
		});

		it("has a title-bar with class .island .title", function() {
			expect($(view.el).find(".title").length).toEqual(1);
		});

		it("has the title-bar fileld with the title entered in the constructor", function() {
			var expected = testData.simpleSample.title;
			expect($(view.el).find(".title")).toHaveHtml(expected);
		});

		it("has the content rendered in a div with class content", function() {
			var expected = testData.simpleSample.content;
			expect($(view.el).find(".content")).toHaveHtml(expected);
		})
	});
});