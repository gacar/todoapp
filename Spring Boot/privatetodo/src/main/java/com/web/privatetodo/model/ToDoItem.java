package com.web.privatetodo.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "todo_item")
public class ToDoItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 100)
	private String name;

	// @NotBlank
	@Size(max = 400)
	private String description;
	
	private Date deadline;
	
	private Boolean status;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "category_id", nullable = false)
	private ToDoCategory category;

	public ToDoItem() {
		// TODO Auto-generated constructor stub
		this.status = false;
	}

	public ToDoItem(Long id, @NotBlank @Size(max = 100) String name) {
		super();
		this.id = id;
		this.name = name;
		this.status = false;
	}
	
	

	public ToDoItem(Long id, @NotBlank @Size(max = 100) String name, @Size(max = 400) String description, Date deadline, Boolean status) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.deadline = deadline;
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}



	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

	public Boolean getStatus() {
		if(status == null)
			status = false;
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public void setCategory(ToDoCategory category) {
		this.category = category;
	}

	

	
	
}
