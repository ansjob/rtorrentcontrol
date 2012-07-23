package se.tjugohundratalet.rtorrentcontrol.testing.structs;

import java.util.Arrays;
import java.util.List;
import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;
import se.tjugohundratalet.rtorrentcontrol.models.File;
import se.tjugohundratalet.rtorrentcontrol.models.Torrent;

/**
 *
 * @author ansjob
 */
public class TorrentTest {


	protected Torrent t1;

	@Before
	public void setUp() {
		t1 = generateSample();
	}

	@Test
	public void equalsItself() {
		assertEquals(t1, t1);
	}

	@Test
	public void equalsAnotherEqualObject(){
		Torrent t2 = generateSample();
		assertEquals(t1, t2);
	}

	@Test(expected=Exception.class)
	public void doesNotAllowFileListAlterations(){
		t1.getFiles().add(new File(".file2", 128));
	}

	private static final int ONE_GIG = 1 << 30;

	protected Torrent generateSample() {
		File f = new File(".file", 1023);
		List<File> files = Arrays.asList(f);
		return new Torrent("some.id", "some.name", files, 1024, 1024, ONE_GIG, ONE_GIG);
	}
}