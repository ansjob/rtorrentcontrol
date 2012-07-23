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
	private long totalSize;
	private long totalCompletedBytes;
	private final long totalUpload;
	private final long totalDownload;

	public Torrent(String id, String name, List<File> files,
			long uploadSpeed, long downloadSpeed, long totalUpload, long totalDownload) {
		this.id = id;
		this.name = name;
		this.files = files;
		this.downloadSpeed = downloadSpeed;
		this.uploadSpeed = uploadSpeed;
		this.totalUpload = totalDownload;
		this.totalDownload = totalDownload;
		totalSize = totalCompletedBytes = 0;
		for (File f : files) {
			totalSize += f.size;
			totalCompletedBytes += f.getCompletedBytes();
		}
	}

	private Torrent() {
		id = Constants.UNKNOWN;
		name = Constants.UNKNOWN;
		files = new ArrayList<File>();
		uploadSpeed = -1;
		downloadSpeed = -1;
		totalDownload = -1;
		totalUpload = -1;
		totalSize = totalCompletedBytes = 0;
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
		if (this.uploadSpeed != other.uploadSpeed) {
			return false;
		}
		if (this.downloadSpeed != other.downloadSpeed) {
			return false;
		}
		if (this.totalSize != other.totalSize) {
			return false;
		}
		if (this.totalCompletedBytes != other.totalCompletedBytes) {
			return false;
		}
		if (this.totalUpload != other.totalUpload) {
			return false;
		}
		if (this.totalDownload != other.totalDownload) {
			return false;
		}
		return true;
	}

	@Override
	public int hashCode() {
		int hash = 5;
		hash = 67 * hash + (this.id != null ? this.id.hashCode() : 0);
		hash = 67 * hash + (this.name != null ? this.name.hashCode() : 0);
		hash = 67 * hash + (this.files != null ? this.files.hashCode() : 0);
		hash = 67 * hash + (int) (this.uploadSpeed ^ (this.uploadSpeed >>> 32));
		hash = 67 * hash + (int) (this.downloadSpeed ^ (this.downloadSpeed >>> 32));
		hash = 67 * hash + (int) (this.totalSize ^ (this.totalSize >>> 32));
		hash = 67 * hash + (int) (this.totalCompletedBytes ^ (this.totalCompletedBytes >>> 32));
		hash = 67 * hash + (int) (this.totalUpload ^ (this.totalUpload >>> 32));
		hash = 67 * hash + (int) (this.totalDownload ^ (this.totalDownload >>> 32));
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

	public long getTotalCompletedBytes() {
		return totalCompletedBytes;
	}

	public long getTotalDownload() {
		return totalDownload;
	}

	public long getTotalSize() {
		return totalSize;
	}

	public long getTotalUpload() {
		return totalUpload;
	}




}
