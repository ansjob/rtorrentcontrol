package se.tjugohundratalet.rtorrentcontrol.exceptions;
/**
 *
 * @author ansjob
 */
public class NoQueryParameterException extends RuntimeException {

	public NoQueryParameterException(String msg, Exception e) {
		super(msg, e);
	}

}
