package FoodBeGone;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	
	@PostMapping("/items/template")
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
	
	
	@GetMapping("/items/template")
	public ResponseEntity<List<ItemTemplate>> getItemTemplate() {
		return new ResponseEntity<List<ItemTemplate>>(
				iterableToList(itemTemplateRepository.findAll()), 
				HttpStatus.OK);
	}
	
	
	
	private static <T> List<T> iterableToList(Iterable<T> iterable){
		List<T> list = new ArrayList<T>();
		iterable.forEach(list::add);
		return list;
	}
	
}
