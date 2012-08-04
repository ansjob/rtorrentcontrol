package se.tjugohundratalet.rtorrentcontrol.interfaces;

import java.util.List;
import java.util.Map;
import se.tjugohundratalet.rtorrentcontrol.models.Setting;

public interface SettingsStorage {

	public List<Setting> getSettings();

	public void delete(String key);

	public Setting getSetting(String key);

	public void putSetting(Setting val);

	public void clearAllSettings();

}
