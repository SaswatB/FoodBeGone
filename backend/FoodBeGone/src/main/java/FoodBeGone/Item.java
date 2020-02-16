package FoodBeGone;

import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Item {
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	private int count;
	@ManyToOne
	private ItemTemplate item_template;
	private LocalTime available_til;
	private int disc_percent;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public ItemTemplate getItem_template() {
		return item_template;
	}

	public void setItem_template(ItemTemplate item_template) {
		this.item_template = item_template;
	}

	public LocalTime getAvailable_til() {
		return available_til;
	}

	public void setAvailable_til(LocalTime available_til) {
		this.available_til = available_til;
	}

	public int getDisc_percent() {
		return disc_percent;
	}

	public void setDisc_percent(int disc_percent) {
		this.disc_percent = disc_percent;
	}

}