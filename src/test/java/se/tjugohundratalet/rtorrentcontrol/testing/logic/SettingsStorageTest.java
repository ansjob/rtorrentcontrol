package se.tjugohundratalet.rtorrentcontrol.testing.logic;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import se.tjugohundratalet.rtorrentcontrol.exceptions.SettingNotFoundException;
import se.tjugohundratalet.rtorrentcontrol.interfaces.SettingsStorage;
import se.tjugohundratalet.rtorrentcontrol.logic.SQLiteSettingsStorage;
import se.tjugohundratalet.rtorrentcontrol.models.Setting;

/**
 *
 * @author ansjob
 */
public class SettingsStorageTest {

	public SettingsStorageTest() {
	}

	protected SettingsStorage settings;

	@Before
	public void setUp() {
		settings = new SQLiteSettingsStorage();
	}

	@After
	public void clearDatabase() {
		settings.clearAllSettings();
	}

	@Test
	public void testPuttingStringSetting() {
		settings.putSetting(simpleStringSetting());
	}

	@Test
	public void testGettingStringSettingBack() {
		testPutGetSetting(simpleStringSetting());
	}

	@Test
	public void testPuttingAndGettingInteger() {
		testPutGetSetting(simpleIntegerSetting());

	}

	@Test
	public void testPuttingAndGettingDouble() {
		testPutGetSetting(simpleDoubleSetting());
	}

	@Test(expected=SettingNotFoundException.class)
	public void testGettingAbsentSetting() {
		Setting setting = settings.getSetting("faulty key");
	}

	@Test(expected=SettingNotFoundException.class)
	public void testDeletingASetting() {
		Setting<Integer> setting = simpleIntegerSetting();
		settings.putSetting(setting);
		settings.delete(setting.getKey());
		setting = settings.getSetting(setting.getKey());
	}

	private void testPutGetSetting(Setting testVal) {
		settings.putSetting(testVal);
		Setting actual = settings.getSetting(testVal.getKey());
		assertEquals(testVal, actual);
	}


	private Setting<String> simpleStringSetting() {
		return new Setting<String>("settingKey", "someVal", "Some test value");
	}

	private Setting<Integer> simpleIntegerSetting() {
		return new Setting<Integer>("intkey", 4711, "Some integer setting");
	}

	private Setting<Double> simpleDoubleSetting() {
		return new Setting<Double>("doubleKey", 4.5, "Some double setting");
	}
}
