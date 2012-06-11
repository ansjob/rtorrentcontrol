/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.models;

import java.util.Collections;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ansjob
 */
@XmlRootElement
public class Torrent {
	public final String id;
	public final String name;
	public final List<File> files;

	public Torrent(String id, String name, List<File> files) {
		this.id = id;
		this.name = name;
		this.files = files;
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



}
