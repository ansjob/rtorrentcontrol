package se.tjugohundratalet.rtorrentcontrol.models;

/**
 * Immutable class for setting value
 * @author ansjob
 */
public class Setting {

	private final String key;
	private final String description;
	private final Object val;

	public Setting(String key, Object val, String desc) {
		this.key = key;
		this.val = val;
		this.description = desc;
	}

	public Setting setValue(Object val) {
		return new Setting(this.key, val, this.description);
	}

	public Setting setDescription(String desc) {
		return new Setting(this.key, this.val, desc);
	}

	public Setting setKey(String key) {
		return new Setting(key, this.val, this.description);
	}

	public String getKey() {
		return key;
	}

	public Object getVal() {
		return val;
	}

	public String getDescription() {
		return description;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final Setting other = (Setting) obj;
		if ((this.key == null) ? (other.key != null) : !this.key.equals(other.key)) {
			return false;
		}
		if (this.val != other.val && (this.val == null || !this.val.equals(other.val))) {
			return false;
		}
		return true;
	}

	@Override
	public int hashCode() {
		int hash = 7;
		hash = 97 * hash + (this.key != null ? this.key.hashCode() : 0);
		hash = 97 * hash + (this.val != null ? this.val.hashCode() : 0);
		return hash;
	}

	@Override
	public String toString() {
		return "Setting{" + "key=" + key + ", description=" + description + ", val=" + val + '}';
	}


}
