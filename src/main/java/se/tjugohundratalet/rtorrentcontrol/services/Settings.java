package se.tjugohundratalet.rtorrentcontrol.services;

import java.util.Arrays;
import java.util.List;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
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

	@Path("server")
	@GET
	public List<Setting> getServerSettings() {
		return Arrays.asList(new Setting("setting1", "Some value", "This is an example setting"),
				new Setting("setting2", "Some other value", "This is the second setting"));
	}

}
