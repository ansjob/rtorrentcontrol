package se.tjugohundratalet.rtorrentcontrol.interfaces;

import java.util.List;
import se.tjugohundratalet.rtorrentcontrol.models.SearchParameters;
import se.tjugohundratalet.rtorrentcontrol.models.SearchResult;

/**
 *
 * @author ansjob
 */
public interface TorrentSearcher {

	public List<SearchResult> search(SearchParameters params);

}
