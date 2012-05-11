/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.testing.logic;
import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import se.tjugohundratalet.rtorrentcontrol.exceptions.IllegalConfigurationValueTypeException;
import se.tjugohundratalet.rtorrentcontrol.exceptions.UnknownConfigParameterException;
import se.tjugohundratalet.rtorrentcontrol.interfaces.ConfigChangeListener;
import se.tjugohundratalet.rtorrentcontrol.models.Configuration;

/**
 *
 * @author ansjob
 */
public class ConfigurationsTest implements ConfigChangeListener {

	protected int callBacks;
	protected Configuration config;

	public ConfigurationsTest() {
		Map<String, Class> configurationTypes = new HashMap<String, Class>();
		configurationTypes.put("val", Integer.class);
		config = new Configuration(configurationTypes);
	}

	@BeforeClass
	public static void setUpClass() throws Exception {
	}

	@AfterClass
	public static void tearDownClass() throws Exception {
	}

	@Before
	public void setUp() {
		callBacks = 0;
	}

	@Test
	public void canSetGetIntegers() {
		Integer val = 4711;
		config.setValue("val", val);
		assertEquals(val, config.getValue("val"));
	}

	@Test
	public void callsBack() {
		config.addListener(this);
		config.setValue("val", 5);
		assertEquals("should call back exactly once", 1, callBacks);
	}

	@Test(expected=IllegalConfigurationValueTypeException.class)
	public void throwsExceptionOnNotAllowedValues() {
		config.setValue("val", 5.0);
	}

	@Test(expected=UnknownConfigParameterException.class)
	public void throwsUnknownExceptionOnWeirdConfigNames(){
		config.setValue("foo", new Object());
	}

	@Override
	public void onConfigParameterChanged(String name, Object newValue) {
		callBacks++;
	}
}
