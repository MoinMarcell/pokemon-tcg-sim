package com.example.backend.security;

public record AppUserResponse(
		String id,
		String username,
		String email,
		AppUserRole role,
		String registrationDate
) {
}
