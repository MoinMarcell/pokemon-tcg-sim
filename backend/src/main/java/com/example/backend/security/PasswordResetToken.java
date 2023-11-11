package com.example.backend.security;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("password-reset-tokens")
public record PasswordResetToken(
        String id,
        String token,
        String appUserId,
        Instant creationDateTime

) {
    static final int EXPIRATION_TIME = 60 * 10;

}
