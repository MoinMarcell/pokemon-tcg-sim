package com.example.backend.util;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class Argon2Service {
	public String encode(String password) {
		return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8().encode(password);
	}
}
