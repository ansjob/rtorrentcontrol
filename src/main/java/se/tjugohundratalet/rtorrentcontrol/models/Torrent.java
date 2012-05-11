/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.models;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ansjob
 */
@XmlRootElement
public class Torrent {
	private String id;
	private String name;
	private List<File> files;

	/* For JSON serialization */
	private Torrent() {
	}

	public Torrent(String id, String name, List<File> files) {
		this.id = id;
		this.name = name;
		this.files = files;
	}

	public List<File> getFileNames() {
		return files;
	}

	public void setFileNames(List<File> fileNames) {
		this.files = fileNames;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
		return true;
	}

	@Override
	public int hashCode() {
		int hash = 7;
		hash = 19 * hash + (this.id != null ? this.id.hashCode() : 0);
		return hash;
	}



}
