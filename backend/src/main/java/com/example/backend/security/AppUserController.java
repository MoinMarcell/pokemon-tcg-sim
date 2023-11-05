package com.example.backend.security;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class AppUserController {

	private final AppUserService appUserService;

	@PostMapping("/register")
	@ResponseStatus(HttpStatus.CREATED)
	public AppUserResponse registerNewAppUser(@Valid @RequestBody AppUserRequest appUserRequest) {
		return appUserService.registerNewAppUser(appUserRequest);
	}

}
