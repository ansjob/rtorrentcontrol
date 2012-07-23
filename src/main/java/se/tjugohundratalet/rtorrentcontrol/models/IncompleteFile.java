package se.tjugohundratalet.rtorrentcontrol.models;

/**
 *
 * @author ansjob
 */
public class IncompleteFile extends File {

	private long completedBytes;

	public IncompleteFile(String fileName, long size, long completedBytes) {
		super(fileName, size);
		this.completedBytes = completedBytes;
	}

	@Override
	public long getCompletedBytes() {
		return completedBytes;
	}

	public void setCompletedBytes(long completedBytes) {
		this.completedBytes = completedBytes;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final IncompleteFile other = (IncompleteFile) obj;
		if (this.completedBytes != other.completedBytes) {
			return false;
		}
		return true;
	}

	@Override
	public int hashCode() {
		int hash = super.hashCode();
		hash = 97 * hash + (int) (this.completedBytes ^ (this.completedBytes >>> 32));
		return hash;
	}

}
