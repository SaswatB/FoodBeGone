package FoodBeGone;

import java.time.LocalTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class User {

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	
	private String user_name;
	
	private String user_type;
	
	private String supplier_type;
	
	private double lat;
	
	private double lon;

	private String address;
	
	private String description;
	
	private LocalTime open_time;
	
	private LocalTime close_time;
	
	@OneToMany
	private List<Item> items;
	
	@OneToMany
	private List<ItemTemplate> itemTemplates;
	
	@OneToMany
	private List<Transaction> transactions;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUser_type() {
		return user_type;
	}

	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}

	public String getSupplier_type() {
		return supplier_type;
	}

	public void setSupplier_type(String supplier_type) {
		this.supplier_type = supplier_type;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalTime getOpen_time() {
		return open_time;
	}

	public void setOpen_time(LocalTime open_time) {
		this.open_time = open_time;
	}

	public LocalTime getClose_time() {
		return close_time;
	}

	public void setClose_time(LocalTime close_time) {
		this.close_time = close_time;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public List<ItemTemplate> getItemTemplates() {
		return itemTemplates;
	}

	public void setItemTemplates(List<ItemTemplate> itemTemplates) {
		this.itemTemplates = itemTemplates;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}
}
