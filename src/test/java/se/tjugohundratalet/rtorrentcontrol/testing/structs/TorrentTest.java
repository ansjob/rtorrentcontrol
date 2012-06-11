package se.tjugohundratalet.rtorrentcontrol.testing.structs;

import java.util.Arrays;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import se.tjugohundratalet.rtorrentcontrol.models.File;
import se.tjugohundratalet.rtorrentcontrol.models.Torrent;

import static org.junit.Assert.*;

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

	@Test(expected=UnsupportedOperationException.class)
	public void doesNotAllowFileListAlterations(){
		t1.files.add(new File(".file2", 128));
	}

	protected Torrent generateSample() {
		File f = new File(".file", 1023);
		List<File> files = Arrays.asList(f);
		return new Torrent("some.id", "some.name", files);
	}
}