package se.tjugohundratalet.rtorrentcontrol.services;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import se.tjugohundratalet.rtorrentcontrol.interfaces.TorrentClient;
import se.tjugohundratalet.rtorrentcontrol.interfaces.TorrentSearcher;
import se.tjugohundratalet.rtorrentcontrol.models.SearchParameters;
import se.tjugohundratalet.rtorrentcontrol.models.SearchResult;
import se.tjugohundratalet.rtorrentcontrol.logic.MockTorrentClient;
import se.tjugohundratalet.rtorrentcontrol.logic.MockTorrentSearcher;

/**
 * @author ansjob
 */
@Path("/")
public class Search {

	static final Logger log = LoggerFactory.getLogger(Search.class.getName());

	private TorrentSearcher searcher = new MockTorrentSearcher();

    @GET
    @Path("search/{query}")
	@Produces("application/json")
    public List<SearchResult> search (@PathParam("query") String query) {
        log.info("Searching for " + query);

		SearchParameters params = new SearchParameters();
		params.addParameter("query", query);
		return searcher.search(params);
    }
}
