/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.logic;

import java.io.InputStream;
import java.net.URL;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import se.tjugohundratalet.rtorrentcontrol.interfaces.TorrentClient;
import se.tjugohundratalet.rtorrentcontrol.models.Configuration;
import se.tjugohundratalet.rtorrentcontrol.models.Torrent;

/**
 *
 * @author ansjob
 */
public class VoidTorrentClient implements TorrentClient {

	@Override
	public String getSoftwareName() {
		return "Void Client";
	}

	@Override
	public String getSoftwareVersion() {
		return "0.0.1";
	}

	@Override
	public Map<String, Class> getConfigurableParameters() {
		return Collections.EMPTY_MAP;
	}

	@Override
	public Configuration getConfiguration() {
		return new Configuration(Collections.EMPTY_MAP);
	}

	@Override
	public List<Torrent> getAllTorrents() {
		return Collections.EMPTY_LIST;
	}

	@Override
	public List<Torrent> getDownloadingTorrents() {
		return Collections.EMPTY_LIST;
	}

	@Override
	public List<Torrent> getSeedingTorrents() {
		return Collections.EMPTY_LIST;
	}

	@Override
	public void AddTorrentByUrl(URL url) {
	}

	@Override
	public void AddTorrentByStream(InputStream torrentFile) {
	}

	@Override
	public long getDownloadSpeed() {
		return -1;
	}
}
