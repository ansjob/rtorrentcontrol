package se.tjugohundratalet.rtorrentcontrol.models;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Immutable class for setting value
 * @author ansjob
 */
@XmlRootElement
public class Setting {

	private String key;
	private String description;
	private Object val;

	public Setting(String key, Object val, String desc) {
		this.key = key;
		this.val = val;
		this.description = desc;
	}

	private Setting(){
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public void setValue(Object val) {
		this.val = val;
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
