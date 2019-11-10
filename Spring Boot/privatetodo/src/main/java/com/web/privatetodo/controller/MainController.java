package com.web.privatetodo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.WebApplicationContext;

import com.web.privatetodo.helper.LoginHelper;
import com.web.privatetodo.model.ToDoCategory;
import com.web.privatetodo.model.ToDoItem;
import com.web.privatetodo.model.User;
import com.web.privatetodo.repository.ToDoCategoryRepository;
import com.web.privatetodo.repository.ToDoItemRepository;
import com.web.privatetodo.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;
import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MainController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ToDoCategoryRepository toDoCategoryRepository;

	@Autowired
	private ToDoItemRepository toDoItemRepository;

	@Resource(name = "loginHelper")
	private LoginHelper loginHelper;

	@Bean
	@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
	public LoginHelper attribute1() {
		return new LoginHelper();
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
		User registeredUser = userRepository.findByUserName(user.getUsername());
		if (registeredUser != null)
			return new ResponseEntity<>("error001", HttpStatus.NOT_FOUND);
		else {
			User createdUser = userRepository.save(user);
			System.out.println("kullanıcı id:" + createdUser.getId());
			loginHelper.setSessionUser(createdUser);
			return new ResponseEntity<User>(createdUser, HttpStatus.OK);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@Valid @RequestBody User user) {
		User registeredUser = userRepository.findByUserName(user.getUsername());
		if (registeredUser == null) {
			return new ResponseEntity<>("Hatalı Giriş", HttpStatus.NOT_FOUND);
		} else if (!registeredUser.getPassword().equalsIgnoreCase(user.getPassword())) {
			return new ResponseEntity<>("Hatalı Giriş", HttpStatus.NOT_FOUND);
		} else {
			loginHelper.setSessionUser(registeredUser);
			return new ResponseEntity<User>(registeredUser, HttpStatus.OK);
		}
	}

	@PostMapping("/user/createcategory")
	public ResponseEntity<?> createCategory(@Valid @RequestBody ToDoCategory category) throws Exception {
		User cUser = userRepository.findById(loginHelper.getSessionUser().getId()).orElseThrow(() -> new Exception("User not found for this id : " + loginHelper.getSessionUser().getId()));
		category.setUser(cUser);
		ToDoCategory createdCategory = toDoCategoryRepository.save(category);
		return new ResponseEntity<ToDoCategory>(createdCategory, HttpStatus.OK);
	}

	@PostMapping("/user/deletecategory")
	public ResponseEntity<?> deletecategory(@Valid @RequestBody Long categoryId) throws Exception {
		toDoCategoryRepository.deleteById(categoryId);
		return new ResponseEntity<>("", HttpStatus.OK);
	}

	@GetMapping("/user/listtodocategories")
	public ResponseEntity<?> listCategory() {
		List<ToDoCategory> categoryList;
		categoryList = toDoCategoryRepository.findCategoriesByUserId(loginHelper.getSessionUser().getId());
		return new ResponseEntity<List<ToDoCategory>>(categoryList, HttpStatus.OK);
	}

	// addnewtodoitem (description, deadline, and status.)
	@PostMapping("/user/createitem")
	public ResponseEntity<?> createItem(@Valid @RequestBody ToDoItem item) throws Exception {
		ToDoItem createdItem = toDoItemRepository.save(item);
		return new ResponseEntity<ToDoItem>(createdItem, HttpStatus.OK);
	}

	// list todoitem
	@GetMapping("/user/listtodoitems/{categoryId}")
	public ResponseEntity<?> listTodoItem(@PathVariable Long categoryId) {
		List<ToDoItem> itemList;
		itemList = toDoItemRepository.findByCategoryId(categoryId);
		return new ResponseEntity<List<ToDoItem>>(itemList, HttpStatus.OK);
	}

	// deletetodoitem
	@PostMapping("/user/deleteitem")
	public ResponseEntity<?> deleteItem(@Valid @RequestBody Long itemId) throws Exception {
		toDoItemRepository.deleteById(itemId);
		return new ResponseEntity<>("", HttpStatus.OK);
	}

	// updatetodoitem complete
	@PostMapping("/user/updateitem")
	public ResponseEntity<?> updateItem(@Valid @RequestBody ToDoItem item) throws Exception {
		ToDoItem updateItem = toDoItemRepository.getOne(item.getId());
		updateItem.setStatus(item.getStatus());
		toDoItemRepository.save(updateItem);
		return new ResponseEntity<>("", HttpStatus.OK);
	}

}
