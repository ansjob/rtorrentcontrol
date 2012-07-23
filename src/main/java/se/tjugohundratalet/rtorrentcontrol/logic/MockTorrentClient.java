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
	public static final int NUM_DOWNLOADING = 25;
	public static final int NUM_SEEDING = 25;

	private Random rand = new Random();

	private static final Map<String, Class> allowedConfigTypes = new HashMap<String, Class>();

	static {
		allowedConfigTypes.put("message", String.class);
	}

	public MockTorrentClient() {
		config = new Configuration(allowedConfigTypes);

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
		return allowedConfigTypes;
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
		List<Torrent> results = new LinkedList<Torrent>();
		for (int i = 0; i < NUM_DOWNLOADING; ++i) {
			results.add(getDownloadingTorrent(i));
		}

		return results;
	}

	@Override
	public List<Torrent> getSeedingTorrents() {
		List<Torrent> results = new LinkedList<Torrent>();
		for (int i = 0; i < NUM_SEEDING; ++i) {
			results.add(getSeedingTorrent(i));
		}
		return results;

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
		long maxSpeed = 10 * 1024 * 1024;
		return (long) (512 + maxSpeed * Math.sin(System.currentTimeMillis() / 200));
	}

	private static final long ONE_GIG = 1 << 30;

	private Torrent getDownloadingTorrent(int i) {
		List<File> files = new LinkedList<File>();
		long size = 1024;
		long completed = (long) (512 + (512 * Math.sin(System.currentTimeMillis() / 10)));
		files.add(new IncompleteFile("file.txt", size, completed));
		String episodeString = (i < 10 ? "0" : "") + i;
		String hashString = "" + ("deadbeef" + episodeString).hashCode();
		Torrent t = new Torrent(hashString, "Some.ShowS01E" + episodeString, files, randomSpeed(), randomSpeed(), ONE_GIG, ONE_GIG);

		return t;
	}

	private long randomSpeed() {
		long random = rand.nextLong() % 100 * (1 << 17);
		return Math.abs(random);
	}

	private Torrent getSeedingTorrent(int i) {
		List<File> files = new LinkedList<File>();

		long size = 1024 * 1024 * 1024 * 8;
		files.add(new File("junk.txt", size));
		String episodeString = (i < 10 ? "0" : "") + i;
		String hashString = "" + ("oldbeef" + episodeString).hashCode();
		return new Torrent(hashString, "Some.JunkS53E" + episodeString, files, 1024, 1024, 2 * ONE_GIG, 3 * ONE_GIG);
	}
}
