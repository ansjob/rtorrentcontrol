/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package se.tjugohundratalet.rtorrentcontrol.models;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ansjob
 */
@XmlRootElement
public class File {
	protected String fileName;
	protected long size;

	public File(String fileName, long size) {
		this.fileName = fileName;
		this.size = size;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final File other = (File) obj;
		if ((this.fileName == null) ? (other.fileName != null) : !this.fileName.equals(other.fileName)) {
			return false;
		}
		if (this.size != other.size) {
			return false;
		}
		return true;
	}

	@Override
	public int hashCode() {
		int hash = 5;
		hash = 59 * hash + (this.fileName != null ? this.fileName.hashCode() : 0);
		hash = 59 * hash + (int) (this.size ^ (this.size >>> 32));
		return hash;
	}


}
