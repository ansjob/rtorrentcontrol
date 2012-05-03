define([ 'order!underscore', 'order!jquery', 'order!fakeajax' ],
		function(_, $) {

			describe("Fake Ajax", function() {

				it("is included", function() {
					expect(registerFakeAjax).toBeDefined();
					expect(registerFakeAjax).not.toEqual(null);
				});

				it("has access to underscore", function() {
					expect(_).toBeDefined();
					expect(_).not.toEqual(null);
				});
				var message;
				it("does hello world", function() {
					describe('simple example', function() {
						it('just works', function() {
							message = 'Hello '
							registerFakeAjax({
								url : '/simple',
								successData : 'World!'
							})
							$.get('/simple', function(data) {
								message += data
							})
							expect(message).toEqual('Hellö Wörld!')
						})
					});
					expect(message).toEqual('Hello World!')
				});
			});
		});