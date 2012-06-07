/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.testing.logic;

import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;
import se.tjugohundratalet.rtorrentcontrol.exceptions.NoSuchParameterException;
import se.tjugohundratalet.rtorrentcontrol.models.SearchParameters;

/**
 *
 * @author ansjob
 */
public class SearchParamsTest {

	public SearchParamsTest() {
	}

	SearchParameters params;

	@Before
	public void setUp() {
		params = new SearchParameters();
	}

	@Test
	public void addParameter() {
		params.addParameter("testkey", "testvalue");
	}

	@Test
	public void getParameter() {
		String testvalue = "testvalue";
		params.addParameter("testkey", testvalue);
		String actual = params.getParameter("testkey");
		assertEquals(testvalue, actual);
	}

	@Test(expected=NoSuchParameterException.class)
	public void getInvalidParameter(){
		params.getParameter("invalidKey");
	}

	@Test
	public void overWriteParameter() {
		params.addParameter("key", "x");
		params.addParameter("key", "y");
		String value = params.getParameter("key");
		assertEquals("y", value);
	}

	@Test(expected=NoSuchParameterException.class)
	public void deleteParameter() {
		params.addParameter("key", "x");
		params.deleteParameter("key");
		params.getParameter("key");
	}

	@Test(expected=NoSuchParameterException.class)
	public void deleteInvalidParameter() {
		params.deleteParameter("invalid");
	}

}
