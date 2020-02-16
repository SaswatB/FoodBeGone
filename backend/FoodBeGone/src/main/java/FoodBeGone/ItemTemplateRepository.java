package FoodBeGone;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ItemTemplateRepository extends CrudRepository<ItemTemplate, String>{

	@Query(value = "SELECT * FROM item_template WHERE user_id = ?1", nativeQuery = true)
	List<ItemTemplate> findAllByUserId(String user_id);
}
