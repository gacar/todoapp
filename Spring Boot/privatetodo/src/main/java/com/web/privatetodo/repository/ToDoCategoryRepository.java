package com.web.privatetodo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.privatetodo.model.ToDoCategory;
import com.web.privatetodo.model.User;

public interface ToDoCategoryRepository extends JpaRepository<ToDoCategory, Long> {

	  @Query("SELECT c FROM ToDoCategory c where c.name = :categoryname")
	    ToDoCategory findByName(@Param("categoryname") String categoryName);
	
	  
	   @Query("SELECT c FROM com.web.privatetodo.model.ToDoCategory c WHERE c.user.id in :userid ")
	    List<ToDoCategory> findCategoriesByUserId(@Param("userid") Long userId);
}
