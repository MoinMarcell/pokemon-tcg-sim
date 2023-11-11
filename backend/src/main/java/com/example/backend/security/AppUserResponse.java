package com.example.backend.security;

import java.util.List;

public record AppUserResponse(
		String id,
		String username,
		String email,
		AppUserRole role,
		String registrationDate,
		List<String> favoritePokemonCardIds
) {
}
