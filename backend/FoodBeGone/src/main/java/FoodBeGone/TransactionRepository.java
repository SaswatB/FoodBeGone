package FoodBeGone;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TransactionRepository extends CrudRepository<Transaction, String> {

	@Query(value = "SELECT * FROM transaction WHERE item_id = ?1", nativeQuery = true)
	List<Transaction> findAllByItemId(String item_id);
}
