package FoodBeGone;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
			user.setAddress(params.get("address").toString());
			userRepository.save(user);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@GetMapping("users/{userId}/items/templates")
	public ResponseEntity<List<ItemTemplate>> getItemTemplate(@PathVariable("userId") String userId) {
		return new ResponseEntity<List<ItemTemplate>>(iterableToList(itemTemplateRepository.findAllByUserId(userId)),
				HttpStatus.OK);
	}

	@PostMapping("users/{userId}/items/templates")
	public ResponseEntity<?> addItemTemplate(@PathVariable("userId") String userId,
			@RequestBody Map<String, Object> params) {

		try {
			User user = userRepository.findById(userId).get();
			ItemTemplate template = new ItemTemplate();
			template.setName(params.get("name").toString());
			template.setDescription(params.get("description").toString());
			template.setPrice((int) (Float.parseFloat(params.get("price").toString()) * 100));
			template.setImage(params.get("image").toString());
			template.setUser(user);

			itemTemplateRepository.save(template);
			userRepository.save(user);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@GetMapping("/users/{userId}/transactions")
	public ResponseEntity<List<Transaction>> getTransactions(@PathVariable("userID") String userID) {
		List<Item> items = itemRepository.findAllByUserId(userID);
		List<Transaction> transactions = new ArrayList<Transaction>();
		for (Item i : items) {
			transactions.addAll(transactionRepository.findAllByItemId(i.getId()));
		}
		return new ResponseEntity<List<Transaction>>(transactions, HttpStatus.OK);
	}

	@GetMapping("/users/{userId}/transactions/{transaction_id}")
	public ResponseEntity<Transaction> getTransactionById(@PathVariable("userID") String userID,
			@PathVariable("transaction_id") String transaction_id) {
		return new ResponseEntity<Transaction>(transactionRepository.findById(transaction_id).get(), HttpStatus.OK);
	}

	@Transactional
	@PostMapping("/users/{userId}/transactions")
	public ResponseEntity<Transaction> createTransaction(@PathVariable("userId") String userId,
			Map<String, Object> params) {
		Transaction transaction = new Transaction();
		Item item = itemRepository.findById(params.get("item_id").toString()).get();
		ItemTemplate itemTemplate = itemTemplateRepository.findById(item.getItem_template_id()).get();

		transaction.setItem(item);
		transaction.setBuyer_id(params.get("buyer_id").toString());
		transaction.setPurchased_count(Integer.parseInt(params.get("purchased_count").toString()));
		transaction.setTimestamp(LocalTime.now());
		transaction.setToken(params.get("token").toString());

		item.setCount(item.getCount() - transaction.getPurchased_count());

		double amount = item.getDisc_percent() * transaction.getPurchased_count() * itemTemplate.getPrice();

		transaction.setAmount((int) amount * 100);

		User user = userRepository.findById(userId).get();

		transactionRepository.save(transaction);
		itemRepository.save(item);

		return new ResponseEntity<Transaction>(transaction, HttpStatus.OK);
	}

	private static <T> List<T> iterableToList(Iterable<T> iterable) {
		List<T> list = new ArrayList<T>();
		iterable.forEach(list::add);
		return list;
	}

	// getting a list of items
	@GetMapping("users/{userId}/items")
	public ResponseEntity<List<Item>> getAllItems(@PathVariable("userId") String userID) {
		User user = userRepository.findById(userID).get();
		return new ResponseEntity<List<Item>>(itemRepository.findAllByUserId(userID), HttpStatus.OK);
	}

	// getting a specific item
	@GetMapping("users/{userId}/items/{itemId}")
	public ResponseEntity<Item> getItem(@PathVariable("itemId") String itemId, @PathVariable("userId") String userID) {
		return new ResponseEntity<Item>(itemRepository.findById(itemId).get(), HttpStatus.OK);
	}

	@Transactional
	@PostMapping("users/{userId}/items")
	public ResponseEntity<?> addItem(@PathVariable("userId") String userId, @RequestBody Map<String, Object> params) {
		try {
			User user = userRepository.findById(userId).get();
			Item item = new Item();
			ItemTemplate itemTemplate = itemTemplateRepository.findById(params.get("item_template_id").toString())
					.get();

			LocalDateTime ldt = LocalDateTime.parse(params.get("available_til").toString());
			ldt.atOffset(ZoneOffset.UTC);
			item.setCount(Integer.parseInt((params.get("count").toString())));
			item.setCount_left(Integer.parseInt((params.get("count_left").toString())));
			item.setItem_template_id(params.get("item_template_id").toString());
			item.setItem_template(itemTemplate);
			item.setAvailable_til(ldt);
			// item.setAvailable_til(LocalDateTime.parse(params.get("available_til").toString()));
			item.setDisc_percent(Float.parseFloat((params.get("disc_percent").toString())));
			item.setUser(user);

			itemRepository.save(item);
			userRepository.save(user);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@GetMapping("/search")
	public ResponseEntity<List<User>> search(@RequestParam float buyerLat, @RequestParam float buyerLon,
			@RequestParam int miles) {
		double lat2, lon2;
		double distanceInMiles;
		List<User> innerUsers = new ArrayList<>();

		for (User user : userRepository.findAll()) {
			lat2 = user.getLat();
			lon2 = user.getLon();
			distanceInMiles = distance(buyerLat, lat2, buyerLon, lon2) / 1.609344;
			if (distanceInMiles <= miles) {
				innerUsers.add(user);
			}
		}
		return new ResponseEntity<List<User>>(innerUsers, HttpStatus.OK);
	}

	public static double distance(double lat1, double lat2, double lon1, double lon2) {
		// The math module contains a function
		// named toRadians which converts from
		// degrees to radians.
		lon1 = Math.toRadians(lon1);
		lon2 = Math.toRadians(lon2);
		lat1 = Math.toRadians(lat1);
		lat2 = Math.toRadians(lat2);

		// Haversine formula
		double dlon = lon2 - lon1;
		double dlat = lat2 - lat1;
		double a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

		double c = 2 * Math.asin(Math.sqrt(a));

		// Radius of earth in kilometers. Use 3956
		// for miles
		double r = 6371;

		// calculate the result
		return (c * r);
	}

}