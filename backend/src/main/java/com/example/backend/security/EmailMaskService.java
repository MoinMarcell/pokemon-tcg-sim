package com.example.backend.security;

import org.springframework.stereotype.Service;

@Service
public class EmailMaskService {
	public String maskEmail(String email) {
		int atIndex = email.indexOf('@');

		if (atIndex != -1) {
			String username = email.substring(0, atIndex);
			String domain = email.substring(atIndex);

			String maskedUsername = "*".repeat(username.length());

			return maskedUsername + domain;
		} else {
			return email;
		}
	}
}
