/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.testing.logic;

import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import org.junit.Before;
import org.junit.Test;
import se.tjugohundratalet.rtorrentcontrol.exceptions.NoQueryParameterException;
import se.tjugohundratalet.rtorrentcontrol.models.SearchParameters;
import se.tjugohundratalet.rtorrentcontrol.models.SearchResult;
import se.tjugohundratalet.rtorrentcontrol.models.logic.MockTorrentSearcher;

/**
 *
 * @author ansjob
 */
public class MockTorrentSearcherTest {

	protected MockTorrentSearcher mock = new MockTorrentSearcher();
	protected SearchParameters params;

	@Before
	public void resetParameters() {
		params = new SearchParameters();
	}

	@Test(expected=NoQueryParameterException.class)
	public void requireQueryParameter() {
		mock.search(params);
	}

	@Test
	public void returns3Results() {
		addQueryParameter();
		List<SearchResult> res = mock.search(params);
		assertEquals(res.size(), 3);
	}

	@Test
	public void allSearchResultsHaveMovieInTitle(){
		addQueryParameter();
		for (SearchResult res : mock.search(params)) {
			assertContains(res.name, "movie");
		}
	}

	private static void assertContains(String largeString, String substring) {
		String errorMsg = String.format("Expected <%s> to contain <%s>", largeString, substring);
		assertTrue(errorMsg, largeString.toLowerCase().contains(substring.toLowerCase()));
	}

	private void addQueryParameter() {
		params.addParameter("query", "movie");
	}

}
