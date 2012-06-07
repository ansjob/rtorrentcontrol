/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.logic;

import java.util.Arrays;
import java.util.List;
import se.tjugohundratalet.rtorrentcontrol.exceptions.NoQueryParameterException;
import se.tjugohundratalet.rtorrentcontrol.exceptions.NoSuchParameterException;
import se.tjugohundratalet.rtorrentcontrol.interfaces.TorrentSearcher;
import se.tjugohundratalet.rtorrentcontrol.models.File;
import se.tjugohundratalet.rtorrentcontrol.models.SearchParameters;
import se.tjugohundratalet.rtorrentcontrol.models.SearchResult;

/**
 *
 * @author ansjob
 */
public class MockTorrentSearcher implements TorrentSearcher {

	private static final long ONE_GIG = 1 << 30;

	@Override
	public List<SearchResult> search(SearchParameters params) {
		try {
			String query = params.getParameter("query");

			List<SearchResult> results = generateSamples();
			return results;
		} catch (NoSuchParameterException e) {
			throw new NoQueryParameterException("Need the query parameter to exist", e);
		}
	}

	private List<SearchResult> generateSamples() {

		SearchResult r1 = scaryMovie();
		SearchResult r2 = crappyMovie();
		SearchResult r3 = goodMovie();

		return Arrays.asList(r1, r2, r3);
	}

	private SearchResult scaryMovie() {
		File mkv = new File("scary.movie.mkv", 4 * ONE_GIG);
		List<File> files = Arrays.asList(mkv);
		SearchResult res = new SearchResult("Scary.Movie", files, 3, 42);
		return res;
	}

	private SearchResult crappyMovie() {
		File cd1 = new File("crappy.movie.cd1.avi", 2 * ONE_GIG);
		File cd2 = new File("crappy.movie.cd2.avi", 2 * ONE_GIG);
		List<File> files = Arrays.asList(cd1, cd2);
		SearchResult res = new SearchResult("Crappy.Movie", files, 5, 4711);
		return res;
	}

	private SearchResult goodMovie() {
		File rar1 = new File("good.movie.rar", 1 * ONE_GIG);
		File rar2 = new File("good.movie.r01", 1 * ONE_GIG);
		File rar3 = new File("good.movie.r02", 1 * ONE_GIG);
		File rar4 = new File("good.movie.r03", 1 * ONE_GIG);
		List<File> files = Arrays.asList(rar1, rar2, rar3, rar4);
		SearchResult res = new SearchResult("Good.Movie", files, 2, 10);
		return res;
	}
}
