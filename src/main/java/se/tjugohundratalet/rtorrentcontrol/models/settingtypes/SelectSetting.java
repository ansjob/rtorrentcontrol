package se.tjugohundratalet.rtorrentcontrol.models.settingtypes;

import java.util.List;
import se.tjugohundratalet.rtorrentcontrol.models.Setting;

/**
 * @author ansjob
 */
public class SelectSetting<T> extends Setting<T> {

	protected String defaultValue;
	protected List<T> allowedChoices;

	protected SelectSetting() {
		super();
	}

	public SelectSetting(
			String key,
			T value,
			String description,
			List<T> allowedChoices) {
		super(key, value, description);
		this.allowedChoices = allowedChoices;
		setValue(value);

	}

	@Override
	public final void setValue(T value) {
		for (T validValue : allowedChoices) {
			if (value.equals(validValue)) {
				this.val = value;
				return;
			}
		}
		String errorMsg = String.format("Select setting %s can not have value %s",
				this.key, value.toString());
		throw new IllegalArgumentException(errorMsg);
	}

	public List<T> getAllowedChoices() {
		return allowedChoices;
	}

	public void setAllowedChoices(List<T> allowedChoices) {
		this.allowedChoices = allowedChoices;
	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}
}
