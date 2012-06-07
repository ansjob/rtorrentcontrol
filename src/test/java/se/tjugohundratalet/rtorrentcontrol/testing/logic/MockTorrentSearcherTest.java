/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.testing.logic;

import java.util.List;
import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;
import se.tjugohundratalet.rtorrentcontrol.exceptions.NoQueryParameterException;
import se.tjugohundratalet.rtorrentcontrol.logic.MockTorrentSearcher;
import se.tjugohundratalet.rtorrentcontrol.models.SearchParameters;
import se.tjugohundratalet.rtorrentcontrol.models.SearchResult;
import static se.tjugohundratalet.rtorrentcontrol.testing.TestingUtils.assertContains;
import static se.tjugohundratalet.rtorrentcontrol.testing.TestingUtils.assertNotEquals;

/**
 *
 * @author ansjob
 */
public class MockTorrentSearcherTest {

	protected MockTorrentSearcher mock = new MockTorrentSearcher();
	protected SearchParameters params;

	protected static final long FOUR_GIGS = 4L * (1 << 30);


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

	@Test
	public void allSamplesAreFourGigs() {
		addQueryParameter();
		for (SearchResult res : mock.search(params)) {
			assertEquals(FOUR_GIGS, res.getTotalSize());
		}
	}

	@Test
	public void allHasNonZeroSeeders() {
		addQueryParameter();
		for (SearchResult res : mock.search(params)){
			assertNotEquals(0, res.seeders);
		}
	}

	@Test
	public void allHasNonZeroLeachers() {
		addQueryParameter();
		for (SearchResult res : mock.search(params)) {
			assertNotEquals(0, res.leachers);
		}
	}
	
	private void addQueryParameter() {
		params.addParameter("query", "movie");
	}

}
