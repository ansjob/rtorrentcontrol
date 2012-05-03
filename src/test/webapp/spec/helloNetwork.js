define([ 'order!jquery', 'order!mock-ajax' ], function() {
	TestResponses = {
			success : {
				status: 200,
				responseText: "Hello world"
			}
	}
	describe("Mock Ajax", function() {
		var onSuccess, onFailure;
		var request;
		beforeEach(function() {
			jasmine.Ajax.useMock();

			onSuccess = jasmine.createSpy("onSuccess");
			onFailure = jasmine.createSpy("onFailure");

			$.ajax("test/test.html", {
				success : onSuccess
			});

			request = mostRecentAjaxRequest();
		})

		it("is included", function() {
			expect(jasmine.Ajax).toBeDefined();
			expect(jasmine.Ajax).not.toEqual(null);
		});
		
		it("calls the url", function() {
			expect(request.url).toEqual("test/test.html");
		})

		describe("onSuccess", function() {
			beforeEach(function() {
				request.response(TestResponses.success);
			});
			
			it("should be called", function() {
				expect(onSuccess).toHaveBeenCalled();
			})
		});
	});
});
