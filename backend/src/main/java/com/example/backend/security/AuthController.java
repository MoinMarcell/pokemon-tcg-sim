package com.example.backend.security;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AppUserService appUserService;

	@GetMapping("/me")
	@ResponseStatus(HttpStatus.OK)
	public AppUserResponse getMe() {
		return appUserService.getLoggedInAppUser();
	}

	@PostMapping("/login")
	@ResponseStatus(HttpStatus.OK)
	public AppUserResponse login() {
		return appUserService.getLoggedInAppUser();
	}

	@PostMapping("/logout")
	@ResponseStatus(HttpStatus.OK)
	public void logout(HttpSession session) {
		session.invalidate();
		SecurityContextHolder.clearContext();
	}

}
