package se.tjugohundratalet.rtorrentcontrol.exceptions;

public class SettingsStorageException extends RuntimeException {

	public SettingsStorageException(String msg, Exception ex) {
		super(msg, ex);
	}

	public SettingsStorageException(String msg) {
		super(msg);
	}
}
