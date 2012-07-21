package se.tjugohundratalet.rtorrentcontrol.logic;

import java.io.InputStream;
import java.lang.Class;
import java.net.URL;
import java.util.*;
import se.tjugohundratalet.rtorrentcontrol.models.Configuration;
import se.tjugohundratalet.rtorrentcontrol.models.File;
import se.tjugohundratalet.rtorrentcontrol.models.IncompleteFile;
import se.tjugohundratalet.rtorrentcontrol.models.Torrent;
import se.tjugohundratalet.rtorrentcontrol.interfaces.TorrentClient;

/**
 *
 * @author ansjob
 */
public class MockTorrentClient implements TorrentClient {

	protected Configuration config;

	public MockTorrentClient() {

		Map<String, Class> allowedTypes = new HashMap<String, Class>();
		allowedTypes.put("message", String.class);
		config = new Configuration(allowedTypes);

		config.setValue("message", "Hello Config World!");
	}

	@Override
	public String getSoftwareName() {
		return "MockClient";
	}

	@Override
	public String getSoftwareVersion() {
		return "0.1";
	}

	@Override
	public Map<String, Class> getConfigurableParameters() {
		Map<String, Class> configs = new HashMap<String, Class>();
		configs.put("message", String.class);
		return configs;
	}

	@Override
	public List<Torrent> getAllTorrents() {
		List<Torrent> l = new ArrayList<Torrent>();
		l.addAll(getDownloadingTorrents());
		l.addAll(getSeedingTorrents());
		return l;
	}

	@Override
	public List<Torrent> getDownloadingTorrents() {
		List<File> files = new LinkedList<File>();
		long size = 1024;
		long completed = (long) (512 + (512 * Math.sin(System.currentTimeMillis() / 10)));
		files.add(new IncompleteFile("file.txt", size, completed));
		Torrent t = new Torrent("deadbeef", "Some.Show", files, 1024, 1024);
		return Arrays.asList(t);
	}

	@Override
	public List<Torrent> getSeedingTorrents() {
		List<File> files = new LinkedList<File>();

		long size = 1024 * 1024 * 1024 * 8;
		files.add(new File("junk.txt", size));
		Torrent t = new Torrent("oldbeef", "Some.Junk", files, 1024, 1024);

		return Arrays.asList(t);
	}

	@Override
	public void AddTorrentByUrl(URL url) {
		throw new UnsupportedOperationException("Not supported yet.");
	}

	@Override
	public void AddTorrentByStream(InputStream torrentFile) {
		throw new UnsupportedOperationException("Not supported yet.");
	}

	@Override
	public Configuration getConfiguration() {
		return config;
	}

	@Override
	public long getDownloadSpeed() {
		long maxSpeed = 10*1024*1024;
		return (long) (512 + maxSpeed * Math.sin(System.currentTimeMillis() / 200));
	}
}
