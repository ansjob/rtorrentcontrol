package se.tjugohundratalet.rtorrentcontrol.services;
import java.net.URL;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import se.tjugohundratalet.rtorrentcontrol.interfaces.TorrentClient;
import se.tjugohundratalet.rtorrentcontrol.logic.VoidTorrentClient;
import se.tjugohundratalet.rtorrentcontrol.models.Torrent;

/**
 * Fairly RESTful web service
 */
@Path("torrents")
public class TorrentsResource {


	@Context
	private ServletContext servletCtxt;

	private Logger log = LoggerFactory.getLogger(TorrentsResource.class);

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
	public void fetchTorrentClient() {
		client = getClient();
	}

	private TorrentClient getClient() {
		try {
			String className = servletCtxt.getInitParameter("se.tjugohundratalet.rtorrentcontrol.torrentClientClass");
			log.info("TorrentClient class name loaded: " + className);
			Class<TorrentClient> clazz = (Class<TorrentClient>) Class.forName(className);
			return clazz.newInstance();
		} catch (Exception ex) {
			log.error("Caught throwable when getting TorrentClient implementation", ex);
			return new VoidTorrentClient();
		}
	}
}
