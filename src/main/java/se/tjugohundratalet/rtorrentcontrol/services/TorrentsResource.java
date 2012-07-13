package se.tjugohundratalet.rtorrentcontrol.services;
import java.net.URL;
import java.util.List;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import se.tjugohundratalet.rtorrentcontrol.interfaces.TorrentClient;
import se.tjugohundratalet.rtorrentcontrol.logic.VoidTorrentClient;
import se.tjugohundratalet.rtorrentcontrol.models.Torrent;

/**
 * Fairly RESTful web service
 */
@Path("torrents")
public class TorrentsResource {


	@Context
	ServletContext servletCtx;

	private Logger log = Logger.getLogger(TorrentsResource.class.getName());

	TorrentClient client;
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Torrent> getTorrents() {
		return client.getAllTorrents();
	}


	@POST
	@PathParam("url/{url}")
	public String downloadByUrl(@PathParam("url") URL url) {
		return url.toString();
	}

	@PostConstruct
	private void fetchTorrentClient() {
		client = getClient();
	}

	private TorrentClient getClient() {
		try {
			String className = servletCtx.getInitParameter("se.tjugohundratalet.rtorrentcontrol.torrentClientClass");
			log.info("TorrentClient class name loaded: " + className);
			Class<TorrentClient> clazz = (Class<TorrentClient>) Class.forName(className);
			return clazz.newInstance();
		} catch (Exception ex) {
			log.severe("Caught throwable when getting TorrentClient implementation");
			ex.printStackTrace();
			return new VoidTorrentClient();
		}
	}
}
