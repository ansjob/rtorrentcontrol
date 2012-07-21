package se.tjugohundratalet.rtorrentcontrol.models;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ansjob
 */
@XmlRootElement
public class Torrent {
	private final String id;
	private final String name;
	private List<File> files;
	private long uploadSpeed;
	private long downloadSpeed;

	public Torrent(String id, String name, List<File> files, long uploadSpeed, long downloadSpeed) {
		this.id = id;
		this.name = name;
		this.files = files;
		this.downloadSpeed = downloadSpeed;
		this.uploadSpeed = uploadSpeed;
	}

	private Torrent() {
		id = Constants.UNKNOWN;
		name = Constants.UNKNOWN;
		files = new ArrayList<File>();
		uploadSpeed = -1;
		downloadSpeed = -1;
	}

	@Override
	public boolean equals(Object obj) {
		if (!(obj instanceof Torrent)) {
			return false;
		}
		final Torrent t = (Torrent) obj;

		return  t.downloadSpeed == downloadSpeed &&
				t.files.equals(files) &&
				t.id == id &&
				t.name == name &&
				t.uploadSpeed == uploadSpeed;
	}



	@Override
	public int hashCode() {
		int hash = 7;
		hash = 19 * hash + (this.id != null ? this.id.hashCode() : 0);
		return hash;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public List<File> getFiles() {
		return Collections.unmodifiableList(files);
	}

	public long getDownloadSpeed() {
		return downloadSpeed;
	}

	public long getUploadSpeed() {
		return uploadSpeed;
	}



}
