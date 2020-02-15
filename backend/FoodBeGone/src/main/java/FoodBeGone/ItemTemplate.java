package FoodBeGone;

import java.util.Date;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class ItemTemplate {
    @Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
    
    private String item_templ_id;
    private String name;
    private String user_id;
    private double price;
    private String description;
    private String image;
}