package se.tjugohundratalet.rtorrentcontrol.testing.structs;

import java.util.Arrays;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import se.tjugohundratalet.rtorrentcontrol.models.settingtypes.SelectSetting;

/**
 *
 * @author ansjob
 */
public class SelectSettingTest {

	protected SelectSetting<Integer> select;
	protected static final List<Integer> validChoices = Arrays.asList(42, 50, 4711);

	@Before
	public void setUp() {
		select = new SelectSetting<Integer>(
				"someIntSetting",
				new Integer(42),
				"It is some sample setting",
				validChoices);
	}

	@Test(expected = IllegalArgumentException.class)
	public void throwsExceptionOnInvalidChoices() {
		select.setValue(new Integer(-1));
	}

	@Test(expected = IllegalArgumentException.class)
	public void throwsExceptionOnInvalidInstantiation() {
		select = new SelectSetting<Integer>(
				"someIntSetting",
				new Integer(-1),
				"It is some sample setting",
				validChoices);
	}
}
