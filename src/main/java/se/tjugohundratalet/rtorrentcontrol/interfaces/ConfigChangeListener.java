package se.tjugohundratalet.rtorrentcontrol.interfaces;

public interface ConfigChangeListener {
	void onConfigParameterChanged(String name, Object newValue);
}
