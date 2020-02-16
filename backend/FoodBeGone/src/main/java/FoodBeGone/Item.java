package FoodBeGone;

import java.time.LocalDateTime;

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
    private int count_left;
	private String item_template_id;
	private LocalDateTime available_til;
	private float disc_percent;

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

	public String getItem_template_id() {
		return item_template_id;
	}

	public void setItem_template_id(String item_template_id) {
		this.item_template_id = item_template_id;
	}

	public LocalDateTime getAvailable_til() {
		return available_til;
	}

	public void setAvailable_til(LocalDateTime available_til) {
		this.available_til = available_til;
	}

	public float getDisc_percent() {
		return disc_percent;
	}

	public void setDisc_percent(float disc_percent) {
		this.disc_percent = disc_percent;
	}

    public int getCount_left() {
        return count_left;
    }

    public void setCount_left(int count_left){
        this.count_left = count_left;
    }
}