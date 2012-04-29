package se.tjugohundratalet.rtorrentcontrol.services;

import java.net.URL;
import java.util.Collections;
import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import se.tjugohundratalet.rtorrentcontrol.models.Torrent;

/**
 * REST Web Service
 *
 * @author ansjob
 */
@Path("torrents")
public class TorrentsResource {

	@GET
	@Produces("application/json")
	public List<Torrent> getTorrents() {
		return Collections.EMPTY_LIST;
	}
			
	@POST
	@PathParam("url/{url}")
	public String downloadByUrl(@PathParam("url") URL url) {
		return url.toString();
	}
}
