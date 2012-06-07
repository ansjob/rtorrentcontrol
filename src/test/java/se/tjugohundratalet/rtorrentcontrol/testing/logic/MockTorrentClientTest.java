/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.testing.logic;

import java.util.List;
import java.util.Map;
import static org.junit.Assert.*;
import org.junit.*;
import se.tjugohundratalet.rtorrentcontrol.models.Configuration;
import se.tjugohundratalet.rtorrentcontrol.models.Torrent;
import se.tjugohundratalet.rtorrentcontrol.models.logic.MockTorrentClient;
import se.tjugohundratalet.rtorrentcontrol.interfaces.TorrentClient;

/**
 *
 * @author ansjob
 */
public class MockTorrentClientTest {

	private TorrentClient client = new MockTorrentClient();

	@BeforeClass
	public static void setUpClass() throws Exception {
	}

	@AfterClass
	public static void tearDownClass() throws Exception {
	}

	@Before
	public void setUp() {
	}

	@After
	public void tearDown() {
	}

	@Test
	public void isDownloadingTorrent() {
		List<Torrent> torrents = client.getDownloadingTorrents();
		assertTrue("should not have empty list of downloading torrents", torrents.size() != 0);
	}

	@Test
	public void isCalledMockClient() {
		assertEquals("MockClient", client.getSoftwareName());
	}

	@Test
	public void isCorrectVersion() {
		assertEquals("0.1", client.getSoftwareVersion());
	}

	@Test
	public void isSeedingTorrent() {
		List<Torrent> seedings = client.getSeedingTorrents();
		assertFalse("should have non-empty list of seeding torrents", seedings.isEmpty());
	}

	@Test
	public void hasTwoTorrentsInTotal() {
		List<Torrent> allTorrents = client.getAllTorrents();
		assertEquals("should be two elements", 2, allTorrents.size());
	}

	@Test
	public void hasConfigurableMessage() {
		Map<String, Class> configs = client.getConfigurableParameters();
		assertTrue("should have key \"message\"", configs.containsKey("message"));
		assertEquals("message param should be a string", configs.get("message"), String.class);
	}

	@Test
	public void hasMessageConfigurationSetToHelloWorld(){
		Configuration config = client.getConfiguration();
		String expected = "Hello Config World!";
		assertEquals("has hello world message", expected, config.getValue("message"));
	}

	@Test
	public void givesNonZeroDownloadSpeed() {
		assertTrue("Download speed was 0", client.getDownloadSpeed() != 0);
	}
}
