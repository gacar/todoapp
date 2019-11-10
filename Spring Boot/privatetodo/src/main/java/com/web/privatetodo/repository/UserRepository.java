package com.web.privatetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.web.privatetodo.model.User;;

@Repository
public interface  UserRepository extends JpaRepository<User, Long> {
	
	  @Query("SELECT u FROM User u where u.username = :username")
	    User findByUserName(@Param("username") String username);
	

}
