package se.tjugohundratalet.rtorrentcontrol.interfaces;

import java.io.InputStream;
import java.net.URL;
import java.util.List;
import java.util.Map;
import se.tjugohundratalet.rtorrentcontrol.models.Configuration;
import se.tjugohundratalet.rtorrentcontrol.models.Torrent;

/**
 * A wrapper interface for the interaction between this
 * application and any bittorrent client.
 **/
public interface TorrentClient {


	public String getSoftwareName();

	public String getSoftwareVersion();

	public Map<String, Class> getConfigurableParameters();

	public Configuration getConfiguration();

	public List<Torrent> getAllTorrents();

	public List<Torrent> getDownloadingTorrents();

	public List<Torrent> getSeedingTorrents();

	public void AddTorrentByUrl(URL url);

	public void AddTorrentByStream(InputStream torrentFile);

	public long getDownloadSpeed();

}
