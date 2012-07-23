define([
	"utils/byteconverter"
], function(ByteUtil) {

	describe("ByteUtil", function() {

		describe("bytesToPrintable()", function() {

			it("correctly renders 0 B", function() {
				var expected = "0 B";
				var actual = ByteUtil.formatBytes(0);
				expect(actual).toEqual(expected);
			});

			it("correctly renders 1023 B", function(){
				var expected = "1023 B";
				var actual = ByteUtil.formatBytes(1023);
				expect(actual).toEqual(expected);
			});

			it ("correctly renders 1 KiB", function () {
				var expected = "1 KiB";
				var actual = ByteUtil.formatBytes(1024);
				expect(actual).toEqual(expected);
			});

			it ("shortens 1.532 MiB to 1.53 MiB", function() {
				var expected = "1.53 MiB";
				var bytes = 1.532 * (1 << 20);
				var actual = ByteUtil.formatBytes(bytes);
				expect(actual).toEqual(expected);
			});

			it("correctly renders 1 GiB", function() {
				var bytes = 1 << 30;
				var expected = "1 GiB";
				var actual = ByteUtil.formatBytes(bytes);
				expect(actual).toEqual(expected);
			});

			it("correctly renders 3.14 GiB", function() {
				var bytes = Math.round(3.141592 * (1 << 30));
				var expected = "3.14 GiB";
				var actual = ByteUtil.formatBytes(bytes);
				expect(actual).toEqual(expected);
			});

		});
	});
});