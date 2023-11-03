package com.example.backend.security;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AppUserRequest(
		@NotNull(message = "Username cannot be null")
		@NotEmpty(message = "Username cannot be empty")
		@Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
		String username,
		@NotNull(message = "Password cannot be null")
		@NotEmpty(message = "Password cannot be empty")
		@Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters")
		String password,
		@NotNull(message = "Email cannot be null")
		@NotEmpty(message = "Email cannot be empty")
		@Email(message = "Email must be valid")
		String email
) {
}
