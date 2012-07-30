define([ 'order!jquery', 'order!underscore', 'order!fake-ajax' ],
		function($, _) {

			describe("FakeAjax", function() {

				it("has access to jquery", function() {
					expect($).toBeDefined();
					expect($).not.toEqual(null);
				})

				it("has access to underscore", function() {
					expect(_).toBeDefined();
					expect(_).not.toEqual(null);
				})
				it("is included", function() {
					expect(registerFakeAjax).toBeDefined();
					expect(registerFakeAjax).not.toEqual(null);

				});

				it("does hello world well", function() {
					var message = 'Hello '
					registerFakeAjax({
						url : '/simple',
						successData : 'World!'
					})
					$.get('/simple', function(data) {
						message += data
					})
					expect(message).toEqual('Hello World!')
				});

				it("can use the sample torrent url", function() {
					var data;
					$.get("api/torrents", function(result) {
						data = result;
					})
					expect(data.length).toEqual(sampleData.length);
				});
			});
		});