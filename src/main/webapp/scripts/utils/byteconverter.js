define([], function() {

	var ONE_KIB = 1024;

	var ONE_MIB = 1024 * ONE_KIB;

	var ONE_GIB = 1024 * ONE_MIB;

	var ONE_TIB = 1024 * ONE_GIB;

	var ByteTools = {
		ONE_KIB: ONE_KIB,
		ONE_MIB: ONE_MIB,
		ONE_GIB: ONE_GIB,
		ONE_TIB: ONE_TIB,

		formatBytes: function(bytes) {
			if (bytes < (1 << 10)) {
				return bytes + " B";
			}
			if (bytes < ONE_MIB) {
				return Math.round(100 * (bytes / ONE_KIB)) / 100 + " KiB";
			}
			if (bytes < ONE_GIB) {
				return Math.round(100 * (bytes / ONE_MIB)) / 100 + " MiB";
			}
			if (bytes < ONE_TIB) {
				return Math.round(100 * (bytes / ONE_GIB)) / 100 + " GiB";
			}
			return Math.round(100 * (bytes / ONE_TIB)) / 100 + " TiB";
		}
	};

	return ByteTools;
})