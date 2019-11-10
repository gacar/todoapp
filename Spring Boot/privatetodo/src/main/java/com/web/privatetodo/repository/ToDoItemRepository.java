package com.web.privatetodo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web.privatetodo.model.ToDoItem;

public interface ToDoItemRepository extends JpaRepository<ToDoItem, Long> {
	
	   @Query("SELECT NEW com.web.privatetodo.model.ToDoItem(i.id,i.name, i.description,i.deadline, i.status) FROM com.web.privatetodo.model.ToDoItem i WHERE i.category.id in :categoryid ")
	    List<ToDoItem> findByCategoryId(@Param("categoryid") Long categoryId);

}
