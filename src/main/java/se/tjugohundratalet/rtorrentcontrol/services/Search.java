/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.services;

import java.util.List;
import javax.print.attribute.standard.Media;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.log4j.Logger;
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

    private static Logger log = Logger.getLogger(Search.class);

	private TorrentClient client = new MockTorrentClient();

	private TorrentSearcher searcher = new MockTorrentSearcher();

    @GET
    @Path("search/{query}")
	@Produces("application/json")
    public List<SearchResult> search (@PathParam("query") String query) {
        log.debug("Search query initiated for query " + query);

		SearchParameters params = new SearchParameters();
		params.addParameter("query", query);
		return searcher.search(params);
    }
}
