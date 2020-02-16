package FoodBeGone;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MainController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired 
	private ItemRepository itemRepository;
	
	@Autowired
	private ItemTemplateRepository itemTemplateRepository;
	
	@Autowired
	private TransactionRepository transactionRepository;
	

	@GetMapping("/users")
	public @ResponseBody List<User> getAllUsers() {
		return iterableToList(userRepository.findAll());
	}
	
	@PostMapping("/users")
	public ResponseEntity<?> addUser(@RequestBody Map<String, Object> params) {
		try {
			User user = new User();
			user.setUser_name(params.get("user_name").toString());
			user.setDescription(params.get("description").toString());
			user.setOpen_time(LocalTime.parse(params.get("open_time").toString()));
			user.setClose_time(LocalTime.parse(params.get("close_time").toString()));
			user.setUser_type(params.get("user_type").toString());
			user.setSupplier_type(params.get("supplier_type").toString());
			userRepository.save(user);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	@GetMapping("user/{userId}/items/template")
	public ResponseEntity<List<ItemTemplate>> getItemTemplate() {
		return new ResponseEntity<List<ItemTemplate>>(
				iterableToList(itemTemplateRepository.findAll()), 
				HttpStatus.OK);
	}
	
	@PostMapping("user/{userId}/items/template")
	public ResponseEntity<?> addItemTemplate(@RequestBody Map<String, Object> params) {
		try {
			ItemTemplate template = new ItemTemplate();
			template.setName(params.get("name").toString());
			template.setDescription(params.get("description").toString());
			template.setUser_id(params.get("user_id").toString());
			template.setPrice(Double.parseDouble((params.get("price").toString())));
			template.setImage(params.get("image").toString());
			itemTemplateRepository.save(template);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	
	
	private static <T> List<T> iterableToList(Iterable<T> iterable){
		List<T> list = new ArrayList<T>();
		iterable.forEach(list::add);
		return list;
	}


	// getting a list of items
	@GetMapping("user/{userId}/items")
	public ResponseEntity<List<Item>> getAllItems(){
		return new ResponseEntity<List<Item>>(
			iterableToList(itemRepository.findAll()), 
			HttpStatus.OK);
	}


	// getting a specific item
	@GetMapping("user/{userId}/items/{itemId}")
	public ResponseEntity<Item> getItem(@PathVariable String itemId){
		return new ResponseEntity<Item>(
			itemRepository.findById(itemId).get(),
			HttpStatus.OK);
	}

	@PostMapping("user/{userId}/item")
	public ResponseEntity<?> addItem(@RequestBody Map<String, Object> params) {
		try {
			User user =  new User();
			Item item = new Item();
			
			item.setId(params.get("id").toString());
			item.setCount(Integer.parseInt((params.get("count").toString())));
			item.setCount_left(Integer.parseInt((params.get("count_left").toString())));
			item.setItem_template((ItemTemplate) params.get("item_template"));
			item.setAvailable_til(LocalTime.parse(params.get("available_til").toString()));
			item.setDisc_percent(Integer.parseInt((params.get("disc_percent").toString())));
			itemRepository.save(item);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	
}