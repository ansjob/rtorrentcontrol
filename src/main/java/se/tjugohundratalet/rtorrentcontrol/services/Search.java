/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.services;

import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import org.apache.log4j.Logger;
import se.tjugohundratalet.rtorrentcontrol.models.SearchResult;

/**
 * @author ansjob
 */
@Path("/")
public class Search {
    
    private static Logger log = Logger.getLogger(Search.class);
    
    @GET
    @Path("search/{query}")
    public String search (@PathParam("query") String query) {
        log.info("Search query initiated for query " + query);
        return query;
    }
}
