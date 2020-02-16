package FoodBeGone;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
			user.setLat(Double.parseDouble(params.get("lat").toString()));
			user.setLon(Double.parseDouble(params.get("lon").toString()));
			userRepository.save(user);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	@GetMapping("users/{userId}/items/templates")
	public ResponseEntity<List<ItemTemplate>> getItemTemplate(@PathVariable("userId") String userId) {
		return new ResponseEntity<List<ItemTemplate>>(
				iterableToList(itemTemplateRepository.findAll()), 
				HttpStatus.OK);
	}
	
	@PostMapping("users/{userId}/items/templates")
	public ResponseEntity<?> addItemTemplate(@RequestBody Map<String, Object> params) {
		try {
			ItemTemplate template = new ItemTemplate();
			template.setName(params.get("name").toString());
			template.setDescription(params.get("description").toString());
			template.setPrice(Double.parseDouble((params.get("price").toString())));
			template.setImage(params.get("image").toString());
			
			itemTemplateRepository.save(template);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	
	@GetMapping("/users/{userId}/transactions")
	public ResponseEntity<List<Transaction>> getTransactions(@PathVariable("userID") String userID){
		User user = userRepository.findById(userID).get();
		return new ResponseEntity<List<Transaction>>(user.getTransactions(), HttpStatus.OK);
	}
	
	@Transactional
	@PostMapping("/users/{userId}/transactions")
	public ResponseEntity<Transaction> createTransaction(@PathVariable("userId") String userId, Map<String,Object> params){
		Transaction transaction = new Transaction();
		
		transaction.setItem_id(params.get("item_id").toString());
		transaction.setBuyer_id(params.get("buyer_id").toString());
		transaction.setPurchased_count(Integer.parseInt(params.get("purchased_count").toString()));
		transaction.setTimestamp(LocalTime.now());
		
		Item item = itemRepository.findById(transaction.getItem_id()).get();
		item.setCount(item.getCount() - transaction.getPurchased_count());
		
		double amount = item.getDisc_percent() 
				* transaction.getPurchased_count()
				* item.getItem_template().getPrice();
		
		transaction.setAmount(amount);
		
		User user = userRepository.findById(userId).get();
		user.getTransactions().add(transaction);
		transactionRepository.save(transaction);
		itemRepository.save(item);
		
		return new ResponseEntity<Transaction>(transaction, HttpStatus.OK);
	}
	
	private static <T> List<T> iterableToList(Iterable<T> iterable){
		List<T> list = new ArrayList<T>();
		iterable.forEach(list::add);
		return list;
	}


	// getting a list of items
	@GetMapping("users/{userId}/items")
	public ResponseEntity<List<Item>> getAllItems(@PathVariable("userId") String userID){
		User user =  userRepository.findById(userID).get();
		return new ResponseEntity<List<Item>>(
			user.getItems(),
			HttpStatus.OK);
	}


	// getting a specific item
	@GetMapping("users/{userId}/items/{itemId}")
	public ResponseEntity<Item> getItem(@PathVariable("itemId") String itemId, @PathVariable("userId") String userID){
		return new ResponseEntity<Item>(
			itemRepository.findById(itemId).get(),
			HttpStatus.OK);
	}
	

	@Transactional
	@PostMapping("users/{userId}/items")
	public ResponseEntity<?> addItem(@PathVariable("userId") String userId, @RequestBody Map<String, Object> params) {
		try {
			User user =  userRepository.findById(userId).get();
			Item item = new Item();
			
			item.setId(params.get("id").toString());
			item.setCount(Integer.parseInt((params.get("count").toString())));
			item.setCount_left(Integer.parseInt((params.get("count_left").toString())));
			item.setItem_template((ItemTemplate) params.get("item_template"));
			item.setAvailable_til(LocalDateTime.parse(params.get("available_til").toString()));
			item.setDisc_percent(Integer.parseInt((params.get("disc_percent").toString())));
			user.getItems().add(item);
			itemRepository.save(item);
			userRepository.save(user);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	
	@GetMapping("/search")
	public ResponseEntity<List<User>> search(@RequestParam float lon, @RequestParam float lat, @RequestParam int miles){
		
	}

	
}