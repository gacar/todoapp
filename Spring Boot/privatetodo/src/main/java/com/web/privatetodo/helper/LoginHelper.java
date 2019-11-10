package com.web.privatetodo.helper;

import org.springframework.stereotype.Component;

import com.web.privatetodo.model.User;

@Component
public class LoginHelper {
	private User sessionUser;

	public LoginHelper() {
		sessionUser = new User();
	}

	public void clearSessionUser() {
		sessionUser = null;
	}

	public void setSessionUser(User user) {
		try {
			sessionUser.setId(user.getId());
			sessionUser.setUsername(user.getUsername());
			System.out.println("Session yeni Kayıtlı Kullanıcı: " + this.sessionUser.getId());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public User getSessionUser() {
		try {
			System.out.println("Session Kayıtlı Kullanıcı: " + this.sessionUser.getId());
			return this.sessionUser;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
