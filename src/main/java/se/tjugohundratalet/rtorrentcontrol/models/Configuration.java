package se.tjugohundratalet.rtorrentcontrol.models;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import se.tjugohundratalet.rtorrentcontrol.exceptions.IllegalConfigurationValueTypeException;
import se.tjugohundratalet.rtorrentcontrol.exceptions.UnknownConfigParameterException;
import se.tjugohundratalet.rtorrentcontrol.interfaces.ConfigChangeListener;

public class Configuration {

	private Map<String, Object> configMap;
	private Map<String, Class> allowedTypes;
	private Set<ConfigChangeListener> listeners;

	public Configuration(Map<String, Class> allowedTypes) {
		this.allowedTypes = allowedTypes;
		configMap = new HashMap<String, Object>();
		listeners = new HashSet<ConfigChangeListener>();
	}

	public Object getValue(String name) {
		if (!configMap.containsKey(name)) {
			throw new UnknownConfigParameterException("Unknown configuration parameter: " + name);
		}
		return configMap.get(name);
	}

	public void setValue(String name, Object value) {
		if (!allowedTypes.containsKey(name)) {
			throw new UnknownConfigParameterException("Unknown configuration parameter: " + name);
		}

		if (!value.getClass().equals(allowedTypes.get(name))) {
			String errorMsg = String.format("Expected type %s, but got type %s",
					allowedTypes.get(name), value.getClass());
			throw new IllegalConfigurationValueTypeException(errorMsg);
		}

		for (ConfigChangeListener listener : listeners) {
			listener.onConfigParameterChanged(name, value);
		}
		configMap.put(name, value);
	}

	public void addListener(ConfigChangeListener listener) {
		listeners.add(listener);
	}

	public void removeListener(ConfigChangeListener listener) {
		listeners.remove(listener);
	}
}
