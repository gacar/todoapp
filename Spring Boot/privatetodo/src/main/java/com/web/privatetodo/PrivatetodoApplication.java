package com.web.privatetodo;



import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

@SpringBootApplication
//@ComponentScan({ "com.web.privatetodo.helper"})
@EntityScan(basePackageClasses = { 
		PrivatetodoApplication.class
})
public class PrivatetodoApplication {
	
	

	public static void main(String[] args) {
		 ConfigurableApplicationContext context =  
		            SpringApplication.run(PrivatetodoApplication.class, args);
		 
		        // add a shutdown hook for the above context...
		//SpringApplication.run(PrivatetodoApplication.class, args);
	}

}
