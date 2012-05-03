package se.tjugohundratalet.rtorrentcontrol.services;
import java.net.URL;
import java.util.LinkedList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import se.tjugohundratalet.rtorrentcontrol.models.Torrent;

/**
 * REST Web Service
 *
 */
@Path("torrents")
public class TorrentsResource {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Torrent> getTorrents() {
		return new LinkedList<Torrent>();
	}
			
	@POST
	@PathParam("url/{url}")
	public String downloadByUrl(@PathParam("url") URL url) {
		return url.toString();
	}
}
