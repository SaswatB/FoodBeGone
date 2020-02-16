package FoodBeGone;

import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Transaction {
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	
	@OneToOne
	private Item item;
	private LocalTime timestamp;
	private int purchased_count;
	private String buyer_id;
	private int amount;
	private String token;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public LocalTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getBuyer_id() {
		return buyer_id;
	}

	public void setBuyer_id(String buyer_id) {
		this.buyer_id = buyer_id;
	}

	public int getPurchased_count() {
		return purchased_count;
	}

	public void setPurchased_count(int purchased_count) {
		this.purchased_count = purchased_count;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}