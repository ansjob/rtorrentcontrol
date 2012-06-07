package se.tjugohundratalet.rtorrentcontrol.testing;

import static org.junit.Assert.assertTrue;

/**
 *
 * @author ansjob
 */
public class TestingUtils {

	public static void assertContains(String largeString, String substring) {
		String errorMsg = String.format("Expected <%s> to contain <%s>", largeString, substring);
		assertTrue(errorMsg, largeString.toLowerCase().contains(substring.toLowerCase()));
	}

	public static void assertNotEquals(int actual, int expected) {
		String errorMsg = String.format("Expected <%d> not to equal <%d>", actual, expected);
		assertTrue(errorMsg, actual != expected);
	}

}
