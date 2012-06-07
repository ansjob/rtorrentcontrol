package se.tjugohundratalet.rtorrentcontrol.models;

import java.util.List;

public class SearchResult {
	public final String name;
	public final List<File> files;
	public final int seeders;
	public final int leachers;

	public SearchResult(String name, List<File> files, int seeders, int leachers){
		this.name = name;
		this.files = files;
		this.seeders = seeders;
		this.leachers = leachers;
	}

	public long getTotalSize() {
		long sum = 0;
		for (File f : files) {
			sum += f.size;
		}
		return sum;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final SearchResult other = (SearchResult) obj;
		if ((this.name == null) ? (other.name != null) : !this.name.equals(other.name)) {
			return false;
		}
		if (this.files != other.files && (this.files == null || !this.files.equals(other.files))) {
			return false;
		}
		if (this.seeders != other.seeders) {
			return false;
		}
		if (this.leachers != other.leachers) {
			return false;
		}
		return true;
	}

	@Override
	public int hashCode() {
		int hash = 3;
		return hash;
	}

	@Override
	public String toString() {
		return "SearchResult{" + "name=" + name + ", files=" + files + ", seeders=" + seeders + ", leachers=" + leachers + '}';
	}

}
