package se.tjugohundratalet.rtorrentcontrol.services;

import java.util.Arrays;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import se.tjugohundratalet.rtorrentcontrol.models.Setting;

/**
 *
 * @author ansjob
 */
@Path("settings")
public class Settings {

	Logger log = LoggerFactory.getLogger(Settings.class);

	@Context
	private HttpServletRequest req;

	@Path("server")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Setting> getServerSettings() {
		return Arrays.asList(new Setting("setting1", "Some value", "This is an example setting"),
				new Setting("setting2", "Some other value", "This is the second setting"));
	}

	@Path("server")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void putSetting(Setting setting) {
		log.debug("hello");
	}

}
