package se.tjugohundratalet.rtorrentcontrol.logic;

import java.sql.*;
import se.tjugohundratalet.rtorrentcontrol.exceptions.SettingsStorageException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import se.tjugohundratalet.rtorrentcontrol.exceptions.SettingNotFoundException;
import se.tjugohundratalet.rtorrentcontrol.interfaces.SettingsStorage;
import se.tjugohundratalet.rtorrentcontrol.models.Setting;

/**
 *
 * @author ansjob
 */
public class SQLiteSettingsStorage implements SettingsStorage {

	public SQLiteSettingsStorage() {
		setUp();
	}

	public static void setUp() {
		if (!setupComplete) {
			try {
				Class.forName("org.sqlite.JDBC");
				initiateTables();
				setupComplete = true;
			} catch (Exception ex) {
				throw new SettingsStorageException("Caught Throwable when initiating SQLiteSettingsStorage", ex);
			}
		}
	}

	private static void initiateTables() throws SQLException {
		synchronized (SQLiteSettingsStorage.class) {
			Connection con = getDb();
			Statement stmt = con.createStatement();
			stmt.execute(CREATE_SETTINGS_TABLE_QUERY);
			stmt.execute(CREATE_VALID_OPTS_TABLE_QUERY);
		}
	}

	@Override
	public List<Setting> getSettings() {
		return null;
	}

	@Override
	public void delete(Setting key) {
		throw new UnsupportedOperationException("Not supported yet.");
	}

	@Override
	public Setting getSetting(String key) {
		String settingType = getSettingType(key);
		return getSetting(settingType, key);
	}

	private String getSettingType(String key) {
		Connection con = getDb();
		try {
			PreparedStatement stmt = con.prepareStatement(GET_SETTING_TYPE_QUERY);
			stmt.setString(1, key);
			ResultSet res = stmt.executeQuery();
			if (res != null && res.next()) {
				return res.getString("type");
			} else {
				throw new SettingsStorageException("Could not fetch setting type for key: " + key);
			}
		} catch (Exception ex) {
			throw new SettingsStorageException("Could not fetch setting type for key: " + key, ex);
		} finally {
			try {
				con.close();
			} catch (SQLException sqlex) {
				log.error("Could not close connection", sqlex);
			}
		}
	}

	private Setting getSetting(String settingType, String key) {
		if (SettingTypes.STRING.equals(settingType)) {
			return getStringSetting(key);
		} else if (SettingTypes.DOUBLE.equals(settingType)) {
			return getDoubleSetting(key);
		} else if (SettingTypes.INTEGER.equals(settingType)) {
			return getIntegerSetting(key);
		} else {
			throw new SettingsStorageException("Unknown settings type: " + settingType);
		}
	}

	private Setting getStringSetting(String key) {
		/*
		 * Since we store the settings as Strings nothing needs to be done
		 */
		return getRawSetting(key);

	}

	private Setting getDoubleSetting(String key) {
		Setting raw = getRawSetting(key);
		return raw.setValue(Double.parseDouble(raw.getVal().toString()));
	}

	private Setting getIntegerSetting(String key) {
		Setting raw = getRawSetting(key);
		return raw.setValue(Integer.parseInt(raw.getVal().toString()));
	}

	private Setting getRawSetting(String key) {
		Connection con = getDb();
		try {
			PreparedStatement stmt = con.prepareStatement(GET_SETTING_QUERY);
			stmt.setString(1, key);
			ResultSet res = stmt.executeQuery();
			if (res != null && res.next()) {
				return new Setting(res.getString("key"), res.getString("value"), res.getString("description"));
			} else {
				throw new SettingNotFoundException("Could not find setting with key: " + key);
			}
		} catch (Exception ex) {
			throw new SettingsStorageException("Error getting setting", ex);
		} finally {
			try {
				con.close();
			} catch (SQLException sqlex) {
				log.error("Could not close connection", sqlex);
			}
		}
	}

	@Override
	public void putSetting(Setting val) {
		Connection con = getDb();
		try {
			PreparedStatement stmt = con.prepareStatement(PUT_PLAIN_SETTING_STMT);
			stmt.setString(1, val.getKey());
			stmt.setString(2, val.getDescription());
			stmt.setString(3, val.getVal().getClass().getSimpleName());
			stmt.setString(4, val.getVal().toString());
			stmt.execute();
		} catch (Exception ex) {
			throw new SettingsStorageException("Caught throwable while saving setting", ex);
		} finally {
			try {
				con.close();
			} catch (SQLException sqlex) {
				log.error("Could not close connection", sqlex);
			}
		}
	}

	@Override
	public void clearAllSettings() {
		try {
			Statement stmt = getDb().createStatement();
			stmt.execute(CLEAR_SETTINGS_TABLE_QUERY);
			stmt.execute(CLEAR_VALID_VALS_TABLE_QUERY);
		} catch (Exception ex) {
			throw new SettingsStorageException("Caught throwable while clearing settings tables", ex);
		}
	}
	private static Logger log = LoggerFactory.getLogger(SQLiteSettingsStorage.class);
	private static boolean setupComplete = false;

	private static Connection getDb() {
		try {
			return DriverManager.getConnection(CONNECTION_URL);
		} catch (Exception ex) {
			log.error("Caught throwable when getting connection to the storage DB", ex);
			throw new SettingsStorageException("Could not connect to the settings SQLite Database", ex);
		}
	}
	private static final String CONNECTION_URL = "jdbc:sqlite:rtorrentcontrol.db";
	private static final String PUT_PLAIN_SETTING_STMT = ""
			+ "INSERT INTO settings VALUES(?, ?, ?, ?)";
	private static final String CREATE_SETTINGS_TABLE_QUERY =
			"CREATE TABLE IF NOT EXISTS settings ("
			+ "key		TEXT PRIMARY KEY NOT NULL,"
			+ "description	TEXT,"
			+ "type			TEXT,"
			+ "value		TEXT"
			+ ");";
	private static final String CREATE_VALID_OPTS_TABLE_QUERY =
			"CREATE TABLE IF NOT EXISTS valid_vals("
			+ "key		TEXT,"
			+ "value	TEXT,"
			+ "PRIMARY KEY (key, value)"
			+ ");";
	private static final String CLEAR_SETTINGS_TABLE_QUERY =
			"DELETE FROM settings WHERE 1=1;";
	private static final String CLEAR_VALID_VALS_TABLE_QUERY =
			"DELETE FROM valid_vals WHERE 1=1;";
	private static final String GET_SETTING_TYPE_QUERY =
			"SELECT type from settings where key = ?;";
	private static final String GET_SETTING_QUERY =
			"SELECT * from settings WHERE key = ?";

	public static class SettingTypes {

		private SettingTypes() {
		}
		public static final String STRING = "String";
		public static final String DOUBLE = "Double";
		public static final String INTEGER = "Integer";
	}
}
