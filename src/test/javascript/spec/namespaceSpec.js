require(['../scripts/require_config']);

require(['scripts/namespace'], function(namespace) {
	describe('Namespace', function() {
		
		it('is defined', function() {
			expect(namespace).toBeDefined();
		});
		
		it('has app as a child', function() {
			expect(namespace.app).toBeDefined();
		});
		
	});
});