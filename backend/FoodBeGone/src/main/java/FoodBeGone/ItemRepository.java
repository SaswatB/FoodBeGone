package FoodBeGone;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ItemRepository extends CrudRepository<Item, String> {

	@Query(value = "SELECT * FROM item WHERE user_id = ?1", nativeQuery = true)
	List<Item> findAllByUserId(String user_id);
}
