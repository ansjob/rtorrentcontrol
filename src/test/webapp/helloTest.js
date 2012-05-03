define(['namespace'], function(namespace) {
	describe("namespace", function() {
		it("is defined", function() {
			expect(1).toBeDefined();
		});

		it("has app as a child", function() {
			expect(namespace.app).toBeDefined();
		});
	});
});