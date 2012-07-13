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

	public Torrent(String id, String name, List<File> files) {
		this.id = id;
		this.name = name;
		this.files = files;
	}

	private Torrent() {
		id = Constants.UNKNOWN;
		name = Constants.UNKNOWN;
		files = new ArrayList<File>();
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final Torrent other = (Torrent) obj;
		if ((this.id == null) ? (other.id != null) : !this.id.equals(other.id)) {
			return false;
		}
		if ((this.name == null) ? (other.name != null) : !this.name.equals(other.name)) {
			return false;
		}
		if (this.files != other.files && (this.files == null || !this.files.equals(other.files))) {
			return false;
		}
		return true;
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

}
