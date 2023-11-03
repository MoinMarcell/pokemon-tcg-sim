package com.example.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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

}
