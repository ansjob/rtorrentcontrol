/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.models;

import java.util.HashMap;
import java.util.Map;
import se.tjugohundratalet.rtorrentcontrol.exceptions.NoSuchParameterException;

/**
 *
 * @author ansjob
 */
public class SearchParameters {

	private Map<String, String> params;

	public SearchParameters() {
		params = new HashMap<String, String>();
	}

	public void addParameter(String key, String value) {
		params.put(key, value);
	}

	public String getParameter(String key) {
		if (params.containsKey(key)) {
			return params.get(key);
		} else {
			throw new NoSuchParameterException("No such parameter: " + key);
		}
	}

	public void deleteParameter(String key) {
		if (!params.containsKey(key)) {
			throw new NoSuchParameterException("No such parameter: " + key);
		}
		params.remove(key);
	}
}
