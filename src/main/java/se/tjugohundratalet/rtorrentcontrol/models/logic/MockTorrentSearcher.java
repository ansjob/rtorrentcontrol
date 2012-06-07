/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.models.logic;

import java.util.Arrays;
import java.util.List;
import se.tjugohundratalet.rtorrentcontrol.exceptions.NoQueryParameterException;
import se.tjugohundratalet.rtorrentcontrol.exceptions.NoSuchParameterException;
import se.tjugohundratalet.rtorrentcontrol.interfaces.TorrentSearcher;
import se.tjugohundratalet.rtorrentcontrol.models.SearchParameters;
import se.tjugohundratalet.rtorrentcontrol.models.SearchResult;

/**
 *
 * @author ansjob
 */
public class MockTorrentSearcher implements TorrentSearcher {

	@Override
	public List<SearchResult> search(SearchParameters params) {
		try {
			String query = params.getParameter("query");

			SearchResult r1 = new SearchResult("Scary.Movie");
			SearchResult r2 = new SearchResult("Crappy.Movie");
			SearchResult r3 = new SearchResult("Good.Movie");

			List<SearchResult> results = Arrays.asList(r1, r2, r3);
			return results;
		} catch(NoSuchParameterException e) {
			throw new NoQueryParameterException("Need the query parameter to exist", e);
		}
	}

}
