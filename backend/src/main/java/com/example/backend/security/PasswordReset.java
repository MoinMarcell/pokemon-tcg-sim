package com.example.backend.security;

public record PasswordReset(
        String token,
        String password
) {
}
