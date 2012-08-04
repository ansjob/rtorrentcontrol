package se.tjugohundratalet.rtorrentcontrol.exceptions;

public class SettingNotFoundException extends RuntimeException {

	public SettingNotFoundException(String msg) {
		super(msg);
	}

	public SettingNotFoundException(String msg, Throwable cause) {
		super(msg, cause);
	}
}
