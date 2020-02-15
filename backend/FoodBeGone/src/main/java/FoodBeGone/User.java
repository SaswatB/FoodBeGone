package FoodBeGone;

import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class User {

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	
	private String user_type;
	
	private String supplier_type;
	
	private double lat;
	
	private double lon;
	
	private String description;
	
	private LocalTime open_time;
	
	private LocalTime close_time;
	
}
