/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.testing.logic;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
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

	private void testPutGetSetting(Setting testVal) {
		settings.putSetting(testVal);
		Setting actual = settings.getSetting(testVal.getKey());
		assertEquals(testVal, actual);
	}

	private Setting simpleStringSetting() {
		return new Setting("settingKey", "someVal", "Some test value");
	}

	private Setting simpleIntegerSetting() {
		return new Setting("intkey", 4711, "Some integer setting");
	}

	private Setting simpleDoubleSetting() {
		return new Setting("doubleKey", new Double(4.5), "Some double setting");
	}
}
